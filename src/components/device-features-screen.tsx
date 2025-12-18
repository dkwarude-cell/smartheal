import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Cpu, 
  Camera, 
  Zap, 
  Watch, 
  Bluetooth, 
  Battery, 
  Shield, 
  Wifi,
  ArrowRight 
} from 'lucide-react';

interface DeviceFeaturesScreenProps {
  onNavigate: (screen: string) => void;
}

export function DeviceFeaturesScreen({ onNavigate }: DeviceFeaturesScreenProps) {
  const mainFeatures = [
    {
      icon: Cpu,
      title: 'Nano Motors',
      description: 'Precision micro-motors for targeted therapy delivery',
      status: 'Active',
      color: 'bg-blue-100 text-blue-700',
      details: 'Advanced nano-motor technology provides precise control over therapy intensity and targeting.'
    },
    {
      icon: Camera,
      title: 'Image Capture + Analysis',
      description: 'AI-powered visual assessment and monitoring',
      status: 'Enabled',
      color: 'bg-purple-100 text-purple-700',
      details: 'Real-time image analysis to monitor therapy effectiveness and track progress.'
    },
    {
      icon: Zap,
      title: 'EMS & TENS',
      description: 'Dual electrical stimulation therapy modes',
      status: 'Ready',
      color: 'bg-yellow-100 text-yellow-700',
      details: 'Electrical Muscle Stimulation and Transcutaneous Electrical Nerve Stimulation.'
    },
    {
      icon: Watch,
      title: 'Versatile Wearable',
      description: 'Comfortable, adaptive wearable design',
      status: 'Connected',
      color: 'bg-green-100 text-green-700',
      details: 'Ergonomic design that adapts to different body areas for optimal therapy delivery.'
    }
  ];

  const technicalSpecs = [
    {
      icon: Battery,
      label: 'Battery Life',
      value: '8-12 hours',
      color: 'text-green-600'
    },
    {
      icon: Bluetooth,
      label: 'Connectivity',
      value: 'Bluetooth 5.2',
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      label: 'Safety Rating',
      value: 'Medical Grade',
      color: 'text-purple-600'
    },
    {
      icon: Wifi,
      label: 'Cloud Sync',
      value: 'Real-time',
      color: 'text-orange-600'
    }
  ];

  const capabilities = [
    'Personalized therapy algorithms',
    'Real-time biometric monitoring',
    'Adaptive intensity control',
    'Multi-modal therapy delivery',
    'Progress tracking & analytics',
    'Remote monitoring support'
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl">Device Features</h1>
        <p className="text-gray-600">Explore the capabilities of your ITT device</p>
      </div>

      {/* Device Overview */}
      <Card className="p-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-10 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">ITT</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg">ITT Therapeutic Device</h3>
            <p className="text-sm text-gray-600">Model: ITT-2024 Pro</p>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Active
          </Badge>
        </div>
      </Card>

      {/* Main Features */}
      <div className="space-y-3">
        <h3 className="text-lg">Core Technologies</h3>
        
        {mainFeatures.map((feature, index) => (
          <Card key={index} className="p-4 border border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${feature.color} rounded-full flex items-center justify-center`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {feature.status}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="pl-13">
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {feature.details}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Technical Specifications */}
      <Card className="p-4 space-y-4">
        <h3 className="text-lg">Technical Specifications</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {technicalSpecs.map((spec, index) => (
            <div key={index} className="flex items-center space-x-3">
              <spec.icon className={`w-5 h-5 ${spec.color}`} />
              <div>
                <p className="text-xs text-gray-600">{spec.label}</p>
                <p className="text-sm">{spec.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Device Capabilities */}
      <Card className="p-4 space-y-4">
        <h3 className="text-lg">Device Capabilities</h3>
        
        <div className="space-y-2">
          {capabilities.map((capability, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">{capability}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Safety Information */}
      <Card className="p-4 bg-orange-50 border-orange-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-orange-600 mt-0.5" />
          <div>
            <h4 className="text-sm text-orange-800">Safety & Compliance</h4>
            <p className="text-sm text-orange-700 mt-1">
              FDA cleared medical device. Meets all international safety standards for therapeutic devices.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}