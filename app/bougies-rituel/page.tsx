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
        title: "Bougies rituelles & énergétiques | Ancrage et équilibre",
        description:
            "Découvrez nos bougies rituelles aux parfums subtils et pierres naturelles. Des créations pensées pour accompagner l’ancrage, l’équilibre émotionnel et la connexion à soi.",
        keywords: [
            "bougies rituelles",
            "bougie énergétique",
            "bougie intention",
            "bougie pierre naturelle",
            "rituel bien-être",
            "ancrage émotionnel"
        ],
        openGraph: {
            title: "Bougies rituelles & énergétiques",
            description:
                "Des bougies à intention qui accompagnent les moments de recentrage et de transformation intérieure.",
            url: "https://lumilaya.fr/bougies-rituel",
            siteName: "Lumilaya",
            images: [
                {
                    url: "/images/landing/rituel_collection.webp",
                    width: 1200,
                    height: 630,
                    alt: "Bougies rituelles et énergétiques",
                },
            ],
            locale: "fr_FR",
            type: "website",
        },
        alternates: {
            canonical: "https://lumilaya.fr/bougies-rituel",
        },
    };
}


///// FONCTION DE LA PAGE /////
async function page() {

    const products = await getProductsByCollection('Terre');
    
    if (!products) {
         return <div>Produits indisponibles</div>;
    }

    ///// RICH SNIPPET GOOGLE /////
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Bougies rituelles & énergétiques",
        description:
            "Des bougies à intention associant parfums subtils et pierres naturelles pour favoriser l’ancrage et l’équilibre intérieur.",
        url: "https://lumilaya.fr/bougies-rituel",
        mainEntity: {
            "@type": "ItemList",
            itemListElement: products.map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `https://lumilaya.fr/bougies-rituel/${product.slug}`,
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