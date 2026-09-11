"use client";

import { useState } from "react";
import { updateProfileName, updatePassword } from "./actions";

export default function ProfileForms({ initialName, email }: { initialName: string; email: string }) {
  const [name, setName] = useState(initialName || "");
  const [nameLoading, setNameLoading] = useState(false);
  const [nameMsg, setNameMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passLoading, setPassLoading] = useState(false);
  const [passMsg, setPassMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameLoading(true);
    setNameMsg(null);
    const res = await updateProfileName(name);
    setNameLoading(false);
    if (res.success) {
      setNameMsg({ type: "success", text: res.message || "Nom enregistré !" });
    } else {
      setNameMsg({ type: "error", text: res.error || "Une erreur est survenue." });
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassLoading(true);
    setPassMsg(null);
    const res = await updatePassword(currentPassword, newPassword);
    setPassLoading(false);
    if (res.success) {
      setPassMsg({ type: "success", text: res.message || "Mot de passe modifié !" });
      setCurrentPassword("");
      setNewPassword("");
    } else {
      setPassMsg({ type: "error", text: res.error || "Une erreur est survenue." });
    }
  };

  return (
    <div className="space-y-8">
      {/* Modification Informations Générales */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-[#0A2540] mb-4">Informations personnelles</h3>

        {nameMsg && (
          <div
            className={`p-3.5 rounded-xl text-sm mb-4 ${
              nameMsg.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {nameMsg.text}
          </div>
        )}

        <form onSubmit={handleNameSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Adresse Email
            </label>
            <input
              type="email"
              disabled
              value={email}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">L'adresse email est votre identifiant unique.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Nom complet
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom complet"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={nameLoading}
              className="px-6 py-2.5 bg-[#0A2540] hover:bg-[#1a385b] text-white rounded-xl text-sm font-semibold transition shadow-sm disabled:opacity-50"
            >
              {nameLoading ? "Enregistrement..." : "Mettre à jour mon nom"}
            </button>
          </div>
        </form>
      </div>

      {/* Modification Mot de passe */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-[#0A2540] mb-4">Sécurité & Mot de passe</h3>

        {passMsg && (
          <div
            className={`p-3.5 rounded-xl text-sm mb-4 ${
              passMsg.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {passMsg.text}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Mot de passe actuel *
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Nouveau mot de passe *
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 4 caractères"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={passLoading}
              className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#e56000] text-white rounded-xl text-sm font-semibold transition shadow-sm disabled:opacity-50"
            >
              {passLoading ? "Modification..." : "Changer mon mot de passe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
