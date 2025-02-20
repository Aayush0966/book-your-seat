import { Price, Pricing } from "@/types/movie"
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

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR'
  }).format(amount);
};

const getPrice = (category: string, showPrices:Pricing) => {
  switch (category) {
    case 'silver':
      return showPrices?.silver;
    case 'gold':
      return showPrices?.gold;
    case 'platinum':
      return showPrices?.platinum;
    default:
      return 150;
  }
};

export const getTotalPrice = (selectedSeats: string[], showPrices: Pricing) => {
  const prices = selectedSeats.map((seat) => getPrice(seat.split('/')[0], showPrices));
  return prices.reduce((total, price) => total! + (price || 0), 0);
};