"use client"

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FileText, Scale, Mail } from 'lucide-react';

const CGVPage = () => {
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
            {/* Hero Section */}
            <div className="relative h-[40vh] md:h-[50vh] overflow-hidden bg-linear-to-br from-[#7A9B8E] via-[#6A8B7E] to-[#5A7B6E]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-64 md:w-96 h-64 md:h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-[#2C2C2C] rounded-full blur-3xl"></div>
                </div>

                <div className="legal-hero relative h-full flex items-center justify-center text-center px-4 sm:px-6">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 md:px-5 py-2 rounded-full mb-4 md:mb-6">
                            <Scale className="w-4 md:w-5 h-4 md:h-5" />
                            <span className="text-xs md:text-sm font-medium">Document légal</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3 md:mb-4">
                            Conditions Générales de Vente
                        </h1>
                        <p className="text-base md:text-lg lg:text-xl text-white/90">
                            Dernière mise à jour : 7 décembre 2024
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="legal-content max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
                {/* Préambule */}
                <div className="legal-section bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg mb-6 md:mb-8">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#7A9B8E]/10 rounded-xl md:rounded-2xl flex items-center justify-center">
                            <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#7A9B8E]" />
                        </div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-[#2C2C2C]">Préambule</h2>
                    </div>
                    <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]/70 leading-relaxed space-y-4">
                        <p>
                            Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles 
                            entre LUMILAYA, société par actions simplifiée au capital de 10 000 euros, immatriculée 
                            au RCS de Nîmes sous le numéro 832 950 570 00024, dont le siège social est situé 
                            141, rue Anne Franck 30900 Nîmes, France (ci-après "le Vendeur"), et toute 
                            personne physique ou morale souhaitant procéder à un achat via le site internet 
                            www.lumilaya.fr (ci-après "le Client").
                        </p>
                        <p>
                            Le fait de passer commande implique l'adhésion entière et sans réserve du Client aux 
                            présentes CGV, à l'exclusion de tous autres documents, prospectus, catalogues ou 
                            photographies qui n'ont qu'une valeur indicative.
                        </p>
                    </div>
                </div>

                {/* Article 1 */}
                <div className="legal-section bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-light text-[#2C2C2C] mb-4 md:mb-6 flex items-center gap-3">
                        <span className="text-[#7A9B8E]">Article 1.</span> Objet
                    </h2>
                    <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]/70 leading-relaxed space-y-4">
                        <p>
                            Les présentes CGV ont pour objet de définir les droits et obligations des parties dans 
                            le cadre de la vente en ligne de bougies artisanales et produits dérivés proposés par 
                            LUMILAYA.
                        </p>
                    </div>
                </div>

                {/* Article 2 */}
                <div className="legal-section bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-light text-[#2C2C2C] mb-4 md:mb-6 flex items-center gap-3">
                        <span className="text-[#7A9B8E]">Article 2.</span> Produits
                    </h2>
                    <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]/70 leading-relaxed space-y-4">
                        <p>
                            Les produits proposés à la vente sont ceux qui figurent sur le site www.lumilaya.fr. 
                            Les photographies, descriptions et caractéristiques sont données à titre indicatif et 
                            peuvent être modifiées sans préavis. Le Vendeur se réserve le droit de modifier les 
                            caractéristiques et les prix à tout moment.
                        </p>
                        <p>
                            Toutes nos bougies sont fabriquées artisanalement en France avec des ingrédients 100% 
                            naturels. De légères variations de couleur, forme ou parfum peuvent exister entre les 
                            produits, témoignant de leur caractère artisanal.
                        </p>
                    </div>
                </div>

                {/* Article 3 */}
                <div className="legal-section bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-light text-[#2C2C2C] mb-4 md:mb-6 flex items-center gap-3">
                        <span className="text-[#7A9B8E]">Article 3.</span> Prix
                    </h2>
                    <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]/70 leading-relaxed space-y-4">
                        <p>
                            Les prix sont indiqués en euros (€) toutes taxes comprises (TTC), hors frais de livraison. 
                            Le Vendeur se réserve le droit de modifier ses prix à tout moment, étant toutefois entendu 
                            que le prix figurant sur le site le jour de la commande sera le seul applicable au Client.
                        </p>
                        <p>
                            Les frais de livraison sont calculés en fonction du mode de livraison choisi et de la 
                            destination. Ils sont indiqués avant la validation définitive de la commande. La livraison 
                            est offerte pour toute commande supérieure à 50€ en France métropolitaine.
                        </p>
                    </div>
                </div>

                {/* Article 4 */}
                <div className="legal-section bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-light text-[#2C2C2C] mb-4 md:mb-6 flex items-center gap-3">
                        <span className="text-[#7A9B8E]">Article 4.</span> Commande
                    </h2>
                    <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]/70 leading-relaxed space-y-4">
                        <p>
                            Le Client passe commande en ligne sur le site www.lumilaya.fr. Pour être valide, la 
                            commande doit être confirmée par le paiement intégral du prix. Le Vendeur confirme 
                            l'enregistrement de la commande par l'envoi d'un email de confirmation.
                        </p>
                        <p>
                            Toute commande vaut acceptation des prix et descriptions des produits disponibles à la 
                            vente. Toute contestation sur ce point interviendra dans le cadre d'un éventuel échange 
                            et des garanties ci-dessous mentionnées.
                        </p>
                    </div>
                </div>

                {/* Article 5 */}
                <div className="legal-section bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-light text-[#2C2C2C] mb-4 md:mb-6 flex items-center gap-3">
                        <span className="text-[#7A9B8E]">Article 5.</span> Paiement
                    </h2>
                    <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]/70 leading-relaxed space-y-4">
                        <p>
                            Le paiement s'effectue en ligne par carte bancaire (Visa, Mastercard, American Express) 
                            ou via des solutions de paiement sécurisées (PayPal, Apple Pay, Google Pay). Les 
                            informations de paiement sont cryptées par protocole SSL et ne sont jamais stockées sur 
                            nos serveurs.
                        </p>
                        <p>
                            Le Client garantit au Vendeur qu'il dispose des autorisations nécessaires pour utiliser 
                            le mode de paiement choisi lors de la validation de la commande.
                        </p>
                    </div>
                </div>

                {/* Article 6 */}
                <div className="legal-section bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-light text-[#2C2C2C] mb-4 md:mb-6 flex items-center gap-3">
                        <span className="text-[#7A9B8E]">Article 6.</span> Livraison
                    </h2>
                    <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]/70 leading-relaxed space-y-4">
                        <p>
                            Les produits sont livrés à l'adresse indiquée par le Client lors de la commande. Les 
                            délais de livraison sont les suivants :
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                            <li>France métropolitaine : 3 à 5 jours ouvrés</li>
                            <li>Union Européenne : 5 à 10 jours ouvrés</li>
                            <li>Reste du monde : nous consulter</li>
                        </ul>
                        <p>
                            Ces délais sont donnés à titre indicatif et peuvent varier en fonction des périodes de 
                            forte activité. Le Vendeur ne saurait être tenu responsable des retards de livraison dus 
                            au transporteur ou à des circonstances indépendantes de sa volonté.
                        </p>
                    </div>
                </div>

                {/* Article 7 */}
                <div className="legal-section bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-light text-[#2C2C2C] mb-4 md:mb-6 flex items-center gap-3">
                        <span className="text-[#7A9B8E]">Article 7.</span> Droit de rétractation
                    </h2>
                    <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]/70 leading-relaxed space-y-4">
                        <p>
                            Conformément aux articles L.221-18 et suivants du Code de la consommation, le Client 
                            dispose d'un délai de quatorze (14) jours francs à compter de la réception de sa commande 
                            pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de 
                            pénalité.
                        </p>
                        <p>
                            Les retours sont acceptés si les produits sont dans leur emballage d'origine, non ouverts 
                            et non utilisés. Les frais de retour sont à la charge du Client. Le remboursement sera 
                            effectué dans un délai de 14 jours suivant la réception du produit retourné.
                        </p>
                        <p>
                            Pour exercer ce droit, le Client doit nous contacter à l'adresse : 
                            <a href="mailto:entreprise.lumilaya@outlook.fr" className="text-[#7A9B8E] hover:underline ml-1">
                                entreprise.lumilaya@outlook.fr
                            </a>
                        </p>
                    </div>
                </div>

                {/* Article 8 */}
                <div className="legal-section bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-light text-[#2C2C2C] mb-4 md:mb-6 flex items-center gap-3">
                        <span className="text-[#7A9B8E]">Article 8.</span> Garanties
                    </h2>
                    <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]/70 leading-relaxed space-y-4">
                        <p>
                            Tous nos produits bénéficient de la garantie légale de conformité (articles L.217-4 et 
                            suivants du Code de la consommation) et de la garantie contre les vices cachés 
                            (articles 1641 et suivants du Code civil).
                        </p>
                        <p>
                            En cas de défaut de conformité, le Client peut demander la réparation ou le remplacement 
                            du produit dans un délai de deux ans à compter de la livraison. Si cela s'avère impossible, 
                            le Client peut demander une réduction du prix ou la résolution de la vente.
                        </p>
                    </div>
                </div>

                {/* Article 9 */}
                <div className="legal-section bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-light text-[#2C2C2C] mb-4 md:mb-6 flex items-center gap-3">
                        <span className="text-[#7A9B8E]">Article 9.</span> Responsabilité
                    </h2>
                    <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]/70 leading-relaxed space-y-4">
                        <p>
                            Le Vendeur ne saurait être tenu responsable de l'inexécution du contrat en cas de rupture 
                            de stock, d'indisponibilité du produit, de force majeure, de perturbation ou grève totale 
                            ou partielle des services postaux ou des moyens de transport.
                        </p>
                        <p>
                            Les photographies et graphismes présentés sur le site ne sont pas contractuels et ne 
                            sauraient engager la responsabilité du Vendeur.
                        </p>
                    </div>
                </div>

                {/* Article 10 */}
                <div className="legal-section bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-light text-[#2C2C2C] mb-4 md:mb-6 flex items-center gap-3">
                        <span className="text-[#7A9B8E]">Article 10.</span> Données personnelles
                    </h2>
                    <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]/70 leading-relaxed space-y-4">
                        <p>
                            Les données personnelles collectées lors de la commande font l'objet d'un traitement 
                            informatique destiné à la gestion des commandes et de la relation client. Conformément 
                            au RGPD, le Client dispose d'un droit d'accès, de rectification et de suppression des 
                            données le concernant.
                        </p>
                        <p>
                            Pour plus d'informations, consultez notre{' '}
                            <a href="/politique-confidentialite" className="text-[#7A9B8E] hover:underline">
                                Politique de confidentialité
                            </a>.
                        </p>
                    </div>
                </div>

                {/* Article 11 */}
                <div className="legal-section bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-light text-[#2C2C2C] mb-4 md:mb-6 flex items-center gap-3">
                        <span className="text-[#7A9B8E]">Article 11.</span> Droit applicable et litiges
                    </h2>
                    <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]/70 leading-relaxed space-y-4">
                        <p>
                            Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable 
                            sera recherchée avant toute action judiciaire. À défaut d'accord amiable, le litige sera 
                            porté devant les tribunaux compétents selon les règles de droit commun.
                        </p>
                        <p>
                            Conformément aux dispositions du Code de la consommation concernant le règlement amiable 
                            des litiges, LUMILAYA adhère au Service du Médiateur du e-commerce de la FEVAD dont les 
                            coordonnées sont les suivantes : 60 rue de la Boétie – 75008 Paris – 
                            <a href="https://www.mediateurfevad.fr" className="text-[#7A9B8E] hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                                www.mediateurfevad.fr
                            </a>
                        </p>
                    </div>
                </div>

                {/* Contact */}
                <div className="legal-section bg-linear-to-br from-[#7A9B8E]/10 to-[#5A7B6E]/10 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-[#7A9B8E]/20">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#7A9B8E] rounded-xl md:rounded-2xl flex items-center justify-center">
                            <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-[#2C2C2C]">Contact</h2>
                    </div>
                    <div className="text-sm md:text-base text-[#2C2C2C]/70 leading-relaxed space-y-2">
                        <p>Pour toute question relative aux présentes CGV, vous pouvez nous contacter :</p>
                        <p className="font-medium text-[#2C2C2C]">
                            Par email : <a href="mailto:entreprise.lumilaya@outlook.fr" className="text-[#7A9B8E] hover:underline">entreprise.lumilaya@outlook.fr</a>
                        </p>
                        <p className="font-medium text-[#2C2C2C]">
                            Par téléphone : <a href="tel:+33618659510" className="text-[#7A9B8E] hover:underline">+33 6 18 65 95 10</a>
                        </p>
                        <p className="font-medium text-[#2C2C2C]">
                            Par courrier : LUMILAYA - 141, rue Anne Franck, 30900 NÎMES, France
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CGVPage;