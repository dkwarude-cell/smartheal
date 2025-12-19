import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StatusBar,
  Linking,
} from 'react-native';
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <LinearGradient colors={["#F9FBFF", "#FFFFFF"]} style={styles.gradient}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.heading}>Connect ITT Device</Text>
            <Text style={styles.subheading}>Synchronize your ITT Device for tailored therapy plan</Text>
          </View>

          <View style={styles.deviceBlock}>
            <View style={styles.deviceBadge}>
              <Text style={styles.deviceText}>ITT</Text>
            </View>
            <View style={styles.signalDots}>
              <View style={styles.dot} />
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Connect ITT Device</Text>
            <Text style={styles.infoSubtitle}>
              Synching the ITT device ensures a personalized and effective treatment plan.
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.9} onPress={handleConnect}>
            <LinearGradient colors={["#FF6B6B", "#F52E32"]} style={styles.primaryButton}>
              <Text style={styles.primaryText}>Connect Device</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('MainApp')}>
            <Text style={styles.skipText}>Skip for Now</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.helpButton} onPress={() => Linking.openURL('mailto:support@smartheal.com?subject=Device%20Connection')}> 
            <Text style={styles.helpText}>Need help connecting?</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Modal visible={scanning} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <LinearGradient colors={["#E0ECFF", "#FFFFFF"]} style={styles.modalHeader}>
              <Icon name="bluetooth" size={38} color="#2563EB" />
              <Text style={styles.modalTitle}>Scanning for devices...</Text>
              <Text style={styles.modalHint}>Make sure your ITT device is powered on and nearby.</Text>
            </LinearGradient>
            <View style={styles.modalBody}>
              <ActivityIndicator size="large" color="#F52E32" />
              <Text style={styles.modalStatus}>Searching SmartHeal ITT</Text>
            </View>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setScanning(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  gradient: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 18, alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 16 },
  heading: { fontSize: 18, fontWeight: '700', color: '#111827' },
  subheading: { fontSize: 12, color: '#4B5563', textAlign: 'center', marginTop: 6 },
  deviceBlock: { alignItems: 'center', marginBottom: 18 },
  deviceBadge: {
    width: 90,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#0B0B0B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  deviceText: { color: '#FFFFFF', fontWeight: '800', letterSpacing: 0.5 },
  signalDots: { flexDirection: 'row', gap: 6, marginTop: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D1D5DB' },
  dotActive: { backgroundColor: '#2563EB' },
  infoCard: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(59,130,246,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(59,130,246,0.16)',
    marginBottom: 14,
  },
  infoTitle: { textAlign: 'center', color: '#1D4ED8', fontWeight: '700', marginBottom: 4 },
  infoSubtitle: { textAlign: 'center', color: '#4B5563', fontSize: 12, lineHeight: 16 },
  primaryButton: {
    width: 240,
    alignSelf: 'center',
    paddingVertical: 14,
    borderRadius: 999,
    shadowColor: '#F52E32',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  primaryText: { color: '#FFFFFF', textAlign: 'center', fontWeight: '800', fontSize: 14 },
  skipButton: {
    marginTop: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 240,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  skipText: { color: '#4B5563', fontWeight: '700' },
  helpButton: { marginTop: 14 },
  helpText: { color: '#2563EB', fontWeight: '700', textDecorationLine: 'underline' },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  modalHeader: { padding: 16, alignItems: 'center', gap: 8 },
  modalTitle: { fontWeight: '800', color: '#111827', fontSize: 16 },
  modalHint: { color: '#4B5563', textAlign: 'center', fontSize: 12 },
  modalBody: { alignItems: 'center', paddingVertical: 18, gap: 8 },
  modalStatus: { color: '#111827', fontWeight: '700' },
  modalCancel: { paddingVertical: 12, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  modalCancelText: { color: '#EF4444', fontWeight: '700' },
});

export default DeviceConnectionScreen;
