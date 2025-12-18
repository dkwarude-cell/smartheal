import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from './ui/button';
import { Camera, FlipHorizontal, Zap, Grid, X } from 'lucide-react';

interface CameraScreenProps {
  onNavigate: (screen: string) => void;
  onCapture: (imageData: string) => void;
}

export function CameraScreen({ onNavigate, onCapture }: CameraScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cameraState, setCameraState] = useState<'loading' | 'ready' | 'denied' | 'error'>('loading');
  const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);

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
      setPermissionRequested(true);
      
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
    if (permissionRequested && cameraState !== 'denied') {
      requestCameraPermission();
    }
  }, [facingMode, requestCameraPermission, permissionRequested, cameraState]);

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

  const openFileSelector = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

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

  const useDemoImage = useCallback(() => {
    // Demo image data (base64 encoded 1x1 pixel)
    const demoImageData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
    onCapture(demoImageData);
  }, [onCapture]);

  return (
    <div className="h-full bg-black relative overflow-hidden">
      {/* Hidden file input for manual image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Semi-transparent instruction bar at top */}
      <div className="absolute top-4 left-4 right-4 z-30">
        <div className="bg-black/70 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
          <p className="text-white text-sm text-center leading-relaxed">
            Frame the area you want to analyze for therapy recommendations. Ensure good lighting for best results.
          </p>
        </div>
      </div>

      {/* Close button */}
      <div className="absolute top-4 left-4 z-40">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('dashboard')}
          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
          style={{ minHeight: '48px', minWidth: '48px' }}
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Live Camera Viewfinder - fills the screen from header to nav */}
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
            
            {/* Grid overlay */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="border border-white/30" />
                  ))}
                </div>
              </div>
            )}

            {/* Focus guide square in center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-24 h-24 border-2 border-white/50 rounded-lg">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-400"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-400"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-400"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-400"></div>
              </div>
            </div>

            {/* Camera Controls */}
            {/* Top-left: Flash toggle */}
            <div className="absolute top-20 left-6 z-20">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFlashOn(!isFlashOn)}
                className={`p-2 rounded-full ${isFlashOn ? 'bg-yellow-500' : 'bg-black/50'} text-white hover:bg-black/70`}
                style={{ minHeight: '48px', minWidth: '48px' }}
              >
                <Zap className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Top-right: Camera flip */}
            <div className="absolute top-20 right-6 z-20">
              <Button
                variant="ghost"
                size="sm"
                onClick={switchCamera}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                style={{ minHeight: '48px', minWidth: '48px' }}
              >
                <FlipHorizontal className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Bottom-left: Gallery access */}
            <div className="absolute bottom-32 left-6 z-20">
              <Button
                variant="ghost"
                size="sm"
                onClick={openFileSelector}
                className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70"
                style={{ minHeight: '48px', minWidth: '48px' }}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Bottom-right: Grid toggle */}
            <div className="absolute bottom-32 right-6 z-20">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 rounded-lg ${showGrid ? 'bg-blue-500' : 'bg-black/50'} text-white hover:bg-black/70`}
                style={{ minHeight: '48px', minWidth: '48px' }}
              >
                <Grid className="w-4 h-4" />
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
                Smart Heal needs camera access to analyze your therapy area and provide personalized recommendations.
              </p>
              <div className="space-y-3 pt-4">
                <Button
                  onClick={requestCameraPermission}
                  className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-3 font-medium"
                >
                  Enable Camera Access
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={openFileSelector}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 rounded-full py-3"
                  >
                    Upload Photo
                  </Button>
                  <Button
                    onClick={useDemoImage}
                    variant="outline"
                    className="border-blue-400/50 text-blue-300 hover:bg-blue-500/10 rounded-full py-3"
                  >
                    Try Demo
                  </Button>
                </div>
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
              <p className="text-white/70 text-sm">Please wait while we initialize the camera...</p>
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
                Camera access is not available on this device. You can still upload a photo for analysis.
              </p>
              <div className="space-y-3 pt-4">
                <Button
                  onClick={openFileSelector}
                  className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-3 font-medium"
                >
                  Select Photo from Gallery
                </Button>
                <Button
                  onClick={requestCameraPermission}
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 rounded-full py-3"
                >
                  Try Camera Again
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Large White Circular Shutter Button - positioned just above bottom nav */}
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
              ? 'bg-red-600 scale-75' 
              : 'bg-red-500 hover:bg-red-600'
          }`} />
        </Button>
      </div>
    </div>
  );
}