"use server"

import { prisma } from "@/lib/prisma/prisma";
import { ProductCardProps } from "@/components/ui/ProductCard";
import { IProduct, IProductTheme } from "@/types/product";
import { isProductTheme, isProductWellness } from "@/utils/dbFunction";

/////// ACTION POUR RECUPERER TOUS LES PRODUITS D'UNE COLLECTION //////////////////

export const getProductsByCollection = async (collection: string) => {
	
	const products = await prisma.product.findMany({
		where: {
			meta: {
				collection: collection
			}
		},
		select: { 
			images: true,
			variants: {
				select: { price: true, duration: true },
				orderBy: { price: 'asc' },
				take: 1
			},
			meta: {
				select: { slug: true, collection: true, name: true, intro: true }
			}
		}
	})

	const cards = products.map(p => ({
		slug: p.meta.slug,
		collection: p.meta.collection,
		image: p.images[0],                   
		name: p.meta.name,
		intro: p.meta.intro,
		duration: `${p.variants[0]?.duration}`,
		price: Number(p.variants[0]?.price) ?? 0
	}))

	return cards;
}



/////// ACTION POUR RECUPERER UN PRODUIT //////////////////

export const getOneProductBySlug = async (slug: string): Promise<IProduct | null> => {
	const product = await prisma.product.findFirst({
		where: {
			meta: {
				slug: slug
			}
		},
		include: {
			meta: true,
			variants: true,
		}
	})

	if (!product) return null;

	const theme = isProductTheme(product.meta.theme)
		? product.meta.theme
		: null; 

	const wellness = isProductWellness(product.wellness)
		? product.wellness
		: undefined;

	return {
		...product,
		meta: {
			...product.meta,
			theme,
			promo: product.meta.promo ?? undefined,
			like: product.meta.like ?? undefined
		},
		variants: product.variants.map(v => ({
			...v,
			price: v.price.toNumber()
		})),
		wellness
	};
};

/////// ACTION POUR RECUPERER LES SUGGESTIONS D'UN PRODUIT ////////////////// 

export const getSuggestedProduct = async (id: number) => {

	const currentProduct = await prisma.product.findUnique({
		where: { id },
		include: {
			tags: true,
		},
	});

	if (!currentProduct) return [];

	const tagIds = currentProduct.tags.map(tag => tag.id);

	const suggestedProducts = await prisma.product.findMany({
		where: {
			id: { not: id },
			tags: {
				some: {
					id: { in: tagIds }
				}
			}
		},
		take: 3,
		orderBy: {
			createdAt: 'desc' 
		},
		select: {
			id: true,
			images: true,
			meta: {
				select: {
					collection: true,
					name: true,
					slug: true,
				}
			},
			variants: {
				select: {
					id: true,
					name: true,
					duration: true,
					price: true,
				}
			}
		}
	});

	return suggestedProducts.map(p => ({
		id: p.id,
		collection: p.meta.collection,
		name: p.meta.name,
		slug: p.meta.slug,
		image: p.images[0], 
		variants: p.variants.map(v => ({
			...v,
			price: v.price.toNumber()
		}))
	}));
};

/////// ACTION POUR RECUPERER LES PRODUITS FAVORIS VIA UNE LISTE D'ID //////////////////

// export async function getFavoriteProductsByIds(ids) {
// }