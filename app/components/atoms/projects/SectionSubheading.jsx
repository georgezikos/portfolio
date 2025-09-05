export default function SectionSubheading({
    children,
    level = 4,
    className = "",
}) {
    const HeadingTag = `h${level}`;

    return (
        <header
            className={`pb-subheading-container-pb border-border-primary text-text-secondary w-full border-b-(length:--border-width-hairline) border-solid ${className}`}
            data-block="subheading-container"
        >
            <HeadingTag
                className="text-label-base-project-section"
                data-element="subheading-container__heading"
            >
                {children}
            </HeadingTag>
        </header>
    );
}
