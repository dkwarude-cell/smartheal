import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, TrendingUp, Calendar, Bell, ChevronRight, Activity, Award, 
  AlertCircle, Search, Filter, BarChart3, Clock, CheckCircle2, 
  Target, Zap, MessageSquare, Plus, TrendingDown, Sparkles
} from 'lucide-react';
import { AthleteDetailScreen } from './athlete-detail-screen';
import { AnalyticsScreen } from './analytics-screen';

interface CoachHomeScreenProps {
  userName: string;
  coachType: string;
}

export function CoachHomeScreen({ userName, coachType }: CoachHomeScreenProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'priority' | 'recent'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState<any>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Key metrics with trend data
  const metrics = [
    { 
      label: 'Team Compliance', 
      value: 87, 
      unit: '%', 
      change: '+5%',
      trend: 'up',
      icon: CheckCircle2,
      color: 'green'
    },
    { 
      label: 'Avg Readiness', 
      value: 8.2, 
      unit: '/10', 
      change: '+0.3',
      trend: 'up',
      icon: Zap,
      color: 'blue'
    },
    { 
      label: 'At-Risk Athletes', 
      value: 2, 
      unit: '', 
      change: '-1',
      trend: 'down',
      icon: AlertCircle,
      color: 'orange'
    },
  ];

  // Athletes with advanced metrics
  const athletes = [
    { 
      id: 1,
      name: 'Sarah Johnson', 
      initials: 'SJ',
      readiness: 9.2,
      compliance: 95,
      lastSession: '2h',
      nextSession: 'Today 4:00 PM',
      status: 'excellent',
      trend: [7.5, 8.0, 8.5, 9.0, 9.2],
      alert: null,
      note: 'Recovering well from half-marathon'
    },
    { 
      id: 2,
      name: 'Mike Chen', 
      initials: 'MC',
      readiness: 7.8,
      compliance: 88,
      lastSession: '1d',
      nextSession: 'Tomorrow 9:00 AM',
      status: 'good',
      trend: [8.0, 7.8, 7.5, 7.8, 7.8],
      alert: null,
      note: 'Hamstring tightness reported'
    },
    { 
      id: 3,
      name: 'Emma Davis', 
      initials: 'ED',
      readiness: 5.4,
      compliance: 60,
      lastSession: '3d',
      nextSession: 'Overdue',
      status: 'priority',
      trend: [7.0, 6.5, 6.0, 5.5, 5.4],
      alert: 'Missed 2 sessions',
      note: 'Follow up needed'
    },
    { 
      id: 4,
      name: 'David Wilson', 
      initials: 'DW',
      readiness: 8.5,
      compliance: 92,
      lastSession: '12h',
      nextSession: 'Today 2:00 PM',
      status: 'excellent',
      trend: [8.0, 8.2, 8.3, 8.4, 8.5],
      alert: null,
      note: 'Marathon prep - week 8'
    },
  ];

  // Quick actions
  const quickActions = [
    { label: 'New Session', icon: Plus, color: 'red' },
    { label: 'Send Message', icon: MessageSquare, color: 'blue' },
    { label: 'View Analytics', icon: BarChart3, color: 'purple' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-50 text-green-700 border-green-200';
      case 'good': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'priority': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'priority' && athlete.status === 'priority') ||
                       (activeTab === 'recent' && parseInt(athlete.lastSession) <= 24);
    return matchesSearch && matchesTab;
  });

  // If analytics view is active
  if (showAnalytics) {
    return (
      <AnalyticsScreen
        user={{ profileType: 'coach', name: userName }}
        onBack={() => setShowAnalytics(false)}
      />
    );
  }

  // If an athlete is selected, show detail view
  if (selectedAthlete) {
    return (
      <AthleteDetailScreen 
        athlete={selectedAthlete} 
        onBack={() => setSelectedAthlete(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-24">
      {/* Minimalist Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Coach {userName}</h1>
            <p className="text-gray-500 text-sm capitalize">{coachType.replace('-', ' ')}</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </motion.div>

      {/* Key Metrics - Minimalist Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up' && metric.color !== 'orange' || metric.trend === 'down' && metric.color === 'orange';
          
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-white rounded-2xl p-4 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  metric.color === 'green' ? 'bg-green-50' :
                  metric.color === 'blue' ? 'bg-blue-50' :
                  'bg-orange-50'
                }`}>
                  <Icon className={`w-4 h-4 ${
                    metric.color === 'green' ? 'text-green-600' :
                    metric.color === 'blue' ? 'text-blue-600' :
                    'text-orange-600'
                  }`} />
                </div>
                <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                </div>
              </div>
              <div className="text-2xl text-gray-900 mb-0.5">
                {metric.value}<span className="text-lg text-gray-500">{metric.unit}</span>
              </div>
              <div className="text-xs text-gray-500">{metric.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2 mb-6"
      >
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="flex-1 bg-white rounded-xl py-3 px-4 border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all flex items-center justify-center gap-2 text-sm text-gray-700 hover:text-red-600"
              onClick={() => action.label === 'View Analytics' ? setShowAnalytics(true) : null}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{action.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-4"
      >
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search athletes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            />
          </div>
          <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All Athletes', count: athletes.length },
            { id: 'priority', label: 'Priority', count: athletes.filter(a => a.status === 'priority').length },
            { id: 'recent', label: 'Recent', count: athletes.filter(a => parseInt(a.lastSession) <= 24).length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {tab.label} <span className={`${activeTab === tab.id ? 'text-white/80' : 'text-gray-400'}`}>({tab.count})</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Athletes List - Clean & Data-Rich */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        {filteredAthletes.map((athlete, index) => (
          <motion.div
            key={athlete.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.05 }}
            className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-red-200 hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelectedAthlete(athlete)}
          >
            {/* Alert Banner */}
            {athlete.alert && (
              <div className="mb-3 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span className="text-xs text-orange-700">{athlete.alert}</span>
              </div>
            )}

            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white flex-shrink-0">
                <span className="text-sm">{athlete.initials}</span>
              </div>

              {/* Main Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-gray-900 mb-0.5">{athlete.name}</h3>
                    <p className="text-xs text-gray-500">{athlete.note}</p>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full border text-xs ${getStatusColor(athlete.status)}`}>
                    {athlete.status === 'excellent' ? '✓ Excellent' : 
                     athlete.status === 'good' ? 'Good' : 
                     '⚠ Priority'}
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {/* Readiness Score */}
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Readiness</div>
                    <div className="flex items-center gap-1.5">
                      <div className="text-lg text-gray-900">{athlete.readiness}</div>
                      <div className="text-xs text-gray-400">/10</div>
                      {/* Mini sparkline */}
                      <div className="flex items-end gap-0.5 h-4 ml-1">
                        {athlete.trend.map((val, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full ${
                              val >= 8 ? 'bg-green-400' : 
                              val >= 6 ? 'bg-yellow-400' : 
                              'bg-orange-400'
                            }`}
                            style={{ height: `${(val / 10) * 100}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Compliance */}
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Compliance</div>
                    <div className="flex items-center gap-1.5">
                      <div className="text-lg text-gray-900">{athlete.compliance}</div>
                      <div className="text-xs text-gray-400">%</div>
                      <div className="w-12 bg-gray-200 rounded-full h-1.5 ml-1">
                        <div
                          className={`h-1.5 rounded-full ${
                            athlete.compliance >= 90 ? 'bg-green-500' :
                            athlete.compliance >= 75 ? 'bg-yellow-500' :
                            'bg-orange-500'
                          }`}
                          style={{ width: `${athlete.compliance}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Last Session */}
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Last Session</div>
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {athlete.lastSession} ago
                    </div>
                  </div>
                </div>

                {/* Next Session */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-600">Next:</span>
                    <span className={`${
                      athlete.nextSession === 'Overdue' ? 'text-orange-600' : 'text-gray-900'
                    }`}>
                      {athlete.nextSession}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredAthletes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No athletes found</p>
          <p className="text-gray-400 text-sm">Try adjusting your filters</p>
        </div>
      )}

      {/* Insights Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-100"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">AI Insight</h3>
            <p className="text-sm text-gray-700 mb-2">
              Team recovery trending up this week. Consider increasing training intensity for top performers (Sarah, David).
            </p>
            <button className="text-sm text-purple-600 hover:underline">View detailed analysis →</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}