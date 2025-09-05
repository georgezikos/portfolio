import MediaPlaceholder from "../../atoms/global/MediaPlaceholder";

export default function Media({
    placeholderProps = {
        className: "",
        aspectRatio: "aspect-16-9",
        mediaType: "media",
        ariaLabel: "media content placeholder",
        constrainBy: "width",
    },
    media = [],
    className = "",
}) {
    // Ensure we only render 1 or 2 items max
    const mediaToRender =
        media.length > 0
            ? media.slice(0, 2) // Take first 2 items max
            : [{}]; // Default single placeholder when no media

    const isSplit = mediaToRender.length > 1;

    return (
        <section
            data-block="project-media"
            data-modifier={
                isSplit ? "project-media--split" : "project-media--single"
            }
            className={`gap-x-grid-gutter gap-y-grid-gutter flex w-full flex-col sm:flex-row ${className}`}
            aria-label={`Project media gallery with ${mediaToRender.length} item${mediaToRender.length > 1 ? "s" : ""}`}
            aria-live="polite" // Announces when media loads
        >
            {mediaToRender.map((asset, index) => (
                <MediaPlaceholder
                    key={asset.id || `media-${index}`}
                    className={`${isSplit ? "flex-1" : "w-full"} ${placeholderProps.className}`}
                    aspectRatio={placeholderProps.aspectRatio}
                    mediaType={placeholderProps.mediaType}
                    ariaLabel={
                        asset.ariaLabel ||
                        `${placeholderProps.ariaLabel} ${index + 1} of ${mediaToRender.length}`
                    }
                    constrainBy={placeholderProps.constrainBy}
                />
            ))}
        </section>
    );
}
