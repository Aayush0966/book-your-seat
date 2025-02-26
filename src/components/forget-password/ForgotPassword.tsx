'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
    InputOTP, 
    InputOTPGroup, 
    InputOTPSlot,
    InputOTPSeparator 
} from '../ui/input-otp'
import { KeyRound, Mail, ArrowLeft, HelpCircle, ArrowRight } from 'lucide-react'

const emailSchema = z.object({
    email: z.string().email("Please enter a valid email address")
})

const otpSchema = z.object({
    otp: z.string().min(6, "OTP must be 6 characters").max(6)
})

const passwordSchema = z.object({
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(100),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

const ForgotPassword = ({data}: {data: { code: string | null, email: string | null}}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [step, setStep] = useState<string>(data?.email === null ? 'email' : 'code');
    const [email, setEmail] = useState<string>(data?.email || "");
    const [token, setToken] = useState<string>("");
    
    const emailForm = useForm<z.infer<typeof emailSchema>>({
        defaultValues: {
          email: "",
        },
        resolver: zodResolver(emailSchema)
    });

    const otpForm = useForm<z.infer<typeof otpSchema>>({
        defaultValues: {
          otp: "",
        },
        resolver: zodResolver(otpSchema)
    });
    
    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
        defaultValues: {
          password: "",
          confirmPassword: "",
        },
        resolver: zodResolver(passwordSchema)
    });

    async function onEmailSubmit(values: z.infer<typeof emailSchema>) {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/auth/forgot-password', {
                step,
                data: {
                    email: values.email
                }
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                setEmail(values.email);
                setStep('code');
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/auth/forgot-password', {
                step,
                data: {
                    email: email,
                    code: values.otp
                }
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                setToken(response.data.resetToken); // Store the reset token for the next step
                setStep('password');
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    async function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/auth/forgot-password', {
                step,
                data: {
                    email: email,
                    code: token,
                    password: values.password
                }
            });
            if (response.status === 200) {
                toast.success("Password reset successfully!");
                setTimeout(() => {
                    window.location.href = '/auth';
                }, 1500);
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (data?.code && data?.email) {
            console.log(data.code, data.email)
            setEmail(data.email);
            otpForm.setValue('otp', data.code.toString());
            const timer = setTimeout(() => {
                if (data.code) {
                    onOtpSubmit({ otp: data.code.toString() });
                }
            }, 500);
            
            return () => clearTimeout(timer);
        }
        // If code or email is null or undefined, do nothing
    }, [data, otpForm]);

    const getStepDescription = () => {
        switch(step) {
            case 'email':
                return 'Enter your email address and we\'ll send you a verification code.';
            case 'code':
                return 'Enter the verification code sent to your email address.';
            case 'password':
                return 'Create a new password for your account.';
            default:
                return '';
        }
    }

    const getStepIcon = () => {
        switch(step) {
            case 'email':
                return <Mail className="h-8 w-8 text-indigo-500" />;
            case 'code':
                return <div className="text-4xl font-bold text-indigo-500">#</div>;
            case 'password':
                return <KeyRound className="h-8 w-8 text-indigo-500" />;
            default:
                return null;
        }
    }

    const progressPercentage = step === 'email' ? 33 : step === 'code' ? 66 : 100;

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50'>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 to-purple-600 transform -skew-y-2"></div>
            
            <Card className='w-full max-w-lg bg-white/80 backdrop-blur-sm shadow-xl border-none relative overflow-hidden'>
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
                    <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-in-out" 
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full transform translate-x-16 -translate-y-16 opacity-50"></div>
                
                <CardHeader className='pt-8'>
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="flex justify-center items-center h-12 w-12 rounded-full bg-indigo-100">
                            {getStepIcon()}
                        </div>
                        <CardTitle className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Recover Account</CardTitle>
                    </div>
                    <CardDescription className='text-gray-600'>
                        {getStepDescription()}
                    </CardDescription>
                </CardHeader>
                
                <CardContent>
                    {step === 'email' ? (
                        <Form {...emailForm}>
                            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className='space-y-4'>
                                <FormField
                                    control={emailForm.control}
                                    name='email'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">Email</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        placeholder='Enter your email'
                                                        type='email'
                                                        disabled={isLoading}
                                                        className="pl-10 border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type='submit'
                                    className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200'
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Sending...' : 'Send Verification Code'}
                                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                                </Button>
                            </form>
                        </Form>
                    ) : step === 'code' ? (
                        <div className='space-y-6 py-2'>
                            <div>
                                <div className="mb-4 text-gray-700 font-medium">Verification Code</div>
                                <div className='flex justify-center'>
                                    <InputOTP 
                                        maxLength={6} 
                                        value={otpForm.watch('otp')} 
                                        onChange={(value) => otpForm.setValue('otp', value)}
                                        className="gap-2"
                                    >
                                        <InputOTPGroup className="gap-2">
                                            <InputOTPSlot 
                                                index={0} 
                                                className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-12 h-12 text-xl"
                                            />
                                            <InputOTPSlot 
                                                index={1} 
                                                className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-12 h-12 text-xl"
                                            />
                                            <InputOTPSlot 
                                                index={2} 
                                                className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-12 h-12 text-xl"
                                            />
                                        </InputOTPGroup>
                                        <InputOTPSeparator className="text-gray-300">-</InputOTPSeparator>
                                        <InputOTPGroup className="gap-2">
                                            <InputOTPSlot 
                                                index={3} 
                                                className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-12 h-12 text-xl"
                                            />
                                            <InputOTPSlot 
                                                index={4} 
                                                className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-12 h-12 text-xl"
                                            />
                                            <InputOTPSlot 
                                                index={5} 
                                                className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-12 h-12 text-xl"
                                            />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                                {otpForm.formState.errors.otp && (
                                    <div className="text-sm font-medium text-red-500 mt-2 text-center">
                                        {otpForm.formState.errors.otp.message}
                                    </div>
                                )}
                                <div className="text-center text-gray-500 text-sm mt-4">
                                    We sent a code to <span className="font-medium text-gray-700">{email}</span>
                                </div>
                            </div>
                            <Button
                                className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200'
                                disabled={isLoading || !otpForm.watch('otp') || otpForm.watch('otp').length < 6}
                                onClick={() => otpForm.handleSubmit(onOtpSubmit)()}
                            >
                                {isLoading ? 'Verifying...' : 'Verify Code'}
                                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                            </Button>
                        </div>
                    ) : (
                        <Form {...passwordForm}>
                            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className='space-y-4'>
                                <FormField
                                    control={passwordForm.control}
                                    name='password'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">New Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        placeholder='Enter new password'
                                                        type='password'
                                                        disabled={isLoading}
                                                        className="pl-10 border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={passwordForm.control}
                                    name='confirmPassword'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">Confirm Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        placeholder='Confirm your password'
                                                        type='password'
                                                        disabled={isLoading}
                                                        className="pl-10 border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type='submit'
                                    className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200'
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Resetting...' : 'Reset Password'}
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
                
                <CardFooter className='flex justify-between py-5 border-t border-gray-100'>
                    <Button
                        variant='ghost'
                        className='text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 flex items-center gap-1'
                        onClick={() => window.location.href='/auth'}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to login
                    </Button>
                    
                    {step === 'code' && (
                        <Button
                            variant='ghost'
                            className='text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                            onClick={() => setStep('email')}
                            disabled={isLoading}
                        >
                            Change email
                        </Button>
                    )}
                    
                    <Button
                        variant='ghost'
                        className='text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 flex items-center gap-1'
                        onClick={() => window.location.href='/help'}
                    >
                        Need Help?
                        <HelpCircle className="h-4 w-4" />
                    </Button>
                </CardFooter>
                
                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full transform -translate-x-12 translate-y-12 opacity-50"></div>
            </Card>
        </div>
    )
}

export default ForgotPassword;