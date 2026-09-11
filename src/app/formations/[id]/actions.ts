"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function toggleVideoProgress(videoId: string, completed: boolean) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }

  await prisma.videoProgress.upsert({
    where: {
      userId_videoId: {
        userId: session.user.id,
        videoId: videoId
      }
    },
    update: {
      completed
    },
    create: {
      userId: session.user.id,
      videoId,
      completed
    }
  });

  revalidatePath("/mes-cours");
  revalidatePath(`/formations`);
}
