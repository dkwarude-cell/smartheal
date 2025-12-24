import React, { useMemo, useState } from 'react';
import { Sparkles, Target, Camera, Wand2, Mic, Play, Square, Clock, Star, Gauge, ShieldCheck, Bot, Activity, Zap } from 'lucide-react';
import { TherapySession } from '../../types/session.types';

interface Props {
  sessions?: TherapySession[];
  onStartNew?: () => void;
  onConnectDevice?: () => void;
}

const defaultSessions: TherapySession[] = [];

const quickPrograms = [
  { id: 'pain', name: 'Pain Relief', duration: 20, level: 5, icon: <Zap className="w-5 h-5 text-blue-600" /> },
  { id: 'recovery', name: 'Muscle Recovery', duration: 25, level: 3, icon: <Target className="w-5 h-5 text-blue-600" /> },
  { id: 'stress', name: 'Stress Relief', duration: 15, level: 2, icon: <Sparkles className="w-5 h-5 text-blue-600" /> },
  { id: 'custom', name: 'Custom Program', duration: 0, level: 3, icon: <Wand2 className="w-5 h-5 text-blue-600" /> }
];

const recentSessions = [
  { id: 'r1', name: 'Pain Relief', detail: 'Today 2:30 PM • 23 min' },
  { id: 'r2', name: 'Muscle Recovery', detail: 'Today 9:15 AM • 20 min' },
  { id: 'r3', name: 'Stress Relief', detail: 'Yesterday 7:45 PM • 25 min' }
];

