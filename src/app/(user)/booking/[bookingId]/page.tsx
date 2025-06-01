import BookingPage from "@/components/Booking/BookingPage";
import { fetchBookingDetails } from "@/services/showServices";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ bookingId: string }> }): Promise<Metadata> {
  const bookingId = (await params).bookingId;
  
  return {
    title: `Booking Details - ${bookingId} | Book Your Seat`,
    description: "View your movie booking details, tickets, and confirmation information. Download your tickets and check booking status.",
    keywords: ["booking details", "movie tickets", "booking confirmation", "ticket download"],
    authors: [{ name: "Book Your Seat" }],
    openGraph: {
      title: `Booking Details - Book Your Seat`,
      description: "View your movie booking details and download your tickets.",
      url: `/booking/${bookingId}`,
      siteName: "Book Your Seat",
      type: "website",
    },
    robots: {
      index: false, // Booking details should not be indexed
      follow: false,
    },
  };
}

const page = async ({ params }: { params: Promise<{ bookingId: string }> }) => {
    const bookingId = (await params).bookingId
    const bookingDetails = await fetchBookingDetails(bookingId);

    if (!bookingDetails) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
                <Card className="w-full max-w-md mx-auto text-center">
                    <CardHeader>
                        <h2 className="text-2xl font-bold text-gray-900">Booking Not Found</h2>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-4">
                            The booking you're looking for doesn't exist or has been removed.
                        </p>
                        <Link 
                            href="/"
                            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                        >
                            Return to Home
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return <BookingPage bookingDetails={bookingDetails} />;
};

export default page;