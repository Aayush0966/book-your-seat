import { fetchMoviesWithShows } from "@/services/showServices";
import { NextResponse } from "next/server";


export async function GET() {
    const nowPlayingShows = await fetchMoviesWithShows('ACTIVE');
    if (!nowPlayingShows) {
        return NextResponse.json({message: "No movies available."}, {status: 404})
    }
    return NextResponse.json({results: nowPlayingShows}, {status: 200})
}