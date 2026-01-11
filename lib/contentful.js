import { createClient } from "contentful";

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Helper function to create URL-safe slug from client name
function createClientSlug(clientName) {
    return clientName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

// Helper function to split slug based on actual client name
function parseSlugWithClient(projectSlug, clientName) {
    const clientSlug = createClientSlug(clientName);

    // Remove the client slug from the beginning of the project slug
    let projectPart = projectSlug;
    if (projectSlug.startsWith(clientSlug + "-")) {
        projectPart = projectSlug.substring(clientSlug.length + 1);
    }

    return { clientSlug, projectSlug: projectPart };
}

// Helper function to fetch tiny thumbnail from Contentful and convert to base64
async function fetchTinyThumbnailAsBase64(imageUrl) {
    try {
        // Use Contentful's Image API to request a tiny 16x16 thumbnail
        // This drastically reduces bandwidth (2KB instead of 5MB+)
        const tinyThumbUrl = `${imageUrl}?w=64&h=64&fm=jpg&q=80`;

        const response = await fetch(tinyThumbUrl);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch thumbnail: ${response.statusText}`,
            );
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");

        return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
        console.warn(
            `Could not fetch thumbnail from ${imageUrl}:`,
            error.message,
        );
        return null;
    }
}

// Helper function to generate SVG blur data URL from base64 image
function generateSvgBlurDataUrl(base64Image, width, height) {
    // Extract the base64 data (remove data:image/jpeg;base64, prefix if present)
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    // Create SVG with Gaussian blur filter and viewBox matching blur dimensions
    const svg = `
        <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 ${width} ${height}'>
            <filter id='blur' x='-50%' y='-50%' width='200%' height='200%' color-interpolation-filters='sRGB'>
                <feGaussianBlur stdDeviation='150'/>
                <feColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/>
                <feFlood x='0' y='0' width='100%' height='100%'/>
                <feComposite operator='out' in='s'/>
                <feComposite in2='SourceGraphic'/>
                <feGaussianBlur stdDeviation='150'/>
            </filter>
            <image 
                width='100%' 
                height='100%' 
                x='0' 
                y='0' 
                preserveAspectRatio='xMidYMid slice' 
                style='filter: url(#blur);' 
                href='data:image/jpeg;base64,${base64Data}'
            />
        </svg>
    `.trim();

    // Encode SVG as data URL
    const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    return svgDataUrl;
}

// Get featured media for homepage slideshow
export async function getFeaturedMedia() {
    try {
        const entries = await client.getEntries({
            content_type: "featuredMedia",
            "fields.status": true, // Only get Active entries
            order: "-sys.updatedAt", // Default order by updated (newest first)
        });

        // Custom sorting: position first (ascending), then by updated date (descending)
        const sortedItems = entries.items.sort((a, b) => {
            const posA = a.fields.position;
            const posB = b.fields.position;

            // Both have positions: sort by position ascending
            if (posA !== undefined && posB !== undefined) {
                return posA - posB;
            }

            // Only A has position: A comes first
            if (posA !== undefined) return -1;

            // Only B has position: B comes first
            if (posB !== undefined) return 1;

            // Neither has position: sort by updated date descending
            const dateA = new Date(a.fields.updated || a.sys.updatedAt);
            const dateB = new Date(b.fields.updated || b.sys.updatedAt);
            return dateB - dateA;
        });

        // Process each item and generate blur placeholders
        const processedItems = await Promise.all(
            sortedItems.map(async (item) => {
                const isVideo = item.fields.type?.[0] === "Video";
                const isImage =
                    item.fields.type?.[0] === "Image" || !item.fields.type?.[0];
                const isMobileVideo = item.fields.mobileType?.[0] === "Video";
                const isMobileImage =
                    item.fields.mobileType?.[0] === "Image" ||
                    !item.fields.mobileType?.[0];
                let posterUrl = null;
                let posterBlurDataUrl = null;
                let imageBlurDataUrl = null;
                let mobilePosterUrl = null;
                let mobilePosterBlurDataUrl = null;
                let mobileImageBlurDataUrl = null;

                // For videos, generate blur from posterImage
                if (isVideo && item.fields.posterImage) {
                    const posterImageUrl =
                        item.fields.posterImage.fields.file.url;
                    const fullPosterUrl = posterImageUrl.startsWith("http")
                        ? posterImageUrl
                        : `https:${posterImageUrl}`;

                    posterUrl = `${fullPosterUrl}?w=4000`; // Match still image optimization

                    // Fetch tiny 16x16 thumbnail for blur (saves ~5MB per image!)
                    const base64Thumbnail =
                        await fetchTinyThumbnailAsBase64(fullPosterUrl);
                    if (base64Thumbnail) {
                        // Use original asset dimensions for proper aspect ratio
                        const width =
                            item.fields.posterImage.fields.file.details?.image
                                ?.width || 1920;
                        const height =
                            item.fields.posterImage.fields.file.details?.image
                                ?.height || 1080;

                        posterBlurDataUrl = generateSvgBlurDataUrl(
                            base64Thumbnail,
                            width,
                            height,
                        );

                        console.log(
                            `Video poster blur: ${item.fields.title} (${width}x${height})`,
                        );
                    }
                }

                // For mobile videos, generate blur from mobilePosterImage
                if (isMobileVideo && item.fields.mobilePosterImage) {
                    const mobilePosterImageUrl =
                        item.fields.mobilePosterImage.fields.file.url;
                    const fullMobilePosterUrl = mobilePosterImageUrl.startsWith(
                        "http",
                    )
                        ? mobilePosterImageUrl
                        : `https:${mobilePosterImageUrl}`;

                    mobilePosterUrl = `${fullMobilePosterUrl}?w=2000`;

                    // Fetch tiny 16x16 thumbnail for blur (saves ~5MB per image!)
                    const base64Thumbnail =
                        await fetchTinyThumbnailAsBase64(fullMobilePosterUrl);
                    if (base64Thumbnail) {
                        // Use original asset dimensions for proper aspect ratio
                        const width =
                            item.fields.mobilePosterImage.fields.file.details
                                ?.image?.width || 1080;
                        const height =
                            item.fields.mobilePosterImage.fields.file.details
                                ?.image?.height || 1920;

                        mobilePosterBlurDataUrl = generateSvgBlurDataUrl(
                            base64Thumbnail,
                            width,
                            height,
                        );

                        console.log(
                            `Mobile video poster blur: ${item.fields.title} (${width}x${height})`,
                        );
                    }
                }

                // For images, generate blur from the image asset itself
                if (isImage && item.fields.asset) {
                    const imageUrl = item.fields.asset.fields.file.url;
                    const fullImageUrl = imageUrl.startsWith("http")
                        ? imageUrl
                        : `https:${imageUrl}`;

                    // Fetch tiny 16x16 thumbnail for blur (saves ~5MB per image!)
                    const base64Thumbnail =
                        await fetchTinyThumbnailAsBase64(fullImageUrl);
                    if (base64Thumbnail) {
                        // Use original asset dimensions for proper aspect ratio
                        const width =
                            item.fields.asset.fields.file.details?.image
                                ?.width || 1920;
                        const height =
                            item.fields.asset.fields.file.details?.image
                                ?.height || 1080;

                        imageBlurDataUrl = generateSvgBlurDataUrl(
                            base64Thumbnail,
                            width,
                            height,
                        );

                        console.log(
                            `Image blur: ${item.fields.title} (${width}x${height})`,
                        );
                    }
                }

                // For mobile images, generate blur from the mobile asset itself
                if (isMobileImage && item.fields.mobileAsset) {
                    const mobileImageUrl =
                        item.fields.mobileAsset.fields.file.url;
                    const fullMobileImageUrl = mobileImageUrl.startsWith("http")
                        ? mobileImageUrl
                        : `https:${mobileImageUrl}`;

                    // Fetch tiny 16x16 thumbnail for blur (saves ~5MB per image!)
                    const base64Thumbnail =
                        await fetchTinyThumbnailAsBase64(fullMobileImageUrl);
                    if (base64Thumbnail) {
                        // Use original asset dimensions for proper aspect ratio
                        const width =
                            item.fields.mobileAsset.fields.file.details?.image
                                ?.width || 1080;
                        const height =
                            item.fields.mobileAsset.fields.file.details?.image
                                ?.height || 1920;

                        mobileImageBlurDataUrl = generateSvgBlurDataUrl(
                            base64Thumbnail,
                            width,
                            height,
                        );

                        console.log(
                            `Mobile image blur: ${item.fields.title} (${width}x${height})`,
                        );
                    }
                }

                return {
                    id: item.sys.id,
                    title: item.fields.title,
                    asset: {
                        url: item.fields.asset?.fields?.file?.url,
                        contentType:
                            item.fields.asset?.fields?.file?.contentType,
                        width: item.fields.asset?.fields?.file?.details?.image
                            ?.width,
                        height: item.fields.asset?.fields?.file?.details?.image
                            ?.height,
                    },
                    // Add optimized image URLs
                    optimizedUrl:
                        item.fields.asset?.fields?.file?.contentType?.startsWith(
                            "image",
                        )
                            ? `${item.fields.asset.fields.file.url}?w=4000` // Max 4000px width, Next.js handles format/quality
                            : item.fields.asset?.fields?.file?.url,
                    // Video-specific fields
                    posterUrl,
                    posterBlurDataUrl,
                    // Image-specific fields
                    imageBlurDataUrl,
                    type: item.fields.type?.[0],
                    aspectRatio: item.fields.aspectRatio?.[0],
                    altText: item.fields.altText || item.fields.title,
                    relatedProject: item.fields.relatedProject || null,
                    position: item.fields.position,
                    updated: item.fields.updated || item.sys.updatedAt,
                    // Mobile-specific fields
                    mobileAsset: item.fields.mobileAsset
                        ? {
                              url: item.fields.mobileAsset.fields.file.url,
                              contentType:
                                  item.fields.mobileAsset.fields.file
                                      .contentType,
                              width: item.fields.mobileAsset.fields.file.details
                                  ?.image?.width,
                              height: item.fields.mobileAsset.fields.file
                                  .details?.image?.height,
                          }
                        : null,
                    mobileOptimizedUrl:
                        item.fields.mobileAsset?.fields?.file?.contentType?.startsWith(
                            "image",
                        )
                            ? `${item.fields.mobileAsset.fields.file.url}?w=2000` // Max 1200px width, Next.js handles format/quality
                            : item.fields.mobileAsset?.fields?.file?.url,
                    mobileType: item.fields.mobileType?.[0] || null,
                    mobileAspectRatio:
                        item.fields.mobileAspectRatio?.[0] || null,
                    mobilePosterUrl,
                    mobilePosterBlurDataUrl,
                    mobileImageBlurDataUrl,
                };
            }),
        );

        return processedItems;
    } catch (error) {
        console.error("Error fetching featured media:", error);
        return [];
    }
}

// Get all projects for generating static params
export async function getAllProjects() {
    try {
        const entries = await client.getEntries({
            content_type: "project",
            // Remove the order parameter - we'll sort manually for multi-level sorting
        });

        // Sort projects with multi-level sorting:
        // 1. By client name (descending)
        // 2. By completion date (descending) within each client group
        const sortedProjects = entries.items.sort((a, b) => {
            const clientA = a.fields.client || "";
            const clientB = b.fields.client || "";

            // First, sort by client name (descending)
            const clientComparison = clientB.localeCompare(clientA);

            // If clients are the same, sort by completion date (descending)
            if (clientComparison === 0) {
                const dateA = new Date(a.fields.completionDate || 0);
                const dateB = new Date(b.fields.completionDate || 0);
                return dateB - dateA; // Descending order (most recent first)
            }

            return clientComparison;
        });

        return sortedProjects;
    } catch (error) {
        console.error("Error fetching all projects:", error);
        return [];
    }
}

// Get a specific project by full slug
export async function getProject(fullSlug) {
    try {
        const entries = await client.getEntries({
            content_type: "project",
            "fields.slug": fullSlug,
            include: 2, // Include referenced content
        });
        return entries.items[0] || null;
    } catch (error) {
        console.error(`Error fetching project with slug ${fullSlug}:`, error);
        return null;
    }
}

// Get all unique clients for generating client routes
export async function getAllClients() {
    try {
        const entries = await client.getEntries({
            content_type: "project",
            select: "fields.client",
        });

        const clients = [
            ...new Set(entries.items.map((item) => item.fields.client)),
        ].sort((a, b) => b.localeCompare(a)); // Sort clients descending

        return clients;
    } catch (error) {
        console.error("Error fetching clients:", error);
        return [];
    }
}

// Get projects by client name (not slug)
export async function getProjectsByClient(clientName) {
    try {
        const entries = await client.getEntries({
            content_type: "project",
            "fields.client": clientName,
            order: "-fields.completionDate", // Most recently completed first
        });
        return entries.items;
    } catch (error) {
        console.error("Error fetching projects by client:", error);
        return [];
    }
}

// Get projects by client slug (for URL routing)
export async function getProjectsByClientSlug(clientSlug) {
    try {
        // Get all projects first
        const entries = await client.getEntries({
            content_type: "project",
            order: "-fields.completionDate",
        });

        // Filter projects that match the client slug
        const clientProjects = entries.items.filter((item) => {
            const itemClientSlug = createClientSlug(item.fields.client);
            return itemClientSlug === clientSlug;
        });

        return clientProjects;
    } catch (error) {
        console.error("Error fetching projects by client slug:", error);
        return [];
    }
}

// Helper function to get client name from client slug
export async function getClientNameFromSlug(clientSlug) {
    try {
        const entries = await client.getEntries({
            content_type: "project",
            order: "-fields.completionDate",
        });

        const project = entries.items.find((item) => {
            const itemClientSlug = createClientSlug(item.fields.client);
            return itemClientSlug === clientSlug;
        });

        return project?.fields.client || null;
    } catch (error) {
        console.error("Error fetching client name from slug:", error);
        return null;
    }
}

// Get information page content
export async function getInformationPageContent() {
    try {
        const entries = await client.getEntries({
            content_type: "information",
            limit: 1, // Only expect one entry
        });

        if (entries.items.length > 0) {
            return entries.items[0];
        }

        return null;
    } catch (error) {
        console.error("Error fetching information page content:", error);
        return null;
    }
}

export { createClientSlug, parseSlugWithClient };
export default client;
