import TicketPage from "@/components/Booking/TicketPage";
import { fetchShowDetailsByTicketId } from "@/services/showServices";

const page  = async ({params}: {params: Promise <{ticketId: string}>}) => {
    const ticketId = (await params).ticketId;
    const ticketDetails = await fetchShowDetailsByTicketId(ticketId);
    if (!ticketDetails) return null;

    return (
        <TicketPage ticketDetails={ticketDetails}  />
    )
}

export default page;