import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Camera, X, RotateCcw, Check, Loader2, Zap, Target, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface TherapyCameraCaptureProps {
  onClose: () => void;
  onAnalysisComplete: (analysis: TherapyAnalysis) => void;
}

interface TherapyAnalysis {
  bodyPart: string;
  severity: 'low' | 'medium' | 'high';
  recommendedIntensity: number;
  duration: number;
  placement: string[];
  precautions: string[];
  confidence: number;
}

export function TherapyCameraCapture({ onClose, onAnalysisComplete }: TherapyCameraCaptureProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 1280, height: 720 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
        setShowFileUpload(false);
      }
    } catch (error: any) {
      console.error('Camera error:', error);
      
      let errorMessage = 'Camera access denied. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please allow camera permissions in your browser settings.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera found on this device.';
      } else if (error.name === 'NotReadableError') {
        errorMessage += 'Camera is already in use by another app.';
      } else {
        errorMessage += 'Unable to access camera.';
      }
      
      setCameraError(errorMessage);
      setShowFileUpload(true);
      toast.error('Camera not available', {
        description: 'You can upload a photo instead'
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCapturedImage(result);
        toast.success('Photo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const analyzeImage = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);

    // Simulate AI analysis (in production, this would call Vertex AI API)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock analysis result
    const mockAnalysis: TherapyAnalysis = {
      bodyPart: 'Lower Back',
      severity: 'medium',
      recommendedIntensity: 5,
      duration: 20,
      placement: [
        'Place electrodes 2 inches apart on lower back',
        'Position pads vertically along spine',
        'Ensure skin is clean and dry'
      ],
      precautions: [
        'Start with low intensity and gradually increase',
        'Stop if you feel sharp pain',
        'Do not place electrodes directly on spine'
      ],
      confidence: 87
    };

    setIsAnalyzing(false);
    onAnalysisComplete(mockAnalysis);
    toast.success('Analysis complete! Review your therapy recommendation.');
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  React.useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-white">AI Therapy Analysis</h2>
            <p className="text-xs text-gray-300">Capture the affected area</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="text-white hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Camera/Image View */}
      <div className="flex-1 flex items-center justify-center bg-black relative">
        {!capturedImage ? (
          <>
            {cameraError || showFileUpload ? (
              // Camera Error / File Upload Fallback
              <div className="w-full h-full flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                  </div>
                  
                  <h3 className="text-white font-bold text-xl mb-3">Camera Not Available</h3>
                  <p className="text-gray-300 text-sm mb-6">
                    {cameraError || 'Unable to access camera. You can upload a photo instead.'}
                  </p>

                  <div className="space-y-3">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-12 bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Photo Instead
                    </Button>

                    <Button
                      onClick={startCamera}
                      variant="outline"
                      className="w-full h-12 border-2 border-white text-white hover:bg-white/20"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Try Camera Again
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                    <p className="text-xs text-gray-300 mb-2">To enable camera:</p>
                    <p className="text-xs text-gray-400">
                      Click the lock icon in your browser's address bar and allow camera access
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Normal Camera View
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {/* Camera Guides */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-80 h-80 border-4 border-white/50 rounded-lg relative">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-red-500"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-red-500"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-red-500"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-red-500"></div>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="absolute bottom-32 left-0 right-0 px-6">
                  <div className="bg-black/70 backdrop-blur-md rounded-lg p-4 text-center">
                    <p className="text-white text-sm">
                      Center the affected area within the frame
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <img
            src={capturedImage}
            alt="Captured"
            className="w-full h-full object-contain"
          />
        )}

        <canvas ref={canvasRef} className="hidden" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Bottom Controls */}
      <div className="p-6 bg-gradient-to-t from-black/90 to-transparent absolute bottom-0 left-0 right-0">
        {!capturedImage ? (
          <div className="space-y-3">
            {cameraActive && !cameraError && (
              <div className="flex items-center justify-center">
                <Button
                  onClick={captureImage}
                  disabled={!cameraActive}
                  className="w-20 h-20 rounded-full bg-white hover:bg-gray-200 border-4 border-red-500 shadow-xl"
                >
                  <Camera className="w-8 h-8 text-red-500" />
                </Button>
              </div>
            )}
            
            {!cameraActive && !showFileUpload && (
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-white mx-auto animate-spin mb-2" />
                <p className="text-white text-sm">Starting camera...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {isAnalyzing ? (
              <div className="text-center py-4">
                <Loader2 className="w-8 h-8 text-red-500 mx-auto animate-spin mb-3" />
                <p className="text-white font-medium mb-1">Analyzing image...</p>
                <p className="text-gray-400 text-sm">AI is processing your photo</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={retakePhoto}
                  variant="outline"
                  className="h-12 border-2 border-white text-white hover:bg-white/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake
                </Button>
                <Button
                  onClick={analyzeImage}
                  className="h-12 bg-red-500 hover:bg-red-600 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Analyze
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface TherapyAnalysisResultProps {
  analysis: TherapyAnalysis;
  onClose: () => void;
  onStartTherapy: () => void;
}

export function TherapyAnalysisResult({ analysis, onClose, onStartTherapy }: TherapyAnalysisResultProps) {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <h2 className="font-bold text-gray-900">Therapy Recommendation</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="px-6 py-6 space-y-6 pb-32">
        {/* Confidence Score */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-900">Analysis Complete</h3>
                  <p className="text-sm text-green-700">AI Confidence: {analysis.confidence}%</p>
                </div>
              </div>
              <Badge className="bg-green-600 text-white">{analysis.confidence}%</Badge>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${analysis.confidence}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Detected Area */}
        <Card className="smart-heal-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-red-500" />
              <span>Detected Area</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{analysis.bodyPart}</p>
                <p className="text-sm text-gray-600">Target area identified</p>
              </div>
              <Badge
                className={
                  analysis.severity === 'high'
                    ? 'bg-red-500'
                    : analysis.severity === 'medium'
                    ? 'bg-orange-500'
                    : 'bg-yellow-500'
                }
              >
                {analysis.severity.toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Settings */}
        <Card className="smart-heal-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-500" />
              <span>Recommended Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-blue-700 mb-1">Intensity Level</p>
                <p className="text-2xl font-bold text-blue-900">{analysis.recommendedIntensity}/10</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <p className="text-sm text-purple-700 mb-1">Duration</p>
                <p className="text-2xl font-bold text-purple-900">{analysis.duration} min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Electrode Placement */}
        <Card className="smart-heal-card">
          <CardHeader>
            <CardTitle>Electrode Placement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysis.placement.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-700 flex-1">{instruction}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Precautions */}
        <Card className="smart-heal-card border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-900">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <span>Important Precautions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analysis.precautions.map((precaution, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-orange-600 mt-0.5">⚠️</span>
                <p className="text-sm text-orange-800 flex-1">{precaution}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
        <Button
          onClick={onStartTherapy}
          className="w-full h-12 bg-red-500 hover:bg-red-600 text-white"
        >
          <Zap className="w-4 h-4 mr-2" />
          Start Therapy Session
        </Button>
      </div>
    </div>
  );
}
