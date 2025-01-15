'use client'
import React from 'react';
import { Mail } from 'lucide-react';
import AuthHeader from './AuthHeader';
import AuthInput from './AuthInput';
import SubmitButton from '../SubmitButton';
import { authenticateOTP, checkUser } from '@/app/admin/actions';
import toast from 'react-hot-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { UserType } from '@/types/user';
import { useRouter } from 'next/navigation';

export function AdminLogin() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [adminDetails, setAdminDetails] = React.useState<UserType>();
  const [isEmail, setIsEmail] = React.useState<boolean>(true)
  const [OTP, setOTP] = React.useState<string>();
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.target as HTMLFormElement);
      if (isEmail) {
        await handleEmailSubmission(formData);
      }
      else {
        await handleOTPSubmission();
      }
      
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleEmailSubmission = async (formData: FormData) => {
    const email = formData.get('email')?.toString().trim();

    const admin = await checkUser(email as string);
    if (!admin) {
      toast.error('Admin account not found');
      return;
    }
    setIsEmail(false)
    setAdminDetails(admin);
    toast.success('OTP sent to your email');
  }

  const handleOTPSubmission = async () => {
     if (!adminDetails?.email) return;
     const user = await authenticateOTP(adminDetails.email, OTP ? parseInt(OTP) : 0)
     if (user === null) {
      toast.error("Invalid OTP")
     }
     else {
      toast.success("Authentication Successful")
      router.push('/admin')
     }
  }

  const handleOTPChange = (value: string) => {
    setOTP(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-800">
          <AuthHeader 
            title={adminDetails ? 'Security Verification' : 'Admin Dashboard'} 
            subtitle={adminDetails 
              ? 'Please enter the 6-digit code sent to your email'
              : 'Secure access to theater management system'
            } 
          />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {!adminDetails ? (
                <AuthInput
                  icon={Mail}
                  type="email"
                  name="email"
                  placeholder="Enter Admin Email"
                />
              ) : (
                <div className='flex text-white justify-center text-center items-center'>
                  <InputOTP 
                    maxLength={6}
                    value={OTP}
                    onChange={handleOTPChange}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              )}
            </div>
            <SubmitButton 
              loading={loading} 
              loadingText={adminDetails ? 'Verifying OTP..': 'Authenticating..'} 
              text={adminDetails ? 'Verify OTP' : 'Sign In'} 
            />
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Need assistance?{' '}
              <a 
                href="mailto:support@moviemaster.com" 
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
      </div>
  );
}