import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Formations() {
  const session = await getServerSession(authOptions);
  const formations = await prisma.formation.findMany();
  
  let purchasedIds: string[] = [];
  if (session?.user?.id) {
    const purchases = await prisma.purchase.findMany({
      where: { userId: session.user.id, status: "PAID" }
    });
    purchasedIds = purchases.map(p => p.formationId);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#0A2540]">Nos Formations</h1>
      
      {formations.length === 0 ? (
        <p className="text-gray-500">Aucune formation disponible.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.map((formation) => {
            const isPurchased = purchasedIds.includes(formation.id);
            return (
              <div key={formation.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="relative h-56 bg-gray-200">
                  {formation.thumbnailUrl ? (
                    <Image src={formation.thumbnailUrl} alt={formation.title} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">Miniature</div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-bold text-xl mb-2">{formation.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{formation.description}</p>
                  <div className="mt-auto">
                    <div className="text-xl font-bold text-[#FF6B00] mb-4">{formation.price} FCFA</div>
                    {isPurchased ? (
                      <Link href={`/formations/${formation.id}`} className="block w-full text-center bg-[#0A2540] text-white py-2 rounded hover:bg-[#1a385b] transition">
                        Accéder aux vidéos
                      </Link>
                    ) : (
                      <Link href={`/formations/${formation.id}`} className="block w-full text-center bg-[#FF6B00] text-white py-2 rounded hover:bg-[#e56000] transition">
                        Détails & Achat
                      </Link>
                    )}
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
