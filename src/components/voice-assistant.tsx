import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Mic, MicOff, Volume2, X, Zap, Play, Pause, Square } from 'lucide-react';

interface VoiceAssistantProps {
  onClose: () => void;
}

export function VoiceAssistant({ onClose }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [response, setResponse] = useState('');

  const startListening = () => {
    setIsListening(true);
    setTranscribedText('');
    setResponse('');
    
    // Simulate speech recognition
    setTimeout(() => {
      setTranscribedText("Start therapy session at medium intensity");
      setIsListening(false);
      setIsProcessing(true);
      
      setTimeout(() => {
        setResponse("Starting therapy session at medium intensity level 5. Session duration set to 20 minutes. Please ensure electrodes are properly placed before beginning.");
        setIsProcessing(false);
      }, 1500);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Voice Assistant</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center space-y-6">
            {/* Microphone Button */}
            <div className="relative">
              <Button
                size="lg"
                onClick={isListening ? stopListening : startListening}
                className={`w-24 h-24 rounded-full ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
                disabled={isProcessing}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
              
              {isListening && (
                <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              {isListening && (
                <p className="text-blue-600 font-medium">Listening...</p>
              )}
              {isProcessing && (
                <p className="text-orange-600 font-medium">Processing...</p>
              )}
              {!isListening && !isProcessing && !transcribedText && (
                <p className="text-gray-600">Tap to start voice control</p>
              )}
            </div>

            {/* Transcribed Text */}
            {transcribedText && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">You said:</p>
                <p className="font-medium text-blue-900">"{transcribedText}"</p>
              </div>
            )}

            {/* AI Response */}
            {response && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Volume2 className="w-4 h-4 text-green-600" />
                  <p className="text-sm text-green-800">SmartHeal AI:</p>
                </div>
                <p className="text-green-900">{response}</p>
              </div>
            )}

            {/* Voice Commands */}
            <div className="text-left">
              <h3 className="font-medium text-gray-900 mb-3">Voice Commands:</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• "Start therapy session"</p>
                <p>• "Increase intensity"</p>
                <p>• "Decrease intensity"</p>
                <p>• "Pause session"</p>
                <p>• "Stop session"</p>
                <p>• "How long is my session?"</p>
                <p>• "Show my progress"</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Play className="w-3 h-3 mr-1" />
                Start
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Pause className="w-3 h-3 mr-1" />
                Pause
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Square className="w-3 h-3 mr-1" />
                Stop
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}