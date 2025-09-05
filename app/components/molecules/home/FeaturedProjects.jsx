import MediaPlaceholder from "../../atoms/global/MediaPlaceholder";

export default function FeaturedProjects({
    projects = [],
    className = "",
    mediaPlaceholderClassName = "", // Global class for all MediaPlaceholders
    fallbackProjects = [
        { aspectRatio: "aspect-16-9", id: "fallback-1" },
        { aspectRatio: "aspect-golden", id: "fallback-2" },
        { aspectRatio: "aspect-ig", id: "fallback-3" },
        { aspectRatio: "aspect-2-1", id: "fallback-4" },
    ],
}) {
    // Use provided projects or fallback to default placeholders
    const displayProjects = projects.length > 0 ? projects : fallbackProjects;
    return (
        <section
            className={`h-home-featured w-full ${className}`}
            data-block="featured-projects"
            aria-labelledby="featured-projects-heading"
            role="region"
        >
            {/* Add a visually hidden heading for accessibility */}
            <h2 id="featured-projects-heading" className="sr-only">
                Featured Projects
            </h2>

            <ul className="gap-x-grid-gutter flex h-full w-full overflow-x-scroll">
                {displayProjects.map((project, index) => (
                    <MediaPlaceholder
                        key={project.id || project.slug || `project-${index}`}
                        aspectRatio={project.aspectRatio || "aspect-16-9"}
                        constrainBy="height"
                        className={`${project.className || ""} ${mediaPlaceholderClassName}`}
                        mediaType={project.mediaType || "media"}
                        as="li"
                        ariaLabel={
                            project.title
                                ? `${project.title} project preview`
                                : `Project ${index + 1} preview`
                        }
                    />
                ))}
            </ul>
        </section>
    );
}
