"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Leaf } from 'lucide-react';
import { useRef } from 'react';

function Final() {

    const finalRef = useRef<HTMLDivElement>(null);

    useGSAP(()=> {

        gsap.from(finalRef.current, {
			y: 60,
			opacity: 0,
			duration: 1,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: finalRef.current,
				start: 'top 80%'
			}
		});

    }, {scope: finalRef})

    return (
        <div ref={finalRef} className="relative rounded-3xl overflow-hidden mb-20">
            <div className="absolute inset-0 bg-linear-to-br from-[#7A9B8E] to-[#5A7B6E]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#2C2C2C] rounded-full blur-3xl"></div>
                </div>
            </div>

            <div className="relative p-16 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8">
                    <Leaf className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-4xl font-light text-white mb-6">
                    L'essence de la nature
                </h2>

                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
                    Nos bougies naturelles sont formulées sans parfum de synthèse agressif.
                    Nous utilisons exclusivement des fragrances de Grasse, reconnues pour leur qualité et leur savoir-faire artisanal, afin d’offrir des senteurs raffinées et équilibrées.
                    Elles garantissent un air intérieur respecté et une combustion propre.
                </p>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="text-5xl font-light text-white mb-2">100%</div>
                        <div className="text-white/80">Cire végétale</div>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-light text-white mb-2">0</div>
                        <div className="text-white/80">Additif chimique</div>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-light text-white mb-2">50+</div>
                        <div className="text-white/80">Heures de combustion</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Final;