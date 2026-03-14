"use client"

import { LucideIcon } from "lucide-react";

export type FeatureIconKey =
  | "leaf"
  | "heart"
  | "shield"
  | "check"
  | "truck"
  | "hand"
  | "award"
  | "star";

import {
  Leaf,
  Heart,
  Shield,
  CheckCircle,
  Truck,
  Hand,
  Award,
  Star,
} from "lucide-react";

export const featureIcons: Record<FeatureIconKey, LucideIcon> = {
  leaf: Leaf,
  heart: Heart,
  shield: Shield,
  check: CheckCircle,
  truck: Truck,
  hand: Hand,
  award: Award,
  star: Star,
};


interface Feature {
  title: string;
  para: string;
  icon: FeatureIconKey;
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

function StickyCard({
  title,
  badge,
  subTitle,
  description,
  features,
  stats,
  secondaryBadge,
  image,
}: ISticky) {


        const secondaryIcons = {
        star: Star,
    };


    return (
        <div className="sticky-card relative h-svh w-full bg-linear-to-br from-[#FDFBF7] via-[#F9F6F0] to-[#F5F1EB] grid lg:grid-cols-12 gap-8 lg:gap-12 items-center will-change-transform overflow-hidden">

                {/* LEFT */}
                <div className="lg:col-span-7 space-y-6 px-6 lg:space-y-8 pt-20 lg:pt-0">

                {/* Badge */}
                <div className="badge hidden xl:inline-flex items-center gap-2 bg-white/80 px-6 py-3 rounded-full shadow-lg border border-[#7A9B8E]/20">
                    <Leaf className="w-5 h-5 text-[#7A9B8E]" />
                    <span className="text-sm font-semibold text-[#7A9B8E] tracking-wide uppercase">
                    {badge}
                    </span>
                </div>

                <h2 className="title-text text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight text-[#2C2C2C] leading-[1.1]">
                    {title}
                </h2>

                <p className="subtitle-text text-xl sm:text-2xl text-[#7A9B8E] font-light">
                    {subTitle}
                </p>

                <p className="description text-sm sm:text-lg lg:text-xl text-[#2C2C2C]/70 leading-relaxed max-w-2xl">
                    {description}
                </p>

                {/* FEATURES */}
                <div className="hidden 2xl:grid grid-cols-2 gap-3 md:gap-4 pt-2 md:pt-4">
                    {features.map((feature, index) => {
                    const Icon = featureIcons[feature.icon];

                    return (
                        <div
                        key={index}
                        className="feature-card bg-white/60 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-[#7A9B8E]/10 hover:border-[#7A9B8E]/30 transition-all hover:shadow-xl"
                        >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-linear-to-br from-[#7A9B8E] to-[#5A7B6E] rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                            <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                            <h3 className="font-semibold text-[#2C2C2C] mb-1">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-[#2C2C2C]/60 leading-relaxed">
                                {feature.para}
                            </p>
                            </div>
                        </div>
                        </div>
                    );
                    })}
                </div>

                {/* STATS */}
                <div className="hidden xl:flex flex-wrap gap-6 sm:gap-8 pt-6 border-t border-[#2C2C2C]/10">
                    {stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                        <div className="text-3xl sm:text-4xl font-light text-[#7A9B8E] mb-1">
                        {stat.title}
                        </div>
                        <div className="text-sm text-[#2C2C2C]/60">
                        {stat.para}
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="lg:col-span-4 relative h-100 sm:h-125 lg:h-162 px-4">
                    <div className="relative w-full h-full">
                        <img
                            src={image}
                            className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl"
                            alt={title}
                        />

                        <div className="floating-badge absolute -top-4 -right-4 bg-white rounded-2xl p-4 sm:p-5 shadow-2xl deco-icon">
                            <div className="flex flex-col items-center gap-2">
                                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-[#7A9B8E]" />
                                <span className="text-xs font-semibold text-[#2C2C2C]">
                                    Premium
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default StickyCard;