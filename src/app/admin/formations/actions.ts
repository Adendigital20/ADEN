"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

export async function addFormation(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const file = formData.get("thumbnail") as File | null;

    if (!title || isNaN(price)) {
      return { success: false, error: "Le titre et le prix sont obligatoires." };
    }

    let thumbnailUrl: string | null = null;
    if (file && file.size > 0) {
      const blob = await put(`formations/${Date.now()}-${file.name}`, file, {
        access: "public",
      });
      thumbnailUrl = blob.url;
    }

    await prisma.formation.create({
      data: {
        title: title.trim(),
        description: description?.trim() || "",
        price,
        thumbnailUrl,
      },
    });

    revalidatePath("/admin/formations");
    revalidatePath("/formations");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("Erreur ajout formation:", err);
    return { success: false, error: err.message || "Erreur serveur" };
  }
}

export async function deleteFormation(id: string) {
  try {
    // Supprimer d'abord les vidéos, qcms et progrès associés si besoin
    await prisma.videoProgress.deleteMany({
      where: { video: { formationId: id } },
    });
    await prisma.video.deleteMany({
      where: { formationId: id },
    });
    await prisma.qcm.deleteMany({
      where: { formationId: id },
    });
    await prisma.purchase.deleteMany({
      where: { formationId: id },
    });
    await prisma.quizResult.deleteMany({
      where: { formationId: id },
    });
    await prisma.formation.delete({
      where: { id },
    });

    revalidatePath("/admin/formations");
    revalidatePath("/formations");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Erreur lors de la suppression." };
  }
}

export async function addVideo(formData: FormData) {
  try {
    const formationId = formData.get("formationId") as string;
    const title = formData.get("title") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const order = parseInt((formData.get("order") as string) || "0", 10);

    if (!formationId || !title || !videoUrl) {
      return { success: false, error: "Tous les champs de la vidéo sont obligatoires." };
    }

    await prisma.video.create({
      data: {
        formationId,
        title: title.trim(),
        videoUrl: videoUrl.trim(),
        order: isNaN(order) ? 0 : order,
      },
    });

    revalidatePath(`/formations/${formationId}`);
    revalidatePath("/admin/formations");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Erreur lors de l'ajout de la vidéo." };
  }
}

export async function deleteVideo(videoId: string, formationId: string) {
  try {
    await prisma.videoProgress.deleteMany({
      where: { videoId },
    });
    await prisma.video.delete({
      where: { id: videoId },
    });

    revalidatePath(`/formations/${formationId}`);
    revalidatePath("/admin/formations");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Erreur lors de la suppression de la vidéo." };
  }
}
