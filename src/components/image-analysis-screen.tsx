import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Brain, 
  Zap, 
  Thermometer, 
  Activity, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react';

interface ImageAnalysisScreenProps {
  onNavigate: (screen: string) => void;
  imageData: string | null;
}

export function ImageAnalysisScreen({ onNavigate, imageData }: ImageAnalysisScreenProps) {
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState('Initializing...');

  const analysisSteps = [
    { step: 'Initializing AI Analysis...', duration: 1000 },
    { step: 'Detecting anatomical regions...', duration: 1500 },
    { step: 'Analyzing muscle tension patterns...', duration: 2000 },
    { step: 'Evaluating inflammation indicators...', duration: 1500 },
    { step: 'Generating therapy recommendations...', duration: 1000 },
    { step: 'Finalizing treatment plan...', duration: 500 }
  ];

  const analysisResults = {
    overallScore: 78,
    detectedIssues: [
      { 
        area: 'Lower Back', 
        severity: 'Moderate', 
        confidence: 87,
        description: 'Muscle tension patterns detected'
      },
      { 
        area: 'Right Shoulder', 
        severity: 'Mild', 
        confidence: 72,
        description: 'Minor inflammation indicators'
      }
    ],
    recommendations: [
      {
        therapy: 'EMS Therapy',
        intensity: 'Medium',
        duration: '20 minutes',
        focus: 'Lower Back',
        icon: Zap,
        priority: 'High',
        description: 'Electrical muscle stimulation to reduce tension'
      },
      {
        therapy: 'Heat Therapy',
        intensity: 'Low',
        duration: '15 minutes',
        focus: 'Right Shoulder',
        icon: Thermometer,
        priority: 'Medium',
        description: 'Gentle heat application for inflammation'
      },
      {
        therapy: 'TENS',
        intensity: 'Medium',
        duration: '25 minutes',
        focus: 'Lower Back',
        icon: Activity,
        priority: 'High',
        description: 'Pain relief through nerve stimulation'
      }
    ]
  };

  useEffect(() => {
    let stepIndex = 0;
    let progress = 0;
    
    const runAnalysis = () => {
      if (stepIndex < analysisSteps.length) {
        setCurrentStep(analysisSteps[stepIndex].step);
        
        setTimeout(() => {
          progress += (100 / analysisSteps.length);
          setAnalysisProgress(Math.min(progress, 100));
          stepIndex++;
          
          if (stepIndex >= analysisSteps.length) {
            setTimeout(() => {
              setAnalysisComplete(true);
            }, 500);
          } else {
            runAnalysis();
          }
        }, analysisSteps[stepIndex].duration);
      }
    };

    runAnalysis();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
      case 'severe':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low':
      case 'mild':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20';
      case 'medium':
        return 'border-yellow-300 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/20';
      case 'low':
        return 'border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-900/20';
      default:
        return 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800';
    }
  };

  if (!analysisComplete) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 space-y-6">
        {/* AI Analysis Animation */}
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <div className="absolute inset-0 border-4 border-blue-300 rounded-full animate-ping" />
        </div>

        {/* Progress Section */}
        <div className="w-full max-w-sm space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-medium dark:text-white mb-2">AI Analysis in Progress</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{currentStep}</p>
          </div>
          
          <div className="space-y-2">
            <Progress value={analysisProgress} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Analyzing image...</span>
              <span>{Math.round(analysisProgress)}%</span>
            </div>
          </div>
        </div>

        {/* Analysis Information */}
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 max-w-sm">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">AI Vision Active</span>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Using advanced computer vision to analyze muscle patterns, inflammation, and stress indicators
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-full p-4 space-y-4 pb-8">
      {/* Analysis Complete Header */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-medium dark:text-white">Analysis Complete</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">AI-powered therapy recommendations ready</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Overall Health Score:</span>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              {analysisResults.overallScore}/100
            </Badge>
          </div>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
      </Card>

      {/* Captured Image Thumbnail */}
      {imageData && (
        <Card className="p-3">
          <h3 className="text-sm font-medium dark:text-white mb-2">Analyzed Image</h3>
          <img
            src={imageData}
            alt="Analyzed area"
            className="w-full h-32 object-cover rounded-lg border-2 border-blue-200 dark:border-blue-700"
          />
        </Card>
      )}

      {/* Detected Issues */}
      <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-base font-medium dark:text-white mb-3 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
          Detected Areas of Concern
        </h3>
        
        <div className="space-y-3">
          {analysisResults.detectedIssues.map((issue, index) => (
            <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium dark:text-white">{issue.area}</span>
                <Badge className={getSeverityColor(issue.severity)}>
                  {issue.severity}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{issue.description}</p>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span>Confidence: {issue.confidence}%</span>
                <div className="ml-2 flex-1">
                  <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-1000"
                      style={{ width: `${issue.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Therapy Recommendations */}
      <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-base font-medium dark:text-white mb-3 flex items-center">
          <Target className="w-4 h-4 mr-2 text-red-500" />
          Recommended Therapy Sessions
        </h3>
        
        <div className="space-y-3">
          {analysisResults.recommendations.map((rec, index) => (
            <Card key={index} className={`p-3 border-2 ${getPriorityColor(rec.priority)}`}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <rec.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium dark:text-white">{rec.therapy}</h4>
                    <Badge variant="outline" className={`text-xs ${
                      rec.priority === 'High' ? 'border-red-500 text-red-600' :
                      rec.priority === 'Medium' ? 'border-yellow-500 text-yellow-600' :
                      'border-green-500 text-green-600'
                    }`}>
                      {rec.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{rec.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Zap className="w-3 h-3" />
                      <span>{rec.intensity}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{rec.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span>{rec.focus}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Button 
          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-4 font-medium shadow-lg hover:shadow-red-200 transition-all"
          onClick={() => onNavigate('settings')}
        >
          Apply Recommendations
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline"
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => onNavigate('camera')}
          >
            Analyze Another
          </Button>
          
          <Button 
            variant="outline"
            className="border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 rounded-full py-3 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            onClick={() => onNavigate('reports')}
          >
            Save Results
          </Button>
        </div>
      </div>
    </div>
  );
}