import MainList from "../global/MainList";

export default function InfoList({
    title = "List",
    items = [],
    numbered = false,
    className = "",
    headingClassName = "",
    ariaLabel = null,
    headingLevel = 3,
    describedBy = null, // For additional description
}) {
    const defaultItems = [
        { id: 1, text: "Information item 01" },
        { id: 2, text: "Information item 02" },
        { id: 3, text: "Information item 03" },
        { id: 4, text: "Information item 04" },
        { id: 5, text: "Information item 05" },
    ];

    const listItems = items.length > 0 ? items : defaultItems;
    const HeadingElement = `h${headingLevel}`;
    const headingId = `info-list-${title.toLowerCase().replace(/\s+/g, "-")}-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div
            data-block="info-list"
            className={`gap-y-info-list-gap flex flex-col ${className}`}
            aria-labelledby={headingId}
            aria-describedby={describedBy}
        >
            <HeadingElement
                id={headingId}
                data-element="info-list__heading"
                className={`text-heading-xl-info-subsection text-text-primary ${headingClassName}`}
            >
                {title}
            </HeadingElement>
            <MainList
                items={listItems}
                numbered={numbered}
                ariaLabel={ariaLabel || `${title}: ${listItems.length} items`}
            />
        </div>
    );
}
