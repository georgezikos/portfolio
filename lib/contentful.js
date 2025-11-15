import { createClient } from "contentful";
import { getPlaiceholder } from "plaiceholder";

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

// Helper function to generate SVG blur data URL from base64 image
function generateSvgBlurDataUrl(base64Image, width, height) {
    // Extract the base64 data (remove data:image/jpeg;base64, prefix if present)
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    // Create SVG with Gaussian blur filter and viewBox matching blur dimensions
    const svg = `
        <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 ${width} ${height}'>
            <filter id='blur' color-interpolation-filters='sRGB'>
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
                let posterUrl = null;
                let posterBlurDataUrl = null;
                let imageBlurDataUrl = null;

                // For videos, generate blur from posterImage
                if (isVideo && item.fields.posterImage) {
                    const posterImageUrl =
                        item.fields.posterImage.fields.file.url;
                    const fullPosterUrl = posterImageUrl.startsWith("http")
                        ? posterImageUrl
                        : `https:${posterImageUrl}`;

                    posterUrl = fullPosterUrl; // Use original for actual poster

                    try {
                        // Fetch the original image to preserve aspect ratio for blur
                        const response = await fetch(fullPosterUrl);
                        if (!response.ok) {
                            throw new Error(
                                `Failed to fetch image: ${response.statusText}`,
                            );
                        }
                        const buffer = await response.arrayBuffer();

                        // Pass buffer to plaiceholder with size 16 for better quality blur
                        const result = await getPlaiceholder(
                            Buffer.from(buffer),
                            { size: 16 },
                        );
                        // Wrap base64 blur in SVG filter with blur dimensions
                        posterBlurDataUrl = generateSvgBlurDataUrl(
                            result.base64,
                            result.metadata.width,
                            result.metadata.height,
                        );

                        // DEBUG: Log what plaiceholder generated
                        console.log(`Video: ${item.fields.title}`);
                        console.log(
                            `  Blur dimensions: ${result.metadata.width}x${result.metadata.height}`,
                        );
                        console.log(
                            `  Blur aspect ratio: ${(result.metadata.width / result.metadata.height).toFixed(2)}`,
                        );
                    } catch (error) {
                        console.warn(
                            `Could not generate blur for video "${item.fields.title}". Continuing without blur.`,
                            error.message,
                        );
                        // Don't set posterBlurDataUrl - component will handle gracefully
                    }
                }

                // For images, generate blur from the image asset itself
                if (isImage && item.fields.asset) {
                    const imageUrl = item.fields.asset.fields.file.url;
                    const fullImageUrl = imageUrl.startsWith("http")
                        ? imageUrl
                        : `https:${imageUrl}`;

                    try {
                        // Fetch the original image
                        const response = await fetch(fullImageUrl);
                        if (!response.ok) {
                            throw new Error(
                                `Failed to fetch image: ${response.statusText}`,
                            );
                        }
                        const buffer = await response.arrayBuffer();

                        // Generate blur placeholder with size 16
                        const result = await getPlaiceholder(
                            Buffer.from(buffer),
                            { size: 16 },
                        );
                        // Wrap base64 blur in SVG filter with blur dimensions
                        imageBlurDataUrl = generateSvgBlurDataUrl(
                            result.base64,
                            result.metadata.width,
                            result.metadata.height,
                        );

                        // DEBUG: Log what plaiceholder generated
                        console.log(`Image: ${item.fields.title}`);
                        console.log(
                            `  Blur dimensions: ${result.metadata.width}x${result.metadata.height}`,
                        );
                        console.log(
                            `  Blur aspect ratio: ${(result.metadata.width / result.metadata.height).toFixed(2)}`,
                        );
                    } catch (error) {
                        console.warn(
                            `Could not generate blur for image "${item.fields.title}". Continuing without blur.`,
                            error.message,
                        );
                        // Don't set imageBlurDataUrl - component will handle gracefully
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
                            ? `${item.fields.asset.fields.file.url}?fm=jpg&fl=progressive&q=80&w=2000` // Progressive JPEG format, 80% quality, max 2000px width
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
