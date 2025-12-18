import React, { useState, lazy, Suspense } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import { Menu, Home, Activity, BarChart3, Bot, Settings, Bluetooth, User, Bell, LogOut, Heart } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { toast } from 'sonner';

// Lazy load tab components
const HomeTab = lazy(() => import('./home-tab').then(m => ({ default: m.HomeTab })));
const TherapyTab = lazy(() => import('./therapy-tab').then(m => ({ default: m.TherapyTab })));
const ReportsTab = lazy(() => import('./reports-tab').then(m => ({ default: m.ReportsTab })));
const AIAssistantTab = lazy(() => import('./ai-assistant-tab').then(m => ({ default: m.AIAssistantTab })));
const VoiceAssistant = lazy(() => import('./voice-assistant').then(m => ({ default: m.VoiceAssistant })));
const SettingsScreen = lazy(() => import('./settings-screen').then(m => ({ default: m.SettingsScreen })));
const NotificationsScreen = lazy(() => import('./notifications-screen').then(m => ({ default: m.NotificationsScreen })));
const ProfileSettingsScreen = lazy(() => import('./profile-settings-screen').then(m => ({ default: m.ProfileSettingsScreen })));

// Custom home screens based on profile type
const AthleteHomeScreen = lazy(() => import('./athlete-home-screen').then(m => ({ default: m.AthleteHomeScreen })));
const CoachHomeScreen = lazy(() => import('./coach-home-screen').then(m => ({ default: m.CoachHomeScreen })));
const HealthHomeScreen = lazy(() => import('./health-home-screen').then(m => ({ default: m.HealthHomeScreen })));

// Loading component for tabs
const TabLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-gray-500 text-sm">Loading...</p>
    </div>
  </div>
);

interface MainAppProps {
  user: any;
  isDeviceConnected: boolean;
  onDeviceConnection: (connected: boolean) => void;
  onUserUpdate?: (userData: any) => void;
}

type TabType = 'home' | 'therapy' | 'reports' | 'ai';
type ScreenType = 'main' | 'settings' | 'notifications' | 'profile';

