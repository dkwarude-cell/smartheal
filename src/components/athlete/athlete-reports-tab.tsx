import React from 'react';

interface Props {
  timeRange?: 'week' | 'month' | 'year';
}

export const AthleteReportsTab: React.FC<Props> = ({ timeRange = 'week' }) => {
  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Reports</h2>
        <select className="px-3 py-2 rounded-lg border border-gray-200 text-sm" defaultValue={timeRange}>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">Readiness over time (chart placeholder)</div>
        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">Sessions per week (chart placeholder)</div>
        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">Session types distribution (chart placeholder)</div>
        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">Stats summary</div>
      </div>
      <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Export</button>
    </div>
  );
};

export default AthleteReportsTab;
