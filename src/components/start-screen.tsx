import React from 'react';
import { Button } from './ui/button';
import { Heart, Zap, Shield, Smartphone } from 'lucide-react';

interface StartScreenProps {
  onNavigate: (screen: string) => void;
}

export function StartScreen({ onNavigate }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex flex-col safe-top">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">SmartHeal</span>
        </div>
        <div className="text-sm text-gray-600">by Runverve</div>
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        <div className="text-center max-w-md mx-auto">
          {/* Logo */}
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg">
            <Heart className="w-12 h-12 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to SmartHeal
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Professional ITT therapy device with AI-powered guidance and personalized treatment plans
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">AI Guidance</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Safe Therapy</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Health Tracking</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <Smartphone className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Voice Control</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => onNavigate('login')}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl shadow-lg"
            >
              Login to Your Account
            </Button>
            
            <Button 
              onClick={() => onNavigate('signup')}
              variant="outline"
              className="w-full border-2 border-red-500 text-red-500 hover:bg-red-50 py-3 rounded-xl"
            >
              Create New Account
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 mt-8 text-xs text-gray-500">
            <span className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              FDA Approved
            </span>
            <span className="flex items-center">
              <Heart className="w-3 h-3 mr-1" />
              Clinically Tested
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>
    </div>
  );
}