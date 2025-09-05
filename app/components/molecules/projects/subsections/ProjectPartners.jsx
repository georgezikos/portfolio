import ProjectPartner from "../ProjectPartner";

export default function ProjectPartners({ partners = [] }) {
    const fallbackPartners = Array.from({ length: 4 }, (_, index) => (
        <ProjectPartner key={`fallback-${index}`} />
    ));

    const hasRealData = partners.length > 0;

    return (
        <ul
            data-block="project-partners"
            className="gap-y-project-partners-gap flex flex-col"
            role="list"
            aria-label={
                hasRealData
                    ? "Project partners and collaborators"
                    : "Loading project partners"
            }
        >
            {hasRealData
                ? partners.map((partner, index) => (
                      <ProjectPartner
                          key={partner.id || partner.role || `partner-${index}`}
                          partner={partner}
                      />
                  ))
                : fallbackPartners}
        </ul>
    );
}
