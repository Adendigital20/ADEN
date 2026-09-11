"use client";

import { useState } from "react";
import { deleteFormation } from "./actions";

export default function DeleteFormationButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm("Attention : supprimer cette formation supprimera également tous ses QCM et vidéos associés. Confirmer ?")) {
      setLoading(true);
      await deleteFormation(id);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 hover:text-red-700 font-semibold text-xs px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
    >
      {loading ? "..." : "Supprimer"}
    </button>
  );
}
