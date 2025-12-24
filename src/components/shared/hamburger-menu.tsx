import React from 'react';
import { ProfileType } from '../../types/user.types';

interface HamburgerMenuProps {
  profileType: ProfileType;
  onSelect?: (item: string) => void;
}

const commonItems = ['Profile', 'Settings', 'Help & Support', 'Logout'];

const extraByProfile: Record<ProfileType, string[]> = {
  athlete: ['Training Plan'],
  coach: ['Team Management', 'Assign Sessions'],
  health: ['Wellness Programs']
};

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ profileType, onSelect }) => {
  const items = [...commonItems, ...extraByProfile[profileType]];
  return (
    <div className="w-64 bg-white rounded-xl shadow p-4 space-y-2">
      {items.map((item) => (
        <button
          key={item}
          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-800"
          onClick={() => onSelect?.(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default HamburgerMenu;
