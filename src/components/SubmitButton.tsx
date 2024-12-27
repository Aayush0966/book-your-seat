import React from 'react';
import { ArrowRight } from 'lucide-react';

const SubmitButton = ({ text }: {text: string}) => {
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg py-3 flex items-center justify-center space-x-2 hover:from-red-500 hover:to-red-600 transform hover:scale-[1.02] transition-all duration-200 group"
    >
      <span>{text}</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}
export default SubmitButton