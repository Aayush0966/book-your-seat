import { syncMoviesFromTmdb } from "@/services/tmdbService";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const isAuthorized = (request: NextRequest): boolean => {
    const secret = process.env.CRON_SECRET;
    // If no secret is configured, allow (useful for local/dev).
    if (!secret) return true;

    const authHeader = request.headers.get("authorization");
    return authHeader === `Bearer ${secret}`;
};

const handleSync = async (request: NextRequest) => {
    if (!isAuthorized(request)) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const pagesParam = request.nextUrl.searchParams.get("pages");
        const pages = pagesParam ? Math.max(1, Math.min(5, parseInt(pagesParam))) : 1;

        const result = await syncMoviesFromTmdb(pages);

        return NextResponse.json(
            {
                success: true,
                message: `Sync complete: added ${result.added}, skipped ${result.skipped}, failed ${result.failed}`,
                ...result,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error syncing movies:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Internal server error",
            },
            { status: 500 }
        );
    }
};

// Vercel Cron uses GET requests.
export async function GET(request: NextRequest) {
    return handleSync(request);
}

// Allow manual triggering via POST too.
export async function POST(request: NextRequest) {
    return handleSync(request);
}
