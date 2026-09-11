"use client";

import { useState } from "react";
import { deleteProduct } from "./actions";

export default function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      setLoading(true);
      await deleteProduct(id);
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-900 disabled:opacity-50"
    >
      {loading ? "..." : "Supprimer"}
    </button>
  );
}
