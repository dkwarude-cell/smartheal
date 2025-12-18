import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useDevice } from '../context/DeviceContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'DeviceConnection'>;

const DeviceConnectionScreen = ({ navigation }: Props) => {
  const [scanning, setScanning] = useState(false);
  const { connectDevice } = useDevice();

  const handleConnect = async () => {
    setScanning(true);
    try {
      await connectDevice('device-123');
      navigation.navigate('ConnectionSuccess');
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setScanning(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#1A1A1A']} style={styles.gradient}>
        <View style={styles.content}>
          <View style={styles.deviceIcon}>
            <Icon name="bluetooth" size={80} color="#FF0000" />
          </View>
          <Text style={styles.title}>Connect Your Device</Text>
          <Text style={styles.subtitle}>
            Make sure your SmartHeal ITT device is powered on and nearby
          </Text>

          {scanning ? (
            <View style={styles.scanningContainer}>
              <ActivityIndicator size="large" color="#FF0000" />
              <Text style={styles.scanningText}>Searching for devices...</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleConnect}>
              <LinearGradient colors={['#FF0000', '#CC0000']} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>Scan for Devices</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => navigation.navigate('MainApp')}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  deviceIcon: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 16, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#B0B0B0', textAlign: 'center', marginBottom: 60 },
  scanningContainer: { alignItems: 'center', marginBottom: 40 },
  scanningText: { color: '#B0B0B0', marginTop: 16, fontSize: 16 },
  button: { borderRadius: 12, overflow: 'hidden', width: '100%', marginBottom: 20 },
  buttonGradient: { paddingVertical: 16, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  skipText: { color: '#666666', fontSize: 16 },
});

export default DeviceConnectionScreen;
