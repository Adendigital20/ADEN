import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Formations() {
  const session = await getServerSession(authOptions);
  const formations = await prisma.formation.findMany({
    include: {
      videos: true,
      qcms: true,
    },
    orderBy: { id: "desc" },
  });

  let purchasedIds: string[] = [];
  if (session?.user?.id) {
    const purchases = await prisma.purchase.findMany({
      where: { userId: session.user.id, status: "PAID" },
    });
    purchasedIds = purchases.map((p) => p.formationId);
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Hero Formations */}
        <div className="bg-gradient-to-r from-[#0A2540] via-[#0f3459] to-[#0A2540] text-white rounded-3xl p-8 md:p-12 mb-12 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="bg-[#FF6B00] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Cursus Certifiants
            </span>
            <h1 className="text-3xl md:text-5xl font-black mt-3 mb-3">
              Nos Formations Vidéo
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
              Développez des compétences pratiques recherchées sur le marché : programmation, marketing digital, e-commerce et entrepreneuriat.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">🎓 Certificat à l'issue</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">⚡ Accès Immédiat 24/7</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">📝 Évaluation par QCM</span>
            </div>
          </div>
          <div className="absolute right-[-10px] bottom-[-20px] text-9xl opacity-10 font-black select-none pointer-events-none">
            🎓
          </div>
        </div>

        {/* Grille des Formations */}
        {formations.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center max-w-md mx-auto shadow-sm border border-gray-100">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-2">Formations en préparation</h3>
            <p className="text-gray-500 text-sm mb-6">
              Nos formateurs finalisent actuellement les prochains cursus.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-2.5 bg-[#FF6B00] text-white font-bold rounded-xl text-sm hover:bg-[#e56000] transition"
            >
              Être alerté des sorties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((formation) => {
              const isPurchased = purchasedIds.includes(formation.id);
              return (
                <div
                  key={formation.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Miniature */}
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                    {formation.thumbnailUrl ? (
                      <Image
                        src={formation.thumbnailUrl}
                        alt={formation.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2540] to-blue-900 flex items-center justify-center text-white font-bold text-lg p-4 text-center">
                        🎓 {formation.title}
                      </div>
                    )}

                    <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                      <span className="bg-[#0A2540]/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                        {formation.videos.length} {formation.videos.length > 1 ? "vidéos" : "vidéo"}
                      </span>
                      {formation.qcms.length > 0 && (
                        <span className="bg-[#FF6B00]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          ✓ QCM inclus
                        </span>
                      )}
                    </div>

                    {isPurchased && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                          ✓ Déjà acquise
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg text-[#0A2540] mb-2 line-clamp-2 group-hover:text-[#FF6B00] transition">
                      {formation.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {formation.description || "Formation pratique dispensée par nos experts avec exercices réels."}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase font-medium">Tarif</span>
                        <span className="text-xl font-black text-[#FF6B00]">
                          {formation.price.toLocaleString("fr-FR")} FCFA
                        </span>
                      </div>

                      {isPurchased ? (
                        <Link
                          href={`/formations/${formation.id}`}
                          className="px-4 py-2.5 bg-[#0A2540] hover:bg-[#1a385b] text-white font-bold rounded-xl text-xs transition shadow-sm"
                        >
                          Accéder aux cours →
                        </Link>
                      ) : (
                        <Link
                          href={`/formations/${formation.id}`}
                          className="px-4 py-2.5 bg-[#FF6B00] hover:bg-[#e56000] text-white font-bold rounded-xl text-xs transition shadow-sm"
                        >
                          Détails & Achat →
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
    </div>
  );
}
