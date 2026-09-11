import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import AddFormationModal from "./AddFormationModal";
import ManageVideosModal from "./ManageVideosModal";
import DeleteFormationButton from "./DeleteFormationButton";

export default async function AdminFormationsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const formations = await prisma.formation.findMany({
    include: {
      videos: {
        orderBy: { order: "asc" },
      },
      _count: {
        select: { purchases: true, qcms: true },
      },
    },
    orderBy: { id: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2540]">Gestion des Formations</h1>
          <p className="text-xs text-gray-500 mt-1">
            Ajoutez des cursus vidéo complets, gérez les leçons et suivez les inscriptions.
          </p>
        </div>
        <AddFormationModal />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-3.5 text-left">Miniature</th>
              <th className="px-6 py-3.5 text-left">Titre du cours</th>
              <th className="px-6 py-3.5 text-left">Prix</th>
              <th className="px-6 py-3.5 text-left">Programme</th>
              <th className="px-6 py-3.5 text-left">Inscrits</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {formations.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                  Aucune formation créée. Cliquez sur "+ Ajouter une formation" pour commencer.
                </td>
              </tr>
            ) : (
              formations.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50/70 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      {f.thumbnailUrl ? (
                        <Image src={f.thumbnailUrl} alt={f.title} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs font-bold text-gray-400">
                          N/A
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 line-clamp-1">{f.title}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">{f.description || "Aucune description"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-[#FF6B00]">
                    {f.price.toLocaleString("fr-FR")} FCFA
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {f.videos.length} {f.videos.length > 1 ? "vidéos" : "vidéo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                    {f._count.purchases} vente(s)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <ManageVideosModal
                      formationId={f.id}
                      formationTitle={f.title}
                      initialVideos={f.videos}
                    />
                    <DeleteFormationButton id={f.id} />
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
