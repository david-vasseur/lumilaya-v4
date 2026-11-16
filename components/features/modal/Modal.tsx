"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useModalStore } from "@/lib/store/modalStore";
import ModalPortal from "./ModalPortal";

export default function Modal() {
    const { isOpen, content, closeModal } = useModalStore();

    // Verrouille le scroll de l'arrière-plan (Desktop + iOS/Android)
    useEffect(() => {
        if (!isOpen) return;

        const originalBodyOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalBodyOverflow;
            document.documentElement.style.overflow = originalHtmlOverflow;
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <ModalPortal>
            <div
                className="fixed inset-0 w-screen h-dvh bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-[1000000] overflow-hidden touch-none"
                onClick={closeModal}
            >
                <div
                    className="relative flex flex-col max-h-[90dvh] w-full max-w-4xl lg:w-2/3 overflow-hidden touch-auto bg-linear-to-tr from-green-200/30 to-[#FDFBF7] bg-[#FDFBF7] text-gray-700 cursor-default text-base xl:text-xl font-light rounded-2xl pt-12 sm:pt-14 pb-5 sm:pb-6 px-4 sm:px-8 border border-gray-400/70 shadow-2xl shadow-black/50"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        aria-label="Fermer la fenêtre"
                        onClick={closeModal}
                        className="absolute right-3.5 top-3.5 p-1.5 rounded-full hover:bg-black/5 text-[#7A9B8E] hover:text-red-600 transition-colors cursor-pointer z-10"
                    >
                        <X className="w-5 h-5 stroke-[2.5]" />
                    </button>

                    {/* Conteneur interne qui transmet la contrainte de hauteur aux enfants (ex: Cart) */}
                    <div className="flex-1 min-h-0 flex flex-col w-full">
                        {content}
                    </div>
                </div>
            </div>
        </ModalPortal>
    );
}
