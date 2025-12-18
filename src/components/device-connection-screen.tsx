import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface DeviceConnectionScreenProps {
  onNavigate: (screen: string) => void;
}

export function DeviceConnectionScreen({ onNavigate }: DeviceConnectionScreenProps) {
  return (
    <div className="h-full flex flex-col justify-center p-6 space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <h1 className="text-xl">Connect ITT Device</h1>
        <p className="text-gray-600 text-sm">
          Synchronize your ITT Device for tailored therapy plan
        </p>
      </div>

      {/* Device Illustration */}
      <div className="flex justify-center py-6">
        <div className="relative">
          {/* ITT Device Illustration */}
          <div className="w-28 h-18 bg-black rounded-2xl relative overflow-hidden">
            {/* Device band */}
            <div className="absolute inset-x-2 -top-2 -bottom-2 bg-black rounded-full"></div>
            {/* ITT Logo/Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-sm">ITT</span>
            </div>
          </div>
          
          {/* Connection indicator dots */}
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>

      {/* Connection Info */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="text-center space-y-2">
          <h3 className="text-sm text-blue-800">Connect ITT Device</h3>
          <p className="text-xs text-blue-700">
            Syncing the ITT device ensures a personalized and effective treatment plan.
          </p>
        </div>
      </Card>

      {/* Action Buttons - Fixed at bottom */}
      <div className="space-y-3 mt-auto">
        <Button 
          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-4"
          onClick={() => onNavigate('authorization')}
        >
          Connect Device
        </Button>
        
        <Button 
          variant="outline"
          className="w-full border-gray-300 text-gray-700 rounded-full py-4"
          onClick={() => onNavigate('dashboard')}
        >
          Skip for Now
        </Button>
        
        {/* Help Section */}
        <div className="text-center pt-2">
          <Button variant="link" className="text-blue-600 text-sm p-0">
            Need help connecting?
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeviceConnectionScreen;