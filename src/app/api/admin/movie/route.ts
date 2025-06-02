import { addMovieAndShow } from "@/services/showServices";
import { movieDetailsSchema } from "@/validators/showValidate";
import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/adminAuth";

export const POST = async (request: Request) => {
    // Check admin authentication
    const authCheck = await requireAdminAuth();
    if (authCheck) return authCheck;

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