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
  Settings, MapPin, Target, Clock 
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
  const profileType: 'beginner' | 'athlete' | 'coach' | 'health' = (user?.profileType || 'beginner') as any;
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
      description: `${program.duration / 60} min  Level ${program.intensity}`
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

  const therapyPrograms: TherapyProgram[] = profileType === 'athlete'
    ? [
      {
        name: 'Performance Boost',
        duration: 1200,
        intensity: 6,
        icon: Zap,
        description: 'Prime before training or competition'
      },
      {
        name: 'Muscle Recovery',
        duration: 1500,
        intensity: 3,
        icon: Target,
        description: 'Speed up recovery after sessions'
      },
      {
        name: 'Mobility & Warmup',
        duration: 900,
        intensity: 2,
        icon: Brain,
        description: 'Loosen up and prepare safely'
      },
      {
        name: 'Custom Program',
        duration: 0,
        intensity: 3,
        icon: Settings,
        description: 'Create your own program'
      }
    ]
    : [
      {
        name: 'Pain Relief',
        duration: 1200,
        intensity: 5,
        icon: Zap,
        description: 'Reduce pain and discomfort'
      },
      {
        name: 'Muscle Recovery',
        duration: 1500,
        intensity: 3,
        icon: Target,
        description: 'Speed up muscle recovery'
      },
      {
        name: 'Stress Relief',
        duration: 900,
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

  const quickIntensityLevels = [20, 40, 60, 80];
  const painReliefProgram = therapyPrograms.find((program) => program.name === 'Pain Relief') || therapyPrograms[0];

  const handleQuickIntensity = (percent: number) => {
    const level = Math.min(10, Math.max(1, Math.round(percent / 10)));
    setIntensity(level);
    toast.success(`Intensity set to Level ${level}`);
  };

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
    <div className="px-4 py-6 space-y-5 lg:space-y-6 pb-24 max-h-screen overflow-y-auto scroll-smooth safe-top">
      <div className="flex flex-col gap-2 text-center lg:text-left lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Therapy Center</h1>
          <p className="text-gray-600 text-sm">
            {profileType === 'athlete' ? 'Optimize performance and recover faster' : 'Guided relief with AI recommendations'}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="secondary" className="text-xs">
            Profile: <span className="ml-1 capitalize">{profileType}</span>
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Mode: {sessionMode === 'guided' ? 'Guided' : 'Pro'}
          </Badge>
          <Badge className={`text-xs ${isDeviceConnected ? 'bg-green-600' : 'bg-amber-500'}`}>
            {isDeviceConnected ? 'Device connected' : 'Device not connected'}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 lg:gap-6 grid-cols-1 xl:grid-cols-2">
        <Card className="smart-heal-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Therapy Session</span>
              <Tabs value={sessionMode} onValueChange={(value: 'guided' | 'pro') => setSessionMode(value)}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="guided">Guided</TabsTrigger>
                  <TabsTrigger value="pro">Pro</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isDeviceConnected && (
              <div className="rounded-lg border border-dashed border-amber-300 bg-amber-50 p-3 text-sm text-amber-700">
                Connect your SmartHeal device to start a session.
              </div>
            )}

            <div className="flex flex-wrap gap-3">
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
                className={`flex-1 min-w-[140px] ${isSessionActive && !isPaused ? 'bg-orange-500 hover:bg-orange-600' : 'smart-heal-primary-btn'} text-white`}
              >
                {isSessionActive ? (
                  isPaused ? (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Resume session
                    </>
                  ) : (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause session
                    </>
                  )
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start therapy session
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="min-w-[110px]"
                disabled={!isDeviceConnected || !isSessionActive}
                onClick={handleStopSession}
              >
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowTimerDialog(true)}
                className="min-w-[120px]"
              >
                <Timer className="w-4 h-4 mr-2" />
                Set time {Math.floor(targetDuration / 60)}m
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs uppercase text-gray-500">Session time</p>
                <div className="text-3xl font-semibold text-gray-900">{formatTime(sessionTime)}</div>
                {isSessionActive && (
                  <p className="mt-1 text-xs text-blue-700">
                    {isPaused ? 'Paused' : 'Active'} • {formatTime(Math.max(targetDuration - sessionTime, 0))} remaining
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Intensity</span>
                  <Badge variant="outline">Level {intensity}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickIntensityLevels.map((value) => (
                    <Button
                      key={value}
                      size="sm"
                      variant="outline"
                      className={`flex-1 min-w-[60px] ${Math.round(intensity * 10) === value ? 'border-blue-500 bg-blue-50' : ''}`}
                      onClick={() => handleQuickIntensity(value)}
                      disabled={!isDeviceConnected}
                    >
                      {value}
                    </Button>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    className="min-w-[60px]"
                    onClick={handleIncreaseIntensity}
                    disabled={!isDeviceConnected || intensity >= 10}
                  >
                    +
                  </Button>
                </div>
                <Progress value={intensity * 10} className="h-2" />
                <p className="text-xs text-gray-500">Gentle · Moderate · Strong</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-lg border border-gray-100 bg-white p-4">
              <div>
                <p className="text-xs uppercase text-gray-500">Body parts selected</p>
                {selectedBodyParts.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedBodyParts.map((part, index) => (
                      <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                        {part.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No body parts selected yet.</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => setShowBodySelector(true)}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Edit body parts
                </Button>
                {painReliefProgram && (
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    disabled={!isDeviceConnected}
                    onClick={() => handleQuickProgram(painReliefProgram)}
                  >
                    Target Pain
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {sessionMode === 'guided' && (
          <Card className="smart-heal-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-blue-600" />
                <span>AI Camera Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Capture with AI to get placement and intensity recommendations.
              </p>

              {therapyAnalysis && (
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">Last analysis</span>
                    <Badge className="bg-blue-600 text-white">{therapyAnalysis.confidence}%</Badge>
                  </div>
                  <p className="mt-1 text-sm text-blue-800">
                    {therapyAnalysis.bodyPart} • Level {therapyAnalysis.recommendedIntensity} • {therapyAnalysis.duration}m
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowCameraCapture(true)}>
                  <Camera className="w-4 h-4 mr-2" />
                  Capture with AI
                </Button>
                <Button variant="outline" onClick={() => setShowBodySelector(true)}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Manual select
                </Button>
              </div>

              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
                AI accuracy: 94.2% • Vertex AI powered
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <Card className="smart-heal-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-red-600" />
              <span>Target Selection</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">Select the zones you want to focus on.</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Glutes', value: 'glutes' },
                { label: 'Back', value: 'back' },
                { label: 'Legs', value: 'legs' },
                { label: 'Abdominals', value: 'abdominals' }
              ].map(({ label, value }) => (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  className={selectedBodyParts.includes(value) ? 'border-blue-500 bg-blue-50' : ''}
                  onClick={() => {
                    const updated = selectedBodyParts.includes(value)
                      ? selectedBodyParts.filter((item) => item !== value)
                      : Array.from(new Set([...selectedBodyParts, value]));
                    setSelectedBodyParts(updated);
                  }}
                >
                  {label}
                </Button>
              ))}
            </div>

            <div className="rounded-lg border border-gray-100 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-gray-500">Current target</p>
                  <p className="text-sm font-medium text-gray-900">{selectedBodyParts[0] ? selectedBodyParts[0].replace(/\b\w/g, (l) => l.toUpperCase()) : 'None selected'}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowBodySelector(true)}>
                  Edit selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="smart-heal-card">
          <CardHeader>
            <CardTitle>Session Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs uppercase text-gray-500">Body</p>
              <p className="text-sm font-semibold text-gray-900">{therapyAnalysis?.bodyPart || (selectedBodyParts[0] ? selectedBodyParts[0].replace(/\b\w/g, (l) => l.toUpperCase()) : 'Not set')}</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs uppercase text-gray-500">Target</p>
              <p className="text-sm font-semibold text-gray-900">{painReliefProgram?.name || 'Pain Relief'}</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs uppercase text-gray-500">Duration</p>
              <p className="text-sm font-semibold text-gray-900">{Math.floor(targetDuration / 60)} min</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs uppercase text-gray-500">Intensity</p>
              <p className="text-sm font-semibold text-gray-900">Level {intensity}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        <Card className="smart-heal-card xl:col-span-2">
          <CardHeader>
            <CardTitle>Quick Start Programs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {therapyPrograms.map((program, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-3 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <program.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{program.name}</p>
                    <p className="text-sm text-gray-600">{program.duration > 0 ? `${program.duration / 60} min` : 'Variable'} • Level {program.intensity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!isDeviceConnected}
                    onClick={() => handleQuickProgram(program)}
                  >
                    Load
                  </Button>
                  {program.name === 'Custom Program' && (
                    <Badge variant="secondary" className="text-xs">Pro</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="smart-heal-card">
          <CardHeader>
            <CardTitle>This Week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs uppercase text-gray-500">Session time</p>
              <p className="text-xl font-semibold text-gray-900">4h</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs uppercase text-gray-500">Performance</p>
              <p className="text-xl font-semibold text-gray-900">72%</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs uppercase text-gray-500">Recovery</p>
              <p className="text-xl font-semibold text-gray-900">86%</p>
            </div>
          </CardContent>
        </Card>
      </div>

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
