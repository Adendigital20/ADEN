"use client";

import { useState } from "react";
import { addProduct } from "./actions";

export default function AddProductModal() {
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
      const result = await addProduct(formData);
      
      if (result.success) {
        setIsOpen(false);
        setPreview(null);
      } else {
        setErrorMsg(result.error || "Une erreur est survenue");
      }
    } catch (error: any) {
      console.error("Erreur d'upload:", error);
      setErrorMsg(error.message || "Erreur réseau, fichier trop volumineux, ou connexion perdue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition font-bold text-sm shadow-md"
      >
        + Ajouter un PC ou Accessoire
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#0A2540] mb-4">Ajouter un produit</h2>
            
            {errorMsg && (
              <div className="mb-4 bg-red-100 text-red-700 p-2 rounded text-sm">
                {errorMsg}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom *</label>
                <input required type="text" name="nom" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#FF6B00] focus:border-[#FF6B00]" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#FF6B00] focus:border-[#FF6B00]"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Prix (FCFA) *</label>
                <input required type="number" step="0.01" name="prix" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#FF6B00] focus:border-[#FF6B00]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image du produit *</label>
                <input 
                  required
                  type="file" 
                  name="image" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#FF6B00] file:text-white hover:file:bg-[#e56000]" 
                />
                {preview && (
                  <div className="mt-4 relative h-32 w-32 rounded border border-gray-300 overflow-hidden shadow-sm">
                    <img src={preview} alt="Aperçu" className="object-cover w-full h-full" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Stock *</label>
                <input required type="number" name="stock" defaultValue="0" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#FF6B00] focus:border-[#FF6B00]" />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-4 py-2 bg-[#0A2540] text-white rounded-md hover:bg-[#1a385b] disabled:opacity-50 transition"
                >
                  {loading ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
