import { Heart, Leaf, Sparkles } from 'lucide-react';

function ProductCar() {
    return (
        <div className="features-section mb-20">
            <h2 className="text-3xl font-light text-[#2C2C2C] mb-12 text-center">
                Ce qui rend cette bougie unique
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="feature-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-linear-to-br from-[#7A9B8E] to-[#5A7B6E] rounded-2xl flex items-center justify-center mb-6">
                    <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-light text-[#2C2C2C] mb-3">
                    Ingrédients purs
                </h3>
                <p className="text-[#2C2C2C]/60 leading-relaxed">
                    Cire de soja et de coco 100% naturelles, mèche en coton bio et fragrances de Grasse 
                    certifiées. Aucun parfum synthétique, aucun additif.
                </p>
                </div>

                <div className="feature-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-linear-to-br from-[#7A9B8E] to-[#5A7B6E] rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-light text-[#2C2C2C] mb-3">
                    Diffusion optimale
                </h3>
                <p className="text-[#2C2C2C]/60 leading-relaxed">
                    Notre formule exclusive garantit une diffusion homogène et durable 
                    du parfum, pour une expérience olfactive exceptionnelle.
                </p>
                </div>

                <div className="feature-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-linear-to-br from-[#7A9B8E] to-[#5A7B6E] rounded-2xl flex items-center justify-center mb-6">
                    <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-light text-[#2C2C2C] mb-3">
                    Fait main en France
                </h3>
                <p className="text-[#2C2C2C]/60 leading-relaxed">
                    Chaque bougie est coulée à la main dans notre atelier occitan, 
                    avec soin et passion pour garantir une qualité irréprochable.
                </p>
                </div>
            </div>
        </div>
    )
}

export default ProductCar;