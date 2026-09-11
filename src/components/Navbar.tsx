"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-[#0A2540] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-wider">
          ADEN DIGITAL ACADEMY
        </Link>

        <nav className="hidden md:flex gap-6 items-center font-medium">
          <Link href="/boutique" className="hover:text-[#FF6B00] transition">Boutique</Link>
          <Link href="/formations" className="hover:text-[#FF6B00] transition">Formations</Link>
          <Link href="/qcm" className="hover:text-[#FF6B00] transition">QCM</Link>

          {status === "authenticated" ? (
            <div className="flex items-center gap-4 ml-4">
              <Link href="/mes-cours" className="text-[#0A2540] font-bold hover:text-[#FF6B00] transition">
                Mes Cours
              </Link>
              {session?.user?.role === "ADMIN" && (
                <Link href="/admin/dashboard" className="text-[#FF6B00] border border-[#FF6B00] px-3 py-1 rounded hover:bg-[#FF6B00] hover:text-white transition">
                  Admin
                </Link>
              )}
              <span className="text-gray-300 text-sm">Salut, {session.user.name || session.user.email}</span>
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
    </header>
  );
}
