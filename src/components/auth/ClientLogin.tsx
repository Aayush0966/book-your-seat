'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';

const MovieAuth = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const slides = [
    {
      title: "Experience Cinema",
      subtitle: "Book your perfect movie night",
      image: "/api/placeholder/1200/800"
    },
    {
      title: "Premium Seats",
      subtitle: "Your comfort, our priority",
      image: "/api/placeholder/1200/800"
    },
    {
      title: "Latest Releases",
      subtitle: "Watch them first",
      image: "/api/placeholder/1200/800"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const LoginForm = () => (
    <form className="space-y-6">
      <div className="relative">
        <Mail className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
        <input
          type="email"
          placeholder="Email address"
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
        />
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 rounded border-gray-500 bg-white/5 text-purple-600 focus:ring-purple-500"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
            Remember me
          </label>
        </div>
        <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
      >
        Sign in
      </button>
    </form>
  );

  const SignupForm = () => (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="First name"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Last name"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
          />
        </div>
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
        <input
          type="email"
          placeholder="Email address"
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
        />
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Create password"
          className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 rounded border-gray-500 bg-white/5 text-purple-600 focus:ring-purple-500"
        />
        <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
          I agree to the{' '}
          <a href="#" className="text-purple-400 hover:text-purple-300">
            Terms & Conditions
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
      >
        Create account
      </button>
    </form>
  );

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Left Side - Sliding Images */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-purple-900">
        <motion.button
          className="absolute top-4 left-4 z-20 flex items-center space-x-2 text-white/80 hover:text-white"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to website</span>
        </motion.button>

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-20 left-20 z-20 text-white">
          <motion.h2
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4"
          >
            {slides[currentSlide].title}
          </motion.h2>
          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-white/80"
          >
            {slides[currentSlide].subtitle}
          </motion.p>
        </div>

        <div className="absolute bottom-10 left-20 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-1 rounded-full transition-colors ${
                currentSlide === index ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Auth Form */}
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

              {isLogin ? <LoginForm /> : <SignupForm />}

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
                  <img src="/api/placeholder/20/20" alt="Google" className="w-5 h-5 mr-2" />
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-white"
                >
                  <img src="/api/placeholder/20/20" alt="Apple" className="w-5 h-5 mr-2" />
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