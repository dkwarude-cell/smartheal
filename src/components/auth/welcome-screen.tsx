import React from 'react';

interface WelcomeScreenProps {
  onLogin?: () => void;
  onSignup?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLogin, onSignup }) => (
  <div className="min-h-screen flex flex-col justify-center px-6 py-10 bg-white">
    <div className="max-w-md w-full mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to SmartHeal</h1>
        <p className="text-gray-600 mt-1">Personalized therapy for athletes, coaches, and wellness users.</p>
      </div>
      <div className="grid gap-3">
        <div className="p-4 rounded-lg bg-blue-50 text-blue-900">AI-guided sessions</div>
        <div className="p-4 rounded-lg bg-green-50 text-green-900">Real-time device control</div>
        <div className="p-4 rounded-lg bg-purple-50 text-purple-900">Insights and reports</div>
      </div>
      <div className="flex flex-col gap-3">
        <button onClick={onLogin} className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition" aria-label="Login">
          Login
        </button>
        <button onClick={onSignup} className="w-full py-3 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50 transition" aria-label="Sign up">
          Sign Up
        </button>
      </div>
    </div>
  </div>
);

export default WelcomeScreen;
