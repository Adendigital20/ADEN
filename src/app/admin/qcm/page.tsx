import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminQcmPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  // Grouper les QCM par formation
  const formationsWithQcm = await prisma.formation.findMany({
    where: {
      qcms: { some: {} }
    },
    include: {
      _count: {
        select: { qcms: true }
      }
    },
    orderBy: { title: 'asc' }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0A2540]">Gestion des QCM</h1>
        <button className="bg-[#FF6B00] text-white px-4 py-2 rounded hover:bg-[#e56000] transition">
          Ajouter un QCM
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {formationsWithQcm.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                  Aucun QCM pour le moment.
                </td>
              </tr>
            ) : (
              formationsWithQcm.map((formation) => (
                <tr key={formation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formation.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formation._count.qcms} questions</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">Éditer QCM</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
