import Final from '@/components/layout/product_page/Final';
import Hero from '@/components/layout/product_page/Hero';
import Interlude from '@/components/layout/product_page/Interlude';
import ProductsList from '@/components/layout/product_page/ProductsList';
import { ProductCardProps } from '@/components/ui/ProductCard';

export const mockProducts: ProductCardProps[] = [
    {
        slug: 'bougie-magie',
        image: '/images/products/magie.webp',
        name: 'Bougie Magie',
        duration: '12',
        intro: 'Une bougie envoûtante qui illumine vos soirées et éveille vos sens.',
        price: 19.90
    },
    {
        slug: 'bougie-tendresse',
        image: '/images/products/tendresse.webp',
        name: 'Bougie Tendresse',
        duration: '10',
        intro: 'Douceur et réconfort dans un parfum délicat et apaisant.',
        price: 19.90
    },
    {
        slug: 'bougie-douceur',
        image: '/images/products/douceur.webp',
        name: 'Bougie Douceur',
        duration: '8',
        intro: 'Un parfum léger et enveloppant pour des moments de calme.',
        price: 19.90
    },
    {
        slug: 'bougie-vitalite',
        image: '/images/products/vitalite.webp',
        name: 'Bougie Vitalité',
        duration: '14',
        intro: 'Énergisante et rafraîchissante, elle dynamise votre espace.',
        price: 19.90
    },
    {
        slug: 'bougie-harmonie',
        image: '/images/products/harmonie.webp',
        name: 'Bougie Harmonie',
        duration: '12',
        intro: 'Pour retrouver équilibre et sérénité dans votre quotidien.',
        price: 19.90
    }
];

function page() {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Hero image={"/images/landing/emotion_collection.webp"} url={"bougies-emotion"} title={"Emotions <br/>& <br/>Plaisirs"} />
            <Interlude />
            <ProductsList products={mockProducts} />
            <Final />
        </div>
    )
}

export default page;