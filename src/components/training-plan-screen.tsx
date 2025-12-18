import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft, Calendar, CheckCircle, Clock, Target, TrendingUp,
  Plus, Edit, Trash2, Play, Award, Zap
} from 'lucide-react';

interface TrainingPlanScreenProps {
  onBack: () => void;
}

export function TrainingPlanScreen({ onBack }: TrainingPlanScreenProps) {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const weeklyPlan = {
    week: 1,
    focus: 'Base Building',
    totalSessions: 5,
    completedSessions: 3,
    sessions: [
      {
        day: 'Monday',
        date: 'Dec 16',
        completed: true,
        therapy: 'Recovery - 20 min',
        workout: 'Easy Run - 5km',
        notes: 'Hamstring focus'
      },
      {
        day: 'Tuesday',
        date: 'Dec 17',
        completed: true,
        therapy: 'Pre-workout - 15 min',
        workout: 'Interval Training - 8x400m',
        notes: 'Quadriceps activation'
      },
      {
        day: 'Wednesday',
        date: 'Dec 18',
        completed: true,
        therapy: 'Recovery - 30 min',
        workout: 'Rest Day',
        notes: 'Full leg recovery'
      },
      {
        day: 'Thursday',
        date: 'Dec 19',
        completed: false,
        therapy: 'Performance - 20 min',
        workout: 'Tempo Run - 7km',
        notes: 'Scheduled for 6:00 PM'
      },
      {
        day: 'Friday',
        date: 'Dec 20',
        completed: false,
        therapy: 'Recovery - 15 min',
        workout: 'Easy Run - 6km',
        notes: 'Light recovery'
      },
      {
        day: 'Saturday',
        date: 'Dec 21',
        completed: false,
        therapy: 'Pre-workout - 25 min',
        workout: 'Long Run - 15km',
        notes: 'Marathon prep'
      },
      {
        day: 'Sunday',
        date: 'Dec 22',
        completed: false,
        therapy: 'Recovery - 20 min',
        workout: 'Active Recovery',
        notes: 'Full body relaxation'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 mb-1">Training Plan</h1>
            <p className="text-gray-600 text-sm">Week {selectedWeek} - {weeklyPlan.focus}</p>
          </div>
          <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
            <Edit className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Week Progress */}
        <div className="mt-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Weekly Progress</span>
            <span className="text-sm">{weeklyPlan.completedSessions}/{weeklyPlan.totalSessions} sessions</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-white"
              style={{ width: `${(weeklyPlan.completedSessions / weeklyPlan.totalSessions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Week Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => (
            <button
              key={week}
              onClick={() => setSelectedWeek(week)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg transition-all ${
                selectedWeek === week
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              Week {week}
            </button>
          ))}
        </div>

        {/* Daily Sessions */}
        {weeklyPlan.sessions.map((session, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-white rounded-2xl p-5 border ${
              session.completed
                ? 'border-green-200'
                : 'border-gray-100'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  session.completed
                    ? 'bg-green-50'
                    : 'bg-gray-50'
                }`}>
                  {session.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Calendar className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-gray-900">{session.day}</h3>
                  <p className="text-gray-500 text-sm">{session.date}</p>
                </div>
              </div>
              {session.completed && (
                <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs border border-green-200">
                  ✓ Complete
                </div>
              )}
            </div>

            {/* Therapy Session */}
            <div className="mb-3 p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-900">Therapy Session</span>
              </div>
              <p className="text-gray-900 text-sm">{session.therapy}</p>
              <p className="text-gray-600 text-xs mt-1">{session.notes}</p>
            </div>

            {/* Workout */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-900">Workout</span>
              </div>
              <p className="text-gray-900 text-sm">{session.workout}</p>
            </div>

            {/* Action Button */}
            {!session.completed && (
              <button className="mt-3 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                <span>Start Session</span>
              </button>
            )}
          </motion.div>
        ))}

        {/* Add Session Button */}
        <button className="w-full py-4 bg-white border-2 border-dashed border-gray-300 rounded-2xl text-gray-600 hover:border-red-300 hover:text-red-600 transition-all flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          <span>Add Custom Session</span>
        </button>

        {/* Weekly Summary */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Week {selectedWeek} Goal</h3>
              <p className="text-sm text-gray-700">
                Focus on building base endurance with consistent therapy sessions. Maintain easy effort on recovery days.
              </p>
              <div className="flex gap-2 mt-3">
                <div className="px-3 py-1 bg-white rounded-full text-xs text-purple-700 border border-purple-200">
                  Total: 43 km
                </div>
                <div className="px-3 py-1 bg-white rounded-full text-xs text-purple-700 border border-purple-200">
                  Therapy: 145 min
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}