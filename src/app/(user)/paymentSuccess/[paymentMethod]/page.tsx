import PaymentProcessor from '@/components/Booking/PaymentProcessor';
import { PaymentMethod } from '@/types/movie';

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