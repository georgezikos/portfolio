import Header from "@/app/components/organisms/global/Header";
import ConnectedWork from "@/app/components/organisms/projects/ConnectedWork";
import Meta from "@/app/components/organisms/projects/Meta";
import Media from "@/app/components/molecules/projects/Media";
import ProjectSection from "@/app/components/organisms/projects/ProjectSection";
import ProjectSubsection from "@/app/components/molecules/projects/ProjectSubsection"; // Add this import
import Footer from "@/app/components/molecules/global/Footer";

// Add this new renderer for project section content
function renderProjectSectionContent(richTextDocument) {
    if (!richTextDocument) return "";

    const sectionRichTextOptions = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => (
                <p className="text-body-lg-main">{children}</p>
            ),
            // Add other block types as needed
        },
    };

    return documentToReactComponents(richTextDocument, sectionRichTextOptions);
}

// Add this new renderer for process and impact body content
function renderProcessImpactBody(richTextDocument) {
    if (!richTextDocument) return "";

    const processImpactRichTextOptions = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => (
                <p
                    data-element="project-section__body"
                    className="text-body-lg-main text-text-secondary"
                >
                    {children}
                </p>
            ),
            // Add other block types as needed
        },
    };

    return documentToReactComponents(
        richTextDocument,
        processImpactRichTextOptions,
    );
}

// Helper function to format completion date
function formatCompletionDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
}

// Update your transformProjectData function to handle partners and connected work:
function transformProjectData(contentfulProject) {
    if (!contentfulProject) return {};

    const fields = contentfulProject.fields;
    const isBodyOfWork = !fields.projectType;

    return {
        meta: {
            client: fields.client || "Client",
            title: fields.projectLede || "Project title/description",
            tags: fields.roles || [],
        },
        background: fields.background
            ? renderProjectBackground(fields.background)
            : "Project description not available.",
        media: {
            // Main media
        },
        // Partners data (for Individual Projects only)
        partners:
            !isBodyOfWork && fields.partners
                ? fields.partners.map((partnerGroup) => ({
                      role: partnerGroup.role,
                      partners: Array.isArray(partnerGroup.name)
                          ? partnerGroup.name.map((name, index) => ({
                                name: name,
                                url: partnerGroup.website?.[index] || "",
                                external: partnerGroup.website?.[index]
                                    ? true
                                    : false,
                            }))
                          : [
                                {
                                    name: partnerGroup.name,
                                    url: partnerGroup.website || "",
                                    external: partnerGroup.website
                                        ? true
                                        : false,
                                },
                            ],
                  }))
                : [],

        // Connected Work data (for all projects)
        connectedWork: {
            projects:
                fields.connectedWork?.map((connectedProject) => {
                    const { clientSlug, projectSlug } = parseSlugWithClient(
                        connectedProject.fields.slug,
                        connectedProject.fields.client,
                    );
                    return {
                        id: connectedProject.sys.id,
                        projectTitle: connectedProject.fields.projectLede, // Using projectLede for title
                        href: `/work/${clientSlug}/${projectSlug}`,
                        projectPreview: "#", // Static for now as requested
                    };
                }) || [],
            heading: "Connected Work",
        },

        // Map the specific challenge and solution fields
        challengeHeading: fields.challengeHeading || "Challenge",
        challengeContent: fields.challengeBody
            ? renderProjectSectionContent(fields.challengeBody)
            : "",
        challengeObjectives: fields.challengeObjectives || [],

        solutionHeading: fields.solutionHeading || "Solution",
        solutionContent: fields.solutionBody
            ? renderProjectSectionContent(fields.solutionBody)
            : "",

        // Add the new process and impact fields
        processHeading: fields.processHeading || "Our Process",
        processContent: fields.processBody
            ? renderProcessImpactBody(fields.processBody)
            : "",

        impactHeading: fields.impactHeading || "The Impact",
        impactContent: fields.impactBody
            ? renderProcessImpactBody(fields.impactBody)
            : "",
        impactResults: fields.impactResults || [], // This should be the JSON array from Contentful

        // For Body of Work - map the connected work items
        bodyOfWorkProjects:
            isBodyOfWork && fields.connectedWork
                ? fields.connectedWork.map((project, index) => {
                      const { clientSlug, projectSlug } = parseSlugWithClient(
                          project.fields.slug,
                          project.fields.client,
                      );

                      return {
                          id: project.sys.id,
                          subheading: formatCompletionDate(
                              project.fields.completionDate,
                          ),
                          heading:
                              project.fields.project || `Project ${index + 1}`, // Using 'project' field for title
                          content: project.fields.bodyOfWorkDescription || "",
                          highlights: project.fields.bodyOfWorkHighlights || [],
                          ctaHref: `/work/${clientSlug}/${projectSlug}`,
                      };
                  })
                : [],
    };
}

