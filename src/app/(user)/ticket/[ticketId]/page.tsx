import TicketPage from "@/components/Booking/TicketPage";
import { fetchShowDetailsByTicketId } from "@/services/showServices";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";

// Force dynamic rendering to prevent build-time database queries
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ ticketId: string }> }): Promise<Metadata> {
  const ticketId = (await params).ticketId;
  
  return {
    title: `Ticket Details - ${ticketId} | Book Your Seat`,
    description: "View your movie ticket details, seat information, and show timings. Present this ticket at the cinema for entry.",
    keywords: ["movie ticket", "ticket details", "cinema entry", "seat information"],
    authors: [{ name: "Book Your Seat" }],
    openGraph: {
      title: `Movie Ticket - Book Your Seat`,
      description: "View your movie ticket details and seat information.",
      url: `/ticket/${ticketId}`,
      siteName: "Book Your Seat",
      type: "website",
    },
    robots: {
      index: false, // Ticket details should not be indexed
      follow: false,
    },
  };
}

const page = async ({params}: {params: Promise<{ticketId: string}>}) => {
    const ticketId = (await params).ticketId;
    
    let ticketDetails = null;
    try {
        ticketDetails = await fetchShowDetailsByTicketId(ticketId);
    } catch (error) {
        console.error('Error fetching ticket details:', error);
    }
    
    if (!ticketDetails) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
                <Card className="w-full max-w-md mx-auto text-center">
                    <CardHeader>
                        <h2 className="text-2xl font-bold text-gray-900">Ticket Not Found</h2>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-4">
                            The ticket you're looking for doesn't exist or has been removed.
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

    return <TicketPage ticketDetails={ticketDetails} />;
}

export default page;