import Body from "./section-content/Body";
import ExperienceList from "./section-content/ExperienceList";
import InfoListSection from "./section-content/InfoListSection";
import InfoList from "./InfoList"; // Import the direct InfoList component

export default function SectionContent({
    sectionType = "body",
    className = "",
    skillsData, // Add this for skills section
    multiClassName, // Add this for custom multi-paragraph classes
    ...props // Spread remaining props to pass to children
}) {
    const baseClassName = `w-full ${className}`;

    const renderContent = () => {
        switch (sectionType) {
            case "body":
                return <Body multiClassName={multiClassName} {...props} />;

            case "experiences":
                return <ExperienceList {...props} />;

            case "list":
                // Handle multiple skill areas from Contentful
                if (skillsData && skillsData.length > 0) {
                    // Use the same wrapper structure as InfoListSection
                    return (
                        <div
                            data-block="section-content-list"
                            className="gap-y-info-list-section-content-gap flex flex-col"
                        >
                            {skillsData.map((skillArea, index) => (
                                <InfoList
                                    key={index}
                                    title={skillArea.area}
                                    items={skillArea.skills.map((skill, skillIndex) => ({
                                        id: skillIndex,
                                        text: skill
                                    }))}
                                    numbered={false}
                                    headingLevel={props.headingLevel || 3}
                                />
                            ))}
                        </div>
                    );
                }
                return <InfoListSection {...props} />;

            default:
                return (
                    <Body content="No content available for this section type." />
                );
        }
    };

    return (
        <div
            data-block="info-section-content"
            data-modifier={`info-section-content--${sectionType}`}
            className={baseClassName}
        >
            {renderContent()}
        </div>
    );
}
