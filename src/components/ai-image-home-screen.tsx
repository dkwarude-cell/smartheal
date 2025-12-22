import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Camera, Upload, Sparkles, Zap, Brain } from 'lucide-react';

interface AIImageHomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function AIImageHomeScreen({ onNavigate }: AIImageHomeScreenProps) {
  const handleCapturePhoto = () => {
    onNavigate('camera');
  };

  const handleUploadImage = () => {
    // This will trigger the file input in the camera screen
    onNavigate('upload');
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 p-6 safe-top">
      {/* Header Section */}
      <div className="text-center mb-8 pt-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">AI Image Analysis</h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm max-w-sm mx-auto leading-relaxed">
          Use AI-powered analysis to get personalized therapy recommendations based on your images
        </p>
      </div>

      {/* Action Cards */}
      <div className="space-y-4 max-w-sm mx-auto">
        {/* Capture Photo Card */}
        <Card className="smart-heal-card overflow-hidden border-0 shadow-lg">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Capture Photo</h3>
                <p className="text-blue-100 text-sm">
                  Take a clear photo for instant AI analysis
                </p>
              </div>
            </div>
            <Button
              onClick={handleCapturePhoto}
              className="w-full mt-4 bg-white text-blue-600 hover:bg-blue-50 font-medium rounded-xl py-3 transition-all duration-200 hover:shadow-lg"
            >
              <Camera className="w-5 h-5 mr-2" />
              Open Camera
            </Button>
          </div>
        </Card>

        {/* Upload from Gallery Card */}
        <Card className="smart-heal-card overflow-hidden border-0 shadow-lg">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Upload Image</h3>
                <p className="text-purple-100 text-sm">
                  Select an existing photo from your gallery
                </p>
              </div>
            </div>
            <Button
              onClick={handleUploadImage}
              className="w-full mt-4 bg-white text-purple-600 hover:bg-purple-50 font-medium rounded-xl py-3 transition-all duration-200 hover:shadow-lg"
            >
              <Upload className="w-5 h-5 mr-2" />
              Choose from Gallery
            </Button>
          </div>
        </Card>
      </div>

      {/* Features Section */}
      <div className="mt-12 space-y-4">
        <h2 className="text-center text-lg font-medium text-gray-900 dark:text-white mb-6">
          AI Analysis Features
        </h2>
        
        <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto">
          <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Smart Area Detection</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Therapy Mode Recommendations</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Personalized Settings</span>
          </div>
        </div>
      </div>

      {/* Bottom Spacing for Navigation */}
      <div className="h-8"></div>
    </div>
  );
}