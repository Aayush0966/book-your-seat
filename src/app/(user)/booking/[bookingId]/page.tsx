import BookingPage from "@/components/Booking/BookingPage";
import { fetchBookingDetails } from "@/services/showServices";

const page = async ({ params }: { params: { bookingId: string } }) => {
    const bookingId = (await params).bookingId
    const bookingDetails = await fetchBookingDetails(bookingId);
    if (!bookingDetails) return null;

    return (
        <BookingPage bookingDetails={bookingDetails} />
    );
};

export default page; 