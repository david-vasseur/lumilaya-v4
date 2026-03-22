"use server"

import { prisma } from "@/lib/prisma/prisma";
import { ProductCardProps } from "@/components/ui/ProductCard";
import { products } from "@/data/product";

/////// ACTION POUR RECUPERER TOUS LES PRODUITS D'UNE COLLECTION //////////////////

// export const getProductsByCollection = async (collection: string) => {
	
// 	const products: Array<{
// 		images: string[]
// 		variants: { price: number; duration: number }[]
// 		meta: { slug: string; collection: string; name: string; intro: string }
// 	}> = await prisma.product.findMany({
// 		where: {
// 			meta: {
// 				collection: collection
// 			}
// 		},
// 		select: { 
// 			images: true,
// 			variants: {
// 				select: { price: true, duration: true },
// 				orderBy: { price: 'asc' },
// 				take: 1
// 			},
// 			meta: {
// 				select: { slug: true, collection: true, name: true, intro: true }
// 			}
// 		}
// 	})

// 	const cards: ProductCardProps[] = products.map(p => ({
// 		slug: p.meta.slug,
// 		collection: p.meta.collection,
// 		image: p.images[0],                   
// 		name: p.meta.name,
// 		intro: p.meta.intro,
// 		duration: `${p.variants[0]?.duration}`,
// 		price: p.variants[0]?.price ?? 0
// 	}))

// 	return cards;
// }

/////// ACTION POUR RECUPERER UN PRODUIT //////////////////

export const getOneProductBySlug = async (slug: string) => {
	
	const product = await prisma.product.findFirst({
		where: {
			meta: {
				slug: slug
			}
		},
		include: {
			meta: true,
			variants: true
		}
	})

	return product;
}

/////// ACTION POUR RECUPERER LES SUGGESTIONS D'UN PRODUIT ////////////////// #TODO

export const getSuggestedProduct = async (id: number) => {

	const products = await prisma.product.findMany({
		where: {

		}
	})

}

/////// ACTION POUR RECUPERER LES PRIX DU PANIER DEPUIS LE SERVEUR //////////////////

// export async function getPrices(items) {
// 	if (process.env.NODE_ENV === "development") {
		
// 	} else {
// 		return
// 	}
// }