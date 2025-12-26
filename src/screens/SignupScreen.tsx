import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const { signUp } = useAuth();

  const handleSignup = async () => {
    if (!fullName || !phone || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (!agree) {
      Alert.alert('Error', 'Please accept the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, fullName);
      navigation.navigate('OTP', { email });
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message || 'Could not create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient colors={['#FFF5EF', '#FFFFFF']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
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

          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join SmartHeal for personalized therapy</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputRow}>
                <Icon name="account-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
                <Input
                  placeholder="Enter your full name"
                  value={fullName}
                  onChangeText={setFullName}
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputRow}>
                <Icon name="email-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputRow}>
                <Icon name="phone-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
                <Input
                  placeholder="Enter your phone number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputRow}>
                <Icon name="lock-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
                <Input
                  placeholder="Create a password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                  <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputRow}>
                <Icon name="lock-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
                <Input
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                  <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.agreeRow}>
              <TouchableOpacity style={styles.checkbox} onPress={() => setAgree((prev) => !prev)}>
                {agree ? <Icon name="check" size={18} color="#F52E32" /> : null}
              </TouchableOpacity>
              <Text style={styles.agreeText}>
                I agree to the{' '}
                <Text style={styles.linkText} onPress={() => Alert.alert('Terms of Service', 'Terms of Service link coming soon')}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.linkText} onPress={() => Alert.alert('Privacy Policy', 'Privacy Policy link coming soon')}>Privacy Policy</Text>
              </Text>
            </View>

            <Button
              title={loading ? 'Creating Account...' : 'Create Account'}
              onPress={handleSignup}
              disabled={loading || !agree}
              loading={loading}
              style={[styles.primaryButton, (!agree || loading) && { opacity: 0.7 }]}
            />

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLinkRow}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <Text style={styles.linkText}>Sign in here</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { color: '#1F2937', fontSize: 15, fontWeight: '600' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandText: { fontSize: 17, fontWeight: '700', color: '#111827' },
  header: { marginBottom: 20 },
  title: { fontSize: 26, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  subtitle: { fontSize: 16, color: '#4B5563', lineHeight: 22 },
  form: { flex: 1, gap: 0 },
  inputWrapper: { marginBottom: 16, gap: 6 },
  label: { color: '#111827', fontWeight: '700' },
  inputRow: { position: 'relative', justifyContent: 'center' },
  inputIcon: { position: 'absolute', left: 12, top: 16, zIndex: 1 },
  eyeButton: { position: 'absolute', right: 12, top: 8, zIndex: 1, padding: 8 },
  input: {
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#F4F5F7',
    borderColor: '#E5E7EB',
    height: 52,
    color: '#111827',
    fontWeight: '600',
  },
  primaryButton: { marginTop: 12, marginBottom: 20, backgroundColor: '#F52E32', borderRadius: 14 },
  agreeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4, marginBottom: 8 },
  checkbox: { width: 28, height: 28, borderRadius: 8, borderWidth: 1.5, borderColor: '#D1D5DB', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  agreeText: { flex: 1, color: '#4B5563', fontSize: 14, lineHeight: 20 },
  linkText: { color: '#F52E32', fontWeight: '700' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 10 },
  divider: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  dividerText: { color: '#9CA3AF', fontWeight: '600' },
  loginLinkRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 6 },
  loginText: { color: '#4B5563', fontSize: 14 },
});

export default SignupScreen;
