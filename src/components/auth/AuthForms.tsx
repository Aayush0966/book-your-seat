import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios, { AxiosError } from 'axios';
import { verifyUser } from '@/app/auth/actions';
import { useRouter } from 'next/navigation';
import { CredentialsType } from '@/types/auth';
import Link from 'next/link';


interface AuthProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  setLogin? : () => void;
}


const SignInForm = ({ showPassword, setShowPassword }: AuthProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email")
    const password = formData.get("password")
    const response = await verifyUser({email, password} as CredentialsType);
    if (response.error) {
      setLoading(false)
      toast.error(response.error)
      return;
    }

  };

  return (
    <motion.form 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10 group-focus-within:text-purple-400 transition-all duration-200" />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className="w-full pl-12 pr-4 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
          />
        </div>

        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10 group-focus-within:text-purple-400 transition-all duration-200" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            required
            className="w-full pl-12 pr-12 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-all duration-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5 z-10" /> : <Eye className="w-5 h-5 z-10" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="relative flex items-center group cursor-pointer">
          <input
            type="checkbox"
            className="peer sr-only"
            aria-label="Remember me"
          />
          <div className="w-5 h-5 border border-white/20 rounded group-hover:border-purple-500/50 peer-checked:border-purple-500 peer-checked:bg-purple-500 transition-all duration-200 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white scale-0 peer-checked:scale-100 transition-all duration-200" />
          </div>
          <span className="ml-3 text-sm text-gray-400 group-hover:text-gray-300 transition-all duration-200">
            Remember me
          </span>
        </label>
        <Link
        href='/auth/forgot-password'
          type="button"
          className="text-sm text-purple-400 hover:text-purple-300 focus:outline-none focus:text-purple-300 transition-all duration-200"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        className="relative cursor-pointer w-full group"
        disabled = {loading}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-200" />
        <div className="relative w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl text-white font-medium transform hover:translate-y-[-1px] transition-all duration-200">
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-2 text-white animate-spin" />
              Signing In...
            </span>
          ) : (
            'Sign In'
          )}
        </div>
      </button>
    </motion.form>
  );
};

const SignupForm = ({ setLogin, showPassword, setShowPassword }: AuthProps) => {
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const fullName = formData.get("fullName");
    const contactNumberValue = formData.get("contactNumber");
    const contactNumber = parseInt(contactNumberValue as string)
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("Password should match Confirm password");
      setLoading(false);
      return;
    }

    try {
      const signupData = {
        email,
        fullName,
        password,
        contactNumber
      };
     const response = await axios.post("/api/auth", signupData);
      if (response.status !== 201) {
        toast.error("Something went wrong");
        setLoading(false);
        return;
      }
      toast.success("Account created successfully");
      if (setLogin) {
        setLogin();
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError?.response?.data as { error: string })?.error;
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10 group-focus-within:text-purple-400 transition-all duration-200" />
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            required
            className="w-full pl-12 pr-4 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
          />
        </div>

        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10 group-focus-within:text-purple-400 transition-all duration-200" />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className="w-full pl-12 pr-4 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
          />
        </div>

        <div className="relative group">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10 group-focus-within:text-purple-400 transition-all duration-200" />
          <input
            type="number"
            name="contactNumber"
            placeholder="Contact number"
            required
            className="w-full pl-12 pr-4 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
          />
        </div>

        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10 group-focus-within:text-purple-400 transition-all duration-200" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create password"
            required
            className="w-full pl-12 pr-12 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-all duration-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5 z-10" /> : <Eye className="w-5 h-5 z-10" />}
          </button>
        </div>

        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10 group-focus-within:text-purple-400 transition-all duration-200" />
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            required
            className="w-full pl-12 pr-12 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/[0.05] text-white placeholder-gray-500 transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-all duration-200"
            aria-label={confirmPasswordVisible ? "Hide password" : "Show password"}
          >
            {confirmPasswordVisible ? <EyeOff className="w-5 h-5 z-10" /> : <Eye className="w-5 h-5 z-10" />}
          </button>
        </div>
      </div>

      <label className="relative flex items-center group cursor-pointer">
        <input
          type="checkbox"
          className="peer sr-only"
          required
          aria-label="Accept terms and conditions"
        />
        <div className="w-5 h-5 border border-white/20 rounded group-hover:border-purple-500/50 peer-checked:border-purple-500 peer-checked:bg-purple-500 transition-all duration-200 flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-white scale-0 peer-checked:scale-100 transition-all duration-200" />
        </div>
        <span className="ml-3 text-sm text-gray-400 group-hover:text-gray-300 transition-all duration-200">
          I agree to the{' '}
          <button 
            type="button" 
            className="text-purple-400 hover:text-purple-300 focus:outline-none focus:text-purple-300 transition-all duration-200"
          >
            Terms & Conditions
          </button>
        </span>
      </label>

      <button
        type="submit"
        className="relative w-full group"
        disabled={loading}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-200" />
        <div className="relative w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl text-white font-medium transform hover:translate-y-[-1px] transition-all duration-200">
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-2 text-white animate-spin" />
              Creating...
            </span>
          ) : (
            'Create Account'
          )}
        </div>
      </button>
    </motion.form>
  );
};

export {SignInForm, SignupForm}