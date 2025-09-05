import MediaPlaceholder from "../../atoms/global/MediaPlaceholder";

export default function Preview({ media = [] }) {
    // Auto-detect variant based on media array length
    const isSingle = !Array.isArray(media) || media.length <= 1;
    const mediaArray = Array.isArray(media) ? media.slice(0, 3) : [media];

    if (isSingle) {
        const singleMedia = mediaArray[0] || {};

        return (
            <div
                data-block="project-preview"
                data-modifier="project-preview--single"
                className="md:h-global-xl-full w-full md:w-fit"
            >
                <MediaPlaceholder
                    constrainBy="width"
                    ariaLabel={singleMedia.alt || "Project preview image"}
                    className="w-full md:h-full md:w-auto"
                />
            </div>
        );
    }

    // Multi variant - pad with empty objects if needed, cap at 3
    const paddedMedia = [...mediaArray];
    while (paddedMedia.length < 3) {
        paddedMedia.push({});
    }

    return (
        <ul
            data-block="project-preview"
            data-modifier="project-preview--multi"
            className="gap-y-projects-preview-multi-gap md:gap-x-projects-preview-multi-gap md:h-global-xl-half flex w-full flex-col md:w-fit md:flex-row"
        >
            {paddedMedia.slice(0, 3).map((item, index) => (
                <li key={index}>
                    <MediaPlaceholder
                        constrainBy="width"
                        ariaLabel={
                            item.alt || `Project preview image ${index + 1}`
                        }
                        className="w-full md:h-full md:w-auto"
                    />
                </li>
            ))}
        </ul>
    );
}
