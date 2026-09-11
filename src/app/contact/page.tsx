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
      q: "Quelles formations proposez-vous exactement ?",
      a: "Nous formons principalement en Informatique fondamentale (prise en main complète de l'ordinateur, système Windows, bureautique Word, Excel, PowerPoint) et en Utilisation Pratique de l'Intelligence Artificielle (ChatGPT, outils d'automatisation, création et productivité au travail)."
    },
    {
      q: "Les PC vendus en boutique sont-ils testés et garantis ?",
      a: "Oui, absolument. Tous nos ordinateurs (portables ou fixes) et accessoires subissent un banc d'essai complet (batterie, processeur, écran, ports, clavier) avant mise en vente et bénéficient d'une garantie avec service après-vente dédié."
    },
    {
      q: "Vendez-vous également des accessoires complémentaires spécifiques ?",
      a: "Oui, nous proposons tous les accessoires complémentaires : chargeurs d'origine, souris filaires et sans fil, claviers, disques SSD rapides, barrettes RAM, sacoches, câbles HDMI/VGA, casques audio et hubs USB."
    },
    {
      q: "Comment puis-je passer commande d'un PC ou d'un accessoire ?",
      a: "Vous pouvez commander directement via notre bouton WhatsApp pour échanger instantanément avec un conseiller, ou nous envoyer un message via le formulaire ci-dessous. Nous organisons la livraison rapide."
    },
    {
      q: "Comment se déroulent les cours et les QCM ?",
      a: "Les cours sont 100% pratiques et accessibles en vidéo 24h/24. À la fin de chaque module, un test QCM interactif vous permet d'évaluer vos compétences réelles avant d'obtenir votre attestation."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 text-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-emerald-200">
            Assistance & Renseignements
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#0A2540] mt-3 mb-4">
            Contactez ADEN DIGITAL ACADEMY
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Besoin d'un conseil pour choisir un PC, commander un accessoire ou vous inscrire à une formation en Informatique ou en IA ? Nous sommes à votre écoute.
          </p>
        </div>

        {/* Grille principale : Formulaire + Coordonnées */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          
          {/* Bloc Coordonnées & WhatsApp */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Carte WhatsApp Rapide */}
            <div className="bg-gradient-to-br from-emerald-600 to-[#0A2540] text-white p-6 rounded-2xl shadow-lg border border-emerald-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                  💬
                </div>
                <div>
                  <h3 className="font-bold text-lg">Commande & Conseil WhatsApp</h3>
                  <p className="text-xs text-emerald-200">Échange direct et instantané</p>
                </div>
              </div>
              <p className="text-sm text-gray-200 mb-5 leading-relaxed">
                Contactez notre équipe commerciale ou pédagogique pour connaître la disponibilité des ordinateurs ou avoir un plan de cours détaillé.
              </p>
              <a
                href="https://wa.me/22965679399?text=Bonjour%20ADEN%20DIGITAL,%20j'aimerais%20avoir%20des%20informations%20sur%20vos%20services."
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center bg-white text-emerald-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-100 transition shadow"
              >
                Discuter sur WhatsApp →
              </a>
            </div>

            {/* Infos de contact */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A2540]/10 text-[#0A2540] flex items-center justify-center font-bold text-lg shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="font-bold text-[#0A2540] text-sm">Localisation</h4>
                  <p className="text-gray-600 text-sm">Cotonou, Bénin</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg shrink-0">
                  ✉️
                </div>
                <div>
                  <h4 className="font-bold text-[#0A2540] text-sm">Email officiel</h4>
                  <p className="text-gray-600 text-sm">contact@aden-academy.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg shrink-0">
                  🕒
                </div>
                <div>
                  <h4 className="font-bold text-[#0A2540] text-sm">Heures d'ouverture</h4>
                  <p className="text-gray-600 text-sm">Lundi au Samedi : 08h00 - 20h00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-200/80">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-[#0A2540]">Message bien reçu !</h3>
                <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                  Merci de nous avoir contacté. Un conseiller ADEN DIGITAL ACADEMY prendra contact avec vous dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#0A2540] text-white rounded-xl text-sm font-semibold hover:bg-[#1a385b] transition"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-[#0A2540] mb-2">Envoyez-nous votre demande</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Nom complet *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="nom@exemple.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Téléphone / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+229 00 00 00 00"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Votre besoin *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                    >
                      <option value="achat_pc">Achat d'un ordinateur (PC portable ou bureau)</option>
                      <option value="accessoires">Commande d'accessoires informatiques</option>
                      <option value="formation_info">Formation Maîtrise de l'outil informatique</option>
                      <option value="formation_ia">Formation Utilisation pratique de l'IA</option>
                      <option value="autre">Autre renseignement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Précisez votre demande *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Précisez le type de PC recherché, votre niveau ou vos attentes..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition disabled:opacity-50"
                >
                  {loading ? "Envoi en cours..." : "Transmettre ma demande →"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Section FAQ */}
        <div id="faq" className="max-w-4xl mx-auto pt-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A2540]">
              Foire Aux Questions (FAQ)
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Toutes les réponses à propos de nos formations en informatique, IA et de nos ordinateurs en boutique.
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
                    <span className={`text-xl font-bold text-emerald-600 transition transform ${isOpen ? "rotate-45" : ""}`}>
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
