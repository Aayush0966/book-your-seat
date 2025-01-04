import { AuthProps } from '@/types/movie';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const SignupForm = ({showPassword, setShowPassword} : AuthProps) => (
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

  export default SignupForm;