export interface IStone {
  name: string
  benefits: string[]
}

export interface IProductWellness {
  idealFor: string[]
  stones: IStone[]
}

export interface IVariant {
  id: number
  name: string
  duration: number
  weight: number
  price: number
}

export interface IProductTheme {
  top: string
  heart: string
  base: string
}

export interface IProductMeta {
  id: number
  collection: string
  name: string
  slug: string
  intro: string
  theme: IProductTheme | null
  createdAt: Date
  stock: boolean
  promo?: number
  like?: number
}

export interface IProduct {
  meta: IProductMeta
  description: string[]
  images: string[]
  variants: IVariant[]
  wellness?: IProductWellness
}