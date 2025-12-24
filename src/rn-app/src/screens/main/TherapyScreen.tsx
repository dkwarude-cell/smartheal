import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TherapyScreen: React.FC = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const [intensity, setIntensity] = useState(4);
  const [duration, setDuration] = useState(20);
  const [selected, setSelected] = useState<string>('');

  const bodyParts = [
    { id: 'shoulder', label: 'Shoulder', icon: 'arm-flex' },
    { id: 'knee', label: 'Knee', icon: 'walk' },
    { id: 'back', label: 'Back', icon: 'human-handsup' },
    { id: 'ankle', label: 'Ankle', icon: 'shoe-print' },
  ];

  const programs = [
    { id: 'pain', label: 'Pain Relief', minutes: 20, level: 5 },
    { id: 'recovery', label: 'Muscle Recovery', minutes: 25, level: 3 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[colors.background.primary, '#0f0f0f', '#121212']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Therapy Session</Text>
          <Text style={styles.subtitle}>Ready to start with guidance</Text>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setSessionActive((prev) => !prev)}
            style={styles.card}
          >
            <Text style={styles.cardHint}>Ready to Start</Text>
            <Text style={styles.cardCTA}>{sessionActive ? 'Tap to stop' : 'Tap to begin'}</Text>
            <Text style={styles.cardMeta}>{sessionActive ? `${duration}:00` : 'Device connects on start'}</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Select Body Part</Text>
          <View style={styles.grid}>
            {bodyParts.map((part) => {
              const active = selected === part.id;
              return (
                <TouchableOpacity
                  key={part.id}
                  activeOpacity={0.9}
                  style={[styles.bodyCard, active && styles.bodyCardActive]}
                  onPress={() => setSelected(part.id)}
                >
                  <Icon name={part.icon} size={28} color={active ? '#ff4d4d' : '#ff3b3b'} />
                  <Text style={styles.bodyLabel}>{part.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>Intensity Level</Text>
          <View style={styles.intensityCard}>
            <Text style={styles.intensityValue}>{intensity}</Text>
            <View style={styles.intensityRow}>
              <TouchableOpacity
                style={styles.intensityButton}
                onPress={() => setIntensity((prev) => Math.max(1, prev - 1))}
              >
                <Icon name="minus" size={22} color="#fff" />
              </TouchableOpacity>
              <View style={styles.track}>
                <View style={[styles.fill, { width: `${intensity * 10}%` }]} />
              </View>
              <TouchableOpacity
                style={styles.intensityButton}
                onPress={() => setIntensity((prev) => Math.min(10, prev + 1))}
              >
                <Icon name="plus" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.intensityLabels}>
              <Text style={styles.labelText}>Gentle</Text>
              <Text style={styles.labelText}>Moderate</Text>
              <Text style={styles.labelText}>Strong</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Quick Start Programs</Text>
          {programs.map((program) => (
            <TouchableOpacity
              key={program.id}
              activeOpacity={0.9}
              style={styles.programCard}
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
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  gradient: { flex: 1 },
  scrollContent: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, color: '#b3b3b3', marginTop: 6, marginBottom: spacing.lg },
  card: { backgroundColor: '#1f1f1f', padding: spacing.lg, borderRadius: 16, borderWidth: 1, borderColor: '#2a2a2a', marginBottom: spacing.lg },
  cardHint: { color: '#b3b3b3', fontSize: 13, marginBottom: 6 },
  cardCTA: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  cardMeta: { color: '#8b8b8b', fontSize: 12, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: spacing.lg },
  bodyCard: { width: '48%', backgroundColor: '#1f1f1f', padding: spacing.md, borderRadius: 14, alignItems: 'center', marginBottom: spacing.sm, borderWidth: 1, borderColor: '#2a2a2a' },
  bodyCardActive: { borderColor: '#ff4d4d', backgroundColor: '#2a1111' },
  bodyLabel: { fontSize: 14, color: '#fff', marginTop: 8, fontWeight: '600' },
  intensityCard: { backgroundColor: '#1f1f1f', padding: spacing.md + 4, borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2a', marginBottom: spacing.lg },
  intensityValue: { fontSize: 40, fontWeight: 'bold', color: '#fff', marginBottom: spacing.md },
  intensityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  intensityButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#ff2e2e', justifyContent: 'center', alignItems: 'center' },
  track: { flex: 1, height: 6, borderRadius: 999, backgroundColor: '#2f2f2f', marginHorizontal: spacing.sm },
  fill: { height: 6, borderRadius: 999, backgroundColor: '#ff4d4d' },
  intensityLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  labelText: { color: '#8b8b8b', fontSize: 12 },
  programCard: { backgroundColor: '#1f1f1f', padding: spacing.md, borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2a', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  programTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  programMeta: { color: '#8b8b8b', fontSize: 13, marginTop: 4 },
});

export default TherapyScreen;
