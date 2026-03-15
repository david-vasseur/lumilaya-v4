import ProductCar from '@/components/features/product/ProductCar';
import Description from '@/components/layout/product_page/Description';
import Principal from '@/components/layout/product_page/Principal';

export interface ICaracteristique {
    composition: string;
    meche: string;
    parfum: string;
    combustion: string;
    poids: string;
    contenant: string;
    fabrication: string;
}

export interface IStone {
  name: string;
  benefits: string[];
}

export interface IProductWellness {
  idealFor: string[];
  stones: IStone[];
}

export interface IVariant {
    id: number;
    name: string;
    duration: string;
    price: number;
}

export interface IProductMeta {
    id: number;
    collection: string;
    name: string;
    slug: string;
    intro: string;
    theme: string[];
    createdAt: Date;
    stock: boolean;
    promo?: number;
    like?: number;
}

export interface IProductDescription {
    description: string[] | null;
}

export interface IProductImages {
    images: string[];
}

export interface IProduct {
    meta: IProductMeta;
    description: IProductDescription;
    images: IProductImages;
    caracteristique: ICaracteristique;
    variants: IVariant[];
    wellness?: IProductWellness;
}

export const product: IProduct = 
  {
    meta: {
      id: 1,
      collection: "Emotion",
      name: "Bougie Lavande",
      slug: "bougie-lavande",
      intro: "Une bougie relaxante aux notes naturelles de lavande.",
      theme: ["relaxation", "provence"],
      createdAt: new Date("2025-02-10"),
      stock: true,
      promo: 0,
      like: 42
    },
    description: {
      description: [
        "Cette bougie artisanale diffuse un parfum doux et apaisant de lavande.",
        "Parfaite pour accompagner vos moments de détente ou de méditation."
      ]
    },
    images: {
      images: [
        "/images/products/ancrage.webp",
        "/images/products/liberation.webp",
        "/images/products/introspection.webp"
      ]
    },
    caracteristique: {
      composition: "Cire de soja 100% naturelle",
      meche: "Coton non traité",
      parfum: "Lavande naturelle",
      combustion: "35h",
      poids: "180g",
      contenant: "Verre recyclable",
      fabrication: "Fabriqué artisanalement en France"
    },
    variants: [
      {
        id: 1,
        name: "Petit format",
        duration: "20",
        price: 32
      }
    ],
    wellness: {
    idealFor: [
      "Vous ressentez le besoin de faire le point",
      "Vous souhaitez écouter votre intuition plus profondément",
      "Vous traversez une période de réflexion",
      "Vous voulez observer vos émotions avec plus de conscience",
      "Vous avez besoin d’un moment de méditation et de calme",
      "Vous cherchez à revenir à votre centre",
      "Vous souhaitez vous reconnecter à votre vérité intérieure"
    ],

    stones: [
      {
        name: "Améthyste",
        benefits: [
          "Pierre de sagesse et d’élévation intérieure",
          "Favorise la clarté mentale",
          "Apaise le mental et les pensées envahissantes",
          "Soutient la méditation et l’intuition",
          "Aide à prendre du recul émotionnel"
        ]
      },
      {
        name: "Labradorite",
        benefits: [
          "Pierre d’intuition et de protection énergétique",
          "Aide à mieux comprendre ses émotions",
          "Favorise l’introspection profonde",
          "Soutient les périodes de réflexion intérieure",
          "Protège des influences extérieures"
        ]
      }
    ]
  }
  };

function page() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 max-w-7xl mx-auto px-6">
            <Principal product={product} />
            <ProductCar />
            <Description product={product} variant={0} />
        </div>
        
    )
}

export default page