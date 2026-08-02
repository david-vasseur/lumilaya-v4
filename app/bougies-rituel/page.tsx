import Final from '@/components/layout/product_list_page/Final';
import CollectionHero from '@/components/layout/product_list_page/NewHero';
import ProductsList from '@/components/layout/product_list_page/ProductsList';
import { getProductsByCollection } from '@/lib/action/product.action';


///// FORCER LE SSR /////
export const dynamic = 'force-dynamic';


///// METADATAS SEO /////
export async function generateMetadata() {
    return {
        title: "Bougies énergétiques & rituelles | Pierres naturelles Lumilaya",
        description:
            "Découvrez nos bougies énergétiques avec pierres naturelles. Des créations à intention pensées pour accompagner l’ancrage, la protection, la libération émotionnelle et les moments de reconnexion à soi.",
        keywords: [
            "bougies énergétiques",
            "bougie énergétique",
            "bougies rituelles",
            "bougie intention",
            "bougie pierre naturelle",
            "rituel bien-être",
            "ancrage émotionnel",
            "pierres naturelles"
        ],
        openGraph: {
            title: "Bougies énergétiques & rituelles | Pierres naturelles Lumilaya",
            description:
                "Des bougies à intention associant cire naturelle, pierres et rituels pour accompagner les moments d’ancrage, de protection et de transformation intérieure.",
            url: "https://lumilaya.fr/bougies-rituel",
            siteName: "Lumilaya",
            images: [
                {
                    url: "https://lumilaya.fr/images/landing/rituel_collection.webp",
                    width: 1200,
                    height: 630,
                    alt: "Collection de bougies énergétiques avec pierres naturelles Lumilaya",
                },
            ],
            locale: "fr_FR",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Bougies énergétiques & rituelles | Pierres naturelles Lumilaya",
            description:
                "Découvrez nos bougies énergétiques avec pierres naturelles. Des créations à intention pensées pour accompagner l’ancrage, la protection et la reconnexion à soi.",
            images: [
                "https://lumilaya.fr/images/landing/rituel_collection.webp"
            ],
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

            <CollectionHero 
                image={"/images/landing/rituel_collection.webp"} 
                url={"bougies-rituel"} 
                subtitle={"Des bougies à intention qui accompagnent les moments de recentrage et de transformation intérieure"}
                title={"Entre Terre <br/>& <br/>Ciel"} 
                collection='Entre Terre et Ciel'
            />
            <ProductsList products={products} />
            <Final />
        </div>
    )
}

export default page;