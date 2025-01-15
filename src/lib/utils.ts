import { clsx, type ClassValue } from "clsx"
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