"use client"

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import StickyCard from "@/components/ui/StickyCard";

gsap.registerPlugin(ScrollTrigger)

interface Feature {
	title: string;
	para: string;
	icon: "leaf" | "heart" | "shield" | "check" | "hand" | "award" | "truck" | "star";
}

interface Stat {
	title: string;
	para: string;
}

interface SecondaryBadge {
	span: string;
	icon: "star";
}

interface ISticky {
	badge: string;
	title: string;
	subTitle: string;
	description: string;
	features: Feature[];
	stats: Stat[];
	image: string;
	secondaryBadge: SecondaryBadge[];
}

function Quality() {

    const containerRef = useRef<HTMLDivElement>(null);

    const stickyData: ISticky[] = [
  // =========================
  // PANEL 1 — INGRÉDIENTS
  // =========================
		{
			badge: "Qualité & Sécurité Premium",
			title: "Ingrédients sains & 100% naturels",
			subTitle: "La pureté au cœur de chaque création",
			description:
			"Nous sélectionnons avec une exigence absolue chaque ingrédient qui compose nos bougies. Des cires végétales premium aux parfums naturels certifiés, en passant par nos mèches en coton biologique : aucun compromis n'est fait sur la qualité. Votre santé, votre bien-être et celui de votre famille sont notre priorité.",
			image: "/images/landing/quality_1.webp",
			features: [
			{
				title: "Cire 100% végétale",
				para: "Soja et coco premium, sans OGM",
				icon: "leaf",
			},
			{
				title: "Parfums naturels",
				para: "Certifiées bio, origine contrôlée",
				icon: "heart",
			},
			{
				title: "Mèches coton bio",
				para: "Sans plomb, combustion propre",
				icon: "shield",
			},
			{
				title: "Zéro additif",
				para: "Ni paraben, ni phtalate, ni CMR",
				icon: "check",
			},
			],
			stats: [
			{
				title: "100%",
				para: "Ingrédients naturels",
			},
			{
				title: "0",
				para: "Produit chimique",
			},
			{
				title: "Bio",
				para: "Certification",
			},
			],
			secondaryBadge: [
			{
				span: "5 étoiles",
				icon: "star",
			},
			],
		},

		// =========================
		// PANEL 2 — SAVOIR-FAIRE
		// =========================
		{
			badge: "Savoir-faire d'excellence",
			title: "Fabriqué à la main en Occitanie",
			subTitle: "L'artisanat au service de la perfection",
			description:
			"Dans notre atelier occitan, chaque bougie est une œuvre unique. Nos artisans experts maîtrisent l'art ancestral de la coulée à la main, combiné aux techniques modernes les plus avancées. Petites séries, attention minutieuse aux détails, contrôle qualité rigoureux : nous prenons le temps nécessaire pour créer l'excellence.",
			image: "/images/landing/quality_2.webp",
			features: [
			{
				title: "Coulée manuelle",
				para: "Geste artisan, précision maximale",
				icon: "hand",
			},
			{
				title: "Petites séries",
				para: "Collections limitées, exclusives",
				icon: "award",
			},
			{
				title: "Contrôle qualité",
				para: "Inspection à chaque étape",
				icon: "check",
			},
			{
				title: "Made in Occitanie",
				para: "Atelier maison dans le gard",
				icon: "heart",
			},
			],
			stats: [
			{
				title: "6",
				para: "Années d'expertise",
			},
			{
				title: "5",
				para: "Artisans passionnés",
			},
			{
				title: "48h",
				para: "Temps de fabrication",
			},
			],
			secondaryBadge: [
			{
				span: "Made in FR",
				icon: "star",
			},
			],
		},

		// =========================
		// PANEL 3 — PREMIUM
		// =========================
		{
			badge: "Premium",
			title: "Qualité Premium & Services Exclusifs",
			subTitle: "L’excellence dans chaque détail",
			description:
			"Nous sélectionnons les meilleurs matériaux et assurons un service client irréprochable. Livraison rapide, packaging soigné, et une expérience haut de gamme pour chaque bougie.",
			image: "/images/landing/quality_3.webp",
			features: [
			{
				title: "Livraison rapide",
				para: "Chez vous en 24-48h",
				icon: "truck",
			},
			{
				title: "Emballage soigné",
				para: "Coffrets premium et élégants",
				icon: "award",
			},
			{
				title: "Satisfaction garantie",
				para: "Échange ou remboursement facile",
				icon: "shield",
			},
			{
				title: "Évaluation 5★",
				para: "Clients satisfaits et fidèles",
				icon: "star",
			},
			],
			stats: [
			{
				title: "24/7",
				para: "Support client",
			},
			{
				title: "Livraison",
				para: "Express & soignée",
			},
			{
				title: "Packaging",
				para: "Premium design",
			},
			],
			secondaryBadge: [
			{
				span: "5★",
				icon: "star",
			},
			],
		},
	];


	useGSAP(() => {

		const stickys = document.querySelectorAll(".sticky-card");

		stickys.forEach((card, index) => {

			// ---- PINNING ----
			if (index < stickys.length - 1) {
			ScrollTrigger.create({
				trigger: card,
				start: "top top",
				endTrigger: stickys[stickys.length - 1],
				end: "top top",
				scrub: 2,
				pin: true,
				pinSpacing: false
			});
			}

			// ---- ANIMATION ----
			if (index < stickys.length - 1) {

			gsap.set(card, {
				scale: 1,
				rotation: 0,
				opacity: 1
			});

			gsap.to(card, {
				scale: 0.75,
				rotation: index % 2 === 0 ? 5 : -5,
				opacity: 0,
				scrollTrigger: {
				trigger: stickys[index + 1],
				start: "top bottom",
				end: "top top",
				scrub: 1.5
				}
			});

			}

		});

	}, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-x-hidden"
        >
            {stickyData.map((item, index) => (
                <StickyCard key={index} {...item} />
            ))}
        </div>
    )
}

export default Quality;