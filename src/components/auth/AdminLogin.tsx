'use client'

import { Mail, Lock } from 'lucide-react';
import AuthHeader  from './AuthHeader';
import AuthInput from './AuthInput';
import SubmitButton  from '../SubmitButton';

export function AdminLogin() {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email')
    const password = formData.get('password')
    console.log("Email: ", email, " Password: ", password)
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-800">
          <AuthHeader title="Admin Dashboard" subtitle="Sign in to manage theaters and movies" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <AuthInput
                icon={Mail}
                type="email"
                name= "email"
                placeholder="Admin Email"
              />
              <AuthInput
                icon={Lock}
                name= "password"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-700 bg-gray-900/50 text-red-500 focus:ring-red-500"
                />
                <label className="ml-2 text-sm text-gray-400">Remember me</label>
              </div>
              <a href="/admin/forgot-password" className="text-sm text-red-500 hover:text-red-400">
                Forgot password?
              </a>
            </div>

            <SubmitButton text="Sign In to Dashboard" />
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Need help? Contact{' '}
              <a href="mailto:support@moviemaster.com" className="text-red-500 hover:text-red-400">
                IT Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}