import { z } from "zod";

export const ReviewSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom est trop long"),

  productId: z
    .number()
    .min(1, "L'id du produit est requis"),

  comment: z
    .string()
    .min(5, "Le commentaire doit contenir au moins 5 caractères")
    .max(500, "Le commentaire est trop long"),

  note: z
    .number()
    .int("La note doit être un nombre entier")
    .min(1, "La note minimum est 1")
    .max(5, "La note maximum est 5"),
});

export type IReview = z.infer<typeof ReviewSchema>;