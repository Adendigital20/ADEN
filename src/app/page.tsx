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
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      
      {/* 1. HERO SECTION : INFORMATIQUE, IA & VENTE PC */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A2540] via-[#0d2238] to-[#0A2540] text-white py-20 lg:py-28 px-4">
        {/* Halos décoratifs verts et bleus */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs md:text-sm font-semibold text-emerald-400 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Informatique • Intelligence Artificielle • Vente PC & Accessoires
          </div>

          {/* Titre Principal */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Maîtrisez l'Outil Informatique & l'IA. Équipez-vous avec{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              ADEN DIGITAL
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Formez-vous aux compétences indispensables du numérique (maîtrise du PC, bureautique, outils d'IA) et trouvez vos ordinateurs portables, de bureau et accessoires fiables au meilleur prix.
          </p>

          {/* Boutons d'appel à l'action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/formations"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 text-center"
            >
              Nos Formations (Info & IA) 🚀
            </Link>
            <Link
              href="/boutique"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl backdrop-blur-sm transition-all text-center"
            >
              Boutique PC & Accessoires 💻
            </Link>
          </div>

          {/* Chiffres clés */}
          <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-white">+1 500</div>
              <p className="text-xs text-gray-400 font-medium mt-1">Personnes Formées</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-emerald-400">100%</div>
              <p className="text-xs text-gray-400 font-medium mt-1">Pratique sur Ordinateur</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-white">PC & Accessoires</div>
              <p className="text-xs text-gray-400 font-medium mt-1">Matériel Testé & Garanti</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-emerald-400">24/7</div>
              <p className="text-xs text-gray-400 font-medium mt-1">Accès aux Cours & Vidéos</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NOS 4 PILIERS D'ACTIVITÉ */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Nos Domaines d'Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A2540] mt-3">
              Ce que nous faisons pour vous propulser
            </h2>
            <p className="text-gray-600 mt-3 text-sm md:text-base">
              De l'apprentissage complet jusqu'à l'équipement matériel, nous couvrons tous vos besoins technologiques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pilier 1 : Maîtrise de l'informatique */}
            <div className="bg-gray-50 p-7 rounded-2xl border border-gray-200/70 hover:shadow-lg hover:border-emerald-300 transition group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-bold mb-5 group-hover:scale-110 transition">
                💻
              </div>
              <h3 className="font-bold text-lg text-[#0A2540] mb-2">Maîtrise de l'Outil Informatique</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Apprenez à utiliser un ordinateur en toute autonomie : système Windows, gestion des fichiers, pack bureautique (Word, Excel, PowerPoint) et internet.
              </p>
            </div>

            {/* Pilier 2 : Utilisation de l'IA */}
            <div className="bg-gray-50 p-7 rounded-2xl border border-gray-200/70 hover:shadow-lg hover:border-emerald-300 transition group">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mb-5 group-hover:scale-110 transition">
                🤖
              </div>
              <h3 className="font-bold text-lg text-[#0A2540] mb-2">Utilisation Pratique de l'IA</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Multipliez votre productivité grâce à ChatGPT, l'automatisation, la génération de documents, d'images et les outils d'IA adaptés à vos besoins.
              </p>
            </div>

            {/* Pilier 3 : Vente de PC */}
            <div className="bg-gray-50 p-7 rounded-2xl border border-gray-200/70 hover:shadow-lg hover:border-emerald-300 transition group">
              <div className="w-14 h-14 rounded-2xl bg-gray-900 text-white flex items-center justify-center text-2xl font-bold mb-5 group-hover:scale-110 transition">
                🖥️
              </div>
              <h3 className="font-bold text-lg text-[#0A2540] mb-2">Vente d'Ordinateurs PC</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Large choix d'ordinateurs portables et de bureau (HP, Dell, Lenovo, etc.) reconditionnés ou neufs, robustes, performants et prêts à l'emploi.
              </p>
            </div>

            {/* Pilier 4 : Accessoires complémentaires */}
            <div className="bg-gray-50 p-7 rounded-2xl border border-gray-200/70 hover:shadow-lg hover:border-emerald-300 transition group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold mb-5 group-hover:scale-110 transition">
                🔌
              </div>
              <h3 className="font-bold text-lg text-[#0A2540] mb-2">Accessoires & Composants</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Souris sans fil, claviers, chargeurs d'origine, disques SSD rapides, barrettes RAM, sacoches protectrices et connectique complète.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FORMATIONS POPULAIRES (INFORMATIQUE & IA) */}
      <section className="py-16 px-4 bg-gray-100/70">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
                Apprentissage & Certifications
              </span>
              <h2 className="text-3xl font-extrabold text-[#0A2540] mt-3">
                Formations en Informatique & IA
              </h2>
            </div>
            <Link
              href="/formations"
              className="text-emerald-600 font-bold hover:underline text-sm flex items-center gap-1"
            >
              Voir toutes les formations disponibles →
            </Link>
          </div>

          {featuredFormations.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl text-center text-gray-500 border border-gray-200">
              Les prochaines sessions de formation en informatique et IA sont en cours de mise en ligne.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredFormations.map((f) => (
                <div
                  key={f.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    {f.thumbnailUrl ? (
                      <Image
                        src={f.thumbnailUrl}
                        alt={f.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2540] to-slate-800 flex items-center justify-center text-white font-bold text-base p-4 text-center">
                        💻 {f.title}
                      </div>
                    )}
                    <span className="absolute top-3 right-3 bg-[#0A2540]/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {f.videos.length} {f.videos.length > 1 ? "vidéos" : "vidéo"}
                    </span>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg text-[#0A2540] mb-2 line-clamp-1 group-hover:text-emerald-600 transition">
                      {f.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                      {f.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block font-semibold uppercase">Tarif d'accès</span>
                        <span className="text-xl font-black text-emerald-600">
                          {f.price.toLocaleString("fr-FR")} FCFA
                        </span>
                      </div>
                      <Link
                        href={`/formations/${f.id}`}
                        className="px-4 py-2 bg-[#0A2540] hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition"
                      >
                        Consulter →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. BOUTIQUE PC & ACCESSOIRES */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
                Matériel Informatique & Équipements
              </span>
              <h2 className="text-3xl font-extrabold text-[#0A2540] mt-3">
                PC Portables, Bureau & Accessoires
              </h2>
            </div>
            <Link
              href="/boutique"
              className="text-emerald-600 font-bold hover:underline text-sm flex items-center gap-1"
            >
              Parcourir toute la boutique →
            </Link>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="bg-gray-50 p-10 rounded-2xl text-center text-gray-500 border border-gray-200">
              Aucun PC ou accessoire affiché pour le moment. Contactez-nous pour connaître les stocks du jour !
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden flex flex-col hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 bg-gray-50">
                    {p.image ? (
                      <Image src={p.image} alt={p.nom} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 text-sm">
                        <span className="text-3xl mb-1">💻</span>
                        <span className="text-xs">Image du PC/Accessoire</span>
                      </div>
                    )}
                    {p.stock > 0 ? (
                      <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                        En Stock ({p.stock})
                      </span>
                    ) : (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                        Rupture
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="font-bold text-base text-[#0A2540] mb-1 line-clamp-1">
                      {p.nom}
                    </h3>
                    <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                      {p.description || "Matériel informatique vérifié et garanti par ADEN DIGITAL ACADEMY."}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="font-black text-emerald-600 text-base">
                        {p.prix.toLocaleString("fr-FR")} FCFA
                      </span>
                      <a
                        href={`https://wa.me/22965679399?text=${encodeURIComponent("Bonjour ADEN DIGITAL, je souhaite commander : " + p.nom + " (Prix: " + p.prix + " FCFA).")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-sm"
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

      {/* 5. TÉMOIGNAGES CLIENTS & ÉTUDIANTS */}
      <section className="py-20 px-4 bg-[#0A2540] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="bg-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full border border-emerald-500/30">
              Témoignages vérifiés
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">
              Ils ont fait confiance à ADEN DIGITAL
            </h2>
            <p className="text-gray-300 mt-2 text-sm md:text-base font-light">
              Découvrez les retours de ceux qui ont appris à maîtriser l'informatique, l'IA ou acheté leur matériel chez nous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
              <div className="flex text-emerald-400 text-lg mb-4">★★★★★</div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "Je ne savais presque rien faire sur un ordinateur. Grâce à la formation en maîtrise de l'outil informatique, je gère maintenant Excel et mes documents administratifs sans difficulté !"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white text-sm">
                  AS
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Amina S.</h4>
                  <p className="text-xs text-gray-400">Secrétaire & Apprenante</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
              <div className="flex text-emerald-400 text-lg mb-4">★★★★★</div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "La formation sur l'IA a changé ma façon de travailler. J'utilise ChatGPT et les outils d'automatisation tous les jours pour rédiger mes rapports et gagner des heures précieuses."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-sm">
                  BO
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Boris O.</h4>
                  <p className="text-xs text-gray-400">Consultant Indépendant</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
              <div className="flex text-emerald-400 text-lg mb-4">★★★★★</div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "J'ai acheté un PC portable HP Core i5 avec une souris et un sac. L'ordinateur est super rapide, la batterie tient parfaitement. Service après-vente impeccable !"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
                  DK
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Daniel K.</h4>
                  <p className="text-xs text-gray-400">Client Boutique PC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BANNIÈRE FINALE D'ACTION */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 via-teal-700 to-[#0A2540] text-white text-center">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h2 className="text-3xl md:text-5xl font-black">
            Passez au niveau supérieur avec ADEN DIGITAL
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto font-light">
            Formez-vous aux outils d'aujourd'hui et de demain, ou équipez-vous avec du matériel informatique de premier choix.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/formations"
              className="px-8 py-4 bg-white text-[#0A2540] hover:bg-gray-100 font-bold rounded-2xl shadow-xl transition"
            >
              Découvrir les formations →
            </Link>
            <Link
              href="/boutique"
              className="px-8 py-4 bg-[#0A2540] hover:bg-black text-white font-bold rounded-2xl shadow-xl transition border border-white/20"
            >
              Commander un PC ou Accessoire
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
