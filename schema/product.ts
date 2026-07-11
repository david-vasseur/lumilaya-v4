import { z } from "zod";

const wellnessSchema = z.union([
    z.object({
        stones: z.array(
            z.object({
                name: z.string(),
                benefits: z.array(z.string())
            })
        ),
        idealFor: z.array(z.string())
    }),
    z.object({})
]);


export const ProductSchema = z.object({

    description: z
        .array(z.string())
        .min(1, "Une description est requise"),


    images: z
        .array(z.instanceof(File))
        .min(1, "Au moins une image est requise"),


    wellness: wellnessSchema.optional(),


    meta: z.object({

        collection: z.string()
            .min(1, "La collection est requise"),

        name: z.string()
            .min(1, "Le nom est requis"),

        slug: z.string()
            .min(1, "Le slug est requis"),

        intro: z.string()
            .min(1, "L'introduction est requise"),

        theme: z.object({

            top: z.string()
                .min(1, "Note de tête requise"),

            heart: z.string()
                .min(1, "Note de coeur requise"),

            base: z.string()
                .min(1, "Note de fond requise"),

        }),

        content: z.array(z.string()).optional(),

        stock: z.boolean(),

        promo: z.number()
            .optional(),

        like: z.number()
            .optional(),

    }),


    variants: z.array(
        z.object({
            name: z.string().min(1),
            duration: z.number().positive(),
            weight: z.number().positive(),
            price: z.number().positive(),
        })
    )
    .min(1, "Au moins un format est requis"),


    tags: z.array(z.string())

});


export type IProduct = z.infer<typeof ProductSchema>;