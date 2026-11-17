
import { prisma } from "@/lib/prisma/prisma";
import DiscountBannerClient from "./DiscountBannerClient";

export default async function DiscountBanner() {
  let promo = null;

  try {
    promo = await prisma.promo.findUnique({
      where: { id: 1 },
    });
  } catch {
    // Pendant le docker build, le conteneur postgres n'est pas joignable
    return null;
  }

  if (!promo || !promo.active || !promo.title) {
    return null;
  }

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
