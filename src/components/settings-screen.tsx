import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { BluetoothSettings } from './bluetooth-settings';
import { 
  ArrowLeft, 
  Bell, 
  Moon, 
  Volume2, 
  Vibrate, 
  Globe, 
  Shield, 
  Database,
  Smartphone,
  Wifi,
  Bluetooth,
  Battery,
  Download,
  Info,
  HelpCircle,
  Mail,
  MessageSquare,
  Star,
  ChevronRight
} from 'lucide-react';
import { Badge } from './ui/badge';

interface SettingsScreenProps {
  onBack: () => void;
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [autoConnect, setAutoConnect] = useState(true);
  const [dataSync, setDataSync] = useState(true);
  const [soundVolume, setSoundVolume] = useState([70]);
  const [language, setLanguage] = useState('en');
  const [showBluetoothSettings, setShowBluetoothSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 safe-top">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* App Settings */}
        <Card className="p-4">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-red-500" />
            <span>App Settings</span>
          </h2>

          <div className="space-y-4">
            {/* Dark Mode */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Moon className="w-5 h-5 text-gray-600" />
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-xs text-gray-500">Enable dark theme</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            {/* Language */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-600" />
                <div>
                  <Label>Language</Label>
                  <p className="text-xs text-gray-500">Select app language</p>
                </div>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-4">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Bell className="w-5 h-5 text-red-500" />
            <span>Notifications</span>
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-xs text-gray-500">Receive therapy reminders</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Volume2 className="w-5 h-5 text-gray-600" />
                <div>
                  <Label>Sound</Label>
                  <p className="text-xs text-gray-500">Notification sounds</p>
                </div>
              </div>
              <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
            </div>

            {soundEnabled && (
              <div className="pl-8 py-2">
                <Label className="text-sm mb-2 block">Sound Volume</Label>
                <Slider
                  value={soundVolume}
                  onValueChange={setSoundVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>{soundVolume[0]}%</span>
                  <span>100%</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Vibrate className="w-5 h-5 text-gray-600" />
                <div>
                  <Label>Vibration</Label>
                  <p className="text-xs text-gray-500">Haptic feedback</p>
                </div>
              </div>
              <Switch checked={vibrationEnabled} onCheckedChange={setVibrationEnabled} />
            </div>
          </div>
        </Card>

        {/* Connection Settings */}
        <Card className="p-4">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Bluetooth className="w-5 h-5 text-red-500" />
            <span>Connection</span>
          </h2>

          <div className="space-y-4">
            {/* Bluetooth Management */}
            <button
              onClick={() => setShowBluetoothSettings(!showBluetoothSettings)}
              className="w-full flex items-center justify-between py-3 px-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bluetooth className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <Label className="cursor-pointer">Bluetooth</Label>
                  <p className="text-xs text-gray-600">Manage device connections</p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showBluetoothSettings ? 'rotate-90' : ''}`} />
            </button>

            {/* Bluetooth Settings Panel */}
            {showBluetoothSettings && (
              <div className="pl-2 pr-2 pb-2 animate-fade-in">
                <BluetoothSettings />
              </div>
            )}

            <div className="flex items-center justify-between py-2">
              <div>
                <Label>Auto-Connect</Label>
                <p className="text-xs text-gray-500">Connect to device automatically</p>
              </div>
              <Switch checked={autoConnect} onCheckedChange={setAutoConnect} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Wifi className="w-5 h-5 text-gray-600" />
                <div>
                  <Label>Background Sync</Label>
                  <p className="text-xs text-gray-500">Sync data in background</p>
                </div>
              </div>
              <Switch checked={dataSync} onCheckedChange={setDataSync} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Battery className="w-5 h-5 text-gray-600" />
                <div>
                  <Label>Battery Optimization</Label>
                  <p className="text-xs text-gray-500">Optimize for battery life</p>
                </div>
              </div>
              <Badge variant="secondary">Enabled</Badge>
            </div>
          </div>
        </Card>

        {/* Data & Privacy */}
        <Card className="p-4">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-red-500" />
            <span>Data & Privacy</span>
          </h2>

          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-between h-auto py-3">
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <Label>Data Management</Label>
                  <p className="text-xs text-gray-500">Manage your therapy data</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">320 MB</span>
            </Button>

            <Button variant="ghost" className="w-full justify-between h-auto py-3">
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <Label>Export Data</Label>
                  <p className="text-xs text-gray-500">Download your health data</p>
                </div>
              </div>
            </Button>

            <Button variant="ghost" className="w-full justify-between h-auto py-3">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <Label>Privacy Policy</Label>
                  <p className="text-xs text-gray-500">Review our privacy policy</p>
                </div>
              </div>
            </Button>
          </div>
        </Card>

        {/* About & Support */}
        <Card className="p-4">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Info className="w-5 h-5 text-red-500" />
            <span>About & Support</span>
          </h2>

          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-between h-auto py-3">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <Label>Help Center</Label>
                  <p className="text-xs text-gray-500">FAQs and tutorials</p>
                </div>
              </div>
            </Button>

            <Button variant="ghost" className="w-full justify-between h-auto py-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <Label>Contact Support</Label>
                  <p className="text-xs text-gray-500">support@smartheal.com</p>
                </div>
              </div>
            </Button>

            <Button variant="ghost" className="w-full justify-between h-auto py-3">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <Label>Send Feedback</Label>
                  <p className="text-xs text-gray-500">Help us improve</p>
                </div>
              </div>
            </Button>

            <Button variant="ghost" className="w-full justify-between h-auto py-3">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <Label>Rate App</Label>
                  <p className="text-xs text-gray-500">Share your experience</p>
                </div>
              </div>
            </Button>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Version</span>
                <span className="font-medium">2.4.1</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-500">Device Firmware</span>
                <span className="font-medium">1.8.2</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Reset Options */}
        <Card className="p-4 border-red-200">
          <h2 className="font-semibold text-red-600 mb-4">Advanced</h2>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
              Clear Cache
            </Button>
            
            <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
              Reset App Settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
