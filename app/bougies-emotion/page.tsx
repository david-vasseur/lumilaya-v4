import Final from '@/components/layout/product_list_page/Final';
import CollectionHero from '@/components/layout/product_list_page/NewHero';
import ProductsList from '@/components/layout/product_list_page/ProductsList';
import { getProductsByCollection } from '@/lib/action/product.action';


///// FORCER LE SSR /////
export const dynamic = 'force-dynamic';


///// METADATAS SEO /////
export async function generateMetadata() {
    return {
        title: "Bougies parfumées naturelles | Émotions & Plaisirs Lumilaya",
        description:
            "Découvrez nos bougies parfumées naturelles en cire de soja et coco. Des créations aux senteurs délicates pensées pour apporter une ambiance chaleureuse, douce et réconfortante à votre intérieur.",
        keywords: [
            "bougies parfumées naturelles",
            "bougie cire de soja",
            "bougie cire de coco",
            "bougie artisanale",
            "bougie naturelle",
            "parfum maison"
        ],
        openGraph: {
            title: "Bougies parfumées naturelles | Émotions & Plaisirs Lumilaya",
            description:
                "Découvrez nos bougies parfumées naturelles en cire de soja et coco. Des créations aux senteurs délicates pensées pour apporter une ambiance chaleureuse, douce et réconfortante à votre intérieur.",
            url: "https://lumilaya.fr/bougies-emotion",
            siteName: "Lumilaya",
            images: [
                {
                    url: "https://lumilaya.fr/images/landing/emotion_collection.webp",
                    width: 1200,
                    height: 630,
                    alt: "Collection de bougies parfumées naturelles Lumilaya",
                },
            ],
            locale: "fr_FR",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Bougies parfumées naturelles | Émotions & Plaisirs Lumilaya",
            description: 
                "Découvrez nos bougies parfumées naturelles en cire de soja et coco. Des créations aux senteurs délicates pensées pour apporter une ambiance chaleureuse, douce et réconfortante à votre intérieur.",
            images: [
                "https://lumilaya.fr/images/landing/emotion_collection.webp"
            ],
        },
        alternates: {
            canonical: "https://lumilaya.fr/bougies-emotion",
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

            <CollectionHero 
                image={"/images/landing/emotion_collection.webp"} 
                url={"bougies-emotion"} 
                title={"Emotions <br/>& <br/>Plaisirs"} 
                subtitle={"Des bougies parfumées qui éveillent les sens et enveloppent le quotidien de douceur"} 
                collection='Emotion'
            />
            <ProductsList products={products} />
            <Final />
        </div>
    )
}

export default page;