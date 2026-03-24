import ProductCar from '@/components/features/product/ProductCar';
import ProductConseil from '@/components/features/product/ProductConseil';
import Principal from '@/components/layout/product_page/Principal';
import Suggest, { ISuggProduct } from '@/components/layout/product_page/Suggest';
import { getOneProductBySlug, getSuggestedProduct } from '@/lib/action/product.action';

interface Props {
    params: { slug: string };
}

export const dynamic = "force-dynamic";

async function page({ params }: Props) {

    const { slug } = await params;

    // const product = products.find((product) => product.meta.slug === slug)!

    const product = await getOneProductBySlug(slug);

    if (!product) return;

    const suggestedProducts = await getSuggestedProduct(product.id);

    console.log(suggestedProducts);
    

    // const suggestedProducts: ISuggProduct[] = [    
    //         {
    //             id: 1,
    //             collection: "Emotion",
    //             name: "Magie",
    //             slug: "bougie-magie",            
    //             image: "/images/products/magie.webp",            
    //             variants: [
    //                 { id: 1, name: "Bougie Magie 150g", duration: 25 , price: 19.90 } 
    //             ]
    //         },
    //         {
    //             id: 2,
    //             collection: "Terre",
    //             name: "Libération",
    //             slug: "bougie-liberation",
    //             image: "/images/products/liberation.webp",
    //             variants: [
    //                 { id: 5, name: "Bougie Libération 200g", duration: 30, price: 32 }
    //             ],
    //         },
    //         {
    //             id: 3,
    //             collection: "Terre",
    //             name: "Protection",
    //             slug: "bougie-protection",
    //             image: "/images/products/protection.webp",
    //             variants: [
    //                 { id: 8, name: "Bougie Protection 200g", duration: 30, price: 32 }
    //             ]
    //         }
    //     ]

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 max-w-7xl mx-auto px-6">
            <Principal product={product} />
            <ProductCar />
            <ProductConseil />
            <Suggest suggestedProducts={suggestedProducts} />
        </div>
        
    )
}

export default page;