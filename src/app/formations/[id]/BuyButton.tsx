"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyButton({ formationId }: { formationId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formationId }),
      });
      
      if (res.ok) {
        alert("Paiement réussi ! Vous avez maintenant accès.");
        router.refresh();
      } else {
        alert("Erreur lors du paiement.");
      }
    } catch (err) {
      alert("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleBuy}
      disabled={loading}
      className="inline-block bg-[#FF6B00] text-white px-8 py-3 rounded text-lg font-bold hover:bg-[#e56000] transition disabled:opacity-50"
    >
      {loading ? "Traitement..." : "Payer avec Mobile Money"}
    </button>
  );
}
