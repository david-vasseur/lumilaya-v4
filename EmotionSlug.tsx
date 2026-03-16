"use client"

import { useState } from 'react';
import { Heart, ShoppingCart, Minus, Plus, Truck, Shield, Leaf, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cartStore';
import { IProduct } from '@/type/product';
import toast from 'react-hot-toast';
import ConseilUtilisation from '../../ui/ConseilUtilisation';
import ShareButton from '../../ui/ShareButton';
import FavoriteButton from '../../ui/FavoriteButton';
import ReviewSummaryClient from '../../ui/ReviewComponent';

type Suggest = {
    name: string;
    slug: string;
    image: string | null;
    price: number | null;
};

interface EmotionSlugProps {
  product: IProduct;
  suggest: Suggest[];
  averageRating: number; 
  reviewCount: number;
}


function EmotionSlug({ product, suggest, averageRating, reviewCount }: EmotionSlugProps) {

    const [currentImage, setCurrentImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('150g');
    let variant = selectedSize === '150g' ? 0 : 1; 
    const path = usePathname().split('/').filter(Boolean).pop();      
    const { addItem, items } = useCartStore();
    const promo = Number(product?.promo || 0);
    const finalPrice = promo > 0 ? product!.variants[variant].price * (1 - promo / 100) : product?.variants[variant].price;
 

    
    

    useGSAP(() => {

            gsap.from('.product-gallery', {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.2
            });

            gsap.from('.product-info', {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.2
            });

    }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section principale produit */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          
          {/* Galerie images */}
          <div className="product-gallery">
            {/* Image principale avec carousel */}
            <div className="relative rounded-2xl overflow-hidden mb-6 w-full aspect-square lg:h-[600px] bg-white shadow-xl">
                <Image fill src={product?.images[currentImage] || ""} alt="image d'une bougie" className="object-cover" />


              {/* Navigation carousel */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
              >
                <ChevronLeft className="w-6 h-6 text-[#2C2C2C]" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
              >
                <ChevronRight className="w-6 h-6 text-[#2C2C2C]" />
              </button>

              {/* Indicateurs */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {product?.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImage === index ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                  ></button>
                ))}
              </div>

              {/* Badge */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full z-10">
                <span className="text-sm font-medium text-[#7A9B8E]">100% Naturel</span>
              </div>
            </div>

            {/* Miniatures */}
            <div className="grid grid-cols-5 gap-4">
              {product?.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative aspect-square h-15 lg:h-24 rounded-xl overflow-hidden transition-all ${
                    currentImage === index ? 'ring-2 ring-[#7A9B8E] scale-105' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image fill src={img} alt="image d'une bougie" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Informations produit */}
          <div className="product-info">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#F5F1EB] text-[#7A9B8E] text-sm px-3 py-1 rounded-full">
                {product.collection === "Emotion" ? "Collection Emotions & Plaisirs" : "Collection Entre Terre & Ciel"}
              </span>
              <span className="text-[#2C2C2C]/40">•</span>
              <span className="text-sm text-[#2C2C2C]/60">{product.stock === true ? "En stock" : "Rupture - Livraison sous 7 jours"}</span>
            </div>

            <h1 className="text-5xl font-light text-[#2C2C2C] mb-4 leading-tight">
              Bougie {product?.name}
            </h1>

                <ReviewSummaryClient productId={product.id} productSlug={product.slug} productName={product.name} averageRating={averageRating} reviewCount={reviewCount} />

            <p className="text-lg text-[#2C2C2C]/70 leading-relaxed mb-8">
              {product?.intro}
            </p>

                {product && product.variants && product.variants[variant] && (
                  <div className="flex items-baseline gap-3 mb-8">
                    {product.promo && product.promo !== 0 ? (
                      <>
                        <span className="text-4xl font-light text-[#2C2C2C]">
                          {(product.variants[variant].price * (1 - product.promo / 100)).toFixed(2)} €
                        </span>
                        <span className="text-xl text-[#2C2C2C]/40 line-through">
                          {product.variants[variant].price.toFixed(2)} €
                        </span>
                      </>
                    ) : (
                      <span className="text-4xl font-light text-[#2C2C2C]">
                        {product.variants[variant].price.toFixed(2)} €
                      </span>
                    )}

                    {product.promo !== 0 && (
                      <span className="bg-[#7A9B8E]/10 text-[#7A9B8E] text-sm px-3 py-1 rounded-full">
                        {product.promo} %
                      </span>
                    )}
                  </div>
                )}

            {/* Sélection taille */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#2C2C2C] mb-3">
                Taille
              </label>
              <div className="flex gap-3">
                {product.collection === "Emotion" ? (
                  ['150g'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      selectedSize === size
                        ? 'border-[#7A9B8E] bg-[#7A9B8E]/5 text-[#7A9B8E]'
                        : 'border-[#2C2C2C]/10 text-[#2C2C2C]/60 hover:border-[#7A9B8E]/50'
                    }`}
                  >
                    {size}
                  </button>
                ))
                ) : (
                  <button
                    className={`px-6 py-3 rounded-lg border-2 transition-all border-[#7A9B8E] bg-[#7A9B8E]/5 text-[#7A9B8E]`}
                  >
                    200g
                  </button>
                )}
                
              </div>
              <p className="text-sm text-[#2C2C2C]/50 mt-2">≈ {product.variants[variant].duration} - {Math.round(Number(product.variants[variant].duration) + 5)}h de combustion</p>
            </div>

            {/* Quantité et ajout panier */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border-2 border-[#2C2C2C]/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-[#F5F1EB] transition-colors"
                >
                  <Minus className="w-5 h-5 text-[#2C2C2C]" />
                </button>
                <span className="px-6 py-3 text-[#2C2C2C] font-medium min-w-[60px] text-center">
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
                addItem({ productId: product.id, id: product?.variants[variant].id, name: product?.variants[variant].name, promo: product.promo ?? 0, price: Number(finalPrice?.toFixed(2) ?? 0), image: product?.images[0] || "", qty: quantity  }); 
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

            {/* Points de réassurance */}
            <div className="space-y-4 border-t border-[#2C2C2C]/10 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F5F1EB] rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-[#7A9B8E]" />
                </div>
                <div>
                  <p className="font-medium text-[#2C2C2C]">Livraison offerte</p>
                  <p className="text-sm text-[#2C2C2C]/60">Dès 50€ d'achat</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F5F1EB] rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#7A9B8E]" />
                </div>
                <div>
                  <p className="font-medium text-[#2C2C2C]">Garantie satisfaction</p>
                  <p className="text-sm text-[#2C2C2C]/60">Retour sous 30 jours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F5F1EB] rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-[#7A9B8E]" />
                </div>
                <div>
                  <p className="font-medium text-[#2C2C2C]">100% naturel</p>
                  <p className="text-sm text-[#2C2C2C]/60">Fabriqué en France</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section caractéristiques détaillées */}
        <div className="features-section mb-20">
          <h2 className="text-3xl font-light text-[#2C2C2C] mb-12 text-center">
            Ce qui rend cette bougie unique
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-linear-to-br from-[#7A9B8E] to-[#5A7B6E] rounded-2xl flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-[#2C2C2C] mb-3">
                Ingrédients purs
              </h3>
              <p className="text-[#2C2C2C]/60 leading-relaxed">
                Cire de soja et de coco 100% naturelles, mèche en coton bio et fragrances de Grasse 
                certifiées. Aucun parfum synthétique, aucun additif.
              </p>
            </div>

            <div className="feature-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-linear-to-br from-[#7A9B8E] to-[#5A7B6E] rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-[#2C2C2C] mb-3">
                Diffusion optimale
              </h3>
              <p className="text-[#2C2C2C]/60 leading-relaxed">
                Notre formule exclusive garantit une diffusion homogène et durable 
                du parfum, pour une expérience olfactive exceptionnelle.
              </p>
            </div>

            <div className="feature-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-linear-to-br from-[#7A9B8E] to-[#5A7B6E] rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-[#2C2C2C] mb-3">
                Fait main en France
              </h3>
              <p className="text-[#2C2C2C]/60 leading-relaxed">
                Chaque bougie est coulée à la main dans notre atelier occitan, 
                avec soin et passion pour garantir une qualité irréprochable.
              </p>
            </div>
          </div>
        </div>

        {/* Section description détaillée */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-3xl font-light text-[#2C2C2C] mb-6">
              Description
            </h2>
            {product.description && (
                <div className="space-y-4 text-[#2C2C2C]/70 leading-relaxed">
              <p>
                {product?.description[0]}
              </p>
              <p>
                {product?.description[1]}
              </p>
            </div>
            )}
            

            <div className="mt-8 bg-[#F5F1EB] rounded-xl p-6">
              <h3 className="font-medium text-[#2C2C2C] mb-3">Notes olfactives</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#7A9B8E] rounded-full"></div>
                  <span className="text-sm text-[#2C2C2C]/70">Tête : {product?.theme[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#7A9B8E] rounded-full"></div>
                  <span className="text-sm text-[#2C2C2C]/70">Cœur : {product?.theme[1]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#7A9B8E] rounded-full"></div>
                  <span className="text-sm text-[#2C2C2C]/70">Fond : {product?.theme[2]}</span>
                </div>
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
                <span className="text-[#2C2C2C] font-medium">{product?.caracteristique.composition}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#2C2C2C]/10">
                <span className="text-[#2C2C2C]/60">Mèche</span>
                <span className="text-[#2C2C2C] font-medium">{product?.caracteristique.meche}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#2C2C2C]/10">
                <span className="text-[#2C2C2C]/60">Parfum</span>
                <span className="text-[#2C2C2C] font-medium">{product?.caracteristique.parfum}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#2C2C2C]/10">
                <span className="text-[#2C2C2C]/60">Durée de combustion</span>
                <span className="text-[#2C2C2C] font-medium">{product.variants[variant].duration} - {Math.round(Number(product.variants[variant].duration) + 10)} heures</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#2C2C2C]/10">
                <span className="text-[#2C2C2C]/60">Poids net</span>
                <span className="text-[#2C2C2C] font-medium">{product.collection === "Emotion" && variant === 0 ? product?.caracteristique.poids : Math.round(Number(product?.caracteristique.poids) + 60)}g</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#2C2C2C]/10">
                <span className="text-[#2C2C2C]/60">Contenant</span>
                <span className="text-[#2C2C2C] font-medium">{product?.caracteristique.contenant}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#2C2C2C]/10">
                <span className="text-[#2C2C2C]/60">Fabrication</span>
                <span className="text-[#2C2C2C] font-medium">{product?.caracteristique.fabrication}</span>
              </div>
            </div>
          </div>
        </div>

        {/* conseil utilisation */}
            <ConseilUtilisation />

        {/* Produits similaires */}
        <div>
          <h2 className="text-3xl font-light text-[#2C2C2C] mb-12 text-center">
            Vous aimerez aussi
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {suggest.map((item) => (
              <Link href={`/${product.collection === "Emotion" ? "bougies-emotions" : "bougies-rituel"}/${item.slug}`} key={item.name} className="group cursor-pointer">
                <div className="relative h-80 rounded-xl overflow-hidden mb-4 bg-linear-to-br from-[#7A9B8E] to-[#5A7B6E] group-hover:scale-105 transition-transform">
                  
                  <Image
                    fill
                    // TODO PENSER A METTRE UNE IMAGE FALLBACK
                    src={item.image ?? ""}
                    alt="image d'une bougie"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-white/20" />
                  </div>

                </div>

                <h3 className="text-lg font-light text-[#2C2C2C] mb-1">
                  {item.name}
                </h3>
                <p className="text-[#7A9B8E] font-medium">{item.price} €</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default EmotionSlug;