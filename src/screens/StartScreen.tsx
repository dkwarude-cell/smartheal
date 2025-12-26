import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SmartHealLogo = require('../assets/smartheal-logo.png');

type Props = NativeStackScreenProps<RootStackParamList, 'Start'>;

const StartScreen = ({ navigation }: Props) => {
  const features = [
    { label: 'AI Guidance', icon: 'flash', color: '#FF6B6B', bg: '#FFECEC' },
    { label: 'Safe Therapy', icon: 'shield-check', color: '#5B8DEF', bg: '#EAF1FF' },
    { label: 'Health Tracking', icon: 'heart-pulse', color: '#4CAF50', bg: '#E8F8ED' },
    { label: 'Voice Control', icon: 'phone-outline', color: '#C084FC', bg: '#F3E8FF' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#FFF4EC', '#FFFFFF']} style={styles.gradient}>
        <View style={styles.hero}>
          <View style={styles.heroIconWrapper}>
            <Image source={SmartHealLogo} style={styles.logoImage} resizeMode="contain" />
          </View>
          <Text style={styles.title}>Welcome to SmartHeal</Text>
          <Text style={styles.subtitle}>
            Professional IFT therapy device with AI-powered guidance and personalized treatment plans
          </Text>
        </View>

        <View style={styles.featureGrid}>
          {features.map((item) => (
            <View key={item.label} style={styles.featureCard}>
              <View style={[styles.featureIconBg, { backgroundColor: item.bg }]}> 
                <Icon name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.featureLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.ctaGroup}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.primaryButtonText}>Login to Your Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.secondaryButtonText}>Create New Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.badgesRow}>
          <View style={styles.badge}>
            <Icon name="check-circle" size={14} color="#7C8BA1" />
            <Text style={styles.badgeText}>FDA Approved</Text>
          </View>
          <View style={styles.badge}>
            <Icon name="check-circle" size={14} color="#7C8BA1" />
            <Text style={styles.badgeText}>Clinically Tested</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 28,
  },
  hero: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  heroIconWrapper: {
    marginBottom: 24,
  },
  logoImage: {
    width: 140,
    height: 140,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 22,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#EFF1F5',
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  featureIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  ctaGroup: {
    gap: 12,
    marginBottom: 22,
  },
  primaryButton: {
    backgroundColor: '#F52E32',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#F52E32',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryButton: {
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F52E32',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#F52E32',
    fontSize: 16,
    fontWeight: '700',
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
    color: '#7C8BA1',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default StartScreen;
