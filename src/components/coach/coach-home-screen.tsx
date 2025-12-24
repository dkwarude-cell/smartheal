import React from 'react';
import { CoachProfile } from '../../types/coach.types';
import { AthleteProfile } from '../../types/athlete.types';
import { calculateTeamMetrics, detectAtRiskAthletes } from '../../utils/calculations';

interface Props {
  coach?: CoachProfile;
  athletes?: AthleteProfile[];
}

export const CoachHomeScreen: React.FC<Props> = ({ coach, athletes = [] }) => {
  const metrics = calculateTeamMetrics(athletes);
  const alerts = detectAtRiskAthletes(athletes);

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, Coach {coach?.name || 'Guest'}</h1>
          <p className="text-sm text-gray-600">Total athletes: {athletes.length}</p>
        </div>
        <div className="px-3 py-2 bg-blue-50 text-blue-800 rounded-lg text-sm">Priority alerts: {alerts.length}</div>
      </header>

      <section className="grid gap-3 md:grid-cols-4">
        <Metric label="Active Athletes" value={`${metrics.activeAthletes}/${athletes.length}`} />
        <Metric label="Avg Compliance" value={`${metrics.avgCompliance}%`} />
        <Metric label="At-Risk" value={`${metrics.atRiskCount}`} />
        <Metric label="Avg Readiness" value={`${metrics.avgReadiness}%`} />
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Priority Insights</h2>
        {alerts.length === 0 && <p className="text-sm text-gray-600">No alerts.</p>}
        {alerts.map((alert) => (
          <div key={alert.athleteId + alert.type} className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
            <p className="text-sm font-semibold text-gray-900">{alert.athleteName}</p>
            <p className="text-sm text-gray-700">{alert.message}</p>
            <p className="text-xs text-gray-500">Action: {alert.action}</p>
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

export default CoachHomeScreen;
