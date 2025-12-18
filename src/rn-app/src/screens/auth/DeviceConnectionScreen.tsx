import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation.types';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type DeviceConnectionScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'DeviceConnection'>;

interface DeviceConnectionScreenProps {
  navigation: DeviceConnectionScreenNavigationProp;
}

const DeviceConnectionScreen: React.FC<DeviceConnectionScreenProps> = () => {
  const { login } = useAuth();

  const handleSkip = async () => {
    // Mock user login
    await login({
      uid: '123',
      email: 'user@example.com',
      displayName: 'Test User',
      phoneNumber: '+1234567890',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      emailVerified: true,
      healthProfile: {
        age: 30,
        weight: 70,
        height: 170,
        medicalConditions: [],
        goals: [],
      },
      preferences: {
        notifications: true,
        darkMode: true,
        language: 'en',
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Connect Your Device</Text>
        <Text style={styles.subtitle}>Pair your SmartHeal therapy device via Bluetooth</Text>
        <Button title="Scan for Devices" onPress={handleSkip} gradient fullWidth style={{ marginBottom: spacing.md }} />
        <Button title="Skip for Now" onPress={handleSkip} variant="ghost" fullWidth />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { flex: 1, justifyContent: 'center', padding: spacing.lg },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.md },
  subtitle: { fontSize: 16, color: colors.text.secondary, marginBottom: spacing.xxl },
});

export default DeviceConnectionScreen;
