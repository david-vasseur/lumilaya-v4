//// FONCTION POUR L'HYBRIDE IMAGE ////
export function getImageUrl(image?: string) {
    if (!image) return "";

    if (image.startsWith("http")) {
        return image;
    }

    return `https://lumilaya.fr${image}`;
}