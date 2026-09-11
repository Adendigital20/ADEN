"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const faqs = [
    {
      q: "Comment accéder à mes formations après le paiement ?",
      a: "Dès votre paiement validé, la formation est immédiatement débloquée dans votre espace 'Mes Cours'. Vous pouvez visionner les vidéos et passer les QCM à votre rythme 24h/24 et 7j/7."
    },
    {
      q: "Quels sont les moyens de paiement acceptés ?",
      a: "Nous acceptons les paiements Mobile Money (MTN, Moov, Wave, Orange Money) ainsi que les cartes bancaires Visa et Mastercard."
    },
    {
      q: "Les formations délivrent-elles une attestation ou certification ?",
      a: "Oui, chaque formation complétée avec succès (vidéos suivies et QCM validé avec plus de 50% de réussite) vous délivre une attestation officielle de compétences."
    },
    {
      q: "Comment se déroule la livraison des produits de la boutique ?",
      a: "Pour les produits physiques, nous livrons partout au Bénin et dans la sous-région via nos partenaires logistiques express. Les produits numériques sont téléchargeables immédiatement après commande."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="bg-[#FF6B00]/10 text-[#FF6B00] font-semibold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Besoin d'aide ?
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0A2540] mt-3 mb-4">
            Contactez notre équipe
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Une question sur nos formations ou nos produits ? Nous sommes disponibles pour vous accompagner vers votre réussite.
          </p>
        </div>

        {/* Grille principale : Formulaire + Coordonnées */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          
          {/* Bloc Coordonnées & WhatsApp */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Carte WhatsApp Rapide */}
            <div className="bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                  💬
                </div>
                <div>
                  <h3 className="font-bold text-lg">Réponse Immédiate</h3>
                  <p className="text-xs text-white/80">Support direct sur WhatsApp</p>
                </div>
              </div>
              <p className="text-sm text-white/90 mb-5">
                Discutez directement avec notre responsable pédagogique pour toute question urgente ou conseil d'orientation.
              </p>
              <a
                href="https://wa.me/22965679399?text=Bonjour,%20j'aimerais%20avoir%20des%20renseignements%20sur%20ADEN%20DIGITAL%20ACADEMY"
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center bg-white text-[#128C7E] font-bold py-3 px-4 rounded-xl hover:bg-gray-100 transition shadow"
              >
                Discuter sur WhatsApp
              </a>
            </div>

            {/* Infos de contact */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A2540]/10 text-[#0A2540] flex items-center justify-center font-bold text-lg shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="font-bold text-[#0A2540] text-sm">Adresse</h4>
                  <p className="text-gray-600 text-sm">Cotonou, Bénin</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center font-bold text-lg shrink-0">
                  ✉️
                </div>
                <div>
                  <h4 className="font-bold text-[#0A2540] text-sm">Email officiel</h4>
                  <p className="text-gray-600 text-sm">contact@aden-academy.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
                  🕒
                </div>
                <div>
                  <h4 className="font-bold text-[#0A2540] text-sm">Horaires</h4>
                  <p className="text-gray-600 text-sm">Du Lundi au Samedi : 08h00 - 20h00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-[#25D366] rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-[#0A2540]">Message envoyé avec succès !</h3>
                <p className="text-gray-600 max-w-md mx-auto text-sm">
                  Merci de nous avoir contacté. Un conseiller ADEN DIGITAL ACADEMY vous répondra par email ou WhatsApp sous 24 heures ouvrées.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#0A2540] text-white rounded-xl text-sm font-semibold hover:bg-[#1a385b] transition"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-[#0A2540] mb-2">Envoyez-nous un message</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Nom complet *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Jean Dupont"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="Ex: jean@exemple.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Numéro WhatsApp / Téléphone
                    </label>
                    <input
                      type="tel"
                      placeholder="+229 00 00 00 00"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Sujet *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-sm bg-white"
                    >
                      <option value="formation">Information sur une formation</option>
                      <option value="boutique">Commande en boutique</option>
                      <option value="partenariat">Partenariat ou entreprise</option>
                      <option value="technique">Assistance technique</option>
                      <option value="autre">Autre demande</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Votre message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Expliquez-nous votre besoin ou projet..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#FF6B00] hover:bg-[#e56000] text-white font-bold rounded-xl shadow-md transition disabled:opacity-50"
                >
                  {loading ? "Envoi en cours..." : "Envoyer mon message →"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Section FAQ */}
        <div id="faq" className="max-w-4xl mx-auto pt-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A2540]">
              Questions Fréquemment Posées (FAQ)
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Retrouvez rapidement les réponses à vos interrogations les plus fréquentes.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left font-semibold text-[#0A2540] flex justify-between items-center gap-4 hover:bg-gray-50 transition"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-xl font-bold text-[#FF6B00] transition transform ${isOpen ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
