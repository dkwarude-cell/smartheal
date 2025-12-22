import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, TrendingUp, TrendingDown, Calendar, Activity, 
  Heart, Zap, Target, Award, BarChart3, Clock, ChevronDown
} from 'lucide-react';

interface AnalyticsScreenProps {
  user: any;
  onBack: () => void;
}

export function AnalyticsScreen({ user, onBack }: AnalyticsScreenProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState('readiness');

  // Mock data based on profile type
  const profileType = user?.profileType || 'athlete';

  const getMetricsForProfile = () => {
    if (profileType === 'athlete') {
      return {
        primary: [
          { label: 'Recovery Score', value: 87, change: '+5%', trend: 'up', color: 'green' },
          { label: 'Training Load', value: 124, change: '+12', trend: 'up', color: 'blue' },
          { label: 'Active Days', value: 23, change: '+3', trend: 'up', color: 'purple' },
          { label: 'Total Distance', value: '186 km', change: '+24 km', trend: 'up', color: 'orange' }
        ],
        chart: [
          { date: 'Week 1', value: 82 },
          { date: 'Week 2', value: 85 },
          { date: 'Week 3', value: 83 },
          { date: 'Week 4', value: 87 }
        ]
      };
    } else if (profileType === 'coach') {
      return {
        primary: [
          { label: 'Team Compliance', value: '87%', change: '+5%', trend: 'up', color: 'green' },
          { label: 'Avg Readiness', value: 8.2, change: '+0.3', trend: 'up', color: 'blue' },
          { label: 'Active Athletes', value: 12, change: '+2', trend: 'up', color: 'purple' },
          { label: 'Sessions Completed', value: 156, change: '+18', trend: 'up', color: 'orange' }
        ],
        chart: [
          { date: 'Week 1', value: 82 },
          { date: 'Week 2', value: 85 },
          { date: 'Week 3', value: 86 },
          { date: 'Week 4', value: 87 }
        ]
      };
    } else {
      return {
        primary: [
          { label: 'Pain Reduction', value: '40%', change: '-2 points', trend: 'up', color: 'green' },
          { label: 'Mobility Score', value: 78, change: '+8%', trend: 'up', color: 'blue' },
          { label: 'Therapy Days', value: 23, change: '+5', trend: 'up', color: 'purple' },
          { label: 'Well-being', value: '8.5/10', change: '+0.5', trend: 'up', color: 'orange' }
        ],
        chart: [
          { date: 'Week 1', value: 70 },
          { date: 'Week 2', value: 73 },
          { date: 'Week 3', value: 76 },
          { date: 'Week 4', value: 78 }
        ]
      };
    }
  };

  const data = getMetricsForProfile();
  const maxValue = Math.max(...data.chart.map(d => d.value));

  return (
    <div className="min-h-screen bg-gray-50 pb-24 safe-top">
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
            <h1 className="text-gray-900 mb-1">Analytics</h1>
            <p className="text-gray-600 text-sm">Track your progress and insights</p>
          </div>
          <BarChart3 className="w-8 h-8 text-red-500" />
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mt-4">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as any)}
              className={`flex-1 py-2 rounded-lg text-sm transition-all capitalize ${
                timeRange === range
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {data.primary.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-4 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  metric.color === 'green' ? 'bg-green-50' :
                  metric.color === 'blue' ? 'bg-blue-50' :
                  metric.color === 'purple' ? 'bg-purple-50' :
                  'bg-orange-50'
                }`}>
                  {metric.color === 'green' ? <Heart className="w-4 h-4 text-green-600" /> :
                   metric.color === 'blue' ? <Zap className="w-4 h-4 text-blue-600" /> :
                   metric.color === 'purple' ? <Calendar className="w-4 h-4 text-purple-600" /> :
                   <Activity className="w-4 h-4 text-orange-600" />}
                </div>
                <div className={`flex items-center gap-1 text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                </div>
              </div>
              <div className="text-2xl text-gray-900 mb-1">{metric.value}</div>
              <div className="text-xs text-gray-500">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900">Progress Trend</h3>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <span>Recovery Score</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between h-48 gap-4">
            {data.chart.map((item, index) => (
              <motion.div
                key={index}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                className="flex-1 flex flex-col items-center"
                style={{ transformOrigin: 'bottom' }}
              >
                <div className="text-sm text-gray-900 mb-2">{item.value}</div>
                <div className="w-full bg-gray-100 rounded-t-lg relative flex-1">
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-red-500 to-orange-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.value / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-3">{item.date}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-100"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">Great Progress!</h3>
              <p className="text-sm text-gray-700 mb-3">
                {profileType === 'athlete' && "Your recovery scores have improved by 5% this month. Keep up the consistent therapy sessions!"}
                {profileType === 'coach' && "Team compliance is up 5% this month. Your athletes are responding well to the protocols."}
                {profileType === 'health' && "Pain levels have decreased by 40% since you started. Your consistency is paying off!"}
              </p>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-white rounded-full text-xs text-purple-700 border border-purple-200">
                  ↗ Trending Up
                </div>
                <div className="px-3 py-1 bg-white rounded-full text-xs text-purple-700 border border-purple-200">
                  🎯 On Track
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activity Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-5 border border-gray-100"
        >
          <h3 className="text-gray-900 mb-4">Activity Breakdown</h3>
          <div className="space-y-4">
            {[
              { label: profileType === 'coach' ? 'Recovery Sessions' : 'Recovery', value: 60, color: 'green' },
              { label: profileType === 'coach' ? 'Performance Sessions' : 'Performance', value: 30, color: 'blue' },
              { label: profileType === 'coach' ? 'Preventive Care' : 'Maintenance', value: 10, color: 'purple' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <span className="text-sm text-gray-900">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                    className={`h-2 rounded-full ${
                      item.color === 'green' ? 'bg-green-500' :
                      item.color === 'blue' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Goals Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-5 border border-gray-100"
        >
          <h3 className="text-gray-900 mb-4">Goals & Achievements</h3>
          <div className="space-y-3">
            {[
              { goal: 'Complete 20 sessions', progress: 85, achieved: false },
              { goal: 'Maintain 90% compliance', progress: 100, achieved: true },
              { goal: 'Improve recovery score to 85+', progress: 100, achieved: true }
            ].map((goal, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  goal.achieved ? 'bg-green-50' : 'bg-gray-100'
                }`}>
                  {goal.achieved ? (
                    <Target className="w-4 h-4 text-green-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-900">{goal.goal}</span>
                    <span className={`text-xs ${goal.achieved ? 'text-green-600' : 'text-gray-600'}`}>
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${goal.achieved ? 'bg-green-500' : 'bg-gray-400'}`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
