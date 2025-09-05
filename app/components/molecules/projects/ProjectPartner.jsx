// Need to handle for inline-linking

export default function ProjectPartner({
    className = "",
    partner = null,
    fallbackPartner = {
        role: "Role",
        partners: [
            { name: "Partner 01", url: "" },
            { name: "Partner 02", url: "" },
        ],
    },
}) {
    const partnerData = partner || fallbackPartner;
    const { role, partners = [] } = partnerData;
    const hasAnyPartners = partners.length > 0;

    if (!hasAnyPartners) {
        return null;
    }

    // Helper function to parse partner name with delimiters
    function parsePartnerName(nameString) {
        if (!nameString) return { linkText: nameString, displayText: nameString };
        
        // Using pipe delimiters |Link Text| with surrounding text
        const pipeMatch = nameString.match(/^(.*?)\|([^|]+)\|(.*?)$/);
        if (pipeMatch) {
            const prefix = pipeMatch[1];
            const linkText = pipeMatch[2].trim();
            const suffix = pipeMatch[3];
            const displayText = `${prefix}${linkText}${suffix}`.trim();
            
            return {
                linkText: linkText,
                displayText: displayText
            };
        }
        
        // Fallback: no delimiters found, use full text for both
        return { linkText: nameString, displayText: nameString };
    }

    return (
        <li
            data-block="project-partner"
            className={`${className}`}
        >
            {/* Use a definition list structure for role-partner relationship */}
            <dl className="gap-y-project-partner-gap flex flex-col">
                <dt
                    data-element="project-partner__role"
                    className="text-heading-base-project-partner-role text-text-secondary"
                >
                    {role}
                </dt>

                {partners.map((partnerItem, index) => (
                    <dd
                        key={
                            partnerItem.id ||
                            partnerItem.name ||
                            `partner-${index}`
                        }
                        data-element="project-partner__name"
                        className="text-link-base-project-partner text-text-primary"
                    >
                        {partnerItem.url ? (
                            <>
                                {/* Split the display text and only link the linkText portion */}
                                {(() => {
                                    const displayText = partnerItem.name;
                                    const linkText = partnerItem.linkText || partnerItem.name;
                                    
                                    // Find where the link text appears in the display text
                                    const linkIndex = displayText.indexOf(linkText);
                                    
                                    if (linkIndex === -1) {
                                        // Fallback: just link the whole thing
                                        return (
                                            <a
                                                href={partnerItem.url}
                                                target={partnerItem.external ? "_blank" : "_self"}
                                                rel={partnerItem.external ? "noopener noreferrer" : undefined}
                                            >
                                                {displayText}
                                            </a>
                                        );
                                    }
                                    
                                    const before = displayText.substring(0, linkIndex);
                                    const after = displayText.substring(linkIndex + linkText.length);
                                    
                                    return (
                                        <>
                                            {before}
                                            <a
                                                href={partnerItem.url}
                                                target={partnerItem.external ? "_blank" : "_self"}
                                                rel={partnerItem.external ? "noopener noreferrer" : undefined}
                                            >
                                                {linkText}
                                            </a>
                                            {after}
                                        </>
                                    );
                                })()}
                            </>
                        ) : (
                            partnerItem.name
                        )}
                    </dd>
                ))}
            </dl>
        </li>
    );
}
