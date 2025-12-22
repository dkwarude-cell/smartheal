import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, Activity, TrendingUp, Heart, Brain, Target } from 'lucide-react';

interface InterestsSelectionScreenProps {
  onNavigate: (state: string) => void;
  onUserUpdate: (data: any) => void;
  user: any;
}

const interestOptions = {
  athlete: [
    { id: 'therapy', title: 'Recovery Therapy', description: 'Post-workout recovery and injury prevention', icon: Heart },
    { id: 'performance', title: 'Performance Enhancement', description: 'Optimize training and competition results', icon: TrendingUp },
    { id: 'training', title: 'Training Plans', description: 'Structured workout programs', icon: Target },
    { id: 'analytics', title: 'Performance Analytics', description: 'Track metrics and progress', icon: Activity }
  ],
  coach: [
    { id: 'client-management', title: 'Client Management', description: 'Manage multiple athletes/clients', icon: Target },
    { id: 'therapy', title: 'Therapy Protocols', description: 'Treatment and recovery plans', icon: Heart },
    { id: 'progress-tracking', title: 'Progress Tracking', description: 'Monitor client improvements', icon: TrendingUp },
    { id: 'ai-insights', title: 'AI Insights', description: 'Smart recommendations for clients', icon: Brain }
  ],
  health: [
    { id: 'therapy', title: 'Therapy Sessions', description: 'Guided pain relief and wellness', icon: Heart },
    { id: 'wellness', title: 'Wellness Tracking', description: 'Daily health monitoring', icon: Activity },
    { id: 'guided', title: 'Guided Programs', description: 'Step-by-step treatment plans', icon: Target },
    { id: 'education', title: 'Health Education', description: 'Learn about your condition', icon: Brain }
  ]
};

const focusAreas = {
  athlete: [
    { id: 'recovery', title: 'Recovery Focused', description: 'Prioritize muscle recovery and injury prevention' },
    { id: 'performance', title: 'Performance Focused', description: 'Maximize athletic performance and results' },
    { id: 'balanced', title: 'Balanced Approach', description: 'Equal focus on recovery and performance' }
  ],
  coach: [
    { id: 'individual', title: 'Individual Clients', description: 'Focus on one-on-one coaching' },
    { id: 'team', title: 'Team Management', description: 'Manage groups and teams' },
    { id: 'both', title: 'Both', description: 'Individual and team coaching' }
  ],
  health: [
    { id: 'pain-relief', title: 'Pain Relief', description: 'Primary focus on reducing pain' },
    { id: 'mobility', title: 'Mobility Improvement', description: 'Enhance movement and flexibility' },
    { id: 'holistic', title: 'Holistic Wellness', description: 'Overall health improvement' }
  ]
};

export function InterestsSelectionScreen({ onNavigate, onUserUpdate, user }: InterestsSelectionScreenProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [focusArea, setFocusArea] = useState<string>('');

  const profileType = user?.profileType || 'athlete';
  const interests = interestOptions[profileType as keyof typeof interestOptions] || interestOptions.athlete;
  const focuses = focusAreas[profileType as keyof typeof focusAreas] || focusAreas.athlete;

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedInterests.length > 0 && focusArea) {
      onUserUpdate({ interests: [...selectedInterests, focusArea] });
      onNavigate('profile-setup');
    }
  };

  const canContinue = selectedInterests.length > 0 && focusArea;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6 safe-top">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-red-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-3">What features interest you?</h1>
          <p className="text-gray-600">Select all that apply to customize your experience</p>
        </motion.div>

        {/* Interest Options */}
        <div className="mb-10">
          <h2 className="text-gray-900 mb-4">Features & Tools</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {interests.map((interest, index) => {
              const Icon = interest.icon;
              const isSelected = selectedInterests.includes(interest.id);

              return (
                <motion.button
                  key={interest.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => toggleInterest(interest.id)}
                  className={`bg-white rounded-xl p-5 text-left transition-all duration-300 shadow-md border-2 ${
                    isSelected
                      ? 'border-red-500 shadow-red-100'
                      : 'border-gray-100 hover:border-red-200 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'bg-red-500' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">{interest.title}</h3>
                      <p className="text-gray-600 text-sm">{interest.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
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
              );
            })}
          </div>
        </div>

        {/* Focus Area */}
        {selectedInterests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-gray-900 mb-4">Primary Focus</h2>
            <div className="space-y-3">
              {focuses.map((focus, index) => (
                <motion.button
                  key={focus.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setFocusArea(focus.id)}
                  className={`w-full bg-white rounded-xl p-5 text-left transition-all duration-300 shadow-md border-2 ${
                    focusArea === focus.id
                      ? 'border-red-500 shadow-red-100'
                      : 'border-gray-100 hover:border-red-200 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-900 mb-1">{focus.title}</h3>
                      <p className="text-gray-600 text-sm">{focus.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      focusArea === focus.id
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-300'
                    }`}>
                      {focusArea === focus.id && (
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
          <span>Complete Setup</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* Progress Indicator */}
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-red-500" />
        </div>
      </div>
    </div>
  );
}