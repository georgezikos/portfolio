import { Inter } from "next/font/google";
import "./globals.css";
import PageTransition from "@/app/components/atoms/global/PageTransition";

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
        <html lang="en" suppressHydrationWarning>
            <head>
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
            </head>
            <body className={`${inter.variable}`}>
                <PageTransition />
                {children}
            </body>
        </html>
    );
}
