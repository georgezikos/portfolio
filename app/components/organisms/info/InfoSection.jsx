import SectionContent from "../../molecules/info/SectionContent";

export default function InfoSection({
    heading = "Section",
    headingId,
    sectionType = "body",
    className = "",
    headingClassName = "",
    ariaLabel,
    headingLevel = 2,
    skillsData, // Add this for skills section
    multiClassName, // Add this for custom multi-paragraph classes
    ...contentProps
}) {
    // Generate unique IDs for accessibility (following ProjectSection pattern)
    const sectionId = `info-section-${headingId || heading?.toLowerCase().replace(/\s+/g, "-") || "untitled"}`;
    const headingElementId = headingId || `${sectionId}-heading`;
    const contentId = `${sectionId}-content`;

    // Proper React component for dynamic heading tag
    const HeadingTag = `h${headingLevel}`;

    // Prepare props for SectionContent based on section type
    const sectionContentProps = {
        id: contentId,
        sectionType: sectionType,
        className: "md:w-layout-right-constrained",
        headingLevel: headingLevel + 1,
        multiClassName: multiClassName, // Pass through the custom classes
        ...contentProps
    };

    // Add skills-specific props
    if (sectionType === "list" && skillsData) {
        sectionContentProps.skillsData = skillsData;
    }

    return (
        <section
            id={sectionId}
            data-block="info-section"
            className={`gap-y-info-section-row-gap md:gap-x-grid-gutter flex w-full flex-col md:flex-row ${className}`}
            aria-labelledby={headingElementId}
            aria-describedby={contentId}
            aria-label={ariaLabel} // Fallback if no heading provided
        >
            <HeadingTag
                id={headingElementId}
                data-element="info-section__heading"
                className={`text-heading-xl-info-section text-text-primary md:w-layout-left ${headingClassName}`}
            >
                {heading}
            </HeadingTag>
            <div
                data-element="info-section__container"
                className="w-full md:w-auto md:flex-1"
            >
                <SectionContent {...sectionContentProps} />
            </div>
        </section>
    );
}
