import React from 'react';

interface StartScreenProps {
  onGetStarted?: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6 text-center">
      <div className="mb-8 text-4xl" aria-hidden>
        🩺
      </div>
      <h1 className="text-3xl font-bold text-gray-900">SmartHeal</h1>
      <p className="text-gray-600 mt-2">Advanced Therapy Technology</p>
      <button
        type="button"
        onClick={onGetStarted}
        className="mt-8 px-6 py-3 rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition"
        aria-label="Get started"
      >
        Get Started
      </button>
    </div>
  );
};

export default StartScreen;
