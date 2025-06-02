import { createCoupon, fetchCoupons, toggleCouponStatus } from "@/database/shows/queries"
import { validateCoupon } from "@/services/showServices";
import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/adminAuth";

export const GET = async (request: Request) => {
    // Check admin authentication
    const authCheck = await requireAdminAuth();
    if (authCheck) return authCheck;

    const { searchParams } = new URL(request.url);
    const couponCode = searchParams.get("code");

    if (couponCode) {
        const response = await validateCoupon(couponCode);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 404 });
        }
        return NextResponse.json({ discount:response.discount }, { status: 200 });
    }

    const coupons = await fetchCoupons();
    if (!coupons) {
        return NextResponse.json({ error: "No coupons are available" }, { status: 404 });
    }

    return NextResponse.json({ coupons }, { status: 200 });
};


export const POST = async (request: Request) => {
    // Check admin authentication
    const authCheck = await requireAdminAuth();
    if (authCheck) return authCheck;

    const {coupon} = await request.json();
    if (!coupon) {
        return NextResponse.json({error: "No coupon was provided"}, {status: 400})
    }

    const newCoupon = await createCoupon(coupon);

    if (!newCoupon) {
        return NextResponse.json({error: "Something went wrong while creating a coupon."}, {status: 500})
    }

    return NextResponse.json({success: true}, {status: 200})
}

export const PATCH = async (request: Request) => {
    // Check admin authentication
    const authCheck = await requireAdminAuth();
    if (authCheck) return authCheck;

    const {couponId, isActive} = await request.json();
    if (!couponId) {
        return NextResponse.json({error: "All fields are required"}, {status: 400})
    }

    const coupon = await toggleCouponStatus(couponId, isActive)
    if (!coupon) {
        return NextResponse.json({error: "Something went wrong while updating a coupon."}, {status: 500})
    }

    return NextResponse.json({success: true}, {status: 200})
} 