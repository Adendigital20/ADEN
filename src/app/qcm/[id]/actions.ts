"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function submitQuizScore(formationId: string, score: number, total: number) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }

  const passed = score >= (total / 2); // 50% pour réussir

  await prisma.quizResult.create({
    data: {
      userId: session.user.id,
      formationId,
      score,
      total,
      passed
    }
  });

  revalidatePath("/mes-cours");
  revalidatePath(`/qcm/${formationId}`);
}
