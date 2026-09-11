import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function QcmPage() {
  const formations = await prisma.formation.findMany({
    include: {
      qcms: true
    }
  });

  const formationsWithQcm = formations.filter(f => f.qcms.length > 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#0A2540]">Quiz et QCM</h1>
      
      {formationsWithQcm.length === 0 ? (
        <p className="text-gray-500">Aucun QCM disponible pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formationsWithQcm.map((formation) => (
            <div key={formation.id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FF6B00]">
              <h2 className="text-xl font-bold mb-2">{formation.title}</h2>
              <p className="text-gray-600 mb-4">{formation.qcms.length} questions disponibles</p>
              <Link href={`/qcm/${formation.id}`} className="inline-block bg-[#0A2540] text-white px-4 py-2 rounded hover:bg-[#1a385b] transition">
                Commencer le test
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
