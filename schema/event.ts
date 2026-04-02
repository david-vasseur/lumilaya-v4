import { z } from "zod";

export const EventSchema = z.object({
    name: z.string().min(1, "Le nom de l'événement est requis"),
    address: z.string().min(1, "L'adresse est requise"),
    city: z.string().min(1, "La ville est requise"),
    postalCode: z
        .string()
        .length(5, "Le code postal doit faire 5 caractères"),
    dateStart: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "dateStart doit être une date valide",
    }),
    dateEnd: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "dateEnd doit être une date valide",
    }),
    image: z
        .instanceof(File)
        .refine((file) => file.size <= 5_000_000, "Max 5MB")
        .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Format invalide"
        )
        .nullable(),
    url: z.string(),
})

export type IEvent = z.infer<typeof EventSchema>;