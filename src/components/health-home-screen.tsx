import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Smile, TrendingDown, Calendar, Play, Book, Activity, CheckCircle } from 'lucide-react';
import { SessionDetailScreen } from './session-detail-screen';

interface HealthHomeScreenProps {
  userName: string;
  ageGroup: string;
  goal: string;
}

export function HealthHomeScreen({ userName, ageGroup, goal }: HealthHomeScreenProps) {
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [todayTasks, setTodayTasks] = useState([
    { task: 'Morning therapy session', time: '8:00 AM', completed: true },
    { task: 'Hydration reminder', time: '12:00 PM', completed: true },
    { task: 'Evening relaxation', time: '7:00 PM', completed: false }
  ]);

  const wellnessMetrics = [
    { label: 'Pain Level', value: '3/10', status: 'Improving', icon: Heart, trend: 'down' },
    { label: 'Mobility Score', value: '78%', status: 'Good', icon: Activity, trend: 'up' },
    { label: 'Treatment Days', value: '12', status: 'Consistent', icon: Calendar, trend: 'up' },
    { label: 'Well-being', value: 'Good', status: 'Positive', icon: Smile, trend: 'up' }
  ];

  const recommendedPrograms = [
    { 
      title: 'Morning Pain Relief',
      duration: '15 min',
      sessions: 7,
      completed: 4,
      description: 'Gentle therapy to start your day',
      bodyPart: 'Lower Back',
      intensity: 'Low',
      type: 'Wellness'
    },
    { 
      title: 'Mobility Enhancement',
      duration: '20 min',
      sessions: 10,
      completed: 6,
      description: 'Improve range of motion',
      bodyPart: 'Full Body',
      intensity: 'Medium',
      type: 'Mobility'
    }
  ];

  const toggleTask = (index: number) => {
    setTodayTasks(tasks => tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

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
            <h1 className="text-gray-900 mb-1">Hello, {userName}!</h1>
            <p className="text-gray-600">How are you feeling today?</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Wellness Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-gray-900 mb-4">Your Progress</h2>
        <div className="grid grid-cols-2 gap-4">
          {wellnessMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl p-5 shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 p-2">
                    <Icon className="w-full h-full text-white" />
                  </div>
                  {metric.trend === 'down' && metric.label === 'Pain Level' ? (
                    <TrendingDown className="w-5 h-5 text-green-500" />
                  ) : metric.trend === 'up' ? (
                    <TrendingDown className="w-5 h-5 text-green-500 rotate-180" />
                  ) : null}
                </div>
                <div className="text-2xl text-gray-900 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                <div className="text-xs text-green-500">{metric.status}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Daily Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-gray-900 mb-4">Today's Wellness Plan</h2>
        <div className="bg-white rounded-xl p-5 space-y-3 shadow-md border border-gray-200">
          {todayTasks.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  item.completed
                    ? 'bg-red-500 border-red-500'
                    : 'border-gray-300'
                }`}>
                  {item.completed && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <div className={`text-gray-900 ${item.completed ? 'line-through opacity-60' : ''}`}>
                    {item.task}
                  </div>
                  <div className="text-gray-600 text-sm">{item.time}</div>
                </div>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => toggleTask(index)}
              >
                {item.completed ? 'Undo' : 'Complete'}
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommended Programs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-gray-900 mb-4">Continue Your Journey</h2>
        <div className="space-y-4">
          {recommendedPrograms.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 shadow-md border border-gray-200 cursor-pointer hover:border-red-300 hover:shadow-lg transition-all"
              onClick={() => setSelectedSession({ ...program, time: 'Today', date: new Date().toLocaleDateString() })}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{program.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{program.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {program.duration}
                    </span>
                    <span className="text-gray-600">
                      {program.completed}/{program.sessions} sessions
                    </span>
                  </div>
                </div>
                <button
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center hover:scale-110 transition-transform"
                  onClick={() => setSelectedSession(program)}
                >
                  <Play className="w-5 h-5 text-white" />
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                  style={{ width: `${(program.completed / program.sessions) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Educational Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
              <Book className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">Daily Tip</h3>
              <p className="text-gray-700 text-sm">
                Consistency is key! Regular therapy sessions, even short ones, can lead to significant improvements in pain management and mobility over time.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}