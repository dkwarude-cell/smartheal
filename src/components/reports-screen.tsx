import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target,
  Download,
  Share,
  Settings,
  Activity,
  Zap
} from 'lucide-react';

interface ReportsScreenProps {
  onNavigate: (screen: string) => void;
}

export function ReportsScreen({ onNavigate }: ReportsScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const progressStats = [
    {
      label: 'Total Sessions',
      value: '24',
      change: '+8%',
      trend: 'up',
      icon: Target
    },
    {
      label: 'Avg Duration',
      value: '18min',
      change: '+2min',
      trend: 'up',
      icon: Clock
    },
    {
      label: 'Consistency',
      value: '85%',
      change: '+15%',
      trend: 'up',
      icon: TrendingUp
    }
  ];

  const recentSessions = [
    {
      date: 'Today 2:30 PM',
      type: 'EMS Therapy',
      duration: '20 min',
      intensity: 'Medium',
      effectiveness: 'High',
      result: 'Completed'
    },
    {
      date: 'Today 9:15 AM',
      type: 'TENS Relief',
      duration: '15 min',
      intensity: 'Low',
      effectiveness: 'Medium',
      result: 'Completed'
    },
    {
      date: 'Yesterday 6:45 PM',
      type: 'Vibration',
      duration: '25 min',
      intensity: 'High',
      effectiveness: 'High',
      result: 'Completed'
    },
    {
      date: 'Yesterday 8:30 AM',
      type: 'Heat Therapy',
      duration: '18 min',
      intensity: 'Medium',
      effectiveness: 'Medium',
      result: 'Completed'
    }
  ];

  const weeklyData = [
    { day: 'Mon', sessions: 3, duration: 45 },
    { day: 'Tue', sessions: 4, duration: 60 },
    { day: 'Wed', sessions: 2, duration: 30 },
    { day: 'Thu', sessions: 5, duration: 75 },
    { day: 'Fri', sessions: 3, duration: 45 },
    { day: 'Sat', sessions: 4, duration: 60 },
    { day: 'Sun', sessions: 3, duration: 45 }
  ];

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness) {
      case 'High': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-full p-4 space-y-4 pb-8 safe-top">
      {/* Stats Overview - Compact */}
      <div className="grid grid-cols-3 gap-2">
        {progressStats.map((stat, index) => (
          <Card key={index} className="p-2 text-center dark:bg-gray-800 dark:border-gray-700">
            <stat.icon className="w-4 h-4 text-blue-600 mx-auto mb-1" />
            <p className="text-base dark:text-white">{stat.value}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">{stat.label}</p>
            <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </p>
          </Card>
        ))}
      </div>

      {/* Period Selector */}
      <div className="flex space-x-2">
        {['week', 'month', 'quarter'].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod(period)}
            className={`flex-1 ${selectedPeriod === period ? 'bg-red-500 hover:bg-red-600' : 'dark:border-gray-600 dark:hover:bg-gray-700'}`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </Button>
        ))}
      </div>

      {/* Chart Section - Improved with proper loading */}
      <Card className="p-3 flex-1 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm flex items-center dark:text-white">
            <BarChart3 className="w-4 h-4 mr-1 text-blue-600" />
            Weekly Progress
          </h3>
          <Button variant="ghost" size="sm" className="dark:hover:bg-gray-700">
            <Download className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Simple Bar Chart */}
        <div className="space-y-2">
          {weeklyData.slice(0, 5).map((day, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-xs w-6 dark:text-gray-300">{day.day}</span>
              <div className="flex-1 flex items-center space-x-1">
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${(day.sessions / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300 w-8">{day.duration}m</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Presets Card - Enhanced with Better Loading */}
      <Card className="p-4 dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium flex items-center dark:text-white">
            <Zap className="w-4 h-4 mr-2 text-purple-600" />
            Quick Presets
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-full px-3"
            onClick={() => onNavigate('settings')}
          >
            Manage
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div 
            className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-200 border border-blue-200 dark:border-blue-800 shadow-sm"
            onClick={() => onNavigate('settings')}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-medium dark:text-white">Recovery</span>
                <p className="text-xs text-gray-600 dark:text-gray-300">15 min</p>
              </div>
            </div>
          </div>
          <div 
            className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/40 transition-all duration-200 border border-green-200 dark:border-green-800 shadow-sm"
            onClick={() => onNavigate('settings')}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-medium dark:text-white">Relax</span>
                <p className="text-xs text-gray-600 dark:text-gray-300">20 min</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Sessions - Enhanced Interactive Cards - Full List */}
      <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium flex items-center dark:text-white">
            <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
            Recent Sessions
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full px-3"
            onClick={() => {}}
          >
            Export
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentSessions.map((session, index) => (
            <Card 
              key={index} 
              className="p-3 cursor-pointer hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
              onClick={() => {}}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium dark:text-white">{session.type}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{session.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium dark:text-white">{session.duration}</p>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getEffectivenessColor(session.effectiveness)} border-0 shadow-sm`}
                  >
                    {session.effectiveness}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Weekly Analysis */}
      <Card className="p-4 bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 border-indigo-200 dark:border-indigo-800">
        <h3 className="text-sm font-medium dark:text-white mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2 text-indigo-600" />
          Weekly Analysis
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-white dark:bg-gray-800/50 rounded-lg">
            <p className="text-sm dark:text-white mb-1">Most Effective Time</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Evening sessions show 23% better results</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800/50 rounded-lg">
            <p className="text-sm dark:text-white mb-1">Recommended Focus</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Consider increasing EMS intensity for faster recovery</p>
          </div>
        </div>
      </Card>

      {/* Monthly Summary */}
      <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-sm font-medium dark:text-white mb-3">Monthly Summary</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-lg font-medium text-blue-600 dark:text-blue-400">89</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Total Sessions</p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-lg font-medium text-green-600 dark:text-green-400">22.4h</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Therapy Time</p>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-lg font-medium text-purple-600 dark:text-purple-400">94%</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Effectiveness</p>
          </div>
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="text-lg font-medium text-orange-600 dark:text-orange-400">7.2</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Pain Reduction</p>
          </div>
        </div>
      </Card>
    </div>
  );
}