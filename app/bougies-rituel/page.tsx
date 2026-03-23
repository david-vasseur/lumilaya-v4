import Final from '@/components/layout/product_list_page/Final';
import Hero from '@/components/layout/product_list_page/Hero';
import Interlude from '@/components/layout/product_list_page/Interlude';
import ProductsList from '@/components/layout/product_list_page/ProductsList';
import { ProductCardProps } from '@/components/ui/ProductCard';
import { getProductsByCollection } from '@/lib/action/product.action';

export const dynamic = 'force-dynamic';

// export const mockProducts: ProductCardProps[] = [
//     {
//         slug: 'bougie-ancrage',
//         collection: "bougies-rituel",
//         image: '/images/products/ancrage.webp',
//         name: 'Bougie Ancrage',
//         duration: '35',
//         intro: 'Une bougie envoûtante qui illumine vos soirées et éveille vos sens.',
//         price: 32
//     },
//     {
//         slug: 'bougie-protection',
//         collection: "bougies-rituel",
//         image: '/images/products/protection.webp',
//         name: 'Bougie Protection',
//         duration: '35',
//         intro: 'Douceur et réconfort dans un parfum délicat et apaisant.',
//         price: 32
//     },
//     {
//         slug: 'bougie-liberation',
//         collection: "bougies-rituel",
//         image: '/images/products/liberation.webp',
//         name: 'Bougie Libération',
//         duration: '35',
//         intro: 'Un parfum léger et enveloppant pour des moments de calme.',
//         price: 32
//     },
//     {
//         slug: 'bougie-introspection',
//         collection: "bougies-rituel",
//         image: '/images/products/introspection.webp',
//         name: 'Bougie Introspection',
//         duration: '35',
//         intro: 'Énergisante et rafraîchissante, elle dynamise votre espace.',
//         price: 32
//     }
// ];

async function page() {

    const products = await getProductsByCollection('Terre');
    
    if (!products) return;

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Hero 
                image={"/images/landing/rituel_collection.webp"} 
                url={"bougies-rituel"} 
                subtitle={"Des bougies à intention qui accompagnent les moments de recentrage et de transformation intérieure. <br/>Associant parfums subtils et pierres naturelles, elles soutiennent l’équilibre émotionnel et la connexion à soi."}
                title={"Entre Terre <br/>& <br/>Ciel"} 
            />
            <Interlude collection='Rituel' />
            <ProductsList products={products} />
            <Final />
        </div>
    )
}

export default page;