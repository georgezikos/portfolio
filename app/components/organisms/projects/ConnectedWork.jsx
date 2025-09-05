import ConnectedProjects from "../../molecules/projects/ConnectedProjects";

export default function ConnectedWork({
    projects = [],
    heading = "Connected Work",
    ariaLabel = "Connected projects",
    className = "",
    headingLevel = "h2",
}) {
    const HeadingTag = headingLevel;

    return (
        <section
            data-block="connected-work"
            className={`gap-y-connected-work-gap md:gap-x-grid-gutter flex w-full flex-col md:flex-row ${className}`}
            aria-labelledby="connected-work-heading"
        >
            <HeadingTag
                id="connected-work-heading"
                data-element="connected-work__heading"
                className="text-heading-base-project-connected text-text-primary md:w-layout-left"
            >
                {heading}
            </HeadingTag>
            <ConnectedProjects
                projects={projects}
                ariaLabel={ariaLabel}
                className="pb-capsize-clearance w-full flex-nowrap overflow-x-scroll md:w-auto md:flex-1 md:flex-wrap"
                projectClassName="w-full flex-shrink-0 sm:w-flex-50 mdlg:w-flex-33 xl:w-flex-25"
            />
        </section>
    );
}
