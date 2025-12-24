import React, { useMemo, useState } from 'react';
import { BottomNavigation } from './components/shared/bottom-navigation';
import AthleteHomeScreen from './components/athlete/athlete-home-screen';
import AthleteTherapyTab from './components/athlete/athlete-therapy-tab';
import AthleteReportsTab from './components/athlete/athlete-reports-tab';
import CoachHomeScreen from './components/coach/coach-home-screen';
import CoachAthletesTab from './components/coach/coach-athletes-tab';
import CoachAnalyticsTab from './components/coach/coach-analytics-tab';
import CoachMessagesTab from './components/coach/coach-messages-tab';
import AthleteTrainingPlanScreen from './components/athlete/athlete-training-plan-screen';
import AthleteSessionDetailScreen from './components/athlete/athlete-session-detail-screen';
import AthleteDetailScreen from './components/coach/athlete-detail-screen';
import HealthHomeScreen from './components/health/health-home-screen';
import HealthTherapyTab from './components/health/health-therapy-tab';
import HealthProgramsTab from './components/health/health-programs-tab';
import { AthleteProfile } from './types/athlete.types';
import { CoachProfile } from './types/coach.types';
import { HealthUserProfile } from './types/health.types';
import { TherapySession } from './types/session.types';

const mockAthlete: AthleteProfile = {
  id: '1',
  email: 'alex@example.com',
  name: 'Alex Johnson',
  phone: '+1234567890',
  profileType: 'athlete',
  avatar: '🏃',
  details: {
    age: 28,
    sport: 'Marathon Running',
    experienceLevel: 'advanced',
    goals: ['Improve recovery', 'Reduce injury risk'],
    weeklyTrainingDays: 5,
    averageDistance: 50
  },
  coachId: 'coach-1',
  coachName: 'Sarah Williams',
  readiness: 87,
  streak: 7,
  longestStreak: 14,
  compliance: 94,
  weeklyDistance: 42.5,
  trainingLoad: 245,
  avgPace: 5.2,
  upcomingSessions: [],
  sessionHistory: [],
  monthSessions: 15,
  recentActivity: [85, 82, 88, 87, 89, 86, 87],
  workouts: [],
  sleepData: {
    hours: 7.5,
    quality: 82,
    deepSleepPercent: 22,
    interruptions: 1
  },
  hrv: 75,
  soreness: 3,
  currentWeek: 3,
  totalWeeks: 12,
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockCoach: CoachProfile = {
  id: 'coach-1',
  email: 'coach@example.com',
  name: 'Coach Taylor',
  phone: '+1987654321',
  profileType: 'coach',
  createdAt: new Date(),
  updatedAt: new Date(),
  details: {
    coachingType: 'Personal Trainer',
    specializations: ['Recovery', 'Performance'],
    yearsExperience: 8,
    certifications: 'CSCS'
  },
  athleteIds: ['1'],
  athletes: [mockAthlete],
  maxAthletes: 20,
  teamMetrics: {
    activeAthletes: 1,
    avgCompliance: 94,
    atRiskCount: 0,
    avgReadiness: 87
  },
  priorityAlerts: [],
  unreadMessages: 3
};

const mockHealth: HealthUserProfile = {
  id: 'health-1',
  email: 'sam@example.com',
  name: 'Sam Lee',
  phone: '+1123456789',
  profileType: 'health',
  createdAt: new Date(),
  updatedAt: new Date(),
  details: {
    ageGroup: '30-40',
    primaryGoal: 'Pain Management',
    painAreas: ['Lower Back'],
    mobilityIssues: []
  },
  painLevel: 4,
  mobilityScore: 72,
  wellBeingScore: 78,
  painHistory: [],
  dailyTasks: [],
  completedTasks: [],
  dailyPoints: 0,
  enrolledPrograms: [],
  sessions: [],
  streak: 3,
  longestStreak: 7,
  sleepData: {
    hours: 7,
    quality: 80
  }
};

const mockSession: TherapySession = {
  id: 'sess-1',
  userId: '1',
  name: 'Glute Recovery',
  type: 'recovery',
  scheduledTime: new Date(),
  duration: 20,
  bodyPart: 'Glutes',
  intensityLevel: 4,
  mode: 'guided',
  status: 'scheduled'
};

const App: React.FC = () => {
  const [profileType, setProfileType] = useState<'athlete' | 'coach' | 'health'>('athlete');
  const [activeTab, setActiveTab] = useState<string>('home');

  const content = useMemo(() => {
    if (profileType === 'athlete') {
      if (activeTab === 'therapy') return <AthleteTherapyTab sessions={[mockSession]} />;
      if (activeTab === 'reports') return <AthleteReportsTab />;
      if (activeTab === 'ai') return <AthleteSessionDetailScreen session={mockSession} />;
      return <AthleteHomeScreen athlete={mockAthlete} />;
    }
    if (profileType === 'coach') {
      if (activeTab === 'athletes') return <CoachAthletesTab athletes={mockCoach.athletes} />;
      if (activeTab === 'analytics') return <CoachAnalyticsTab />;
      if (activeTab === 'messages') return <CoachMessagesTab />;
      return <CoachHomeScreen coach={mockCoach} athletes={mockCoach.athletes} />;
    }
    if (profileType === 'health') {
      if (activeTab === 'therapy') return <HealthTherapyTab sessions={mockHealth.sessions} />;
      if (activeTab === 'programs') return <HealthProgramsTab />;
      if (activeTab === 'ai') return <HealthTherapyTab sessions={mockHealth.sessions} />;
      return <HealthHomeScreen user={mockHealth} />;
    }
    return null;
  }, [activeTab, profileType]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="p-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SmartHeal Multi-Profile</h1>
          <p className="text-sm text-gray-600">Profile: {profileType}</p>
        </div>
        <div className="flex gap-2">
          {(['athlete', 'coach', 'health'] as const).map((p) => (
            <button
              key={p}
              onClick={() => {
                setProfileType(p);
                setActiveTab('home');
              }}
              className={`px-3 py-2 rounded-lg border text-sm ${profileType === p ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-800'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4">{content}</main>

      <BottomNavigation profileType={profileType} activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
};

export default App;
