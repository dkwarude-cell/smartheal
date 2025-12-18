import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Play, Pause, Settings, Battery, Signal } from 'lucide-react';

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
}

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const [isSessionActive, setIsSessionActive] = React.useState(false);
  const [sessionTime, setSessionTime] = React.useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-full p-4 space-y-4 pb-8">
      {/* Device Status - Enhanced */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-6 bg-black dark:bg-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white dark:text-black text-xs font-medium">ITT</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium dark:text-white">Connected</p>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-300 mt-1">
                <div className="flex items-center space-x-1">
                  <Battery className="w-3 h-3" />
                  <span>85%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Signal className="w-3 h-3" />
                  <span>Strong</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Active Session - Main Focus */}
      <Card className="p-6 border-2 border-red-200 dark:border-red-800 bg-white dark:bg-gray-800 min-h-[320px]">
        <div className="flex flex-col justify-center text-center space-y-6 h-full">
          <div>
            <h2 className="text-xl font-medium dark:text-white mb-2">Current Session</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">EMS Therapy • Medium Intensity</p>
          </div>
          
          <div className="space-y-4">
            <p className="text-5xl font-mono font-medium dark:text-white">{formatTime(sessionTime)}</p>
            <div className="space-y-2">
              <Progress value={(sessionTime / 900) * 100} className="h-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Target: 15 minutes</p>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              size="lg"
              className={`flex-1 rounded-full py-4 font-medium text-white shadow-lg transition-all ${
                isSessionActive 
                  ? 'bg-orange-500 hover:bg-orange-600 hover:shadow-orange-200' 
                  : 'bg-red-500 hover:bg-red-600 hover:shadow-red-200'
              }`}
              onClick={() => setIsSessionActive(!isSessionActive)}
            >
              {isSessionActive ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="px-6 rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => onNavigate('settings')}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Today's Summary - Enhanced */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium dark:text-white">Today's Progress</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">2 sessions • 30 min total</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('reports')}
            className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full px-4"
          >
            View All
          </Button>
        </div>
      </Card>

      {/* Weekly Overview - Additional Content */}
      <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-sm font-medium dark:text-white mb-3">This Week</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-lg font-medium text-blue-600 dark:text-blue-400">12</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Sessions</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-lg font-medium text-green-600 dark:text-green-400">4.2h</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Total Time</p>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-lg font-medium text-purple-600 dark:text-purple-400">92%</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Consistency</p>
          </div>
        </div>
      </Card>

      {/* AI Recommendations */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
        <h3 className="text-sm font-medium dark:text-white mb-3 flex items-center">
          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
          AI Recommendations
        </h3>
        <div className="space-y-2">
          <div className="p-3 bg-white dark:bg-gray-800/50 rounded-lg">
            <p className="text-sm dark:text-white">Consider extending your next session to 20 minutes for better results.</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800/50 rounded-lg">
            <p className="text-sm dark:text-white">Your consistency has improved by 15% this week. Keep it up!</p>
          </div>
        </div>
      </Card>
    </div>
  );
}