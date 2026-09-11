import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const [featuredFormations, featuredProducts] = await Promise.all([
    prisma.formation.findMany({
      take: 3,
      include: {
        videos: true,
      },
      orderBy: { id: "desc" },
    }),
    prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* 1. HERO SECTION MODERNE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A2540] via-[#0D3154] to-[#0A2540] text-white py-20 lg:py-28 px-4">
        {/* Cercles de fond décoratifs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs md:text-sm font-semibold text-orange-300 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
            La Plateforme de Référence en Compétences Digitales
          </div>

          {/* Titre Principal */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Développez vos compétences, boostez vos revenus avec{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-amber-400">
              ADEN DIGITAL
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Accédez à des formations vidéo 100% pratiques, validez vos connaissances par des QCM interactifs et équipez-vous sur notre boutique exclusive.
          </p>

          {/* Boutons d'appel à l'action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/formations"
              className="w-full sm:w-auto px-8 py-4 bg-[#FF6B00] hover:bg-[#e56000] text-white font-bold rounded-2xl shadow-xl hover:shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 text-center"
            >
              Explorer les formations 🚀
            </Link>
            <Link
              href="/boutique"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl backdrop-blur-sm transition-all text-center"
            >
              Visiter la boutique 🛍️
            </Link>
          </div>

          {/* Mini-statistiques Hero */}
          <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-white">+2 500</div>
              <p className="text-xs text-gray-400 font-medium mt-1">Étudiants Inscrits</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-[#FF6B00]">98%</div>
              <p className="text-xs text-gray-400 font-medium mt-1">Satisfaction Client</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-white">100%</div>
              <p className="text-xs text-gray-400 font-medium mt-1">Pratique & Concret</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-[#25D366]">24/7</div>
              <p className="text-xs text-gray-400 font-medium mt-1">Accès Illimité à Vie</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AVANTAGES : POURQUOI NOUS CHOISIR ? */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#FF6B00] font-bold text-xs uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full">
              Excellence Pédagogique
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A2540] mt-3">
              Pourquoi apprendre sur ADEN DIGITAL ACADEMY ?
            </h2>
            <p className="text-gray-600 mt-3 text-sm md:text-base">
              Une pédagogie orientée action, conçue pour vous apporter des compétences immédiatement rentabilisables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center text-2xl font-bold mb-5">
                🎬
              </div>
              <h3 className="font-bold text-lg text-[#0A2540] mb-2">Vidéos HD pas-à-pas</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Apprenez à votre rythme avec des vidéos courtes, claires et directement applicables sur vos projets.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold mb-5">
                📝
              </div>
              <h3 className="font-bold text-lg text-[#0A2540] mb-2">Validation par QCM</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Testez vos connaissances en temps réel après chaque module pour ancrer définitivement vos acquis.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-[#25D366] flex items-center justify-center text-2xl font-bold mb-5">
                ⚡
              </div>
              <h3 className="font-bold text-lg text-[#0A2540] mb-2">Boutique Intégrée</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Commandez directement les outils, matériels et produits indispensables pour accélérer vos activités.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl font-bold mb-5">
                🤝
              </div>
              <h3 className="font-bold text-lg text-[#0A2540] mb-2">Support & Écoute</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Une équipe dédiée réactive par WhatsApp pour vous débloquer et répondre à toutes vos interrogations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FORMATIONS EN VEDETTE */}
      <section className="py-16 px-4 bg-gray-100/70">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#FF6B00] font-bold text-xs uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full">
                Catalogue Sélectionné
              </span>
              <h2 className="text-3xl font-extrabold text-[#0A2540] mt-3">
                Formations populaires à l'affiche
              </h2>
            </div>
            <Link
              href="/formations"
              className="text-[#FF6B00] font-bold hover:underline text-sm flex items-center gap-1"
            >
              Voir tout le catalogue ({featuredFormations.length}+) →
            </Link>
          </div>

          {featuredFormations.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl text-center text-gray-500">
              Aucune formation en ligne actuellement. Revenez très bientôt !
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredFormations.map((f) => (
                <div
                  key={f.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-52 bg-gray-200 overflow-hidden">
                    {f.thumbnailUrl ? (
                      <Image
                        src={f.thumbnailUrl}
                        alt={f.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2540] to-blue-900 flex items-center justify-center text-white font-bold text-lg">
                        🎓 {f.title}
                      </div>
                    )}
                    <span className="absolute top-3 right-3 bg-[#0A2540]/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {f.videos.length} {f.videos.length > 1 ? "vidéos" : "vidéo"}
                    </span>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg text-[#0A2540] mb-2 line-clamp-1 group-hover:text-[#FF6B00] transition">
                      {f.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                      {f.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400 block font-medium">Prix d'accès</span>
                        <span className="text-xl font-extrabold text-[#FF6B00]">
                          {f.price.toLocaleString("fr-FR")} FCFA
                        </span>
                      </div>
                      <Link
                        href={`/formations/${f.id}`}
                        className="px-4 py-2 bg-[#0A2540] hover:bg-[#FF6B00] text-white text-xs font-bold rounded-xl transition"
                      >
                        En savoir plus →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. BOUTIQUE EN VEDETTE */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#FF6B00] font-bold text-xs uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full">
                Équipements & Outils
              </span>
              <h2 className="text-3xl font-extrabold text-[#0A2540] mt-3">
                Produits vedettes de notre Boutique
              </h2>
            </div>
            <Link
              href="/boutique"
              className="text-[#FF6B00] font-bold hover:underline text-sm flex items-center gap-1"
            >
              Découvrir la boutique →
            </Link>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl text-center text-gray-500">
              Aucun produit physique ou digital n'est disponible pour l'instant.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 bg-gray-100">
                    {p.image ? (
                      <Image src={p.image} alt={p.nom} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                        Pas d'image
                      </div>
                    )}
                    {p.stock > 0 ? (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        En Stock ({p.stock})
                      </span>
                    ) : (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Épuisé
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="font-bold text-base text-[#0A2540] mb-1 line-clamp-1">
                      {p.nom}
                    </h3>
                    <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                      {p.description || "Produit de haute qualité sélectionné par ADEN."}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="font-extrabold text-[#FF6B00] text-base">
                        {p.prix.toLocaleString("fr-FR")} FCFA
                      </span>
                      <a
                        href={`https://wa.me/22965679399?text=${encodeURIComponent("Bonjour, je souhaite commander le produit: " + p.nom)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#1ebe57] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
                      >
                        Commander
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. SECTION TÉMOIGNAGES & AVIS */}
      <section className="py-20 px-4 bg-[#0A2540] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="bg-[#FF6B00]/20 text-[#FF6B00] font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#FF6B00]/30">
              Retours d'expérience
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">
              Ce que disent nos apprenants
            </h2>
            <p className="text-gray-300 mt-2 text-sm md:text-base font-light">
              Des centaines de professionnels et étudiants ont transformé leur quotidien grâce à nos cours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
              <div className="flex text-amber-400 text-lg mb-4">★★★★★</div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "J'ai suivi la formation en e-commerce et en marketing digital. Dès la deuxième semaine, j'ai lancé ma première campagne rentable. Les vidéos sont claires et sans blabla !"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF6B00] flex items-center justify-center font-bold text-white text-sm">
                  KA
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Koffi A.</h4>
                  <p className="text-xs text-gray-400">E-commerçant indépendant</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
              <div className="flex text-amber-400 text-lg mb-4">★★★★★</div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "Le système de QCM est génial ! Ça m'a forcé à bien comprendre chaque concept avant de passer au module suivant. Le support WhatsApp est aussi ultra rapide."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-sm">
                  MD
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Mariam D.</h4>
                  <p className="text-xs text-gray-400">Étudiante en Marketing</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
              <div className="flex text-amber-400 text-lg mb-4">★★★★★</div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "J'ai commandé des produits sur la boutique pour mon activité et j'ai été livré en moins de 24h. C'est du sérieux, je recommande ADEN à 100%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center font-bold text-white text-sm">
                  ET
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Eric T.</h4>
                  <p className="text-xs text-gray-400">Entrepreneur Digital</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BANNIÈRE FINALE D'ACTION */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#FF6B00] to-[#e56000] text-white text-center">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h2 className="text-3xl md:text-5xl font-black">
            Prêt à acquérir des compétences d'avenir ?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto font-light">
            Rejoignez dès aujourd'hui la communauté des apprenants ADEN DIGITAL ACADEMY et commencez à transformer vos ambitions en résultats tangibles.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-[#0A2540] hover:bg-[#1a385b] text-white font-bold rounded-2xl shadow-xl transition"
            >
              Créer un compte gratuit →
            </Link>
            <Link
              href="/formations"
              className="px-8 py-4 bg-white text-[#FF6B00] hover:bg-gray-100 font-bold rounded-2xl shadow-xl transition"
            >
              Consulter les cours disponibles
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
