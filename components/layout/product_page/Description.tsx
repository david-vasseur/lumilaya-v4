import { IProduct } from "@/types/product";
import { Gem, Info } from "lucide-react";


function Description({ product, variant }: { product: IProduct, variant: number }) {

    const desc = product.description;
    const wellness = product.wellness;

    if (!product.meta.theme) return;

    const notes = [
        { label: "Tête", value: product.meta.theme.top },
        { label: "Cœur", value: product.meta.theme.heart },
        { label: "Fond", value: product.meta.theme.base },
    ];

    return (
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div>
                <h2 className="text-3xl font-light text-[#2C2C2C] mb-6">
                Description
                </h2>
                <div className="mt-8 bg-[#F5F1EB] rounded-xl p-6">
                    {wellness ? (
                        <div className="space-y-8">

                        {/* Section idéal pour */}
                        <div>
                            <h3 className="font-ballet text-4xl text-[#2C2C2C] mb-4">
                            Cette bougie est idéale pour vous si :
                            </h3>

                            <div className="space-y-2">
                            {wellness.idealFor.map((ideal, index) => (
                                <div key={index} className="flex items-start gap-2">
                                <div className="w-2 h-2 mt-2 bg-[#7A9B8E] rounded-full"></div>
                                <span className="text-sm text-[#2C2C2C]/70">{ideal}</span>
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Section pierres */}
                        <div className="space-y-6">
                            <h3 className="font-medium text-4xl text-[#2C2C2C] mb-4 font-ballet">
                                Les pierres et leurs bienfaits :
                            </h3>
                            {wellness.stones.map((stone) => (
                            <div key={stone.name}>

                                <h4 className="text-lg flex gap-2 items-center font-medium text-[#2C2C2C] mb-3">
                                💎 {stone.name}
                                </h4>

                                <div className="space-y-2">
                                {stone.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                    <div className="w-2 h-2 mt-2 bg-[#7A9B8E] rounded-full"></div>
                                    <span className="text-sm text-[#2C2C2C]/70">{benefit}</span>
                                    </div>
                                ))}
                                </div>

                            </div>
                            ))}
                        </div>

                        </div>
                    ) : (
                        <div className="space-y-4 text-[#2C2C2C]/70 leading-relaxed">
                        {desc?.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                        </div>
                    )}
                    </div>
                
                

                <div className="mt-8 bg-[#F5F1EB] rounded-xl p-6">
                    <h3 className="font-medium text-[#2C2C2C] mb-3">Notes olfactives</h3>
                    <div className="space-y-2">
                        {notes.map((note) => (
                            <div key={note.label} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#7A9B8E] rounded-full"></div>

                            <span className="text-sm text-[#2C2C2C]/70">
                                {note.label} : {note.value}
                            </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-3xl font-light text-[#2C2C2C] mb-6">
                Caractéristiques
                </h2>
                <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-[#2C2C2C]/10">
                        <span className="text-[#2C2C2C]/60">Composition</span>
                        <span className="text-[#2C2C2C] font-medium">Cire de coco et de soja</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#2C2C2C]/10">
                        <span className="text-[#2C2C2C]/60">Mèche</span>
                        <span className="text-[#2C2C2C] font-medium">Mèche en coton bio</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#2C2C2C]/10">
                        <span className="text-[#2C2C2C]/60">Parfum</span>
                        <span className="text-[#2C2C2C] font-medium">Fragrance de Grasse</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#2C2C2C]/10">
                        <span className="text-[#2C2C2C]/60">Durée de combustion</span>
                        <span className="text-[#2C2C2C] font-medium">{product.variants[variant].duration} - {Math.round(Number(product.variants[variant].duration) + 10)} heures</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#2C2C2C]/10">
                        <span className="text-[#2C2C2C]/60 flex gap-2 items-center">Poids net <Info className="w-4 h-4 text-green-800/60" /></span>
                        <span className="text-[#2C2C2C] font-medium">{product.meta.collection === "Emotion" ? Math.round(product?.variants[variant].weight + 107) : Math.round(product?.variants[variant].weight + 140)}g</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#2C2C2C]/10">
                        <span className="text-[#2C2C2C]/60">Contenant</span>
                        <span className="text-[#2C2C2C] font-medium">Pot en béton fait main</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#2C2C2C]/10">
                        <span className="text-[#2C2C2C]/60">Fabrication</span>
                        <span className="text-[#2C2C2C] font-medium">France</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Description;