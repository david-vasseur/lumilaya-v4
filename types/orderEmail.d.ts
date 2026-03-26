import { Decimal } from "@prisma/client/runtime/client";

export type OrderEmailData = {
  id: number;
  stripeSessionId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  total: Decimal;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
};