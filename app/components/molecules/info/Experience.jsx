export default function Experience({
    company = "Company",
    role = "Role",
    startDate = "Start",
    endDate = "End",
    current = false, // Add support for current roles
}) {
    // Better date handling
    const dateRange = current
        ? `${startDate}–Present`
        : `${startDate}–${endDate}`;
    
    // Check if role is empty or just whitespace
    const hasRole = role && role.trim().length > 0;
    
    return (
        <li
            data-block="info-experience"
            className="gap-y-info-experience-gap flex flex-col"
        >
            <h4
                data-element="info-experience__company"
                className="text-heading-lg-info-experience text-text-primary"
            >
                {company}
            </h4>
            <p
                data-element="info-experience__role"
                className="text-caption-base-experience-role text-text-secondary"
            >
                {hasRole && <span>{role}</span>}
                {hasRole && <span aria-hidden="true">, </span>}
                <time
                    dateTime={
                        current ? `${startDate}/` : `${startDate}/${endDate}`
                    }
                >
                    {dateRange}
                </time>
            </p>
        </li>
    );
}
