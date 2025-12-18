import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Device {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'connecting';
  batteryLevel?: number;
  lastConnected?: Date;
}

interface DeviceContextType {
  device: Device | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectDevice: (deviceId: string) => Promise<void>;
  disconnectDevice: () => Promise<void>;
  updateDeviceStatus: (status: Device['status']) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [device, setDevice] = useState<Device | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectDevice = async (deviceId: string) => {
    setIsConnecting(true);
    try {
      // Simulate device connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newDevice: Device = {
        id: deviceId,
        name: 'SmartHeal ITT Device',
        status: 'connected',
        batteryLevel: 85,
        lastConnected: new Date(),
      };
      
      setDevice(newDevice);
      await AsyncStorage.setItem('@device', JSON.stringify(newDevice));
    } catch (error) {
      console.error('Error connecting device:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectDevice = async () => {
    setDevice(null);
    await AsyncStorage.removeItem('@device');
  };

  const updateDeviceStatus = (status: Device['status']) => {
    if (device) {
      setDevice({ ...device, status });
    }
  };

  return (
    <DeviceContext.Provider
      value={{
        device,
        isConnected: device?.status === 'connected',
        isConnecting,
        connectDevice,
        disconnectDevice,
        updateDeviceStatus,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};
