import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Boutique() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Hero Boutique */}
        <div className="bg-gradient-to-r from-[#0A2540] via-[#0f3459] to-[#0A2540] text-white rounded-3xl p-8 md:p-12 mb-12 shadow-md relative overflow-hidden border border-gray-800">
          <div className="relative z-10 max-w-2xl">
            <span className="bg-emerald-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-white">
              Vente PC & Accessoires
            </span>
            <h1 className="text-3xl md:text-5xl font-black mt-3 mb-3">
              Boutique Informatique ADEN
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
              Ordinateurs portables performants, unités centrales et tous les accessoires complémentaires indispensables : souris, claviers, chargeurs, disques SSD, RAM, casques et connectique.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">💻 PC Neufs & Reconditionnés</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">🔌 Accessoires Originaux</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">🛡️ Matériel Testé & Garanti</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">💬 Commande Rapide WhatsApp</span>
            </div>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] text-9xl opacity-10 font-black select-none pointer-events-none">
            🖥️
          </div>
        </div>

        {/* Grille des produits */}
        {products.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center max-w-md mx-auto shadow-sm border border-gray-200">
            <div className="text-5xl mb-4">💻</div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-2">Catalogue en cours de réapprovisionnement</h3>
            <p className="text-gray-500 text-sm mb-6">
              Contactez-nous directement sur WhatsApp pour connaître les arrivages d'ordinateurs et d'accessoires disponibles en boutique aujourd'hui.
            </p>
            <a
              href="https://wa.me/22965679399?text=Bonjour,%20quels%20sont%20les%20ordinateurs%20PC%20et%20accessoires%20actuellement%20disponibles%20?"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition"
            >
              Demander le stock disponible sur WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-56 bg-gray-50 overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.nom}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                      <span className="text-3xl mb-1">🖥️</span>
                      <span className="text-xs">Image non disponible</span>
                    </div>
                  )}

                  {/* Badge Stock */}
                  <div className="absolute top-3 left-3">
                    {product.stock > 0 ? (
                      <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        En stock ({product.stock})
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        Rupture
                      </span>
                    )}
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-bold text-base text-[#0A2540] mb-1.5 line-clamp-1 group-hover:text-emerald-600 transition">
                    {product.nom}
                  </h3>
                  <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">
                    {product.description || "Matériel informatique vérifié et garanti par ADEN DIGITAL."}
                  </p>

                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-medium">Prix</span>
                      <span className="font-black text-emerald-600 text-base">
                        {product.prix.toLocaleString("fr-FR")} FCFA
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/22965679399?text=${encodeURIComponent(
                        `Bonjour ADEN DIGITAL ACADEMY, je souhaite commander l'article : ${product.nom} (Prix: ${product.prix} FCFA).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
                    >
                      <span>Commander</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
