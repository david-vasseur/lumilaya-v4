"use client"

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Shield, FileText, Lock, Scale, Mail, Server } from 'lucide-react';

const PolitiqueConfidentialitePage = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.legal-hero', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.2
        });

        gsap.from('.legal-section', {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.legal-content',
                start: 'top 75%',
            }
        });
    }, { scope: sectionRef });

    return (
        <div ref={sectionRef} className="min-h-screen bg-[#FDFBF7]">

            {/* Hero */}
            <div className="relative h-[40vh] md:h-[50vh] overflow-hidden bg-linear-to-br from-[#7A9B8E] via-[#6A8B7E] to-[#5A7B6E]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-64 md:w-96 h-64 md:h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-[#2C2C2C] rounded-full blur-3xl"></div>
                </div>

                <div className="legal-hero relative h-full flex items-center justify-center text-center px-4 sm:px-6">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full mb-4">
                            <Scale className="w-5 h-5" />
                            <span className="text-sm font-medium">Protection des données</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
                            Politique de confidentialité
                        </h1>
                        <p className="text-lg text-white/90">
                            Dernière mise à jour : 7 décembre 2024
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="legal-content max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">

                {/* Préambule */}
                <div className="legal-section bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#7A9B8E]/10 rounded-2xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-[#7A9B8E]" />
                        </div>
                        <h2 className="text-2xl font-light text-[#2C2C2C]">Préambule</h2>
                    </div>
                    <p className="text-[#2C2C2C]/70 leading-relaxed">
                        La présente Politique de Confidentialité a pour objectif d’informer les utilisateurs du site
                        LUMILAYA sur la manière dont leurs données personnelles sont collectées, utilisées et protégées,
                        conformément au Règlement Général sur la Protection des Données (RGPD).
                    </p>
                </div>

                {/* Données collectées */}
                <div className="legal-section bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <h2 className="text-2xl font-light text-[#2C2C2C] mb-4">
                        1. Données personnelles collectées
                    </h2>
                    <div className="text-[#2C2C2C]/70 space-y-3">
                        <p>
                            Les seules données collectées sur le site LUMILAYA sont celles strictement nécessaires
                            au traitement des commandes :
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Nom et prénom</li>
                            <li>Adresse de livraison et de facturation</li>
                            <li>Adresse email</li>
                            <li>Numéro de téléphone</li>
                        </ul>
                        <p>
                            Aucune donnée sensible n’est collectée.
                        </p>
                    </div>
                </div>

                {/* Absence de cookies */}
                <div className="legal-section bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#7A9B8E]/10 rounded-2xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-[#7A9B8E]" />
                        </div>
                        <h2 className="text-2xl font-light text-[#2C2C2C]">
                            2. Absence de cookies
                        </h2>
                    </div>
                    <p className="text-[#2C2C2C]/70 leading-relaxed">
                        Le site LUMILAYA n’utilise aucun cookie de suivi, de publicité ou de mesure d’audience.
                        Aucune donnée de navigation n’est stockée sur le terminal de l’utilisateur.
                    </p>
                </div>

                {/* Bots anonymes */}
                <div className="legal-section bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#7A9B8E]/10 rounded-2xl flex items-center justify-center">
                            <Server className="w-6 h-6 text-[#7A9B8E]" />
                        </div>
                        <h2 className="text-2xl font-light text-[#2C2C2C]">
                            3. Analyse via bots anonymes
                        </h2>
                    </div>
                    <p className="text-[#2C2C2C]/70 leading-relaxed">
                        Afin de garantir la sécurité du site et d’améliorer ses performances, LUMILAYA utilise
                        des bots techniques anonymes côté serveur. Ces bots :
                    </p>
                    <ul className="list-disc list-inside mt-3 text-[#2C2C2C]/70 space-y-1">
                        <li>Ne collectent aucune donnée personnelle</li>
                        <li>Ne tracent pas les utilisateurs</li>
                        <li>Respectent strictement le RGPD</li>
                    </ul>
                </div>

                {/* Utilisation des données */}
                <div className="legal-section bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#7A9B8E]/10 rounded-2xl flex items-center justify-center">
                            <Lock className="w-6 h-6 text-[#7A9B8E]" />
                        </div>
                        <h2 className="text-2xl font-light text-[#2C2C2C]">
                            4. Utilisation des données
                        </h2>
                    </div>
                    <p className="text-[#2C2C2C]/70 space-y-2">
                        Les données collectées sont utilisées exclusivement pour :
                    </p>
                    <ul className="list-disc list-inside mt-3 text-[#2C2C2C]/70 space-y-1">
                        <li>Le traitement des commandes</li>
                        <li>La gestion de la relation client</li>
                        <li>Les obligations comptables et légales</li>
                    </ul>
                </div>

                {/* Conservation */}
                <div className="legal-section bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <h2 className="text-2xl font-light text-[#2C2C2C] mb-4">
                        5. Durée de conservation
                    </h2>
                    <p className="text-[#2C2C2C]/70">
                        Les données sont conservées pendant la durée strictement nécessaire aux finalités
                        mentionnées ci-dessus, et conformément aux obligations légales en vigueur.
                    </p>
                </div>

                {/* Droits utilisateurs */}
                <div className="legal-section bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <h2 className="text-2xl font-light text-[#2C2C2C] mb-4">
                        6. Droits des utilisateurs
                    </h2>
                    <p className="text-[#2C2C2C]/70">
                        Conformément au RGPD, vous disposez des droits suivants :
                    </p>
                    <ul className="list-disc list-inside mt-3 text-[#2C2C2C]/70 space-y-1">
                        <li>Droit d’accès</li>
                        <li>Droit de rectification</li>
                        <li>Droit à l’effacement</li>
                        <li>Droit à la limitation du traitement</li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="legal-section bg-linear-to-br from-[#7A9B8E]/10 to-[#5A7B6E]/10 rounded-3xl p-8 border border-[#7A9B8E]/20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#7A9B8E] rounded-2xl flex items-center justify-center">
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-light text-[#2C2C2C]">Contact</h2>
                    </div>
                    <div className="text-[#2C2C2C]/70 space-y-2">
                        <p>Email : <a href="mailto:contact@lumilaya.fr" className="text-[#7A9B8E] hover:underline">contact@lumilaya.fr</a></p>
                        <p>Téléphone : <a href="tel:+33618659510" className="text-[#7A9B8E] hover:underline">+33 6 18 65 95 10</a></p>
                        <p>Adresse : 141 rue Anne Franck, 30900 Nîmes, France</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PolitiqueConfidentialitePage;
