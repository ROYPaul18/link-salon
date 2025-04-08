import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { promises as fs } from 'fs';
import cloudinary from "@/lib/cloudinary";
import { z } from "zod";

const prisma = new PrismaClient();
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 Mo

export const config = {
  api: {
    bodyParser: false,
  },
};

const tattooArtistSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().min(1, "La description est requise"),
  technique: z.string().min(1, "La technique est requise"),
  style: z.string().min(1, "Le style est requis"),
  facebookLink: z.string().url("URL Facebook invalide").or(z.literal("")).transform(v => v || null),
  instagramLink: z.string().url("URL Instagram invalide").or(z.literal("")).transform(v => v || null),
  websiteLink: z.string().url("URL Site Web invalide").or(z.literal("")).transform(v => v || null),
  profilPic: z.string().url("URL de l'image de profil invalide").min(1, "L'image de profil est requise"),
  workPics: z.array(z.string().url("URL d'image de travail invalide")).default([]),
});

const uploadImageToCloudinary = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'tattoo_artists',
      transformation: [{ width: 1200, height: 1200, crop: "limit" }],
    });
    return result.secure_url;
  } catch (error) {
    console.error("Erreur d'upload Cloudinary:", error);
    throw new Error("Échec de l'upload vers Cloudinary");
  }
};

const extractPublicIdFromUrl = (url: string): string | null => {
  const matches = url.match(/\/(?:v\d+\/)?([^/]+)\.\w+$/);
  return matches ? matches[1] : null;
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files: Record<string, File[]> = {};
    const fields: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (!files[key]) files[key] = [];
        files[key].push(value);
      } else {
        fields[key] = value as string;
      }
    }

    let profilPicUrl = '';
    if (files.profilPic?.[0]) {
      const file = files.profilPic[0];
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { message: "L'image de profil ne doit pas dépasser 3 Mo" },
          { status: 400 }
        );
      }
      const buffer = await file.arrayBuffer();
      const tempFilePath = `/tmp/${file.name}`;
      await fs.writeFile(tempFilePath, Buffer.from(buffer));
      profilPicUrl = await uploadImageToCloudinary(tempFilePath);
      await fs.unlink(tempFilePath);
    }

    const workPicUrls: string[] = [];
    if (files.workPics) {
      for (const file of files.workPics) {
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json(
            { message: `L'image ${file.name} ne doit pas dépasser 3 Mo` },
            { status: 400 }
          );
        }
        const buffer = await file.arrayBuffer();
        const tempFilePath = `/tmp/${file.name}`;
        await fs.writeFile(tempFilePath, Buffer.from(buffer));
        const url = await uploadImageToCloudinary(tempFilePath);
        workPicUrls.push(url);
        await fs.unlink(tempFilePath);
      }
    }

    const validatedData = tattooArtistSchema.parse({
      ...fields,
      profilPic: profilPicUrl,
      workPics: workPicUrls,
    });

    const newTattooArtist = await prisma.tattoueurs.create({
      data: {
        name: validatedData.name,
        Description: validatedData.description,
        Technique: validatedData.technique,
        Style: validatedData.style,
        facebookLink: validatedData.facebookLink,
        instagramLink: validatedData.instagramLink,
        websiteLink: validatedData.websiteLink,
        profilPic: {
          create: {
            url: validatedData.profilPic,
          },
        },
        workPics: {
          create: validatedData.workPics.map(url => ({ url })),
        },
      },
      include: {
        profilPic: true,
        workPics: true,
      },
    });

    return NextResponse.json(newTattooArtist, { status: 201 });
  } catch (err) {
    console.error("Erreur POST /api/tatoueur:", err);

    // Vérifier que l'erreur est un objet avant de la renvoyer
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Données invalides",
          errors: err.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }

    // Vérifier si 'err' est une instance d'Error et fournir une réponse adéquate
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Erreur serveur lors de l'ajout." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) return NextResponse.json({ message: "ID requis" }, { status: 400 });

    const intId = parseInt(id);
    if (isNaN(intId)) return NextResponse.json({ message: "ID invalide" }, { status: 400 });

    await prisma.$transaction(async (tx) => {
      const tattooArtist = await tx.tattoueurs.findUnique({
        where: { id: intId },
        include: { profilPic: true, workPics: true },
      });

      if (!tattooArtist) throw new Error("Tatoueur introuvable");

      if (tattooArtist.profilPic?.url) {
        const publicId = extractPublicIdFromUrl(tattooArtist.profilPic.url);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }

      for (const pic of tattooArtist.workPics) {
        const publicId = extractPublicIdFromUrl(pic.url);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }

      await tx.profilPic.deleteMany({ where: { TatoueurId: intId } });
      await tx.workPics.deleteMany({ where: { TatoueurId: intId } });
      await tx.tattoueurs.delete({ where: { id: intId } });
    });

    return NextResponse.json({ message: "Tatoueur supprimé" }, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      const tattooArtist = await prisma.tattoueurs.findUnique({
        where: { id: parseInt(id) },
        include: {
          profilPic: true,
          workPics: true,
        },
      });

      if (!tattooArtist) {
        return NextResponse.json({ message: "Tatoueur non trouvé" }, { status: 404 });
      }
      const formattedResponse = {
        id: tattooArtist.id,
        name: tattooArtist.name,
        Description: tattooArtist.Description,
        Technique: tattooArtist.Technique,
        Style: tattooArtist.Style,
        facebookLink: tattooArtist.facebookLink,
        instagramLink: tattooArtist.instagramLink,
        websiteLink: tattooArtist.websiteLink,
        profilPic: tattooArtist.profilPic?.url || null,
        workPics: tattooArtist.workPics.map(pic => pic.url) || []
      };

      return NextResponse.json(formattedResponse);
    }

    // Récupération de tous les tatoueurs
    const tattooArtists = await prisma.tattoueurs.findMany({
      include: {
        profilPic: true,
        workPics: true,
      },
    });

    // Formatage de la réponse pour tous les tatoueurs
    const formattedResponse = tattooArtists.map(artist => ({
      id: artist.id,
      name: artist.name,
      Description: artist.Description,
      Technique: artist.Technique,
      Style: artist.Style,
      facebookLink: artist.facebookLink,
      instagramLink: artist.instagramLink,
      websiteLink: artist.websiteLink,
      profilPic: artist.profilPic?.url || null,
      workPics: artist.workPics.map(pic => pic.url) || []
    }));

    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    );
  }
}
