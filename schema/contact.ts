import { z } from "zod";

export const ContactSchema = z.object({
    name: z
        .string()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .max(50, "Le nom est trop long"),

    email: z
        .string().email("Email invalide"),

    comment: z
        .string()
        .min(5, "Le commentaire doit contenir au moins 5 caractères")
        .max(500, "Le commentaire est trop long"),
});

export type IContact = z.infer<typeof ContactSchema>;