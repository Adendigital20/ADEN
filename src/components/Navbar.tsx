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
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-lg md:text-2xl font-bold tracking-wider flex-shrink-0" onClick={closeMenu}>
          ADEN <span className="text-[#FF6B00]">DIGITAL</span> ACADEMY
        </Link>

        {/* Bouton Hamburger (mobile uniquement) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex gap-6 items-center font-medium">
          <Link href="/boutique" className="hover:text-[#FF6B00] transition">Boutique</Link>
          <Link href="/formations" className="hover:text-[#FF6B00] transition">Formations</Link>
          <Link href="/qcm" className="hover:text-[#FF6B00] transition">QCM</Link>

          {status === "authenticated" ? (
            <div className="flex items-center gap-4 ml-4">
              <Link href="/mes-cours" className="text-white hover:text-[#FF6B00] transition font-bold">
                Mes Cours
              </Link>
              {session?.user?.role === "ADMIN" && (
                <Link href="/admin/dashboard" className="text-[#FF6B00] border border-[#FF6B00] px-3 py-1 rounded hover:bg-[#FF6B00] hover:text-white transition">
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="flex gap-3 ml-4">
              <Link href="/login" className="hover:text-[#FF6B00] transition px-3 py-2">Connexion</Link>
              <Link href="/register" className="bg-[#FF6B00] hover:bg-[#e56000] px-4 py-2 rounded transition">Inscription</Link>
            </div>
          )}
        </nav>
      </div>

      {/* Menu Mobile (dropdown) */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A2540] border-t border-[#1a385b] px-4 pb-4 flex flex-col gap-3 font-medium">
          <Link href="/boutique" onClick={closeMenu} className="py-3 border-b border-[#1a385b] hover:text-[#FF6B00] transition">
            🛍️ Boutique
          </Link>
          <Link href="/formations" onClick={closeMenu} className="py-3 border-b border-[#1a385b] hover:text-[#FF6B00] transition">
            🎓 Formations
          </Link>
          <Link href="/qcm" onClick={closeMenu} className="py-3 border-b border-[#1a385b] hover:text-[#FF6B00] transition">
            📝 QCM
          </Link>

          {status === "authenticated" ? (
            <>
              <Link href="/mes-cours" onClick={closeMenu} className="py-3 border-b border-[#1a385b] hover:text-[#FF6B00] transition font-bold">
                📚 Mes Cours
              </Link>
              {session?.user?.role === "ADMIN" && (
                <Link href="/admin/dashboard" onClick={closeMenu} className="py-3 border-b border-[#1a385b] text-[#FF6B00]">
                  ⚙️ Admin
                </Link>
              )}
              <p className="text-gray-400 text-sm py-2">
                Connecté : {session?.user?.name || session?.user?.email}
              </p>
              <button
                onClick={() => { signOut(); closeMenu(); }}
                className="w-full bg-red-500 hover:bg-red-600 py-3 rounded transition text-center"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={closeMenu} className="py-3 text-center border border-white rounded hover:border-[#FF6B00] hover:text-[#FF6B00] transition">
                Connexion
              </Link>
              <Link href="/register" onClick={closeMenu} className="py-3 text-center bg-[#FF6B00] hover:bg-[#e56000] rounded transition">
                Inscription
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
