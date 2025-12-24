import React from 'react';
import { TrainingPlan } from '../../types/athlete.types';

interface Props {
  plan?: TrainingPlan;
}

export const AthleteTrainingPlanScreen: React.FC<Props> = ({ plan }) => {
  return (
    <div className="p-4 space-y-3 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold text-gray-900">Training Plan</h1>
      {plan ? (
        <div className="rounded-xl bg-white border border-gray-100 p-4 shadow-sm">
          <p className="font-medium text-gray-900">{plan.name}</p>
          <p className="text-sm text-gray-600">Week {plan.currentWeek} of {plan.totalWeeks}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-600">No plan assigned yet.</p>
      )}
    </div>
  );
};

export default AthleteTrainingPlanScreen;
