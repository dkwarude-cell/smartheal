import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Eye, EyeOff, Heart, Mail, Lock } from 'lucide-react';

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
  onUserUpdate: (userData: any) => void;
}

export function LoginScreen({ onNavigate, onUserUpdate }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onUserUpdate({
        name: 'Dr. Sarah Johnson',
        email: email,
        phone: '+1 (555) 123-4567'
      });
      setIsLoading(false);
      onNavigate('otp');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('start')}
          className="flex items-center space-x-2 text-gray-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">SmartHeal</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue your therapy journey</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-red-500 focus:ring-red-500"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 p-0"
              >
                Forgot Password?
              </Button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-500 hover:bg-red-600 text-white h-12 rounded-xl shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="mx-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('signup')}
                className="text-red-500 hover:text-red-600 p-0 font-medium"
              >
                Sign up here
              </Button>
            </p>
          </div>

          {/* Professional Login */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800 text-center">
              Healthcare Professional? Use your institutional credentials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;