"use client";

import { useState } from "react";
import { addQcmQuestion } from "./actions";

type FormationOption = {
  id: string;
  title: string;
};

export default function AddQcmModal({ formations }: { formations: FormationOption[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const res = await addQcmQuestion(formData);
    setLoading(false);

    if (res.success) {
      setIsOpen(false);
    } else {
      setErrorMsg(res.error || "Une erreur est survenue.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md transition"
      >
        + Ajouter une question QCM
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#0A2540]">Nouvelle Question QCM</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-2xl font-light"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 bg-red-50 text-red-700 border border-red-200 p-3 rounded-xl text-sm">
                {errorMsg}
              </div>
            )}

            {formations.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                Vous devez d'abord créer au moins une formation avant de pouvoir lui ajouter un QCM.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Formation associée *
                  </label>
                  <select
                    required
                    name="formationId"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-sm bg-white"
                  >
                    {formations.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Intitulé de la question *
                  </label>
                  <textarea
                    required
                    rows={2}
                    name="question"
                    placeholder="Ex: Quel est le principal avantage de Facebook Ads ?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-sm"
                  ></textarea>
                </div>

                <div className="space-y-2.5 pt-1">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Les 4 Propositions de réponse :
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-bold text-xs flex items-center justify-center shrink-0">
                        A
                      </span>
                      <input
                        required
                        type="text"
                        name="optionA"
                        placeholder="Option A"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#FF6B00]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-bold text-xs flex items-center justify-center shrink-0">
                        B
                      </span>
                      <input
                        required
                        type="text"
                        name="optionB"
                        placeholder="Option B"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#FF6B00]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-bold text-xs flex items-center justify-center shrink-0">
                        C
                      </span>
                      <input
                        required
                        type="text"
                        name="optionC"
                        placeholder="Option C"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#FF6B00]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-bold text-xs flex items-center justify-center shrink-0">
                        D
                      </span>
                      <input
                        required
                        type="text"
                        name="optionD"
                        placeholder="Option D"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#FF6B00]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-semibold text-[#FF6B00] uppercase tracking-wider mb-1.5">
                    Bonne réponse obligatoire (Correct Answer) *
                  </label>
                  <select
                    required
                    name="correctAnswer"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-orange-300 bg-orange-50/50 font-bold text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold disabled:opacity-50 transition shadow"
                  >
                    {loading ? "Ajout..." : "Enregistrer la question"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
