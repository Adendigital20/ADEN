import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import BuyButton from "./BuyButton";
import ProgressCheckbox from "./ProgressCheckbox";

export default async function FormationDetail({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  const formation = await prisma.formation.findUnique({
    where: { id: params.id },
    include: {
      videos: { orderBy: { order: 'asc' } }
    }
  });

  if (!formation) {
    notFound();
  }

  let hasPurchased = false;
  let videoProgresses: Record<string, boolean> = {};

  if (session?.user?.id) {
    const purchase = await prisma.purchase.findFirst({
      where: { userId: session.user.id, formationId: formation.id, status: "PAID" }
    });
    hasPurchased = !!purchase;

    if (hasPurchased) {
      const progress = await prisma.videoProgress.findMany({
        where: { userId: session.user.id, video: { formationId: formation.id } }
      });
      progress.forEach(p => {
        videoProgresses[p.videoId] = p.completed;
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-[#0A2540]">{formation.title}</h1>
      <p className="text-gray-700 text-lg mb-8">{formation.description}</p>

      {!hasPurchased ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Achetez pour débloquer</h2>
          <p className="mb-6">Pour accéder à cette formation et ses vidéos, vous devez l'acheter.</p>
          <div className="text-3xl font-bold text-[#FF6B00] mb-6">{formation.price} FCFA</div>
          
          {session ? (
            <BuyButton formationId={formation.id} />
          ) : (
            <a href="/login" className="inline-block bg-[#0A2540] text-white px-6 py-3 rounded hover:bg-[#1a385b] transition">
              Connectez-vous pour acheter
            </a>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Contenu de la formation</h2>
          
          {formation.videos.length === 0 ? (
            <p className="text-gray-500">Aucune vidéo disponible pour le moment.</p>
          ) : (
            <div className="space-y-8">
              {formation.videos.map((video, index) => {
                const isCompleted = videoProgresses[video.id] || false;
                return (
                  <div key={video.id} className={`border p-4 rounded-lg transition ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">{index + 1}. {video.title}</h3>
                      <ProgressCheckbox videoId={video.id} initialCompleted={isCompleted} />
                    </div>
                    <div className="aspect-w-16 aspect-h-9 w-full max-w-4xl bg-black rounded overflow-hidden">
                      <video 
                        src={video.videoUrl} 
                        controls 
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
