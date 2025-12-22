import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProfileDetailsScreenProps {
  onNavigate: (state: string) => void;
  onUserUpdate: (data: any) => void;
  user: any;
}

const athleteLevels = [
  { id: 'beginner', title: 'Beginner', description: 'New to running or returning after a break' },
  { id: 'intermediate', title: 'Intermediate', description: 'Regular runner, 3-5 times per week' },
  { id: 'advanced', title: 'Advanced', description: 'Experienced runner, training for competitions' },
  { id: 'professional', title: 'Professional', description: 'Elite athlete or serious competitor' }
];

const coachTypes = [
  { id: 'personal', title: 'Personal Trainer', description: 'One-on-one client training' },
  { id: 'sports', title: 'Sports Coach', description: 'Team or individual sports coaching' },
  { id: 'team', title: 'Team Coach', description: 'Managing multiple athletes' },
  { id: 'rehab', title: 'Rehabilitation Specialist', description: 'Recovery and injury prevention' }
];

const ageGroups = [
  { id: '18-30', title: '18-30 years', description: 'Young adult' },
  { id: '31-45', title: '31-45 years', description: 'Adult' },
  { id: '46-60', title: '46-60 years', description: 'Mature adult' },
  { id: '60+', title: '60+ years', description: 'Senior' }
];

const healthGoals = [
  { id: 'pain', title: 'Pain Management', description: 'Chronic pain relief' },
  { id: 'mobility', title: 'Improve Mobility', description: 'Better movement and flexibility' },
  { id: 'recovery', title: 'Post-Injury Recovery', description: 'Rehabilitation support' },
  { id: 'wellness', title: 'General Wellness', description: 'Overall health improvement' }
];

export function ProfileDetailsScreen({ onNavigate, onUserUpdate, user }: ProfileDetailsScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [secondaryOption, setSecondaryOption] = useState<string>('');

  const profileType = user?.profileType || 'athlete';

  const getOptions = () => {
    switch (profileType) {
      case 'athlete':
        return { title: 'What\'s your experience level?', options: athleteLevels, showSecondary: false };
      case 'coach':
        return { title: 'What type of coach are you?', options: coachTypes, showSecondary: false };
      case 'health':
        return { 
          title: 'Select your age group', 
          options: ageGroups, 
          showSecondary: true,
          secondaryTitle: 'What\'s your primary goal?',
          secondaryOptions: healthGoals
        };
      default:
        return { title: '', options: [], showSecondary: false };
    }
  };

  const config = getOptions();
  const canContinue = profileType === 'health' ? selectedOption && secondaryOption : selectedOption;

  const handleContinue = () => {
    if (canContinue) {
      onUserUpdate({
        level: selectedOption,
        goal: secondaryOption || null
      });
      onNavigate('interests');
    }
  };

  return (
    <LinearGradient colors={['#FEF2F2', '#FFFFFF', '#FFF7ED']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon name="heart" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>{config.title}</Text>
          <Text style={styles.subtitle}>Help us personalize your experience</Text>
        </View>

        {/* Primary Options */}
        <View style={styles.optionsContainer}>
          {config.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedOption(option.id)}
              style={[
                styles.optionCard,
                selectedOption === option.id && styles.optionCardSelected
              ]}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              <View style={[
                styles.radioCircle,
                selectedOption === option.id && styles.radioCircleSelected
              ]}>
                {selectedOption === option.id && (
                  <Icon name="check" size={14} color="#FFFFFF" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Secondary Options (for health profile) */}
        {config.showSecondary && selectedOption && (
          <View style={styles.secondarySection}>
            <Text style={styles.secondaryTitle}>{config.secondaryTitle}</Text>
            <View style={styles.optionsContainer}>
              {config.secondaryOptions?.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => setSecondaryOption(option.id)}
                  style={[
                    styles.optionCard,
                    secondaryOption === option.id && styles.optionCardSelected
                  ]}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                  </View>
                  <View style={[
                    styles.radioCircle,
                    secondaryOption === option.id && styles.radioCircleSelected
                  ]}>
                    {secondaryOption === option.id && (
                      <Icon name="check" size={14} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Continue Button */}
        <TouchableOpacity
          onPress={handleContinue}
          disabled={!canContinue}
          style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
        >
          <LinearGradient
            colors={canContinue ? ['#EF4444', '#F97316'] : ['#D1D5DB', '#9CA3AF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueGradient}
          >
            <Text style={styles.continueText}>Continue</Text>
            <Icon name="arrow-right" size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  optionCardSelected: {
    borderColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowOpacity: 0.15,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: '#EF4444',
    backgroundColor: '#EF4444',
  },
  secondarySection: {
    marginTop: 8,
  },
  secondaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  continueButton: {
    marginTop: 8,
    borderRadius: 14,
    overflow: 'hidden',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  continueText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});