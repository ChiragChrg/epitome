import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThreeComp from "@/threeWorks/ThreeComp";

const poppins = localFont({
  src: [
    {
      path: "../assets/fonts/Poppins-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Poppins-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Poppins-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--Poppins",
});

const nulshock = localFont({
  src: "../assets/fonts/nulshock-bd.woff2",
  display: "swap",
  variable: "--Nulshock",
});

const vulgar = localFont({
  src: "../assets/fonts/vulgar-display.woff2",
  display: "swap",
  variable: "--Vulgar",
});

const valorant = localFont({
  src: "../assets/fonts/valorant.woff2",
  display: "swap",
  variable: "--Valorant",
});

const beyonders = localFont({
  src: "../assets/fonts/beyonders.woff2",
  display: "swap",
  variable: "--Beyonders",
});

const spaceAge = localFont({
  src: "../assets/fonts/spaceage.ttf",
  display: "swap",
  variable: "--SpaceAge",
});

const TITLE = "Epitome | AIMIT IT Fest 2024";
const DESCRIPTION = "some_description";
const BASE_URL = new URL("https://arms-v3.vercel.app/");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "EPITOME",
    "Epitome 2k24",
    "epitome",
    "AIMIT",
    "Aloysius",
    "IT Fest",
    "Epitome 2024",
    "2024",
    "chiragchrg",
    "chirag",
    "chrgchirag",
  ],
  authors: [{ name: "ChiragChrg" }, { url: "https://chiragchrg.netlify.app/" }],
  creator: "ChiragChrg",
  metadataBase: BASE_URL,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "TSsuy8j81zZ0Ge0aestKiwZUPydASWd9aANj-ITDack",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/Icons/144.png",
    shortcut: "/favicon.svg",
    apple: "/Icons/192.png",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: "Epitome 2K24",
    images: [
      {
        url: "/Icons/192.png",
        width: 192,
        height: 192,
        alt: "Epitome Logo",
      },
      {
        url: "/Icons/temp_wide_screenshot.png",
        width: 768,
        height: 359,
        alt: "Epitome Mockup Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@chrgchirag",
    images: ["/Icons/192.png", "/Icons/temp_wide_screenshot.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "hsl(0 0% 100%)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${nulshock.variable} ${vulgar.variable} ${valorant.variable} ${beyonders.variable} ${spaceAge.variable} antialiased bg-background text-foreground`}
      >
        <ThreeComp />
        {children}
      </body>
    </html>
  );
}
