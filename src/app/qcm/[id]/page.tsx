import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import QuizClient from "./QuizClient";

export default async function QuizPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const formation = await prisma.formation.findUnique({
    where: { id: params.id },
    include: {
      qcms: true
    }
  });

  if (!formation || formation.qcms.length === 0) {
    notFound();
  }

  // Vérifier si l'étudiant a acheté la formation avant de pouvoir passer le QCM
  const purchase = await prisma.purchase.findFirst({
    where: { userId: session.user.id, formationId: formation.id, status: "PAID" }
  });

  if (!purchase) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-[#0A2540]">Accès refusé</h1>
        <p className="text-gray-600 mb-8">Vous devez acheter cette formation pour accéder à son QCM.</p>
        <a href={`/formations/${formation.id}`} className="inline-block bg-[#FF6B00] text-white px-6 py-2 rounded hover:bg-[#e56000] transition">
          Voir la formation
        </a>
      </div>
    );
  }

  // Vérifier s'il a déjà réussi le QCM
  const previousResult = await prisma.quizResult.findFirst({
    where: { userId: session.user.id, formationId: formation.id },
    orderBy: { score: 'desc' }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-[#0A2540]">QCM : {formation.title}</h1>
        
        {previousResult && previousResult.passed && (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-8">
            Vous avez déjà réussi ce QCM avec un score de {previousResult.score}/{previousResult.total} ! 
            Vous pouvez le repasser pour améliorer votre score.
          </div>
        )}

        <QuizClient 
          formationId={formation.id} 
          questions={formation.qcms} 
        />
      </div>
    </div>
  );
}
