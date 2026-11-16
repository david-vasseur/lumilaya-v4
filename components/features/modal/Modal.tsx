"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useModalStore } from "@/lib/store/modalStore";
import ModalPortal from "./ModalPortal";

export default function Modal() {
    const { isOpen, content, closeModal } = useModalStore();

    useEffect(() => {
        if (!isOpen) return;

        // Mémorise la position de scroll actuelle et fige le body (efficace sur iOS Safari & Android)
        const scrollY = window.scrollY;
        const body = document.body;

        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";
        body.style.overflow = "hidden";

        return () => {
            body.style.position = "";
            body.style.top = "";
            body.style.left = "";
            body.style.right = "";
            body.style.width = "";
            body.style.overflow = "";
            window.scrollTo(0, scrollY);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <ModalPortal>
            <div
                className="fixed inset-0 w-screen h-dvh bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-[1000000]"
                onClick={closeModal}
            >
                <div
                    className="relative flex flex-col max-h-[88dvh] w-full max-w-4xl lg:w-2/3 overflow-hidden bg-[#FDFBF7] bg-linear-to-tr from-green-200/30 to-[#FDFBF7] text-gray-700 cursor-default text-base xl:text-xl font-light rounded-2xl pt-12 sm:pt-14 pb-5 sm:pb-6 px-4 sm:px-8 border border-gray-400/70 shadow-2xl shadow-black/50"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        aria-label="Fermer la fenêtre"
                        onClick={closeModal}
                        className="absolute right-3.5 top-3.5 p-1.5 rounded-full hover:bg-black/5 text-[#7A9B8E] hover:text-red-600 transition-colors cursor-pointer z-20"
                    >
                        <X className="w-5 h-5 stroke-[2.5]" />
                    </button>

                    {/* Propagation stricte de la hauteur flex jusqu'à l'enfant */}
                    <div className="flex-1 min-h-0 flex flex-col w-full overflow-hidden">
                        {content}
                    </div>
                </div>
            </div>
        </ModalPortal>
    );
}
