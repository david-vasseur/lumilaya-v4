"use client"

import FavoriteButton from '@/components/ui/FavoriteButton';
import ShareButton from '@/components/ui/ShareButton';
import { useCartStore } from '@/lib/store/cartStore';
import { IProduct } from '@/types/product';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

type Props = {
    product: IProduct,
    selectedSize: number,
    quantity: number,
    setSelectedSize: Dispatch<SetStateAction<number>>;
    setQuantity: Dispatch<SetStateAction<number>>; 
    variant: number,
}

function ProductInteract({ product, selectedSize, setSelectedSize, quantity, setQuantity, variant }: Props) {

    if (!product) return

    const MAX = 4;
    const addOption = (option: string) => {
            setSelection(prev => {
                if (prev.length >= MAX) return prev; // limite 4
                return [...prev, option];
            });
        };

        const removeOption = (option: string) => {
            setSelection(prev => {
                const index = prev.indexOf(option);
                if (index === -1) return prev;

                const newArr = [...prev];
                newArr.splice(index, 1);
                return newArr;
            });
        };

    const [selection, setSelection] = useState<string[]>([]);
    const { addItem } = useCartStore();
    const finalPrice = product.meta.promo && product.meta.promo > 0 ? product!.variants[variant].price * (1 - product.meta.promo / 100) : product?.variants[variant].price;

    return (
        <div className="md:col-start-2">
            {/* Selection taille */}
            {product.meta.slug === "coffret-decouverte" ? (
                <div className="mb-8 max-w-[80vw]">
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-3">
                        Selectionnez vos parfums :
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {["Harmonie", "Vitalité", "Tendresse", "Douceur", "Magie"].map((option) => {
                            const count = selection.filter(o => o === option).length;

                            return (
                                <button
                                    key={option}
                                    onClick={() => addOption(option)}
                                    className={`px-4 py-2 rounded-lg border-2 ${
                                        count > 0
                                            ? "border-[#7A9B8E] bg-[#7A9B8E]/5 text-[#7A9B8E]"
                                            : "border-[#2C2C2C]/10 text-[#2C2C2C]/60"
                                    }`}
                                >
                                    {option} {count > 0 && `(${count})`}
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-[#2C2C2C]/60 mb-2">
                            Votre sélection ({selection.length}/4)
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {selection.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => removeOption(item)}
                                    className="px-3 py-1 bg-[#F5F1EB] rounded-full text-sm"
                                >
                                    {item} ✕
                                </button>
                            ))}
                        </div>
                    </div>
                    
                </div>
            ) : (
                <div className="mb-8">
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-3">
                        Taille
                    </label>
                    <div className="flex gap-3">
                        {product.variants.map((variant) => (
                            <button
                            key={variant.id}
                            onClick={() => setSelectedSize(variant.weight)}
                            className={`px-6 py-3 rounded-lg border-2 transition-all ${
                                selectedSize === variant.weight
                                ? "border-[#7A9B8E] bg-[#7A9B8E]/5 text-[#7A9B8E]"
                                : "border-[#2C2C2C]/10 text-[#2C2C2C]/60 hover:border-[#7A9B8E]/50"
                            }`}
                            >
                            {variant.weight}g
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-[#2C2C2C]/50 mt-2">≈ {product.variants[variant].duration} - {Math.round(Number(product.variants[variant].duration) + 5)}h de combustion</p>
                </div>
            )}
            

            {/* Quantité et ajout panier */}
            <div className="flex gap-4 mb-8">
                <div className="flex items-center border-2 border-[#2C2C2C]/10 rounded-lg overflow-hidden">
                    <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-[#F5F1EB] transition-colors"
                    >
                    <Minus className="w-5 h-5 text-[#2C2C2C]" />
                    </button>
                    <span className="px-6 py-3 text-[#2C2C2C] font-medium min-w-15 text-center">
                    {quantity}
                    </span>
                    <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-[#F5F1EB] transition-colors"
                    >
                    <Plus className="w-5 h-5 text-[#2C2C2C]" />
                    </button>
                </div>

                <button onClick={() => {
                     if (product.meta.slug === "coffret-decouverte" && selection.length !== 4) {
                        toast.error("Tu dois sélectionner 4 parfums");
                        return;
                    }
                    addItem({ productId: product.meta.id, id: product?.variants[variant].id, name: product?.variants[variant].name, promo: product.meta.promo ?? 0, options: [...selection], price: Number(finalPrice?.toFixed(2) ?? 0), image: product?.images[0] || "", qty: quantity  }); 
                    toast.success("Produit ajouté au panier")
                    }} 
                    className="cursor-pointer flex-1 bg-[#7A9B8E] text-white py-4 rounded-lg hover:bg-[#6A8B7E] transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
                    <ShoppingCart className="w-5 h-5" />
                    Ajouter au panier
                </button>
            </div>

            {/* Actions secondaires */} 
            <div className="flex gap-3 mb-10">
                <FavoriteButton product={product} />          
                <ShareButton product={product} />
            </div>
        </div>
    )
}

export default ProductInteract;