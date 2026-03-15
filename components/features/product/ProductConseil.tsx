"use client"

import { AlertTriangle, Flame } from "lucide-react";


interface ConseilUtilisationProps {
  title?: string;
  conseils?: string[];
}

function ProductConseil({
  title = "Conseils d’utilisation",
  conseils = [
    "Lors de la première utilisation, laissez brûler la bougie jusqu’à ce que toute la surface soit fondue.",
    "Coupez la mèche à environ 5 mm avant chaque allumage.",
    "Ne laissez jamais une bougie allumée sans surveillance.",
    "Placez la bougie sur une surface plane et résistante à la chaleur.",
    "Tenir hors de portée des enfants et des animaux.",
  ],
}: ConseilUtilisationProps) {
    return (
        <div className="bg-[#7A9B8E] rounded-2xl p-8 my-10 shadow-lg border border-[#2C2C2C]/5">
            <div className="flex items-center justify-center gap-3 mb-6">
                <h3 className="text-2xl md:text-4xl text-[#2C2C2C]/90">
                    {title}
                </h3>
            </div>

            <ul className="pl-0 md:pl-15 space-y-4">
                {conseils.map((conseil, index) => (
                    <li key={index} className="flex gap-3">
                        <div className="mt-1">
                            <Flame className="w-4 h-4 shrink-0 text-zinc-200" />
                        </div>
                        <p className="text-[#2C2C2C]/70 leading-relaxed">
                            {conseil}
                        </p>
                    </li>
                ))}
            </ul>

            <div className="mt-6 flex items-center justify-center gap-3 bg-[#7A9B8E]/10 rounded-xl p-4">
                <AlertTriangle className="w-8 h-8 shrink-0 text-zinc-200 mt-0.5" />
                <p className="text-sm text-[#2C2C2C]">
                    Pour une utilisation optimale et en toute sécurité, respectez toujours
                    les consignes indiquées.
                </p>
            </div>
        </div>
    );
}

export default ProductConseil;