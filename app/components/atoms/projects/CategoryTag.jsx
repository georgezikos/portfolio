export default function CategoryTag({ children }) {
    // Will dynamically output project category titles from CMS
    return (
        <span
            className="text-label-base-project-tag text-text-secondary bg-surface-secondary px-tag-padding-x py-tag-padding-y rounded-pill inline-block"
            role="tag"
            aria-label={`Category: ${children}`}
            data-block="category-tag"
        >
            {children}
        </span>
    );
}
