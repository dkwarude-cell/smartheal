import React from 'react';
import { TherapySession } from '../../types/session.types';

interface Props {
  session: TherapySession;
}

export const AthleteSessionDetailScreen: React.FC<Props> = ({ session }) => {
  return (
    <div className="p-4 space-y-3 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold text-gray-900">{session.name}</h1>
      <div className="rounded-lg bg-white border border-gray-100 p-4 shadow-sm space-y-2 text-sm text-gray-700">
        <p>Duration: {session.duration} min</p>
        <p>Body part: {session.bodyPart}</p>
        <p>Intensity: Level {session.intensityLevel}</p>
        <p>Status: {session.status}</p>
      </div>
    </div>
  );
};

export default AthleteSessionDetailScreen;
