import Experience from "../Experience";

export default function ExperienceList({
    cv = "#",
    cta = "View CV",
    experiences = [],
}) {
    const defaultExperiences = [
        {
            id: 1,
            company: "Rewind Skin",
            role: "Product Designer",
            startDate: "2019",
            endDate: "",
            current: true,
        },
        {
            id: 2,
            company: "Canvas Cannabis",
            role: "Product Designer",
            startDate: "2019",
            endDate: "2024",
            current: false,
        },
    ];

    const renderedExperiences =
        experiences.length > 0 ? experiences : defaultExperiences;

    // Transform Contentful data to match Experience component props
    const transformedExperiences = renderedExperiences.map((exp, index) => ({
        id: exp.id || index,
        company: exp.company,
        role: exp.role,
        startDate: exp.start || exp.startDate, // Handle both field names
        endDate: exp.end || exp.endDate, // Handle both field names
        current: exp.current || false,
    }));

    return (
        <div
            data-block="section-content-experience"
            className="gap-y-experience-list-section-content-gap flex flex-col"
            aria-labelledby="experience-heading"
        >
            <h3 id="experience-heading" className="sr-only">
                Work Experience
            </h3>
            <ul
                className="gap-y-experience-list-section-content-gap flex flex-col"
                role="list"
                aria-label="Professional experience timeline"
            >
                {transformedExperiences.map((experience, index) => (
                    <Experience
                        key={experience.id || index}
                        company={experience.company}
                        role={experience.role}
                        startDate={experience.startDate}
                        endDate={experience.endDate}
                        current={experience.current}
                    />
                ))}
            </ul>
            <a
                className="text-link-base-showcase-cv text-text-primary hover:text-link-primary-hover active:text-link-primary-hover focus-visible:text-link-primary-hover w-fit no-underline transition-colors duration-200 ease-in-out"
                data-element="section-content-experience__link"
                href={cv}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${cta} (opens in new tab)`}
            >
                {cta}
            </a>
        </div>
    );
}
