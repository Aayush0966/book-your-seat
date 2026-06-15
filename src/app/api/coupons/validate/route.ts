import { validateCoupon } from "@/services/showServices";
import { NextResponse } from "next/server";

// Public (customer-facing) coupon validation used during booking.
// Unlike /api/admin/coupons, this does NOT require admin auth and only ever
// returns the discount for a single, valid code - it never lists coupons.
export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const couponCode = searchParams.get("code")?.trim();

    if (!couponCode) {
        return NextResponse.json({ error: "Coupon code is required" }, { status: 400 });
    }

    const response = await validateCoupon(couponCode);
    if (!response.success) {
        return NextResponse.json({ error: response.error }, { status: 404 });
    }

    return NextResponse.json({ discount: response.discount }, { status: 200 });
};
