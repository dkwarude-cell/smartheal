import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Zap, Activity, Award, Calendar, Target, Timer, Heart, BarChart3 } from 'lucide-react';
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
    { label: 'Weekly Distance', value: '42.5', unit: 'km', icon: Activity },
    { label: 'Recovery Score', value: '87', unit: '%', icon: Heart },
    { label: 'Active Days', value: '5', unit: '/7', icon: Calendar },
    { label: 'Avg Pace', value: '5:20', unit: '/km', icon: Timer }
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
    }
  ];

  // If training plan is active
  if (showTrainingPlan) {
    return (
      <TrainingPlanScreen
        onBack={() => setShowTrainingPlan(false)}
      />
    );
  }

  // If analytics view is active
  if (showAnalytics) {
    return (
      <AnalyticsScreen
        user={{ profileType: 'athlete', name: userName }}
        onBack={() => setShowAnalytics(false)}
      />
    );
  }

  // If session selected, show detail view
  if (selectedSession) {
    return (
      <SessionDetailScreen
        session={selectedSession}
        onBack={() => setSelectedSession(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-gray-900 mb-1">Welcome back, {userName}!</h1>
            <p className="text-gray-600 capitalize">{level} Runner</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Performance Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-gray-900 mb-4">This Week's Performance</h2>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl p-5 shadow-md"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 p-2 mb-3">
                  <Icon className="w-full h-full text-white" />
                </div>
                <div className="text-2xl text-gray-900 mb-1">
                  {stat.value}<span className="text-lg text-gray-600">{stat.unit}</span>
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <button className="bg-gradient-to-br from-red-500 to-orange-500 rounded-xl p-5 text-left hover:scale-102 transition-transform shadow-md">
            <Zap className="w-7 h-7 text-white mb-2" />
            <h3 className="text-white mb-1 text-sm">Start Recovery</h3>
            <p className="text-white/90 text-xs">Post-workout</p>
          </button>
          <button
            className="bg-white rounded-xl p-5 text-left hover:shadow-lg transition-shadow shadow-md border border-gray-200"
            onClick={() => setShowTrainingPlan(true)}
          >
            <Target className="w-7 h-7 text-red-500 mb-2" />
            <h3 className="text-gray-900 mb-1 text-sm">Training Plan</h3>
            <p className="text-gray-600 text-xs">View schedule</p>
          </button>
          <button
            className="bg-white rounded-xl p-5 text-left hover:shadow-lg transition-shadow shadow-md border border-gray-200"
            onClick={() => setShowAnalytics(true)}
          >
            <BarChart3 className="w-7 h-7 text-red-500 mb-2" />
            <h3 className="text-gray-900 mb-1 text-sm">Analytics</h3>
            <p className="text-gray-600 text-xs">Performance data</p>
          </button>
        </div>
      </motion.div>

      {/* Upcoming Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-gray-900 mb-4">Upcoming Therapy Sessions</h2>
        <div className="space-y-3">
          {upcomingSessions.map((session, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 flex items-center justify-between shadow-md border border-gray-200 cursor-pointer hover:border-red-300 hover:shadow-lg transition-all"
              onClick={() => setSelectedSession(session)}
            >
              <div>
                <h3 className="text-gray-900 mb-1">{session.type} Session</h3>
                <p className="text-gray-600 text-sm">{session.time}</p>
              </div>
              <div className="text-right">
                <div className="text-gray-900 mb-1">{session.duration}</div>
                <div className={`text-sm ${
                  session.intensity === 'High' ? 'text-orange-500' : 'text-green-500'
                }`}>
                  {session.intensity} Intensity
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}