import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function Boutique() {
  const products = await prisma.product.findMany();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#0A2540]">Notre Boutique</h1>
      
      {products.length === 0 ? (
        <p className="text-gray-500">Aucun produit disponible pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="relative h-48 bg-gray-200">
                {product.image ? (
                  <Image src={product.image} alt={product.nom} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">Pas d'image</div>
                )}
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-lg mb-2">{product.nom}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-[#FF6B00]">{product.prix} FCFA</span>
                  <a 
                    href={`https://wa.me/message?text=${encodeURIComponent("Bonjour, je souhaite commander le produit: " + product.nom)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#1ebe57] text-white px-3 py-1 rounded text-sm transition"
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
  );
}
