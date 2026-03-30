import { ShippingStatus } from "@/lib/generated/prisma/enums";
import { z } from "zod";

export const ShippingSchema = z.object({
  shippingStatus: z.nativeEnum(ShippingStatus)
})

export type IShipping = z.infer<typeof ShippingSchema>;