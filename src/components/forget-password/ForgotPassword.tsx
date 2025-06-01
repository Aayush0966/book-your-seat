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
import { motion, AnimatePresence } from 'framer-motion'
import SlideShow from '../auth/SlideShow'

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

    const getStepTitle = () => {
        switch(step) {
            case 'email':
                return 'Reset Password';
            case 'code':
                return 'Verify Code';
            case 'password':
                return 'Create New Password';
            default:
                return '';
        }
    }

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

    const progressPercentage = step === 'email' ? 33 : step === 'code' ? 66 : 100;

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-gray-900 to-gray-900">
            <SlideShow />
            
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md px-6 mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="space-y-10"
                        >
                            <motion.div 
                                className="text-center"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h1 className="text-5xl font-bold text-white mb-4">
                                    {getStepTitle()}
                                </h1>
                                <p className="text-gray-400 text-lg">
                                    {getStepDescription()}
                                </p>
                                
                                {/* Progress bar */}
                                <div className="flex justify-between mt-8 mb-4 px-1">
                                    <div className={`h-1 w-1/3 rounded-full ${step === 'email' || step === 'code' || step === 'password' ? 'bg-purple-500' : 'bg-gray-700'} transition-all duration-300`}></div>
                                    <div className="mx-1"></div>
                                    <div className={`h-1 w-1/3 rounded-full ${step === 'code' || step === 'password' ? 'bg-purple-500' : 'bg-gray-700'} transition-all duration-300`}></div>
                                    <div className="mx-1"></div>
                                    <div className={`h-1 w-1/3 rounded-full ${step === 'password' ? 'bg-purple-500' : 'bg-gray-700'} transition-all duration-300`}></div>
                                </div>
                            </motion.div>
                            
                            {step === 'email' ? (
                                <motion.form
                                    className="space-y-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                                >
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10 group-focus-within:text-purple-400 transition-all duration-200" />
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            disabled={isLoading}
                                            {...emailForm.register('email')}
                                            className="w-full pl-12 pr-4 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
                                        />
                                    </div>
                                    {emailForm.formState.errors.email && (
                                        <p className="text-red-400 text-sm">
                                            {emailForm.formState.errors.email.message}
                                        </p>
                                    )}
                                    
                                    <button
                                        type="submit"
                                        className="relative cursor-pointer w-full group"
                                        disabled={isLoading}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-200" />
                                        <div className="relative w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl text-white font-medium transform hover:translate-y-[-1px] transition-all duration-200 flex items-center justify-center">
                                            {isLoading ? 'Sending...' : 'Send Verification Code'}
                                            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                                        </div>
                                    </button>
                                </motion.form>
                            ) : step === 'code' ? (
                                <motion.div
                                    className="space-y-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="mb-2 text-gray-400 text-center">
                                            We sent a verification code to <span className="font-medium text-white">{email}</span>
                                        </div>
                                        
                                        <div className="w-full">
                                            <InputOTP 
                                                maxLength={6} 
                                                value={otpForm.watch('otp')} 
                                                onChange={(value) => otpForm.setValue('otp', value)}
                                                className="gap-2 flex justify-center"
                                            >
                                                <InputOTPGroup className="gap-2">
                                                    <InputOTPSlot 
                                                        index={0} 
                                                        className="w-14 h-14 text-xl bg-white/[0.03] border-white/20 text-white focus:border-purple-500 focus:ring-purple-500/20"
                                                    />
                                                    <InputOTPSlot 
                                                        index={1} 
                                                        className="w-14 h-14 text-xl bg-white/[0.03] border-white/20 text-white focus:border-purple-500 focus:ring-purple-500/20"
                                                    />
                                                    <InputOTPSlot 
                                                        index={2} 
                                                        className="w-14 h-14 text-xl bg-white/[0.03] border-white/20 text-white focus:border-purple-500 focus:ring-purple-500/20"
                                                    />
                                                </InputOTPGroup>
                                                <InputOTPSeparator className="text-gray-600">-</InputOTPSeparator>
                                                <InputOTPGroup className="gap-2">
                                                    <InputOTPSlot 
                                                        index={3} 
                                                        className="w-14 h-14 text-xl bg-white/[0.03] border-white/20 text-white focus:border-purple-500 focus:ring-purple-500/20"
                                                    />
                                                    <InputOTPSlot 
                                                        index={4} 
                                                        className="w-14 h-14 text-xl bg-white/[0.03] border-white/20 text-white focus:border-purple-500 focus:ring-purple-500/20"
                                                    />
                                                    <InputOTPSlot 
                                                        index={5} 
                                                        className="w-14 h-14 text-xl bg-white/[0.03] border-white/20 text-white focus:border-purple-500 focus:ring-purple-500/20"
                                                    />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                        
                                        {otpForm.formState.errors.otp && (
                                            <p className="text-red-400 text-sm">
                                                {otpForm.formState.errors.otp.message}
                                            </p>
                                        )}
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            className="relative flex-1"
                                            onClick={() => setStep('email')}
                                            disabled={isLoading}
                                        >
                                            <div className="w-full py-4 bg-white/[0.03] border border-white/20 hover:bg-white/[0.05] rounded-xl text-white font-medium transform hover:translate-y-[-1px] transition-all duration-200 flex items-center justify-center gap-2">
                                                <ArrowLeft className="h-4 w-4" />
                                                Back
                                            </div>
                                        </button>
                                        
                                        <button
                                            type="button"
                                            className="relative cursor-pointer flex-1 group"
                                            disabled={isLoading || !otpForm.watch('otp') || otpForm.watch('otp').length < 6}
                                            onClick={() => otpForm.handleSubmit(onOtpSubmit)()}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-200" />
                                            <div className="relative w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl text-white font-medium transform hover:translate-y-[-1px] transition-all duration-200 flex items-center justify-center">
                                                {isLoading ? 'Verifying...' : 'Verify Code'}
                                                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                                            </div>
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.form
                                    className="space-y-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                                >
                                    <div className="space-y-4">
                                        <div className="relative group">
                                            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10 group-focus-within:text-purple-400 transition-all duration-200" />
                                            <input
                                                type="password"
                                                placeholder="Enter new password"
                                                disabled={isLoading}
                                                {...passwordForm.register('password')}
                                                className="w-full pl-12 pr-4 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
                                            />
                                        </div>
                                        {passwordForm.formState.errors.password && (
                                            <p className="text-red-400 text-sm">
                                                {passwordForm.formState.errors.password.message}
                                            </p>
                                        )}
                                        
                                        <div className="relative group">
                                            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10 group-focus-within:text-purple-400 transition-all duration-200" />
                                            <input
                                                type="password"
                                                placeholder="Confirm your password"
                                                disabled={isLoading}
                                                {...passwordForm.register('confirmPassword')}
                                                className="w-full pl-12 pr-4 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
                                            />
                                        </div>
                                        {passwordForm.formState.errors.confirmPassword && (
                                            <p className="text-red-400 text-sm">
                                                {passwordForm.formState.errors.confirmPassword.message}
                                            </p>
                                        )}
                                    </div>
                                    
                                    <button
                                        type="submit"
                                        className="relative cursor-pointer w-full group"
                                        disabled={isLoading}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-200" />
                                        <div className="relative w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl text-white font-medium transform hover:translate-y-[-1px] transition-all duration-200">
                                            {isLoading ? 'Resetting Password...' : 'Reset Password'}
                                        </div>
                                    </button>
                                </motion.form>
                            )}
                            
                            <div className="flex justify-center mt-4">
                                <button
                                    type="button"
                                    className="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-200 flex items-center gap-2"
                                    onClick={() => window.location.href='/auth'}
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to login
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;