"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

function Interlude() {

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
            <div className="intermediate-section relative bg-linear-to-br from-[#7A9B8E]/90 to-[#5A7B6E]/90 backdrop-blur-sm rounded-3xl shadow-lg p-12 md:p-16 lg:p-20 text-zinc-100 max-w-3xl ml-auto">
                {/* <Image fill src={"/images/landing/footer.webp"} alt='logo' className="object-contain opacity-40"/> */}
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
            </div>
        </div>
    )
}

export default Interlude;