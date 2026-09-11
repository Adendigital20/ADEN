import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const productsCount = await prisma.product.count();
  const formationsCount = await prisma.formation.count();
  const qcmCount = await prisma.qcm.count();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#0A2540]">Tableau de bord Administrateur</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/products" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 border-l-4 border-l-emerald-500 hover:shadow-md transition">
          <h2 className="text-base font-bold text-gray-700 mb-1">PC & Accessoires</h2>
          <p className="text-3xl font-black text-[#0A2540]">{productsCount}</p>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">Gérer le stock boutique →</span>
        </Link>
        <Link href="/admin/formations" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 border-l-4 border-l-[#0A2540] hover:shadow-md transition">
          <h2 className="text-base font-bold text-gray-700 mb-1">Formations (Info & IA)</h2>
          <p className="text-3xl font-black text-[#0A2540]">{formationsCount}</p>
          <span className="text-xs text-blue-600 font-semibold mt-2 inline-block">Gérer les cours & vidéos →</span>
        </Link>
        <Link href="/admin/qcm" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 border-l-4 border-l-emerald-600 hover:shadow-md transition">
          <h2 className="text-base font-bold text-gray-700 mb-1">Questions QCM</h2>
          <p className="text-3xl font-black text-[#0A2540]">{qcmCount}</p>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">Gérer les évaluations →</span>
        </Link>
      </div>
    </div>
  );
}
