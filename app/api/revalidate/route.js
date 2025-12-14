import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();

        // Support both query param and body secret (Contentful sends in body)
        const searchParams = request.nextUrl.searchParams;
        const secret = searchParams.get("secret") || body.secret;

        // Check for secret to confirm this is a valid request
        if (!secret || secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
            console.error("[Revalidate] Invalid or missing secret token");
            return NextResponse.json(
                { message: "Invalid secret token" },
                { status: 401 },
            );
        }

        // Detect content type from Contentful webhook payload
        const contentType = body.sys?.contentType?.sys?.id;
        const pathsToRevalidate = [];

        // Map Contentful content types to pages that need revalidation
        if (contentType === "featuredMedia") {
            pathsToRevalidate.push("/"); // Homepage uses featured media
            console.log(
                "[Revalidate] Featured media changed, revalidating homepage",
            );
        } else if (contentType === "project") {
            pathsToRevalidate.push("/", "/work"); // Homepage and work index
            console.log(
                "[Revalidate] Project changed, revalidating home and work pages",
            );
        } else if (contentType === "information") {
            pathsToRevalidate.push("/information");
            console.log("[Revalidate] Information page changed");
        } else if (body.path) {
            // Allow manual path specification
            pathsToRevalidate.push(body.path);
            console.log(`[Revalidate] Manual path specified: ${body.path}`);
        } else {
            // Default to homepage if content type unknown
            pathsToRevalidate.push("/");
            console.log(
                `[Revalidate] Unknown content type (${contentType}), revalidating homepage`,
            );
        }

        // Revalidate all specified paths
        pathsToRevalidate.forEach((path) => {
            revalidatePath(path);
            console.log(`[Revalidate] ✓ Revalidated: ${path}`);
        });

        return NextResponse.json({
            revalidated: true,
            paths: pathsToRevalidate,
            contentType: contentType || "unknown",
            now: Date.now(),
        });
    } catch (err) {
        console.error("[Revalidate] Error:", err.message);
        return NextResponse.json(
            { message: "Error revalidating", error: err.message },
            { status: 500 },
        );
    }
}

// Optional GET endpoint for testing/manual triggering
export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const secret = searchParams.get("secret");
        const path = searchParams.get("path") || "/";

        if (!secret || secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
            console.error("[Revalidate] GET: Invalid or missing secret token");
            return NextResponse.json(
                { message: "Invalid secret token" },
                { status: 401 },
            );
        }

        revalidatePath(path);
        console.log(`[Revalidate] GET: ✓ Manually revalidated: ${path}`);

        return NextResponse.json({
            revalidated: true,
            path: path,
            now: Date.now(),
        });
    } catch (err) {
        console.error("[Revalidate] GET Error:", err.message);
        return NextResponse.json(
            { message: "Error revalidating", error: err.message },
            { status: 500 },
        );
    }
}
