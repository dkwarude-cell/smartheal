import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TherapyScreen = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const [intensity, setIntensity] = useState(5);
  const [duration, setDuration] = useState(20);
  const [selected, setSelected] = useState<string>('');

  const bodyParts = [
    { id: 'shoulder', label: 'Shoulder', icon: 'arm-flex' },
    { id: 'knee', label: 'Knee', icon: 'walk' },
    { id: 'back', label: 'Back', icon: 'human-handsup' },
    { id: 'ankle', label: 'Ankle', icon: 'shoe-print' },
  ];

  const quickPrograms = [
    { id: 'pain', label: 'Pain Relief', minutes: 20, level: 5 },
    { id: 'recovery', label: 'Muscle Recovery', minutes: 25, level: 3 },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#0f0f0f', '#121212']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Therapy Session</Text>
          <Text style={styles.subtitle}>Ready to start with guidance</Text>

          <TouchableOpacity
            style={styles.statusCard}
            activeOpacity={0.9}
            onPress={() => setSessionActive((prev) => !prev)}
          >
            <LinearGradient colors={['#1f1f1f', '#1a1a1a']} style={styles.statusGradient}>
              <Text style={styles.statusHint}>Ready to Start</Text>
              <Text style={styles.statusCTA}>{sessionActive ? 'Tap to stop' : 'Tap to begin'}</Text>
              <Text style={styles.statusTime}>{sessionActive ? `${duration}:00` : 'Device connects on start'}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Select Body Part</Text>
          <View style={styles.bodyPartsGrid}>
            {bodyParts.map((part) => {
              const active = selected === part.id;
              return (
                <TouchableOpacity
                  key={part.id}
                  style={[styles.bodyPartCard, active && styles.bodyPartCardActive]}
                  onPress={() => setSelected(part.id)}
                  activeOpacity={0.9}
                >
                  <Icon name={part.icon} size={30} color={active ? '#FF4D4D' : '#FF3B3B'} />
                  <Text style={styles.bodyPartLabel}>{part.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>Intensity Level</Text>
          <View style={styles.intensityCard}>
            <Text style={styles.intensityValue}>{intensity}</Text>
            <View style={styles.intensityButtons}>
              <TouchableOpacity
                style={styles.intensityButton}
                onPress={() => setIntensity((prev) => Math.max(1, prev - 1))}
              >
                <Icon name="minus" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${intensity * 10}%` }]} />
              </View>
              <TouchableOpacity
                style={styles.intensityButton}
                onPress={() => setIntensity((prev) => Math.min(10, prev + 1))}
              >
                <Icon name="plus" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.intensityLabels}>
              <Text style={styles.intensityLabelText}>Gentle</Text>
              <Text style={styles.intensityLabelText}>Moderate</Text>
              <Text style={styles.intensityLabelText}>Strong</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Quick Start Programs</Text>
          <View style={styles.programList}>
            {quickPrograms.map((program) => (
              <TouchableOpacity
                key={program.id}
                style={styles.programCard}
                activeOpacity={0.9}
                onPress={() => {
                  setIntensity(program.level);
                  setDuration(program.minutes);
                }}
              >
                <View>
                  <Text style={styles.programTitle}>{program.label}</Text>
                  <Text style={styles.programMeta}>{program.minutes} min · Level {program.level}</Text>
                </View>
                <Icon name="chevron-right" size={20} color="#8B8B8B" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { fontSize: 14, color: '#B3B3B3', marginTop: 6, marginBottom: 24 },
  statusCard: { borderRadius: 16, overflow: 'hidden', marginBottom: 28 },
  statusGradient: { padding: 20, backgroundColor: '#1c1c1c' },
  statusHint: { color: '#B3B3B3', fontSize: 13, marginBottom: 6 },
  statusCTA: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  statusTime: { color: '#8B8B8B', fontSize: 12, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 12 },
  bodyPartsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  bodyPartCard: { width: '48%', backgroundColor: '#1f1f1f', padding: 16, borderRadius: 14, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#2a2a2a' },
  bodyPartCardActive: { borderColor: '#FF4D4D', backgroundColor: '#2a1111' },
  bodyPartLabel: { fontSize: 14, color: '#FFFFFF', marginTop: 8, fontWeight: '600' },
  intensityCard: { backgroundColor: '#1f1f1f', padding: 18, borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2a', marginBottom: 20 },
  intensityValue: { fontSize: 42, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 14 },
  intensityButtons: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  intensityButton: { width: 50, height: 50, backgroundColor: '#FF2E2E', borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  progressTrack: { flex: 1, height: 6, backgroundColor: '#2f2f2f', borderRadius: 999, marginHorizontal: 12 },
  progressFill: { height: 6, borderRadius: 999, backgroundColor: '#FF4D4D' },
  intensityLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  intensityLabelText: { color: '#8B8B8B', fontSize: 12 },
  programList: { gap: 12 },
  programCard: { backgroundColor: '#1f1f1f', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2a', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  programTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  programMeta: { color: '#8B8B8B', fontSize: 13, marginTop: 4 },
});

export default TherapyScreen;
