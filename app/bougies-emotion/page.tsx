import Final from '@/components/layout/product_list_page/Final';
import Hero from '@/components/layout/product_list_page/Hero';
import Interlude from '@/components/layout/product_list_page/Interlude';
import ProductsList from '@/components/layout/product_list_page/ProductsList';
import { ProductCardProps } from '@/components/ui/ProductCard';
import { getProductsByCollection } from '@/lib/action/product.action';

export const dynamic = 'force-dynamic';

async function page() {

    const products = await getProductsByCollection('Emotion');

    if (!products) return;

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Hero 
                image={"/images/landing/emotion_collection.webp"} 
                url={"bougies-emotion"} 
                title={"Emotions <br/>& <br/>Plaisirs"} 
                subtitle={"Des bougies parfumées qui éveillent les sens et enveloppent le quotidien de douceur. <br/>Une invitation à créer une atmosphère chaleureuse et à savourer des instants de réconfort et de plaisir."} 
            />
            <Interlude collection='Emotion' />
            <ProductsList products={products} />
            <Final />
        </div>
    )
}

export default page;