export default function MediaPlaceholder({
    className = "",
    aspectRatio = "aspect-16-9",
    mediaType = "media",
    ariaLabel = "media content placeholder",
    constrainBy = "width",
    as = "div", // Add this prop
}) {
    const defaultAriaLabel = `${mediaType === "media" ? "media" : mediaType} content loading`;
    const finalAriaLabel = ariaLabel || defaultAriaLabel;
    const sizeClass = constrainBy === "height" ? "h-full" : "w-full";
    const Component = as;

    return (
        <Component
            className={`${aspectRatio} bg-surface-secondary rounded-base ${sizeClass} ${className}`}
            role="img" // Standard ARIA role for media placeholders
            aria-label={finalAriaLabel}
            aria-busy="true" // Indicates content is loading
            data-block="media-placeholder"
            data-media-type={mediaType} // Move mediaType to data attribute
        />
    );
}
