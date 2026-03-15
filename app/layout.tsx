import type { Metadata } from "next";
import { Geist, Geist_Mono, Herr_Von_Muellerhoff } from "next/font/google";
import "./globals.css";
import Nav from "@/components/features/navbar/Nav";
import Footer from "@/components/features/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ballet = Herr_Von_Muellerhoff({
  variable: "--font-ballet",
  weight: ['400']
})

const BASE_URL = "https://www.lumilaya.fr"

export const metadata: Metadata = {
  title: "LUMILAYA • Bougies naturelles artisanales",
  description:
    "Bougies naturelles parfumées, fabriquées artisanalement en France dans le gard. Cire 100% végétale, parfums uniques, créations émotionnelles. Découvrez les collections LUMILAYA.",
  
  keywords: [
    "bougies naturelles",
    "bougies parfumées",
    "bougies artisanales",
    "cire végétale",
    "bougies françaises",
    "bougie parfum",
    "cadeau parfumé",
    "LUMILAYA",
  ],

  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000", 
      },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    title: "LUMILAYA • Bougies naturelles artisanales",
    description:
      "Découvrez les bougies naturelles LUMILAYA : cire végétale, parfums authentiques, créations émotionnelles fabriquées en France.",
    url: BASE_URL,
    siteName: "LUMILAYA",
    images: [
      {
        url: "https://www.lumilaya.fr/images/landing/logo.webp",
        width: 1200,
        height: 630,
        alt: "Bougie naturelle LUMILAYA",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "LUMILAYA • Bougies naturelles artisanales",
    description:
      "Bougies naturelles parfumées, cire végétale, fabrication artisanale française. Explorez les émotions en lumière.",
    images: ["https://www.lumilaya.fr/images/landing/logo.webp"],
  },
  robots: {
        index: true,
        follow: true,
    },

  alternates: {
    canonical: BASE_URL,
  },
};

const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // Balise Organization : Cruciale pour l'E-E-A-T (Entité, Logo, Réseaux)
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "LUMILAYA",
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/images/landing/logo.webp`,
        "width": 250,
        "height": 100
      },
      "sameAs": [
        // Remplacer ces URLs par tes liens réels
        "https://www.instagram.com/ton_instagram_lumilaya/",
        "https://www.facebook.com/ta_page_facebook_lumilaya"
      ]
    },
    {
      // Balise WebSite : Simple déclaration du site
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      "url": BASE_URL,
      "name": "LUMILAYA",
      "description": "Bougies naturelles parfumées artisanales françaises.",
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ballet?.variable ?? ''} antialiased overflow-x-hidden`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
