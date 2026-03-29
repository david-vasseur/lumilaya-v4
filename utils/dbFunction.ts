import { IProductTheme, IProductWellness } from "@/types/product";
import { createHash } from "crypto";

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

export function generateFingerprint() {
	const userAgent = navigator.userAgent;
	const screenSize = `${window.screen.width}x${window.screen.height}`;
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const raw = userAgent + screenSize + timezone;
	const salted = raw + process.env.FINGERPRINT_SALT;
	return createHash('sha256').update(salted).digest('hex');
}