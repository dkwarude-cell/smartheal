import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { ProfileType } from '../../types/user.types';

interface Props {
  onContinue?: (profileType: ProfileType) => void;
}

const options: Array<{ id: ProfileType; title: string; description: string; features: string[]; icon: string }> = [
  { id: 'athlete', title: 'Athlete', description: 'Performance, recovery, and training plans.', features: ['AI insights', 'Therapy sessions', 'Training load'], icon: '🏃' },
  { id: 'coach', title: 'Coach', description: 'Manage athletes and monitor readiness.', features: ['Team metrics', 'Alerts', 'Assign sessions'], icon: '🧭' },
  { id: 'health', title: 'Health & Wellness', description: 'Guided wellness and pain relief.', features: ['Pain tracking', 'Programs', 'Daily tasks'], icon: '🌿' }
];

export const ProfileTypeSelectionScreen: React.FC<Props> = ({ onContinue }) => {
  const { updateUser, user } = useUser();
  const [selected, setSelected] = useState<ProfileType | null>((user?.profileType as ProfileType) || null);

  const handleContinue = () => {
    if (!selected) return;
    updateUser({ profileType: selected } as any);
    onContinue?.(selected);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Choose Your Profile</h1>
          <p className="text-gray-600 mt-1">Pick the experience tailored to your goals.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`h-full text-left rounded-xl border p-4 transition shadow-sm bg-white ${selected === option.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-200'}`}
              aria-pressed={selected === option.id}
            >
              <div className="text-3xl" aria-hidden>{option.icon}</div>
              <h2 className="mt-3 text-lg font-semibold text-gray-900">{option.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-700 list-disc list-inside">
                {option.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </button>
          ))}
        </div>
        <div className="text-center">
          <button
            type="button"
            disabled={!selected}
            onClick={handleContinue}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTypeSelectionScreen;
