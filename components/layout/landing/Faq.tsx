"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown, HelpCircle } from "lucide-react"
import Script from "next/script";
import { useRef, useState } from "react";


const faqs = [
    {
        id: 1,
        question: "Vos bougies sont-elles vraiment 100% naturelles ?",
        answer: "Oui, nos bougies sont composées uniquement de cire de soja ou de coco 100% végétale, de mèches en coton bio, et de parfums naturels pures. Aucun parfum synthétique, aucun additif chimique."
    },
    {
        id: 2,
        question: "Quelle est la durée de combustion moyenne ?",
        answer: "Selon la taille, nos bougies brûlent entre 25 et 40 heures. La bougie de 200g offre environ 35/40 heures de combustion propre et parfumée."
    },
    {
        id: 3,
        question: "Comment entretenir ma bougie pour prolonger sa durée de vie ?",
        answer: "Coupez la mèche à 5mm avant chaque utilisation, laissez brûler au moins 2h lors de la première utilisation pour une combustion uniforme, et évitez les courants d'air."
    },
    {
        id: 4,
        question: "Puis-je réutiliser le contenant après usage ?",
        answer: "Absolument ! Nos contenants en béton sont conçus pour être réutilisés. Versez de l'eau chaude pour retirer les derniers résidus de cire, nettoyez et transformez-le en pot de rangement."
    },
    {
        id: 5,
        question: "Livrez-vous partout en Europe ?",
        answer: "Oui, nous livrons dans tous les pays européens. La livraison est offerte dès 50€ d'achat en France, et des frais réduits s'appliquent pour le reste de l'Europe."
    },
];

const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};

function Faq() {

    const sectionRef = useRef<HTMLDivElement>(null);
    const [openQuestion, setOpenQuestion] = useState<number | null>(null);

    const toggleQuestion = (id: number) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    useGSAP(() => {
        gsap.from('.faq-title', {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
            }
        });

        gsap.from('.faq-item', {
            y: 80,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.faq-container',
                start: 'top 75%',
            }
        });
    }, []);

    return (
        <section 
            ref={sectionRef}
            className="w-full bg-linear-to-b from-[#FDFBF7] to-[#F5F1EB] py-16 lg:py-24"
        >
            <Script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 faq-title">
                    <div className="inline-flex items-center gap-2 bg-[#7A9B8E]/10 px-4 py-2 rounded-full mb-4">
                        <HelpCircle className="w-5 h-5 text-[#7A9B8E]" />
                        <span className="text-sm font-medium text-[#7A9B8E]">FAQ</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl text-[#2C2C2C] font-light mb-4">
                        On nous demande souvent...
                    </h2>
                    <p className="text-[#2C2C2C]/60 max-w-2xl mx-auto">
                        Retrouvez les réponses aux questions les plus fréquentes sur nos bougies naturelles
                    </p>
                </div>

                <div className="faq-container space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={faq.id}
                            className="faq-item bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <button
                                onClick={() => toggleQuestion(faq.id)}
                                className="cursor-pointer w-full px-6 py-5 text-left flex items-center justify-between hover:bg-[#F5F1EB] transition-colors duration-300 group"
                            >
                                <span className="text-[#2C2C2C] font-medium pr-4 group-hover:text-[#7A9B8E] transition-colors">
                                    {faq.question}
                                </span>
                                <ChevronDown 
                                    className={`flex-none w-5 h-5 text-[#7A9B8E] transform transition-transform duration-300 ${openQuestion === faq.id ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-300 ${openQuestion === faq.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="px-6 pb-5 pt-2 text-[#2C2C2C]/70 leading-relaxed border-t border-[#2C2C2C]/5">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA en bas de FAQ */}
                <div className="mt-12 text-center">
                    <p className="text-[#2C2C2C]/60 mb-4">
                        Vous avez d'autres questions ?
                    </p>
                    <a 
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-[#7A9B8E] text-white px-6 py-3 rounded-full hover:bg-[#6A8B7E] transition-all shadow-lg hover:shadow-xl"
                    >
                        Contactez-nous
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Faq;