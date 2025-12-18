import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { X, Laptop, Smartphone } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDemo: () => void;
}

export function DemoModal({ isOpen, onClose, onStartDemo }: DemoModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<'usb' | 'android' | null>(null);

  const handlePlatformSelect = (platform: 'usb' | 'android') => {
    if (platform === 'usb') {
      setSelectedPlatform(platform);
      setTimeout(() => {
        onClose();
        onStartDemo();
      }, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-2xl border-0 shadow-2xl">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-[#0A2540]">
              Experience SecurePurge
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-gray-600 text-center">
            Select how you want to run SecurePurge
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          <Card 
            className={`cursor-pointer transition-all duration-300 border-2 hover:shadow-lg hover:shadow-[#00D499]/20 ${
              selectedPlatform === 'usb' 
                ? 'border-[#00D499] bg-green-50 shadow-lg shadow-[#00D499]/20 scale-105' 
                : 'border-gray-200 hover:border-[#00D499]'
            }`}
            onClick={() => handlePlatformSelect('usb')}
          >
            <CardContent className="p-6 text-center">
              <div className="relative">
                <Laptop className="w-12 h-12 mx-auto mb-3 text-[#0A2540]" />
                {selectedPlatform === 'usb' && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#00D499] rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              <h3 className="font-semibold mb-2">Bootable USB</h3>
              <p className="text-sm text-gray-600">For PC & Mac</p>
              {selectedPlatform === 'usb' && (
                <Badge className="mt-2 bg-[#00D499] text-white">Selected</Badge>
              )}
            </CardContent>
          </Card>
          
          <Card className="cursor-not-allowed opacity-60 border-2 border-gray-200 bg-gray-50">
            <CardContent className="p-6 text-center">
              <Smartphone className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <h3 className="font-semibold mb-2 text-gray-600">Android App</h3>
              <p className="text-sm text-gray-500">For mobile devices</p>
              <Badge variant="secondary" className="mt-2">Coming Soon</Badge>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center py-2">
          <p className="text-xs text-gray-500">
            Choose the Bootable USB option to continue with the demo
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}