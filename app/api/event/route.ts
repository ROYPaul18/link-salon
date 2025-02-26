import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Récupérer tous les événements
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        time: 'asc',
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

// POST - Créer un nouvel événement
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { time, duration, location, image, title } = body;
    
    // Validation simple
    if (!time || !duration || !location || !title) {
      return NextResponse.json(
        { error: "Veuillez fournir toutes les informations requises" },
        { status: 400 }
      );
    }
    
    // Créer l'événement
    const newEvent = await prisma.event.create({
      data: {
        time: new Date(time),
        duration,
        location,
        image: image || "",
        title,
      },
    });
    
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'événement:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'événement" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un événement par ID
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
    
    await prisma.event.delete({
      where: {
        id,
      },
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "ID d'événement non fourni" },
        { status: 400 }
      );
    }
    
    const updatedEvent = await prisma.event.update({
      where: {
        id,
      },
      data: body,
    });
    
    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'événement:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'événement" },
      { status: 500 }
    );
  }
}