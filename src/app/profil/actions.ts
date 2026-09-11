"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateProfileName(name: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Non autorisé" };
    }

    if (!name || name.trim().length < 2) {
      return { success: false, error: "Le nom doit comporter au moins 2 caractères." };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: name.trim() },
    });

    revalidatePath("/profil");
    revalidatePath("/mes-cours");
    return { success: true, message: "Nom mis à jour avec succès !" };
  } catch (err: any) {
    return { success: false, error: err.message || "Erreur lors de la mise à jour." };
  }
}

export async function updatePassword(currentPassword: string, newPassword: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Non autorisé" };
    }

    if (!currentPassword || !newPassword) {
      return { success: false, error: "Tous les champs sont requis." };
    }

    if (newPassword.length < 4) {
      return { success: false, error: "Le nouveau mot de passe doit faire au moins 4 caractères." };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return { success: false, error: "Utilisateur non trouvé." };
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return { success: false, error: "L'ancien mot de passe est incorrect." };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { success: true, message: "Mot de passe modifié avec succès !" };
  } catch (err: any) {
    return { success: false, error: err.message || "Erreur lors du changement de mot de passe." };
  }
}