export const AthleteTherapyTab: React.FC<Props> = ({ sessions = defaultSessions, onStartNew, onConnectDevice }) => {
  const [mode, setMode] = useState<'guided' | 'pro'>('guided');
  const [intensity, setIntensity] = useState(3);
  const [isConnected, setIsConnected] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const modeCopy = useMemo(
    () => ({
      guided: {
        title: 'AI-Guided Session',
        desc: 'Perfect for beginners. Real-time placement guidance, automated intensity, and voice instructions.',
        chips: ['Auto-adjustment', 'Voice guidance', 'Safety monitoring']
      },
      pro: {
        title: 'Pro Mode Session',
        desc: 'Manual control with pro presets, advanced targeting, and intensity fine-tuning.',
        chips: ['Manual control', 'Advanced targeting', 'Preset sharing']
      }
    }),
    []
  );

  const formattedTime = useMemo(() => {
    const mins = Math.floor(elapsed / 60)
      .toString()
      .padStart(2, '0');
    const secs = (elapsed % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }, [elapsed]);

  const handleStart = () => {
    setIsRunning(true);
    setElapsed(0);
    onStartNew?.();
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const connectDevice = () => {
    setIsConnected(true);
    onConnectDevice?.();
  };

  return (
    <div className="space-y-5 p-4 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Therapy Center</h2>
          <p className="text-sm text-gray-600">Guided and Pro workflows with AI assist</p>
        </div>
        <button
          onClick={onStartNew}
          className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition shadow-sm"
        >
          Start New
        </button>
      </div>

      <div className="flex rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        {['guided', 'pro'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m as 'guided' | 'pro')}
            className={`flex-1 py-3 text-sm font-semibold transition ${
              mode === m ? 'bg-blue-50 text-blue-700' : 'text-gray-600'
            }`}
          >
            {m === 'guided' ? 'Guided Mode' : 'Pro Mode'}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <Bot className="w-6 h-6 text-blue-600 mt-0.5" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-blue-800">{modeCopy[mode].title}</h3>
            <p className="text-sm text-blue-800/80 leading-relaxed">{modeCopy[mode].desc}</p>
            <div className="flex flex-wrap gap-2">
              {modeCopy[mode].chips.map((c) => (
                <span key={c} className="px-2.5 py-1 rounded-full bg-white text-xs font-semibold text-blue-700 shadow-sm">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-rose-500 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-semibold text-rose-700">Target Area Selection</h4>
              <p className="text-sm text-rose-700/80">Select the body parts you want to target for therapy.</p>
            </div>
          </div>
          <button className="mt-3 w-full rounded-xl bg-rose-500 text-white font-semibold py-3 hover:bg-rose-600 transition">
            Select Body Parts
          </button>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 shadow-sm space-y-3">
          <div className="flex items-start gap-3">
            <Camera className="w-5 h-5 text-emerald-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-700">AI Camera Analysis</h4>
              <p className="text-sm text-emerald-700/80">Capture a photo and get AI-powered recommendations.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="rounded-lg bg-emerald-600 text-white py-3 font-semibold hover:bg-emerald-700 transition">Capture Photo</button>
            <button className="rounded-lg border border-emerald-200 text-emerald-800 py-3 font-semibold hover:bg-white transition">Manual Select</button>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-white p-3 text-center text-sm text-emerald-700">
            AI Accuracy: 94.2% • Powered by Vertex AI
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 space-y-4">
        <div className="flex items-center gap-2 text-gray-900 font-semibold">
          <Activity className="w-5 h-5 text-gray-700" />
          <span>Session Control</span>
        </div>
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-center space-y-3">
          <p className="text-sm text-gray-600">{isConnected ? 'Device connected' : 'Device not connected'}</p>
          <button
            onClick={connectDevice}
            className="px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold hover:bg-black transition"
          >
            {isConnected ? 'Connected' : 'Connect Device'}
          </button>
        </div>

        <div className="text-center space-y-2">
          <div className="text-4xl font-extrabold text-gray-900 tracking-tight">{formattedTime}</div>
          <p className="text-sm text-gray-500">Session Duration</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-700">
            <span>Intensity Level</span>
            <span className="px-2 py-1 rounded-full bg-gray-100 text-xs font-semibold">Level {intensity}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIntensity((v) => Math.max(1, v - 1))}
              className="w-10 h-10 rounded-lg border border-gray-200 text-lg font-semibold text-gray-700"
            >
              -
            </button>
            <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-gray-800 transition-all"
                style={{ width: `${(intensity / 6) * 100}%` }}
              />
            </div>
            <button
              onClick={() => setIntensity((v) => Math.min(6, v + 1))}
              className="w-10 h-10 rounded-lg border border-gray-200 text-lg font-semibold text-gray-700"
            >
              +
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={handleStart}
            className="py-3 rounded-xl bg-rose-500 text-white font-semibold shadow-sm hover:bg-rose-600"
          >
            <div className="flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Start
            </div>
          </button>
          <button
            onClick={handleStop}
            className="py-3 rounded-xl border border-gray-200 text-gray-800 font-semibold hover:bg-gray-50"
          >
            <div className="flex items-center justify-center gap-2">
              <Square className="w-4 h-4" />
              Stop
            </div>
          </button>
          <button className="py-3 rounded-xl border border-gray-200 text-gray-800 font-semibold hover:bg-gray-50">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Timer
            </div>
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 space-y-3">
        <h4 className="text-base font-semibold text-gray-900">Quick Start Programs</h4>
        <div className="space-y-3">
          {quickPrograms.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center">
                  {p.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.duration ? `${p.duration} min` : 'Variable'} • Level {p.level}</p>
                </div>
              </div>
              <button className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-white">Load</button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4 shadow-sm space-y-3">
        <div className="flex items-start gap-3">
          <Mic className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-purple-800">Voice Control</h4>
            <p className="text-sm text-purple-800/80">Hands-free commands to run your session.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="rounded-lg bg-purple-600 text-white py-3 font-semibold hover:bg-purple-700 transition">Start Listening</button>
          <button className="rounded-lg border border-purple-200 text-purple-800 py-3 font-semibold hover:bg-white transition">Commands</button>
        </div>
        <ul className="text-xs text-purple-800/80 space-y-1">
          <li>• "Start session" • "Increase intensity"</li>
          <li>• "Pause session" • "Decrease intensity"</li>
          <li>• "Stop session"</li>
        </ul>
      </div>

      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 space-y-3">
        <h4 className="text-base font-semibold text-gray-900">Recent Sessions</h4>
        <div className="space-y-2">
          {recentSessions.map((s) => (
            <div key={s.id} className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{s.name}</p>
                <p className="text-xs text-gray-500">{s.detail}</p>
              </div>
              <div className="flex gap-1 text-amber-400" aria-label="rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="w-full rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50">View All Sessions</button>
      </div>
    </div>
  );
};

export default AthleteTherapyTab;
