export interface INavItem {
    label: string,
    href: string
}

export const items: INavItem[] = [
    { label: "Accueil", href: "/" },
    { label: "Notre histoire", href: "/notre-histoire" },
    { label: "Bougies Emotions & Plaisirs", href: "/bougies-emotion" },
    { label: "Bougies Entre Terre & Ciel", href: "/bougies-rituel" },
    { label: "Mes favoris", href: "/favoris" },
    { label: "Nous contacter", href: "/contact" },
]