import { updateMovieStatus } from '@/database/shows/queries';
import { NextResponse } from 'next/server';
import { requireAdminAuth } from "@/lib/adminAuth";

export async function PATCH(req: Request, { params }: { params: Promise<{ movieId: string }> }) {
    // Check admin authentication
    const authCheck = await requireAdminAuth();
    if (authCheck) return authCheck;

    const movieId = (await params).movieId;
    const { status } = await req.json();

    if (!movieId) {
        return NextResponse.json({ error: 'Invalid movie ID' }, { status: 400 });
    }

    try {
        if (!status) {
            return NextResponse.json({ error: 'Status is required' }, { status: 400 });
        }

        const movie = await updateMovieStatus(status, parseInt(movieId));
        if (!movie) {
            return NextResponse.json({ error: 'Failed to update movie status' }, { status: 500 });
        }
        return NextResponse.json({ message: 'Movie status updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update movie status' }, { status: 500 });
    }
}