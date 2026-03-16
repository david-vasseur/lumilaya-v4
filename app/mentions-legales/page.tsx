"use client"

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Scale, FileText, Shield, Lock, Mail, Calendar } from 'lucide-react';

const MentionsLegalesPage = () => {
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
                            <span className="text-sm font-medium">Informations légales</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
                            Mentions légales
                        </h1>
                        <p className="text-lg text-white/90">
                            Dernière mise à jour : 7 décembre 2024
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="legal-content max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">

                {/* Éditeur */}
                <div className="legal-section bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#7A9B8E]/10 rounded-2xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-[#7A9B8E]" />
                        </div>
                        <h2 className="text-2xl font-light text-[#2C2C2C]">Éditeur du site</h2>
                    </div>
                    <div className="text-[#2C2C2C]/70 space-y-2">
                        <p><strong>Nom commercial :</strong> LUMILAYA</p>
                        <p><strong>Forme juridique :</strong> SAS</p>
                        <p><strong>Capital social :</strong> 10 000 €</p>
                        <p><strong>RCS :</strong> Aix-en-Provence 123 456 789</p>
                        <p><strong>Siège social :</strong> 141 rue Anne Franck, 30900 Nîmes, France</p>
                        <p><strong>Email :</strong> contact@lumilaya.fr</p>
                        <p><strong>Téléphone :</strong> +33 6 18 65 95 10</p>
                    </div>
                </div>

                {/* Directeur de publication */}
                <div className="legal-section bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <h2 className="text-2xl font-light text-[#2C2C2C] mb-4">Directeur de la publication</h2>
                    <p className="text-[#2C2C2C]/70">
                        Le directeur de la publication est le représentant légal de la société LUMILAYA.
                    </p>
                </div>

                {/* Hébergement */}
                <div className="legal-section bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <h2 className="text-2xl font-light text-[#2C2C2C] mb-4">Hébergement</h2>
                    <p className="text-[#2C2C2C]/70">
                        Le site est hébergé par : <br />
                        <strong>Vercel Inc.</strong><br />
                        340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
                        www.vercel.com
                    </p>
                </div>

                {/* Propriété intellectuelle */}
                <div className="legal-section bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#7A9B8E]/10 rounded-2xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-[#7A9B8E]" />
                        </div>
                        <h2 className="text-2xl font-light text-[#2C2C2C]">Propriété intellectuelle</h2>
                    </div>
                    <p className="text-[#2C2C2C]/70">
                        Tous les éléments du site LUMILAYA (textes, images, graphismes, logo, vidéos, etc.)
                        sont protégés par le droit d’auteur et restent la propriété exclusive de LUMILAYA.
                        Toute reproduction, représentation ou utilisation sans autorisation est strictement interdite.
                    </p>
                </div>

                {/* Données personnelles */}
                <div className="legal-section bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#7A9B8E]/10 rounded-2xl flex items-center justify-center">
                            <Lock className="w-6 h-6 text-[#7A9B8E]" />
                        </div>
                        <h2 className="text-2xl font-light text-[#2C2C2C]">Données personnelles</h2>
                    </div>
                    <p className="text-[#2C2C2C]/70 mb-2">
                        Les données personnelles collectées sont utilisées uniquement dans le cadre de la
                        gestion des commandes, de la relation client et du respect des obligations légales.
                    </p>
                    <p className="text-[#2C2C2C]/70">
                        Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression
                        de vos données.
                    </p>
                </div>

                {/* Cookies */}
                <div className="legal-section bg-white rounded-3xl p-8 shadow-lg mb-8">
                    <h2 className="text-2xl font-light text-[#2C2C2C] mb-4">Cookies</h2>
                    <p className="text-[#2C2C2C]/70">
                        Le site peut utiliser des cookies à des fins de mesure d’audience et d’amélioration
                        de l’expérience utilisateur. Vous pouvez à tout moment refuser leur utilisation via
                        les paramètres de votre navigateur.
                    </p>
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

export default MentionsLegalesPage;
