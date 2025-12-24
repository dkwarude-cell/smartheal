import React from 'react';
import { Home, Zap, BarChart, MessageCircle, LayoutDashboard, Users, TrendingUp, MessageSquare, Heart, Calendar, Sparkles } from 'lucide-react';
import { ProfileType } from '../../types/user.types';

interface NavTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

const getNavTabs = (profileType: ProfileType): NavTab[] => {
  if (profileType === 'athlete') {
    return [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'therapy', label: 'Therapy', icon: Zap },
      { id: 'reports', label: 'Reports', icon: BarChart },
      { id: 'ai', label: 'AI Coach', icon: MessageCircle }
    ];
  }
  if (profileType === 'coach') {
    return [
      { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'athletes', label: 'Athletes', icon: Users },
      { id: 'analytics', label: 'Analytics', icon: TrendingUp },
      { id: 'messages', label: 'Messages', icon: MessageSquare }
    ];
  }
  return [
    { id: 'home', label: 'Wellness', icon: Heart },
    { id: 'therapy', label: 'Therapy', icon: Zap },
    { id: 'programs', label: 'Programs', icon: Calendar },
    { id: 'ai', label: 'AI Guide', icon: Sparkles }
  ];
};

interface BottomNavigationProps {
  profileType: ProfileType;
  activeTab: string;
  onChange: (tabId: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ profileType, activeTab, onChange }) => {
  const tabs = getNavTabs(profileType);
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm py-2 px-4 flex justify-between">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex flex-col items-center text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
            aria-label={tab.label}
          >
            <Icon size={20} />
            <span className="mt-1">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
