import React, { useMemo } from 'react';
import { AthleteProfile } from '../../types/athlete.types';
import { calculateRecoveryScore, calculateTrainingLoad, calculateWeeklyDistance } from '../../utils/calculations';
import { formatTimeUntil } from '../../utils/calculations';

interface Props {
  athlete?: AthleteProfile;
}

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

export const AthleteHomeScreen: React.FC<Props> = ({ athlete = mockAthlete }) => {
  const recoveryScore = useMemo(() => calculateRecoveryScore(athlete), [athlete]);
  const weeklyDistance = useMemo(() => calculateWeeklyDistance(athlete), [athlete]);
  const trainingLoad = useMemo(() => calculateTrainingLoad(athlete.workouts), [athlete]);

  return (
    <div className="space-y-4 p-4 bg-gray-50 min-h-screen">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Hey {athlete.name}!</p>
          <h1 className="text-2xl font-bold text-gray-900">Week {athlete.currentWeek} of {athlete.totalWeeks}</h1>
          <p className="text-sm text-gray-600">{athlete.details.experienceLevel} • {athlete.streak} day streak 🔥</p>
        </div>
        <div className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm">Coach {athlete.coachName}</div>
      </header>

      <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Weekly Distance" value={`${weeklyDistance} km`} helper="Last 7 days" />
        <StatCard title="Recovery Score" value={`${recoveryScore}%`} helper="AI estimated" />
        <StatCard title="Training Load" value={trainingLoad.toFixed(0)} helper="Computed from workouts" />
        <StatCard title="Avg Pace" value={`${athlete.avgPace} min/km`} helper="Current plan" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold text-gray-900">AI Daily Insight</h2>
          <p className="text-sm text-gray-600 mt-1">Focus: Active Recovery</p>
          <p className="text-sm text-gray-700 mt-2">Recommendation: keep intensity low and prioritize glute activation.</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Session</h2>
          {athlete.upcomingSessions[0] ? (
            <p className="text-sm text-gray-700">
              {athlete.upcomingSessions[0].name} • {formatTimeUntil(new Date(athlete.upcomingSessions[0].scheduledTime))}
            </p>
          ) : (
            <p className="text-sm text-gray-600">No upcoming sessions scheduled.</p>
          )}
        </div>
      </section>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; helper?: string }> = ({ title, value, helper }) => (
  <div className="bg-white rounded-xl p-4 shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-semibold text-gray-900">{value}</p>
    {helper && <p className="text-xs text-gray-500">{helper}</p>}
  </div>
);

export default AthleteHomeScreen;
