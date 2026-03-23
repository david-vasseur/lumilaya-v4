import { Prisma } from "../lib/generated/prisma/client.ts";
import { prisma } from "../lib/prisma/prisma.ts";


const products = [
    {
        meta: {
            collection: "Emotion",
            name: "Tendresse",
            slug: "bougie-tendresse",
            intro:
                "Une rencontre délicieusement gourmande entre la douceur sucrée de la praline, la rondeur exotique de la noix de coco et la chaleur réconfortante de la vanille. Confectionnée avec une cire de soja 100 % naturelle et des fragrances de haute qualité, cette bougie diffuse un parfum enveloppant qui invite instantanément à la détente et au plaisir des sens.",
            theme: {
                top: "Praline",
                heart: "Noix de coco",
                base: "Vanille",
            },
            stock: true,
            promo: 0,
            like: 0,
        },
        description: [
            "Dès les premières notes, la praline dévoile sa gourmandise délicate et légèrement caramélisée. La noix de coco apporte ensuite une touche douce et solaire, tandis que la vanille vient sublimer l’ensemble avec sa profondeur chaude et veloutée. L’accord de ces senteurs crée une atmosphère tendre et réconfortante, parfaite pour transformer votre intérieur en un véritable cocon de douceur. Allumer la bougie Tendresse, c’est s’offrir un moment de douceur absolue. La flamme éclaire délicatement la pièce pendant que le parfum gourmand se diffuse peu à peu, créant une ambiance chaleureuse et apaisante.", 
            "Les notes sucrées et crémeuses installent une atmosphère douce et rassurante, comme une parenthèse où l’on se sent enveloppé de bien-être. L’air se parfume d’une gourmandise subtile qui invite à ralentir, à savourer l’instant présent et à profiter d’un intérieur transformé en refuge délicat. Un parfum tendre et réconfortant qui accompagne parfaitement les moments de calme et de sérénité."
        ],
        images: [
            "/images/products/tendresse.webp",
            "/images/products/tendresse2.webp",
            "/images/products/tendresse3.webp",
            "/images/products/tendresse4.webp",
        ],
        variants: [
            {
                name: "Bougie Tendresse 150g",
                duration: 25,
                weight: 150,
                price: 19.9,
            },
        ],
        tags: [
            "lait", 
            "praline", 
            "coco", 
            "beurre", 
            "vanille"
        ]
    },

    {
        meta: {
            collection: "Emotion",
            name: "Vitalité",
            slug: "bougie-vitalite",
            intro:
                "Une rencontre pétillante entre la fraîcheur vive du citron vert et l’énergie chaleureuse du gingembre. Confectionnée avec une cire de soja 100 % naturelle et des fragrances de haute qualité, cette bougie diffuse un parfum tonique et lumineux qui éveille les sens et dynamise l’atmosphère de votre intérieur.",
            theme: {
                top: "Citron vert",
                heart: "Cardamome",
                base: "Gingembre",
            },
            stock: true,
            promo: 0,
            like: 0,
        },
        description: [
           "Dès les premières notes, le citron vert libère une fraîcheur acidulée et vibrante, apportant une sensation immédiate de légèreté et de clarté. Le gingembre vient ensuite révéler son caractère légèrement épicé et stimulant, créant un équilibre subtil entre fraîcheur et chaleur. L’ensemble compose un parfum vivifiant et moderne, idéal pour insuffler une belle énergie et réveiller l’ambiance de votre espace de vie.", 
            "Allumer la bougie Vitalité, c’est inviter une vague de fraîcheur et d’énergie dans son quotidien. La flamme éclaire doucement la pièce tandis que les notes citronnées et épicées se diffusent progressivement, apportant une sensation de dynamisme et de renouveau.Le parfum évoque un moment où l’on retrouve de l’élan, de la clarté et une belle sensation de légèreté. L’accord vif et stimulant crée une atmosphère inspirante, parfaite pour accompagner un moment de créativité, de concentration ou simplement pour donner un nouveau souffle à votre intérieur. Une invitation à réveiller les sens et à profiter pleinement d’une ambiance lumineuse et revitalisante."
        ],
        images: [
            "/images/products/vitalite.webp",
            "/images/products/vitalite1.webp",
            "/images/products/vitalite2.webp",
            "/images/products/vitalite3.webp",
        ],
        variants: [
            {
                name: "Bougie Vitalité 150g",
                duration: 25,
                weight: 150,
                price: 19.9,
            },
        ],
        tags: [
            "citron vert",
            "pamplemousse",
            "verveine",
            "eucalyptus",
            "gingembre",
            "cardamome",
            "vanille",
        ]
    },

    {
        meta:{
            collection:"Emotion",
            name:"Douceur",
            slug:"bougie-douceur",
            intro: "Une rencontre délicate entre la pureté aérienne de la fleur de coton, la douceur enveloppante du musc et la grâce florale de la fleur de lotus. Confectionnée avec une cire de soja 100 % naturelle et des fragrances de haute qualité, cette bougie diffuse un parfum tendre et apaisant qui transforme instantanément l’atmosphère de votre intérieur.",
            theme: {
                top: "Fleur de coton",
                heart: "Fleur de lotus",
                base: "Musc"
            },
            stock:true,
            promo:0,
            like:0
        },
        description:[
            "Dès les premières notes, la fleur de coton dévoile sa fraîcheur douce et lumineuse, évoquant la sensation réconfortante d’un linge propre et léger. Le musc vient ensuite apporter une touche subtilement poudrée et chaleureuse, tandis que la fleur de lotus révèle une élégance florale délicate. L’ensemble crée une harmonie douce et raffinée, idéale pour instaurer une ambiance paisible et sereine dans votre espace de vie.", 
            "Allumer la bougie Douceur, c’est s’offrir un instant de calme et de légèreté. La flamme diffuse une lumière apaisante tandis que le parfum se déploie lentement dans la pièce, créant une atmosphère pure et enveloppante.Peu à peu, l’air se remplit de notes délicates qui invitent à ralentir et à savourer l’instant présent. Le parfum évoque une sensation de cocon, un moment simple où l’on se sent profondément apaisé. Votre intérieur se transforme alors en un refuge de tranquillité, un espace doux et lumineux où le corps se relâche et où l’esprit retrouve sa sérénité."
        ],
        images:[
            "/images/products/douceur.webp",
            "/images/products/douceur2.webp",
            "/images/products/douceur3.webp",
            "/images/products/douceur4.webp"
        ],
        variants:[
            { name:"Bougie Douceur 150g",duration:25, weight:150, price:19.9 }
        ],
        tags: [
            "lotus",
            "seringa",
            "coton",
            "mimosa",
            "iris",
            "vanille",
            "santal",
            "musc"
        ]
    },

    {
        meta:{
            collection:"Emotion",
            name:"Magie",
            slug:"bougie-magie",
            intro: "Une rencontre délicieusement gourmande entre la chaleur épicée de la cannelle, la douceur fondante du caramel et la tendresse enveloppante de la vanille. Confectionnée avec une cire de soja 100 % naturelle et des fragrances de haute qualité, cette bougie diffuse un parfum chaleureux qui transforme instantanément l’atmosphère de votre intérieur.",
            theme: {
                top: "Caramel",
                heart: "Cannelle",
                base: "Vanille"
            },
            stock:true,
            promo:0,
            like:0
        },
        description:[
            "Dès les premières notes, la cannelle éveille les sens avec son caractère épicé et réconfortant. Le caramel apporte ensuite une touche sucrée et veloutée, tandis que la vanille vient adoucir l’ensemble avec sa rondeur délicate. L’harmonie de ces senteurs crée une ambiance gourmande et rassurante, comme un moment de douceur que l’on s’offre pour se sentir pleinement bien chez soi.", 
            "Allumer la bougie Magie, c’est ouvrir la porte à un univers chaleureux et enveloppant. La flamme danse doucement tandis que les notes sucrées et épicées se diffusent subtilement dans la pièce, créant une atmosphère douce et réconfortante.Le parfum rappelle ces instants simples et précieux où l’on se laisse porter par une sensation de bien-être : une soirée tranquille, un moment pour soi, ou le plaisir d’un intérieur qui devient un véritable cocon. La chaleur gourmande des accords parfumés installe une ambiance apaisante et conviviale, invitant naturellement à ralentir et à savourer l’instant présent. "
        ],
        images:[
            "/images/products/magie.webp",
            "/images/products/magie2.webp",
            "/images/products/magie3.webp",
            "/images/products/magie4.webp"
        ],
        variants:[
            { name:"Bougie Magie 150g", duration:25, weight:150, price:19.9 }
        ],
        tags: [
            "muscade",
            "gingembre",
            "orange",
            "pomme",
            "cannelle",
            "anis",
            "miel",
            "caramel",
            "lait"
        ]
    },

    {
        meta:{
            collection:"Emotion",
            name:"Harmonie",
            slug:"bougie-harmonie",
            intro:"Une rencontre subtile entre la fraîcheur lumineuse de la bergamote et la profondeur boisée du vétiver. Confectionnée avec une cire de soja 100 % naturelle et des fragrances de haute qualité, cette bougie diffuse un parfum élégant et équilibré qui invite naturellement à la détente.",
            theme: {
                top: "Bergamote",
                heart: "Freesia",
                base: "Vétiver"
            },
            stock:true,
            promo:0,
            like:0
        },
        description:[
            "Dès les premières notes, la bergamote apporte une sensation de fraîcheur vive et délicate, comme un souffle léger qui éclaire l’atmosphère. Peu à peu, le vétiver révèle ses accents boisés et apaisants, apportant profondeur et stabilité à la composition. L’alliance de ces deux notes crée un parfum harmonieux, à la fois rafraîchissant et réconfortant, idéal pour instaurer une ambiance sereine et équilibrée dans votre intérieur.", 
            "Allumer la bougie Harmonie, c’est créer un espace où tout semble s’apaiser naturellement. La flamme diffuse une lumière douce tandis que les notes fraîches et boisées se déploient délicatement dans la pièce. Le parfum installe une atmosphère claire et apaisante, propice au calme et à la présence à soi. La vivacité de la bergamote apporte une touche lumineuse, tandis que le vétiver ancre l’ambiance dans une douceur chaleureuse et enveloppante. Peu à peu, votre intérieur se transforme en un véritable refuge de tranquillité, un lieu où l’on respire plus profondément et où l’esprit retrouve son équilibre."
        ],
        images:[
            "/images/products/harmonie.webp",
            "/images/products/harmonie2.webp",
            "/images/products/harmonie3.webp",
            "/images/products/harmonie4.webp"
        ],
        variants:[
            { name: "Bougie Harmonie 150g", duration: 25, weight: 150, price: 19.9 }
        ],
        tags: [
            "bergamote",
            "verveine",
            "citron",
            "musc",
            "orange",
            "gingembre",
            "cannelle",
            "patchouli",
            "menthe"
        ]
    },

    {
        meta:{
            collection:"Terre",
            name:"Ancrage",
            slug:"bougie-ancrage",
            intro:"Ancrage est une invitation à revenir dans son corps. À s’enraciner profondément. À se sentir solide, stable et en sécurité. Chaque flamme devient un point d’appui. Un espace où l’on retrouve sa force intérieure, où la confiance reprend sa place, et où les nouveaux départs se construisent sur des bases solides.",
            theme: {
                top: "Encens",
                heart: "Cèdre",
                base: "Bois de santal & musc"
            },
            stock:true,
            promo:0,
            like:0
        },
        description:[
            "Ancrage est une invitation à revenir dans son corps.",
            "Chaque flamme devient un point d'appui pour retrouver sa force intérieure."
        ],
        images:[
            "/images/products/ancrage.webp",
            "/images/products/ancrage2.webp",
            "/images/products/ancrage3.webp",
            "/images/products/ancrage4.webp",
            "/images/products/ancrage5.webp"
        ],
        variants:[
            { name:"Bougie Ancrage 200g", duration:30, weight: 200, price:32 }
        ],

        wellness:{
            idealFor:[
                "Vous ressentez un manque de stabilité",
                "Vous souhaitez renforcer votre confiance",
                "Vous traversez un nouveau départ"
            ],
            stones:[
                {
                    name:"Jaspe Rouge",
                    benefits:[
                        "Renforce la confiance en soi",
                        "Apporte courage et détermination",
                        "Stabilise les émotions"
                    ]
                },
                {
                    name:"Obsidienne Noire",
                    benefits:[
                        "Favorise l'enracinement profond",
                        "Aide à libérer les peurs",
                        "Apporte lucidité"
                    ]
                }
            ]
        },
        tags: [
            "citron",
            "citron vert",
            "encens",
            "cèdre",
            "santal",
            "vanille",
            "musc",
            "tonka"
        ]
    },

    {
        meta:{
            collection:"Terre",
            name:"Introspection",
            slug:"bougie-introspection",
            intro:"Introspection est une invitation à ralentir. À revenir à soi. À écouter ce qui murmure à l’intérieur. Chaque flamme devient un espace de silence. Un moment suspendu pour observer ses émotions, clarifier ses pensées, et se reconnecter à son intuition.",
            theme: {
                top: "Citron",
                heart: "Magnolia",
                base: "Cèdre & musc"
            },
            stock:true,
            promo:0,
            like:0
        },
        description:[
            "Une bougie conçue pour accompagner les moments de réflexion.",
            "Sa flamme devient un point d'ancrage pour observer ses émotions."
        ],
        images:[
            "/images/products/introspection.webp",
            "/images/products/introspection2.webp",
            "/images/products/introspection3.webp",
            "/images/products/introspection4.webp"
        ],
        variants:[
            { name:"Bougie Introspection 200g", duration:30, weight: 200, price:32 }
        ],
        wellness:{
            idealFor:[
                "Vous ressentez un manque de stabilité",
                "Vous souhaitez renforcer votre confiance",
                "Vous traversez un nouveau départ"
            ],

            stones:[
                {
                    name:"Jaspe Rouge",
                    benefits:[
                        "Renforce la confiance en soi",
                        "Apporte courage et détermination",
                        "Stabilise les émotions"
                    ]
                },
                {
                    name:"Obsidienne Noire",
                    benefits:[
                        "Favorise l'enracinement profond",
                        "Aide à libérer les peurs",
                        "Apporte lucidité"
                    ]
                }
            ] 
        },
        tags: [
            "bergamote",
            "citron",
            "iris",
            "magnolia",
            "cèdre",
            "musc",
            "maté"
        ]
    },

    {
        meta: {
            collection: "Terre",
            name: "Protection",
            slug: "bougie-protection",
            intro: "Protection est une invitation à vous recentrer. À purifier votre espace. À vous sentir en sécurité. Chaque flamme devient un bouclier doux, un espace sacré où les énergies lourdes se dissipent, où l’agitation extérieure s’apaise et où la sérénité retrouve sa place. Ce n'est pas seulement une bougie. C'est un cocon énergétique.",
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
            "/images/products/protection.webp",
            "/images/products/protection2.webp",
            "/images/products/protection3.webp",
            "/images/products/protection4.webp",
            "/images/products/protection5.webp"
        ],
        variants: [
            { name: "Bougie Protection 200g", duration: 30, weight:200, price: 32 }
        ],
        wellness: {
            idealFor: [
                "Vous ressentez des énergies lourdes autour de vous",
                "Vous avez besoin de purifier votre intérieur",
                "Vous souhaitez renforcer votre protection énergétique",
                "Vous traversez une période stressante",
                "Vous aspirez à plus de sérénité et de stabilité",
                "Vous voulez créer un cocon protecteur chez vous"
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

    {
        meta: {
            collection: "Terre",
            name: "Libération",
            slug: "bougie-liberation",
            intro: "Libération est une invitation à déposer ce qui pèse. À laisser partir l'ancien. À desserrer les tensions invisibles. Chaque flamme devient un passage, un espace sacré où l'on relâche les blocages et où l'on se réaligne avec son cœur. Ce n'est pas seulement une bougie. C'est un moment pour respirer, ressentir et se libérer.",
            theme: {
                top: "Fleur de lotus",
                heart: "Bergamotte & jasmin",
                base: "Bois de santal & musc"
            },
            stock: true,
            promo: 0,
            like: 0,
        },
        description: [
            "La bougie Libération a été créée comme un outil d'accompagnement émotionnel, pour celles qui ressentent le besoin de déposer ce qui pèse, de laisser partir l'ancien et de se réaligner avec leur vérité intérieure. Elle invite à ralentir, à respirer et à créer un espace sacré de lâcher-prise. Allumée en conscience, sa flamme devient un point d'ancrage pour libérer les tensions émotionnelles, apaiser le cœur et accueillir un nouveau souffle."
        ],
        images: [
            "/images/products/liberation.webp",
            "/images/products/liberation2.webp",
            "/images/products/liberation3.webp",
            "/images/products/liberation4.webp",
            "/images/products/liberation5.webp"
        ],
        variants: [
            { name: "Bougie Libération 200g", duration: 30, weight: 200, price: 32 }
        ],
        wellness: {
            idealFor: [
                "Vous ressentez un trop-plein émotionnel",
                "Vous avez besoin de lâcher prise sur une situation ou une période de vie",
                "Vous souhaitez libérer des blocages émotionnels",
                "Vous traversez une phase de transition ou de transformation",
                "Vous cherchez à vous réaligner avec vous-même",
                "Vous aspirez à un rituel doux pour retrouver apaisement et clarté intérieure"
            ],
            stones: [
                {
                    name: "Pierre de Lune",
                    benefits: [
                        "Favorise l’intuition et l’écoute intérieure",
                        "Apaise les émotions instables",
                        "Accompagne les cycles de transformation",
                        "Soutient les périodes de transition"
                    ]
                },
                {
                    name: "Quartz Rose",
                    benefits: [
                        "Pierre du cœur et de l’amour de soi",
                        "Aide à libérer les blessures émotionnelles",
                        "Apporte douceur, réconfort et sécurité affective",
                        "Encourage le pardon et l’apaisement"
                    ]
                }
            ]
        },//TAGS : bergamote, rose, jasmin, muguet, iris, santal, musc
        tags: [
            "bergamote",
            "rose",
            "jasmin",
            "muguet",
            "iris",
            "santal",
            "musc"
        ]
    }

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