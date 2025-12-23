import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Heart, Activity, Clock, Zap, Calendar, TrendingUp, 
  Shield, Bluetooth, Settings, Play, Pause 
} from 'lucide-react';

interface HomeTabProps {
  user: any;
  isDeviceConnected: boolean;
  onDeviceConnection: (connected: boolean) => void;
  onTabChange?: (tab: 'home' | 'therapy' | 'reports' | 'ai') => void;
  onNavigateToSettings?: () => void;
}

export function HomeTab({ user, isDeviceConnected, onDeviceConnection, onTabChange, onNavigateToSettings }: HomeTabProps) {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="px-4 space-y-6 pb-24 max-h-screen overflow-y-auto scroll-smooth safe-top">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0] || 'User'}!
        </h1>
        <p className="text-gray-600">{currentDate}</p>
      </div>

      {/* Device Status Card */}
      <Card className="smart-heal-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDeviceConnected ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Bluetooth className={`w-5 h-5 ${
                  isDeviceConnected ? 'text-green-600' : 'text-gray-400'
                }`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">SmartHeal ITT Device</h3>
                <p className="text-sm text-gray-500">Model: SH-2024 Pro</p>
              </div>
            </div>
            <Badge variant={isDeviceConnected ? "default" : "secondary"}>
              {isDeviceConnected ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>
          
          {isDeviceConnected ? (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Battery Level</span>
                <span className="font-medium text-gray-900">87%</span>
              </div>
              <Progress value={87} className="h-2" />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Session Time</p>
                  <p className="font-semibold text-gray-900">00:00</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Intensity</p>
                  <p className="font-semibold text-gray-900">Level 3</p>
                </div>
              </div>
            </div>
          ) : (
            <Button 
              onClick={() => onDeviceConnection(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Connect Device
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Performance Overview</h2>
          <button className="text-red-500 font-medium text-sm hover:text-red-600 flex items-center gap-1">
            View All
            <TrendingUp className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Weekly Distance Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm relative overflow-hidden border border-gray-100" style={{ backgroundColor: '#ffffffff' }}>
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-cyan-100 opacity-50"></div>
            <div className="w-12 h-12 rounded-xl bg-cyan-400 flex items-center justify-center mb-4 relative z-10">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1 relative z-10">
              42.8<span className="text-base font-normal text-gray-500 ml-1">km</span>
            </div>
            <div className="text-sm text-gray-600 mb-3 relative z-10">Weekly Distance</div>
            <div className="flex items-center gap-1 text-sm relative z-10">
              <span className="font-medium text-green-500">↑ +12%</span>
              <span className="text-gray-400">vs last week</span>
            </div>
          </div>

          {/* Recovery Score Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm relative overflow-hidden border border-gray-100" style={{ backgroundColor: '#ffffff' }}>
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-pink-100 opacity-50"></div>
            <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center mb-4 relative z-10">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1 relative z-10">
              87<span className="text-base font-normal text-gray-500 ml-1">%</span>
            </div>
            <div className="text-sm text-gray-600 mb-3 relative z-10">Recovery Score</div>
            <div className="flex items-center gap-1 text-sm relative z-10">
              <span className="font-medium text-green-500">↑ +5%</span>
              <span className="text-gray-400">vs last week</span>
            </div>
          </div>

          {/* Training Load Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm relative overflow-hidden border border-gray-100" style={{ backgroundColor: '#ffffff' }}>
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-orange-100 opacity-50"></div>
            <div className="w-12 h-12 rounded-xl bg-orange-400 flex items-center justify-center mb-4 relative z-10">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1 relative z-10">
              245
            </div>
            <div className="text-sm text-gray-600 mb-3 relative z-10">Training Load</div>
            <div className="flex items-center gap-1 text-sm relative z-10">
              <span className="font-medium text-red-500">↓ -8%</span>
              <span className="text-gray-400">vs last week</span>
            </div>
          </div>

          {/* Avg Pace Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm relative overflow-hidden border border-gray-100" style={{ backgroundColor: '#ffffff' }}>
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-purple-100 opacity-50"></div>
            <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center mb-4 relative z-10">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1 relative z-10">
              5:20<span className="text-base font-normal text-gray-500 ml-1">/km</span>
            </div>
            <div className="text-sm text-gray-600 mb-3 relative z-10">Avg Pace</div>
            <div className="flex items-center gap-1 text-sm relative z-10">
              <span className="font-medium text-green-500">↑ -15s</span>
              <span className="text-gray-400">vs last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Progress */}
      <Card className="smart-heal-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span>Today's Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Daily Goal</span>
            <span className="font-medium">2 of 3 sessions</span>
          </div>
          <Progress value={67} className="h-2" />
          
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="text-xs text-white font-bold">✓</span>
              </div>
              <p className="text-xs text-green-700">Morning</p>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="text-xs text-white font-bold">✓</span>
              </div>
              <p className="text-xs text-green-700">Afternoon</p>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-gray-300 rounded-full mx-auto mb-1 flex items-center justify-center">
                <Clock className="w-3 h-3 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500">Evening</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="smart-heal-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            className="w-full smart-heal-primary-btn text-white justify-start space-x-3 h-12"
            disabled={!isDeviceConnected}
            onClick={() => {
              if (onTabChange) {
                onTabChange('therapy');
              }
            }}
          >
            <Play className="w-5 h-5" />
            <span>Start Quick Session</span>
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="justify-start space-x-2 h-11"
              disabled={!isDeviceConnected}
              onClick={() => {
                if (onTabChange) {
                  onTabChange('ai');
                }
              }}
            >
              <Zap className="w-4 h-4" />
              <span>AI Guidance</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start space-x-2 h-11"
              onClick={() => {
                if (onNavigateToSettings) {
                  onNavigateToSettings();
                }
              }}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Reminder */}
      <Card className="smart-heal-card border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-amber-900">Evening Session Reminder</h3>
              <p className="text-sm text-amber-700">Scheduled for 7:00 PM today</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Tips */}
      <Card className="smart-heal-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Daily Health Tip</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Proper Hydration</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Stay hydrated before and after therapy sessions. Proper hydration helps improve blood circulation and enhances the effectiveness of ITT treatment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card className="smart-heal-card">
        <CardHeader>
          <CardTitle>This Week's Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Sessions</p>
              <p className="text-xl font-bold text-gray-900">12</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Duration</p>
              <p className="text-xl font-bold text-gray-900">23 min</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">Weekly Goal Progress</p>
            <Progress value={80} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">16 of 20 sessions completed</p>
          </div>
          
          <Button variant="outline" className="w-full" onClick={() => {
            if (onTabChange) {
              onTabChange('reports');
            }
          }}>
            View Detailed Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default HomeTab;