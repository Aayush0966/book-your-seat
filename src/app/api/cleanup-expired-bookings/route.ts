import { checkAndCancelExpiredBookings } from "@/services/showServices";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const result = await checkAndCancelExpiredBookings();
        
        if (result.success && 'cancelledCount' in result && 'bookingIds' in result) {
            return NextResponse.json({
                success: true,
                message: `Successfully cancelled ${result.cancelledCount} expired bookings`,
                cancelledCount: result.cancelledCount,
                bookingIds: result.bookingIds
            }, { status: 200 });
        } else {
            return NextResponse.json({
                success: false,
                error: 'error' in result ? result.error : 'Unknown error occurred'
            }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in cleanup endpoint:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 });
    }
}

