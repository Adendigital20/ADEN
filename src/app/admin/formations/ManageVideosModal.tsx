"use client";

import { useState } from "react";
import { addVideo, deleteVideo } from "./actions";

type VideoItem = {
  id: string;
  title: string;
  videoUrl: string;
  order: number;
};

export default function ManageVideosModal({
  formationId,
  formationTitle,
  initialVideos,
}: {
  formationId: string;
  formationTitle: string;
  initialVideos: VideoItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [order, setOrder] = useState((initialVideos.length + 1).toString());
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append("formationId", formationId);
    formData.append("title", title);
    formData.append("videoUrl", videoUrl);
    formData.append("order", order);

    const res = await addVideo(formData);
    setLoading(false);

    if (res.success) {
      setVideos([
        ...videos,
        {
          id: Date.now().toString(),
          title,
          videoUrl,
          order: parseInt(order, 10) || 0,
        },
      ]);
      setTitle("");
      setVideoUrl("");
      setOrder((videos.length + 2).toString());
    } else {
      setErrorMsg(res.error || "Une erreur est survenue.");
    }
  };

  const handleDelete = async (videoId: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette vidéo ?")) return;
    const res = await deleteVideo(videoId, formationId);
    if (res.success) {
      setVideos(videos.filter((v) => v.id !== videoId));
    } else {
      alert(res.error || "Impossible de supprimer");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-600 hover:text-blue-800 font-semibold text-xs bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition"
      >
        🎥 Gérer Vidéos ({videos.length})
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs text-[#FF6B00] font-bold uppercase tracking-wider">Formation</span>
                <h2 className="text-lg font-bold text-[#0A2540]">{formationTitle}</h2>
              </div>
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

            {/* Formulaire ajout vidéo */}
            <form onSubmit={handleAddVideo} className="bg-gray-50 p-4 rounded-xl border border-gray-200/80 mb-6 space-y-3">
              <h4 className="font-bold text-sm text-[#0A2540]">+ Ajouter une vidéo au cursus</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">
                    Titre du chapitre / vidéo *
                  </label>
                  <input
                    required
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: 01. Introduction et bases"
                    className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">
                    Numéro d'ordre
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">
                  Lien URL de la vidéo (MP4, YouTube, Vimeo ou CDN) *
                </label>
                <input
                  required
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://... (ex: lien direct mp4 ou embed)"
                  className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#FF6B00]"
                />
              </div>

              <div className="text-right pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-[#0A2540] hover:bg-[#1a385b] text-white text-xs font-bold rounded-lg transition disabled:opacity-50"
                >
                  {loading ? "Enregistrement..." : "Enregistrer la vidéo"}
                </button>
              </div>
            </form>

            {/* Liste des vidéos existantes */}
            <h4 className="font-bold text-sm text-gray-700 mb-3">
              Vidéos au programme ({videos.length})
            </h4>

            {videos.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6 bg-gray-50 rounded-xl">
                Aucune vidéo enregistrée pour cette formation pour le moment.
              </p>
            ) : (
              <div className="space-y-2">
                {videos.map((vid, idx) => (
                  <div
                    key={vid.id}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-sm"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span className="w-6 h-6 rounded-full bg-[#0A2540] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {vid.order || idx + 1}
                      </span>
                      <div className="truncate">
                        <p className="font-semibold text-gray-800 truncate">{vid.title}</p>
                        <p className="text-xs text-gray-400 truncate max-w-md">{vid.videoUrl}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(vid.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1 shrink-0 ml-2"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-3 border-t border-gray-100 text-right">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
