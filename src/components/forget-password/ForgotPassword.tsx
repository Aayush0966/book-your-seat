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
import {useState} from 'react'
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

const ForgetPassword = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [step, setStep] = useState<string>('email');
    const [email, setEmail] = useState<string>("");
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

    const getStepDescription = () => {
        switch(step) {
            case 'email':
                return 'Enter your email address and we\'ll send you a code to reset your password.';
            case 'code':
                return 'Enter the verification code sent to your email address.';
            case 'password':
                return 'Create a new password for your account.';
            default:
                return '';
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Card className='w-full max-w-lg'>
                <CardHeader>
                <CardTitle>Forgot password</CardTitle>
                <CardDescription>
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
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                placeholder='Enter your email'
                                                type='email'
                                                disabled={isLoading}
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                type='submit'
                                className='w-full'
                                disabled={isLoading}
                                >
                                    {isLoading ? 'Sending...' : 'Send Reset Code'}
                                </Button>
                            </form>
                        </Form>
                    ) : step === 'code' ? (
                        <div className='space-y-4'>
                            <div>
                                <div className="mb-2">Verification Code</div>
                                <div className='flex justify-center'>
                                    <InputOTP maxLength={6} value={otpForm.watch('otp')} onChange={(value) => otpForm.setValue('otp', value)}>
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
                                {otpForm.formState.errors.otp && (
                                    <div className="text-sm font-medium text-destructive mt-2">
                                        {otpForm.formState.errors.otp.message}
                                    </div>
                                )}
                            </div>
                            <Button
                                className='w-full'
                                disabled={isLoading || !otpForm.watch('otp') || otpForm.watch('otp').length < 6}
                                onClick={() => otpForm.handleSubmit(onOtpSubmit)()}
                            >
                                {isLoading ? 'Verifying...' : 'Verify Code'}
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
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                placeholder='Enter new password'
                                                type='password'
                                                disabled={isLoading}
                                                {...field}
                                                />
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
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                placeholder='Confirm your password'
                                                type='password'
                                                disabled={isLoading}
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                type='submit'
                                className='w-full'
                                disabled={isLoading}
                                >
                                    {isLoading ? 'Resetting...' : 'Reset Password'}
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
                <CardFooter className='flex justify-between'>
                    <Button
                    variant='link'
                    className='text-sm text-muted-foreground'
                    onClick={() => window.location.href='/auth'}
                    >
                        Back to login
                    </Button>
                    {step === 'code' && (
                        <Button
                        variant='link'
                        className='text-sm text-muted-foreground'
                        onClick={() => setStep('email')}
                        disabled={isLoading}
                        >
                            Change email
                        </Button>
                    )}
                    <Button
                    variant='link'
                    className='text-sm text-muted-foreground'
                    onClick={() => window.location.href='/help'}
                    >
                        Need Help?
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ForgetPassword;