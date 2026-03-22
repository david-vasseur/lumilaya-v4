import { z } from "zod";

// Schema pour une adresse (livraison ou facturation)
const AddressSchema = z.object({
  address: z.string().min(2, "L'adresse doit contenir au moins 2 caractères"),
  city: z.string().min(2, "La ville doit contenir au moins 2 caractères"),
  postalCode: z
    .string()
    .min(2, "Le code postal doit contenir au moins 2 caractères"),
  country: z.string().min(2, "Le pays doit être renseigné"),
  shipping: z.string().min(2, "Le type de livraison doit être enseigné"),
});

export const CheckoutSchema = z.object({
  // Informations personnelles
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .min(7, "Veuillez entrer un numéro valide")
    .regex(/^\+?[0-9\s\-()]{7,15}$/, "Numéro de téléphone invalide"),

  // Adresse de livraison
  shippingAddress: AddressSchema.shape.address,
  shippingCity: AddressSchema.shape.city,
  shippingPostalCode: AddressSchema.shape.postalCode,
  shippingCountry: AddressSchema.shape.country,
  shippingType: AddressSchema.shape.shipping,

  // Adresse de facturation
  billingAddress: AddressSchema.shape.address,
  billingCity: AddressSchema.shape.city,
  billingPostalCode: AddressSchema.shape.postalCode,
  billingCountry: AddressSchema.shape.country,

  // CGV
  acceptCGV: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions générales de vente",
  }),
});

// Type TypeScript inféré
export type ICheckout = z.infer<typeof CheckoutSchema>;