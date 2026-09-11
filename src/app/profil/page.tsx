import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProfileForms from "./ProfileForms";
import Link from "next/link";

export default async function ProfilPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      purchases: {
        where: { status: "PAID" },
        include: { formation: true }
      },
      quizResults: true
    }
  });

  if (!user) {
    redirect("/login");
  }

  const totalFormations = user.purchases.length;
  const passedQuizzes = user.quizResults.filter(q => q.passed).length;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* En-tête profil */}
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1a385b] text-white p-8 md:p-10 rounded-3xl shadow-md mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#FF6B00] text-white flex items-center justify-center font-black text-2xl md:text-3xl shadow-lg uppercase">
              {user.name ? user.name.charAt(0) : user.email.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">{user.name || "Étudiant ADEN"}</h1>
                <span className="bg-[#FF6B00] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {user.role}
                </span>
              </div>
              <p className="text-gray-300 text-sm mt-1">{user.email}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/mes-cours"
              className="px-5 py-2.5 bg-white text-[#0A2540] font-bold rounded-xl text-sm hover:bg-gray-100 transition shadow"
            >
              Mes cours ({totalFormations})
            </Link>
            {user.role === "ADMIN" && (
              <Link
                href="/admin/dashboard"
                className="px-5 py-2.5 bg-[#FF6B00] text-white font-bold rounded-xl text-sm hover:bg-[#e56000] transition shadow"
              >
                Administration
              </Link>
            )}
          </div>
        </div>

        {/* Statistiques Rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
              📚
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Formations acquises</p>
              <h3 className="text-2xl font-black text-[#0A2540]">{totalFormations}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-[#25D366] flex items-center justify-center text-xl font-bold">
              🏆
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">QCM Réussis</p>
              <h3 className="text-2xl font-black text-[#0A2540]">{passedQuizzes}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center text-xl font-bold">
              ⚡
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Statut Compte</p>
              <h3 className="text-base font-bold text-green-600">Actif & Vérifié</h3>
            </div>
          </div>
        </div>

        {/* Formulaires d'édition */}
        <ProfileForms initialName={user.name || ""} email={user.email} />

      </div>
    </div>
  );
}
