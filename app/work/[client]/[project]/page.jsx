import {
    getAllProjects,
    getProject,
    parseSlugWithClient,
} from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { notFound } from "next/navigation";
import Project from "./Project";
import { BLOCKS } from "@contentful/rich-text-types";

// Generate static params for all client/project combinations
export async function generateStaticParams() {
    const projects = await getAllProjects();

    return projects.map((project) => {
        const { clientSlug, projectSlug } = parseSlugWithClient(
            project.fields.slug,
            project.fields.client,
        );
        return {
            client: clientSlug,
            project: projectSlug,
        };
    });
}

// Specific renderer for project background field
function renderProjectBackground(richTextDocument) {
    if (!richTextDocument) return "";

    const backgroundRichTextOptions = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => (
                <p
                    data-element="project-main__background"
                    className="text-body-xl-project-background text-text-secondary"
                >
                    {children}
                </p>
            ),
        },
    };

    return documentToReactComponents(
        richTextDocument,
        backgroundRichTextOptions,
    );
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

    const renderedContent = documentToReactComponents(
        richTextDocument,
        processImpactRichTextOptions,
    );

    // Check if we have multiple paragraphs (array) or single paragraph
    if (Array.isArray(renderedContent) && renderedContent.length > 1) {
        return (
            <div
                data-block="project-section-body"
                data-modifier="project-section-body--multi"
                className="flex flex-col *:not-last:mb-main-paragraph-sp-half *:not-first:mt-main-paragraph-sp-half"
            >
                {renderedContent}
            </div>
        );
    }

    return renderedContent;
}

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

// Specific renderer for project section body content
function renderProjectSectionBody(richTextDocument) {
    if (!richTextDocument) return "";

    const sectionBodyRichTextOptions = {
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

    const renderedContent = documentToReactComponents(
        richTextDocument,
        sectionBodyRichTextOptions,
    );

    // Check if we have multiple paragraphs (array) or single paragraph
    if (Array.isArray(renderedContent) && renderedContent.length > 1) {
        return (
            <div
                data-block="project-section-body"
                data-modifier="project-section-body--multi"
                className="flex flex-col *:not-last:mb-main-paragraph-sp-half *:not-first:mt-main-paragraph-sp-half"
            >
                {renderedContent}
            </div>
        );
    }

    return renderedContent;
}

// Keep the generic renderer for other fields
function renderRichText(richTextDocument) {
    if (!richTextDocument) return "";
    return documentToReactComponents(richTextDocument);
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

// Helper function to transform Contentful data to your component format
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
        connectedWork: {
            projects:
                fields.connectedWork?.map((connectedProject) => {
                    const { clientSlug, projectSlug } = parseSlugWithClient(
                        connectedProject.fields.slug,
                        connectedProject.fields.client,
                    );
                    return {
                        client: connectedProject.fields.client,
                        title: connectedProject.fields.projectLede,
                        slug: connectedProject.fields.slug,
                        tags: connectedProject.fields.roles || [],
                        href: `/work/${clientSlug}/${projectSlug}`,
                    };
                }) || [],
            heading: "Connected Work",
        },
        isBodyOfWork: isBodyOfWork,

        // Map the specific challenge and solution fields
        challengeHeading: fields.challengeHeading || "Challenge",
        challengeContent: fields.challengeBody
            ? renderProjectSectionBody(fields.challengeBody)
            : "",
        challengeObjectives: fields.challengeObjectives || [],

        solutionHeading: fields.solutionHeading || "Solution",
        solutionContent: fields.solutionBody
            ? renderProjectSectionBody(fields.solutionBody)
            : "",

        // Process and impact fields
        processHeading: fields.processHeading || "Our Process",
        processContent: fields.processBody
            ? renderProcessImpactBody(fields.processBody)
            : "",

        impactHeading: fields.impactHeading || "The Impact",
        impactContent: fields.impactBody
            ? renderProcessImpactBody(fields.impactBody)
            : "",

        // Use only one impactResults declaration - remove any duplicate
        impactResults: fields.impactResults || [],

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
                              project.fields.project || `Project ${index + 1}`,
                          content: project.fields.bodyOfWorkDescription ? (
                              <p
                                  data-element="project-section__body"
                                  className="text-body-lg-main text-text-secondary"
                              >
                                  {project.fields.bodyOfWorkDescription}
                              </p>
                          ) : (
                              ""
                          ),
                          highlights: project.fields.bodyOfWorkHighlights || [],
                          ctaHref: `/work/${clientSlug}/${projectSlug}`,
                      };
                  })
                : [],

        // Partners data (for Individual Projects only)
        partners:
            !isBodyOfWork && fields.partners
                ? fields.partners.map((partnerGroup) => ({
                      role: partnerGroup.role,
                      partners: Array.isArray(partnerGroup.name)
                          ? partnerGroup.name.map((name, index) => {
                                const { linkText, displayText } = parsePartnerName(name);
                                return {
                                    name: displayText,
                                    linkText: linkText,
                                    url: partnerGroup.website?.[index] || "",
                                    external: partnerGroup.website?.[index] ? true : false,
                                };
                            })
                          : [
                                {
                                    ...(() => {
                                        const { linkText, displayText } = parsePartnerName(partnerGroup.name);
                                        return {
                                            name: displayText,
                                            linkText: linkText,
                                        };
                                    })(),
                                    url: partnerGroup.website || "",
                                    external: partnerGroup.website ? true : false,
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
    };
}

export default async function ProjectPage({ params }) {
    // Reconstruct the full slug from client and project params
    const fullSlug = `${params.client}-${params.project}`;

    // Fetch the project data from Contentful
    const contentfulProject = await getProject(fullSlug);

    if (!contentfulProject) {
        notFound();
    }

    // Transform the Contentful data to match your component's expected format
    const projectData = transformProjectData(contentfulProject);

    return (
        <Project
            projectData={projectData}
            isBodyOfWork={projectData.isBodyOfWork}
        />
    );
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    const fullSlug = `${params.client}-${params.project}`;
    const project = await getProject(fullSlug);

    if (!project) {
        return {
            title: "Project Not Found",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    return {
        title: `${project.fields.project} - ${project.fields.client}`,
        description: project.fields.background
            ? `${project.fields.project} by ${project.fields.client}`
            : `${project.fields.project} by ${project.fields.client}`,
        robots: {
            index: false,
            follow: false,
        },
    };
}
