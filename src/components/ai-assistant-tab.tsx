import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { 
  Bot, Mic, MicOff, Send, Volume2, VolumeX, 
  Brain, Heart, Lightbulb, Calendar, HelpCircle,
  MessageSquare, Zap, Target, Clock, Activity
} from 'lucide-react';

interface AIAssistantTabProps {
  user: any;
  onShowVoice: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function AIAssistantTab({ user, onShowVoice }: AIAssistantTabProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello ${user?.name?.split(' ')[0] || 'there'}! I'm your SmartHeal AI Assistant. I'm here to help you with therapy guidance, answer questions, and provide personalized recommendations. How can I assist you today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const quickSuggestions = [
    { icon: Target, text: "Best placement for lower back pain", category: "guidance" },
    { icon: Clock, text: "How long should my session be?", category: "duration" },
    { icon: Zap, text: "What intensity level should I use?", category: "settings" },
    { icon: Calendar, text: "Create a therapy schedule", category: "planning" },
    { icon: Activity, text: "Track my progress", category: "progress" },
    { icon: Brain, text: "Explain how ITT therapy works", category: "education" }
  ];

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('pain') || lowerMessage.includes('hurt')) {
      return "I understand you're experiencing pain. Based on your profile, I recommend starting with a gentle intensity (Level 2-3) for 15-20 minutes. For best results with pain relief, place the electrodes on either side of the pain area, maintaining at least 2 inches between them. Would you like me to guide you through the placement process?";
    } else if (lowerMessage.includes('intensity') || lowerMessage.includes('level')) {
      return "For intensity levels, I recommend starting conservatively:\n\n• Beginners: Level 1-3\n• Experienced: Level 4-6\n• Advanced: Level 7+\n\nYou should feel a tingling sensation without discomfort. Always start low and gradually increase. Your current profile suggests Level 3 would be optimal for you.";
    } else if (lowerMessage.includes('time') || lowerMessage.includes('duration')) {
      return "Session duration depends on your goals:\n\n• Pain relief: 15-20 minutes\n• Muscle recovery: 20-30 minutes\n• Stress relief: 10-15 minutes\n\nBased on your therapy history, 20-minute sessions have shown the best results for you. Would you like me to set a timer for your next session?";
    } else if (lowerMessage.includes('placement') || lowerMessage.includes('electrode')) {
      return "Proper electrode placement is crucial for effective therapy. I can provide visual guidance using your device's camera, or walk you through manual placement. The key principles are:\n\n• Clean, dry skin\n• 2+ inches between electrodes\n• Avoid joints and bony areas\n• Target the muscle group or pain area\n\nWould you like to start the AI placement guidance feature?";
    } else if (lowerMessage.includes('schedule') || lowerMessage.includes('routine')) {
      return "Based on your goals and availability, I suggest this therapy schedule:\n\n• Morning: 20 min pain relief session\n• Afternoon: 15 min muscle recovery (if needed)\n• Evening: 10 min stress relief session\n\nThis provides optimal spacing for tissue recovery. Shall I create reminders for these sessions?";
    } else {
      return "I'm here to help with all aspects of your ITT therapy. I can assist with electrode placement, session planning, intensity recommendations, and answer any questions about your treatment. Feel free to ask me anything about your therapy or use voice commands for hands-free interaction!";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="px-4 py-6 space-y-6 pb-24 max-h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Assistant</h1>
        <p className="text-gray-600">Your personal therapy guide</p>
      </div>

      {/* Voice Controls */}
      <Card className="smart-heal-card border-purple-200 bg-purple-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-purple-900">Voice Control</h3>
                <p className="text-sm text-purple-700">Hands-free assistance</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                className="border-purple-300 text-purple-700 hover:bg-purple-100"
              >
                {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onShowVoice}
                className="border-purple-300 text-purple-700 hover:bg-purple-100"
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Suggestions */}
      <Card className="smart-heal-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <span>Quick Help</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start space-x-3 h-auto p-3 text-left"
                onClick={() => handleSendMessage(suggestion.text)}
              >
                <suggestion.icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm">{suggestion.text}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="smart-heal-card flex-1 flex flex-col min-h-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <span>Chat</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0 p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.type === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-600">SmartHeal AI</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-red-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about your therapy..."
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(inputMessage);
                  }
                }}
              />
              <Button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim()}
                className="bg-red-500 hover:bg-red-600 text-white px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Capabilities */}
      <Card className="smart-heal-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-green-500" />
            <span>AI Capabilities</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Target, text: "Placement Guidance", desc: "Visual electrode positioning" },
              { icon: Calendar, text: "Schedule Planning", desc: "Optimal therapy timing" },
              { icon: Activity, text: "Progress Analysis", desc: "Performance insights" },
              { icon: HelpCircle, text: "Expert Advice", desc: "Clinical recommendations" }
            ].map((capability, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <capability.icon className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900">{capability.text}</h3>
                <p className="text-xs text-gray-500">{capability.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card className="smart-heal-card border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-green-900">AI Status: Active</h3>
              <p className="text-sm text-green-700">Learning from your therapy patterns</p>
            </div>
            <Badge variant="outline" className="border-green-300 text-green-700">
              Online
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
