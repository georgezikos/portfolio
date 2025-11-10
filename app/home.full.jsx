import Header from "@/app/components/organisms/global/Header";
import FeaturedProjects from "@/app/components/molecules/home/FeaturedProjects";

export default function Home() {
    return (
        <main
            data-block="home-content"
            className="px-grid-margin pt-global-top-margin pb-global-btm-margin gap-y-home-row-gap-base flex min-h-screen grow flex-col justify-end"
        >
            <Header role="banner" />
            <FeaturedProjects />
        </main>
    );
}
