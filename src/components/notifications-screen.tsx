import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Bell, 
  CheckCircle2, 
  Clock,
  Activity,
  Zap,
  AlertCircle,
  Calendar,
  Trophy,
  TrendingUp,
  Settings,
  Trash2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface NotificationsScreenProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  type: 'therapy' | 'device' | 'achievement' | 'reminder' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
  color: string;
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'therapy',
      title: 'Therapy Session Complete',
      message: 'Great job! You completed a 30-minute pain relief session.',
      time: '5 min ago',
      read: false,
      icon: CheckCircle2,
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Time for Your Therapy',
      message: 'Your scheduled lower back therapy session starts in 15 minutes.',
      time: '15 min ago',
      read: false,
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      id: '3',
      type: 'achievement',
      title: 'New Achievement Unlocked! 🎉',
      message: 'Week Warrior - Completed 7 consecutive days of therapy',
      time: '1 hour ago',
      read: false,
      icon: Trophy,
      color: 'text-yellow-600'
    },
    {
      id: '4',
      type: 'device',
      title: 'Device Battery Low',
      message: 'Your SmartHeal device battery is at 15%. Please charge soon.',
      time: '2 hours ago',
      read: true,
      icon: AlertCircle,
      color: 'text-orange-600'
    },
    {
      id: '5',
      type: 'therapy',
      title: 'Recovery Progress Update',
      message: 'Your pain score improved by 25% this week. Keep it up!',
      time: '3 hours ago',
      read: true,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      id: '6',
      type: 'reminder',
      title: 'Daily Goal Reminder',
      message: 'You have 1 more session to complete today\'s goal.',
      time: '5 hours ago',
      read: true,
      icon: Activity,
      color: 'text-blue-600'
    },
    {
      id: '7',
      type: 'system',
      title: 'App Update Available',
      message: 'Version 2.5.0 is available with new AI features.',
      time: '1 day ago',
      read: true,
      icon: Settings,
      color: 'text-gray-600'
    },
    {
      id: '8',
      type: 'therapy',
      title: 'Weekly Report Ready',
      message: 'Your therapy summary for the week is now available.',
      time: '1 day ago',
      read: true,
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      id: '9',
      type: 'device',
      title: 'Device Connected',
      message: 'SmartHeal ITT device connected successfully.',
      time: '2 days ago',
      read: true,
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      id: '10',
      type: 'achievement',
      title: 'First Session Complete! 🎊',
      message: 'Congratulations on completing your first therapy session.',
      time: '2 days ago',
      read: true,
      icon: Trophy,
      color: 'text-yellow-600'
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filterNotifications = (type: string) => {
    if (type === 'all') return notifications;
    if (type === 'unread') return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === type);
  };

  const renderNotification = (notification: Notification) => {
    const Icon = notification.icon;
    
    return (
      <Card 
        key={notification.id}
        className={`p-4 mb-3 cursor-pointer transition-all ${
          !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'
        }`}
        onClick={() => markAsRead(notification.id)}
      >
        <div className="flex items-start space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            !notification.read ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            <Icon className={`w-5 h-5 ${notification.color}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className={`${!notification.read ? 'font-semibold' : 'font-medium'} text-gray-900`}>
                {notification.title}
              </h3>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 flex-shrink-0 mt-1"></div>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{notification.time}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notification.id);
                }}
                className="h-8 px-2 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-500">{unreadCount} unread</p>
                )}
              </div>
            </div>
            
            {notifications.length > 0 && (
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Mark all read
                  </Button>
                )}
              </div>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all">
                All
                {notifications.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {notifications.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="default" className="ml-2 bg-blue-600">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="therapy">
                Therapy
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-sm text-gray-500">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filterNotifications(activeTab).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No {activeTab} notifications</p>
              </div>
            ) : (
              <>
                {filterNotifications(activeTab).map(notification => 
                  renderNotification(notification)
                )}
                
                {activeTab === 'all' && notifications.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={clearAll}
                    className="w-full mt-4 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All Notifications
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
