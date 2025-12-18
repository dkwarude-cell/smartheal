import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { 
  TrendingUp, TrendingDown, Calendar, Download, Share2, 
  BarChart3, PieChart, LineChart, Target, Clock, Zap,
  Trophy, Medal, Award, Activity
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface ReportsTabProps {
  user: any;
}

export function ReportsTab({ user }: ReportsTabProps) {
  const [timeRange, setTimeRange] = useState('week');
  const [reportType, setReportType] = useState('progress');

  // Mock data for charts
  const weeklyData = [
    { day: 'Mon', sessions: 2, duration: 45, pain: 3 },
    { day: 'Tue', sessions: 3, duration: 60, pain: 2 },
    { day: 'Wed', sessions: 1, duration: 20, pain: 4 },
    { day: 'Thu', sessions: 2, duration: 40, pain: 2 },
    { day: 'Fri', sessions: 3, duration: 65, pain: 1 },
    { day: 'Sat', sessions: 2, duration: 45, pain: 2 },
    { day: 'Sun', sessions: 1, duration: 25, pain: 3 }
  ];

  const monthlyData = [
    { week: 'Week 1', sessions: 12, avgPain: 3.2 },
    { week: 'Week 2', sessions: 15, avgPain: 2.8 },
    { week: 'Week 3', sessions: 18, avgPain: 2.3 },
    { week: 'Week 4', sessions: 16, avgPain: 2.1 }
  ];

  const programDistribution = [
    { name: 'Pain Relief', value: 45, color: '#ef4444' },
    { name: 'Muscle Recovery', value: 30, color: '#3b82f6' },
    { name: 'Stress Relief', value: 20, color: '#10b981' },
    { name: 'Custom', value: 5, color: '#f59e0b' }
  ];

  return (
    <div className="px-4 py-6 space-y-6 pb-24 max-h-screen overflow-y-auto scroll-smooth">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progress Reports</h1>
          <p className="text-gray-600">Track your therapy journey</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card className="smart-heal-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-900">Time Period</span>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">3 Months</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="smart-heal-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Total Sessions</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900">47</span>
              <span className="text-xs text-green-600">+12%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">vs last week</p>
          </CardContent>
        </Card>

        <Card className="smart-heal-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Avg Duration</span>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900">23m</span>
              <span className="text-xs text-green-600">+5%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">vs last week</p>
          </CardContent>
        </Card>

        <Card className="smart-heal-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Pain Reduction</span>
              <TrendingDown className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900">68%</span>
              <span className="text-xs text-green-600">+15%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">improvement</p>
          </CardContent>
        </Card>

        <Card className="smart-heal-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Consistency</span>
              <Target className="w-4 h-4 text-purple-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900">94%</span>
              <span className="text-xs text-green-600">+8%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">goal adherence</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-4">
          <Card className="smart-heal-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LineChart className="w-5 h-5 text-blue-600" />
                <span>Pain Level Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsLineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="pain" stroke="#ef4444" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>0 = No pain</span>
                <span>5 = Severe pain</span>
              </div>
            </CardContent>
          </Card>

          <Card className="smart-heal-card">
            <CardHeader>
              <CardTitle>Weekly Goals Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Sessions Completed</span>
                    <span>14/15</span>
                  </div>
                  <Progress value={93} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Total Duration</span>
                    <span>4.2/5 hours</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pain Reduction Goal</span>
                    <span>68/60%</span>
                  </div>
                  <Progress value={100} className="h-2 bg-green-100" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card className="smart-heal-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span>Daily Sessions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsBarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#3b82f6" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="smart-heal-card">
            <CardHeader>
              <CardTitle>Session Duration Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsLineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="duration" stroke="#10b981" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-gray-900">23m</p>
                  <p className="text-xs text-gray-500">Avg Duration</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">15m</p>
                  <p className="text-xs text-gray-500">Min Duration</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">35m</p>
                  <p className="text-xs text-gray-500">Max Duration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <Card className="smart-heal-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-purple-600" />
                <span>Program Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPieChart>
                  <Pie
                    data={programDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {programDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {programDistribution.map((program, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: program.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{program.name}</span>
                    <span className="text-sm font-medium">{program.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="smart-heal-card">
            <CardHeader>
              <CardTitle>Program Effectiveness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Pain Relief', effectiveness: 92, sessions: 21 },
                { name: 'Muscle Recovery', effectiveness: 88, sessions: 14 },
                { name: 'Stress Relief', effectiveness: 85, sessions: 9 },
                { name: 'Custom Programs', effectiveness: 79, sessions: 3 }
              ].map((program, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{program.name}</span>
                    <span className="text-gray-500">{program.sessions} sessions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={program.effectiveness} className="flex-1 h-2" />
                    <span className="text-sm font-medium w-10">{program.effectiveness}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Achievements */}
      <Card className="smart-heal-card border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-900">Recent Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { icon: Medal, title: '7-Day Streak', desc: 'Completed therapy for 7 consecutive days', date: '2 days ago' },
            { icon: Award, title: 'Pain Fighter', desc: 'Reduced pain levels by 50%', date: '1 week ago' },
            { icon: Activity, title: 'Consistency Champion', desc: 'Maintained 90% adherence rate', date: '2 weeks ago' }
          ].map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-yellow-200">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <achievement.icon className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-yellow-900">{achievement.title}</h3>
                <p className="text-sm text-yellow-700">{achievement.desc}</p>
                <p className="text-xs text-yellow-600">{achievement.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Health Insights */}
      <Card className="smart-heal-card">
        <CardHeader>
          <CardTitle>AI Health Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">💡 Recommendation</h3>
            <p className="text-sm text-blue-700">
              Your pain levels show significant improvement on days with morning sessions. Consider scheduling more morning therapy sessions for optimal results.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-medium text-green-900 mb-2">📈 Progress Note</h3>
            <p className="text-sm text-green-700">
              Your consistency has improved by 25% this month. Keep up the excellent work! You're on track to exceed your recovery goals.
            </p>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h3 className="font-medium text-amber-900 mb-2">⚠️ Gentle Reminder</h3>
            <p className="text-sm text-amber-700">
              Consider increasing session duration gradually. Your body is responding well to the current intensity levels.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReportsTab;