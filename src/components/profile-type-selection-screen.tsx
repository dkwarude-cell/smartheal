import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Trophy, Heart, ChevronRight } from 'lucide-react';

interface ProfileTypeSelectionScreenProps {
  onNavigate: (state: string) => void;
  onUserUpdate: (data: any) => void;
  user: any;
}

const profileTypes = [
  {
    id: 'athlete',
    title: 'Runner / Athlete',
    description: 'Train smarter, recover faster, perform better',
    icon: Trophy,
    features: ['Performance tracking', 'Training plans', 'Recovery optimization']
  },
  {
    id: 'coach',
    title: 'Coach / Trainer',
    description: 'Manage athletes and optimize their performance',
    icon: User,
    features: ['Client management', 'Progress monitoring', 'Treatment planning']
  },
  {
    id: 'health',
    title: 'Health & Wellness',
    description: 'Manage pain, improve mobility, feel better',
    icon: Heart,
    features: ['Pain management', 'Wellness tracking', 'Self-care guidance']
  }
];

export function ProfileTypeSelectionScreen({ onNavigate, onUserUpdate }: ProfileTypeSelectionScreenProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (typeId: string) => {
    setSelectedType(typeId);
    setTimeout(() => {
      onUserUpdate({ profileType: typeId });
      onNavigate('profile-details');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-red-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-3">Tell us about yourself</h1>
          <p className="text-gray-600">We'll customize your SmartHeal experience</p>
        </motion.div>

        {/* Profile Type Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {profileTypes.map((type, index) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;

            return (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSelect(type.id)}
                className={`relative bg-white rounded-2xl p-6 text-left transition-all duration-300 shadow-lg border-2 ${
                  isSelected
                    ? 'border-red-500 shadow-red-100 scale-105'
                    : 'border-gray-100 hover:border-red-200 hover:shadow-xl'
                }`}
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 p-4 mb-4 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{type.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-4">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-500 text-sm flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Selected indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 text-sm"
        >
          You can change this later in settings
        </motion.p>
      </div>
    </div>
  );
}