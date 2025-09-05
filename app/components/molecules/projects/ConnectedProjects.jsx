import ConnectedProject from "./ConnectedProject";

// Receive array - need to destructure props properly
export default function ConnectedProjects({
    projects = [],
    ariaLabel = "Connected projects",
    className = "",
    projectClassName = "",
}) {
    const defaultProjects = [
        {
            id: "default-1",
            projectTitle: "Project description",
            projectPreview: "#",
        },
        {
            id: "default-2",
            projectTitle: "Project description",
            projectPreview: "#",
        },
        {
            id: "default-3",
            projectTitle: "Project description",
            projectPreview: "#",
        },
        {
            id: "default-4",
            projectTitle: "Project description",
            projectPreview: "#",
        },
        {
            id: "default-5",
            projectTitle: "Project description",
            projectPreview: "#",
        },
    ];

    const renderedProjects = projects.length < 1 ? defaultProjects : projects;

    return (
        <ul
            data-block="connected-projects"
            className={`gap-x-connected-projects-col-gap gap-y-connected-projects-row-gap sm:gap-x-grid-gutter flex ${className}`}
            role="list"
            aria-label={ariaLabel}
        >
            {renderedProjects.map((project, index) => (
                <ConnectedProject
                    key={project.id || `project-${index}`}
                    title={project.projectTitle}
                    cover={project.projectPreview}
                    href={project.href || "#"}
                    className={projectClassName}
                />
            ))}
        </ul>
    );
}
