"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

function Interlude({ collection }: { collection: string }) {

    const interludeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        gsap.from('.intermediate-section', {
			x: 100, 
			opacity: 0,
			duration: 1,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: '.intermediate-section',
				start: 'top 80%'
			}
		});

    }, {scope: interludeRef})

    return (
        <div ref={interludeRef} className="relative -mt-20 xl:-mt-32 max-w-7xl mx-auto px-6">
            <div className="intermediate-section relative bg-linear-to-br from-[#7A9B8E]/90 to-[#5A7B6E]/90 backdrop-blur-sm rounded-3xl shadow-lg p-12 md:p-16 lg:p-20 text-zinc-100 max-w-3xl ml-auto overflow-hidden">
                <img 
                    src={"/images/landing/footer.webp"} 
                    alt='logo' 
                    className="absolute inset-0 object-contain opacity-40"
                />
                {collection === "Emotion" ? (
                    <>
                        <p className="text-lg relative z-5 leading-relaxed mb-4">
                            Parce que chaque création <span className="font-ballet text-2xl italic">Lumi'laya</span> est une invitation à savourer ce qui fait du bien.
                        </p>

                        <p className="text-lg relative z-5 leading-relaxed mb-4">
                            Je les imagine comme des instants doux et sucrés, des éclats de chaleur qui rappellent la joie simple et les souvenirs tendres.
                        </p>

                        <p className="text-lg relative z-5 leading-relaxed mb-4">
                            Elles portent des senteurs enveloppantes qui réveillent les sens, réconfortent le cœur et déposent un sourire là où il manquait.
                        </p>

                        <p className="text-lg relative z-5 leading-relaxed mb-4">
                            Elles célèbrent le cocooning, la gourmandise, la douceur du foyer… ces petits moments qui réparent, apaisent et ramènent à soi.
                        </p>

                        <p className="text-lg leading-relaxed">
                            Avec <span className="font-ballet text-2xl italic">Lumi'laya</span>, chaque bougie devient plus qu’un parfum : un refuge, une parenthèse, une manière simple et profonde de prendre soin de soi.
                        </p>
                    </>
                ) : (
                    <>
                        <p className="text-lg relative z-5 leading-relaxed mb-4">
                            Parce que chaque création <span className="font-ballet text-2xl italic">Lumi'laya</span> peut aussi devenir un véritable support de transformation intérieure.
                        </p>

                        <p className="text-lg relative z-5 leading-relaxed mb-4">
                            La collection Entre Terre et Ciel rassemble des bougies énergétiques imaginées comme des outils d’accompagnement sur le chemin de soi. Allumées en conscience, elles invitent à ralentir, à écouter ses émotions et à créer un espace propice au rituel et à l’introspection.
                        </p>

                        <p className="text-lg relative z-5 leading-relaxed mb-4">
                           Chaque bougie est associée à des pierres naturelles soigneusement choisies pour soutenir l’intention et le rituel qui lui est lié.
                        </p>

                        <p className="text-lg relative z-5 leading-relaxed mb-4">
                            Plus qu’un simple objet, elles deviennent un point d’ancrage, une présence douce qui accompagne les moments de libération, de protection, d’introspection ou d’ancrage.
                        </p>

                        <p className="text-lg leading-relaxed">
                            Avec <span className="font-ballet text-2xl italic">Lumi'laya</span>, chaque flamme devient un passage… un instant pour revenir à soi.
                        </p>
                    </>
                )}
                
            </div>
        </div>
    )
}

export default Interlude;