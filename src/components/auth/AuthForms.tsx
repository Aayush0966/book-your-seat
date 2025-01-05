import { AuthProps } from '@/types/movie';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle } from 'lucide-react';

const SignInForm = ({ showPassword, setShowPassword }: AuthProps) => (
  <motion.form
    className="space-y-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="space-y-4">
      <div className="relative group">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-all duration-200" />
        <input
          type="email"
          placeholder="Email address"
          className="w-full pl-12 pr-4 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
        />
      </div>

      <div className="relative group">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-all duration-200" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full pl-12 pr-12 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-all duration-200"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <label className="relative flex items-center group">
        <input
          type="checkbox"
          className="peer sr-only"
        />
        <div className="w-5 h-5 border border-white/20 rounded group-hover:border-purple-500/50 peer-checked:border-purple-500 peer-checked:bg-purple-500 transition-all duration-200 flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-white scale-0 peer-checked:scale-100 transition-all duration-200" />
        </div>
        <span className="ml-3 text-sm text-gray-400 group-hover:text-gray-300 transition-all duration-200">
          Remember me
        </span>
      </label>
      <button
        type="button"
        className="text-sm text-purple-400 hover:text-purple-300 focus:outline-none focus:text-purple-300 transition-all duration-200"
      >
        Forgot password?
      </button>
    </div>

    <button
      type="submit"
      className="relative w-full group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-200" />
      <div className="relative w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl text-white font-medium transform hover:translate-y-[-1px] transition-all duration-200">
        Sign in
      </div>
    </button>
  </motion.form>
);

const SignupForm = ({ showPassword, setShowPassword }: AuthProps) => (
  <motion.form
    className="space-y-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="space-y-4">
      <div className="relative group">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-all duration-200" />
        <input
          type="text"
          placeholder="Full name"
          className="w-full pl-12 pr-4 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
        />
      </div>

      <div className="relative group">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-all duration-200" />
        <input
          type="email"
          placeholder="Email address"
          className="w-full pl-12 pr-4 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
        />
      </div>

      <div className="relative group">
        <input
          type="number"
          placeholder="Contact number"
          className="w-full pl-12 pr-4 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
        />
      </div>

      <div className="relative group">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-all duration-200" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Create password"
          className="w-full pl-12 pr-12 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-all duration-200"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Confirm Password Field */}
      <div className="relative group">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-all duration-200" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm password"
          className="w-full pl-12 pr-12 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-all duration-200"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>

    <label className="relative flex items-center group">
      <input
        type="checkbox"
        className="peer sr-only"
      />
      <div className="w-5 h-5 border border-white/20 rounded group-hover:border-purple-500/50 peer-checked:border-purple-500 peer-checked:bg-purple-500 transition-all duration-200 flex items-center justify-center">
        <CheckCircle className="w-4 h-4 text-white scale-0 peer-checked:scale-100 transition-all duration-200" />
      </div>
      <span className="ml-3 text-sm text-gray-400 group-hover:text-gray-300 transition-all duration-200">
        I agree to the{' '}
        <button type="button" className="text-purple-400 hover:text-purple-300 focus:outline-none focus:text-purple-300 transition-all duration-200">
          Terms & Conditions
        </button>
      </span>
    </label>

    <button
      type="submit"
      className="relative w-full group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-200" />
      <div className="relative w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl text-white font-medium transform hover:translate-y-[-1px] transition-all duration-200">
        Create account
      </div>
    </button>
  </motion.form>
);

export { SignInForm, SignupForm };
