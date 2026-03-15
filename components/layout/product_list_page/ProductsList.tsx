"use client"

import ProductCard, { ProductCardProps } from "@/components/ui/ProductCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Suspense } from "react";

interface ProductsListProps {
    products: ProductCardProps[];
}

function ProductsList({ products }: ProductsListProps) {

	useGSAP(() => {
		gsap.from('.product-grid-card', {
			y: 80,
			opacity: 0,
			duration: 0.6,
			stagger: 0.1,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: '.products-grid',
				start: 'top 70%'
			}
		});
	})

    return (
        	<div id='produits' className="max-w-7xl mx-auto px-6 py-20">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-light text-[#2C2C2C] mb-4">
						Notre sélection
					</h2>
					<p className="text-lg text-[#2C2C2C]/60 max-w-2xl mx-auto">
						Chaque bougie est une invitation au voyage sensoriel
					</p>
				</div>

				<Suspense fallback="Chargement...">
					<div className="products-grid grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
						{products.map((product, index) => (
							<div key={index} className="product-grid-card">
								<ProductCard {...product} />
							</div>
						))}
					</div>
				</Suspense>
				
            </div>
    )
}

export default ProductsList;