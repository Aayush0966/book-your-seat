import ForgotPassword from "@/components/forget-password/ForgotPassword";
import React from "react";

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
