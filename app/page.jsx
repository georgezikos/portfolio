import FeaturedProjects from "@/app/components/molecules/home/FeaturedProjects";
import { getFeaturedMedia } from "@/lib/contentful";

// On-demand revalidation only (via Contentful webhook)
// This prevents automatic hourly rebuilds, saving massive bandwidth
export const revalidate = false;

// Metadata for SEO and performance
export const metadata = {
    title: "GEORGE ZIKOS",
    description:
        "George Zikos is an independent multidisciplinary designer and web developer based in Toronto.",
    openGraph: {
        title: "GEORGE ZIKOS",
        description:
            "George Zikos is an independent multidisciplinary designer and web developer based in Toronto.",
        url: "https://george-zikos.com",
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
};

export default async function Home() {
    // Fetch featured media from Contentful (server-side)
    const featuredMedia = await getFeaturedMedia();

    return (
        <div className="flex h-full flex-col justify-center">
            <FeaturedProjects
                as="main"
                projects={featuredMedia}
                className="grow overflow-hidden h-full"
            />
        </div>
    );
}
