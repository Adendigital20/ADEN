import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ADEN DIGITAL ACADEMY",
  description: "Plateforme de formation et e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900`}>
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-[#0A2540] text-white py-6 text-center">
            <p>&copy; {new Date().getFullYear()} ADEN DIGITAL ACADEMY. Tous droits réservés.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
