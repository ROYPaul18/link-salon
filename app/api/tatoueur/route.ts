import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Readable } from "stream";
import cloudinary from "@/lib/cloudinary";
import { z } from "zod";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Schéma de validation des données
const tattooArtistSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  technique: z.string().optional(),
  style: z.string().optional(),
  facebookLink: z.string().url().optional(),
  instagramLink: z.string().url().optional(),
  websiteLink: z.string().url().optional(),
});

// Convertir un buffer en ReadableStream pour Cloudinary
const bufferToStream = (buffer: Buffer): Readable => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

// Upload d'image sur Cloudinary
const uploadImageToCloudinary = async (
  buffer: Buffer,
  folder: string
): Promise<string> => {
  const stream = bufferToStream(buffer);
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [{ width: 1200, height: 1200, crop: "limit" }],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result!.secure_url);
        }
      }
    );
    stream.pipe(uploadStream);
  });
};

// Extraire le `public_id` d'une image Cloudinary
const extractPublicIdFromUrl = (url: string): string | null => {
  const matches = url.match(/\/(?:v\d+\/)?([^/]+)\.\w+$/);
  return matches ? matches[1] : null;
};

// 🚀 **Créer un tatoueur**
export async function POST(req: Request) {
  try {
    // Parse the request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    // Create the tattoo artist record
    try {
      const tattooArtist = await prisma.tattoueurs.create({
        data: {
          name: body.name,
          Description: body.Description || "",
          Technique: body.Technique || "",
          Style: body.Style || "",
          image: body.image || null,
          projectImages: Array.isArray(body.projectImages)
            ? body.projectImages
            : [],
          facebookLink: body.facebookLink || null,
          instagramLink: body.instagramLink || null,
          websiteLink: body.websiteLink || null,
        },
      });

      return NextResponse.json(
        { success: true, tattooArtist },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        {
          message: "Failed to create record in database",
          error:
            dbError instanceof Error
              ? dbError.message
              : "Unknown database error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unhandled error:", error);
    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// 🚀 **Supprimer un tatoueur**
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id)
      return NextResponse.json({ message: "ID requis" }, { status: 400 });

    await prisma.$transaction(async (tx) => {
      const tattooArtist = await tx.tattoueurs.findUnique({
        where: { id },
      });

      if (!tattooArtist) {
        throw new Error("Tatoueur introuvable");
      }

      if (tattooArtist.image) {
        const publicId = extractPublicIdFromUrl(tattooArtist.image);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }

      await Promise.all(
        tattooArtist.projectImages.map(async (img) => {
          const publicId = extractPublicIdFromUrl(img);
          if (publicId) await cloudinary.uploader.destroy(publicId);
        })
      );

      await tx.tattoueurs.delete({ where: { id } });
    });

    return NextResponse.json({ message: "Tatoueur supprimé" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

// 🚀 **Récupérer un ou plusieurs tatoueurs**
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      const tattooArtist = await prisma.tattoueurs.findUnique({
        where: { id },
      });
      if (!tattooArtist)
        return NextResponse.json(
          { message: "Tatoueur non trouvé" },
          { status: 404 }
        );
      return NextResponse.json({ tattooArtist });
    }

    const tattooArtists = await prisma.tattoueurs.findMany();
    return NextResponse.json({ tattooArtists });
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
