import Header from "@/app/components/organisms/global/Header";
import Footer from "@/app/components/molecules/global/Footer";
import FeaturedProjects from "@/app/components/molecules/home/FeaturedProjects";
import { getFeaturedMedia } from "@/lib/contentful";

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

// Metadata for SEO and performance
export const metadata = {
    title: "Portfolio | Featured Work",
    description: "Explore featured creative projects and design work",
};

export default async function Home() {
    // Fetch featured media from Contentful (server-side)
    const featuredMedia = await getFeaturedMedia();

    return (
        <main
            data-block="home-content"
            className="px-grid-margin pt-global-top-margin pb-global-btm-margin flex h-screen min-h-[640px] grow flex-col justify-between"
        >
            <Header showNav={false} />
            <FeaturedProjects
                projects={featuredMedia}
                className="max-h-[80%] grow overflow-hidden"
            />
            <Footer />
        </main>
    );
}
