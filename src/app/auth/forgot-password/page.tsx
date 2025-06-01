import ForgotPassword from "@/components/forget-password/ForgotPassword";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - Book Your Seat",
  description: "Reset your password to regain access to your Book Your Seat account. Enter your email to receive password reset instructions.",
  keywords: ["forgot password", "reset password", "password recovery", "account recovery"],
  authors: [{ name: "Book Your Seat" }],
  openGraph: {
    title: "Forgot Password - Book Your Seat",
    description: "Reset your password to regain access to your Book Your Seat account.",
    url: "/auth/forgot-password",
    siteName: "Book Your Seat",
    type: "website",
  },
  robots: {
    index: false, // Password reset pages should not be indexed
    follow: false,
  },
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ code?: string; email?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const code = (await searchParams).code || null;
  const email = (await searchParams).email || null;
 
  return (
    <div>
      <ForgotPassword data={{code, email }} />
    </div>
  );
}
