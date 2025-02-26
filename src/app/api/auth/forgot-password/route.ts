import { sendCode, updateNewPassword, verifyCode } from "@/services/userService";
import { NextResponse } from "next/server";

async function handleEmailStep(data: any) {
    const res = await sendCode(data.email);
    if (res.error) {
        return NextResponse.json({ error: res.error }, { status: 400 });
    }
    return NextResponse.json({ message: res.message }, { status: 200 });
}

async function handleCodeStep(data: any) {
    const res = await verifyCode(data.email, data.code);
    if (res.error) {
        return NextResponse.json({ error: res.error }, { status: 400 });
    }
    return NextResponse.json({ message: res.message }, { status: 200 });
}

async function handlePasswordStep(data: any) {
    const res = await updateNewPassword(data.email, data.password, data.code);
    if (res.error) {
        return NextResponse.json({ error: res.error }, { status: 400 });
    }
    return NextResponse.json({ message: res.message }, { status: 200 });
}

export async function POST(request: Request) {
    const { step, data } = await request.json();

    switch (step) {
        case 'email':
            return handleEmailStep(data);
        case 'code':
            return handleCodeStep(data);
        case 'password':
            return handlePasswordStep(data);
        default:
            return NextResponse.json({ error: 'Invalid step' }, { status: 400 });
    }
}