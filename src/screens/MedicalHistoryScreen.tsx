import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const CONDITIONS = [
  'Diabetes',
  'Hypertension',
  'Heart Disease',
  'Arthritis',
  'Back Pain',
  'Knee Pain',
  'Chronic Pain',
  'None',
];

const CONDITION_SUBTYPES: Record<string, string[]> = {
  Diabetes: ['Type 1', 'Type 2', 'Gestational', 'Prediabetes'],
  Hypertension: ['Primary', 'Secondary', 'Resistant', 'White-coat'],
  'Heart Disease': ['Coronary artery', 'Heart failure', 'Arrhythmia', 'Valve disease'],
  Arthritis: ['Osteoarthritis', 'Rheumatoid', 'Psoriatic', 'Gout'],
  'Back Pain': ['Acute', 'Chronic', 'Sciatica'],
  'Knee Pain': ['Meniscus', 'Ligament', 'Osteoarthritis', 'Patellofemoral'],
  'Chronic Pain': ['Neuropathic', 'Inflammatory', 'Nociceptive', 'Functional'],
};

type Props = NativeStackScreenProps<RootStackParamList, 'MedicalHistory'>;

const MedicalHistoryScreen = ({ navigation, route }: Props) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [severity, setSeverity] = useState<Record<string, 'Low' | 'Medium' | 'High'>>({});
  const [subtypes, setSubtypes] = useState<Record<string, string | undefined>>({});
  const [showSeverityModal, setShowSeverityModal] = useState(false);
  const [pendingCondition, setPendingCondition] = useState<string | null>(null);
  const [tempSeverity, setTempSeverity] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [tempSubtype, setTempSubtype] = useState<string | undefined>(undefined);

  const progress = useMemo(() => ({ step: 2, total: 3, percent: 67 }), []);

  const toggleCondition = (condition: string) => {
    if (condition === 'None') {
      setSelected((current) => (current.includes('None') ? [] : ['None']));
      setSeverity({});
      setSubtypes({});
      return;
    }

    setSelected((current) => current.filter((item) => item !== 'None'));

    // If already selected, reopen severity modal to adjust; otherwise ask severity before adding.
    const alreadySelected = selected.includes(condition);
    const existingSeverity = severity[condition] ?? 'Medium';
    const existingSubtype = subtypes[condition];
    setPendingCondition(condition);
    setTempSeverity(existingSeverity as 'Low' | 'Medium' | 'High');
    setTempSubtype(existingSubtype);
    setShowSeverityModal(true);

    if (alreadySelected) {
      return;
    }
  };

  const applySeverity = () => {
    if (!pendingCondition) return;
    setSelected((current) => {
      const withoutNone = current.filter((item) => item !== 'None');
      if (withoutNone.includes(pendingCondition)) return withoutNone;
      return [...withoutNone, pendingCondition];
    });
    setSeverity((current) => ({ ...current, [pendingCondition]: tempSeverity }));
    setSubtypes((current) => ({ ...current, [pendingCondition]: tempSubtype }));
    setShowSeverityModal(false);
    setPendingCondition(null);
    setTempSubtype(undefined);
  };

  const updateSeverityOnly = () => {
    if (!pendingCondition) return;
    setSeverity((current) => ({ ...current, [pendingCondition]: tempSeverity }));
    setSubtypes((current) => ({ ...current, [pendingCondition]: tempSubtype }));
    setShowSeverityModal(false);
    setPendingCondition(null);
    setTempSubtype(undefined);
  };

  const removeCondition = () => {
    if (!pendingCondition) return;
    setSelected((current) => current.filter((item) => item !== pendingCondition));
    setSeverity((current) => {
      const next = { ...current };
      delete next[pendingCondition];
      return next;
    });
    setSubtypes((current) => {
      const next = { ...current };
      delete next[pendingCondition];
      return next;
    });
    setShowSeverityModal(false);
    setPendingCondition(null);
    setTempSubtype(undefined);
  };

  const handleContinue = () => {
    navigation.navigate('Goals', {
      weightKg: route.params?.weightKg,
      heightCm: route.params?.heightCm,
      conditions: selected,
      severity,
      subtypes,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <LinearGradient
        colors={["#FDF1EA", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
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
            <View style={styles.stepCopy}>
              <Text style={styles.stepText}>Step {progress.step} of {progress.total}</Text>
            </View>
            <View style={styles.percentCopy}>
              <Text style={styles.percentNumber}>{progress.percent}</Text>
              <Text style={styles.percentSymbol}>%</Text>
            </View>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progress.percent}%` }]} />
          </View>

          <View style={styles.stepIndicators}>
            <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
              <Text style={styles.stepCircleText}>1</Text>
              <Text style={styles.stepLabel}>Basic</Text>
            </View>
            <View style={[styles.stepCircle, styles.stepCircleActive]}>
              <Text style={styles.stepCircleTextActive}>2</Text>
              <Text style={styles.stepLabelActive}>Health</Text>
            </View>
            <View style={styles.stepCircle}>
              <Text style={styles.stepCircleTextMuted}>3</Text>
              <Text style={styles.stepLabel}>Goals</Text>
            </View>
          </View>

          <View style={styles.heroIconWrapper}>
            <LinearGradient colors={["#FF5F6D", "#FF7E33"]} style={styles.heroIconBg}>
              <Icon name="heart-pulse" size={42} color="#FFFFFF" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Medical History</Text>
          <Text style={styles.subtitle}>Share your health information for better care</Text>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Do you have any of these conditions?</Text>
            <View style={styles.listContainer}>
              {CONDITIONS.map((item) => {
                const isSelected = selected.includes(item);
                const badge = severity[item];
                const subtype = subtypes[item];
                return (
                  <TouchableOpacity
                    key={item}
                    style={[styles.optionRow, isSelected && styles.optionRowActive]}
                    activeOpacity={0.9}
                    onPress={() => toggleCondition(item)}
                  >
                    <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
                      {isSelected && <Icon name="check" size={18} color="#FFFFFF" />}
                    </View>
                    <View style={styles.optionTextWrap}>
                      <Text style={[styles.optionText, isSelected && styles.optionTextActive]}>{item}</Text>
                      {badge && (
                        <View
                          style={[
                            styles.badge,
                            badge === 'High' && styles.badgeHigh,
                            badge === 'Medium' && styles.badgeMedium,
                            badge === 'Low' && styles.badgeLow,
                          ]}
                        >
                          <Text style={styles.badgeText}>{badge}</Text>
                        </View>
                      )}
                      {subtype ? (
                        <Text style={styles.subtypeText}>{subtype}</Text>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.ctaContainer}>
          <LinearGradient colors={["#FF8F70", "#FF3D68"]} style={styles.ctaGradient}>
            <TouchableOpacity style={styles.ctaButton} activeOpacity={0.9} onPress={handleContinue}>
              <Text style={styles.ctaText}>Continue</Text>
              <Icon name="chevron-right" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('MainApp')}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={showSeverityModal}
          transparent
          animationType="fade"
          onRequestClose={() => {
            setShowSeverityModal(false);
            setPendingCondition(null);
            setTempSubtype(undefined);
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setShowSeverityModal(false);
              setPendingCondition(null);
              setTempSubtype(undefined);
            }}
            style={styles.modalBackdrop}
          >
            <TouchableOpacity activeOpacity={1} style={styles.modalCard}>
              <Text style={styles.modalTitle}>Set severity</Text>
              <Text style={styles.modalSubtitle}>
                {pendingCondition ? `${pendingCondition} severity` : 'Select severity'}
              </Text>

              <View style={styles.severityRow}>
                {(['Low', 'Medium', 'High'] as const).map((level) => {
                  const active = tempSeverity === level;
                  return (
                    <TouchableOpacity
                      key={level}
                      activeOpacity={0.9}
                      style={[styles.severityChip, active && styles.severityChipActive]}
                      onPress={() => setTempSeverity(level)}
                    >
                      <Text style={[styles.severityText, active && styles.severityTextActive]}>{level}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {!!(pendingCondition && CONDITION_SUBTYPES[pendingCondition]) && (
                <View style={styles.subtypeBlock}>
                  <Text style={styles.subtypeLabel}>Select type (optional)</Text>
                  <View style={styles.subtypeRow}>
                    {CONDITION_SUBTYPES[pendingCondition].map((type) => {
                      const active = tempSubtype === type;
                      return (
                        <TouchableOpacity
                          key={type}
                          activeOpacity={0.9}
                          style={[styles.subtypeChip, active && styles.subtypeChipActive]}
                          onPress={() => setTempSubtype(type)}
                        >
                          <Text style={[styles.subtypeChipText, active && styles.subtypeChipTextActive]}>{type}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalGhost}
                  onPress={pendingCondition && selected.includes(pendingCondition)
                    ? removeCondition
                    : () => {
                        setShowSeverityModal(false);
                        setPendingCondition(null);
                        setTempSubtype(undefined);
                      }}
                >
                  <Text style={styles.modalGhostText}>
                    {pendingCondition && selected.includes(pendingCondition) ? 'Remove condition' : 'Cancel'}
                  </Text>
                </TouchableOpacity>

                <LinearGradient colors={["#FF8F70", "#FF3D68"]} style={styles.modalPrimaryGradient}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.modalPrimary}
                    onPress={pendingCondition && selected.includes(pendingCondition) ? updateSeverityOnly : applySeverity}
                  >
                    <Text style={styles.modalPrimaryText}>Save</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  gradient: { flex: 1 },
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
  stepCopy: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  stepText: { color: '#6B7280', fontWeight: '700' },
  percentCopy: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  percentNumber: { color: '#F52E32', fontWeight: '800', fontSize: 16 },
  percentSymbol: { color: '#F52E32', fontWeight: '700' },
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
  stepCircleTextMuted: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
    color: '#9CA3AF',
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
    backgroundColor: '#F52E32',
    borderColor: '#F52E32',
  },
  optionText: { color: '#111827', fontWeight: '600', fontSize: 14 },
  optionTextActive: { color: '#C82121' },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
  },
  badgeText: { color: '#111827', fontWeight: '700', fontSize: 12 },
  badgeHigh: { backgroundColor: '#FEE2E2' },
  badgeMedium: { backgroundColor: '#FEF3C7' },
  badgeLow: { backgroundColor: '#DCFCE7' },
  subtypeText: { marginTop: 4, color: '#4B5563', fontSize: 12, fontWeight: '600' },
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
    shadowColor: '#FF3D68',
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
    gap: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  modalSubtitle: { color: '#4B5563', fontWeight: '600' },
  severityRow: { flexDirection: 'row', gap: 10 },
  severityChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  severityChipActive: {
    borderColor: '#F52E32',
    backgroundColor: '#FFF1F2',
    shadowColor: '#F52E32',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  severityText: { color: '#111827', fontWeight: '700' },
  severityTextActive: { color: '#C82121' },
  modalActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  modalGhost: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  modalGhostText: { color: '#1F2937', fontWeight: '700' },
  modalPrimaryGradient: {
    flex: 1,
    borderRadius: 12,
    padding: 2,
    shadowColor: '#FF3D68',
    shadowOpacity: 0.14,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  modalPrimary: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalPrimaryText: { color: '#FFFFFF', fontWeight: '800' },
  subtypeBlock: { gap: 8 },
  subtypeLabel: { color: '#111827', fontWeight: '700' },
  subtypeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  subtypeChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F8FAFC',
  },
  subtypeChipActive: {
    borderColor: '#F52E32',
    backgroundColor: '#FFF1F2',
    shadowColor: '#F52E32',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  subtypeChipText: { color: '#111827', fontWeight: '700' },
  subtypeChipTextActive: { color: '#C82121' },
});

export default MedicalHistoryScreen;
