'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInForm, SignupForm } from './AuthForms';
import SlideShow from './SlideShow';

const MovieAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MovieAuth;