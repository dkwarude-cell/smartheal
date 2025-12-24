import React from 'react';
import { TherapySession } from '../../types/session.types';

interface Props {
  sessions?: TherapySession[];
}

export const HealthTherapyTab: React.FC<Props> = ({ sessions = [] }) => {
  return (
    <div className="p-4 space-y-3 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Therapy</h2>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Start Self-Guided Session</button>
      </div>
      <div className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm text-sm text-gray-700">Available programs (placeholder)</div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-800">Session History</h3>
        {sessions.length === 0 && <p className="text-sm text-gray-600">No sessions yet.</p>}
        {sessions.map((session) => (
          <div key={session.id} className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm text-sm text-gray-700">
            {session.name} • {session.duration} min • {session.status}
          </div>
        ))}
      </div>
      <div className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm text-sm text-gray-700">Pain tracking chart (placeholder)</div>
    </div>
  );
};

export default HealthTherapyTab;
