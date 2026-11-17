
import { getImageUrl } from "@/utils/image";
import CoffretDecouverteClient, { ShowcaseSlide } from "./DecouverteClient";
import { prisma } from "@/lib/prisma/prisma";

function getProductRoute(collection: string, slug: string) {
    const col = collection.toLowerCase();
    if (col.includes("coffret")) return `/coffrets-accessoires/${slug}`;
    if (col.includes("terre") || col.includes("ciel")) return `/entre-terre-et-ciel/${slug}`;
    return `/emotion/${slug}`;
}

const DEFAULT_COFFRET_SLIDES: ShowcaseSlide[] = [
    {
        id: "coffret-decouverte",
        title: "Le coffret Découverte",
        description:
            "Offrez une expérience sensorielle complète avec notre coffret découverte : quatre bougies soigneusement sélectionnées pour s'initier en douceur à l'univers Émotions & Plaisirs.",
        bullets: [
            '4 bougies issues de la collection "Émotions & Plaisirs"',
            "Coffret recyclable premium",
            "Livraison soignée, prête à offrir",
        ],
        ctaLabel: "Composez votre coffret",
        ctaHref: "/coffrets-accessoires/coffret-decouverte",
        images: ["/images/landing/coffret.webp", "/images/landing/coffret1.webp"],
    },
    {
        id: "coffret-rituel",
        title: "Le coffret Rituel",
        description:
            "Offrez une expérience sensorielle complète avec notre coffret Rituel.",
        bullets: [
            '1 bougie de la collection "Entre terre & ciel"',
            "1 bouquet de sauge, une carte rituel et 1 sachet d'herbes sacrées",
            "Livraison soignée, prête à offrir",
        ],
        ctaLabel: "Découvrir les coffrets",
        ctaHref: "/coffrets-accessoires",
        images: ["/images/landing/coffret_rit1.webp", "/images/landing/coffret_rit2.webp"],
    },
];

async function fetchPromoProducts() {
    return prisma.product.findMany({
        where: {
            meta: {
                promo: { gt: 0 },
                stock: true,
            },
        },
        include: {
            meta: {
                include: {
                    images: true,
                },
            },
            variants: {
                orderBy: { price: "asc" },
            },
        },
        take: 4,
    });
}

export default async function CoffretDecouverte() {
    let promoProducts: Awaited<ReturnType<typeof fetchPromoProducts>> = [];

    try {
        promoProducts = await fetchPromoProducts();
    } catch {
        promoProducts = [];
    }

    if (promoProducts.length > 0) {
        const promoSlides: ShowcaseSlide[] = promoProducts.map((product) => {
            const discount = product.meta?.promo ?? 0;
            const basePriceCents = product.variants[0]?.price ?? 0;
            const discountedPriceCents = Math.round(basePriceCents * (1 - discount / 100));

            const rawImages = product.meta?.images ?? [];
            const productImages =
                rawImages.length > 0
                    ? rawImages.slice(0, 2).map((img) => getImageUrl(img.url))
                    : ["/images/landing/coffret.webp"];

            return {
                id: product.id,
                title: product.meta?.name ?? "Création en promotion",
                description:
                    product.meta?.intro ??
                    "Profitez d'une remise exclusive sur cette création artisanale Lumi'laya.",
                discountPercent: discount,
                originalPrice:
                    basePriceCents > 0
                        ? `${(basePriceCents / 100).toFixed(2).replace(".", ",")} €`
                        : undefined,
                finalPrice:
                    discountedPriceCents > 0
                        ? `${(discountedPriceCents / 100).toFixed(2).replace(".", ",")} €`
                        : undefined,
                bullets: [
                    `Remise immédiate de -${discount}% appliquée`,
                    "Cire 100% végétale & fabrication artisanale dans le Gard",
                    "Quantités limitées",
                ],
                ctaLabel: "Profiter de l'offre",
                ctaHref: getProductRoute(
                    product.meta?.collection ?? "",
                    product.meta?.slug ?? ""
                ),
                images: productImages,
            };
        });

        return (
            <CoffretDecouverteClient
                mode="promo"
                badge="Offres du moment"
                headingRegular="Nos créations"
                headingScript="à prix doux"
                slides={promoSlides}
            />
        );
    }

    return (
        <CoffretDecouverteClient
            mode="coffret"
            badge="Idée cadeau"
            headingRegular="L'essentiel"
            headingScript="Lumi'laya"
            slides={DEFAULT_COFFRET_SLIDES}
        />
    );
}
