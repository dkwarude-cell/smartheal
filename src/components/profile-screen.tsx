import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Smartphone,
  Heart,
  Calendar,
  Edit3,
  ChevronRight,
  Battery,
  Clock,
  Wifi
} from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [editMode, setEditMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  // Static user data - prevents loading glitches
  const userInfo = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    age: '28 years',
    joinDate: 'Member since Oct 2023',
    totalSessions: 156,
    membershipTier: 'Premium'
  };

  // Static device data - ensures reliable display
  const deviceInfo = {
    model: 'ITT Therapeutic Device Pro',
    serialNumber: 'ITT-2023-8847',
    batteryLevel: '85%',
    lastSync: '2 min ago',
    firmwareVersion: 'v2.1.4',
    connectionStatus: 'Connected'
  };

  const therapyPreferences = [
    { label: 'Preferred Intensity', value: 'Medium', editable: true },
    { label: 'Default Duration', value: '15 minutes', editable: true },
    { label: 'Therapy Focus', value: 'Pain Relief', editable: true },
    { label: 'Auto-Start Sessions', value: 'Enabled', editable: false }
  ];

  const settingsOptions = [
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Session reminders and updates',
      action: () => {},
      rightElement: (
        <Switch
          checked={notifications}
          onCheckedChange={setNotifications}
        />
      )
    },
    {
      icon: Shield,
      title: 'Privacy & Data',
      description: 'Control your data sharing preferences',
      action: () => {},
      rightElement: <ChevronRight className="w-5 h-5 text-gray-400" />
    },
    {
      icon: Smartphone,
      title: 'Device Settings',
      description: 'Manage connected device preferences',
      action: () => onNavigate('settings'),
      rightElement: <ChevronRight className="w-5 h-5 text-gray-400" />
    },
    {
      icon: Heart,
      title: 'Health Integration',
      description: 'Connect with Google Fit and Apple Health',
      action: () => {},
      rightElement: <ChevronRight className="w-5 h-5 text-gray-400" />
    }
  ];

  return (
    <div className="min-h-full p-4 space-y-4 pb-8">
      {/* Profile Header - Enhanced with Proper Loading States */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium dark:text-white">Profile</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditMode(!editMode)}
            className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full px-4 font-medium"
          >
            <Edit3 className="w-4 h-4 mr-1" />
            {editMode ? 'Save' : 'Edit Profile'}
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            {editMode ? (
              <div className="space-y-3">
                <input 
                  defaultValue={userInfo.name} 
                  className="text-lg font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 outline-none focus:border-blue-500 dark:text-white w-full"
                  placeholder="Full Name"
                />
                <input 
                  defaultValue={userInfo.email} 
                  type="email"
                  className="text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 outline-none focus:border-blue-500 text-gray-600 dark:text-gray-300 w-full"
                  placeholder="Email Address"
                />
              </div>
            ) : (
              <div>
                <h4 className="text-lg font-medium dark:text-white">{userInfo.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{userInfo.email}</p>
                <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{userInfo.age}</span>
                  </span>
                  <span>•</span>
                  <span>{userInfo.joinDate}</span>
                  <span>•</span>
                  <span className="text-blue-600 dark:text-blue-400">{userInfo.membershipTier}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Connected Device - Enhanced with Better Status */}
      <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium flex items-center dark:text-white">
            <Wifi className="w-4 h-4 mr-2 text-green-600" />
            Connected Device
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-medium">
              {deviceInfo.connectionStatus}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-12 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white dark:text-black text-xs font-medium">ITT</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium dark:text-white">{deviceInfo.model}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">SN: {deviceInfo.serialNumber}</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                <Battery className="w-3 h-3 text-green-600" />
                <span>{deviceInfo.batteryLevel}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                <Clock className="w-3 h-3 text-blue-600" />
                <span>{deviceInfo.lastSync}</span>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                <span>v{deviceInfo.firmwareVersion}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Therapy Preferences - Enhanced */}
      <Card className="p-3 flex-1 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm flex items-center dark:text-white">
            <Settings className="w-4 h-4 mr-1 text-purple-600" />
            Therapy Preferences
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('settings')}
            className="text-xs text-blue-600 dark:text-blue-400 dark:hover:bg-gray-700"
          >
            Customize
          </Button>
        </div>
        
        <div className="space-y-3">
          {therapyPreferences.slice(0, 4).map((pref, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{pref.label}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-sm dark:text-white">{pref.value}</span>
                {pref.editable && <ChevronRight className="w-3 h-3 text-gray-400" />}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Settings Row */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="p-3 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm dark:text-white">Notifications</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">Push alerts</p>
            </div>
            <Switch
              checked={true}
              onCheckedChange={() => {}}
            />
          </div>
        </Card>
        
        <Card className="p-3 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-blue-800 dark:text-blue-300">Data Sharing</h4>
              <p className="text-xs text-blue-700 dark:text-blue-400">Help improve AI</p>
            </div>
            <Switch
              checked={dataSharing}
              onCheckedChange={setDataSharing}
            />
          </div>
        </Card>
      </div>

      {/* Account Management */}
      <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-sm font-medium dark:text-white mb-3">Account Management</h3>
        <div className="space-y-3">
          <Button 
            variant="outline"
            className="w-full justify-start border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Settings className="w-4 h-4 mr-2" />
            Privacy Settings
          </Button>
          <Button 
            variant="outline"
            className="w-full justify-start border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Shield className="w-4 h-4 mr-2" />
            Security
          </Button>
          <Button 
            variant="outline"
            className="w-full justify-start border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notification Preferences
          </Button>
        </div>
      </Card>

      {/* Support & Help */}
      <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-sm font-medium dark:text-white mb-3">Support & Help</h3>
        <div className="space-y-3">
          <Button 
            variant="ghost"
            className="w-full justify-start text-gray-700 dark:text-gray-300 rounded-lg py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Help Center
          </Button>
          <Button 
            variant="ghost"
            className="w-full justify-start text-gray-700 dark:text-gray-300 rounded-lg py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Contact Support
          </Button>
          <Button 
            variant="ghost"
            className="w-full justify-start text-gray-700 dark:text-gray-300 rounded-lg py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Device Manual
          </Button>
        </div>
      </Card>

      {/* Account Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline"
          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Export Data
        </Button>
        
        <Button 
          variant="outline"
          className="border-red-300 dark:border-red-600 text-red-700 dark:text-red-400 rounded-full py-3 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}