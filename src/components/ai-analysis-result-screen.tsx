import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { 
  Sparkles, 
  Target, 
  Zap, 
  Timer, 
  Activity, 
  CheckCircle, 
  ArrowRight,
  X,
  Brain,
  Thermometer,
  Radio
} from 'lucide-react';

interface AIAnalysisResultScreenProps {
  onNavigate: (screen: string) => void;
  imageData: string | null;
}

export function AIAnalysisResultScreen({ onNavigate, imageData }: AIAnalysisResultScreenProps) {
  // Mock AI analysis results
  const analysisResults = {
    detectedArea: "Lower Back - Lumbar Region",
    confidence: 92,
    recommendedMode: {
      primary: "Heat Therapy",
      secondary: "Low-Frequency EMS",
      icon: Thermometer,
      color: "from-red-500 to-orange-500"
    },
    settings: {
      intensity: 6,
      duration: 20,
      temperature: "Medium (38°C)"
    },
    reasoning: [
      "Muscle tension detected in targeted area",
      "Heat therapy recommended for relaxation",
      "EMS will help improve circulation"
    ]
  };

  const startTherapy = () => {
    // Navigate to therapy settings with pre-filled values
    onNavigate('settings');
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 p-4 safe-top">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('aiImage')}
          className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-gray-800/50"
        >
          <X className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">AI Analysis Results</h1>
        <div className="w-10"></div>
      </div>

      <div className="space-y-4 pb-24">
        {/* Analysis Status */}
        <Card className="smart-heal-card border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Analysis Complete</h3>
                <p className="text-green-100 text-sm">
                  {analysisResults.confidence}% confidence • High accuracy
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Detected Area */}
        <Card className="smart-heal-card border-0 shadow-lg p-5">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Detected Area</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                {analysisResults.detectedArea}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Primary therapy focus identified
              </p>
            </div>
          </div>
        </Card>

        {/* Recommended Therapy */}
        <Card className="smart-heal-card border-0 shadow-lg overflow-hidden">
          <div className={`bg-gradient-to-r ${analysisResults.recommendedMode.color} p-5 text-white`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <analysisResults.recommendedMode.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Recommended Therapy</h3>
                <p className="text-white/90">{analysisResults.recommendedMode.primary}</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/90 text-sm">Intensity Level</span>
                <span className="font-semibold">{analysisResults.settings.intensity}/10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90 text-sm">Duration</span>
                <span className="font-semibold">{analysisResults.settings.duration} minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90 text-sm">Temperature</span>
                <span className="font-semibold">{analysisResults.settings.temperature}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Reasoning */}
        <Card className="smart-heal-card border-0 shadow-lg p-5">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">AI Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Why this therapy was recommended</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {analysisResults.reasoning.map((reason, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{reason}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Preview Image (if available) */}
        {imageData && (
          <Card className="smart-heal-card border-0 shadow-lg p-5">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Analyzed Image</h3>
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src={imageData} 
                alt="Analyzed image" 
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-2 left-2 text-white text-xs">
                ✓ Analysis complete
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-20 left-4 right-4 z-50">
        <Button
          onClick={startTherapy}
          className="w-full smart-heal-primary-btn text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          style={{ minHeight: '60px' }}
        >
          <Activity className="w-6 h-6 mr-3" />
          Start Therapy Now
          <ArrowRight className="w-6 h-6 ml-3" />
        </Button>
      </div>
    </div>
  );
}