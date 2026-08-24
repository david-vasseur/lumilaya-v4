"use client";

import { useEffect } from "react";
import { useModalStore } from "@/lib/store/modalStore";
import Link from "next/link";

export default function ScrollPopupTrigger() {
    const { openModal, closeModal } = useModalStore(); // <-- Récupère closeModal ici

    useEffect(() => {
        // Vérifie si la popup a déjà été affichée durant cette session
        const hasShown = sessionStorage.getItem("hero_popup_shown");
        if (hasShown) return;

        // On cible ta section Hero
        const heroElement = document.getElementById("hero");
        if (!heroElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Quand la section Hero sort complètement de l'écran par le haut
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    
                    // Ouvre ta modale avec le contenu
                    openModal(
                        <div className="text-center space-y-4 py-4">
                            <span className="text-xs uppercase tracking-[0.3em] text-[#7A9B8E]">
                                L'été se termine
                            </span>
                            <h3 className="text-3xl font-ballet text-[#2C2C2C]">
                                Faites prolonger le plaisir...
                            </h3>
                            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                                Profitez de -30% sur votre{" "}
                                <Link 
                                    className="underline font-medium text-[#7A9B8E] hover:text-[#2C2C2C] transition-colors" 
                                    href={"/bougies-emotion/bougie-instant-ete"}
                                    onClick={closeModal} // <-- Ferme la modale en cliquant sur le lien
                                >
                                    bougie Instant d'été
                                </Link>
                                .
                            </p>
                        </div>
                    );

                    // Marque comme affiché pour la session en cours
                    sessionStorage.setItem("hero_popup_shown", "true");
                    
                    // On stoppe l'observation une fois déclenché
                    observer.disconnect();
                }
            },
            {
                threshold: 0,
            }
        );

        observer.observe(heroElement);

        return () => observer.disconnect();
    }, [openModal, closeModal]);

    return null;
}