import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#0A2540] text-white py-20 flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Bienvenue sur <span className="text-[#FF6B00]">ADEN DIGITAL ACADEMY</span>
        </h1>
        <p className="text-xl max-w-2xl text-gray-300 mb-10">
          Votre plateforme tout-en-un pour l'apprentissage, les tests de connaissances et l'achat de produits exclusifs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-3xl justify-center">
          <Link href="/boutique" className="flex-1 bg-white text-[#0A2540] p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 group">
            <h2 className="text-2xl font-bold mb-2 group-hover:text-[#FF6B00]">BOUTIQUE</h2>
            <p className="text-gray-600">Découvrez nos produits physiques et numériques.</p>
          </Link>
          
          <Link href="/formations" className="flex-1 bg-[#FF6B00] text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-2">FORMATIONS</h2>
            <p className="text-gray-100">Accédez à nos cours vidéo de haute qualité.</p>
          </Link>
          
          <Link href="/qcm" className="flex-1 bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-2">QCM</h2>
            <p className="text-blue-100">Testez vos connaissances sur nos formations.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
