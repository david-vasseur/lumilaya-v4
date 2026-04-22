import ProductCar from '@/components/features/product/ProductCar';
import ProductConseil from '@/components/features/product/ProductConseil';
import Principal from '@/components/layout/product_page/Principal';
import BackButton from '@/components/ui/BackButton';
import { getOneProductBySlug, getSuggestedProduct } from '@/lib/action/product.action';
import { getReviewById } from '@/lib/action/review.action';
import { Info } from 'lucide-react';
import React from 'react'

interface Props {
    params: { slug: string };
}


async function page({ params }: Props) {

    const { slug } = await params;
    
    const product = await getOneProductBySlug(slug);

    if (!product) {
        return <div>Produit indisponible</div>;
    }

    const suggestedProducts = await getSuggestedProduct(product.id);

    const reviews = await getReviewById(product.id);    

//     const products = [
//     {
//         id: 5,
//         meta: {
//             id: 9,
//             collection: "Terre",
//             name: "Coffret Protection",
//             slug: "coffret-rituel-protection",
//             intro: "Ce coffret a été imaginé comme un véritable moment pour soi… Un rituel simple et accessible pour nettoyer les énergies, se recentrer et retrouver un sentiment de sécurité intérieure. Chaque élément a été choisi avec soin pour vous accompagner dans un espace de calme, de présence et de protection",
//             theme: {
//                 top: "Cannelle",
//                 heart: "Cèdre & patchouli",
//                 base: "Bois de santal"
//             },
//             stock: true,
//             promo: 0,
//             like: 0,
//             content: [
//                 "1 x Bougie Protection",
//                 "1 x Baton de sauge",
//                 "1 x Sachet d'herbes sacrées",
//                 "1 x Sachet de critaux de roche"
//             ],
//             createdAt: new Date()
//         },
//         description: [
//             "La bougie Protection a été créée comme un véritable soutien énergétique pour celles qui ressentent le besoin de purifier leur espace, de se protéger des énergies négatives et de retrouver un sentiment de paix intérieure. Allumée en conscience, sa flamme devient un point d'ancrage sécurisant. Elle accompagne les moments de fatigue émotionnelle, les périodes de tension ou simplement le besoin de se sentir protégée dans son environnement."
//         ],
//         images: [
//             "/images/landing/coffret_rit1.webp",
//             "/images/landing/coffret_rit2.webp",
//             "/images/products/protection3.webp",
//             "/images/products/protection4.webp",
//             "/images/products/protection2.webp"
//         ],
//         variants: [
//             { id: 0, name: "Coffret Rituel Protection", duration: 30, weight:200, price: 40 }
//         ],
//         wellness: {
//             idealFor: [
//                 "Vous ressentez le besoin de vous protéger énergétiquement",
//                 "Vous souhaitez purifier votre intérieur ou votre espace de vie",
//                 "Vous traversez une période de changement ou de fatigue émotionnelle",
//                 "Vous avez envie de vous offrir un moment de recentrage et de calme",
//                 "Vous êtes attiré(e) par les rituels simples et naturels"
//             ],
//             stones: [
//                 {
//                     name: "Tourmaline noire",
//                     benefits: [
//                         "Absorbe les énergies négatives",
//                         "Favorise l’ancrage",
//                         "Protège et stabilise"
//                     ]
//                 },
//                 {
//                     name: "Œil de Tigre",
//                     benefits: [
//                         "Repousse les influences négatives",
//                         "Renforce la confiance",
//                         "Apporte force et équilibre émotionnel"
//                     ]
//                 }
//             ]
//         },
//         tags: [
//             "cardamome",
//             "patchouli",
//             "cèdre",
//             "iris",
//             "santal",
//             "musc",
//             "ambre"
//         ]        
//     },
//     {
//         id: 6,
//         meta: {
//             id: 10,
//             collection: "Emotion",
//             name: "Coffret Decouverte",
//             slug: "coffret-decouverte",
//             intro: "Ce coffret a été imaginé pour vous faire découvrir toute la richesse de la collection Émotions & Plaisirs… Quatre bougies au format mini, à choisir selon vos envies, pour créer des ambiances différentes et vous accompagner au fil de vos émotions",
//             theme: {
//                 top: "Cannelle",
//                 heart: "Cèdre & patchouli",
//                 base: "Bois de santal"
//             },
//             stock: true,
//             promo: 0,
//             like: 0,
//             content: [
//                 "4 x Bougies de 50g sélectionnées par vos soins",
//             ],
//             createdAt: new Date()
//         },
//         description: [
//             "Chaque bougie vous invite à explorer une émotion : douceur, harmonie, vitalité, tendresse ou magie… À vous de composer votre coffret et de créer votre propre voyage sensoriel. Un coffret personnalisable, délicat et plein de sens, parfait pour faire plaisir… ou se faire plaisir"
//         ],
//         images: [
//             "/images/landing/coffret.webp",
//             "/images/landing/coffret1.webp",
//             "/images/landing/coffret2.webp",
//             "/images/landing/coffret3.webp",
//             "/images/landing/coffret1.webp"
//         ],
//         variants: [
//             { id: 0, name: "Coffret Decouverte", duration: 40, weight:300, price: 25 },
//         ],
//         tags: [
//             "cardamome",
//             "patchouli",
//             "cèdre",
//             "iris",
//             "santal",
//             "musc",
//             "ambre"
//         ]        
//     }
// ]


//     const reviews = [
//         {
//             name: "john",
//             productId: 5,
//             comment: "test",
//             note: 3
//         },
//         {
//             name: "john",
//             productId: 5,
//             comment: "test",
//             note: 3
//         },
//         {
//             name: "john",
//             productId: 6,
//             comment: "test",
//             note: 3
//         },
        
//     ]

    // const product = products.find(prod => prod.meta.slug === slug)


    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-20 max-w-7xl mx-auto px-6">
            <BackButton />
            <Principal product={product} reviews={reviews} />
            <ProductCar />
            <ProductConseil />
        </div>
    )
}

export default page;