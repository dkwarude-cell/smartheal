import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AIAssistantScreen = () => {
  const [isListening, setIsListening] = useState(false);

  const suggestions = [
    { id: 1, text: 'Show me proper electrode placement', icon: 'camera' },
    { id: 2, text: 'Analyze my last session', icon: 'chart-line' },
    { id: 3, text: 'Suggest intensity level', icon: 'lightbulb' },
    { id: 4, text: 'Check my progress', icon: 'trophy' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#1A1A1A']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>AI Assistant</Text>
          <Text style={styles.subtitle}>How can I help you today?</Text>

          {/* AI Avatar */}
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#FF0000', '#00C6AE']}
              style={styles.avatarGradient}
            >
              <Icon name="robot" size={80} color="#FFFFFF" />
            </LinearGradient>
          </View>

          {/* Voice Input */}
          <TouchableOpacity
            style={styles.voiceButton}
            onPress={() => setIsListening(!isListening)}
          >
            <LinearGradient
              colors={isListening ? ['#00C6AE', '#008C7A'] : ['#FF0000', '#CC0000']}
              style={styles.voiceButtonGradient}
            >
              <Icon
                name={isListening ? 'microphone' : 'microphone-outline'}
                size={32}
                color="#FFFFFF"
              />
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.voiceHint}>
            {isListening ? 'Listening...' : 'Tap to speak'}
          </Text>

          {/* Suggestions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          {suggestions.map((suggestion) => (
            <TouchableOpacity key={suggestion.id} style={styles.suggestionCard}>
              <View style={styles.suggestionIcon}>
                <Icon name={suggestion.icon} size={24} color="#FF0000" />
              </View>
              <Text style={styles.suggestionText}>{suggestion.text}</Text>
              <Icon name="chevron-right" size={24} color="#666666" />
            </TouchableOpacity>
          ))}

          {/* Camera Access */}
          <TouchableOpacity style={styles.cameraCard}>
            <LinearGradient
              colors={['#2A2A2A', '#1A1A1A']}
              style={styles.cameraGradient}
            >
              <Icon name="camera" size={40} color="#00C6AE" />
              <Text style={styles.cameraTitle}>Placement Guidance</Text>
              <Text style={styles.cameraSubtitle}>
                Use camera to verify electrode placement
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
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#B0B0B0', marginBottom: 32 },
  avatarContainer: { alignItems: 'center', marginBottom: 32 },
  avatarGradient: { width: 160, height: 160, borderRadius: 80, justifyContent: 'center', alignItems: 'center' },
  voiceButton: { alignSelf: 'center', marginBottom: 16 },
  voiceButtonGradient: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
  voiceHint: { textAlign: 'center', color: '#B0B0B0', fontSize: 16, marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 16 },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  suggestionIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,0,0,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  suggestionText: { flex: 1, color: '#FFFFFF', fontSize: 16 },
  cameraCard: { marginTop: 24, borderRadius: 16, overflow: 'hidden' },
  cameraGradient: { padding: 24, alignItems: 'center' },
  cameraTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 16, marginBottom: 8 },
  cameraSubtitle: { fontSize: 14, color: '#B0B0B0', textAlign: 'center' },
});

export default AIAssistantScreen;
