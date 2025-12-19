import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';

const actions = [
  {
    title: 'Connect Device',
    subtitle: 'Pair your SmartHeal ITT device',
    icon: 'bluetooth',
    accent: '#4F46E5',
  },
  {
    title: 'AI Guidance',
    subtitle: 'Get personalized placement help',
    icon: 'flash',
    accent: '#A855F7',
  },
  {
    title: 'Voice Control',
    subtitle: 'Hands-free therapy management',
    icon: 'microphone-outline',
    accent: '#22C55E',
  },
  {
    title: 'Progress Tracking',
    subtitle: 'Monitor your recovery journey',
    icon: 'heart-outline',
    accent: '#EF4444',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'SetupComplete'>;

const SetupCompleteScreen = ({ navigation }: Props) => {
  const { user } = useAuth();
  const rawName = user?.displayName || user?.email?.split('@')[0] || '';
  const name = rawName ? rawName.trim() : 'there';

  const handleSupport = () => {
    Linking.openURL('mailto:support@smartheal.com?subject=Need%20Help%20with%20SmartHeal');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <LinearGradient
        colors={["#FFF1EB", "#FFFFFF", "#E8F3FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.brandRow}>
            <View style={styles.brandPill}>
              <Icon name="heart" size={18} color="#F52E32" />
              <Text style={styles.brandText}>SmartHeal</Text>
            </View>
          </View>

          <View style={styles.heroIconWrapper}>
            <LinearGradient colors={["#34D399", "#10B981"]} style={styles.heroIconBg}>
              <Icon name="check" size={38} color="#FFFFFF" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Welcome, {name}!</Text>
          <Text style={styles.subtitle}>Your SmartHeal account is ready</Text>
          <Text style={styles.helper}>Let's connect your therapy device to get started</Text>

          <Text style={styles.sectionHeading}>What's Next?</Text>

          <View style={styles.cardStack}>
            {actions.map((item) => (
              <View key={item.title} style={styles.glassCard}>
                <View style={[styles.iconBadge, { backgroundColor: `${item.accent}15`, borderColor: `${item.accent}55` }]}>
                  <Icon name={item.icon} size={20} color={item.accent} />
                </View>
                <View style={styles.cardCopy}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
                <Icon name="chevron-right" size={20} color="#9CA3AF" />
              </View>
            ))}
          </View>

          <View style={styles.safetyCard}>
            <View style={styles.safetyHeader}>
              <Icon name="shield-alert" size={18} color="#F59E0B" />
              <Text style={styles.safetyTitle}>Safety First</Text>
            </View>
            <Text style={styles.safetyText}>
              Always consult with your healthcare provider before starting any new therapy regimen.
            </Text>
          </View>

          <LinearGradient colors={["#FF6B6B", "#F52E32"]} style={styles.primaryGradient}>
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.9} onPress={() => navigation.navigate('DeviceConnection')}>
              <Text style={styles.primaryText}>Connect Your Device</Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('MainApp')}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportRow} onPress={handleSupport}>
            <Text style={styles.supportLabel}>Need help?</Text>
            <Text style={styles.supportLink}>Contact Support</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  gradient: { flex: 1 },
  scroll: { paddingHorizontal: 16, paddingBottom: 28, paddingTop: 12 },
  brandRow: { alignItems: 'flex-start', marginBottom: 12 },
  brandPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 82, 82, 0.18)',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  brandText: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  heroIconWrapper: { alignItems: 'center', marginBottom: 10 },
  heroIconBg: {
    width: 86,
    height: 86,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  title: { fontSize: 24, fontWeight: '800', color: '#111827', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', textAlign: 'center', marginBottom: 4 },
  helper: { fontSize: 14, color: '#4B5563', textAlign: 'center', marginBottom: 18 },
  sectionHeading: { fontSize: 16, fontWeight: '800', color: '#111827', textAlign: 'center', marginBottom: 10 },
  cardStack: { gap: 10 },
  glassCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    shadowColor: '#000000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
  },
  cardCopy: { flex: 1 },
  cardTitle: { color: '#111827', fontWeight: '800', fontSize: 14 },
  cardSubtitle: { color: '#6B7280', fontSize: 12, marginTop: 2 },
  safetyCard: {
    marginTop: 14,
    marginBottom: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 247, 237, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(251, 146, 60, 0.4)',
  },
  safetyHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  safetyTitle: { color: '#9A3412', fontWeight: '800' },
  safetyText: { color: '#92400E', lineHeight: 18, fontWeight: '600' },
  primaryGradient: {
    marginTop: 8,
    borderRadius: 14,
    padding: 2,
    shadowColor: '#F52E32',
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  primaryButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  skipButton: { alignItems: 'center', marginTop: 10 },
  skipText: { color: '#6B7280', fontWeight: '700' },
  supportRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 12 },
  supportLabel: { color: '#6B7280', fontWeight: '600' },
  supportLink: { color: '#F52E32', fontWeight: '800' },
});

export default SetupCompleteScreen;
