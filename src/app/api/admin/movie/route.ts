import { addMovieAndShow } from "@/services/showServices";
import { movieDetailsSchema } from "@/validators/showValidate";
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
    const {movieDetails} = await request.json();

    const result = movieDetailsSchema.safeParse(movieDetails);
    
    if (!result.success) {
        return NextResponse.json({errors: result.error.format()}, {status: 400})
    }
    const responseDate = await addMovieAndShow(movieDetails);
    
    if (!responseDate) {
        return NextResponse.json({message: 'Something went wrong'}, { status: 500 })
    }
    return NextResponse.json({message: `Added successfully ${responseDate}`}, {status: 201})
}