import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Veuillez remplir tous les champs." }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Cet email est déjà utilisé." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ETUDIANT",
      },
    });

    return NextResponse.json({ message: "Utilisateur créé avec succès." }, { status: 201 });
  } catch (error) {
    console.error("Erreur register:", error);
    return NextResponse.json({ message: "Une erreur s'est produite." }, { status: 500 });
  }
}
