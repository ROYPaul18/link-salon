import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file) {
  const uploadedResponse = await cloudinary.uploader.upload(file, {
    folder: "tattoo_artists",
  });
  return uploadedResponse.secure_url;
}

// GET - Récupérer tous les tatoueurs ou un tatoueur spécifique
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const tattooArtist = await prisma.tattoueurs.findUnique({
        where: { id },
      });
      if (!tattooArtist) {
        return NextResponse.json({ error: "Tatoueur non trouvé" }, { status: 404 });
      }
      return NextResponse.json(tattooArtist);
    } else {
      const tattooArtists = await prisma.tattoueurs.findMany();
      return NextResponse.json(tattooArtists);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des tatoueurs:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST - Créer un nouveau tatoueur
export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.name || !data.Description || !data.Technique || !data.Style) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    let imageUrl = null;
    if (data.image) {
      imageUrl = await uploadToCloudinary(data.image);
    }

    let projectImages = [];
    if (Array.isArray(data.projectImages)) {
      for (const img of data.projectImages) {
        projectImages.push(await uploadToCloudinary(img));
      }
    }

    const tattooArtist = await prisma.tattoueurs.create({
      data: {
        name: data.name,
        Description: data.Description,
        Technique: data.Technique,
        Style: data.Style,
        image: imageUrl,
        projectImages,
      },
    });
    return NextResponse.json(tattooArtist, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du tatoueur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT - Mettre à jour un tatoueur
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }

    const data = await request.json();
    const existingArtist = await prisma.tattoueurs.findUnique({ where: { id } });
    if (!existingArtist) {
      return NextResponse.json({ error: "Tatoueur non trouvé" }, { status: 404 });
    }

    let imageUrl = existingArtist.image;
    if (data.image) {
      imageUrl = await uploadToCloudinary(data.image);
    }

    let projectImages = existingArtist.projectImages;
    if (Array.isArray(data.projectImages)) {
      projectImages = [];
      for (const img of data.projectImages) {
        projectImages.push(await uploadToCloudinary(img));
      }
    }

    const updatedArtist = await prisma.tattoueurs.update({
      where: { id },
      data: {
        name: data.name || existingArtist.name,
        Description: data.Description || existingArtist.Description,
        Technique: data.Technique || existingArtist.Technique,
        Style: data.Style || existingArtist.Style,
        image: imageUrl,
        projectImages,
      },
    });
    return NextResponse.json(updatedArtist);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du tatoueur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE - Supprimer un tatoueur
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }

    const existingArtist = await prisma.tattoueurs.findUnique({ where: { id } });
    if (!existingArtist) {
      return NextResponse.json({ error: "Tatoueur non trouvé" }, { status: 404 });
    }

    if (existingArtist.image) {
      await cloudinary.uploader.destroy(existingArtist.image);
    }

    if (existingArtist.projectImages) {
      for (const img of existingArtist.projectImages) {
        await cloudinary.uploader.destroy(img);
      }
    }

    await prisma.tattoueurs.delete({ where: { id } });
    return NextResponse.json({ message: "Tatoueur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du tatoueur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}