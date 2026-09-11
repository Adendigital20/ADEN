"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addQcmQuestion(formData: FormData) {
  try {
    const formationId = formData.get("formationId") as string;
    const question = formData.get("question") as string;
    const optionA = formData.get("optionA") as string;
    const optionB = formData.get("optionB") as string;
    const optionC = formData.get("optionC") as string;
    const optionD = formData.get("optionD") as string;
    const correctAnswer = formData.get("correctAnswer") as string;

    if (!formationId || !question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
      return { success: false, error: "Tous les champs sont obligatoires." };
    }

    await prisma.qcm.create({
      data: {
        formationId,
        question: question.trim(),
        optionA: optionA.trim(),
        optionB: optionB.trim(),
        optionC: optionC.trim(),
        optionD: optionD.trim(),
        correctAnswer: correctAnswer.trim().toUpperCase(),
      },
    });

    revalidatePath("/admin/qcm");
    revalidatePath("/qcm");
    revalidatePath(`/qcm/${formationId}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Erreur lors de l'ajout de la question." };
  }
}

export async function deleteQcmQuestion(id: string) {
  try {
    const q = await prisma.qcm.delete({
      where: { id },
    });

    revalidatePath("/admin/qcm");
    revalidatePath("/qcm");
    revalidatePath(`/qcm/${q.formationId}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Erreur lors de la suppression." };
  }
}
