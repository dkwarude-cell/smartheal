import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#1A1A1A', '#FF0000']} style={styles.gradient}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Icon name="hand-heart" size={88} color="#FF3B30" />
          </View>
          <Text style={styles.title}>Welcome to SmartHeal</Text>
          <Text style={styles.subtitle}>
            Continue to sign in or create a new account to personalize your therapy journey.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <LinearGradient colors={['#FF3B30', '#FF2D55']} style={styles.buttonGradient}>
              <Text style={styles.primaryButtonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.secondaryButtonText}>Create New Account</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, gap: 16 },
  iconContainer: { marginBottom: 12 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#B0B0B0', textAlign: 'center', marginBottom: 24 },
  primaryButton: { borderRadius: 12, overflow: 'hidden', width: '100%' },
  secondaryButton: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF3B30',
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
  },
  buttonGradient: { paddingVertical: 16, alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  secondaryButtonText: { color: '#FF3B30', fontSize: 18, fontWeight: 'bold' },
});

export default WelcomeScreen;
