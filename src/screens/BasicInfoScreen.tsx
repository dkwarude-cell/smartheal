import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'BasicInfo'>;

const BasicInfoScreen = ({ navigation }: Props) => {
  const [age, setAge] = useState('25');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('');
  const [openDropdown, setOpenDropdown] = useState<'gender' | 'activity' | null>(null);

  const genderOptions = ['Male', 'Female', 'Other'];
  const activityOptions = [
    'Sedentary',
    'Light (1-3x/week)',
    'Moderate (3-5x/week)',
    'Active (6-7x/week)',
    'Very Active',
  ];

  const isValid = useMemo(() => {
    return Boolean(age && weight && height && gender && activity);
  }, [age, weight, height, gender, activity]);

  const handleContinue = () => {
    if (!isValid) {
      Alert.alert('Missing info', 'Please complete all fields before continuing.');
      return;
    }
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    navigation.navigate('MedicalHistory', {
      weightKg: Number.isFinite(weightKg) ? weightKg : undefined,
      heightCm: Number.isFinite(heightCm) ? heightCm : undefined,
    });
  };

  const renderSelect = (
    label: string,
    value: string,
    placeholder: string,
    key: 'gender' | 'activity',
  ) => (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.select}
        onPress={() => setOpenDropdown(key)}
        activeOpacity={0.9}
      >
        <Text style={value ? styles.selectValue : styles.selectPlaceholder}>
          {value || placeholder}
        </Text>
        <Icon
          name={openDropdown === key ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#9CA3AF"
        />
      </TouchableOpacity>
    </View>
  );

  const currentOptions = openDropdown === 'gender'
    ? [...genderOptions, 'Prefer not to say']
    : openDropdown === 'activity'
    ? activityOptions
    : [];

  const currentValue = openDropdown === 'gender' ? gender : activity;

  const handleOptionSelect = (option: string) => {
    if (openDropdown === 'gender') setGender(option);
    if (openDropdown === 'activity') setActivity(option);
    setOpenDropdown(null);
  };

  const inputBox = (
    label: string,
    value: string,
    onChange: (text: string) => void,
    placeholder?: string,
    keyboardType: 'default' | 'number-pad' = 'default',
  ) => (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
        maxLength={3}
      />
    </View>
  );

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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.topRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={20} color="#1F2937" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <View style={styles.brandPill}>
              <Icon name="heart" size={18} color="#ffffffff" />
              <Text style={styles.brandText}>SmartHeal</Text>
            </View>
          </View>

          <View style={styles.progressRow}>
            <Text style={styles.stepText}>Step 1 of 3</Text>
            <Text style={styles.percentText}>33%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={styles.progressBarFill} />
          </View>

          <View style={styles.stepIndicators}>
            <View style={[styles.stepCircle, styles.stepCircleActive]}>
              <Text style={styles.stepCircleText}>1</Text>
              <Text style={styles.stepLabel}>Basic</Text>
            </View>
            <View style={styles.stepCircle}>
              <Text style={styles.stepCircleText}>2</Text>
              <Text style={styles.stepLabel}>Health</Text>
            </View>
            <View style={styles.stepCircle}>
              <Text style={styles.stepCircleText}>3</Text>
              <Text style={styles.stepLabel}>Goals</Text>
            </View>
          </View>

          <View style={styles.heroIconWrapper}>
            <LinearGradient colors={['#FF5F6D', '#FF7E33']} style={styles.heroIconBg}>
              <Icon name="account" size={44} color="#FFFFFF" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Basic Information</Text>
          <Text style={styles.subtitle}>Help us personalize your therapy experience</Text>

          <View style={styles.card}>
            <View style={styles.row}>
              {inputBox('Age', age, setAge, undefined, 'number-pad')}
              <View style={styles.spacer} />
              {renderSelect('Gender', gender, 'Select', 'gender')}
            </View>

            <View style={styles.row}>
              {inputBox('Weight (kg)', weight, setWeight, undefined, 'number-pad')}
              <View style={styles.spacer} />
              {inputBox('Height (cm)', height, setHeight, undefined, 'number-pad')}
            </View>

            <View style={styles.fullWidthInput}>
              {renderSelect('Activity Level', activity, 'Select your activity level', 'activity')}
            </View>
          </View>

          <View style={styles.ctaRow}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleContinue}
              disabled={!isValid}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#F43B47', '#FF7300']}
                style={[styles.primaryGradient, !isValid && { opacity: 0.6 }]}
              >
                <Text style={styles.primaryText}>Continue</Text>
                <Icon name="chevron-right" size={18} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() =>
                navigation.navigate('MedicalHistory', {
                  weightKg: undefined,
                  heightCm: undefined,
                })
              }
            >
              <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={Boolean(openDropdown)}
            transparent
            animationType="fade"
            onRequestClose={() => setOpenDropdown(null)}
          >
            <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setOpenDropdown(null)}>
              <View style={styles.modalCard}>
                {currentOptions.map((opt) => {
                  const selected = currentValue === opt;
                  return (
                    <TouchableOpacity
                      key={opt}
                      style={[styles.optionRow, selected && styles.optionRowActive]}
                      onPress={() => handleOptionSelect(opt)}
                      activeOpacity={0.9}
                    >
                      <Text style={[styles.optionText, selected && styles.optionTextActive]}>{opt}</Text>
                      {selected && <Icon name="check" size={18} color="#F43B47" />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
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
  scrollContent: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 28 },
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
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  brandText: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  stepText: { color: '#6B7280', fontWeight: '700' },
  percentText: { color: '#F52E32', fontWeight: '700' },
  progressBarTrack: { height: 6, borderRadius: 6, backgroundColor: '#F1F5F9', overflow: 'hidden', marginBottom: 14 },
  progressBarFill: { width: '33%', height: '100%', backgroundColor: '#F52E32' },
  stepIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepCircle: { alignItems: 'center', gap: 4 },
  stepCircleActive: {},
  stepCircleText: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
    color: '#111827',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  stepLabel: { color: '#6B7280', fontSize: 12 },
  heroIconWrapper: { alignItems: 'center', marginBottom: 14 },
  heroIconBg: {
    width: 120,
    height: 120,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
  },
  title: { fontSize: 26, fontWeight: '800', color: '#C82121', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 15, color: '#4B5563', textAlign: 'center', marginBottom: 14 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    marginBottom: 18,
    gap: 12,
  },
  row: { flexDirection: 'row', gap: 12 },
  spacer: { width: 12 },
  inputWrapper: { flex: 1, gap: 6 },
  inputLabel: { color: '#111827', fontWeight: '700', fontSize: 13 },
  input: {
    backgroundColor: '#F5F7FB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    height: 48,
    color: '#0F172A',
    fontWeight: '600',
  },
  fullWidthInput: { gap: 6 },
  select: {
    backgroundColor: '#F5F7FB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectPlaceholder: { color: '#9CA3AF', fontWeight: '500' },
  selectValue: { color: '#0F172A', fontWeight: '700' },
  ctaRow: { gap: 10 },
  primaryButton: { borderRadius: 16, overflow: 'hidden' },
  primaryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  skipButton: { alignItems: 'center', paddingVertical: 8 },
  skipText: { color: '#4B5563', fontWeight: '600' },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.16,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    gap: 4,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  optionRowActive: {
    backgroundColor: '#FFF3F3',
  },
  optionText: { color: '#111827', fontWeight: '600' },
  optionTextActive: { color: '#C82121' },
});

export default BasicInfoScreen;
