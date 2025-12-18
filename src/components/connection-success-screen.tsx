import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle, Activity, Bluetooth } from 'lucide-react';

interface ConnectionSuccessScreenProps {
  onNavigate: (screen: string) => void;
}

export function ConnectionSuccessScreen({ onNavigate }: ConnectionSuccessScreenProps) {
  return (
    <div className="p-6 space-y-8">
      {/* Success Icon */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl text-green-800">Connected Successfully!</h1>
        <p className="text-gray-600">
          Your ITT device is now connected and ready for therapy sessions
        </p>
      </div>

      {/* Device Status */}
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white text-xs">ITT</span>
              </div>
              <div>
                <h3 className="text-green-800">ITT Therapeutic Device</h3>
                <p className="text-sm text-green-700">Model: ITT-2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Bluetooth className="w-4 h-4 text-green-600" />
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-green-200">
            <div className="text-center">
              <p className="text-sm text-green-700">Battery</p>
              <p className="text-lg text-green-800">85%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-green-700">Signal</p>
              <p className="text-lg text-green-800">Strong</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Setup */}
      <div className="space-y-4">
        <h3 className="text-lg">Quick Setup Complete</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm">Device paired and authenticated</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm">Health permissions granted</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm">Default therapy profile created</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-4"
          onClick={() => onNavigate('overview')}
        >
          Start Using Smart Heal
        </Button>
        
        <Button 
          variant="outline"
          className="w-full border-blue-300 text-blue-700 rounded-full py-4"
          onClick={() => onNavigate('settings')}
        >
          Customize Settings
        </Button>
      </div>
    </div>
  );
}