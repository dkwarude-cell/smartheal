import React from 'react';
import { Button } from './ui/button';
import { RotateCcw, Sparkles, X } from 'lucide-react';

interface AIImagePreviewScreenProps {
  onNavigate: (screen: string) => void;
  imageData: string | null;
  onConfirm: () => void;
  onRetake: () => void;
}

export function AIImagePreviewScreen({ onNavigate, imageData, onConfirm, onRetake }: AIImagePreviewScreenProps) {
  if (!imageData) {
    return (
      <div className="h-full bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p>No image data available</p>
          <Button 
            onClick={() => onNavigate('aiImage')}
            variant="outline"
            className="mt-4 border-white/30 text-white"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-black relative overflow-hidden">
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

      {/* Header instruction */}
      <div className="absolute top-4 left-4 right-4 z-30">
        <div className="bg-black/70 backdrop-blur-sm border border-white/20 rounded-2xl p-3 mx-12">
          <div className="text-center">
            <p className="text-white text-sm">
              Ready for AI analysis
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-blue-300 mt-1">
              <Sparkles className="w-3 h-3" />
              <span>AI processing ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview - centered */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-6 pt-20 pb-32">
        <div className="relative max-w-full max-h-full">
          <img
            src={imageData}
            alt="Captured preview"
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
          />
          
          {/* AI analysis indicator overlay */}
          <div className="absolute inset-0 border-2 border-blue-400 rounded-2xl animate-pulse" />
          
          {/* Focus indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 border-2 border-green-400 rounded-lg animate-pulse opacity-75" />
          </div>

          {/* AI scanning animation */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" 
                 style={{ 
                   animation: 'scan 2s linear infinite',
                   animationDelay: '0.5s'
                 }} 
            />
          </div>
        </div>
      </div>

      {/* Action Buttons - positioned above bottom nav */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-sm px-4">
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
            className="flex-1 rounded-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg transition-all"
            style={{ minHeight: '56px' }}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Analyze
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}