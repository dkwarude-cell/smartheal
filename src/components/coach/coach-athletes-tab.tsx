import React from 'react';
import { AthleteProfile } from '../../types/athlete.types';

interface Props {
  athletes?: AthleteProfile[];
}

export const CoachAthletesTab: React.FC<Props> = ({ athletes = [] }) => {
  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Athletes</h2>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Add New Athlete</button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {athletes.length === 0 && <p className="text-sm text-gray-600">No athletes yet.</p>}
        {athletes.map((athlete) => (
          <div key={athlete.id} className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm space-y-1">
            <p className="font-semibold text-gray-900">{athlete.name}</p>
            <p className="text-sm text-gray-600">{athlete.details.sport}</p>
            <p className="text-xs text-gray-500">Readiness {athlete.readiness}% • Compliance {athlete.compliance}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachAthletesTab;
