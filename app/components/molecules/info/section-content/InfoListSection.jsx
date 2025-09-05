import InfoList from "../InfoList";

export default function InfoListSection({
    title = "List",
    items = [],
    numbered = false,
    className = "",
    ariaLabel = null,
    headingLevel = 3,
    describedBy = null,
}) {
    const defaultItems = [
        { id: 1, text: "Information item 01" },
        { id: 2, text: "Information item 02" },
        { id: 3, text: "Information item 03" },
        { id: 4, text: "Information item 04" },
        { id: 5, text: "Information item 05" },
    ];

    const listItems = items.length > 0 ? items : defaultItems;

    return (
        <div
            data-block="section-content-list"
            className={`gap-y-info-list-section-content-gap flex flex-col ${className}`}
        >
            <InfoList
                title={title}
                items={listItems}
                numbered={numbered}
                className="" // Let the child handle its own className
                ariaLabel={ariaLabel}
                headingLevel={headingLevel}
                describedBy={describedBy}
            />
        </div>
    );
}
