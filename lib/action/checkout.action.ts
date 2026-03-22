"use client" // #TODO A CHANGER


import { shippingPrices } from "@/data/product";

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

export const getShippingPrice = (zone: string, type: string) => {
	if (process.env.NODE_ENV === "development") {
		const price = shippingPrices.find((element) => element.zone === zone && element.shippingType === type);
		return price?.price
	} else {
		return
	}
}

