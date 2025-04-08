// app/api/events/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";
import { promises as fs } from "fs";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadImageToCloudinary = async (
  filePath: string,
  folder: string
): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `events/${folder}`,
      transformation: [{ width: 1200, height: 800, crop: "fill" }],
    });
    return result.secure_url;
  } catch (error) {
    console.error("Erreur d'upload Cloudinary:", error);
    throw new Error(
      `Échec de l'upload vers Cloudinary: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files: Record<string, File[]> = {};
    const fields: Record<string, string> = {};

    // Extraire les champs et fichiers
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (!files[key]) files[key] = [];
        files[key].push(value);
      } else {
        fields[key] = value as string;
      }
    }

    // Validation des champs requis
    if (!fields.time || !fields.duration || !fields.location || !fields.title) {
      return NextResponse.json(
        { error: "Veuillez fournir toutes les informations requises" },
        { status: 400 }
      );
    }
    // Upload de l'image si elle existe
    let imageUrl = "";
    if (files.image?.[0]) {
      const file = files.image[0];

      // ✅ Vérification de la taille de l'image (3 Mo max)
      if (file.size > 3 * 1024 * 1024) {
        return NextResponse.json(
          { error: "L'image dépasse la taille maximale autorisée de 3 Mo." },
          { status: 400 }
        );
      }

      const buffer = await file.arrayBuffer();
      const tempFilePath = `/tmp/${Date.now()}_${file.name}`;
      await fs.writeFile(tempFilePath, Buffer.from(buffer));
      imageUrl = await uploadImageToCloudinary(tempFilePath, "main");
      await fs.unlink(tempFilePath);
    }

    // Créer l'événement
    const newEvent = await prisma.event.create({
      data: {
        time: new Date(fields.time),
        duration: parseInt(fields.duration),
        location: fields.location,
        title: fields.title,
        image: imageUrl || "",
        adresse: fields.adresse || "",
      } as any,
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'événement:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la création de l'événement",
      },
      { status: 500 }
    );
  }
}

// GET - Récupérer tous les événements (inchangé)
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        time: "asc",
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Erreur lors de la récupération des événements:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des événements" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un événement
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID d'événement non fourni" },
        { status: 400 }
      );
    }

    // Récupérer l'événement pour avoir l'URL de l'image
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Événement non trouvé" },
        { status: 404 }
      );
    }

    // Supprimer l'image de Cloudinary si elle existe
    if (event.image) {
      const publicId = event.image.match(/\/v\d+\/(.+?)\.\w+$/)?.[1];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId).catch(console.error);
      }
    }

    await prisma.event.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'événement:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'événement" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un événement
export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID d'événement non fourni" },
        { status: 400 }
      );
    }

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

    // Gestion de la nouvelle image
    let imageUrl: string | undefined;
    if (files.image?.[0]) {
      const file = files.image[0];
      const buffer = await file.arrayBuffer();
      const tempFilePath = `/tmp/${Date.now()}_${file.name}`;
      await fs.writeFile(tempFilePath, Buffer.from(buffer));
      imageUrl = await uploadImageToCloudinary(tempFilePath, "main");
      await fs.unlink(tempFilePath);

      // Supprimer l'ancienne image si elle existe
      const existingEvent = await prisma.event.findUnique({
        where: { id: parseInt(id) },
      });
      if (existingEvent?.image) {
        const publicId = existingEvent.image.match(/\/v\d+\/(.+?)\.\w+$/)?.[1];
        if (publicId) {
          await cloudinary.uploader.destroy(publicId).catch(console.error);
        }
      }
    }

    // Préparation des données de mise à jour
    const updateData: any = {
      ...fields,
      time: fields.time ? new Date(fields.time) : undefined,
    };

    if (imageUrl !== undefined) {
      updateData.image = imageUrl;
    }

    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'événement:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la mise à jour de l'événement",
      },
      { status: 500 }
    );
  }
}
