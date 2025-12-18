import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Zap, Thermometer, Vibrate, Activity } from 'lucide-react';

interface TherapySettingsScreenProps {
  onNavigate: (screen: string) => void;
}

export function TherapySettingsScreen({ onNavigate }: TherapySettingsScreenProps) {
  const [intensity, setIntensity] = useState([5]);
  const [duration, setDuration] = useState([15]);
  const [selectedModes, setSelectedModes] = useState(['ems', 'vibration']);
  const [autoMode, setAutoMode] = useState(true);

  const therapyModes = [
    {
      id: 'vibration',
      name: 'Vibration',
      icon: Vibrate,
      description: 'Gentle vibration therapy',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'heat',
      name: 'Heat',
      icon: Thermometer,
      description: 'Therapeutic heat treatment',
      color: 'bg-red-100 text-red-700'
    },
    {
      id: 'ems',
      name: 'EMS',
      icon: Zap,
      description: 'Electrical muscle stimulation',
      color: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 'tens',
      name: 'TENS',
      icon: Activity,
      description: 'Pain relief stimulation',
      color: 'bg-green-100 text-green-700'
    }
  ];

  const toggleMode = (modeId: string) => {
    setSelectedModes(prev => 
      prev.includes(modeId) 
        ? prev.filter(id => id !== modeId)
        : [...prev, modeId]
    );
  };

  const intensityLabels = ['Very Low', 'Low', 'Medium-Low', 'Medium', 'Medium-High', 'High', 'Very High'];

  return (
    <div className="min-h-full p-4 space-y-4 pb-8">
      {/* Intensity & Duration - Enhanced */}
      <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium flex items-center mb-3 dark:text-white">
              <Zap className="w-4 h-4 mr-2 text-yellow-600" />
              Intensity
            </h3>
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              max={6}
              min={0}
              step={1}
              className="w-full mb-3"
            />
            <Badge variant="secondary" className="text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
              {intensityLabels[intensity[0]]}
            </Badge>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3 dark:text-white">Duration</h3>
            <Slider
              value={duration}
              onValueChange={setDuration}
              max={30}
              min={5}
              step={5}
              className="w-full mb-3"
            />
            <Badge variant="secondary" className="text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              {duration[0]} min
            </Badge>
          </div>
        </div>
      </Card>

      {/* Therapy Modes - Enhanced Grid */}
      <Card className="p-4 space-y-4 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-base font-medium dark:text-white">Therapy Modes</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {therapyModes.map((mode) => (
            <div
              key={mode.id}
              className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedModes.includes(mode.id)
                  ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20 shadow-md'
                  : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700/50 hover:shadow-sm'
              }`}
              onClick={() => toggleMode(mode.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full ${mode.color} flex items-center justify-center shadow-sm dark:bg-opacity-20`}>
                  <mode.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">{mode.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{mode.description}</p>
                </div>
                {selectedModes.includes(mode.id) && (
                  <div className="w-2 h-2 bg-red-500 rounded-full ml-auto"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Advanced Settings */}
      <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-base font-medium dark:text-white mb-4">Advanced Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-white">Pulse Width</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">Adjust stimulation duration</p>
            </div>
            <div className="w-24">
              <Slider value={[250]} min={100} max={500} step={50} className="w-full" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-white">Frequency</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">Pulses per second</p>
            </div>
            <div className="w-24">
              <Slider value={[80]} min={1} max={150} step={1} className="w-full" />
            </div>
          </div>
        </div>
      </Card>

      {/* AI Auto Mode & Quick Presets - Combined */}
      <Card className="p-4 space-y-4 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium dark:text-white">AI Auto Mode</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">Optimize settings automatically</p>
          </div>
          <Switch checked={autoMode} onCheckedChange={setAutoMode} />
        </div>
        
        <div className="pt-2 border-t border-purple-200 dark:border-purple-700">
          <h4 className="text-sm font-medium mb-3 dark:text-white">Quick Presets</h4>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Button variant="outline" className="text-xs p-3 h-auto hover:bg-purple-100 dark:hover:bg-purple-900/30 border-purple-300 dark:border-purple-600">
              <Activity className="w-4 h-4 mr-1" />
              Recovery
            </Button>
            <Button variant="outline" className="text-xs p-3 h-auto hover:bg-purple-100 dark:hover:bg-purple-900/30 border-purple-300 dark:border-purple-600">
              <Thermometer className="w-4 h-4 mr-1" />
              Relax
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="text-xs p-3 h-auto hover:bg-purple-100 dark:hover:bg-purple-900/30 border-purple-300 dark:border-purple-600">
              <Zap className="w-4 h-4 mr-1" />
              Energy
            </Button>
            <Button variant="outline" className="text-xs p-3 h-auto hover:bg-purple-100 dark:hover:bg-purple-900/30 border-purple-300 dark:border-purple-600">
              <Vibrate className="w-4 h-4 mr-1" />
              Sleep
            </Button>
          </div>
        </div>
      </Card>

      {/* Session Schedule */}
      <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-base font-medium dark:text-white mb-3">Session Schedule</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm dark:text-white">Daily Reminder</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm dark:text-white">Auto-start Sessions</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm dark:text-white">Reminder Time</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">9:00 AM</p>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
              Change
            </Button>
          </div>
        </div>
      </Card>

      {/* Action Buttons - At Bottom of Content */}
      <div className="space-y-3 pt-6 mt-6">
        <Button 
          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-4 font-medium shadow-lg hover:shadow-red-200 transition-all"
          onClick={() => onNavigate('dashboard')}
        >
          Save & Start Session
        </Button>
        <Button 
          variant="outline"
          className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
          onClick={() => onNavigate('dashboard')}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}