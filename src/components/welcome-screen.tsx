import React from 'react';
import { Button } from './ui/button';
import { Heart, Bluetooth, Smartphone, Zap, Shield, CheckCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
  user: any;
}

export function WelcomeScreen({ onNavigate, user }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <div className="flex items-center justify-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">SmartHeal</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto text-center">
          {/* Welcome Message */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome, {user?.name?.split(' ')[0] || 'User'}! 🎉
            </h1>
            
            <p className="text-lg text-gray-600 mb-2">
              Your SmartHeal account is ready
            </p>
            
            <p className="text-gray-500">
              Let's connect your therapy device to get started
            </p>
          </div>

          {/* Features Overview */}
          <div className="mb-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
            
            <div className="grid gap-4">
              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Bluetooth className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">Connect Device</h3>
                  <p className="text-sm text-gray-600">Pair your SmartHeal ITT device</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">AI Guidance</h3>
                  <p className="text-sm text-gray-600">Get personalized placement help</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Smartphone className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">Voice Control</h3>
                  <p className="text-sm text-gray-600">Hands-free therapy management</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">Progress Tracking</h3>
                  <p className="text-sm text-gray-600">Monitor your recovery journey</p>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Notice */}
          <div className="mb-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 text-amber-600 mr-2" />
              <span className="font-medium text-amber-800">Safety First</span>
            </div>
            <p className="text-sm text-amber-700">
              Always consult with your healthcare provider before starting any new therapy regimen
            </p>
          </div>

          {/* CTA Button */}
          <div className="space-y-3">
            <Button
              onClick={() => onNavigate('device-connection')}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl shadow-lg"
            >
              Connect Your Device
            </Button>
            
            <Button
              onClick={() => onNavigate('main-app')}
              variant="ghost"
              className="w-full text-gray-500 hover:text-gray-700"
            >
              Skip for now
            </Button>
          </div>

          {/* Support */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">Need help?</p>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;