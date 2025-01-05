import { addMovie } from "@/lib/queries";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const {formData} = await request.json();
    const responseDate = await addMovie(formData);
    
    if (responseDate === null) {
        return NextResponse.json({message: 'Something went wrong'}, { status: 500 })
    }
    return NextResponse.json({message: `Added successfully ${responseDate}`}, {status: 201})
}