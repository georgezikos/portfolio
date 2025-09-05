import Header from "@/app/components/organisms/global/Header";
import Footer from "@/app/components/molecules/global/Footer";
import FeaturedProject from "@/app/components/organisms/projects/FeaturedProject";
import { getAllProjects, parseSlugWithClient } from "@/lib/contentful";

export default async function WorkIndex() {
    // Fetch all projects from Contentful
    const projects = await getAllProjects();

    // Transform projects data for the FeaturedProject components
    const transformedProjects = projects.map((project) => {
        const { clientSlug, projectSlug } = parseSlugWithClient(
            project.fields.slug,
            project.fields.client,
        );

        return {
            client: project.fields.client,
            title: project.fields.projectLede, // Using projectLede for title
            tags: project.fields.roles || [], // Using roles for tags
            media: [], // Keep as placeholder for now
            href: `/work/${clientSlug}/${projectSlug}`, // Add href for linking to individual projects
        };
    });

    // Static navigation and contact info
    const navigationLinks = [
        { label: "Work", href: "/work", current: true },
        { label: "Information", href: "/information" },
    ];
    
    const contact = "info@george-zikos.com";

    return (
        <div className="px-grid-margin pt-global-top-margin pb-global-btm-margin gap-y-global-xl-full flex min-h-screen flex-col">
            <Header
                role="banner"
                navigationLinks={navigationLinks}
                currentPath="/work"
            />
            <main data-block="work-main" className="grow">
                <ul
                    className="gap-y-work-main-row-gap flex flex-col"
                    aria-label="Featured projects portfolio"
                >
                    {transformedProjects.map((project, index) => (
                        <FeaturedProject
                            key={`${project.client}-${index}`}
                            client={project.client}
                            title={project.title}
                            tags={project.tags}
                            media={project.media}
                            href={project.href} // Pass the href to make projects clickable
                        />
                    ))}
                </ul>
            </main>
            <Footer role="contentinfo" contact={contact} />
        </div>
    );
}
