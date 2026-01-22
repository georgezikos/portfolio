import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/organisms/global/LayoutWrapper";
import PageTransition from "@/app/components/atoms/global/PageTransition";
import { TransitionProvider } from "@/app/context/TransitionContext";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: "variable",
    display: "swap",
});

export const metadata = {
    metadataBase: new URL("https://george-zikos.com"),
    title: "GEORGE ZIKOS",
    description:
        "George Zikos is an independent multidisciplinary designer and web developer based in Toronto.",
    keywords: [
        "product designer",
        "UX designer",
        "UI designer",
        "design portfolio",
        "web developer",
        "front-end developer",
    ],
    authors: [{ name: "George Zikos" }],
    creator: "George Zikos",
    openGraph: {
        type: "website",
        locale: "en",
        url: "https://george-zikos.com",
        siteName: "George Zikos Portfolio",
        title: "GEORGE ZIKOS",
        description:
            "George Zikos is an independent multidisciplinary designer and web developer based in Toronto.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "George Zikos Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "GEORGE ZIKOS",
        description:
            "George Zikos is an independent multidisciplinary designer and web developer based in Toronto.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "/",
    },
    manifest: "/site.webmanifest",
    icons: {
        icon: [
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }) {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "George Zikos",
        jobTitle: "Product Designer",
        description:
            "George Zikos is an independent multidisciplinary designer and web developer based in Toronto.",
        url: "https://george-zikos.com",
        sameAs: ["https://ca.linkedin.com/in/george-zikos"],
        knowsAbout: [
            "Product Design",
            "UX Design",
            "UI Design",
            "Web Development",
            "Front-end Development",
        ],
        workLocation: {
            "@type": "Place",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Toronto",
                addressCountry: "CA",
            },
        },
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Preconnect to Contentful CDN for faster image loading */}
                <link rel="preconnect" href="https://images.ctfassets.net" />
                <link rel="dns-prefetch" href="https://images.ctfassets.net" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                try {
                  // Smart Sync: prioritize OS, but respect manual overrides
                  var osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var osTheme = osPrefersDark ? 'dark' : 'light';
                  var savedTheme = localStorage.getItem('theme');
                  var theme;
                  
                  if (savedTheme && savedTheme !== osTheme) {
                    // User has manually overridden OS preference
                    console.log('[Theme] User override active:', savedTheme, '(OS is', osTheme + ')');
                    theme = savedTheme;
                  } else {
                    // Follow OS preference (no override or override matches OS)
                    console.log('[Theme] Following OS preference:', osTheme);
                    theme = osTheme;
                    // Clear saved preference if it matches OS (user is now in sync)
                    if (savedTheme === osTheme) {
                      localStorage.removeItem('theme');
                    }
                  }
                  
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  console.error('[Theme] Error:', e);
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(personSchema),
                    }}
                />
            </head>
            <body className={`${inter.variable}`}>
                <TransitionProvider>
                    <PageTransition />
                    <LayoutWrapper>{children}</LayoutWrapper>
                </TransitionProvider>
                <SpeedInsights />
                {process.env.NODE_ENV === "production" && (
                    <Script
                        strategy="afterInteractive"
                        src="https://cloud.umami.is/script.js"
                        data-website-id="42757c2e-0be5-4057-9530-30d7e023ecfe"
                        data-domains="george-zikos.com,www.george-zikos.com"
                    />
                )}
            </body>
        </html>
    );
}
