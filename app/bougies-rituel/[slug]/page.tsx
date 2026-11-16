import ProductCar from '@/components/features/product/ProductCar';
import ProductConseil from '@/components/features/product/ProductConseil';
import Principal from '@/components/layout/product_page/Principal';
import Suggest from '@/components/layout/product_page/Suggest';
import { getOneProductBySlug, getSuggestedProduct } from '@/lib/action/product.action';
import { getReviewById } from '@/lib/action/review.action';
import { unstable_noStore } from 'next/cache';
import { PRODUCT_SEO } from '@/data/SEO';
import { getImageUrl } from '@/utils/image';
import { notFound } from 'next/navigation';

///// ON TYPE LE PARAMS /////
interface Props {
    params: Promise<{ slug: string }>;
}

///// ON FORCE LE SSR /////
export const dynamic = "force-dynamic";

/**
 * Génère automatiquement le Title et la Meta Description depuis la BDD
 * pour la collection Bougies Rituel & Énergétiques
 */
function getDynamicRituelSeo(
    slug: string,
    product: NonNullable<Awaited<ReturnType<typeof getOneProductBySlug>>>
) {
    // 1. Priorité aux textes manuels existants dans PRODUCT_SEO (optionnel)
    const manualSeo = PRODUCT_SEO?.[slug as keyof typeof PRODUCT_SEO];
    if (manualSeo) {
        return manualSeo;
    }

    const name = product.meta.name.trim();
    const isCoffret = slug.startsWith("coffret") || name.toLowerCase().includes("coffret");

    // 2. Construction intelligente du <title> adaptée à la collection Rituel
    const prefix = isCoffret ? "Coffret rituel" : "Bougie énergétique";
    const cleanName = name.replace(/^(bougie|coffret(\s+rituel)?)\s+/i, "");
    const title = `${prefix} ${cleanName} | Lumilaya`;

    // 3. Construction de la <meta name="description"> depuis la BDD
    const rawDescription =
        product.meta.intro?.trim() ||
        product.description?.[0]?.trim() ||
        product.meta.content?.[0]?.trim() ||
        `${prefix} ${cleanName} avec pierres naturelles, fabriquée artisanalement en cire de soja par Lumilaya.`;

    const description =
        rawDescription.length > 160
            ? `${rawDescription.slice(0, 157).replace(/\s+\S*$/, "")}...`
            : rawDescription;

    return { title, description };
}

///// METADATAS DYNAMIQUES /////
export async function generateMetadata({ params }: Props) {
    unstable_noStore();

    const { slug } = await params;
    const product = await getOneProductBySlug(slug);

    if (!product) return {};

    const seo = getDynamicRituelSeo(slug, product);
    const mainImage = product.images?.[0] ? getImageUrl(product.images[0]) : "";
    const canonicalUrl = `https://lumilaya.fr/bougies-rituel/${product.meta.slug}`;

    return {
        title: seo.title,
        description: seo.description,
        openGraph: {
            title: seo.title,
            description: seo.description,
            url: canonicalUrl,
            siteName: "Lumilaya",
            images: mainImage
                ? [
                      {
                          url: mainImage,
                          width: 1200,
                          height: 630,
                          alt: `Bougie énergétique ${product.meta.name} - Lumilaya`,
                      },
                  ]
                : [],
            locale: "fr_FR",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: seo.title,
            description: seo.description,
            images: mainImage ? [mainImage] : [],
        },
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

///// PAGE PRODUIT /////
async function page({ params }: Props) {
    const { slug } = await params;
    const product = await getOneProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const seo = getDynamicRituelSeo(slug, product);
    const suggestedProducts = await getSuggestedProduct(product.id);
    const reviews = await getReviewById(product.id);

    ///// CALCUL MOYEN DES NOTES /////
    const averageRating = reviews?.length
        ? Number(
              (
                  reviews.reduce((acc, r) => acc + (r.note || 0), 0) /
                  reviews.length
              ).toFixed(1)
          )
        : undefined;

    const firstVariantPrice = product.variants?.[0]?.price
        ? Number(product.variants[0].price)
        : 0;

    ///// JSON-LD RICH SNIPPET /////
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.meta.name.toLowerCase().includes("coffret")
            ? product.meta.name
            : `Bougie ${product.meta.name}`,
        description: seo.description,
        category: "Bougie énergétique",
        image: (product.images || []).map(getImageUrl),
        sku: product.id.toString(),
        brand: {
            "@type": "Brand",
            name: "Lumilaya",
        },
        offers: {
            "@type": "Offer",
            url: `https://lumilaya.fr/bougies-rituel/${product.meta.slug}`,
            priceCurrency: "EUR",
            price: firstVariantPrice.toFixed(2),
            availability: product.meta.stock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
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
    );
}

export default page;
