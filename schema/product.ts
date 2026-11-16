import { z } from "zod";

const wellnessSchema = z
    .object({
        stones: z
            .array(
                z.object({
                    name: z.string(),
                    benefits: z.array(z.string()),
                })
            )
            .optional(),
        idealFor: z.array(z.string()).optional(),
    })
    .optional();

export const ProductSchema = z.object({
    description: z
        .array(z.string().min(1, "Le paragraphe ne peut pas être vide"))
        .min(1, "Au moins un paragraphe de description est requis"),

    images: z
        .array(z.instanceof(File))
        .min(1, "Au moins une image est requise"),

    wellness: wellnessSchema,

    meta: z.object({
        collection: z.string().min(1, "La collection est requise"),

        name: z.string().min(1, "Le nom est requis"),

        slug: z.string().min(1, "Le slug est requis"),

        intro: z.string().min(1, "L'introduction est requise"),

        // z.string() simple : accepte "" sans créer de décalage input/output dans TanStack Form
        theme: z.object({
            top: z.string(),
            heart: z.string(),
            base: z.string(),
        }),

        content: z.array(z.string()).optional(),

        stock: z.boolean(),

        promo: z.number().min(0).max(100).optional(),

        like: z.number().min(0).optional(),
    }),

    variants: z
        .array(
            z.object({
                name: z.string().min(1, "Le nom du format est requis"),
                duration: z.number().min(0, "La durée ne peut pas être négative"),
                weight: z.number().min(0, "Le poids ne peut pas être négatif"),
                price: z.number().positive("Le prix doit être supérieur à 0 €"),
            })
        )
        .min(1, "Au moins un format est requis"),

    tags: z.array(z.string()),
});

export type IProduct = z.infer<typeof ProductSchema>;
