'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SignInForm from './SignInForm';
import SignupForm from './SignUpForm';
import SlideShow from './SlideShow';

const MovieAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-900">
      <SlideShow />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {isLogin ? "Welcome back" : "Create account"}
                </h1>
                <p className="text-gray-400">
                  {isLogin ? "New to our platform? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    {isLogin ? "Sign up" : "Log in"}
                  </button>
                </p>
              </div>

              {isLogin ? <SignInForm showPassword={showPassword} setShowPassword={setShowPassword} /> : <SignupForm showPassword={showPassword} setShowPassword={setShowPassword} />}

              <div className="relative mt-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500 bg-gray-900">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-white"
                >
                  <img src="https://img.icons8.com/fluency/48/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-white"
                >
                  <img src="https://img.icons8.com/ios-filled/50/mac-os.png" alt="Apple" className="w-5 h-5 mr-2" />
                  Apple
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MovieAuth;