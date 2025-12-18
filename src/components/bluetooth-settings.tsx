import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  Bluetooth, 
  BluetoothConnected, 
  BluetoothSearching,
  Loader2, 
  Check, 
  X,
  RefreshCcw,
  ChevronRight,
  Battery,
  Signal
} from 'lucide-react';
import { toast } from 'sonner';

interface BluetoothDevice {
  id: string;
  name: string;
  type: 'therapy' | 'sensor' | 'other';
  rssi: number;
  battery?: number;
  connected: boolean;
  paired: boolean;
}

interface BluetoothSettingsProps {
  onDeviceConnect?: (device: BluetoothDevice) => void;
}

export function BluetoothSettings({ onDeviceConnect }: BluetoothSettingsProps) {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [availableDevices, setAvailableDevices] = useState<BluetoothDevice[]>([]);
  const [pairedDevices, setPairedDevices] = useState<BluetoothDevice[]>([
    {
      id: 'smartheal-001',
      name: 'SmartHeal ITT-2000',
      type: 'therapy',
      rssi: -45,
      battery: 87,
      connected: true,
      paired: true
    }
  ]);
  const [connectingDeviceId, setConnectingDeviceId] = useState<string | null>(null);

  const mockDevices: BluetoothDevice[] = [
    {
      id: 'smartheal-002',
      name: 'SmartHeal ITT-Pro',
      type: 'therapy',
      rssi: -52,
      battery: 95,
      connected: false,
      paired: false
    },
    {
      id: 'smartheal-sensor-01',
      name: 'SmartHeal Sensor',
      type: 'sensor',
      rssi: -68,
      battery: 72,
      connected: false,
      paired: false
    },
    {
      id: 'runverve-watch',
      name: 'Runverve Watch',
      type: 'other',
      rssi: -75,
      connected: false,
      paired: false
    }
  ];

  const handleToggleBluetooth = (enabled: boolean) => {
    setBluetoothEnabled(enabled);
    if (!enabled) {
      setIsScanning(false);
      setAvailableDevices([]);
      toast.info('Bluetooth disabled');
    } else {
      toast.success('Bluetooth enabled');
    }
  };

  const handleScanDevices = async () => {
    if (!bluetoothEnabled) {
      toast.error('Please enable Bluetooth first');
      return;
    }

    setIsScanning(true);
    setAvailableDevices([]);

    // Simulate scanning
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add mock devices one by one
    for (let i = 0; i < mockDevices.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAvailableDevices(prev => [...prev, mockDevices[i]]);
    }

    setIsScanning(false);
    toast.success(`Found ${mockDevices.length} devices`);
  };

  const handleConnectDevice = async (device: BluetoothDevice) => {
    setConnectingDeviceId(device.id);

    // Simulate connection
    await new Promise(resolve => setTimeout(resolve, 2000));

    const connectedDevice = { ...device, connected: true, paired: true };
    
    setPairedDevices(prev => [...prev.filter(d => d.id !== device.id), connectedDevice]);
    setAvailableDevices(prev => prev.filter(d => d.id !== device.id));
    setConnectingDeviceId(null);
    
    toast.success(`Connected to ${device.name}`);
    
    if (onDeviceConnect) {
      onDeviceConnect(connectedDevice);
    }
  };

  const handleDisconnectDevice = async (device: BluetoothDevice) => {
    const disconnectedDevice = { ...device, connected: false };
    setPairedDevices(prev => 
      prev.map(d => d.id === device.id ? disconnectedDevice : d)
    );
    toast.info(`Disconnected from ${device.name}`);
  };

  const handleForgetDevice = (deviceId: string) => {
    setPairedDevices(prev => prev.filter(d => d.id !== deviceId));
    toast.info('Device removed');
  };

  const getSignalStrength = (rssi: number) => {
    if (rssi > -50) return { level: 'strong', bars: 3, color: 'text-green-600' };
    if (rssi > -70) return { level: 'medium', bars: 2, color: 'text-yellow-600' };
    return { level: 'weak', bars: 1, color: 'text-red-600' };
  };

  const getDeviceIcon = (type: string) => {
    return type === 'therapy' ? '🏥' : type === 'sensor' ? '📡' : '⌚';
  };

  return (
    <div className="space-y-6">
      {/* Bluetooth Toggle */}
      <Card className="smart-heal-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                bluetoothEnabled ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <Bluetooth className={`w-6 h-6 ${
                  bluetoothEnabled ? 'text-blue-600' : 'text-gray-400'
                }`} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Bluetooth</h3>
                <p className="text-sm text-gray-600">
                  {bluetoothEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <Switch
              checked={bluetoothEnabled}
              onCheckedChange={handleToggleBluetooth}
            />
          </div>
        </CardContent>
      </Card>

      {bluetoothEnabled && (
        <>
          {/* Paired Devices */}
          <Card className="smart-heal-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <BluetoothConnected className="w-5 h-5 text-blue-600" />
                  <span>Paired Devices</span>
                </span>
                <Badge variant="secondary">{pairedDevices.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pairedDevices.length === 0 ? (
                <div className="text-center py-8">
                  <BluetoothSearching className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No paired devices</p>
                  <p className="text-gray-400 text-xs mt-1">Scan to find devices</p>
                </div>
              ) : (
                pairedDevices.map(device => {
                  const signal = getSignalStrength(device.rssi);
                  
                  return (
                    <div
                      key={device.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="text-2xl">{getDeviceIcon(device.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{device.name}</h4>
                            {device.connected && (
                              <Badge className="bg-green-600 text-white text-xs">
                                Connected
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-3 mt-1">
                            {device.battery !== undefined && (
                              <div className="flex items-center space-x-1 text-xs text-gray-600">
                                <Battery className="w-3 h-3" />
                                <span>{device.battery}%</span>
                              </div>
                            )}
                            <div className={`flex items-center space-x-1 text-xs ${signal.color}`}>
                              <Signal className="w-3 h-3" />
                              <span>{signal.level}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {device.connected ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDisconnectDevice(device)}
                            className="text-xs"
                          >
                            Disconnect
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleConnectDevice(device)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                          >
                            Connect
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleForgetDevice(device.id)}
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Scan Controls */}
          <Card className="smart-heal-card">
            <CardContent className="pt-6">
              <Button
                onClick={handleScanDevices}
                disabled={isScanning}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Scan for Devices
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Available Devices */}
          {(isScanning || availableDevices.length > 0) && (
            <Card className="smart-heal-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BluetoothSearching className="w-5 h-5 text-blue-600" />
                  <span>Available Devices</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isScanning && availableDevices.length === 0 ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-3 animate-spin" />
                    <p className="text-gray-600 text-sm">Scanning for devices...</p>
                  </div>
                ) : (
                  availableDevices.map(device => {
                    const signal = getSignalStrength(device.rssi);
                    const isConnecting = connectingDeviceId === device.id;
                    
                    return (
                      <div
                        key={device.id}
                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="text-2xl">{getDeviceIcon(device.type)}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{device.name}</h4>
                            <div className="flex items-center space-x-3 mt-1">
                              <div className={`flex items-center space-x-1 text-xs ${signal.color}`}>
                                <Signal className="w-3 h-3" />
                                <span>{signal.level}</span>
                              </div>
                              {device.battery !== undefined && (
                                <div className="flex items-center space-x-1 text-xs text-gray-600">
                                  <Battery className="w-3 h-3" />
                                  <span>{device.battery}%</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleConnectDevice(device)}
                          disabled={isConnecting}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {isConnecting ? (
                            <>
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                              Pairing...
                            </>
                          ) : (
                            'Pair'
                          )}
                        </Button>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          )}

          {/* Bluetooth Info */}
          <Card className="smart-heal-card border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">ℹ️</span>
                  <p className="text-sm text-blue-800">
                    Keep devices within 10 meters for optimal connection
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">🔋</span>
                  <p className="text-sm text-blue-800">
                    Charge your SmartHeal device regularly for best performance
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">🔒</span>
                  <p className="text-sm text-blue-800">
                    All connections are encrypted and secure
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
