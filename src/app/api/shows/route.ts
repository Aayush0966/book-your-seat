import { fetchMovies } from "@/services/showServices";
import { NextResponse } from "next/server";


export async function GET() {
    const nowPlayingShows = await fetchMovies('ACTIVE');
    if (!nowPlayingShows) {
        return NextResponse.json({message: "No movies available."}, {status: 404})
    }
    return NextResponse.json({results: nowPlayingShows}, {status: 200})
}