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
        <div className="bg-gradient-to-r from-[#0A2540] to-[#143d66] text-white rounded-3xl p-8 md:p-12 mb-12 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="bg-[#FF6B00] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              E-commerce officiel
            </span>
            <h1 className="text-3xl md:text-5xl font-black mt-3 mb-3">
              Boutique ADEN DIGITAL
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
              Découvrez notre sélection exclusive d'équipements, outils et ressources indispensables pour accélérer vos projets digitaux et professionnels.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">⚡ Livraison Express</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">🔒 Paiement Sécurisé</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">💬 Commande WhatsApp Directe</span>
            </div>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] text-9xl opacity-10 font-black select-none pointer-events-none">
            🛍️
          </div>
        </div>

        {/* Grille des produits */}
        {products.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center max-w-md mx-auto shadow-sm border border-gray-100">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-2">Boutique en cours de réapprovisionnement</h3>
            <p className="text-gray-500 text-sm mb-6">
              De nouveaux articles arrivent très prochainement. Contactez notre équipe pour toute précommande spécifique.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-2.5 bg-[#FF6B00] text-white font-bold rounded-xl text-sm hover:bg-[#e56000] transition"
            >
              Nous contacter
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.nom}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                      <span className="text-3xl mb-1">📷</span>
                      <span className="text-xs">Pas d'image</span>
                    </div>
                  )}

                  {/* Badge Stock */}
                  <div className="absolute top-3 left-3">
                    {product.stock > 0 ? (
                      <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        En stock ({product.stock})
                      </span>
                    ) : (
                      <span className="bg-red-500/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        Rupture
                      </span>
                    )}
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-bold text-base text-[#0A2540] mb-1.5 line-clamp-1 group-hover:text-[#FF6B00] transition">
                    {product.nom}
                  </h3>
                  <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">
                    {product.description || "Article de qualité vérifié par ADEN DIGITAL ACADEMY."}
                  </p>

                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-medium">Prix</span>
                      <span className="font-extrabold text-[#FF6B00] text-base">
                        {product.prix.toLocaleString("fr-FR")} FCFA
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/22965679399?text=${encodeURIComponent(
                        `Bonjour ADEN DIGITAL ACADEMY, je souhaite commander l'article : ${product.nom} (Prix: ${product.prix} FCFA).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#1ebe57] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
                    >
                      <span>WhatsApp</span>
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
