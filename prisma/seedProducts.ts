import { Prisma } from "../lib/generated/prisma/client.ts";
import { prisma } from "../lib/prisma/prisma.ts";


const products = [
    {
        meta: {
            collection: "Coffret",
            name: "Coffret Protection",
            slug: "coffret-protection",
            intro: "Ce coffret a été imaginé comme un véritable moment pour soi… Un rituel simple et accessible pour nettoyer les énergies, se recentrer et retrouver un sentiment de sécurité intérieure. Chaque élément a été choisi avec soin pour vous accompagner dans un espace de calme, de présence et de protection",
            theme: {
                top: "Cannelle",
                heart: "Cèdre & patchouli",
                base: "Bois de santal"
            },
            stock: true,
            promo: 0,
            like: 0,
        },
        description: [
            "La bougie Protection a été créée comme un véritable soutien énergétique pour celles qui ressentent le besoin de purifier leur espace, de se protéger des énergies négatives et de retrouver un sentiment de paix intérieure. Allumée en conscience, sa flamme devient un point d'ancrage sécurisant. Elle accompagne les moments de fatigue émotionnelle, les périodes de tension ou simplement le besoin de se sentir protégée dans son environnement."
        ],
        images: [
            "/images/landing/coffret_rit1.webp",
            "/images/landing/coffret_rit2.webp",
            "/images/products/protection3.webp",
            "/images/products/protection4.webp",
            "/images/products/protection5.webp"
        ],
        variants: [
            { name: "Coffret Rituel Protection", duration: 30, weight:250, price: 40 }
        ],
        wellness: {
            idealFor: [
                "Vous ressentez le besoin de vous protéger énergétiquement",
                "Vous souhaitez purifier votre intérieur ou votre espace de vie",
                "Vous traversez une période de changement ou de fatigue émotionnelle",
                "Vous avez envie de vous offrir un moment de recentrage et de calme",
                "Vous êtes attiré(e) par les rituels simples et naturels"
            ],
            stones: [
                {
                    name: "Tourmaline noire",
                    benefits: [
                        "Absorbe les énergies négatives",
                        "Favorise l’ancrage",
                        "Protège et stabilise"
                    ]
                },
                {
                    name: "Œil de Tigre",
                    benefits: [
                        "Repousse les influences négatives",
                        "Renforce la confiance",
                        "Apporte force et équilibre émotionnel"
                    ]
                }
            ]
        },
        tags: [
            "cardamome",
            "patchouli",
            "cèdre",
            "iris",
            "santal",
            "musc",
            "ambre"
        ]
    },

];

async function main() {
    for (const p of products) {
        await prisma.product.create({
        data: {
            description: p.description,
            images: p.images,

            meta: {
            create: {
                collection: p.meta.collection,
                name: p.meta.name,
                slug: p.meta.slug,
                intro: p.meta.intro,
                theme: p.meta.theme,
                stock: p.meta.stock,
                promo: p.meta.promo,
                like: p.meta.like,
            },
            },

            variants: {
            create: p.variants.map((v) => ({
                name: v.name,
                duration: v.duration,
                weight: v.weight,
                price: new Prisma.Decimal(v.price),
            })),
            },

            tags: {
            connectOrCreate: p.tags.map((tag) => ({
                where: { name: tag },
                create: { name: tag },
            })),
            },
            wellness: p.wellness ? p.wellness : undefined,
        },
        });
    }

    console.log("🌱 Seed terminé !");
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
});