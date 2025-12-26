import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const GOALS = [
  { label: 'Pain Relief', icon: 'stethoscope' },
  { label: 'Muscle Recovery', icon: 'arm-flex' },
  { label: 'Improved Mobility', icon: 'human-greeting' },
  { label: 'Stress Reduction', icon: 'emoticon-happy-outline' },
  { label: 'Better Sleep', icon: 'moon-waning-crescent' },
  { label: 'General Wellness', icon: 'meditation' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Goals'>;

const GoalsScreen = ({ navigation, route }: Props) => {
  const [selected, setSelected] = useState<string[]>([]);

  const weightKg = route.params?.weightKg;
  const heightCm = route.params?.heightCm;

  const bmi = useMemo(() => {
    if (!weightKg || !heightCm) return null;
    const hMeters = heightCm / 100;
    const value = weightKg / (hMeters * hMeters);
    return Number.isFinite(value) ? Number(value.toFixed(1)) : null;
  }, [weightKg, heightCm]);

  const bmiCategory = useMemo(() => {
    if (bmi == null) return null;
    if (bmi < 18.5) return { label: 'Underweight', color: '#0EA5E9' };
    if (bmi < 25) return { label: 'Healthy', color: '#10B981' };
    if (bmi < 30) return { label: 'Overweight', color: '#F59E0B' };
    return { label: 'Obese', color: '#EF4444' };
  }, [bmi]);

  const toggleGoal = (goal: string) => {
    setSelected((current) =>
      current.includes(goal) ? current.filter((g) => g !== goal) : [...current, goal]
    );
  };

  const handleComplete = () => {
    navigation.navigate('SetupComplete');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 127, 80, 0.25)', 'rgba(255, 150, 180, 0.2)', 'rgba(180, 130, 255, 0.25)', 'rgba(255, 180, 200, 0.2)']}
        locations={[0, 0.35, 0.65, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.bgGradient}
      />
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={20} color="#1F2937" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <View style={styles.brandPill}>
              <Icon name="heart" size={18} color="#F52E32" />
              <Text style={styles.brandText}>SmartHeal</Text>
            </View>
          </View>

          <View style={styles.progressRow}>
            <Text style={styles.stepText}>Step 3 of 3</Text>
            <Text style={styles.percentText}>100%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '100%' }]} />
          </View>

          <View style={styles.stepIndicators}>
            <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
              <Text style={styles.stepCircleText}>1</Text>
              <Text style={styles.stepLabel}>Basic</Text>
            </View>
            <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
              <Text style={styles.stepCircleText}>2</Text>
              <Text style={styles.stepLabel}>Health</Text>
            </View>
            <View style={[styles.stepCircle, styles.stepCircleActive]}>
              <Text style={styles.stepCircleTextActive}>3</Text>
              <Text style={styles.stepLabelActive}>Goals</Text>
            </View>
          </View>

          <View style={styles.heroIconWrapper}>
            <LinearGradient colors={["#FF8F70", "#FF3D68"]} style={styles.heroIconBg}>
              <Icon name="target" size={42} color="#FFFFFF" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Your Goals</Text>
          <Text style={styles.subtitle}>What do you want to achieve?</Text>

          {bmi !== null && bmiCategory && (
            <LinearGradient colors={["#EEF2FF", "#FFF7ED"]} style={styles.bmiCard}>
              <View style={styles.bmiHeader}>
                <Text style={styles.bmiLabel}>BMI Insight</Text>
                <View style={[styles.bmiPill, { backgroundColor: bmiCategory.color + '20' }]}> 
                  <Text style={[styles.bmiPillText, { color: bmiCategory.color }]}>{bmiCategory.label}</Text>
                </View>
              </View>
              <View style={styles.bmiValueRow}>
                <Text style={styles.bmiValue}>{bmi}</Text>
                <Text style={styles.bmiUnit}>kg/m²</Text>
              </View>
              <Text style={styles.bmiHint}>Based on your provided weight and height from Basic Info.</Text>
            </LinearGradient>
          )}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>What are your primary goals?</Text>
            <View style={styles.listContainer}>
              {GOALS.map((goal) => {
                const isSelected = selected.includes(goal.label);
                return (
                  <TouchableOpacity
                    key={goal.label}
                    style={[styles.optionRow, isSelected && styles.optionRowActive]}
                    activeOpacity={0.9}
                    onPress={() => toggleGoal(goal.label)}
                  >
                    <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
                      {isSelected ? <Icon name="check" size={18} color="#FFFFFF" /> : null}
                    </View>
                    <View style={styles.optionTextWrap}>
                      <Text style={[styles.optionText, isSelected && styles.optionTextActive]}>{goal.label}</Text>
                      <Text style={styles.optionSubtext}>Tap to select</Text>
                    </View>
                    <Icon name={goal.icon} size={20} color="#F52E32" />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.ctaContainer}>
          <LinearGradient colors={["#34D399", "#10B981"]} style={styles.ctaGradient}>
            <TouchableOpacity style={styles.ctaButton} activeOpacity={0.9} onPress={handleComplete}>
              <Icon name="check-circle" size={18} color="#FFFFFF" />
              <Text style={styles.ctaText}>Complete Setup</Text>
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity style={styles.skipButton} onPress={handleComplete}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  bgGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 120 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { color: '#1F2937', fontSize: 15, fontWeight: '600' },
  brandPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  brandText: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  stepText: { color: '#6B7280', fontWeight: '700' },
  percentText: { color: '#F52E32', fontWeight: '800' },
  progressBarTrack: { height: 6, borderRadius: 6, backgroundColor: '#F1F5F9', overflow: 'hidden', marginBottom: 14 },
  progressBarFill: { height: '100%', backgroundColor: '#F52E32' },
  stepIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 18,
  },
  stepCircle: { alignItems: 'center', gap: 4 },
  stepCircleCompleted: {},
  stepCircleActive: {},
  stepCircleText: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#22C55E',
    backgroundColor: '#ECFDF3',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
    color: '#15803D',
  },
  stepCircleTextActive: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#F52E32',
    backgroundColor: '#FFF1F2',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
    color: '#C82121',
    shadowColor: '#F52E32',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  stepLabel: { color: '#6B7280', fontSize: 12 },
  stepLabelActive: { color: '#C82121', fontSize: 12, fontWeight: '700' },
  heroIconWrapper: { alignItems: 'center', marginBottom: 12 },
  heroIconBg: {
    width: 110,
    height: 110,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
  },
  title: { fontSize: 24, fontWeight: '800', color: '#C82121', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#4B5563', textAlign: 'center', marginBottom: 16 },
  bmiCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  bmiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  bmiLabel: { color: '#111827', fontWeight: '700' },
  bmiPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  bmiPillText: { fontWeight: '800' },
  bmiValueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  bmiValue: { fontSize: 28, fontWeight: '800', color: '#111827' },
  bmiUnit: { color: '#6B7280', marginBottom: 2 },
  bmiHint: { color: '#4B5563', marginTop: 6 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    gap: 10,
  },
  sectionTitle: { color: '#111827', fontWeight: '700', fontSize: 14, marginBottom: 6 },
  listContainer: { gap: 8 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F8FAFC',
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  optionRowActive: {
    backgroundColor: '#FFF3F3',
    borderColor: '#FECACA',
  },
  optionTextWrap: { flex: 1 },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  optionText: { color: '#111827', fontWeight: '700', fontSize: 14 },
  optionTextActive: { color: '#C82121' },
  optionSubtext: { color: '#6B7280', fontSize: 12 },
  ctaContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
  },
  ctaGradient: {
    borderRadius: 14,
    padding: 12,
    shadowColor: '#10B981',
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  skipButton: { alignItems: 'center', marginTop: 8 },
  skipText: { color: '#4B5563', fontWeight: '600' },
});

export default GoalsScreen;
