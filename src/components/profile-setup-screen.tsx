import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Heart, User, Calendar, Weight, Ruler, Activity, Target, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface ProfileSetupScreenProps {
  onNavigate: (screen: string) => void;
  onUserUpdate: (userData: any) => void;
  user: any;
}

export function ProfileSetupScreen({ onNavigate, onUserUpdate, user }: ProfileSetupScreenProps) {
  const [profileData, setProfileData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    activityLevel: '',
    medicalConditions: [] as string[],
    goals: [] as string[]
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 3;

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (field: 'medicalConditions' | 'goals', value: string, checked: boolean) => {
    setProfileData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleComplete = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onUserUpdate({
        ...profileData,
        age: parseInt(profileData.age),
        weight: parseFloat(profileData.weight),
        height: parseFloat(profileData.height)
      });
      setIsLoading(false);
      onNavigate('welcome');
    }, 1500);
  };

  const medicalConditionOptions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Arthritis', 
    'Back Pain', 'Knee Pain', 'Chronic Pain', 'None'
  ];

  const goalOptions = [
    'Pain Relief', 'Muscle Recovery', 'Improved Mobility', 
    'Stress Reduction', 'Better Sleep', 'General Wellness'
  ];

  const progressPercentage = (currentStep / totalSteps) * 100;

  const isStepValid = () => {
    if (currentStep === 1) {
      return profileData.age && profileData.gender && profileData.weight && profileData.height && profileData.activityLevel;
    }
    if (currentStep === 2) {
      return profileData.medicalConditions.length > 0;
    }
    if (currentStep === 3) {
      return profileData.goals.length > 0;
    }
    return false;
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onNavigate('otp');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-white/50 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
          <div className="w-7 h-7 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">SmartHeal</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 px-6 mb-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-red-500">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-2 bg-white/50 backdrop-blur-sm rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {/* Step Indicators */}
          <div className="flex justify-between mt-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep > step 
                    ? 'bg-gradient-to-br from-green-400 to-green-500 shadow-lg' 
                    : currentStep === step 
                    ? 'bg-gradient-to-br from-red-500 to-orange-500 shadow-lg ring-4 ring-red-200' 
                    : 'bg-white/50 backdrop-blur-sm'
                }`}>
                  {currentStep > step ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <span className={`text-sm font-bold ${currentStep === step ? 'text-white' : 'text-gray-400'}`}>
                      {step}
                    </span>
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium ${currentStep >= step ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step === 1 ? 'Basic' : step === 2 ? 'Health' : 'Goals'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-32">
        <div className="max-w-md mx-auto">
          {/* Header with Animation */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-orange-500 to-pink-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                {currentStep === 1 && <User className="w-10 h-10 text-white" />}
                {currentStep === 2 && <Activity className="w-10 h-10 text-white" />}
                {currentStep === 3 && <Target className="w-10 h-10 text-white" />}
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              {currentStep === 1 && 'Basic Information'}
              {currentStep === 2 && 'Medical History'}
              {currentStep === 3 && 'Your Goals'}
            </h1>
            <p className="text-gray-600">
              {currentStep === 1 && 'Help us personalize your therapy experience'}
              {currentStep === 2 && 'Share your health information for better care'}
              {currentStep === 3 && 'What do you want to achieve?'}
            </p>
          </div>

          {/* Form Cards */}
          <div className="space-y-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-scale-in">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500"></div>
                  <CardContent className="p-6 space-y-4">{/* Basic Info Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-gray-700 flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-red-500" />
                          <span>Age</span>
                        </Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="25"
                          value={profileData.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-gray-700">Gender</Label>
                        <Select value={profileData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                          <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight" className="text-gray-700 flex items-center space-x-2">
                          <Weight className="w-4 h-4 text-red-500" />
                          <span>Weight (kg)</span>
                        </Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="70"
                          value={profileData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="height" className="text-gray-700 flex items-center space-x-2">
                          <Ruler className="w-4 h-4 text-red-500" />
                          <span>Height (cm)</span>
                        </Label>
                        <Input
                          id="height"
                          type="number"
                          placeholder="175"
                          value={profileData.height}
                          onChange={(e) => handleInputChange('height', e.target.value)}
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700 flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-red-500" />
                        <span>Activity Level</span>
                      </Label>
                      <Select value={profileData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
                        <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all">
                          <SelectValue placeholder="Select your activity level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">🪑 Sedentary (Little to no exercise)</SelectItem>
                          <SelectItem value="light">🚶 Light (1-3 days/week)</SelectItem>
                          <SelectItem value="moderate">🏃 Moderate (3-5 days/week)</SelectItem>
                          <SelectItem value="active">💪 Active (6-7 days/week)</SelectItem>
                          <SelectItem value="very-active">🔥 Very Active (2x/day or intense)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Medical Conditions */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-scale-in">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500"></div>
                  <CardContent className="p-6 space-y-4">
                    <Label className="text-gray-700">Do you have any of these conditions?</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {medicalConditionOptions.map((condition) => (
                        <label
                          key={condition}
                          className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                            profileData.medicalConditions.includes(condition)
                              ? 'border-red-500 bg-red-50 shadow-md'
                              : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                          }`}
                        >
                          <Checkbox
                            id={condition}
                            checked={profileData.medicalConditions.includes(condition)}
                            onCheckedChange={(checked) => 
                              handleArrayFieldChange('medicalConditions', condition, checked as boolean)
                            }
                            className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                          />
                          <span className={`flex-1 font-medium ${
                            profileData.medicalConditions.includes(condition) ? 'text-red-700' : 'text-gray-700'
                          }`}>
                            {condition}
                          </span>
                          {profileData.medicalConditions.includes(condition) && (
                            <CheckCircle2 className="w-5 h-5 text-red-500" />
                          )}
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Goals */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-scale-in">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500"></div>
                  <CardContent className="p-6 space-y-4">
                    <Label className="text-gray-700">What are your primary goals?</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {goalOptions.map((goal, index) => {
                        const icons = ['🎯', '💪', '🧘', '😌', '😴', '✨'];
                        return (
                          <label
                            key={goal}
                            className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                              profileData.goals.includes(goal)
                                ? 'border-red-500 bg-red-50 shadow-md transform scale-105'
                                : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                            }`}
                          >
                            <Checkbox
                              id={goal}
                              checked={profileData.goals.includes(goal)}
                              onCheckedChange={(checked) => 
                                handleArrayFieldChange('goals', goal, checked as boolean)
                              }
                              className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                            />
                            <span className="text-2xl">{icons[index]}</span>
                            <span className={`flex-1 font-medium ${
                              profileData.goals.includes(goal) ? 'text-red-700' : 'text-gray-700'
                            }`}>
                              {goal}
                            </span>
                            {profileData.goals.includes(goal) && (
                              <CheckCircle2 className="w-5 h-5 text-red-500" />
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 p-6 shadow-2xl z-20">
        <div className="max-w-md mx-auto space-y-3">
          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="w-full h-14 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 hover:from-red-600 hover:via-orange-600 hover:to-pink-600 text-white rounded-xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              <span className="font-semibold">Continue</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={isLoading || !isStepValid()}
              className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-xl disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-semibold">Saving Profile...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold">Complete Setup</span>
                </div>
              )}
            </Button>
          )}
          
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => onNavigate('welcome')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Skip for now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetupScreen;