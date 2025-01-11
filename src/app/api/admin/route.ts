import { NextResponse } from "next/server";


const POST = async (request: Request) => {
    const {fullName, contactNumber, email, password} = await request.json();
    if (!fullName || !contactNumber || !email || !password) {
        return NextResponse.json({error: "All fields are required"}, {status: 400})
    }
    
}

export default POST