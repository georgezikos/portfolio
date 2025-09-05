import CategoryTag from "../../atoms/projects/CategoryTag";

export default function Taxonomy({
    tags = [],
    ariaLabel = "Project categories",
    className = "",
}) {
    const defaultTags = ["Body of Work", "UX/UI Design", "Web Development"];
    const tagsToRender = tags.length > 0 ? tags : defaultTags;

    return (
        <div
            data-block="taxonomy"
            className={`gap-y-taxonomy-row-gap gap-x-taxonomy-col-gap flex flex-wrap ${className}`}
            role="group"
            aria-label={ariaLabel}
        >
            {tagsToRender.map((tag, index) => (
                <CategoryTag key={index}>{tag}</CategoryTag>
            ))}
        </div>
    );
}
