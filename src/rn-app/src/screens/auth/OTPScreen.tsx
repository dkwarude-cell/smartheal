import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../types/navigation.types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type OTPScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OTP'>;
type OTPScreenRouteProp = RouteProp<AuthStackParamList, 'OTP'>;

interface OTPScreenProps {
  navigation: OTPScreenNavigationProp;
  route: OTPScreenRouteProp;
}

const OTPScreen: React.FC<OTPScreenProps> = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    navigation.navigate('ProfileSetup', { user: { email: route.params.email } as any });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>Sent to {route.params.phone}</Text>
        <Input label="OTP Code" value={otp} onChangeText={setOtp} placeholder="Enter 6-digit code" keyboardType="number-pad" maxLength={6} />
        <Button title="Verify" onPress={handleVerify} gradient fullWidth />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { flex: 1, justifyContent: 'center', padding: spacing.lg },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.md },
  subtitle: { fontSize: 16, color: colors.text.secondary, marginBottom: spacing.xl },
});

export default OTPScreen;
