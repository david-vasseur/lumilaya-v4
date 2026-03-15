export interface ICaracteristique {
    composition: string;
    meche: string;
    parfum: string;
    combustion: string;
    poids: string;
    contenant: string;
    fabrication: string;
}

export interface IStone {
  name: string;
  benefits: string[];
}

export interface IProductWellness {
  idealFor: string[];
  stones: IStone[];
}

export interface IVariant {
    id: number;
    name: string;
    duration: string;
    price: number;
}

export interface IProductMeta {
    id: number;
    collection: string;
    name: string;
    slug: string;
    intro: string;
    theme: string[];
    createdAt: Date;
    stock: boolean;
    promo?: number;
    like?: number;
}

export interface IProductDescription {
    description: string[] | null;
}

export interface IProductImages {
    images: string[];
}

export interface IProduct {
    meta: IProductMeta;
    description: IProductDescription;
    images: IProductImages;
    caracteristique: ICaracteristique;
    variants: IVariant[];
    wellness?: IProductWellness;
}