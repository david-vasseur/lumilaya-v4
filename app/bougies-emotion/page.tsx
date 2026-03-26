import Final from '@/components/layout/product_list_page/Final';
import Hero from '@/components/layout/product_list_page/Hero';
import Interlude from '@/components/layout/product_list_page/Interlude';
import ProductsList from '@/components/layout/product_list_page/ProductsList';
import { getProductsByCollection } from '@/lib/action/product.action';


///// FORCER LE SSR /////
export const dynamic = 'force-dynamic';


///// METADATAS SEO /////
export async function generateMetadata() {
    return {
        title: "Bougies parfumées émotions & plaisirs | Atmosphère chaleureuse",
        description:
            "Découvrez nos bougies parfumées aux senteurs naturelles. Cire végétale, parfums délicats pour créer une atmosphère apaisante et chaleureuse au quotidien.",
        keywords: [
            "bougies parfumées",
            "bougie naturelle",
            "cire végétale",
            "bougie artisanale",
            "ambiance cocooning",
            "parfum maison"
        ],
        openGraph: {
            title: "Bougies émotions & plaisirs",
            description:
                "Des bougies parfumées qui éveillent les sens et apportent douceur et réconfort.",
            url: "https://lumilaya.fr/bougies-emotion",
            siteName: "Lumilaya",
            images: [
                {
                    url: "/images/landing/emotion_collection.webp",
                    width: 1200,
                    height: 630,
                    alt: "Bougies parfumées émotions",
                },
            ],
            locale: "fr_FR",
            type: "website",
        },
    };
}


///// FONCTION DE LA PAGE /////
async function page() {

    const products = await getProductsByCollection('Emotion');

    if (!products) {
        return <div>Produits indisponibles</div>;
    }

    ///// RICH SNIPPET GOOGLE /////
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Bougies émotions & plaisirs",
        description:
            "Des bougies parfumées qui éveillent les sens et apportent douceur et réconfort.",
        url: "https://lumilaya.fr/bougies-emotion",
        mainEntity: {
            "@type": "ItemList",
            itemListElement: products.map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `https://lumilaya.fr/bougies-emotion/${product.slug}`,
                name: product.name,
            })),
        },
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7]">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

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