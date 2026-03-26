import ProductCar from '@/components/features/product/ProductCar';
import ProductConseil from '@/components/features/product/ProductConseil';
import Principal from '@/components/layout/product_page/Principal';
import Suggest from '@/components/layout/product_page/Suggest';
import { getOneProductBySlug, getSuggestedProduct } from '@/lib/action/product.action';
import { getReviewById } from '@/lib/action/review.action';

interface Props {
    params: { slug: string };
}


///// ON FORCE LE SSR /////
export const dynamic = "force-dynamic";


///// METADATAS DYNAMIQUES /////
export async function generateMetadata({ params }: Props) {
    const product = await getOneProductBySlug(params.slug);
    if (!product) return {};

    return {
        title: `${product.meta.name} | Bougie rituelle naturelle`,
        description: product.meta.intro,
        openGraph: {
            title: product.meta.name,
            description: product.meta.intro,
            url: `https://lumilaya.fr/bougies-rituel/${product.meta.slug}`,
            siteName: "Lumilaya",
            images: [
                {
                    url: `https://lumilaya.fr${product.images?.[0] || ""}`,
                    width: 1200,
                    height: 630,
                    alt: product.meta.name,
                },
            ],
            locale: "fr_FR",
            type: "website",
        },
        alternates: {
            canonical: `https://lumilaya.fr/bougies-rituel/${product.meta.slug}`,
        },
    };
}


///// PAGE PRODUIT /////
async function page({ params }: Props) {

    const { slug } = await params;

    const product = await getOneProductBySlug(slug);
    
    if (!product) return;

    const suggestedProducts = await getSuggestedProduct(product.id);
    
    const reviews = await getReviewById(product.id);


    ///// CALCUL MOYEN DES NOTES /////
    const averageRating = reviews?.length
        ? reviews.reduce((acc, r) => acc + (r.note || 0), 0) / reviews.length
        : undefined;

    ///// JSON-LD RICH SNIPPET /////
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.meta.name,
        description: product.meta.intro,
        image: `https://lumilaya.fr${product.images?.[0] || ""}`,
        sku: product.id,
        brand: {
            "@type": "Brand",
            name: "Lumilaya",
        },
        offers: {
            "@type": "Offer",
            url: `https://lumilaya.fr/bougies-rituel/${product.meta.slug}`,
            priceCurrency: "EUR",
            price: product.variants?.[0]?.price || 0,
            availability: "https://schema.org/InStock",
        },
        aggregateRating: averageRating
            ? {
                  "@type": "AggregateRating",
                  ratingValue: averageRating,
                  reviewCount: reviews.length,
              }
            : undefined,
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 max-w-7xl mx-auto px-6">

             <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />


            <Principal product={product} reviews={reviews} />
            <ProductCar />
            <ProductConseil />
            <Suggest suggestedProducts={suggestedProducts} />
        </div>
        
    )
}

export default page;