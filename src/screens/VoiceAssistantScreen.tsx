import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function VoiceAssistantScreen() {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  const toggle = () => {
    setIsListening((prev) => !prev);
    if (!isListening) {
      setLastCommand(null);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#1A1A1A']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Voice Assistant</Text>
          <Text style={styles.subtitle}>Hands-free therapy control</Text>

          <View style={styles.center}>
            <TouchableOpacity style={styles.micButton} onPress={toggle} activeOpacity={0.9}>
              <LinearGradient
                colors={isListening ? ['#00C6AE', '#008C7A'] : ['#FF0000', '#CC0000']}
                style={styles.micGradient}
              >
                <Icon name={isListening ? 'microphone' : 'microphone-outline'} size={34} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.hint}>{isListening ? 'Listening…' : 'Tap to start listening'}</Text>
          </View>

          {lastCommand ? (
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Last command</Text>
              <Text style={styles.cardValue}>{lastCommand}</Text>
            </View>
          ) : null}

          <Text style={styles.sectionTitle}>Quick Commands</Text>
          {['Start session', 'Pause session', 'Stop session', 'Increase intensity', 'Decrease intensity'].map((cmd) => (
            <TouchableOpacity key={cmd} style={styles.commandRow} onPress={() => setLastCommand(cmd)}>
              <View style={styles.commandIcon}>
                <Icon name="chevron-right" size={20} color="#FF3B3B" />
              </View>
              <Text style={styles.commandText}>{cmd}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#B0B0B0', marginBottom: 28 },
  center: { alignItems: 'center', marginBottom: 20 },
  micButton: { borderRadius: 999, overflow: 'hidden' },
  micGradient: { width: 86, height: 86, borderRadius: 43, justifyContent: 'center', alignItems: 'center' },
  hint: { color: '#B0B0B0', marginTop: 12, fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginTop: 12, marginBottom: 10 },
  commandRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2A2A2A', padding: 14, borderRadius: 12, marginBottom: 10 },
  commandIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,0,0,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  commandText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  card: { backgroundColor: '#111827', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#2A2A2A', marginBottom: 10 },
  cardLabel: { color: '#9CA3AF', fontSize: 12, marginBottom: 4 },
  cardValue: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});
