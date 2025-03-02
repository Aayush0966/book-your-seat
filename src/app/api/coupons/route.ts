import { createCoupon, fetchCoupons, toggleCouponStatus } from "@/database/shows/queries"
import { NextResponse } from "next/server";


export const GET = async () => {
    const coupons = await fetchCoupons();
    if (!coupons) {
        return NextResponse.json({error: "No coupons are available"}, {status: 404})
    }

    return NextResponse.json({coupons}, {status: 200})
}

export const POST = async (request: Request) => {
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
    const {couponId, isActive} = await request.json();
    console.log(couponId, isActive)
    if (!couponId) {
        return NextResponse.json({error: "All fields are required"}, {status: 400})
    }

    const coupon = await toggleCouponStatus(couponId, isActive)
    if (!coupon) {
        return NextResponse.json({error: "Something went wrong while updating a coupon."}, {status: 500})
    }

    return NextResponse.json({success: true}, {status: 200})
}