import { addMovie } from "@/lib/queries";
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
    const {movie, show} = await request.json();
    const result = await addMovie(movie, show);
    if (result === null) {
        return NextResponse.json({message: 'Something went wrong'}, { status: 500 })
    }
    return NextResponse.json({message: "Added successfully"}, {status: 201})
}