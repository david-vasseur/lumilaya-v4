"use server"


import { shippingPrices } from "@/data/product";
import { prisma } from "../prisma/prisma";

type PricePerProduct = {
	productId: number;
	variantId: number;
	price: number; // prix unitaire avec promo appliquée
	qty: number;
};

type CustomerInfo = {
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	shippingAddress: string;
	shippingCity: string;
	shippingPostalCode: string;
	shippingCountry: string;
	billingAddress: string;
	billingCity: string;
	billingPostalCode: string;
	billingCountry: string;
	acceptCGV: boolean;
};

type ServerItem = {
	productId: number;
	variantId: number;
	qty: number;
	name: string;
};

////////////////////// OBTENIR PRIX DE LIVRAISON ///////////////////////////

export const getShippingPrice = async (zone: string, type: "OFF" | "DOM" | "REL") => {
	
		const price = await prisma.shippingPrice.findFirst({
			where: {
				zone: zone,
				shippingType: type
			}
		})

		return Number(price?.price) ?? 0;
}

