import React from 'react';

export const HealthProgramsTab: React.FC = () => {
  return (
    <div className="p-4 space-y-3 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-900">Programs</h2>
      <div className="space-y-2">
        {['Pain Relief', 'Mobility', 'Stress'].map((goal) => (
          <div key={goal} className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
            <p className="font-semibold text-gray-900">{goal} Program</p>
            <p className="text-sm text-gray-600">Duration: 14 days • 8 sessions</p>
            <button className="mt-2 px-3 py-2 rounded-lg border border-gray-200 text-sm">Enroll</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthProgramsTab;
