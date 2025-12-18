import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { toast } from 'sonner';
import { 
  Play, Pause, Square, Timer, Zap, Brain, Camera, 
  Settings, MapPin, Target, Volume2, Smartphone, Mic, Clock 
} from 'lucide-react';

// Lazy load heavy components
const BodyPartSelector = lazy(() => import('./body-part-selector').then(m => ({ default: m.BodyPartSelector })));
const TherapyCameraCapture = lazy(() => import('./therapy-camera-capture').then(m => ({ default: m.TherapyCameraCapture })));
const TherapyAnalysisResult = lazy(() => import('./therapy-camera-capture').then(m => ({ default: m.TherapyAnalysisResult })));

interface TherapyTabProps {
  user: any;
  isDeviceConnected: boolean;
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

interface TherapyProgram {
  name: string;
  duration: number; // in seconds
  intensity: number;
  icon: any;
  description: string;
}

export function TherapyTab({ user, isDeviceConnected }: TherapyTabProps) {
  const [sessionMode, setSessionMode] = useState<'guided' | 'pro'>('guided');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [targetDuration, setTargetDuration] = useState(1200); // 20 minutes default
  const [intensity, setIntensity] = useState(3);
  const [showBodySelector, setShowBodySelector] = useState(false);
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
  const [showCameraCapture, setShowCameraCapture] = useState(false);
  const [therapyAnalysis, setTherapyAnalysis] = useState<TherapyAnalysis | null>(null);
  const [showAnalysisResult, setShowAnalysisResult] = useState(false);
  const [showTimerDialog, setShowTimerDialog] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(20);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (isSessionActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setSessionTime(prev => {
          const newTime = prev + 1;
          
          // Check if target duration reached
          if (newTime >= targetDuration) {
            handleStopSession();
            toast.success('Session completed! Great job!', {
              description: `Total time: ${formatTime(targetDuration)}`
            });
            return targetDuration;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isSessionActive, isPaused, targetDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBodyPartSelection = (parts: string[]) => {
    setSelectedBodyParts(parts);
    setShowBodySelector(false);
  };

  const handleSkipBodySelection = () => {
    setSelectedBodyParts([]);
    setShowBodySelector(false);
  };

  const handleAnalysisComplete = (analysis: TherapyAnalysis) => {
    setTherapyAnalysis(analysis);
    setShowCameraCapture(false);
    setShowAnalysisResult(true);
    // Auto-apply recommended settings
    setIntensity(analysis.recommendedIntensity);
    setTargetDuration(analysis.duration * 60); // Convert minutes to seconds
  };

  const handleStartTherapyFromAnalysis = () => {
    setShowAnalysisResult(false);
    // Therapy settings are already applied
  };

  const handleStartSession = () => {
    if (!isDeviceConnected) {
      toast.error('Device not connected', {
        description: 'Please connect your SmartHeal device first'
      });
      return;
    }

    setIsSessionActive(true);
    setIsPaused(false);
    toast.success('Session started', {
      description: `Intensity Level ${intensity}`
    });
  };

  const handlePauseSession = () => {
    setIsPaused(true);
    toast.info('Session paused', {
      description: 'Click Play to resume'
    });
  };

  const handleResumeSession = () => {
    setIsPaused(false);
    toast.success('Session resumed');
  };

  const handleStopSession = () => {
    setIsSessionActive(false);
    setIsPaused(false);
    const duration = sessionTime;
    setSessionTime(0);
    
    toast.success('Session ended', {
      description: `Duration: ${formatTime(duration)}`
    });
  };

  const handleIncreaseIntensity = () => {
    if (intensity < 10) {
      const newIntensity = intensity + 1;
      setIntensity(newIntensity);
      toast.success(`Intensity increased to Level ${newIntensity}`);
    } else {
      toast.warning('Maximum intensity reached');
    }
  };

  const handleDecreaseIntensity = () => {
    if (intensity > 1) {
      const newIntensity = intensity - 1;
      setIntensity(newIntensity);
      toast.success(`Intensity decreased to Level ${newIntensity}`);
    } else {
      toast.warning('Minimum intensity reached');
    }
  };

  const handleSetTimer = (minutes: number) => {
    setTargetDuration(minutes * 60);
    setShowTimerDialog(false);
    toast.success(`Timer set to ${minutes} minutes`);
  };

  const handleQuickProgram = (program: TherapyProgram) => {
    if (!isDeviceConnected) {
      toast.error('Device not connected', {
        description: 'Please connect your SmartHeal device first'
      });
      return;
    }

    setIntensity(program.intensity);
    setTargetDuration(program.duration);
    toast.success(`${program.name} loaded`, {
      description: `${program.duration / 60} min • Level ${program.intensity}`
    });
  };

  const handleVoiceControl = () => {
    setIsVoiceListening(true);
    toast.info('Listening...', {
      description: 'Say a command like "start session" or "increase intensity"'
    });

    // Simulate voice recognition
    setTimeout(() => {
      const commands = [
        'start session',
        'increase intensity',
        'decrease intensity',
        'pause session',
        'stop session'
      ];
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      
      setVoiceCommand(randomCommand);
      processVoiceCommand(randomCommand);
      
      setTimeout(() => {
        setIsVoiceListening(false);
        setVoiceCommand('');
      }, 2000);
    }, 2000);
  };

  const processVoiceCommand = (command: string) => {
    switch (command.toLowerCase()) {
      case 'start session':
        if (!isSessionActive) {
          handleStartSession();
          toast.success('Voice command executed', {
            description: 'Session started'
          });
        }
        break;
      case 'pause session':
        if (isSessionActive && !isPaused) {
          handlePauseSession();
          toast.success('Voice command executed', {
            description: 'Session paused'
          });
        }
        break;
      case 'stop session':
        if (isSessionActive) {
          handleStopSession();
          toast.success('Voice command executed', {
            description: 'Session stopped'
          });
        }
        break;
      case 'increase intensity':
        handleIncreaseIntensity();
        toast.success('Voice command executed');
        break;
      case 'decrease intensity':
        handleDecreaseIntensity();
        toast.success('Voice command executed');
        break;
      default:
        toast.error('Command not recognized');
    }
  };

  const therapyPrograms: TherapyProgram[] = [
    { 
      name: 'Pain Relief', 
      duration: 1200, // 20 min
      intensity: 5, 
      icon: Zap,
      description: 'Reduce pain and discomfort'
    },
    { 
      name: 'Muscle Recovery', 
      duration: 1500, // 25 min
      intensity: 3, 
      icon: Target,
      description: 'Speed up muscle recovery'
    },
    { 
      name: 'Stress Relief', 
      duration: 900, // 15 min
      intensity: 2, 
      icon: Brain,
      description: 'Relax and reduce stress'
    },
    { 
      name: 'Custom Program', 
      duration: 0, 
      intensity: 3, 
      icon: Settings,
      description: 'Create your own program'
    }
  ];

  // If camera capture is shown, render it full screen
  if (showCameraCapture) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        <TherapyCameraCapture
          onClose={() => setShowCameraCapture(false)}
          onAnalysisComplete={handleAnalysisComplete}
        />
      </Suspense>
    );
  }

  // If analysis result is shown, render it full screen
  if (showAnalysisResult && therapyAnalysis) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        <TherapyAnalysisResult
          analysis={therapyAnalysis}
          onClose={() => setShowAnalysisResult(false)}
          onStartTherapy={handleStartTherapyFromAnalysis}
        />
      </Suspense>
    );
  }

  // If body selector is shown, render it full screen
  if (showBodySelector) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        <BodyPartSelector
          onNext={handleBodyPartSelection}
          onSkip={handleSkipBodySelection}
        />
      </Suspense>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6 pb-24 max-h-screen overflow-y-auto scroll-smooth">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Therapy Center</h1>
        <p className="text-gray-600">Personalized ITT therapy sessions</p>
      </div>

      {/* Mode Selection */}
      <Card className="smart-heal-card">
        <CardHeader>
          <CardTitle>Select Session Mode</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={sessionMode} onValueChange={(value) => setSessionMode(value as 'guided' | 'pro')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="guided">Guided Mode</TabsTrigger>
              <TabsTrigger value="pro">Pro Mode</TabsTrigger>
            </TabsList>
            
            <TabsContent value="guided" className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-900">AI-Guided Session</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Perfect for beginners. Get real-time placement guidance, automated intensity adjustment, and voice instructions.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="secondary" className="text-xs">Auto-adjustment</Badge>
                    <Badge variant="secondary" className="text-xs">Voice guidance</Badge>
                    <Badge variant="secondary" className="text-xs">Safety monitoring</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pro" className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Settings className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-purple-900">Professional Mode</h3>
                  <p className="text-sm text-purple-700 mt-1">
                    For experienced users. Full manual control over all therapy parameters, custom programs, and advanced analytics.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="secondary" className="text-xs">Manual control</Badge>
                    <Badge variant="secondary" className="text-xs">Custom programs</Badge>
                    <Badge variant="secondary" className="text-xs">Advanced settings</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Body Part Selection */}
      <Card className="smart-heal-card border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-red-600" />
            <span className="text-red-900">Target Area Selection</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-red-700">
            Select the body parts you want to target for therapy
          </p>
          
          {selectedBodyParts.length > 0 ? (
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <h3 className="text-sm font-medium text-red-900 mb-2">
                  Selected Areas ({selectedBodyParts.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedBodyParts.map((part, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm"
                    >
                      {part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                onClick={() => setShowBodySelector(true)}
                variant="outline"
                className="w-full border-red-300 text-red-700 hover:bg-red-100"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Change Selection
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setShowBodySelector(true)}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Select Body Parts
            </Button>
          )}
        </CardContent>
      </Card>

      {/* AI Camera Analysis */}
      {sessionMode === 'guided' && (
        <Card className="smart-heal-card border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-green-600" />
              <span className="text-green-900">AI Camera Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-green-700">
              Capture a photo of the affected area and get AI-powered therapy recommendations
            </p>
            
            {therapyAnalysis && (
              <div className="p-3 bg-white rounded-lg border border-green-300 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-900">Last Analysis</span>
                  <Badge className="bg-green-600 text-white">{therapyAnalysis.confidence}%</Badge>
                </div>
                <p className="text-sm text-gray-700">
                  {therapyAnalysis.bodyPart} • Level {therapyAnalysis.recommendedIntensity} • {therapyAnalysis.duration}min
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => setShowCameraCapture(true)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Camera className="w-4 h-4 mr-2" />
                Capture Photo
              </Button>
              
              <Button 
                variant="outline" 
                className="border-green-300 text-green-700 hover:bg-green-100"
                onClick={() => setShowBodySelector(true)}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Manual Select
              </Button>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-green-700">AI Accuracy: 94.2%</p>
              <p className="text-xs text-green-600">Powered by Vertex AI</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Session Control */}
      <Card className="smart-heal-card">
        <CardHeader>
          <CardTitle>Session Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Connection Status */}
          {!isDeviceConnected && (
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-2">Device not connected</p>
              <Button variant="outline" size="sm">
                Connect Device
              </Button>
            </div>
          )}

          {/* Session Timer */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {formatTime(sessionTime)}
            </div>
            <p className="text-gray-500">Session Duration</p>
          </div>

          {/* Session Status */}
          {isSessionActive && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-900">
                    {isPaused ? 'Session Paused' : 'Session Active'}
                  </span>
                </div>
                <span className="text-sm text-blue-700">
                  {formatTime(targetDuration - sessionTime)} remaining
                </span>
              </div>
            </div>
          )}

          {/* Intensity Control */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Intensity Level</span>
              <Badge variant="outline">Level {intensity}</Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDecreaseIntensity}
                disabled={!isDeviceConnected || intensity <= 1}
              >
                -
              </Button>
              <div className="flex-1">
                <Progress value={intensity * 10} className="h-2" />
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleIncreaseIntensity}
                disabled={!isDeviceConnected || intensity >= 10}
              >
                +
              </Button>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Gentle</span>
              <span>Moderate</span>
              <span>Strong</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={() => {
                if (isSessionActive) {
                  if (isPaused) {
                    handleResumeSession();
                  } else {
                    handlePauseSession();
                  }
                } else {
                  handleStartSession();
                }
              }}
              disabled={!isDeviceConnected}
              className={`h-12 ${isSessionActive && !isPaused ? 'bg-orange-500 hover:bg-orange-600' : 'smart-heal-primary-btn'} text-white`}
            >
              {isSessionActive ? (
                isPaused ? (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </>
                )
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              disabled={!isDeviceConnected || !isSessionActive}
              className="h-12"
              onClick={handleStopSession}
            >
              <Square className="w-5 h-5 mr-2" />
              Stop
            </Button>
            
            <Button
              variant="outline"
              disabled={!isDeviceConnected}
              className="h-12"
              onClick={() => setShowTimerDialog(true)}
            >
              <Timer className="w-5 h-5 mr-2" />
              Timer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Session Presets */}
      <Card className="smart-heal-card">
        <CardHeader>
          <CardTitle>Quick Start Programs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {therapyPrograms.map((program, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => program.duration > 0 && handleQuickProgram(program)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <program.icon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{program.name}</h3>
                  <p className="text-sm text-gray-500">
                    {program.duration > 0 ? `${program.duration / 60} min` : 'Variable'} • 
                    Level {program.intensity}
                  </p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                disabled={!isDeviceConnected}
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickProgram(program);
                }}
              >
                Load
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Voice Control */}
      <Card className="smart-heal-card border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-purple-600" />
            <span className="text-purple-900">Voice Control</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-purple-700">
            Control your therapy session hands-free with voice commands
          </p>

          {/* Voice Status */}
          {isVoiceListening && (
            <div className="p-3 bg-purple-100 border border-purple-300 rounded-lg animate-pulse">
              <div className="flex items-center space-x-2">
                <Mic className="w-4 h-4 text-purple-700 animate-pulse" />
                <span className="text-sm font-medium text-purple-900">
                  {voiceCommand ? `Recognized: "${voiceCommand}"` : 'Listening...'}
                </span>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className={`border-purple-300 text-purple-700 hover:bg-purple-100 ${isVoiceListening ? 'bg-purple-200' : ''}`}
              disabled={!isDeviceConnected || isVoiceListening}
              onClick={handleVoiceControl}
            >
              <Mic className="w-4 h-4 mr-2" />
              {isVoiceListening ? 'Listening...' : 'Start Listening'}
            </Button>
            
            <Button 
              variant="outline" 
              className="border-purple-300 text-purple-700 hover:bg-purple-100"
              onClick={() => {
                toast.info('Available Commands', {
                  description: 'Start/Pause/Stop session, Increase/Decrease intensity'
                });
              }}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Commands
            </Button>
          </div>
          
          <div className="text-xs text-purple-600 space-y-1">
            <p>• "Start session" • "Increase intensity"</p>
            <p>• "Pause session" • "Decrease intensity"</p>
            <p>• "Stop session"</p>
          </div>
        </CardContent>
      </Card>

      {/* Session History */}
      <Card className="smart-heal-card">
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { date: 'Today 2:30 PM', duration: '23 min', program: 'Pain Relief', rating: 4 },
            { date: 'Today 9:15 AM', duration: '20 min', program: 'Muscle Recovery', rating: 5 },
            { date: 'Yesterday 7:45 PM', duration: '25 min', program: 'Stress Relief', rating: 4 }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{session.program}</h3>
                <p className="text-sm text-gray-500">{session.date} • {session.duration}</p>
              </div>
              <div className="text-right">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xs ${i < session.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full">
            View All Sessions
          </Button>
        </CardContent>
      </Card>

      {/* Timer Dialog */}
      <Dialog open={showTimerDialog} onOpenChange={setShowTimerDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Set Session Timer</span>
            </DialogTitle>
            <DialogDescription>
              Choose your session duration or set a custom time
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Quick Timer Presets */}
            <div className="grid grid-cols-3 gap-3">
              {[10, 15, 20, 25, 30, 45].map((minutes) => (
                <Button
                  key={minutes}
                  variant="outline"
                  className={`h-16 ${targetDuration === minutes * 60 ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => {
                    setTargetDuration(minutes * 60);
                    setCustomMinutes(minutes);
                  }}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold">{minutes}</div>
                    <div className="text-xs text-gray-500">min</div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Custom Timer Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Custom Duration (minutes)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(parseInt(e.target.value) || 1)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  variant="outline"
                  onClick={() => setTargetDuration(customMinutes * 60)}
                >
                  Set
                </Button>
              </div>
            </div>

            {/* Current Selection */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">Selected Duration:</span>
                <span className="text-lg font-bold text-blue-900">
                  {Math.floor(targetDuration / 60)} minutes
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowTimerDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleSetTimer(Math.floor(targetDuration / 60));
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Clock className="w-4 h-4 mr-2" />
              Apply Timer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TherapyTab;