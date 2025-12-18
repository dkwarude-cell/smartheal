import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { 
  HardDrive, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  ChevronRight,
  Loader2
} from 'lucide-react';

export function EnhancedDemo() {
  const [currentStep, setCurrentStep] = useState(1); // Start from step 1 (scanning)
  const [selectedDevice, setSelectedDevice] = useState('');
  const [confirmationText, setConfirmationText] = useState('');
  const [isWiping, setIsWiping] = useState(false);
  const [wipingProgress, setWipingProgress] = useState(0);
  const [wipingPass, setWipingPass] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const steps = [
    'Platform Selection',
    'Device Scan',
    'Device Selection', 
    'Final Confirmation',
    'Wiping Process',
    'Success',
    'Certificate'
  ];

  const devices = [
    {
      id: 'ssd-samsung',
      type: 'SSD',
      name: 'Samsung 980 Pro NVMe SSD',
      size: '512 GB',
      icon: HardDrive
    },
    {
      id: 'hdd-seagate',
      type: 'HDD',
      name: 'Seagate Barracuda HDD',
      size: '2 TB',
      icon: HardDrive
    },
    {
      id: 'usb-kingston',
      type: 'USB',
      name: 'Kingston DataTraveler USB',
      size: '32 GB',
      icon: HardDrive,
      disabled: true,
      note: 'Boot Device - Not Wipable'
    }
  ];

  // Auto-progress from scanning step
  useEffect(() => {
    if (currentStep === 1) {
      const timer = setTimeout(() => {
        setCurrentStep(2);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setCurrentStep(3);
  };

  const handleConfirmWipe = () => {
    if (confirmationText === 'ERASE') {
      setCurrentStep(4);
      setIsWiping(true);
      simulateWipe();
    }
  };

  const simulateWipe = () => {
    let progress = 0;
    let pass = 1;
    
    const interval = setInterval(() => {
      progress += Math.random() * 8 + 2;
      
      if (progress >= 100) {
        if (pass < 3) {
          pass++;
          setWipingPass(pass);
          progress = 0;
        } else {
          clearInterval(interval);
          setIsWiping(false);
          setCurrentStep(5);
        }
      }
      
      setWipingProgress(Math.min(progress, 100));
    }, 150);
  };

  const handleGenerateCertificate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep(6);
    }, 2000);
  };

  const resetDemo = () => {
    setCurrentStep(1);
    setSelectedDevice('');
    setConfirmationText('');
    setIsWiping(false);
    setWipingProgress(0);
    setWipingPass(1);
    setIsGenerating(false);
  };

  const selectedDeviceData = devices.find(d => d.id === selectedDevice);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Demo Header with Enhanced Stepper */}
      <div className="bg-gradient-to-r from-[#0A2540] to-[#1a365d] text-white p-6">
        <h3 className="text-xl font-semibold mb-2">Interactive SecurePurge Demo</h3>
        <p className="text-blue-100 mb-6">Experience the complete data wiping process</p>
        
        {/* Enhanced Progress Steps */}
        <div className="flex items-center justify-between text-sm">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-[#00D499] text-white scale-110' 
                  : index === currentStep 
                    ? 'bg-[#00D499] text-white animate-pulse scale-110' 
                    : 'bg-blue-700 text-blue-200'
              }`}>
                {index < currentStep ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
                {index === currentStep && (
                  <div className="absolute inset-0 bg-[#00D499] rounded-full animate-ping opacity-30"></div>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 transition-all duration-500 ${
                  index < currentStep ? 'bg-[#00D499]' : 'bg-blue-700'
                }`}>
                  {index < currentStep && (
                    <div className="h-full bg-[#00D499] animate-pulse"></div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className="p-8 min-h-96">
        {currentStep === 1 && (
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4">Scanning for Storage Devices...</h4>
            <div className="max-w-md mx-auto">
              <div className="relative mb-6">
                <Progress value={100} className="h-3" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <p>Detecting connected storage devices</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-fade-in">
            <h4 className="text-xl font-semibold mb-4">Select Device to Wipe</h4>
            <p className="text-gray-600 mb-8">Choose the storage device you want to securely erase</p>
            
            <div className="space-y-4 max-w-2xl mx-auto">
              {devices.map((device, index) => (
                <Card 
                  key={device.id}
                  className={`cursor-pointer transition-all duration-300 transform ${
                    device.disabled 
                      ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                      : selectedDevice === device.id 
                        ? 'border-[#00D499] bg-green-50 scale-102 shadow-lg shadow-[#00D499]/20' 
                        : 'hover:shadow-lg hover:border-gray-300 hover:scale-101'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                  onClick={() => !device.disabled && handleDeviceSelect(device.id)}
                >
                  <CardContent className="p-6 flex items-center space-x-4">
                    <device.icon className="w-10 h-10 text-[#0A2540]" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <Badge variant={device.type === 'SSD' ? 'default' : 'secondary'}>
                          {device.type}
                        </Badge>
                        <h5 className="font-semibold">{device.name}</h5>
                      </div>
                      <p className="text-sm text-gray-600">{device.size}</p>
                      {device.note && (
                        <p className="text-xs text-orange-600 mt-1">{device.note}</p>
                      )}
                    </div>
                    {selectedDevice === device.id && (
                      <CheckCircle className="w-8 h-8 text-[#00D499] animate-bounce" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="max-w-lg mx-auto animate-fade-in">
            <h4 className="text-xl font-semibold mb-6 text-center">Final Confirmation</h4>
            
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
              <div className="flex items-center mb-3">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                <h5 className="font-semibold text-red-700">Critical Warning</h5>
              </div>
              <p className="text-red-600">
                This process is permanent and cannot be undone. All data will be destroyed completely.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h5 className="font-semibold mb-3 text-[#0A2540]">Device Details</h5>
              <div className="space-y-2 text-sm">
                <p><strong>Device:</strong> {selectedDeviceData?.name}</p>
                <p><strong>Size:</strong> {selectedDeviceData?.size}</p>
                <p><strong>Method:</strong> NIST 800-88 Purge (Recommended for SSD)</p>
                <p><strong>Passes:</strong> 3-pass secure overwrite</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium">
                Type "ERASE" to confirm deletion:
              </label>
              <Input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value.toUpperCase())}
                placeholder="ERASE"
                className="text-center text-lg font-mono tracking-wider"
              />
              <Button
                onClick={handleConfirmWipe}
                disabled={confirmationText !== 'ERASE'}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {confirmationText === 'ERASE' ? 'Confirm & Wipe' : 'Type ERASE to Continue'}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-center max-w-lg mx-auto">
            <h4 className="text-xl font-semibold mb-6">Secure Wipe in Progress</h4>
            
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-lg">Pass {wipingPass}/3</span>
                <span className="font-mono text-lg">{Math.round(wipingProgress)}%</span>
              </div>
              
              <div className="relative mb-4">
                <Progress value={wipingProgress} className="h-4" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-pulse"></div>
              </div>
              
              <p className="text-sm font-medium text-gray-700">
                {wipingPass === 1 && 'Overwriting with cryptographically secure random data...'}
                {wipingPass === 2 && 'Overwriting with binary complement patterns...'}
                {wipingPass === 3 && 'Final verification and secure erasure confirmation...'}
              </p>
            </div>
            
            <div className="space-y-3 bg-gray-50 p-6 rounded-xl">
              {[1, 2, 3].map((pass) => (
                <div key={pass} className={`flex items-center text-sm transition-all duration-300 ${
                  wipingPass > pass ? 'text-green-700' : wipingPass === pass ? 'text-blue-700' : 'text-gray-400'
                }`}>
                  <CheckCircle className={`w-5 h-5 mr-3 transition-colors ${
                    wipingPass > pass ? 'text-green-500' : wipingPass === pass ? 'text-blue-500 animate-pulse' : 'text-gray-300'
                  }`} />
                  <span>Pass {pass}: {pass === 1 ? 'Random data overwrite' : pass === 2 ? 'Complement overwrite' : 'Verification'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="text-center max-w-lg mx-auto animate-fade-in">
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-[#00D499] animate-bounce" />
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-green-700">Wipe Complete!</h4>
              <p className="text-gray-600 text-lg">
                Your {selectedDeviceData?.name} has been securely wiped according to the NIST 800-88 standard.
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h5 className="font-semibold text-green-800 mb-3">Wipe Summary</h5>
              <div className="text-sm text-green-700 space-y-1">
                <p>✓ 3-pass secure overwrite completed</p>
                <p>✓ All data sectors verified as erased</p>
                <p>✓ Hidden areas and bad sectors cleaned</p>
                <p>✓ Ready for certificate generation</p>
              </div>
            </div>
            
            <Button
              onClick={handleGenerateCertificate}
              disabled={isGenerating}
              className="bg-[#00D499] hover:bg-[#00c085] text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-200"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate & View Certificate'
              )}
            </Button>
          </div>
        )}

        {currentStep === 6 && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h4 className="text-xl font-semibold mb-6 text-center">SecurePurge Wipe Certificate</h4>
            
            {/* Certificate Preview */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8 mb-8 shadow-inner">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#0A2540] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#00D499]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0A2540] mb-3">SecurePurge Wipe Certificate</h3>
                <Badge variant="outline" className="text-[#00D499] border-[#00D499] bg-green-50">
                  Digitally Signed & Verified
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h5 className="font-semibold mb-4 text-gray-800">Device Information</h5>
                  <div className="space-y-2">
                    <p><strong>Model:</strong> {selectedDeviceData?.name}</p>
                    <p><strong>Serial Number:</strong> WD-WX12A8C5D849</p>
                    <p><strong>Capacity:</strong> {selectedDeviceData?.size}</p>
                    <p><strong>Interface:</strong> SATA 6.0 Gb/s</p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold mb-4 text-gray-800">Wipe Details</h5>
                  <div className="space-y-2">
                    <p><strong>Method:</strong> NIST 800-88 Purge</p>
                    <p><strong>Standard:</strong> DoD 5220.22-M</p>
                    <p><strong>Timestamp:</strong> {new Date().toLocaleString()}</p>
                    <p><strong>Duration:</strong> 2min 34sec</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h5 className="font-semibold mb-3 text-gray-800">Cryptographic Verification</h5>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-mono break-all text-gray-600">
                    SHA-256: a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-[#0A2540] hover:bg-[#1a365d] text-white px-8 py-3 text-lg font-semibold rounded-full"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF Certificate
              </Button>
              <Button
                onClick={resetDemo}
                variant="outline"
                className="border-[#00D499] text-[#00D499] hover:bg-[#00D499] hover:text-white px-8 py-3 text-lg font-semibold rounded-full"
              >
                Try Demo Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Custom CSS for animations
const styles = `
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

.scale-101 {
  transform: scale(1.01);
}

.scale-102 {
  transform: scale(1.02);
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}