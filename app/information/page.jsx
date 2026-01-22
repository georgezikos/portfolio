import InfoSection from "@/app/components/organisms/info/InfoSection";
import CopyEmailLink from "@/app/components/atoms/global/CopyEmailLink";
import { getInformationPageContent } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

// On-demand revalidation only (via Contentful webhook)
// This prevents automatic hourly rebuilds, saving massive bandwidth
export const revalidate = false;

// Metadata for SEO
export const metadata = {
    title: "Information — GEORGE ZIKOS",
    description:
        "Learn more about George Zikos — an independent multidisciplinary designer and web developer based in Toronto. View experience, skills, and contact information.",
    openGraph: {
        title: "Information — GEORGE ZIKOS",
        description:
            "Learn more about George Zikos — an independent multidisciplinary designer and web developer based in Toronto. View experience, skills, and contact information.",
        url: "https://george-zikos.com/information",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "George Zikos Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Information — GEORGE ZIKOS",
        description:
            "Learn more about George Zikos — an independent multidisciplinary designer and web developer based in Toronto. View experience, skills, and contact information.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "/information",
    },
};

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
                const isMailto = href.startsWith('mailto:');
                
                if (isMailto) {
                    const email = href.replace('mailto:', '');
                    return (
                        <CopyEmailLink
                            email={email}
                            className="hover:text-link-secondary-hover active:text-link-secondary-hover focus-visible:text-link-secondary-hover relative inline-block cursor-pointer no-underline transition-colors duration-200 ease-in-out"
                            spanClassName="absolute inset-[0]"
                            copiedSpanClassName="!text-link-secondary-hover absolute inset-[0]"
                            invisibleSpanClassName="invisible"
                        >
                            {children}
                        </CopyEmailLink>
                    );
                }
                
                return (
                    <a 
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-link-secondary-hover active:text-link-secondary-hover focus-visible:text-link-secondary-hover no-underline transition-colors duration-200 ease-in-out"
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

    const fields = contentfulEntry?.fields || {};

    return {
        pageTitle: fields.pageTitle || "Information",
        
        // About section (first InfoSection - body type)
        aboutHeading: fields.aboutHeading || "About",
        aboutContent: fields.aboutContent ? renderInfoBodyContent(fields.aboutContent) : [],
        
        // Skills section (second InfoSection - list type)
        skillsHeading: fields.skillsHeading || "Skills",
        skillsContent: fields.skillsContent || [],
        
        // Experience section (third InfoSection - experiences type)
        experienceHeading: fields.experienceHeading || "Experience",
        experienceContent: fields.experienceContent || [],
        cv: fields.cv?.fields?.file?.url || "#", // Handle media field
        
        // Contact section (fourth InfoSection - body type)
        contactHeading: fields.contactHeading || "Contact",
        contactContent: fields.contactContent ? renderInfoBodyContent(fields.contactContent) : [],
    };
}

export default async function Information() {
    // Fetch information page content from Contentful
    const informationEntry = await getInformationPageContent();
    const pageData = transformInformationData(informationEntry);

    return (
        <main
            data-block="info-main"
            className="gap-y-info-main-row-gap flex grow flex-col"
        >
                {/* About Section - body type - only render if content exists */}
                {pageData.aboutContent && pageData.aboutContent.length > 0 && (
                    <InfoSection 
                        heading={pageData.aboutHeading}
                        sectionType="body"
                        content={pageData.aboutContent}
                    />
                )}
                
                {/* Skills Section - list type - only render if skills data exists */}
                {pageData.skillsContent && pageData.skillsContent.length > 0 && (
                    <InfoSection
                        heading={pageData.skillsHeading}
                        sectionType="list"
                        headingClassName="hidden md:block"
                        skillsData={pageData.skillsContent}
                    />
                )}
                
                {/* Experience Section - experiences type - only render if experience data exists */}
                {pageData.experienceContent && pageData.experienceContent.length > 0 && (
                    <InfoSection 
                        heading={pageData.experienceHeading}
                        sectionType="experiences"
                        experiences={pageData.experienceContent}
                        cv={pageData.cv}
                    />
                )}
                
                {/* Contact Section - body type with custom spacing - only render if content exists */}
                {pageData.contactContent && pageData.contactContent.length > 0 && (
                    <InfoSection 
                        heading={pageData.contactHeading}
                        sectionType="body"
                        content={pageData.contactContent}
                        multiClassName="*:not-last:mb-[6.5px] *:not-first:mt-[6.5px] sm:*:not-last:mb-[7px] sm:*:not-first:mt-[7px] xl:*:not-last:mb-[7.5px] xl:*:not-first:mt-[7.5px]"
                    />
                )}
        </main>
    );
}
