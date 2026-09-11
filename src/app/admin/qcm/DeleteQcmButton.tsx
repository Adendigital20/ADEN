"use client";

import { useState } from "react";
import { deleteQcmQuestion } from "./actions";

export default function DeleteQcmButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm("Supprimer cette question du QCM ?")) {
      setLoading(true);
      await deleteQcmQuestion(id);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 hover:text-red-700 font-semibold text-xs px-2.5 py-1 rounded hover:bg-red-50 transition disabled:opacity-50"
    >
      {loading ? "..." : "Supprimer"}
    </button>
  );
}
