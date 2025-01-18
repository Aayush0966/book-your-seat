import { addMovieAndShow } from "@/services/showServices";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const {movieDetails} = await request.json();
    const responseDate = await addMovieAndShow(movieDetails);
    
    if (responseDate === null) {
        return NextResponse.json({message: 'Something went wrong'}, { status: 500 })
    }
    return NextResponse.json({message: `Added successfully ${responseDate}`}, {status: 201})
}