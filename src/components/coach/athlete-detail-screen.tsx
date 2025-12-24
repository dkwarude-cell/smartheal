import React from 'react';
import { AthleteProfile } from '../../types/athlete.types';

interface Props {
  athlete: AthleteProfile;
  onBack?: () => void;
}

export const AthleteDetailScreen: React.FC<Props> = ({ athlete, onBack }) => {
  return (
    <div className="p-4 space-y-3 bg-gray-50 min-h-screen">
      <button onClick={onBack} className="text-sm text-blue-600">Back</button>
      <div className="rounded-xl bg-white border border-gray-100 p-4 shadow-sm space-y-1">
        <p className="text-lg font-semibold text-gray-900">{athlete.name}</p>
        <p className="text-sm text-gray-600">{athlete.details.sport}</p>
        <p className="text-sm text-gray-600">Readiness {athlete.readiness}%</p>
        <p className="text-sm text-gray-600">Compliance {athlete.compliance}% • Streak {athlete.streak}</p>
      </div>
      <div className="rounded-lg bg-white border border-gray-100 p-3 text-sm text-gray-700">Session history placeholder</div>
      <div className="rounded-lg bg-white border border-gray-100 p-3 text-sm text-gray-700">Workout history placeholder</div>
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Assign session</button>
        <button className="px-4 py-2 rounded-lg border border-gray-200">Send message</button>
      </div>
    </div>
  );
};

export default AthleteDetailScreen;
