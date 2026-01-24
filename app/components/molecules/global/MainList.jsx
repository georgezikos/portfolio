export default function MainList({
    numbered = false,
    items = [],
    className = "",
    ariaLabel = null,
}) {
    // Choose the right HTML element based on variant
    const defaultItems = [
        { id: 1, text: "List Item 01" },
        { id: 2, text: "List Item 02" },
        { id: 3, text: "List Item 03" },
        { id: 4, text: "List Item 04" },
        { id: 5, text: "List Item 05" },
        { id: 6, text: "List Item 06" },
        { id: 7, text: "List Item 07" },
        { id: 8, text: "List Item 08" },
        { id: 9, text: "List Item 09" },
        { id: 10, text: "List Item 10" },
    ];
    const listItems = items.length > 0 ? items : defaultItems;
    const ListElement = numbered ? "ol" : "ul";
    const dataModifier = numbered ? "main-list--numbered" : undefined;

    return (
        <ListElement
            className={`*:not-last:mb-main-list-gap-half *:not-first:mt-main-list-gap-half text-text-secondary flex flex-col ${className}`}
            data-block="main-list"
            data-modifier={dataModifier}
            aria-label={ariaLabel}
        >
            {listItems.map((item, index) => (
                <li
                    key={item.id || index}
                    data-element="main-list__list-item"
                    className="text-body-lg-main-list"
                >
                    {item.text}
                </li>
            ))}
        </ListElement>
    );
}
