import MediaPlaceholder from "../../atoms/global/MediaPlaceholder";

export default function ConnectedProject({
    cover,
    title,
    href = "#",
    className = "",
}) {
    const renderedProject =
        !cover && !title
            ? { cover: "", title: "Project description" }
            : { cover, title };
    return (
        <li data-block="connected-project" className={`list-none ${className}`}>
            <article>
                <a
                    href={href}
                    className="gap-y-connected-project-gap flex flex-col no-underline"
                    aria-label={`View project: ${renderedProject.title}`}
                >
                    <MediaPlaceholder
                        ariaLabel={`Cover image for ${renderedProject.title}`}
                    />
                    <h3
                        data-element="connected-project__description"
                        className="text-body-base-connected-title text-text-secondary"
                    >
                        {renderedProject.title}
                    </h3>
                </a>
            </article>
        </li>
    );
}
