"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-[#0A2540] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3.5 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-lg md:text-2xl font-black tracking-wider flex-shrink-0" onClick={closeMenu}>
          ADEN <span className="text-[#FF6B00]">DIGITAL</span> ACADEMY
        </Link>

        {/* Bouton Hamburger (mobile uniquement) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex gap-6 items-center font-medium text-sm">
          <Link href="/formations" className="hover:text-[#FF6B00] transition">Formations</Link>
          <Link href="/boutique" className="hover:text-[#FF6B00] transition">Boutique</Link>
          <Link href="/qcm" className="hover:text-[#FF6B00] transition">QCM</Link>
          <Link href="/contact" className="hover:text-[#FF6B00] transition">Contact</Link>

          {status === "authenticated" ? (
            <div className="flex items-center gap-3 ml-3 pl-4 border-l border-white/20">
              <Link href="/mes-cours" className="text-white hover:text-[#FF6B00] transition font-bold px-2 py-1">
                Mes Cours
              </Link>
              <Link href="/profil" className="text-gray-300 hover:text-white transition px-2 py-1">
                Mon Profil
              </Link>
              {session?.user?.role === "ADMIN" && (
                <Link href="/admin/dashboard" className="text-[#FF6B00] border border-[#FF6B00] px-3 py-1 rounded-lg hover:bg-[#FF6B00] hover:text-white transition text-xs font-bold">
                  ADMIN
                </Link>
              )}
              <button
                onClick={() => signOut()}
                className="bg-red-500/80 hover:bg-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="flex gap-2.5 ml-3 pl-4 border-l border-white/20">
              <Link href="/login" className="hover:text-[#FF6B00] transition px-3 py-1.5 text-sm">
                Connexion
              </Link>
              <Link href="/register" className="bg-[#FF6B00] hover:bg-[#e56000] px-4 py-1.5 rounded-lg text-sm font-semibold transition shadow">
                Inscription
              </Link>
            </div>
          )}
        </nav>
      </div>

      {/* Menu Mobile (dropdown) */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A2540] border-t border-white/10 px-4 pb-5 flex flex-col gap-2 font-medium text-sm">
          <Link href="/formations" onClick={closeMenu} className="py-3 border-b border-white/10 hover:text-[#FF6B00] transition">
            🎓 Formations
          </Link>
          <Link href="/boutique" onClick={closeMenu} className="py-3 border-b border-white/10 hover:text-[#FF6B00] transition">
            🛍️ Boutique
          </Link>
          <Link href="/qcm" onClick={closeMenu} className="py-3 border-b border-white/10 hover:text-[#FF6B00] transition">
            📝 QCM
          </Link>
          <Link href="/contact" onClick={closeMenu} className="py-3 border-b border-white/10 hover:text-[#FF6B00] transition">
            💬 Contact & FAQ
          </Link>

          {status === "authenticated" ? (
            <div className="pt-2 space-y-2">
              <Link href="/mes-cours" onClick={closeMenu} className="block py-2.5 px-3 bg-white/10 rounded-lg hover:text-[#FF6B00] transition font-bold">
                📚 Mes Cours
              </Link>
              <Link href="/profil" onClick={closeMenu} className="block py-2.5 px-3 bg-white/5 rounded-lg hover:text-[#FF6B00] transition">
                👤 Mon Profil
              </Link>
              {session?.user?.role === "ADMIN" && (
                <Link href="/admin/dashboard" onClick={closeMenu} className="block py-2.5 px-3 border border-[#FF6B00] text-[#FF6B00] rounded-lg font-bold">
                  ⚙️ Tableau de bord Admin
                </Link>
              )}
              <div className="pt-2 flex items-center justify-between text-xs text-gray-400">
                <span>{session?.user?.email}</span>
                <button
                  onClick={() => { signOut(); closeMenu(); }}
                  className="text-red-400 hover:text-red-300 font-semibold"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-3 grid grid-cols-2 gap-3">
              <Link href="/login" onClick={closeMenu} className="py-2.5 text-center border border-white/30 rounded-xl hover:border-[#FF6B00] hover:text-[#FF6B00] transition">
                Connexion
              </Link>
              <Link href="/register" onClick={closeMenu} className="py-2.5 text-center bg-[#FF6B00] hover:bg-[#e56000] rounded-xl font-bold transition shadow">
                Inscription
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
