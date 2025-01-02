import { addMovie } from "@/lib/queries";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const {movie, shows} = await request.json();
    const responseDate = await addMovie(movie, shows);
    
    if (responseDate === null) {
        return NextResponse.json({message: 'Something went wrong'}, { status: 500 })
    }
    return NextResponse.json({message: `Added successfully ${responseDate}`}, {status: 201})
}