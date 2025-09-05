import Taxonomy from "../../molecules/projects/Taxonomy";

export default function Meta({
    client = "Client",
    title = "Project title/description",
    tags = [],
    titleId, // Add this prop
    as = "div", // New prop to control the element type
    className = "",
    titleClassName = "", // New prop for h2 classes
    ...rest
}) {
    // Create the dynamic element
    const Element = as;

    return (
        <Element
            className={`gap-y-projects-meta-row-gap flex w-full flex-col ${className}`}
            role="group"
            aria-label="Project information"
            data-block="project-meta"
            {...rest}
        >
            <h2
                id={titleId}
                className={`text-body-base-project-title text-text-secondary order-2 ${titleClassName}`}
                data-element="project-meta__title"
            >
                {title}
            </h2>
            <h3
                className="text-heading-base-project-client text-text-primary order-1"
                data-element="project-meta__client"
            >
                {client}
            </h3>
            <Taxonomy className="order-3" tags={tags} />
        </Element>
    );
}
