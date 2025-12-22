import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, Heart, MessageSquare, Phone } from 'lucide-react';

interface OTPScreenProps {
  onNavigate: (screen: string) => void;
  user: any;
}

export function OTPScreen({ onNavigate, user }: OTPScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      alert('Please enter complete OTP');
      return;
    }

    setIsLoading(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('profile-type');
    }, 1500);
  };

  const handleResend = () => {
    setTimeLeft(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
  };

  const maskedPhone = user?.phone ? 
    user.phone.replace(/(\+\d{1,3})(\d{3})(\d{3})(\d{4})/, '$1 *** *** $4') : 
    '+1 *** *** ****';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 safe-top">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('login')}
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
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Number</h1>
            <p className="text-gray-600 mb-2">
              We've sent a 6-digit code to
            </p>
            <p className="text-gray-900 font-medium">{maskedPhone}</p>
          </div>

          {/* OTP Input */}
          <div className="mb-8">
            <div className="flex justify-center space-x-3 mb-6">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-bold rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-red-500"
                  maxLength={1}
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-center">
              {canResend ? (
                <Button
                  variant="ghost"
                  onClick={handleResend}
                  className="text-red-500 hover:text-red-600"
                >
                  Resend Code
                </Button>
              ) : (
                <p className="text-gray-500">
                  Resend code in {timeLeft}s
                </p>
              )}
            </div>
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={isLoading || otp.join('').length !== 6}
            className="w-full bg-red-500 hover:bg-red-600 text-white h-12 rounded-xl shadow-lg disabled:opacity-50 mb-6"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              'Verify Code'
            )}
          </Button>

          {/* Alternative Verification */}
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-500">Didn't receive the code?</p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Me
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Email Code
              </Button>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs text-blue-800 text-center">
              🔒 This verification step ensures the security of your SmartHeal account and medical data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPScreen;