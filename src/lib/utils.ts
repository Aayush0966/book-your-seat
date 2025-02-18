import { clsx, type ClassValue } from "clsx"
import { signOut } from "next-auth/react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const genOTP = async () => {
  const numbers = '123456789'
  let otp = '';
  for (let i =0; i <= 5; i++) {
      otp += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }
  return parseInt(otp);
}

export const handleLogout = async (navigate: { push: (path: string) => void }) => {
    await signOut();
    navigate.push('/auth');
  }

export const formatTime = (timestamp: number) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(new Date(timestamp * 1000));
};
