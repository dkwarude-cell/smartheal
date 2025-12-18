import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from './ui/button';
import { Camera, X, RotateCcw } from 'lucide-react';

interface AICameraScreenProps {
  onNavigate: (screen: string) => void;
  onCapture: (imageData: string) => void;
}

export function AICameraScreen({ onNavigate, onCapture }: AICameraScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cameraState, setCameraState] = useState<'loading' | 'ready' | 'denied' | 'error'>('loading');
  const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [isCapturing, setIsCapturing] = useState(false);

  // Initialize camera on component mount
  useEffect(() => {
    requestCameraPermission();
    return () => {
      // Cleanup camera stream when component unmounts
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const requestCameraPermission = useCallback(async () => {
    try {
      setCameraState('loading');
      
      // Stop existing stream
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode,
          width: { ideal: 1080 },
          height: { ideal: 1920 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setCurrentStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraState('ready');
      }
    } catch (error) {
      console.error('Camera access error:', error);
      if (error instanceof Error && error.name === 'NotAllowedError') {
        setCameraState('denied');
      } else {
        setCameraState('error');
      }
    }
  }, [facingMode, currentStream]);

  const switchCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  }, []);

  // Re-request camera when facing mode changes
  useEffect(() => {
    if (cameraState !== 'denied') {
      requestCameraPermission();
    }
  }, [facingMode, requestCameraPermission, cameraState]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || isCapturing) return;

    setIsCapturing(true);

    // Add capture animation
    const video = videoRef.current;
    video.style.filter = 'brightness(1.5)';
    setTimeout(() => {
      video.style.filter = 'none';
    }, 150);

    try {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(imageData);
      }
    } catch (error) {
      console.error('Capture error:', error);
    } finally {
      setTimeout(() => setIsCapturing(false), 200);
    }
  }, [isCapturing, onCapture]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        if (imageData) {
          onCapture(imageData);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onCapture]);

  // Trigger file upload when coming from upload route
  useEffect(() => {
    const triggerUpload = () => {
      fileInputRef.current?.click();
    };
    
    // Small delay to ensure component is mounted
    const timer = setTimeout(triggerUpload, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full bg-black relative overflow-hidden">
      {/* Hidden file input for gallery upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Minimal instruction bar at top */}
      <div className="absolute top-4 left-4 right-4 z-30">
        <div className="bg-black/70 backdrop-blur-sm border border-white/20 rounded-2xl p-3">
          <p className="text-white text-sm text-center">
            Take a clear photo for AI analysis
          </p>
        </div>
      </div>

      {/* Close button */}
      <div className="absolute top-4 left-4 z-40">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('aiImage')}
          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
          style={{ minHeight: '48px', minWidth: '48px' }}
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Live Camera Viewfinder */}
      <div className="absolute inset-0 z-10">
        {cameraState === 'ready' && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ 
                transform: facingMode === 'user' ? 'scaleX(-1)' : 'none'
              }}
            />

            {/* Simple focus guide */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-32 h-32 border-2 border-white/60 rounded-2xl">
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-3 border-l-3 border-blue-400 rounded-tl-lg"></div>
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-3 border-r-3 border-blue-400 rounded-tr-lg"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-3 border-l-3 border-blue-400 rounded-bl-lg"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-3 border-r-3 border-blue-400 rounded-br-lg"></div>
              </div>
            </div>

            {/* Camera flip button */}
            <div className="absolute top-20 right-6 z-20">
              <Button
                variant="ghost"
                size="sm"
                onClick={switchCamera}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                style={{ minHeight: '48px', minWidth: '48px' }}
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </>
        )}

        {/* Permission Denied State */}
        {cameraState === 'denied' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 p-6">
            <div className="text-center text-white space-y-4 max-w-sm">
              <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                <Camera className="w-10 h-10 text-red-400" />
              </div>
              <h3 className="text-xl font-medium">Camera Access Needed</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Enable camera access to take photos for AI analysis.
              </p>
              <div className="space-y-3 pt-4">
                <Button
                  onClick={requestCameraPermission}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 font-medium"
                >
                  Enable Camera
                </Button>
                <Button
                  onClick={() => onNavigate('aiImage')}
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 rounded-full py-3"
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {cameraState === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
            <div className="text-center text-white space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                <Camera className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-medium">Starting Camera</h3>
              <p className="text-white/70 text-sm">Please wait...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {cameraState === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 p-6">
            <div className="text-center text-white space-y-4 max-w-sm">
              <div className="w-20 h-20 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Camera className="w-10 h-10 text-yellow-400" />
              </div>
              <h3 className="text-xl font-medium">Camera Not Available</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Camera is not available on this device.
              </p>
              <Button
                onClick={() => onNavigate('aiImage')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 font-medium"
              >
                Go Back
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Large Circular Shutter Button */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-40">
        <Button
          onClick={capturePhoto}
          disabled={isCapturing || cameraState !== 'ready'}
          className={`w-20 h-20 rounded-full bg-white border-4 border-gray-300 hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl ${
            isCapturing ? 'scale-95' : 'hover:scale-105 active:scale-95'
          }`}
          style={{ 
            minWidth: '80px', 
            minHeight: '80px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' 
          }}
        >
          <div className={`w-16 h-16 rounded-full transition-all duration-150 ${
            isCapturing 
              ? 'bg-blue-600 scale-75' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`} />
        </Button>
      </div>
    </div>
  );
}