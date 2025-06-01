'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInForm, SignupForm } from './AuthForms';
import SlideShow from './SlideShow';
import { signInWithGoogle } from '@/app/auth/actions';

const MovieAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);


  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  }


  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 to-gray-900">
      <SlideShow />

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-6 mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
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
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-gray-400 text-lg">
                  {isLogin ? "New to our platform? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 hover:underline"
                  >
                    {isLogin ? "Sign up" : "Log in"}
                  </button>
                </p>
              </motion.div>
            
              {isLogin ? (
                <SignInForm showPassword={showPassword} setShowPassword={setShowPassword} />
              ) : (
                <SignupForm setLogin={() => setIsLogin(true)} showPassword={showPassword} setShowPassword={setShowPassword} />
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-base">
                  <span className="px-6 text-gray-400 bg-gray-900">
                    Or continue with
                  </span>
                </div>
              </div>

              <motion.div 
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => {
                    handleGoogleLogin();
                  }}
                  type="button"
                  className="flex items-center justify-center px-8 py-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/50 hover:scale-105 transition-all duration-200 text-white/90 hover:text-white group"
                >
                  <img src="https://img.icons8.com/fluency/48/google-logo.png" alt="Google" className="w-6 h-6 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span className="text-lg">Google</span>
                </button>
                
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MovieAuth;