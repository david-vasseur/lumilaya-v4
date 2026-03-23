import { IProductTheme, IProductWellness } from "@/types/product";

export function isProductTheme(value: unknown): value is IProductTheme {
	return (
		typeof value === "object" &&
		value !== null &&
		"top" in value &&
		"heart" in value &&
		"base" in value
	);
}

export function isProductWellness(value: unknown): value is IProductWellness {
	return (
		typeof value === "object" &&
		value !== null &&
		"idealFor" in value &&
		"stones" in value
	);
}