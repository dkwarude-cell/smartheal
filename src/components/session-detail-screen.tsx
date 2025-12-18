import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Play, Pause, Clock, Zap, Target, Calendar,
  CheckCircle, Activity, Heart, TrendingUp, Volume2, VolumeX
} from 'lucide-react';

interface SessionDetailScreenProps {
  session: any;
  onBack: () => void;
  onStart?: () => void;
}

export function SessionDetailScreen({ session, onBack, onStart }: SessionDetailScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleStartSession = () => {
    setIsPlaying(true);
    if (onStart) onStart();
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 100;
        }
        return prev + 1;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div>
          <h1 className="text-gray-900 mb-1">{session.type}</h1>
          <p className="text-gray-600 text-sm">{session.bodyPart} • {session.duration}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Session Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 text-white relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
          </div>

          <div className="relative z-10">
            {!isPlaying && progress === 0 && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm">Ready to start</span>
                </div>
                <h2 className="text-2xl mb-2">{session.type}</h2>
                <p className="text-white/90 mb-6">{session.description || 'Professional therapy session optimized for recovery'}</p>
                
                <button
                  onClick={handleStartSession}
                  className="w-full bg-white text-red-600 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white/95 transition-all shadow-lg"
                >
                  <Play className="w-6 h-6" />
                  <span className="text-lg">Start Session</span>
                </button>
              </>
            )}

            {(isPlaying || progress > 0) && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {isPlaying ? (
                      <>
                        <Activity className="w-5 h-5 animate-pulse" />
                        <span className="text-sm">In Progress</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm">Completed</span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>

                {/* Progress Circle */}
                <div className="flex items-center justify-center my-8">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="white"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl">{Math.round(progress)}%</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <div className="text-white/90 text-sm mb-1">Time Remaining</div>
                  <div className="text-2xl">{Math.ceil((45 * (100 - progress)) / 100)} min</div>
                </div>

                {isPlaying && (
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="w-full bg-white/20 backdrop-blur-sm text-white py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-white/30 transition-all"
                  >
                    <Pause className="w-5 h-5" />
                    <span>Pause Session</span>
                  </button>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* Session Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 border border-gray-100"
        >
          <h3 className="text-gray-900 mb-4">Session Details</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="text-gray-900">{session.duration}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Intensity</div>
                  <div className="text-gray-900">{session.intensity}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Target Area</div>
                  <div className="text-gray-900">{session.bodyPart}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Scheduled</div>
                  <div className="text-gray-900">{session.date || 'Today'} • {session.time}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expected Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 border border-gray-100"
        >
          <h3 className="text-gray-900 mb-4">Expected Benefits</h3>
          <div className="space-y-3">
            {[
              { icon: Heart, text: 'Improved blood circulation', color: 'red' },
              { icon: Activity, text: 'Reduced muscle tension', color: 'blue' },
              { icon: TrendingUp, text: 'Enhanced recovery speed', color: 'green' },
              { icon: Zap, text: 'Better performance readiness', color: 'orange' }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    benefit.color === 'red' ? 'bg-red-50' :
                    benefit.color === 'blue' ? 'bg-blue-50' :
                    benefit.color === 'green' ? 'bg-green-50' :
                    'bg-orange-50'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      benefit.color === 'red' ? 'text-red-600' :
                      benefit.color === 'blue' ? 'text-blue-600' :
                      benefit.color === 'green' ? 'text-green-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <span className="text-gray-700 text-sm">{benefit.text}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Post-Session Actions */}
        {progress === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 rounded-2xl p-5 border border-green-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Session Complete!</h3>
                <p className="text-gray-600 text-sm">How did it go?</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-sm">
                Rate Session
              </button>
              <button className="flex-1 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 text-sm">
                Add Notes
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
