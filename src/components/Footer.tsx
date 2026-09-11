import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A2540] text-gray-300 pt-14 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Colonne 1 : Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="text-xl font-extrabold text-white tracking-wider flex items-center gap-1">
              ADEN <span className="text-emerald-400">DIGITAL</span> ACADEMY
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Centre de référence pour la formation en informatique (maîtrise de l'outil informatique), l'utilisation pratique de l'Intelligence Artificielle (IA) et la vente de PC et accessoires complémentaires.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500 text-white flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <span className="text-sm font-bold">f</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500 text-white flex items-center justify-center transition"
                aria-label="LinkedIn"
              >
                <span className="text-sm font-bold">in</span>
              </a>
              <a 
                href="https://wa.me/22965679399" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500 text-white flex items-center justify-center transition"
                aria-label="WhatsApp"
              >
                <span className="text-sm font-bold">WA</span>
              </a>
            </div>
          </div>

          {/* Colonne 2 : Formations */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-l-4 border-emerald-500 pl-2">
              Formations Certifiantes
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/formations" className="hover:text-emerald-400 hover:translate-x-1 transition-all inline-block">
                  Maîtrise de l'Outil Informatique
                </Link>
              </li>
              <li>
                <Link href="/formations" className="hover:text-emerald-400 hover:translate-x-1 transition-all inline-block">
                  Bureautique (Word, Excel, PPT)
                </Link>
              </li>
              <li>
                <Link href="/formations" className="hover:text-emerald-400 hover:translate-x-1 transition-all inline-block">
                  Utilisation de l'IA au Quotidien
                </Link>
              </li>
              <li>
                <Link href="/formations" className="hover:text-emerald-400 hover:translate-x-1 transition-all inline-block">
                  Prompt Engineering & ChatGPT
                </Link>
              </li>
              <li>
                <Link href="/qcm" className="hover:text-emerald-400 hover:translate-x-1 transition-all inline-block">
                  Évaluations & Tests QCM
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Boutique PC & Accessoires */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-l-4 border-emerald-500 pl-2">
              Vente PC & Matériel
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/boutique" className="hover:text-emerald-400 hover:translate-x-1 transition-all inline-block">
                  Ordinateurs Portables (PC)
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="hover:text-emerald-400 hover:translate-x-1 transition-all inline-block">
                  Ordinateurs de Bureau
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="hover:text-emerald-400 hover:translate-x-1 transition-all inline-block">
                  Disques SSD, RAM & Stockage
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="hover:text-emerald-400 hover:translate-x-1 transition-all inline-block">
                  Accessoires (Souris, Claviers, Sacs)
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="hover:text-emerald-400 hover:translate-x-1 transition-all inline-block">
                  Chargeurs & Connectique
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Coordonnées & Sécurité */}
          <div className="space-y-3 text-sm">
            <h3 className="text-white font-semibold text-base mb-4 border-l-4 border-emerald-500 pl-2">
              Contact & Boutique
            </h3>
            <p className="text-gray-400">
              <strong className="text-white">Email :</strong> contact@aden-academy.com
            </p>
            <p className="text-gray-400">
              <strong className="text-white">WhatsApp / Commande :</strong> +229 65 67 93 99
            </p>
            <p className="text-gray-400">
              <strong className="text-white">Horaires :</strong> Lun - Sam : 08h00 - 20h00
            </p>
            <div className="pt-2">
              <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1.5 rounded-full border border-emerald-500/20">
                ● Matériel testé & garanti - Formations certifiées
              </span>
            </div>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ADEN DIGITAL ACADEMY. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-gray-300 transition">Mentions légales</Link>
            <Link href="/contact" className="hover:text-gray-300 transition">Garantie matériel</Link>
            <Link href="/contact" className="hover:text-gray-300 transition">Assistance technique</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
