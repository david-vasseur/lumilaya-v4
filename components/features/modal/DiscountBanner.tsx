// components/DiscountBanner.tsx

import { prisma } from "@/lib/prisma/prisma";
import DiscountBannerClient from "./DiscountBannerClient";

export default async function DiscountBanner() {
  const promo = await prisma.promo.findUnique({
    where: { id: 1 },
  });

  if (!promo || !promo.active || !promo.title) {
    return null;
  }

  // Vérification de la plage de dates si renseignée
  const now = new Date();
  if (promo.dateStart && now < new Date(promo.dateStart)) return null;
  if (promo.dateEnd && now > new Date(promo.dateEnd)) return null;

  return (
    <DiscountBannerClient
      title={promo.title}
      promoCode={promo.promoCode}
      linkUrl={promo.linkUrl}
      linkLabel={promo.linkLabel}
      bgColor={promo.bgColor}
      textColor={promo.textColor}
    />
  );
}
