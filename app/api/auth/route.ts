import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  
  // Définir l'email et le mot de passe administrateur dans les variables d'environnement
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
}
