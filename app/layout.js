import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "variable",
  display: "swap",
});

export const metadata = {
  title: "GEORGE ZIKOS",
  description: "Product design portfolio showcasing UX/UI design work",
  openGraph: {
    title: "GEORGE ZIKOS - Product Designer",
    description: "Product design portfolio showcasing UX/UI design work",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GEORGE ZIKOS - Product Designer",
    description: "Product design portfolio showcasing UX/UI design work",
  },
  // metadataBase: new URL('https://yourdomain.com'),
  // alternates: {
  //   canonical: '/',
  // },
  // other: {
  //   link: [
  //     { rel: "preload", href: "/hero-image.jpg", as: "image" }, // Actual hero image
  //     { rel: "preload", href: "/critical-data.json", as: "fetch" }, // API data
  //   ]
  // },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>{children}</body>
    </html>
  );
}
