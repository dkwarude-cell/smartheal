import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showActivityPicker, setShowActivityPicker] = useState(false);
  const totalSteps = 3;

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (field: 'medicalConditions' | 'goals', value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleComplete = async () => {
    setIsLoading(true);
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

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const activityOptions = [
    { value: 'sedentary', label: '🪑 Sedentary', desc: 'Little to no exercise' },
    { value: 'light', label: '🚶 Light', desc: '1-3 days/week' },
    { value: 'moderate', label: '🏃 Moderate', desc: '3-5 days/week' },
    { value: 'active', label: '💪 Active', desc: '6-7 days/week' },
    { value: 'very-active', label: '🔥 Very Active', desc: '2x/day or intense' }
  ];

  const medicalConditionOptions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Arthritis', 
    'Back Pain', 'Knee Pain', 'Chronic Pain', 'None'
  ];

  const goalOptions = [
    { label: 'Pain Relief', icon: '🎯' },
    { label: 'Muscle Recovery', icon: '💪' },
    { label: 'Improved Mobility', icon: '🧘' },
    { label: 'Stress Reduction', icon: '😌' },
    { label: 'Better Sleep', icon: '😴' },
    { label: 'General Wellness', icon: '✨' }
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

  const renderStepIcon = () => {
    switch (currentStep) {
      case 1: return 'account';
      case 2: return 'heart-pulse';
      case 3: return 'target';
      default: return 'account';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FEF2F2', '#FFF7ED', '#FDF2F8']} style={styles.background}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Icon name="arrow-left" size={20} color="#374151" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          
          <View style={styles.logo}>
            <LinearGradient colors={['#EF4444', '#F97316']} style={styles.logoIcon}>
              <Icon name="heart" size={16} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.logoText}>SmartHeal</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>Step {currentStep} of {totalSteps}</Text>
            <Text style={styles.progressPercent}>{Math.round(progressPercentage)}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <LinearGradient 
              colors={['#EF4444', '#F97316', '#EC4899']} 
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${progressPercentage}%` }]}
            />
          </View>
          
          {/* Step Indicators */}
          <View style={styles.stepIndicators}>
            {[1, 2, 3].map((step) => (
              <View key={step} style={styles.stepItem}>
                {currentStep > step ? (
                  <LinearGradient colors={['#34D399', '#10B981']} style={styles.stepCircle}>
                    <Icon name="check" size={16} color="#FFFFFF" />
                  </LinearGradient>
                ) : currentStep === step ? (
                  <LinearGradient colors={['#EF4444', '#F97316']} style={[styles.stepCircle, styles.activeStepCircle]}>
                    <Text style={styles.stepNumber}>{step}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.stepCircleInactive}>
                    <Text style={styles.stepNumberInactive}>{step}</Text>
                  </View>
                )}
                <Text style={[styles.stepLabel, currentStep >= step && styles.stepLabelActive]}>
                  {step === 1 ? 'Basic' : step === 2 ? 'Health' : 'Goals'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {/* Step Header */}
          <View style={styles.stepHeader}>
            <View style={styles.iconWrapper}>
              <LinearGradient colors={['#EF4444', '#F97316', '#EC4899']} style={styles.stepIconBg}>
                <Icon name={renderStepIcon()} size={32} color="#FFFFFF" />
              </LinearGradient>
              <Icon name="star-four-points" size={20} color="#FBBF24" style={styles.sparkle} />
            </View>
            <Text style={styles.stepTitle}>
              {currentStep === 1 && 'Basic Information'}
              {currentStep === 2 && 'Medical History'}
              {currentStep === 3 && 'Your Goals'}
            </Text>
            <Text style={styles.stepSubtitle}>
              {currentStep === 1 && 'Help us personalize your therapy experience'}
              {currentStep === 2 && 'Share your health information for better care'}
              {currentStep === 3 && 'What do you want to achieve?'}
            </Text>
          </View>

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <View style={styles.card}>
              <LinearGradient colors={['#EF4444', '#F97316', '#EC4899']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.cardAccent} />
              
              <View style={styles.inputRow}>
                <View style={styles.inputHalf}>
                  <View style={styles.labelRow}>
                    <Icon name="calendar" size={16} color="#EF4444" />
                    <Text style={styles.label}>Age</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="25"
                    placeholderTextColor="#9CA3AF"
                    value={profileData.age}
                    onChangeText={(value) => handleInputChange('age', value)}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputHalf}>
                  <Text style={styles.label}>Gender</Text>
                  <TouchableOpacity 
                    style={styles.selectButton}
                    onPress={() => setShowGenderPicker(!showGenderPicker)}
                  >
                    <Text style={profileData.gender ? styles.selectValue : styles.selectPlaceholder}>
                      {genderOptions.find(g => g.value === profileData.gender)?.label || 'Select'}
                    </Text>
                    <Icon name="chevron-down" size={18} color="#6B7280" />
                  </TouchableOpacity>
                  {showGenderPicker && (
                    <View style={styles.pickerDropdown}>
                      {genderOptions.map((option) => (
                        <TouchableOpacity 
                          key={option.value}
                          style={styles.pickerOption}
                          onPress={() => {
                            handleInputChange('gender', option.value);
                            setShowGenderPicker(false);
                          }}
                        >
                          <Text style={styles.pickerOptionText}>{option.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputHalf}>
                  <View style={styles.labelRow}>
                    <Icon name="weight" size={16} color="#EF4444" />
                    <Text style={styles.label}>Weight (kg)</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="70"
                    placeholderTextColor="#9CA3AF"
                    value={profileData.weight}
                    onChangeText={(value) => handleInputChange('weight', value)}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputHalf}>
                  <View style={styles.labelRow}>
                    <Icon name="human-male-height" size={16} color="#EF4444" />
                    <Text style={styles.label}>Height (cm)</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="175"
                    placeholderTextColor="#9CA3AF"
                    value={profileData.height}
                    onChangeText={(value) => handleInputChange('height', value)}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.inputFull}>
                <View style={styles.labelRow}>
                  <Icon name="run" size={16} color="#EF4444" />
                  <Text style={styles.label}>Activity Level</Text>
                </View>
                <TouchableOpacity 
                  style={styles.selectButton}
                  onPress={() => setShowActivityPicker(!showActivityPicker)}
                >
                  <Text style={profileData.activityLevel ? styles.selectValue : styles.selectPlaceholder}>
                    {activityOptions.find(a => a.value === profileData.activityLevel)?.label || 'Select your activity level'}
                  </Text>
                  <Icon name="chevron-down" size={18} color="#6B7280" />
                </TouchableOpacity>
                {showActivityPicker && (
                  <View style={styles.pickerDropdown}>
                    {activityOptions.map((option) => (
                      <TouchableOpacity 
                        key={option.value}
                        style={styles.pickerOption}
                        onPress={() => {
                          handleInputChange('activityLevel', option.value);
                          setShowActivityPicker(false);
                        }}
                      >
                        <Text style={styles.pickerOptionText}>{option.label}</Text>
                        <Text style={styles.pickerOptionDesc}>{option.desc}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Step 2: Medical Conditions */}
          {currentStep === 2 && (
            <View style={styles.card}>
              <LinearGradient colors={['#EF4444', '#F97316', '#EC4899']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.cardAccent} />
              <Text style={styles.cardLabel}>Do you have any of these conditions?</Text>
              
              {medicalConditionOptions.map((condition) => {
                const isSelected = profileData.medicalConditions.includes(condition);
                return (
                  <TouchableOpacity 
                    key={condition}
                    style={[styles.checkboxItem, isSelected && styles.checkboxItemSelected]}
                    onPress={() => handleArrayFieldChange('medicalConditions', condition)}
                  >
                    <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                      {isSelected && <Icon name="check" size={14} color="#FFFFFF" />}
                    </View>
                    <Text style={[styles.checkboxLabel, isSelected && styles.checkboxLabelSelected]}>
                      {condition}
                    </Text>
                    {isSelected && <Icon name="check-circle" size={20} color="#EF4444" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* Step 3: Goals */}
          {currentStep === 3 && (
            <View style={styles.card}>
              <LinearGradient colors={['#EF4444', '#F97316', '#EC4899']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.cardAccent} />
              <Text style={styles.cardLabel}>What are your primary goals?</Text>
              
              {goalOptions.map((goal) => {
                const isSelected = profileData.goals.includes(goal.label);
                return (
                  <TouchableOpacity 
                    key={goal.label}
                    style={[styles.goalItem, isSelected && styles.goalItemSelected]}
                    onPress={() => handleArrayFieldChange('goals', goal.label)}
                  >
                    <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                      {isSelected && <Icon name="check" size={14} color="#FFFFFF" />}
                    </View>
                    <Text style={styles.goalIcon}>{goal.icon}</Text>
                    <Text style={[styles.goalLabel, isSelected && styles.goalLabelSelected]}>
                      {goal.label}
                    </Text>
                    {isSelected && <Icon name="check-circle" size={20} color="#EF4444" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          {currentStep < totalSteps ? (
            <TouchableOpacity 
              onPress={handleNext}
              disabled={!isStepValid()}
              style={[styles.continueButton, !isStepValid() && styles.buttonDisabled]}
            >
              <LinearGradient 
                colors={isStepValid() ? ['#EF4444', '#F97316', '#EC4899'] : ['#D1D5DB', '#D1D5DB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.continueGradient}
              >
                <Text style={styles.continueText}>Continue</Text>
                <Icon name="chevron-right" size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              onPress={handleComplete}
              disabled={isLoading || !isStepValid()}
              style={[styles.completeButton, (!isStepValid() || isLoading) && styles.buttonDisabled]}
            >
              <LinearGradient 
                colors={isStepValid() ? ['#10B981', '#059669'] : ['#D1D5DB', '#D1D5DB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.continueGradient}
              >
                {isLoading ? (
                  <>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <Text style={styles.continueText}>Saving Profile...</Text>
                  </>
                ) : (
                  <>
                    <Icon name="check-circle" size={20} color="#FFFFFF" />
                    <Text style={styles.continueText}>Complete Setup</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity onPress={() => onNavigate('welcome')} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
  },
  backText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  logoIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  progressSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
  progressTrack: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  stepIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepCircle: {
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  stepCircleInactive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepNumberInactive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
    marginTop: 6,
  },
  stepLabelActive: {
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 160,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  stepIconBg: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  sparkle: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  stepTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    overflow: 'hidden',
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 16,
    marginTop: 4,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputHalf: {
    flex: 1,
  },
  inputFull: {
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111827',
  },
  selectButton: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectValue: {
    fontSize: 15,
    color: '#111827',
  },
  selectPlaceholder: {
    fontSize: 15,
    color: '#9CA3AF',
  },
  pickerDropdown: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginTop: 4,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pickerOption: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  pickerOptionText: {
    fontSize: 15,
    color: '#111827',
  },
  pickerOptionDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
  },
  checkboxItemSelected: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  checkboxLabelSelected: {
    color: '#B91C1C',
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
  },
  goalItemSelected: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  goalIcon: {
    fontSize: 24,
  },
  goalLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  goalLabelSelected: {
    color: '#B91C1C',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 36,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  continueButton: {
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
  },
  completeButton: {
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  continueGradient: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  continueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default ProfileSetupScreen;