export default function Project({ isBodyOfWork = true, projectData = {} }) {
    // Destructure project data with defaults
    const {
        meta = {
            client: "Client",
            title: "Project title/description",
            tags: [],
        },
        background = "Lorem ipsum dolor sit amet...",
        media = {},
        connectedWork = {
            projects: [],
            heading: "Connected Work",
        },
        // Updated field names
        challengeHeading = "Challenge",
        challengeContent = "",
        challengeObjectives = [],
        solutionHeading = "Solution",
        solutionContent = "",
        bodyOfWorkProjects = [],
        processHeading = "Our Process",
        processContent = "",
        impactHeading = "The Impact",
        impactContent = "",
        impactResults = [], // Keep only this one, remove the duplicate
        partners = [],
    } = projectData;

    // Common sections that appear in both variants
    const renderCommonSections = () => (
        <>
            {/* Challenge Section */}
            <ProjectSection
                subheading="Challenge"
                heading={challengeHeading}
                body={challengeContent} // Changed from 'content' to 'body'
                hasSubsections={true}
                subsections={[
                    {
                        id: "challenge-objectives",
                        title: "Objectives",
                        type: "list",
                        numbered: true, // Added this for numbered list
                        data: challengeObjectives.map((objective, index) => ({
                            id: `objective-${index}`,
                            text: objective,
                        })),
                    },
                ]}
            />
            <Media />
        </>
    );

    // Create the shared ending sections
    const renderSharedEndingSections = () => (
        <>
            {/* Process Section */}
            <Media />
            <ProjectSection
                subheading="Process"
                heading={processHeading}
                body={processContent}
                hasSubsections={false}
            />

            {/* Impact Section */}
            <Media />
            <ProjectSection
                subheading="Impact"
                heading={impactHeading}
                body={impactContent}
                hasSubsections={true}
                subsections={[
                    {
                        id: "impact-results",
                        title: "Results",
                        type: "results", // Assuming you have this type in your ProjectSubsection component
                        data: impactResults.map((result, index) => ({
                            id: `result-${index}`,
                            metric: result.heading, // Map heading to metric
                            improvement: result.body, // Map body to improvement
                        })),
                    },
                ]}
            />

            {/* Partners Section - Individual Projects Only (subsection only, no ProjectSection wrapper) */}
            {!isBodyOfWork && partners.length > 0 && (
                <>
                    <Media />
                    <ProjectSubsection
                        type="partners"
                        data={partners}
                        headingLevel={3}
                    >
                        Partners
                    </ProjectSubsection>
                </>
            )}
        </>
    );

    // Body of Work specific content (comes after common sections)
    const renderBodyOfWorkContent = () => (
        <section
            data-block="body-of-work"
            className="gap-y-projects-row-gap-base flex flex-col"
        >
            {/* Solution Section */}
            <ProjectSection
                subheading="Solution"
                heading={solutionHeading}
                body={solutionContent} // Changed from 'content' to 'body'
                hasSubsections={false}
            />

            {/* Connected work projects */}
            {bodyOfWorkProjects.map((project, index) => (
                <section
                    key={project.id || `body-project-${index}`}
                    data-element="body-of-work__project"
                    className="gap-y-projects-row-gap-sm flex flex-col"
                >
                    <Media />
                    <ProjectSection
                        subheading={project.subheading} // Formatted completion date
                        heading={project.heading} // Project title
                        body={project.content} // Body of work description
                        hasSubsections={true}
                        subsections={[
                            {
                                id: `highlights-${project.id}`,
                                title: "Highlights",
                                type: "list",
                                numbered: true,
                                data: project.highlights.map(
                                    (highlight, idx) => ({
                                        id: `highlight-${idx}`,
                                        text: highlight,
                                    }),
                                ),
                            },
                        ]}
                        ctaText="View Showcase"
                        ctaHref={project.ctaHref} // Constructed project URL
                        ctaExternal={false}
                    />
                </section>
            ))}

            {/* Shared ending sections */}
            {renderSharedEndingSections()}
        </section>
    );

    // Individual Project specific content (comes after common sections)
    const renderIndividualProjectContent = () => (
        <>
            {/* Solution Section - for Individual Projects only */}
            <ProjectSection
                subheading="Solution"
                heading={solutionHeading}
                body={solutionContent}
                hasSubsections={false}
            />
            {/* Remove this Media - it's duplicated in renderSharedEndingSections */}

            {/* Shared ending sections */}
            {renderSharedEndingSections()}
        </>
    );

    return (
        <div className="px-grid-margin pt-global-top-margin pb-global-btm-margin gap-y-global-xl-full flex flex-col">
            <Header role="banner" />
            <main
                data-block="project-main"
                className="gap-y-projects-lg-gap flex flex-col"
            >
                <article
                    data-element="project-main__showcase"
                    className="gap-y-showcase-row-gap md:gap-x-grid-gutter flex flex-col md:flex-row"
                    aria-labelledby="project-title"
                >
                    <header
                        data-element="project-main__meta"
                        className="md:w-layout-left md:shrink-0"
                    >
                        <Meta
                            client={meta.client}
                            title={meta.title}
                            tags={meta.tags}
                            titleId="project-title"
                            titleClassName="md:max-w-3/4"
                        />
                    </header>
                    <section
                        data-element="project-main__content"
                        className="gap-y-projects-row-gap-base flex flex-col"
                    >
                        {background}
                        <Media {...media} />

                        {/* Common sections for both types */}
                        {renderCommonSections()}

                        {/* Type-specific content */}
                        {isBodyOfWork
                            ? renderBodyOfWorkContent()
                            : renderIndividualProjectContent()}
                    </section>
                </article>

                {/* Connected Work Section - for all projects */}
                <ConnectedWork
                    projects={connectedWork.projects}
                    heading={connectedWork.heading}
                />
            </main>
            <Footer role="contentinfo" />
        </div>
    );
}
