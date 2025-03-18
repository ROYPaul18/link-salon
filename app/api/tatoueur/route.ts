import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// GET - Récupérer tous les tatoueurs ou un tatoueur spécifique
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      // Récupérer un tatoueur spécifique par son ID
      const tattooArtist = await prisma.tattoueurs.findUnique({
        where: { id }
      });

      if (!tattooArtist) {
        return NextResponse.json(
          { error: "Tatoueur non trouvé" },
          { status: 404 }
        );
      }

      return NextResponse.json(tattooArtist);
    } else {
      // Récupérer tous les tatoueurs
      const tattooArtists = await prisma.tattoueurs.findMany();
      return NextResponse.json(tattooArtists);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des tatoueurs:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des tatoueurs" },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau tatoueur
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Valider les champs requis
    if (!data.name || !data.Description || !data.Technique || !data.Style) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }
    
    // S'assurer que Link est un tableau
    const links = Array.isArray(data.Link) ? data.Link : 
      data.Link ? [data.Link] : [];
    
    const tattooArtist = await prisma.tattoueurs.create({
      data: {
        name: data.name,
        Description: data.Description,
        Technique: data.Technique,
        Style: data.Style,
        Link: links
      }
    });
    
    return NextResponse.json(tattooArtist, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du tatoueur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du tatoueur" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un tatoueur existant
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "ID du tatoueur requis" },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    
    // Vérifier si le tatoueur existe
    const existingArtist = await prisma.tattoueurs.findUnique({
      where: { id }
    });
    
    if (!existingArtist) {
      return NextResponse.json(
        { error: "Tatoueur non trouvé" },
        { status: 404 }
      );
    }
    
    // S'assurer que Link est un tableau
    const links = Array.isArray(data.Link) ? data.Link : 
      data.Link ? [data.Link] : existingArtist.Link;
    
    // Mettre à jour le tatoueur
    const updatedArtist = await prisma.tattoueurs.update({
      where: { id },
      data: {
        name: data.name || existingArtist.name,
        Description: data.Description || existingArtist.Description,
        Technique: data.Technique || existingArtist.Technique,
        Style: data.Style || existingArtist.Style,
        Link: links
      }
    });
    
    return NextResponse.json(updatedArtist);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du tatoueur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du tatoueur" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un tatoueur
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "ID du tatoueur requis" },
        { status: 400 }
      );
    }
    
    // Vérifier si le tatoueur existe
    const existingArtist = await prisma.tattoueurs.findUnique({
      where: { id }
    });
    
    if (!existingArtist) {
      return NextResponse.json(
        { error: "Tatoueur non trouvé" },
        { status: 404 }
      );
    }
    
    // Supprimer le tatoueur
    await prisma.tattoueurs.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: "Tatoueur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du tatoueur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du tatoueur" },
      { status: 500 }
    );
  }
}