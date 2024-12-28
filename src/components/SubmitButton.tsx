import React from 'react';
import { ArrowRight } from 'lucide-react';

const SubmitButton = ({ text, loading, loadingText }: { text: string, loading: boolean, loadingText: string }) => {
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg py-3 flex items-center justify-center space-x-2 hover:from-red-500 hover:to-red-600 transform hover:scale-[1.02] transition-all duration-200 group"
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <span className="text-white opacity-75">{loadingText}</span>
        </div>
      ) : (
        <>
          <span className="opacity-100">{text}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
};

export default SubmitButton;
