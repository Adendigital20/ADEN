import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function MesCours() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const purchases = await prisma.purchase.findMany({
    where: { userId: session.user.id, status: "PAID" },
    include: {
      formation: {
        include: {
          videos: {
            include: {
              videoProgress: { where: { userId: session.user.id } }
            }
          }
        }
      }
    },
    orderBy: { id: "desc" }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#0A2540]">Mon Tableau de Bord</h1>
      
      {purchases.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 mb-4">Vous n'avez acheté aucune formation pour le moment.</p>
          <Link href="/formations" className="inline-block bg-[#FF6B00] text-white px-6 py-2 rounded hover:bg-[#e56000] transition">
            Parcourir les formations
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {purchases.map((purchase) => {
            const formation = purchase.formation;
            const totalVideos = formation.videos.length;
            const completedVideos = formation.videos.filter(v => v.videoProgress.some(p => p.completed)).length;
            const progressPercentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

            return (
              <div key={purchase.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="relative h-48 bg-gray-200">
                  {formation.thumbnailUrl ? (
                    <Image src={formation.thumbnailUrl} alt={formation.title} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">Miniature</div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-bold text-xl mb-2">{formation.title}</h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progression</span>
                      <span>{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-[#25D366] h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link href={`/formations/${formation.id}`} className="block w-full text-center bg-[#0A2540] text-white py-2 rounded hover:bg-[#1a385b] transition">
                      Continuer l'apprentissage
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
