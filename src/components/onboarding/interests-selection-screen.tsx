import React, { useMemo, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { ProfileType } from '../../types/user.types';

interface Props {
  profileType: ProfileType;
  onContinue?: (interests: string[]) => void;
}

const interestMap: Record<ProfileType, string[]> = {
  athlete: ['Recovery', 'Injury Prevention', 'Performance Boost', 'Endurance', 'Strength', 'Flexibility', 'Speed', 'Race Prep'],
  coach: ['Team Management', 'Progress Tracking', 'Injury Prevention', 'Program Design', 'Recovery Science', 'Analytics'],
  health: ['Pain Relief', 'Stress Reduction', 'Mobility', 'Better Sleep', 'Chronic Pain', 'General Wellness']
};

export const InterestsSelectionScreen: React.FC<Props> = ({ profileType, onContinue }) => {
  const { updateUser } = useUser();
  const [selected, setSelected] = useState<string[]>([]);
  const options = useMemo(() => interestMap[profileType] || [], [profileType]);

  const toggle = (interest: string) => {
    setSelected((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]));
  };

  const handleContinue = () => {
    updateUser({ interests: selected } as any);
    onContinue?.(selected);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customize Your Experience</h1>
          <p className="text-gray-600">{selected.length} selected</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {options.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggle(interest)}
              className={`px-4 py-2 rounded-full border text-sm transition ${selected.includes(interest) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-800 hover:border-blue-200'}`}
            >
              {interest}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default InterestsSelectionScreen;
