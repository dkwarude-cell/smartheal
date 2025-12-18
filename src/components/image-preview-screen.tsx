import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { RotateCcw, Check, X } from 'lucide-react';

interface ImagePreviewScreenProps {
  onNavigate: (screen: string) => void;
  imageData: string | null;
  onConfirm: () => void;
  onRetake: () => void;
}

export function ImagePreviewScreen({ onNavigate, imageData, onConfirm, onRetake }: ImagePreviewScreenProps) {
  if (!imageData) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Card className="p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">No image captured</p>
          <Button
            onClick={() => onNavigate('camera')}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white rounded-full px-6"
          >
            Go to Camera
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full bg-black relative overflow-hidden">
      {/* Header/Instruction Area - 20% of screen height */}
      <div className="absolute top-0 left-0 right-0 z-30" style={{ height: '20%' }}>
        <div className="h-full flex flex-col justify-center px-4">
          <div className="bg-black/70 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mx-2">
            <div className="text-center">
              <h3 className="text-white font-medium mb-2">Ready for Analysis</h3>
              <p className="text-white/80 text-sm">
                AI will analyze this image to provide personalized therapy recommendations based on visual indicators.
              </p>
              <div className="flex items-center justify-center space-x-2 text-xs text-blue-300 mt-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>Processing ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview - 54% of screen height positioned in lower area */}
      <div className="absolute z-10" style={{ 
        top: '20%',
        left: '0',
        right: '0',
        height: '54%'
      }}>
        <div className="absolute inset-4 flex items-center justify-center">
          <div className="relative max-w-full max-h-full">
            <img
              src={imageData}
              alt="Captured preview"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
            
            {/* Analysis indicator overlay */}
            <div className="absolute inset-0 border-2 border-blue-400 rounded-2xl animate-pulse" />
            
            {/* Center focus indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-24 h-24 border-2 border-red-400 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Close button */}
      <div className="absolute top-4 left-4 z-50">
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

      {/* Action Buttons - positioned 26% from bottom, 30px above nav */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-40 w-full max-w-sm px-4" style={{ bottom: '26%' }}>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={onRetake}
            variant="outline"
            size="lg"
            className="flex-1 rounded-full py-4 bg-white/90 border-gray-300 text-gray-700 hover:bg-white font-medium"
            style={{ minHeight: '56px' }}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Retake
          </Button>
          
          <Button
            onClick={onConfirm}
            size="lg"
            className="flex-1 rounded-full py-4 bg-red-500 hover:bg-red-600 text-white font-medium shadow-lg hover:shadow-red-200 transition-all"
            style={{ minHeight: '56px' }}
          >
            <Check className="w-5 h-5 mr-2" />
            Analyze
          </Button>
        </div>
      </div>
    </div>
  );
}