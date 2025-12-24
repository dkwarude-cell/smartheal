import React from 'react';

interface SessionControlScreenProps {
  isConnected: boolean;
  onStart: () => void;
  onStop: () => void;
  onTogglePause: () => void;
  duration?: string;
  intensity?: number;
}

export const SessionControlScreen: React.FC<SessionControlScreenProps> = ({ isConnected, onStart, onStop, onTogglePause, duration = '00:00', intensity = 3 }) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Session duration</p>
          <p className="text-2xl font-semibold text-gray-900">{duration}</p>
        </div>
        <div className="text-sm text-gray-600">Intensity: {intensity}</div>
      </div>
      <div className="flex gap-2">
        <button disabled={!isConnected} onClick={onStart} className="flex-1 py-3 rounded-lg bg-blue-600 text-white disabled:opacity-60">Start</button>
        <button disabled={!isConnected} onClick={onTogglePause} className="flex-1 py-3 rounded-lg border border-gray-200">Pause/Resume</button>
        <button disabled={!isConnected} onClick={onStop} className="flex-1 py-3 rounded-lg border border-gray-200">Stop</button>
      </div>
      {!isConnected && <p className="text-xs text-amber-600">Connect your device to control sessions.</p>}
    </div>
  );
};

export default SessionControlScreen;
