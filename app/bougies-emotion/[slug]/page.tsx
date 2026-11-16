import ProductCar from '@/components/features/product/ProductCar';
import ProductConseil from '@/components/features/product/ProductConseil';
import Principal from '@/components/layout/product_page/Principal';
import Suggest from '@/components/layout/product_page/Suggest';
import { PRODUCT_SEO } from '@/data/SEO';
import { getOneProductBySlug, getSuggestedProduct } from '@/lib/action/product.action';
import { getReviewById } from '@/lib/action/review.action';
import { getImageUrl } from '@/utils/image';
import { unstable_noStore } from 'next/cache';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

/**
 * Génère automatiquement le Title et la Meta Description depuis la BDD
 * (avec fallback optionnel sur PRODUCT_SEO pour les anciens produits)
 */
function getDynamicSeo(
    slug: string,
    product: NonNullable<Awaited<ReturnType<typeof getOneProductBySlug>>>
) {
    // 1. Si le produit existe dans l'ancien fichier PRODUCT_SEO, on peut l'utiliser
    // (Tu peux supprimer ces 4 lignes si tu veux supprimer définitivement le fichier SEO.ts)
    const manualSeo = PRODUCT_SEO?.[slug as keyof typeof PRODUCT_SEO];
    if (manualSeo) {
        return manualSeo;
    }

    const name = product.meta.name.trim();
    const collection = product.meta.collection?.toLowerCase() || "";
    const isCoffret = slug.startsWith("coffret") || name.toLowerCase().includes("coffret");
    const isEnergetique = collection.includes("énerg") || collection.includes("energ") || collection.includes("rituel");

    // 2. Construction intelligente du <title>
    let prefix = "Bougie parfumée naturelle";
    if (isCoffret) {
        prefix = "Coffret bien-être";
    } else if (isEnergetique) {
        prefix = "Bougie énergétique";
    }

    // Évite les doublons si le nom contient déjà le mot "Bougie" ou "Coffret"
    const cleanName = name.replace(/^(bougie|coffret)\s+/i, "");
    const title = `${prefix} ${cleanName} | Lumilaya`;

    // 3. Construction de la <meta name="description"> depuis meta.intro ou description[0]
    const rawDescription =
        product.meta.intro?.trim() ||
        product.description?.[0]?.trim() ||
        product.meta.content?.[0]?.trim() ||
        `${prefix} ${cleanName} fabriquée artisanalement en cire de soja naturelle par Lumilaya.`;

    // Tronque proprement à ~160 caractères pour Google sans couper un mot
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

    const seo = getDynamicSeo(slug, product);
    const mainImage = product.images?.[0] ? getImageUrl(product.images[0]) : "";
    const canonicalUrl = `https://lumilaya.fr/bougies-emotion/${product.meta.slug}`;

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
                          alt: `Bougie artisanale ${product.meta.name} - Lumilaya`,
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

///// FONCTION DE LA PAGE /////
async function page({ params }: Props) {
    const { slug } = await params;
    const product = await getOneProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const seo = getDynamicSeo(slug, product);
    const suggestedProducts = await getSuggestedProduct(product.id);
    const reviews = await getReviewById(product.id);

    ///// RICH SNIPPETS (JSON-LD sécurisé) /////
    const firstVariantPrice = product.variants?.[0]?.price
        ? Number(product.variants[0].price)
        : 0;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `Bougie ${product.meta.name}`,
        description: seo.description,
        category: product.meta.collection || "Bougie naturelle parfumée",
        image: (product.images || []).map(getImageUrl),
        sku: product.id.toString(),
        brand: {
            "@type": "Brand",
            name: "Lumilaya",
        },
        offers: {
            "@type": "Offer",
            url: `https://lumilaya.fr/bougies-emotion/${product.meta.slug}`,
            priceCurrency: "EUR",
            price: firstVariantPrice.toFixed(2),
            availability: product.meta.stock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
        },
        aggregateRating: reviews?.length
            ? {
                  "@type": "AggregateRating",
                  ratingValue: Number(
                      (
                          reviews.reduce((acc, r) => acc + r.note, 0) /
                          reviews.length
                      ).toFixed(1)
                  ),
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
