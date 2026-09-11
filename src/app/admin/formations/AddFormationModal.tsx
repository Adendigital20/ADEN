"use client";

import { useState } from "react";
import { addFormation } from "./actions";

export default function AddFormationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await addFormation(formData);
      if (result.success) {
        setIsOpen(false);
        setPreview(null);
      } else {
        setErrorMsg(result.error || "Une erreur est survenue.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md transition"
      >
        + Ajouter une formation
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-[#0A2540]">Nouvelle Formation</h2>
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Titre de la formation *
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  placeholder="Ex: Maîtriser le Marketing Digital de A à Z"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Description détaillée
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Ce que l'étudiant va apprendre, les prérequis, les opportunités..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-sm"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Prix d'accès (FCFA) *
                </label>
                <input
                  required
                  type="number"
                  name="price"
                  placeholder="Ex: 25000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Miniature d'illustration (Image)
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#0A2540] file:text-white hover:file:bg-[#1a385b] cursor-pointer"
                />
                {preview && (
                  <div className="mt-3 relative h-36 w-full rounded-xl border border-gray-200 overflow-hidden">
                    <img src={preview} alt="Aperçu" className="object-cover w-full h-full" />
                  </div>
                )}
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
                  {loading ? "Création en cours..." : "Créer la formation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
