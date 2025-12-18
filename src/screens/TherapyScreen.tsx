import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TherapyScreen = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const [intensity, setIntensity] = useState(5);
  const [duration, setDuration] = useState(20);

  const bodyParts = [
    { id: 'shoulder', label: 'Shoulder', icon: 'arm-flex' },
    { id: 'knee', label: 'Knee', icon: 'walk' },
    { id: 'back', label: 'Back', icon: 'human-handsup' },
    { id: 'ankle', label: 'Ankle', icon: 'shoe-print' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#1A1A1A']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Therapy Session</Text>

          {/* Session Status */}
          <View style={styles.statusCard}>
            <LinearGradient
              colors={sessionActive ? ['#00C6AE', '#008C7A'] : ['#2A2A2A', '#1A1A1A']}
              style={styles.statusGradient}
            >
              <Text style={styles.statusText}>
                {sessionActive ? 'Session Active' : 'Ready to Start'}
              </Text>
              <Text style={styles.statusTime}>
                {sessionActive ? `${duration}:00` : 'Tap to begin'}
              </Text>
            </LinearGradient>
          </View>

          {/* Body Part Selector */}
          <Text style={styles.sectionTitle}>Select Body Part</Text>
          <View style={styles.bodyPartsGrid}>
            {bodyParts.map((part) => (
              <TouchableOpacity key={part.id} style={styles.bodyPartCard}>
                <Icon name={part.icon} size={32} color="#FF0000" />
                <Text style={styles.bodyPartLabel}>{part.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Intensity Control */}
          <Text style={styles.sectionTitle}>Intensity Level</Text>
          <View style={styles.intensityCard}>
            <Text style={styles.intensityValue}>{intensity}</Text>
            <View style={styles.intensityButtons}>
              <TouchableOpacity
                style={styles.intensityButton}
                onPress={() => setIntensity(Math.max(1, intensity - 1))}
              >
                <Icon name="minus" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.intensityButton}
                onPress={() => setIntensity(Math.min(10, intensity + 1))}
              >
                <Icon name="plus" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Start/Stop Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setSessionActive(!sessionActive)}
          >
            <LinearGradient
              colors={sessionActive ? ['#FF3B30', '#CC0000'] : ['#FF0000', '#CC0000']}
              style={styles.buttonGradient}
            >
              <Icon
                name={sessionActive ? 'stop' : 'play'}
                size={28}
                color="#FFFFFF"
              />
              <Text style={styles.actionButtonText}>
                {sessionActive ? 'Stop Session' : 'Start Session'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 60 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 24 },
  statusCard: { marginBottom: 24, borderRadius: 16, overflow: 'hidden' },
  statusGradient: { padding: 24, alignItems: 'center' },
  statusText: { fontSize: 18, color: '#FFFFFF', fontWeight: '600', marginBottom: 8 },
  statusTime: { fontSize: 36, fontWeight: 'bold', color: '#FFFFFF' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 16 },
  bodyPartsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  bodyPartCard: { width: '48%', backgroundColor: '#2A2A2A', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  bodyPartLabel: { fontSize: 14, color: '#FFFFFF', marginTop: 8, fontWeight: '600' },
  intensityCard: { backgroundColor: '#2A2A2A', padding: 24, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  intensityValue: { fontSize: 48, fontWeight: 'bold', color: '#FFFFFF' },
  intensityButtons: { flexDirection: 'row' },
  intensityButton: { width: 48, height: 48, backgroundColor: '#FF0000', borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
  actionButton: { borderRadius: 16, overflow: 'hidden' },
  buttonGradient: { flexDirection: 'row', paddingVertical: 20, justifyContent: 'center', alignItems: 'center' },
  actionButtonText: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginLeft: 12 },
});

export default TherapyScreen;
