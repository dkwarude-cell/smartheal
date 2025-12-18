import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Button } from '../ui/button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'OTP'>;

const OTPScreen = ({ navigation, route }: Props) => {
  const { email } = route.params;
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const [counter, setCounter] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (value: string, index: number) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    if (!digit && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) {
      Alert.alert('Incomplete Code', 'Please enter the 6-digit code.');
      return;
    }
    navigation.navigate('ProfileType');
  };

  const resetAndResend = (method: 'sms' | 'call' | 'email') => {
    if (counter > 0 && method === 'sms') return;
    setOtp(['', '', '', '', '', '']);
    inputsRef.current[0]?.focus();
    setCounter(30);
    const target = method === 'call' ? 'Call' : method === 'email' ? 'Email' : 'SMS';
    Alert.alert('Code sent', `We have sent a new code via ${target}.`);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFF5EF', '#FFFFFF']} style={styles.gradient}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#1F2937" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.brandRow}>
            <Icon name="heart" size={22} color="#F52E32" />
            <Text style={styles.brandText}>SmartHeal</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <LinearGradient colors={['#FF5F6D', '#FF7E33']} style={styles.heroIconBg}>
            <Icon name="message-text-outline" size={42} color="#FFFFFF" />
          </LinearGradient>
          <Text style={styles.title}>Verify Your Number</Text>
          <Text style={styles.subtitle}>We've sent a 6-digit code to</Text>
          <Text style={styles.phoneText}>{email}</Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputsRef.current[index] = ref)}
              style={styles.otpInput}
              value={digit}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        <TouchableOpacity
          disabled={counter > 0}
          onPress={() => resetAndResend('sms')}
          style={styles.resendRow}
        >
          <Text style={[styles.resendText, counter > 0 && styles.resendDisabled]}>
            {counter > 0 ? `Resend code in ${counter}s` : 'Resend code'}
          </Text>
        </TouchableOpacity>

        <Button
          title="Verify Code"
          onPress={handleVerify}
          style={styles.primaryButton}
        />

        <Text style={styles.helper}>Didn't receive the code?</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => resetAndResend('call')}>
            <Icon name="phone" size={18} color="#1F2937" />
            <Text style={styles.secondaryText}>Call Me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => resetAndResend('email')}>
            <Icon name="email-outline" size={18} color="#1F2937" />
            <Text style={styles.secondaryText}>Email Code</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Icon name="lock-outline" size={18} color="#1F3B72" />
          <Text style={styles.infoText}>
            This verification step ensures the security of your SmartHeal account and medical data
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 28 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { color: '#1F2937', fontSize: 15, fontWeight: '600' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandText: { fontSize: 17, fontWeight: '700', color: '#111827' },
  hero: { alignItems: 'center', marginTop: 8, marginBottom: 18, paddingHorizontal: 10 },
  heroIconBg: {
    width: 90,
    height: 90,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  title: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#4B5563', marginBottom: 2 },
  phoneText: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 10 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 6, marginBottom: 12 },
  otpInput: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F4F5F7',
    textAlign: 'center',
    fontSize: 20,
    color: '#0F172A',
  },
  resendRow: { alignItems: 'center', marginBottom: 14 },
  resendText: { fontSize: 15, fontWeight: '700', color: '#F52E32' },
  resendDisabled: { color: '#9CA3AF' },
  primaryButton: { marginVertical: 10, backgroundColor: '#F52E32', borderRadius: 14 },
  helper: { textAlign: 'center', color: '#4B5563', marginTop: 2, marginBottom: 10 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 16 },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  secondaryText: { color: '#1F2937', fontWeight: '700' },
  infoCard: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#E8F0FF',
    borderWidth: 1,
    borderColor: '#D7E3FF',
    alignItems: 'center',
  },
  infoText: { flex: 1, color: '#1F3B72', fontSize: 13, lineHeight: 18 },
});

export default OTPScreen;
