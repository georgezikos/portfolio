import ProjectSubsection from "../../molecules/projects/ProjectSubsection";

export default function ProjectSection({
    // Content props
    subheading = "Subheading",
    heading = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body = (
        <p className="text-body-lg-main text-text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            sollicitudin, massa vitae molestie interdum, purus neque blandit
            libero, quis egestas velit dolor sed ipsum. Suspendisse potenti.
            Nunc placerat at lorem vel lacinia. Praesent vehicula nunc a justo
            dictum, sit amet rhoncus erat vehicula. Vivamus posuere ante vitae
            nisl feugiat tempus. Donec scelerisque orci tincidunt, egestas risus
            ut, facilisis mauris. Integer congue felis dignissim, ultricies odio
            a, feugiat quam. Morbi quis augue in nibh sollicitudin luctus sit
            amet vel neque. Integer a tempus justo. Integer ut venenatis nibh.
        </p>
    ),
    ctaText,
    ctaHref = "#",
    ctaExternal = false,

    // Subsection props
    hasSubsections = true,
    subsections = [
        {
            id: "default-subsection",
            title: "Subsection",
            type: "list",
            data: [
                { id: 1, text: "Item 1" },
                { id: 2, text: "Item 2" },
            ],
            numbered: true,
            className: "",
        },
    ],

    // Accessibility props
    ariaLabel,
    headingId,

    // Layout props
    className = "",

    // Optional semantic customization
    as = "section",
}) {
    // Generate unique IDs for accessibility
    const sectionId = `project-section-${headingId || heading?.toLowerCase().replace(/\s+/g, "-") || "untitled"}`;
    const headingElementId = `${sectionId}-heading`;
    const bodyId = `${sectionId}-body`;

    const SectionElement = as;

    // Determine if subsections should be rendered
    const shouldRenderSubsections =
        hasSubsections && subsections && subsections.length > 0;

    return (
        <SectionElement
            id={sectionId}
            className={`gap-y-project-section-gap flex flex-col ${className}`}
            data-block="project-section"
            aria-labelledby={headingElementId}
            aria-describedby={body ? bodyId : undefined}
            aria-label={ariaLabel}
        >
            <div
                className="gap-y-project-section-main-gap flex flex-col"
                data-element="project-section__main"
            >
                {(subheading || heading) && (
                    <header
                        className="gap-y-project-heading-group-gap flex flex-col"
                        data-element="project-section__heading-group"
                    >
                        {subheading && (
                            <h2
                                data-element="project-section__subheading"
                                className="text-label-base-project-section text-text-secondary"
                            >
                                {subheading}
                            </h2>
                        )}
                        {heading && (
                            <h3
                                id={headingElementId}
                                data-element="project-section__heading"
                                className="text-heading-xl-project-section text-text-primary"
                            >
                                {heading}
                            </h3>
                        )}
                    </header>
                )}

                {body}
            </div>

            {/* Render subsections dynamically */}
            {shouldRenderSubsections &&
                subsections.map((subsection, index) => (
                    <ProjectSubsection
                        key={subsection.id || `subsection-${index}`}
                        type={subsection.type}
                        data={subsection.data}
                        headingLevel={4} // One level below the main heading (h3)
                        numbered={subsection.numbered}
                        className={subsection.className}
                    >
                        {subsection.title}
                    </ProjectSubsection>
                ))}

            {/* Call-to-action link */}
            {ctaText && ctaHref && (
                <a
                    href={ctaHref}
                    className="text-text-primary text-link-base-showcase-cv w-fit"
                    data-element="project-section__link"
                    {...(ctaExternal && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                        "aria-describedby": `${sectionId}-external-link-desc`,
                    })}
                >
                    {ctaText}
                    {ctaExternal && (
                        <>
                            <span aria-hidden="true"> ↗</span>
                            <span
                                id={`${sectionId}-external-link-desc`}
                                className="sr-only"
                            >
                                (opens in a new tab)
                            </span>
                        </>
                    )}
                </a>
            )}
        </SectionElement>
    );
}
