import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const { formationId } = await req.json();

    const existingPurchase = await prisma.purchase.findFirst({
      where: { userId: session.user.id, formationId, status: "PAID" }
    });

    if (existingPurchase) {
      return NextResponse.json({ message: "Déjà acheté" }, { status: 400 });
    }

    await prisma.purchase.create({
      data: {
        userId: session.user.id,
        formationId,
        status: "PAID",
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
