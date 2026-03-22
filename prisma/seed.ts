import { ShippingType } from "../lib/generated/prisma/enums";
import { prisma } from "../lib/prisma/prisma";

const shippingPrices = [
  { name: "France", zone: "FR", shippingType: ShippingType.DOM, price: 6.79 },
  { name: "France", zone: "FR", shippingType: ShippingType.REL, price: 4.3 },
  { name: "France", zone: "FR", shippingType: ShippingType.OFF, price: 0 },
  { name: "Allemagne", zone: "DE", shippingType: ShippingType.REL, price: 8.05 },
  { name: "Espagne", zone: "ES", shippingType: ShippingType.REL, price: 7.5 },
  { name: "Italie", zone: "IT", shippingType: ShippingType.REL, price: 7.5 },
  { name: "Belgique", zone: "BE", shippingType: ShippingType.REL, price: 5.9 },
  { name: "Pays-bas", zone: "NL", shippingType: ShippingType.REL, price: 6.4 },
  { name: "Portugal", zone: "PT", shippingType: ShippingType.REL, price: 7.5 },
  { name: "Autriche", zone: "AT", shippingType: ShippingType.REL, price: 10.66 },
  { name: "Suisse", zone: "CH", shippingType: ShippingType.REL, price: 7.5 },
  { name: "Luxembourg", zone: "LU", shippingType: ShippingType.REL, price: 5.9 },
  { name: "Irlande", zone: "IE", shippingType: ShippingType.REL, price: 10.6 },
  { name: "Danemark", zone: "DK", shippingType: ShippingType.REL, price: 5.9 },
  { name: "Suède", zone: "SE", shippingType: ShippingType.REL, price: 10.6 },
  { name: "Norvège", zone: "NO", shippingType: ShippingType.REL, price: 10.6 },
  { name: "Finlande", zone: "FI", shippingType: ShippingType.REL, price: 10.6 },
  { name: "Pologne", zone: "PL", shippingType: ShippingType.REL, price: 8.1 },
  { name: "République Tchèque", zone: "CZ", shippingType: ShippingType.REL, price: 8.1 },
  { name: "Royaume-uni", zone: "GR", shippingType: ShippingType.REL, price: 10.5 },
];

async function main() {
    for (const price of shippingPrices) {
        await prisma.shippingPrice.create({
        data: price,
        });
    }
}

main()
    .then(() => {
        console.log("🌱 Seed done");
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });