import React from 'react';
import { HealthUserProfile } from '../../types/health.types';
import { calculatePainImprovement, calculatePainReliefPercentage, calculateDailyProgress } from '../../utils/calculations';

interface Props {
  user?: HealthUserProfile;
}

const mockTasks = [
  { id: 'morning', name: 'Morning Hydration', points: 10 },
  { id: 'breath', name: 'Breathing Exercise', points: 15 },
  { id: 'walk', name: 'Afternoon Walk', points: 20 },
  { id: 'therapy', name: 'Evening Therapy', points: 30 },
  { id: 'sleep', name: 'Bedtime Routine', points: 15 }
];

export const HealthHomeScreen: React.FC<Props> = ({ user }) => {
  const painRelief = user ? calculatePainReliefPercentage(user.painLevel) : 0;
  const improvement = user ? calculatePainImprovement(user) : 0;
  const dailyProgress = user ? calculateDailyProgress(user.completedTasks, mockTasks) : null;

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hey {user?.name || 'Guest'}</h1>
          <p className="text-sm text-gray-600">Goal: {user?.details.primaryGoal || 'Wellness'}</p>
        </div>
        <div className="px-3 py-2 bg-green-50 text-green-800 rounded-lg text-sm">Daily points: {user?.dailyPoints || 0}</div>
      </header>

      <section className="grid gap-3 md:grid-cols-4">
        <Metric label="Pain Relief" value={`${painRelief}%`} />
        <Metric label="Mobility" value={`${user?.mobilityScore ?? 0}/100`} />
        <Metric label="Well-being" value={`${user?.wellBeingScore ?? 0}%`} />
        <Metric label="Sleep" value={`${user?.sleepData?.hours ?? 0} hrs`} />
      </section>

      <section className="rounded-xl bg-white border border-gray-100 p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Wellness Insight</h2>
        <p className="text-sm text-gray-700">Pain improvement: {improvement}% vs last week.</p>
      </section>

      <section className="rounded-xl bg-white border border-gray-100 p-4 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Daily Tasks</h2>
          <p className="text-sm text-gray-600">{dailyProgress ? `${dailyProgress.tasksCompleted}/5 completed` : '0/5 completed'}</p>
        </div>
        {mockTasks.map((task) => (
          <div key={task.id} className="p-3 rounded-lg border border-gray-100 bg-gray-50 text-sm text-gray-800">
            {task.name} • {task.points} pts
          </div>
        ))}
      </section>
    </div>
  );
};

const Metric: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-gray-900">{value}</p>
  </div>
);

export default HealthHomeScreen;
