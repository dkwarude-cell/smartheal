import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Shield, Bluetooth, Wifi, Activity } from 'lucide-react';

interface DeviceAuthorizationScreenProps {
  onNavigate: (screen: string) => void;
}

export function DeviceAuthorizationScreen({ onNavigate }: DeviceAuthorizationScreenProps) {
  const permissions = [
    {
      icon: Bluetooth,
      title: 'Bluetooth Access',
      description: 'Connect to your ITT device wirelessly'
    },
    {
      icon: Activity,
      title: 'Health Data',
      description: 'Monitor therapy sessions and progress'
    },
    {
      icon: Wifi,
      title: 'Network Access',
      description: 'Sync data and receive updates'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-2xl">Device Authorization</h1>
        <p className="text-gray-600">
          Grant permissions to connect and sync with your ITT device
        </p>
      </div>

      {/* Permissions List */}
      <div className="space-y-4">
        {permissions.map((permission, index) => (
          <Card key={index} className="p-4 border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                <permission.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm">{permission.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
              </div>
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Security Notice */}
      <Card className="p-4 bg-gray-50 border-gray-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-gray-600 mt-0.5" />
          <div>
            <p className="text-sm text-gray-700">
              Your privacy is protected. All data is encrypted and stored securely according to healthcare standards.
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-4"
          onClick={() => onNavigate('success')}
        >
          Authorize
        </Button>
        
        <Button 
          variant="outline"
          className="w-full border-gray-300 text-gray-700 rounded-full py-4"
          onClick={() => onNavigate('connection')}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}