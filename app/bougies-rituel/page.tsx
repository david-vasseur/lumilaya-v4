import Final from '@/components/layout/product_list_page/Final';
import Hero from '@/components/layout/product_list_page/Hero';
import Interlude from '@/components/layout/product_list_page/Interlude';
import ProductsList from '@/components/layout/product_list_page/ProductsList';
import { ProductCardProps } from '@/components/ui/ProductCard';
import { getProductsByCollection } from '@/lib/action/product.action';

export const dynamic = 'force-dynamic';

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