import { handleCreateAccount } from "@/services/userService";
import { SignupDetails } from "@/types/auth";
import { NextResponse } from "next/server";


export async function POST (request: Request)  {
   try {
     const {fullName, contactNumber, email, password} = await request.json();
     if (!fullName || !contactNumber || !email || !password) {
         return NextResponse.json({error: "All fields are required"}, {status: 400})
     }
     const signupDetails: SignupDetails = {
         fullName,
         email,
         contactNumber,
         password
     }
     const result = await handleCreateAccount(signupDetails);
     if (result.error) {
         return NextResponse.json({error: result.error}, {status: 400})
     }
     return NextResponse.json({message: "Account created successfully"}, {status: 201})
   } catch (error) {
        console.error("Error creating account: ", error)
        return NextResponse.json({error: error}, {status: 500})

   }
    
}

export const runtime = "nodejs";
