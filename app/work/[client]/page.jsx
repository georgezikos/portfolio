import Header from "@/app/components/organisms/global/Header";
import Footer from "@/app/components/molecules/global/Footer";
import FeaturedProject from "@/app/components/organisms/projects/FeaturedProject";
import { getAllClients, getProjectsByClientSlug, getClientNameFromSlug, parseSlugWithClient } from "@/lib/contentful";
import { notFound } from "next/navigation";

// Generate static params for all clients
export async function generateStaticParams() {
    const clients = await getAllClients();
    
    // Convert client names to slugs for URL generation
    return clients.map((clientName) => ({
        client: clientName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    }));
}

export default async function ClientIndex({ params }) {
    const { client: clientSlug } = params;
    
    // Get the actual client name from the slug
    const clientName = await getClientNameFromSlug(clientSlug);
    
    if (!clientName) {
        notFound();
    }
    
    // Fetch projects for this specific client
    const projects = await getProjectsByClientSlug(clientSlug);
    
    // Transform projects data for the FeaturedProject components
    const transformedProjects = projects.map((project) => {
        const { clientSlug: projClientSlug, projectSlug } = parseSlugWithClient(
            project.fields.slug,
            project.fields.client
        );
        
        return {
            client: project.fields.client,
            title: project.fields.projectLede,
            tags: project.fields.roles || [],
            media: [], // Keep as placeholder for now
            href: `/work/${projClientSlug}/${projectSlug}`,
        };
    });

    return (
        <div className="px-grid-margin pt-global-top-margin pb-global-btm-margin gap-y-global-xl-full flex min-h-screen flex-col">
            <Header
                role="banner"
                navigationLinks={[
                    { label: "Work", href: "/work" },
                    { label: "Information", href: "/information" },
                ]}
                currentPath={`/work/${clientSlug}`}
            />
            <main data-block="work-main" className="grow">
                <ul
                    className="gap-y-work-main-row-gap flex flex-col"
                    aria-label={`${clientName} projects portfolio`}
                >
                    {transformedProjects.map((project, index) => (
                        <FeaturedProject
                            key={`${project.client}-${index}`}
                            client={project.client}
                            title={project.title}
                            tags={project.tags}
                            media={project.media}
                            href={project.href}
                        />
                    ))}
                </ul>
            </main>
            <Footer role="contentinfo" contact="info@george-zikos.com" />
        </div>
    );
}
