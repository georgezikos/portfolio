import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Get the secret token from the request
        const { secret, path } = await request.json();

        // Check for secret to confirm this is a valid request
        if (secret !== process.env.REVALIDATION_SECRET) {
            return NextResponse.json(
                { message: "Invalid secret token" },
                { status: 401 }
            );
        }

        // Default to homepage if no path specified
        const pathToRevalidate = path || "/";

        // Revalidate the specified path
        revalidatePath(pathToRevalidate);

        return NextResponse.json({
            revalidated: true,
            path: pathToRevalidate,
            now: Date.now(),
        });
    } catch (err) {
        return NextResponse.json(
            { message: "Error revalidating", error: err.message },
            { status: 500 }
        );
    }
}

// Optional GET endpoint for testing/manual triggering
export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const secret = searchParams.get("secret");
        const path = searchParams.get("path");

        if (secret !== process.env.REVALIDATION_SECRET) {
            return NextResponse.json(
                { message: "Invalid secret token" },
                { status: 401 }
            );
        }

        const pathToRevalidate = path || "/";
        revalidatePath(pathToRevalidate);

        return NextResponse.json({
            revalidated: true,
            path: pathToRevalidate,
            now: Date.now(),
        });
    } catch (err) {
        return NextResponse.json(
            { message: "Error revalidating", error: err.message },
            { status: 500 }
        );
    }
}

