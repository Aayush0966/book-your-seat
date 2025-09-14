import PaymentProcessor from '@/components/Booking/PaymentProcessor';
import { PaymentMethod } from '@/types/movie';
import { Metadata } from 'next';

// Force dynamic rendering for payment processing
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ paymentMethod: PaymentMethod }> }): Promise<Metadata> {
  const paymentMethod = (await params).paymentMethod;
  
  return {
    title: `Payment Processing - ${paymentMethod} | Book Your Seat`,
    description: "Your payment is being processed. Please wait while we confirm your movie ticket booking.",
    keywords: ["payment processing", "booking confirmation", "movie tickets", paymentMethod],
    authors: [{ name: "Book Your Seat" }],
    openGraph: {
      title: "Payment Processing - Book Your Seat",
      description: "Your payment is being processed for your movie ticket booking.",
      url: `/paymentSuccess/${paymentMethod}`,
      siteName: "Book Your Seat",
      type: "website",
    },
    robots: {
      index: false, // Payment pages should not be indexed
      follow: false,
    },
  };
}

const Page = async ({ params }: {
  params: Promise<{ paymentMethod: PaymentMethod }>
}) => {
  const paymentMethod = (await params).paymentMethod;
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Payment Processing</h2>
        <PaymentProcessor paymentMethod={paymentMethod} />
      </div>
    </div>
  );
};

export default Page;