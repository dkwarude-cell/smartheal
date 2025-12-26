import React, { useState } from 'react';
import { Heart, Activity, Zap, Clock, TrendingUp, Target, BarChart2, Award } from 'lucide-react';
import { SessionDetailScreen } from './session-detail-screen';
import { AnalyticsScreen } from './analytics-screen';
import { TrainingPlanScreen } from './training-plan-screen';

interface AthleteHomeScreenProps {
  userName: string;
  level: string;
}

export function AthleteHomeScreen({ userName, level }: AthleteHomeScreenProps) {
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showTrainingPlan, setShowTrainingPlan] = useState(false);

  const stats = [
    { 
      label: 'Weekly Distance', 
      value: '42.5', 
      unit: 'km', 
      change: '+12%', 
      trend: 'up',
      icon: Activity,
      iconBg: '#22d3ee',
      blobColor: '#cffafe'
    },
    { 
      label: 'Recovery Score', 
      value: '87', 
      unit: '%', 
      change: '+5%', 
      trend: 'up',
      icon: Heart,
      iconBg: '#ec4899',
      blobColor: '#fce7f3'
    },
    { 
      label: 'Training Load', 
      value: '245', 
      unit: '', 
      change: '-8%', 
      trend: 'down',
      icon: Zap,
      iconBg: '#fb923c',
      blobColor: '#ffedd5'
    },
    { 
      label: 'Avg Pace', 
      value: '5:20', 
      unit: '/km', 
      change: '-15s', 
      trend: 'up',
      icon: Clock,
      iconBg: '#a855f7',
      blobColor: '#f3e8ff'
    },
  ];

  const upcomingSessions = [
    { 
      type: 'Recovery', 
      time: 'Today, 6:00 PM', 
      duration: '30 min', 
      intensity: 'Low',
      bodyPart: 'Hamstring',
      description: 'Post-workout recovery therapy'
    },
    { 
      type: 'Performance', 
      time: 'Tomorrow, 7:00 AM', 
      duration: '45 min', 
      intensity: 'High',
      bodyPart: 'Quadriceps',
      description: 'Pre-training preparation'
    },
  ];

  if (selectedSession) {
    return (
      <SessionDetailScreen 
        session={selectedSession}
        onBack={() => setSelectedSession(null)}
      />
    );
  }

  if (showAnalytics) {
    return (
      <AnalyticsScreen 
        onBack={() => setShowAnalytics(false)}
      />
    );
  }

  if (showTrainingPlan) {
    return (
      <TrainingPlanScreen 
        onBack={() => setShowTrainingPlan(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 safe-top">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold text-gray-900">{userName || 'Athlete'}</h1>
          </div>
          <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full">
            <Award className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-600">{level || 'Pro'} Athlete</span>
          </div>
        </div>

        {/* Performance Overview Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Performance Overview</h2>
            <button 
              onClick={() => setShowAnalytics(true)}
              className="text-red-500 font-medium text-sm hover:text-red-600 flex items-center gap-1"
            >
              View All
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={stat.label} 
                  className="rounded-2xl p-5 shadow-sm relative overflow-hidden border border-gray-100"
                  style={{ backgroundColor: '#ffffff' }}
                >
                  {/* Decorative blob */}
                  <div 
                    className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-50"
                    style={{ backgroundColor: stat.blobColor }}
                  />
                  
                  {/* Icon */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
                    style={{ backgroundColor: stat.iconBg }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Value */}
                  <div className="relative z-10">
                    <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                    {stat.unit && <span className="text-base font-normal text-gray-500 ml-1">{stat.unit}</span>}
                  </div>
                  
                  {/* Label */}
                  <div className="text-sm text-gray-600 mb-3 relative z-10">{stat.label}</div>
                  
                  {/* Trend indicator */}
                  <div className="flex items-center gap-1 text-sm relative z-10">
                    <span className={`font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
                    </span>
                    <span className="text-gray-400">vs last week</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            <button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl p-4 flex flex-col items-center gap-2 transition-colors">
              <Zap className="w-7 h-7" />
              <span className="text-sm font-medium">Start Recovery</span>
              <span className="text-xs opacity-80">Post-workout</span>
            </button>
            <button 
              onClick={() => setShowTrainingPlan(true)}
              className="bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 transition-colors"
              style={{ backgroundColor: '#ffffff' }}
            >
              <Target className="w-7 h-7 text-red-500" />
              <span className="text-sm font-medium text-gray-900">Training Plan</span>
              <span className="text-xs text-gray-500">View schedule</span>
            </button>
            <button 
              onClick={() => setShowAnalytics(true)}
              className="bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 transition-colors"
              style={{ backgroundColor: '#ffffff' }}
            >
              <BarChart2 className="w-7 h-7 text-red-500" />
              <span className="text-sm font-medium text-gray-900">Analytics</span>
              <span className="text-xs text-gray-500">Performance data</span>
            </button>
          </div>
        </div>

        {/* Recovery Readiness Card */}
        <div>
          <div 
            className="rounded-3xl p-6 shadow-lg relative overflow-hidden"
            style={{ 
              backgroundColor: '#1e293b',
              backgroundImage: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Recovery Readiness</h2>
                <p className="text-gray-400 text-sm">Updated 2 hours ago</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-white mb-1">87%</div>
                <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                  <span>↑</span>
                  <span>+5% today</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6 h-3 rounded-full overflow-hidden bg-gray-700">
              <div 
                className="h-full rounded-full"
                style={{
                  width: '87%',
                  background: 'linear-gradient(90deg, #10b981 0%, #22d3ee 50%, #a855f7 100%)'
                }}
              />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* Muscle Card */}
              <div 
                className="rounded-2xl p-4 text-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div className="text-3xl mb-2">💪</div>
                <div className="text-white font-medium text-sm mb-1">Muscle</div>
                <div className="text-gray-300 text-xs">Good</div>
              </div>

              {/* Sleep Card */}
              <div 
                className="rounded-2xl p-4 text-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div className="text-3xl mb-2">😴</div>
                <div className="text-white font-medium text-sm mb-1">Sleep</div>
                <div className="text-gray-300 text-xs">7.5h</div>
              </div>

              {/* HRV Card */}
              <div 
                className="rounded-2xl p-4 text-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div className="text-3xl mb-2">❤️</div>
                <div className="text-white font-medium text-sm mb-1">HRV</div>
                <div className="text-gray-300 text-xs">Optimal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
