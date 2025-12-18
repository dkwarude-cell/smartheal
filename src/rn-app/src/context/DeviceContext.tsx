/**
 * Device Context
 * SmartHeal App - Bluetooth Device State Management
 */

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DeviceInfo } from '../types/user.types';

interface DeviceContextType {
  device: DeviceInfo | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectDevice: (device: DeviceInfo) => Promise<void>;
  disconnectDevice: () => Promise<void>;
  updateDeviceStatus: (updates: Partial<DeviceInfo>) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const [device, setDevice] = useState<DeviceInfo | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectDevice = async (deviceInfo: DeviceInfo) => {
    try {
      setIsConnecting(true);
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDevice({
        ...deviceInfo,
        isConnected: true,
        lastConnected: new Date().toISOString(),
      });
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting device:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectDevice = async () => {
    try {
      if (device) {
        setDevice({
          ...device,
          isConnected: false,
        });
      }
      setIsConnected(false);
    } catch (error) {
      console.error('Error disconnecting device:', error);
      throw error;
    }
  };

  const updateDeviceStatus = (updates: Partial<DeviceInfo>) => {
    if (device) {
      setDevice({
        ...device,
        ...updates,
      });
    }
  };

  const value: DeviceContextType = {
    device,
    isConnected,
    isConnecting,
    connectDevice,
    disconnectDevice,
    updateDeviceStatus,
  };

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
};

export const useDevice = (): DeviceContextType => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};
