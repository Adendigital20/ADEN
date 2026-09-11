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
        <Link href="/admin/products" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FF6B00] hover:bg-gray-50 transition">
          <h2 className="text-xl font-bold mb-2">Gérer Produits</h2>
          <p className="text-3xl font-extrabold text-[#0A2540]">{productsCount}</p>
        </Link>
        <Link href="/admin/formations" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:bg-gray-50 transition">
          <h2 className="text-xl font-bold mb-2">Gérer Formations</h2>
          <p className="text-3xl font-extrabold text-[#0A2540]">{formationsCount}</p>
        </Link>
        <Link href="/admin/qcm" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:bg-gray-50 transition">
          <h2 className="text-xl font-bold mb-2">Gérer QCM</h2>
          <p className="text-3xl font-extrabold text-[#0A2540]">{qcmCount}</p>
        </Link>
      </div>
    </div>
  );
}
