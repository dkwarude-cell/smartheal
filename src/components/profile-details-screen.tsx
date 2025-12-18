import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Heart } from 'lucide-react';

interface ProfileDetailsScreenProps {
  onNavigate: (state: string) => void;
  onUserUpdate: (data: any) => void;
  user: any;
}

const athleteLevels = [
  { id: 'beginner', title: 'Beginner', description: 'New to running or returning after a break' },
  { id: 'intermediate', title: 'Intermediate', description: 'Regular runner, 3-5 times per week' },
  { id: 'advanced', title: 'Advanced', description: 'Experienced runner, training for competitions' },
  { id: 'professional', title: 'Professional', description: 'Elite athlete or serious competitor' }
];

const coachTypes = [
  { id: 'personal', title: 'Personal Trainer', description: 'One-on-one client training' },
  { id: 'sports', title: 'Sports Coach', description: 'Team or individual sports coaching' },
  { id: 'team', title: 'Team Coach', description: 'Managing multiple athletes' },
  { id: 'rehab', title: 'Rehabilitation Specialist', description: 'Recovery and injury prevention' }
];

const ageGroups = [
  { id: '18-30', title: '18-30 years', description: 'Young adult' },
  { id: '31-45', title: '31-45 years', description: 'Adult' },
  { id: '46-60', title: '46-60 years', description: 'Mature adult' },
  { id: '60+', title: '60+ years', description: 'Senior' }
];

const healthGoals = [
  { id: 'pain', title: 'Pain Management', description: 'Chronic pain relief' },
  { id: 'mobility', title: 'Improve Mobility', description: 'Better movement and flexibility' },
  { id: 'recovery', title: 'Post-Injury Recovery', description: 'Rehabilitation support' },
  { id: 'wellness', title: 'General Wellness', description: 'Overall health improvement' }
];

export function ProfileDetailsScreen({ onNavigate, onUserUpdate, user }: ProfileDetailsScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [secondaryOption, setSecondaryOption] = useState<string>('');

  const profileType = user?.profileType || 'athlete';

  const getOptions = () => {
    switch (profileType) {
      case 'athlete':
        return { title: 'What\'s your experience level?', options: athleteLevels, showSecondary: false };
      case 'coach':
        return { title: 'What type of coach are you?', options: coachTypes, showSecondary: false };
      case 'health':
        return { 
          title: 'Select your age group', 
          options: ageGroups, 
          showSecondary: true,
          secondaryTitle: 'What\'s your primary goal?',
          secondaryOptions: healthGoals
        };
      default:
        return { title: '', options: [], showSecondary: false };
    }
  };

  const config = getOptions();
  const canContinue = profileType === 'health' ? selectedOption && secondaryOption : selectedOption;

  const handleContinue = () => {
    if (canContinue) {
      onUserUpdate({
        level: selectedOption,
        goal: secondaryOption || null
      });
      onNavigate('interests');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-red-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-3">{config.title}</h1>
          <p className="text-gray-600">Help us personalize your experience</p>
        </motion.div>

        {/* Primary Options */}
        <div className="space-y-4 mb-8">
          {config.options.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full bg-white rounded-xl p-6 text-left transition-all duration-300 shadow-md border-2 ${
                selectedOption === option.id
                  ? 'border-red-500 shadow-red-100'
                  : 'border-gray-100 hover:border-red-200 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{option.title}</h3>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedOption === option.id
                    ? 'border-red-500 bg-red-500'
                    : 'border-gray-300'
                }`}>
                  {selectedOption === option.id && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Secondary Options (for health profile) */}
        {config.showSecondary && selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-gray-900 mb-4">{config.secondaryTitle}</h2>
            <div className="space-y-4">
              {config.secondaryOptions?.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSecondaryOption(option.id)}
                  className={`w-full bg-white rounded-xl p-5 text-left transition-all duration-300 shadow-md border-2 ${
                    secondaryOption === option.id
                      ? 'border-red-500 shadow-red-100'
                      : 'border-gray-100 hover:border-red-200 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-gray-900 mb-1">{option.title}</h4>
                      <p className="text-gray-600 text-sm">{option.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      secondaryOption === option.id
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-300'
                    }`}>
                      {secondaryOption === option.id && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: canContinue ? 1 : 0.5 }}
          onClick={handleContinue}
          disabled={!canContinue}
          className={`w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
            canContinue
              ? 'hover:shadow-xl hover:scale-102'
              : 'cursor-not-allowed'
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}