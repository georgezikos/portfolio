import MainList from "../global/MainList";
import ProjectPartners from "./subsections/ProjectPartners";
import ProjectResults from "./subsections/ProjectResults";
import SectionSubheading from "../../atoms/projects/SectionSubheading";

export default function ProjectSubsection({
    type = null, // Now optional - can be inferred
    children, // Now using children instead of heading
    data = [],
    className = "",
    headingLevel = 4,
    numbered = false, // Direct prop for MainList
}) {
    // Function to infer type from data structure
    const inferTypeFromData = (data) => {
        if (!Array.isArray(data) || data.length === 0) {
            return "list"; // Default fallback
        }

        const firstItem = data[0];

        // Check for ProjectPartners structure
        if (firstItem.role && firstItem.partners) {
            return "partners";
        }

        // Check for ProjectResults structure
        if (firstItem.metric && firstItem.improvement) {
            return "results";
        }

        // Default to list for anything else
        return "list";
    };

    // Use provided type or infer from data
    const actualType = type || inferTypeFromData(data);

    // Function to render the correct content based on type
    const renderContent = () => {
        switch (actualType) {
            case "list":
                return (
                    <MainList
                        items={data}
                        ariaLabel={`${children} list`}
                        numbered={numbered}
                    />
                );
            case "partners":
                return <ProjectPartners partners={data} />;
            case "results":
                return <ProjectResults results={data} />;
            default:
                console.warn(`Unknown ProjectSubsection type: ${actualType}`);
                return null;
        }
    };

    // Generate unique ID for accessibility
    // Convert children to string for ID generation
    const headingText = typeof children === "string" ? children : "section";
    const sectionId = `project-subsection-${actualType}-${headingText.toLowerCase().replace(/\s+/g, "-")}`;

    return (
        <section
            id={sectionId}
            data-block="project-subsection"
            data-modifier={`project-subsection--${actualType}`}
            className={`gap-y-project-subsection-gap flex w-full flex-col ${className}`}
            aria-labelledby={`${sectionId}-heading`}
        >
            <SectionSubheading level={headingLevel}>
                <span id={`${sectionId}-heading`}>{children}</span>
            </SectionSubheading>
            {renderContent()}
        </section>
    );
}
