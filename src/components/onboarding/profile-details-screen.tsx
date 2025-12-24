import React, { useMemo, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { ProfileType } from '../../types/user.types';

interface Props {
  profileType: ProfileType;
  onContinue?: () => void;
}

export const ProfileDetailsScreen: React.FC<Props> = ({ profileType, onContinue }) => {
  const { updateUser, user } = useUser();
  const [form, setForm] = useState<any>(user?.details || {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validators = useMemo(() => {
    return {
      name: (value: string) => value && value.length >= 2,
      age: (value: number) => value >= 13 && value <= 100,
      experienceLevel: (value: string) => !!value,
      primaryGoal: (value: string) => !!value
    };
  }, []);

  const handleChange = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    if (profileType === 'athlete') {
      if (!validators.age(form.age)) nextErrors.age = 'Age 13-100';
      if (!form.sport) nextErrors.sport = 'Sport required';
    }
    if (profileType === 'coach') {
      if (!form.coachingType) nextErrors.coachingType = 'Required';
    }
    if (profileType === 'health') {
      if (!validators.primaryGoal(form.primaryGoal)) nextErrors.primaryGoal = 'Select a goal';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      updateUser({ details: form } as any);
      onContinue?.();
    }
  };

  const renderAthlete = () => (
    <div className="space-y-3">
      <input placeholder="Full Name" className="input" value={form.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
      <input type="number" placeholder="Age" className="input" value={form.age || ''} onChange={(e) => handleChange('age', Number(e.target.value))} />
      <select className="input" value={form.sport || ''} onChange={(e) => handleChange('sport', e.target.value)}>
        <option value="">Select sport</option>
        <option value="Marathon Running">Marathon Running</option>
        <option value="Track & Field">Track & Field</option>
        <option value="Cycling">Cycling</option>
        <option value="Other">Other</option>
      </select>
      <div className="flex gap-2">
        {['beginner', 'intermediate', 'advanced', 'elite'].map((lvl) => (
          <button
            type="button"
            key={lvl}
            className={`chip ${form.experienceLevel === lvl ? 'chip-active' : ''}`}
            onClick={() => handleChange('experienceLevel', lvl)}
          >
            {lvl}
          </button>
        ))}
      </div>
      <label className="block text-sm text-gray-700">Weekly Training Days: {form.weeklyTrainingDays || 0}</label>
      <input type="range" min={1} max={7} value={form.weeklyTrainingDays || 1} onChange={(e) => handleChange('weeklyTrainingDays', Number(e.target.value))} className="w-full" />
      <input type="number" placeholder="Average distance (km)" className="input" value={form.averageDistance || ''} onChange={(e) => handleChange('averageDistance', Number(e.target.value))} />
      {errors.age && <p className="text-sm text-red-600">{errors.age}</p>}
    </div>
  );

  const renderCoach = () => (
    <div className="space-y-3">
      <input placeholder="Full Name" className="input" value={form.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
      <select className="input" value={form.coachingType || ''} onChange={(e) => handleChange('coachingType', e.target.value)}>
        <option value="">Coaching type</option>
        <option value="Personal Trainer">Personal Trainer</option>
        <option value="Sports Coach">Sports Coach</option>
      </select>
      <input type="number" placeholder="Years experience" className="input" value={form.yearsExperience || ''} onChange={(e) => handleChange('yearsExperience', Number(e.target.value))} />
      <textarea placeholder="Certifications" className="input" value={form.certifications || ''} onChange={(e) => handleChange('certifications', e.target.value)} />
      {errors.coachingType && <p className="text-sm text-red-600">{errors.coachingType}</p>}
    </div>
  );

  const renderHealth = () => (
    <div className="space-y-3">
      <input placeholder="Full Name" className="input" value={form.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
      <select className="input" value={form.ageGroup || ''} onChange={(e) => handleChange('ageGroup', e.target.value)}>
        <option value="">Age group</option>
        <option value="18-25">18-25</option>
        <option value="26-35">26-35</option>
        <option value="36-50">36-50</option>
        <option value="50+">50+</option>
      </select>
      <div className="flex gap-2 flex-wrap">
        {['Pain Management', 'Wellness', 'Stress Relief'].map((goal) => (
          <button
            key={goal}
            type="button"
            className={`chip ${form.primaryGoal === goal ? 'chip-active' : ''}`}
            onClick={() => handleChange('primaryGoal', goal)}
          >
            {goal}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-700">Pain areas</p>
        <div className="flex flex-wrap gap-2">
          {['Lower Back', 'Neck', 'Shoulders', 'Knees'].map((area) => (
            <button
              key={area}
              type="button"
              className={`chip ${form.painAreas?.includes(area) ? 'chip-active' : ''}`}
              onClick={() => {
                const set = new Set(form.painAreas || []);
                set.has(area) ? set.delete(area) : set.add(area);
                handleChange('painAreas', Array.from(set));
              }}
            >
              {area}
            </button>
          ))}
        </div>
      </div>
      <label className="block text-sm text-gray-700">Current pain level: {form.painLevel || 0}</label>
      <input type="range" min={0} max={10} value={form.painLevel || 0} onChange={(e) => handleChange('painLevel', Number(e.target.value))} className="w-full" />
      {errors.primaryGoal && <p className="text-sm text-red-600">{errors.primaryGoal}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Complete your profile</h1>
          <p className="text-gray-600">Tailored fields for {profileType}.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          {profileType === 'athlete' && renderAthlete()}
          {profileType === 'coach' && renderCoach()}
          {profileType === 'health' && renderHealth()}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsScreen;
