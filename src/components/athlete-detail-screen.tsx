import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Calendar, Clock, TrendingUp, Activity, Heart, 
  MessageSquare, Phone, Mail, ChevronRight, Target, Zap,
  Edit, Plus, BarChart3, Award, AlertCircle, CheckCircle2
} from 'lucide-react';

interface AthleteDetailScreenProps {
  athlete: any;
  onBack: () => void;
}

export function AthleteDetailScreen({ athlete, onBack }: AthleteDetailScreenProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'progress' | 'notes'>('overview');

  // Mock data
  const sessions = [
    { 
      id: 1,
      date: '2025-12-17',
      time: '2:00 PM',
      type: 'Recovery Protocol',
      duration: '45 min',
      bodyPart: 'Hamstring',
      intensity: 'Medium',
      compliance: 100,
      notes: 'Great session, athlete reports feeling much better',
      completed: true
    },
    { 
      id: 2,
      date: '2025-12-15',
      time: '9:00 AM',
      type: 'Pre-Workout Prep',
      duration: '30 min',
      bodyPart: 'Quadriceps',
      intensity: 'Low',
      compliance: 100,
      notes: 'Preparation for long run',
      completed: true
    },
    { 
      id: 3,
      date: '2025-12-13',
      time: '6:30 PM',
      type: 'Recovery Protocol',
      duration: '60 min',
      bodyPart: 'Full Leg',
      intensity: 'High',
      compliance: 100,
      notes: 'Post-race recovery',
      completed: true
    },
  ];

  const metrics = {
    readiness: [
      { date: '12/13', value: 9.0 },
      { date: '12/14', value: 8.5 },
      { date: '12/15', value: 9.2 },
      { date: '12/16', value: 8.8 },
      { date: '12/17', value: 9.2 },
    ],
    compliance: 95,
    totalSessions: 24,
    avgDuration: 42,
    favoriteBodyPart: 'Hamstring'
  };

  const notes = [
    {
      id: 1,
      date: '2025-12-17',
      author: 'You',
      content: 'Athlete recovering well from half-marathon. Continue current protocol.',
      type: 'general'
    },
    {
      id: 2,
      date: '2025-12-15',
      author: 'Sarah Johnson',
      content: 'Feeling much better after last session. Hamstring tightness has reduced significantly.',
      type: 'feedback'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 safe-top">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="p-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          {/* Athlete Info */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xl flex-shrink-0">
              {athlete.initials}
            </div>
            <div className="flex-1">
              <h1 className="text-gray-900 mb-1">{athlete.name}</h1>
              <p className="text-gray-600 text-sm mb-2">{athlete.note}</p>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-50 rounded-xl p-3 border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700">Readiness</span>
              </div>
              <div className="text-xl text-green-900">{athlete.readiness}</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-700">Compliance</span>
              </div>
              <div className="text-xl text-blue-900">{athlete.compliance}%</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-purple-600" />
                <span className="text-xs text-purple-700">Sessions</span>
              </div>
              <div className="text-xl text-purple-900">{metrics.totalSessions}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-gray-200">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'sessions', label: 'Sessions' },
            { id: 'progress', label: 'Progress' },
            { id: 'notes', label: 'Notes' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 text-sm transition-colors ${
                activeTab === tab.id
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Readiness Trend */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Readiness Trend</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-end justify-between h-32 gap-2">
                {metrics.readiness.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-red-500 to-orange-400 rounded-t-lg"
                        style={{ height: `${(item.value / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Session */}
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5" />
                <h3>Next Session</h3>
              </div>
              <p className="text-2xl mb-1">{athlete.nextSession}</p>
              <p className="text-white/80 text-sm">Recovery Protocol - 45 min</p>
              <button className="mt-4 w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl transition-colors">
                View Details
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-gray-600 text-sm mb-1">Avg Session</div>
                <div className="text-2xl text-gray-900">{metrics.avgDuration} min</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-gray-600 text-sm mb-1">Focus Area</div>
                <div className="text-xl text-gray-900">{metrics.favoriteBodyPart}</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="text-gray-900 mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {sessions.slice(0, 3).map((session) => (
                  <div key={session.id} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 text-sm">{session.type}</div>
                      <div className="text-gray-500 text-xs">{session.date} • {session.duration}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Session History</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600">
                <Plus className="w-4 h-4" />
                <span>New Session</span>
              </button>
            </div>

            {sessions.map((session) => (
              <div key={session.id} className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-gray-900 mb-1">{session.type}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{session.date}</span>
                      <span>•</span>
                      <Clock className="w-4 h-4" />
                      <span>{session.time}</span>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs border border-green-200">
                    Completed
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Duration</div>
                    <div className="text-sm text-gray-900">{session.duration}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Body Part</div>
                    <div className="text-sm text-gray-900">{session.bodyPart}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Intensity</div>
                    <div className="text-sm text-gray-900">{session.intensity}</div>
                  </div>
                </div>

                {session.notes && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Notes</div>
                    <p className="text-sm text-gray-700">{session.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="text-gray-900 mb-4">Monthly Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-600 text-sm mb-1">Total Sessions</div>
                  <div className="text-3xl text-gray-900 mb-1">{metrics.totalSessions}</div>
                  <div className="text-xs text-green-600">+4 from last month</div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm mb-1">Compliance Rate</div>
                  <div className="text-3xl text-gray-900 mb-1">{metrics.compliance}%</div>
                  <div className="text-xs text-green-600">+5% improvement</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="text-gray-900 mb-4">Body Parts Treated</h3>
              <div className="space-y-3">
                {[
                  { part: 'Hamstring', sessions: 12, percentage: 50 },
                  { part: 'Quadriceps', sessions: 8, percentage: 33 },
                  { part: 'Calf', sessions: 4, percentage: 17 }
                ].map((item) => (
                  <div key={item.part}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">{item.part}</span>
                      <span className="text-sm text-gray-600">{item.sessions} sessions</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">Great Progress!</h3>
                  <p className="text-sm text-gray-700">
                    {athlete.name.split(' ')[0]} has maintained {metrics.compliance}% compliance this month. 
                    Readiness scores are trending upward consistently.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600">
              <Plus className="w-4 h-4" />
              <span>Add Note</span>
            </button>

            {notes.map((note) => (
              <div key={note.id} className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                      {note.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">{note.author}</div>
                      <div className="text-xs text-gray-500">{note.date}</div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    note.type === 'feedback' 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-gray-50 text-gray-700 border border-gray-200'
                  }`}>
                    {note.type}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{note.content}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
