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

        return sortedItems.map((item) => ({
            id: item.sys.id,
            title: item.fields.title,
            asset: {
                url: item.fields.asset?.fields?.file?.url,
                contentType: item.fields.asset?.fields?.file?.contentType,
                width: item.fields.asset?.fields?.file?.details?.image?.width,
                height: item.fields.asset?.fields?.file?.details?.image?.height,
            },
            type: item.fields.type[0], // Get first element from array
            aspectRatio: item.fields.aspectRatio[0], // Get first element from array
            altText: item.fields.altText || item.fields.title,
            relatedProject: item.fields.relatedProject || null,
            position: item.fields.position,
            updated: item.fields.updated || item.sys.updatedAt,
        }));
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
