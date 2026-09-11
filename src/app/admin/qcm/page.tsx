import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AddQcmModal from "./AddQcmModal";
import DeleteQcmButton from "./DeleteQcmButton";
import Link from "next/link";

export default async function AdminQcmPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  // Récupérer toutes les formations avec leurs questions QCM
  const formations = await prisma.formation.findMany({
    include: {
      qcms: true,
      _count: {
        select: { qcms: true },
      },
    },
    orderBy: { title: "asc" },
  });

  const totalQuestions = formations.reduce((acc, f) => acc + f.qcms.length, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2540]">Gestion des Évaluations (QCM)</h1>
          <p className="text-xs text-gray-500 mt-1">
            Configurez les questions à choix multiples pour tester les étudiants et délivrer les certifications.
          </p>
        </div>
        <AddQcmModal formations={formations.map((f) => ({ id: f.id, title: f.title }))} />
      </div>

      {/* Résumé */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center font-bold text-xl">
            📝
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase">Total Questions</span>
            <h3 className="text-2xl font-black text-[#0A2540]">{totalQuestions}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
            🎓
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase">Formations avec QCM</span>
            <h3 className="text-2xl font-black text-[#0A2540]">
              {formations.filter((f) => f.qcms.length > 0).length} / {formations.length}
            </h3>
          </div>
        </div>
      </div>

      {/* Liste des formations et leurs QCM */}
      {formations.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-100">
          Aucune formation disponible. Créez d'abord une formation pour lui associer un QCM.
        </div>
      ) : (
        <div className="space-y-6">
          {formations.map((f) => (
            <div key={f.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 bg-gray-50/70 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-[11px] font-bold text-[#FF6B00] uppercase tracking-wider">Formation</span>
                  <h3 className="text-lg font-bold text-[#0A2540]">{f.title}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {f.qcms.length} question(s)
                  </span>
                  {f.qcms.length > 0 && (
                    <Link
                      href={`/qcm/${f.id}`}
                      target="_blank"
                      className="text-xs font-semibold text-gray-600 hover:text-[#0A2540] bg-white border border-gray-200 px-3 py-1 rounded-full transition"
                    >
                      Tester le quiz ↗
                    </Link>
                  )}
                </div>
              </div>

              {/* Questions de la formation */}
              <div className="p-5">
                {f.qcms.length === 0 ? (
                  <p className="text-xs text-gray-400 py-3 italic">
                    Aucune question configurée pour ce cours. Cliquez sur "+ Ajouter une question QCM" pour en créer.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {f.qcms.map((q, idx) => (
                      <div
                        key={q.id}
                        className="p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      >
                        <div className="space-y-2">
                          <p className="font-bold text-gray-900">
                            {idx + 1}. {q.question}
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                            <span className={`px-2 py-1 rounded ${q.correctAnswer === "A" ? "bg-green-100 text-green-800 font-bold border border-green-300" : "bg-gray-100 text-gray-600"}`}>
                              A: {q.optionA}
                            </span>
                            <span className={`px-2 py-1 rounded ${q.correctAnswer === "B" ? "bg-green-100 text-green-800 font-bold border border-green-300" : "bg-gray-100 text-gray-600"}`}>
                              B: {q.optionB}
                            </span>
                            <span className={`px-2 py-1 rounded ${q.correctAnswer === "C" ? "bg-green-100 text-green-800 font-bold border border-green-300" : "bg-gray-100 text-gray-600"}`}>
                              C: {q.optionC}
                            </span>
                            <span className={`px-2 py-1 rounded ${q.correctAnswer === "D" ? "bg-green-100 text-green-800 font-bold border border-green-300" : "bg-gray-100 text-gray-600"}`}>
                              D: {q.optionD}
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <DeleteQcmButton id={q.id} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
