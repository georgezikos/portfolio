import Header from "@/app/components/organisms/global/Header";
import Footer from "@/app/components/molecules/global/Footer";
import InfoSection from "@/app/components/organisms/info/InfoSection";
import { getInformationPageContent } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

// Rich text renderer for body content - preserves structure as JSX elements
function renderInfoBodyContent(richTextDocument) {
    if (!richTextDocument) return [];

    const bodyRichTextOptions = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => {
                return children;
            },
            [INLINES.HYPERLINK]: (node, children) => {
                const href = node.data?.uri || '#';
                return (
                    <a 
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {children}
                    </a>
                );
            },
        },
    };

    // Process the document and return the rendered components
    const renderedContent = documentToReactComponents(richTextDocument, bodyRichTextOptions);
    
    // The rendered content should be an array of elements (paragraphs, etc.)
    if (Array.isArray(renderedContent)) {
        return renderedContent;
    }
    
    return renderedContent ? [renderedContent] : [];
}

// Transform Contentful data for the information page
function transformInformationData(contentfulEntry) {
    if (!contentfulEntry) return {};

    const fields = contentfulEntry.fields;

    return {
        pageTitle: fields.pageTitle || "Information",
        
        // About section (first InfoSection - body type)
        aboutHeading: fields.aboutHeading || "About",
        aboutContent: renderInfoBodyContent(fields.aboutContent),
        
        // Skills section (second InfoSection - list type)
        skillsHeading: fields.skillsHeading || "Skills",
        skillsContent: fields.skillsContent || [],
        
        // Experience section (third InfoSection - experiences type)
        experienceHeading: fields.experienceHeading || "Experience",
        experienceContent: fields.experienceContent || [],
        cv: fields.cv?.fields?.file?.url || "#", // Handle media field
        
        // Contact section (fourth InfoSection - body type)
        contactHeading: fields.contactHeading || "Contact",
        contactContent: renderInfoBodyContent(fields.contactContent),
    };
}

export default async function Information() {
    // Fetch information page content from Contentful
    const informationEntry = await getInformationPageContent();
    const pageData = transformInformationData(informationEntry);

    return (
        <div className="px-grid-margin pt-global-top-margin pb-global-btm-margin gap-y-global-xl-full flex min-h-screen flex-col">
            <Header role="banner" />
            <main
                data-block="info-main"
                className="gap-y-info-main-row-gap flex grow flex-col"
            >
                {/* About Section - body type */}
                <InfoSection 
                    heading={pageData.aboutHeading}
                    sectionType="body"
                    content={pageData.aboutContent}
                />
                
                {/* Skills Section - list type */}
                <InfoSection
                    heading={pageData.skillsHeading}
                    sectionType="list"
                    headingClassName="hidden md:block"
                    skillsData={pageData.skillsContent}
                />
                
                {/* Experience Section - experiences type */}
                <InfoSection 
                    heading={pageData.experienceHeading}
                    sectionType="experiences"
                    experiences={pageData.experienceContent}
                    cv={pageData.cv}
                />
                
                {/* Contact Section - body type with custom spacing for multiple paragraphs */}
                <InfoSection 
                    heading={pageData.contactHeading}
                    sectionType="body"
                    content={pageData.contactContent}
                    multiClassName="*:not-last:mb-[6.5px] *:not-first:mt-[6.5px] sm:*:not-last:mb-[7px] sm:*:not-first:mt-[7px] xl:*:not-last:mb-[7.5px] xl:*:not-first:mt-[7.5px]"
                />
            </main>
            <Footer role="contentinfo" />
        </div>
    );
}

// Add metadata
export async function generateMetadata() {
    const informationEntry = await getInformationPageContent();
    const pageData = transformInformationData(informationEntry);
    
    return {
        title: pageData.pageTitle,
    };
}
