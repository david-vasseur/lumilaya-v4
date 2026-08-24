"use client";

import { useEffect } from "react";
import { useModalStore } from "@/lib/store/modalStore";
import Link from "next/link";

export default function ScrollPopupTrigger({ productUrl }: { productUrl : string | undefined}) {
    const { openModal, closeModal } = useModalStore();

    useEffect(() => {
        // Vérifie si la popup a déjà été affichée durant cette session
        const hasShown = sessionStorage.getItem("hero_popup_shown");
        if (hasShown) return;

        // On cible la section qui suit le hero (mets id="deuxieme-section" sur la section d'après)
        const targetElement = document.getElementById("coffrets");
        if (!targetElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Se déclenche lorsque la section arrive au milieu de l'écran
                if (entry.isIntersecting) {
                    openModal(
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center py-2">
        {/* Image visuelle avec les badges */}
        <div className="relative aspect-4/5 rounded-xl overflow-hidden shadow-lg">
            <img
                src={productUrl} 
                alt="Bougie Instant d'été"
                className="w-full h-full object-cover"
            />
            {/* Badge Édition Limitée (en haut à gauche) */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#7A9B8E] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                Édition Limitée
            </div>
            {/* Badge Promo Rouge (en haut à droite) */}
            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wide">
                -30%
            </div>
        </div>

        {/* Contenu textuel avec contraste renforcé */}
        <div className="text-left space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#7A9B8E] font-semibold block">
                L'été se termine
            </span>
            
            <h3 className="text-3xl md:text-4xl font-ballet text-[#2C2C2C] leading-tight">
                Faites prolonger le plaisir...
            </h3>
            
            <p className="text-base text-[#2C2C2C]/80 leading-relaxed font-normal">
                Profitez d'une offre exclusive de <strong className="text-red-600 font-bold">-30%</strong> sur notre bougie signature <span className="italic text-[#2C2C2C]">Instant d'été</span>.
            </p>

            <div className="pt-3">
                <Link
                    className="inline-flex items-center justify-center w-full bg-[#7A9B8E] hover:bg-[#658276] text-white text-base font-medium py-3.5 px-6 rounded-full transition-colors shadow-md"
                    href="/bougies-emotion/bougie-instant-ete"
                    onClick={closeModal}
                >
                    Découvrir l'offre
                </Link>
            </div>
        </div>
    </div>
);

                    // Marque comme affiché pour la session en cours
                    sessionStorage.setItem("hero_popup_shown", "true");
                    
                    // On stoppe l'observation une fois déclenché
                    observer.disconnect();
                }
            },
            {
                // Déclenche l'effet quand l'élément atteint le centre vertical de l'écran
                rootMargin: "-40% 0px -40% 0px", 
                threshold: 0,
            }
        );

        observer.observe(targetElement);

        return () => observer.disconnect();
    }, [openModal, closeModal]);

    return null;
}