import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Brain, User, HeadphonesIcon, BarChart3, ArrowRight } from 'lucide-react';

interface OverviewScreenProps {
  onNavigate: (screen: string) => void;
}

export function OverviewScreen({ onNavigate }: OverviewScreenProps) {
  const features = [
    {
      icon: Brain,
      title: 'AI Therapy',
      description: 'Intelligent therapy recommendations based on your progress',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      action: () => onNavigate('dashboard')
    },
    {
      icon: User,
      title: 'Personalization',
      description: 'Customized treatment plans tailored to your needs',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      action: () => onNavigate('settings')
    },
    {
      icon: HeadphonesIcon,
      title: 'Guided Support',
      description: 'Step-by-step guidance through therapy sessions',
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      action: () => onNavigate('features')
    },
    {
      icon: BarChart3,
      title: 'Reports',
      description: 'Track your progress with detailed analytics',
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      action: () => onNavigate('reports')
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl">Welcome to Smart Heal</h1>
        <p className="text-gray-600">
          Your intelligent therapy companion powered by ITT technology
        </p>
      </div>

      {/* Device Status Card */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-6 bg-black rounded-md flex items-center justify-center">
              <span className="text-white text-xs">ITT</span>
            </div>
            <div>
              <p className="text-sm">Connected Device</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Active</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600">
            Manage
          </Button>
        </div>
      </Card>

      {/* Features Grid */}
      <div className="space-y-3">
        <h2 className="text-lg">Smart Heal Features</h2>
        
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="p-4 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
            onClick={feature.action}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${feature.lightColor} rounded-full flex items-center justify-center`}>
                <feature.icon className={`w-6 h-6 text-gray-700`} />
              </div>
              <div className="flex-1">
                <h3 className="text-base">{feature.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-lg">Quick Actions</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline"
            className="h-20 flex flex-col items-center justify-center border-red-200 hover:bg-red-50"
            onClick={() => onNavigate('dashboard')}
          >
            <span className="text-2xl mb-1">🎯</span>
            <span className="text-sm">Start Session</span>
          </Button>
          
          <Button 
            variant="outline"
            className="h-20 flex flex-col items-center justify-center border-blue-200 hover:bg-blue-50"
            onClick={() => onNavigate('reports')}
          >
            <span className="text-2xl mb-1">📊</span>
            <span className="text-sm">View Progress</span>
          </Button>
        </div>
      </div>
    </div>
  );
}