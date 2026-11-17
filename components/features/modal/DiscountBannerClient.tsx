// components/DiscountBannerClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Sparkles, ArrowRight } from "lucide-react";

interface DiscountBannerProps {
  title: string;
  promoCode?: string | null;
  linkUrl?: string | null;
  linkLabel?: string | null;
  bgColor: string;
  textColor: string;
}

export default function DiscountBannerClient({
  title,
  promoCode,
  linkUrl,
  linkLabel,
  bgColor,
  textColor,
}: DiscountBannerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!promoCode) return;
    await navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{ backgroundColor: bgColor, color: textColor }}
      className="w-full min-h-10 py-1.5 px-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm tracking-wide shadow-sm border-b border-black/10 transition-colors"
    >
      {/* Message principal */}
      <div className="flex items-center gap-1.5 font-medium text-center">
        <Sparkles className="w-3.5 h-3.5 shrink-0 opacity-85" />
        <span>{title}</span>
      </div>

      {/* Badge code promo copiable */}
      {promoCode && (
        <button
          type="button"
          onClick={handleCopy}
          title="Cliquer pour copier le code"
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/15 hover:bg-white/25 border border-current/25 backdrop-blur-xs transition-all cursor-pointer active:scale-95"
        >
          <span>{promoCode}</span>
          {copied ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3 opacity-80" />
          )}
        </button>
      )}

      {/* Lien CTA optionnel */}
      {linkUrl && (
        <Link
          href={linkUrl}
          className="inline-flex items-center gap-1 text-xs font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          <span>{linkLabel || "En profiter"}</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  );
}
