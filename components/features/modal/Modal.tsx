"use client";

import { X } from "lucide-react";
import { useModalStore } from "@/lib/store/modalStore";
import ModalPortal from "./ModalPortal";


export default function Modal() {

    const { isOpen, content, closeModal } = useModalStore();

    if (!isOpen) return null;

    return (
        <ModalPortal>
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-1000000"
                onClick={closeModal}
                >
                <div
                    className="relative z-1000000 bg-linear-to-tr from-green-200/30 to-[#FDFBF7] text-gray-700 cursor-default text-base xl:text-xl font-light rounded-xl pt-15 lg:pt-20 pb-5 lg:pb-20 px-5 lg:px-10 border border-gray-400 max-w-7xl mx-2 sm:mx-4 lg:mx-auto w-full lg:w-2/3 shadow-xl shadow-black/50"
                    onClick={(e) => e.stopPropagation()}
                >
                    <X 
                    className="absolute right-3 top-3 stroke-3 text-[#7A9B8E] hover:scale-110 hover:text-red-600 transition-transform duration-300 cursor-pointer" 
                    onClick={closeModal} 
                    />
                    {content}
                </div>
            </div>
        </ModalPortal>
    );
}