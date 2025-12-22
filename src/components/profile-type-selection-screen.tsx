import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProfileTypeSelectionScreenProps {
  onNavigate: (state: string) => void;
  onUserUpdate: (data: any) => void;
  user: any;
}

const profileTypes = [
  {
    id: 'athlete',
    title: 'Runner / Athlete',
    description: 'Train smarter, recover faster, perform better',
    icon: 'trophy',
    features: ['Performance tracking', 'Training plans', 'Recovery optimization']
  },
  {
    id: 'coach',
    title: 'Coach / Trainer',
    description: 'Manage athletes and optimize their performance',
    icon: 'account',
    features: ['Client management', 'Progress monitoring', 'Treatment planning']
  },
  {
    id: 'health',
    title: 'Health & Wellness',
    description: 'Manage pain, improve mobility, feel better',
    icon: 'heart',
    features: ['Pain management', 'Wellness tracking', 'Self-care guidance']
  }
];

export function ProfileTypeSelectionScreen({ onNavigate, onUserUpdate }: ProfileTypeSelectionScreenProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (typeId: string) => {
    setSelectedType(typeId);
    setTimeout(() => {
      onUserUpdate({ profileType: typeId });
      onNavigate('profile-details');
    }, 300);
  };

  return (
    <LinearGradient colors={['#FEF2F2', '#FFFFFF', '#FFF7ED']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon name="heart" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>Tell us about yourself</Text>
          <Text style={styles.subtitle}>We'll customize your SmartHeal experience</Text>
        </View>

        {/* Profile Type Cards */}
        <View style={styles.cardsContainer}>
          {profileTypes.map((type) => {
            const isSelected = selectedType === type.id;

            return (
              <TouchableOpacity
                key={type.id}
                onPress={() => handleSelect(type.id)}
                style={[
                  styles.typeCard,
                  isSelected && styles.typeCardSelected
                ]}
              >
                {/* Selected Indicator */}
                {isSelected && (
                  <View style={styles.selectedBadge}>
                    <Icon name="check" size={14} color="#FFFFFF" />
                  </View>
                )}

                {/* Icon */}
                <LinearGradient
                  colors={['#EF4444', '#F97316']}
                  style={styles.typeIcon}
                >
                  <Icon name={type.icon} size={28} color="#FFFFFF" />
                </LinearGradient>

                {/* Content */}
                <Text style={styles.typeTitle}>{type.title}</Text>
                <Text style={styles.typeDescription}>{type.description}</Text>

                {/* Features */}
                <View style={styles.features}>
                  {type.features.map((feature, idx) => (
                    <View key={idx} style={styles.featureRow}>
                      <Icon name="chevron-right" size={16} color="#EF4444" />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>
          You can change this later in settings
        </Text>
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
  cardsContainer: {
    gap: 20,
    marginBottom: 24,
  },
  typeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    position: 'relative',
  },
  typeCardSelected: {
    borderColor: '#EF4444',
    transform: [{ scale: 1.02 }],
    shadowColor: '#EF4444',
    shadowOpacity: 0.15,
  },
  selectedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  typeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  typeDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  features: {
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#6B7280',
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});