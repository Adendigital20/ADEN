import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A2540] text-gray-300 pt-14 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Colonne 1 : Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="text-xl font-extrabold text-white tracking-wider flex items-center gap-1">
              ADEN <span className="text-[#FF6B00]">DIGITAL</span> ACADEMY
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              La plateforme de référence pour maîtriser les compétences digitales, le business en ligne et propulser votre carrière ou entreprise en Afrique et dans le monde.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF6B00] text-white flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <span className="text-sm font-bold">f</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF6B00] text-white flex items-center justify-center transition"
                aria-label="LinkedIn"
              >
                <span className="text-sm font-bold">in</span>
              </a>
              <a 
                href="https://wa.me/22965679399" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition"
                aria-label="WhatsApp"
              >
                <span className="text-sm font-bold">WA</span>
              </a>
            </div>
          </div>

          {/* Colonne 2 : Liens rapides */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-l-4 border-[#FF6B00] pl-2">
              Plateforme
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/formations" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  Formations Certifiantes
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  Boutique en Ligne
                </Link>
              </li>
              <li>
                <Link href="/qcm" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  Évaluations & QCM
                </Link>
              </li>
              <li>
                <Link href="/mes-cours" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  Espace Étudiant
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Support & Contact */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-l-4 border-[#FF6B00] pl-2">
              Support & Aide
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link href="/contact#faq" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  Questions fréquentes (FAQ)
                </Link>
              </li>
              <li>
                <a 
                  href="https://wa.me/22965679399" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-[#25D366] transition inline-block"
                >
                  Assistance WhatsApp directe
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  Connexion compte
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Coordonnées & Sécurité */}
          <div className="space-y-3 text-sm">
            <h3 className="text-white font-semibold text-base mb-4 border-l-4 border-[#FF6B00] pl-2">
              Contact Direct
            </h3>
            <p className="text-gray-400">
              <strong className="text-white">Email :</strong> contact@aden-academy.com
            </p>
            <p className="text-gray-400">
              <strong className="text-white">WhatsApp :</strong> +229 65 67 93 99
            </p>
            <p className="text-gray-400">
              <strong className="text-white">Disponibilité :</strong> Lun - Sam : 08h - 20h
            </p>
            <div className="pt-2">
              <span className="inline-block bg-green-500/10 text-green-400 text-xs px-3 py-1.5 rounded-full border border-green-500/20">
                ● Plateforme sécurisée 100% Cloud
              </span>
            </div>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ADEN DIGITAL ACADEMY. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-gray-300 transition">Confidentialité</Link>
            <Link href="/contact" className="hover:text-gray-300 transition">Conditions générales</Link>
            <Link href="/contact" className="hover:text-gray-300 transition">Support technique</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