export function MainApp({ user, isDeviceConnected, onDeviceConnection, onUserUpdate }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeScreen, setActiveScreen] = useState<ScreenType>('main');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [userData, setUserData] = useState(user);

  const handleNavigateToScreen = (screen: ScreenType) => {
    setActiveScreen(screen);
    setIsMenuOpen(false);
  };

  const handleBackToMain = () => {
    setActiveScreen('main');
  };

  const handleUserUpdate = (updatedData: any) => {
    setUserData(prev => ({ ...prev, ...updatedData }));
    if (onUserUpdate) {
      onUserUpdate(updatedData);
    }
  };

  const handleLogout = () => {
    setShowLogoutDialog(true);
    setIsMenuOpen(false);
  };

  const confirmLogout = () => {
    toast.success('Logged out successfully');
    // In a real app, this would navigate to login screen
    window.location.reload();
  };

  const renderActiveTab = () => {
    // Use custom home screen based on profile type
    if (activeTab === 'home' && userData?.profileType) {
      const homeProps = {
        userName: userData.name || 'User',
        level: userData.level || 'beginner',
        ageGroup: userData.level || '18-30',
        goal: userData.goal || 'wellness',
        coachType: userData.level || 'personal'
      };

      return (
        <Suspense fallback={<TabLoader />}>
          {userData.profileType === 'athlete' && <AthleteHomeScreen {...homeProps} />}
          {userData.profileType === 'coach' && <CoachHomeScreen {...homeProps} />}
          {userData.profileType === 'health' && <HealthHomeScreen {...homeProps} />}
          {!['athlete', 'coach', 'health'].includes(userData.profileType) && (
            <HomeTab 
              user={userData} 
              isDeviceConnected={isDeviceConnected} 
              onDeviceConnection={onDeviceConnection}
              onTabChange={setActiveTab}
              onNavigateToSettings={() => handleNavigateToScreen('settings')}
            />
          )}
        </Suspense>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <Suspense fallback={<TabLoader />}>
            <HomeTab 
              user={userData} 
              isDeviceConnected={isDeviceConnected} 
              onDeviceConnection={onDeviceConnection}
              onTabChange={setActiveTab}
              onNavigateToSettings={() => handleNavigateToScreen('settings')}
            />
          </Suspense>
        );
      case 'therapy':
        return (
          <Suspense fallback={<TabLoader />}>
            <TherapyTab user={userData} isDeviceConnected={isDeviceConnected} />
          </Suspense>
        );
      case 'reports':
        return (
          <Suspense fallback={<TabLoader />}>
            <ReportsTab user={userData} />
          </Suspense>
        );
      case 'ai':
        return (
          <Suspense fallback={<TabLoader />}>
            <AIAssistantTab user={userData} onShowVoice={() => setShowVoiceAssistant(true)} />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<TabLoader />}>
            <HomeTab user={userData} isDeviceConnected={isDeviceConnected} onDeviceConnection={onDeviceConnection} />
          </Suspense>
        );
    }
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'settings':
        return (
          <Suspense fallback={<TabLoader />}>
            <SettingsScreen onBack={handleBackToMain} />
          </Suspense>
        );
      case 'notifications':
        return (
          <Suspense fallback={<TabLoader />}>
            <NotificationsScreen onBack={handleBackToMain} />
          </Suspense>
        );
      case 'profile':
        return (
          <Suspense fallback={<TabLoader />}>
            <ProfileSettingsScreen user={userData} onBack={handleBackToMain} onUpdate={handleUserUpdate} />
          </Suspense>
        );
      case 'main':
      default:
        return (
          <>
            {/* Status Bar */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
              <div className="flex items-center justify-between">
                {/* Left: Menu & Logo */}
                <div className="flex items-center space-x-3">
                  <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100">
                        <Menu className="w-6 h-6 text-gray-700" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 p-0">
                      <div className="flex flex-col h-full">
                        <SheetHeader className="p-6 pb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                              <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <SheetTitle className="text-lg">SmartHeal</SheetTitle>
                              <SheetDescription className="text-sm text-gray-500">by Runverve</SheetDescription>
                            </div>
                          </div>
                        </SheetHeader>
                        
                        <div className="flex-1 overflow-y-auto px-6">
                          <div className="space-y-6 pb-6">
                            {/* User Profile */}
                            <button
                              onClick={() => handleNavigateToScreen('profile')}
                              className="w-full flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-red-600" />
                              </div>
                              <div className="flex-1 text-left">
                                <h3 className="font-medium text-gray-900">{userData?.name || 'User'}</h3>
                                <p className="text-sm text-gray-500">{userData?.email}</p>
                              </div>
                            </button>

                            {/* Device Status */}
                            <div className="space-y-3">
                              <h4 className="font-medium text-gray-900">Device Status</h4>
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <Bluetooth className="w-4 h-4 text-blue-600" />
                                  <span className="text-sm">SmartHeal ITT Device</span>
                                </div>
                                <Badge variant={isDeviceConnected ? "default" : "secondary"} className={isDeviceConnected ? "bg-green-600" : ""}>
                                  {isDeviceConnected ? 'Connected' : 'Disconnected'}
                                </Badge>
                              </div>
                            </div>

                            {/* Menu Items */}
                            <div className="space-y-2">
                              <Button
                                variant="ghost"
                                className="w-full justify-start space-x-3 h-12"
                                onClick={() => handleNavigateToScreen('settings')}
                              >
                                <Settings className="w-5 h-5" />
                                <span>Settings</span>
                              </Button>
                              
                              <Button
                                variant="ghost"
                                className="w-full justify-start space-x-3 h-12"
                                onClick={() => handleNavigateToScreen('notifications')}
                              >
                                <Bell className="w-5 h-5" />
                                <span>Notifications</span>
                                <Badge variant="default" className="ml-auto bg-red-600">3</Badge>
                              </Button>
                              
                              <Button
                                variant="ghost"
                                className="w-full justify-start space-x-3 h-12"
                                onClick={() => handleNavigateToScreen('profile')}
                              >
                                <User className="w-5 h-5" />
                                <span>Profile Settings</span>
                              </Button>
                              
                              <div className="border-t border-gray-200 my-2"></div>
                              
                              <Button
                                variant="ghost"
                                className="w-full justify-start space-x-3 h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={handleLogout}
                              >
                                <LogOut className="w-5 h-5" />
                                <span>Sign Out</span>
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 bg-gray-50">
                          <div className="text-xs text-gray-500 text-center">
                            <p>SmartHeal v2.4.1</p>
                            <p className="mt-1">© 2025 Runverve Inc.</p>
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>

                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">SmartHeal</span>
                  </div>
                </div>

                {/* Right: Device Status & Notifications */}
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 relative"
                    onClick={() => handleNavigateToScreen('notifications')}
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isDeviceConnected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm text-gray-600 hidden sm:inline">
                      {isDeviceConnected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="pb-20">
              {renderActiveTab()}
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 sm:px-4 py-2 z-40 shadow-lg safe-area-bottom">
              <div className="flex items-center justify-around max-w-lg mx-auto">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`flex flex-col items-center space-y-1 p-2 px-4 rounded-lg transition-all ${
                    activeTab === 'home' 
                      ? 'text-red-500 bg-red-50' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  <Home className="w-6 h-6" />
                  <span className="text-xs font-medium">Home</span>
                </button>

                <button
                  onClick={() => setActiveTab('therapy')}
                  className={`flex flex-col items-center space-y-1 p-2 px-4 rounded-lg transition-all ${
                    activeTab === 'therapy' 
                      ? 'text-red-500 bg-red-50' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  <Activity className="w-6 h-6" />
                  <span className="text-xs font-medium">Therapy</span>
                </button>

                <button
                  onClick={() => setActiveTab('reports')}
                  className={`flex flex-col items-center space-y-1 p-2 px-4 rounded-lg transition-all ${
                    activeTab === 'reports' 
                      ? 'text-red-500 bg-red-50' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  <BarChart3 className="w-6 h-6" />
                  <span className="text-xs font-medium">Reports</span>
                </button>

                <button
                  onClick={() => setActiveTab('ai')}
                  className={`flex flex-col items-center space-y-1 p-2 px-4 rounded-lg transition-all ${
                    activeTab === 'ai' 
                      ? 'text-red-500 bg-red-50' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  <Bot className="w-6 h-6" />
                  <span className="text-xs font-medium">AI</span>
                </button>
              </div>
            </nav>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderActiveScreen()}

      {/* Voice Assistant Overlay */}
      {showVoiceAssistant && (
        <Suspense fallback={null}>
          <VoiceAssistant onClose={() => setShowVoiceAssistant(false)} />
        </Suspense>
      )}

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out? Your therapy data will be safely stored and available when you log back in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout} className="bg-red-500 hover:bg-red-600">
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default MainApp;