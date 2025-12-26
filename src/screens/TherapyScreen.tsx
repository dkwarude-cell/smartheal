import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const TherapyScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [sessionMode, setSessionMode] = useState<'guided' | 'pro'>('guided');
  const [sessionActive, setSessionActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [targetDuration, setTargetDuration] = useState(1200);
  const [intensity, setIntensity] = useState(5);
  const [duration, setDuration] = useState(20);
  const [selected, setSelected] = useState<string>('');
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('20');
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const bodyParts = [
    { id: 'shoulder', label: 'Shoulder', icon: 'arm-flex' },
    { id: 'knee', label: 'Knee', icon: 'walk' },
    { id: 'back', label: 'Back', icon: 'human-handsup' },
    { id: 'ankle', label: 'Ankle', icon: 'shoe-print' },
  ];

  const quickPrograms = [
    { id: 'pain', label: 'Pain Relief', minutes: 20, level: 5, icon: 'flash' },
    { id: 'recovery', label: 'Muscle Recovery', minutes: 25, level: 3, icon: 'heart-pulse' },
    { id: 'stress', label: 'Stress Relief', minutes: 15, level: 2, icon: 'brain' },
    { id: 'custom', label: 'Custom Program', minutes: 0, level: 3, icon: 'cog' },
  ];

  const recentSessions = [
    { date: 'Today 2:30 PM', duration: '23 min', program: 'Pain Relief', rating: 4 },
    { date: 'Today 9:15 AM', duration: '20 min', program: 'Muscle Recovery', rating: 5 },
    { date: 'Yesterday 7:45 PM', duration: '25 min', program: 'Stress Relief', rating: 4 },
  ];

  const timerPresets = [10, 15, 20, 25, 30, 45];

  // Timer effect
  useEffect(() => {
    if (sessionActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setSessionTime(prev => {
          const newTime = prev + 1;
          if (newTime >= targetDuration) {
            handleStopSession();
            return targetDuration;
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sessionActive, isPaused, targetDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = () => {
    setSessionActive(true);
    setIsPaused(false);
  };

  const handlePauseSession = () => {
    setIsPaused(true);
  };

  const handleResumeSession = () => {
    setIsPaused(false);
  };

  const handleStopSession = () => {
    setSessionActive(false);
    setIsPaused(false);
    setSessionTime(0);
  };

  const handleBodyPartSelect = (partId: string) => {
    setSelected(partId);
    if (selectedBodyParts.includes(partId)) {
      setSelectedBodyParts(selectedBodyParts.filter(p => p !== partId));
    } else {
      setSelectedBodyParts([...selectedBodyParts, partId]);
    }
  };

  const handleQuickProgram = (program: typeof quickPrograms[0]) => {
    if (program.minutes > 0) {
      setIntensity(program.level);
      setDuration(program.minutes);
      setTargetDuration(program.minutes * 60);
    }
  };

  const handleVoiceControl = () => {
    setIsVoiceListening(true);
    setTimeout(() => {
      setIsVoiceListening(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFFFFF', '#F8FBFF']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Therapy Center</Text>
            <Text style={styles.subtitle}>Personalized ITT therapy sessions</Text>
          </View>

          {/* Mode Selection */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Select Session Mode</Text>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, sessionMode === 'guided' && styles.tabActive]}
                onPress={() => setSessionMode('guided')}
              >
                <Text style={[styles.tabText, sessionMode === 'guided' && styles.tabTextActive]}>Guided Mode</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, sessionMode === 'pro' && styles.tabActive]}
                onPress={() => setSessionMode('pro')}
              >
                <Text style={[styles.tabText, sessionMode === 'pro' && styles.tabTextActive]}>Pro Mode</Text>
              </TouchableOpacity>
            </View>

            {sessionMode === 'guided' ? (
              <View style={styles.modeCard}>
                <View style={styles.modeIconContainer}>
                  <Icon name="brain" size={20} color="#2563EB" />
                </View>
                <View style={styles.modeContent}>
                  <Text style={styles.modeTitle}>AI-Guided Session</Text>
                  <Text style={styles.modeDescription}>
                    Perfect for beginners. Get real-time placement guidance, automated intensity adjustment, and voice instructions.
                  </Text>
                  <View style={styles.badgeRow}>
                    <View style={styles.badge}><Text style={styles.badgeText}>Auto-adjustment</Text></View>
                    <View style={styles.badge}><Text style={styles.badgeText}>Voice guidance</Text></View>
                    <View style={styles.badge}><Text style={styles.badgeText}>Safety monitoring</Text></View>
                  </View>
                </View>
              </View>
            ) : (
              <View style={[styles.modeCard, styles.modeCardPro]}>
                <View style={[styles.modeIconContainer, styles.modeIconPro]}>
                  <Icon name="cog" size={20} color="#7C3AED" />
                </View>
                <View style={styles.modeContent}>
                  <Text style={[styles.modeTitle, { color: '#581C87' }]}>Professional Mode</Text>
                  <Text style={[styles.modeDescription, { color: '#6B21A8' }]}>
                    For experienced users. Full manual control over all therapy parameters, custom programs, and advanced analytics.
                  </Text>
                  <View style={styles.badgeRow}>
                    <View style={[styles.badge, styles.badgePro]}><Text style={styles.badgeText}>Manual control</Text></View>
                    <View style={[styles.badge, styles.badgePro]}><Text style={styles.badgeText}>Custom programs</Text></View>
                    <View style={[styles.badge, styles.badgePro]}><Text style={styles.badgeText}>Advanced settings</Text></View>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Body Part Selection */}
          <View style={[styles.card, styles.cardRed]}>
            <View style={styles.cardHeader}>
              <Icon name="target" size={20} color="#DC2626" />
              <Text style={styles.cardTitleRed}>Target Area Selection</Text>
            </View>
            <Text style={styles.cardDescriptionRed}>Select the body parts you want to target for therapy</Text>
            
            <View style={styles.bodyPartsGrid}>
              {bodyParts.map((part) => {
                const active = selectedBodyParts.includes(part.id);
                return (
                  <TouchableOpacity
                    key={part.id}
                    style={[styles.bodyPartCard, active && styles.bodyPartCardActive]}
                    onPress={() => handleBodyPartSelect(part.id)}
                  >
                    <View style={[styles.bodyPartIconContainer, active && styles.bodyPartIconContainerActive]}>
                      <Icon name={part.icon} size={24} color={active ? '#FFFFFF' : '#EF4444'} />
                    </View>
                    <Text style={[styles.bodyPartLabel, active && styles.bodyPartLabelActive]}>{part.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {selectedBodyParts.length > 0 && (
              <View style={styles.selectedPartsContainer}>
                <Text style={styles.selectedPartsTitle}>Selected Areas ({selectedBodyParts.length})</Text>
                <View style={styles.selectedPartsList}>
                  {selectedBodyParts.map((part, index) => (
                    <View key={index} style={styles.selectedPartChip}>
                      <Text style={styles.selectedPartText}>
                        {part.charAt(0).toUpperCase() + part.slice(1)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* AI Camera Analysis - Only show in guided mode */}
          {sessionMode === 'guided' && (
            <View style={[styles.card, styles.cardGreen]}>
              <View style={styles.cardHeader}>
                <Icon name="camera" size={20} color="#16A34A" />
                <Text style={styles.cardTitleGreen}>AI Camera Analysis</Text>
              </View>
              <Text style={styles.cardDescriptionGreen}>
                Capture a photo of the affected area and get AI-powered therapy recommendations
              </Text>
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.buttonGreen}
                  onPress={() => navigation.navigate('AICameraCapture')}
                >
                  <Icon name="camera" size={18} color="#FFFFFF" />
                  <Text style={styles.buttonGreenText}>Capture Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOutlineGreen}>
                  <Icon name="map-marker" size={18} color="#16A34A" />
                  <Text style={styles.buttonOutlineGreenText}>Manual Select</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.aiInfoCard}>
                <Icon name="target" size={28} color="#16A34A" />
                <Text style={styles.aiInfoTitle}>AI Accuracy: 94.2%</Text>
                <Text style={styles.aiInfoSubtitle}>Powered by Vertex AI</Text>
              </View>
            </View>
          )}

          {/* Session Control */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Session Control</Text>

            {/* Session Timer Display */}
            <View style={styles.timerDisplay}>
              <Text style={styles.timerText}>{formatTime(sessionTime)}</Text>
              <Text style={styles.timerLabel}>Session Duration</Text>
            </View>

            {/* Session Status */}
            {sessionActive && (
              <View style={styles.sessionStatus}>
                <View style={styles.sessionStatusDot} />
                <Text style={styles.sessionStatusText}>
                  {isPaused ? 'Session Paused' : 'Session Active'}
                </Text>
                <Text style={styles.sessionRemaining}>
                  {formatTime(Math.max(targetDuration - sessionTime, 0))} remaining
                </Text>
              </View>
            )}

            {/* Intensity Control */}
            <View style={styles.intensitySection}>
              <View style={styles.intensityHeader}>
                <Text style={styles.intensityLabel}>Intensity Level</Text>
                <View style={styles.intensityBadge}>
                  <Text style={styles.intensityBadgeText}>Level {intensity}</Text>
                </View>
              </View>
              <View style={styles.intensityButtons}>
                <TouchableOpacity
                  style={styles.intensityButton}
                  onPress={() => setIntensity((prev) => Math.max(1, prev - 1))}
                >
                  <Icon name="minus" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.progressTrack}>
                  <LinearGradient
                    colors={['#10B981', '#22D3EE', '#A855F7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressFill, { width: `${intensity * 10}%` }]}
                  />
                </View>
                <TouchableOpacity
                  style={styles.intensityButton}
                  onPress={() => setIntensity((prev) => Math.min(10, prev + 1))}
                >
                  <Icon name="plus" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <View style={styles.intensityLabels}>
                <Text style={styles.intensityLabelText}>Gentle</Text>
                <Text style={styles.intensityLabelText}>Moderate</Text>
                <Text style={styles.intensityLabelText}>Strong</Text>
              </View>
            </View>

            {/* Control Buttons */}
            <View style={styles.controlButtons}>
              <TouchableOpacity
                style={[
                  styles.controlButton,
                  sessionActive && !isPaused ? styles.controlButtonOrange : styles.controlButtonPrimary
                ]}
                onPress={() => {
                  if (sessionActive) {
                    isPaused ? handleResumeSession() : handlePauseSession();
                  } else {
                    handleStartSession();
                  }
                }}
              >
                <Icon 
                  name={sessionActive ? (isPaused ? 'play' : 'pause') : 'play'} 
                  size={20} 
                  color="#FFFFFF" 
                />
                <Text style={styles.controlButtonText}>
                  {sessionActive ? (isPaused ? 'Resume' : 'Pause') : 'Start'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, styles.controlButtonOutline]}
                onPress={handleStopSession}
                disabled={!sessionActive}
              >
                <Icon name="stop" size={20} color={sessionActive ? '#374151' : '#9CA3AF'} />
                <Text style={[styles.controlButtonOutlineText, !sessionActive && { color: '#9CA3AF' }]}>Stop</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, styles.controlButtonOutline]}
                onPress={() => setShowTimerModal(true)}
              >
                <Icon name="timer-outline" size={20} color="#374151" />
                <Text style={styles.controlButtonOutlineText}>Timer</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Start Programs */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quick Start Programs</Text>
            <View style={styles.programList}>
              {quickPrograms.map((program) => (
                <TouchableOpacity
                  key={program.id}
                  style={styles.programCard}
                  onPress={() => handleQuickProgram(program)}
                >
                  <View style={styles.programIconContainer}>
                    <Icon name={program.icon} size={18} color="#2563EB" />
                  </View>
                  <View style={styles.programInfo}>
                    <Text style={styles.programTitle}>{program.label}</Text>
                    <Text style={styles.programMeta}>
                      {program.minutes > 0 ? `${program.minutes} min` : 'Variable'} · Level {program.level}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.loadButton}>
                    <Text style={styles.loadButtonText}>Load</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Voice Control */}
          <View style={[styles.card, styles.cardPurple]}>
            <View style={styles.cardHeader}>
              <Icon name="volume-high" size={20} color="#7C3AED" />
              <Text style={styles.cardTitlePurple}>Voice Control</Text>
            </View>
            <Text style={styles.cardDescriptionPurple}>
              Control your therapy session hands-free with voice commands
            </Text>

            {isVoiceListening && (
              <View style={styles.listeningIndicator}>
                <Icon name="microphone" size={18} color="#7C3AED" />
                <Text style={styles.listeningText}>Listening...</Text>
              </View>
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.buttonOutlinePurple, isVoiceListening && styles.buttonOutlinePurpleActive]}
                onPress={handleVoiceControl}
              >
                <Icon name="microphone" size={18} color="#7C3AED" />
                <Text style={styles.buttonOutlinePurpleText}>
                  {isVoiceListening ? 'Listening...' : 'Start Listening'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonOutlinePurple}>
                <Icon name="cellphone" size={18} color="#7C3AED" />
                <Text style={styles.buttonOutlinePurpleText}>Commands</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.voiceCommands}>
              <Text style={styles.voiceCommandText}>• "Start session" • "Increase intensity"</Text>
              <Text style={styles.voiceCommandText}>• "Pause session" • "Decrease intensity"</Text>
              <Text style={styles.voiceCommandText}>• "Stop session"</Text>
            </View>
          </View>

          {/* Recent Sessions */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recent Sessions</Text>
            <View style={styles.sessionList}>
              {recentSessions.map((session, index) => (
                <View key={index} style={styles.sessionItem}>
                  <View style={styles.sessionItemLeft}>
                    <Text style={styles.sessionItemProgram}>{session.program}</Text>
                    <Text style={styles.sessionItemMeta}>{session.date} · {session.duration}</Text>
                  </View>
                  <View style={styles.sessionItemRight}>
                    <View style={styles.ratingContainer}>
                      {[...Array(5)].map((_, i) => (
                        <Text key={i} style={[styles.star, i < session.rating && styles.starActive]}>⭐</Text>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>View All Sessions</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* Timer Modal */}
      <Modal
        visible={showTimerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTimerModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Icon name="clock-outline" size={24} color="#2563EB" />
              <Text style={styles.modalTitle}>Set Session Timer</Text>
            </View>
            <Text style={styles.modalDescription}>Choose your session duration or set a custom time</Text>

            <View style={styles.timerPresetsGrid}>
              {timerPresets.map((minutes) => (
                <TouchableOpacity
                  key={minutes}
                  style={[
                    styles.timerPreset,
                    targetDuration === minutes * 60 && styles.timerPresetActive
                  ]}
                  onPress={() => {
                    setTargetDuration(minutes * 60);
                    setCustomMinutes(String(minutes));
                  }}
                >
                  <Text style={[
                    styles.timerPresetNumber,
                    targetDuration === minutes * 60 && styles.timerPresetNumberActive
                  ]}>{minutes}</Text>
                  <Text style={styles.timerPresetLabel}>min</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.customTimerContainer}>
              <Text style={styles.customTimerLabel}>Custom Duration (minutes)</Text>
              <View style={styles.customTimerRow}>
                <TextInput
                  style={styles.customTimerInput}
                  value={customMinutes}
                  onChangeText={setCustomMinutes}
                  keyboardType="numeric"
                  maxLength={3}
                />
                <TouchableOpacity
                  style={styles.customTimerSetButton}
                  onPress={() => setTargetDuration(parseInt(customMinutes) * 60 || 1200)}
                >
                  <Text style={styles.customTimerSetButtonText}>Set</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.selectedDurationCard}>
              <Text style={styles.selectedDurationLabel}>Selected Duration:</Text>
              <Text style={styles.selectedDurationValue}>{Math.floor(targetDuration / 60)} minutes</Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowTimerModal(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalApplyButton}
                onPress={() => setShowTimerModal(false)}
              >
                <Icon name="clock-outline" size={18} color="#FFFFFF" />
                <Text style={styles.modalApplyButtonText}>Apply Timer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  gradient: { flex: 1 },
  scrollContent: { padding: 16, paddingTop: 50, paddingBottom: 100 },
  
  // Header
  header: { alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: '800', color: '#111827' },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },

  // Card Base
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },

  // Mode Selection
  tabContainer: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 10, padding: 4, marginBottom: 16 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  tabText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  tabTextActive: { color: '#111827' },
  
  modeCard: { backgroundColor: '#EFF6FF', padding: 14, borderRadius: 12, flexDirection: 'row' },
  modeCardPro: { backgroundColor: '#F5F3FF' },
  modeIconContainer: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#DBEAFE', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  modeIconPro: { backgroundColor: '#EDE9FE' },
  modeContent: { flex: 1 },
  modeTitle: { fontSize: 15, fontWeight: '700', color: '#1E40AF', marginBottom: 4 },
  modeDescription: { fontSize: 13, color: '#3B82F6', lineHeight: 18, marginBottom: 10 },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  badge: { backgroundColor: '#DBEAFE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgePro: { backgroundColor: '#EDE9FE' },
  badgeText: { fontSize: 11, color: '#374151', fontWeight: '500' },

  // Red Card (Body Parts)
  cardRed: { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
  cardTitleRed: { fontSize: 16, fontWeight: '700', color: '#991B1B' },
  cardDescriptionRed: { fontSize: 13, color: '#B91C1C', marginBottom: 14 },

  // Green Card (AI Camera)
  cardGreen: { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' },
  cardTitleGreen: { fontSize: 16, fontWeight: '700', color: '#166534' },
  cardDescriptionGreen: { fontSize: 13, color: '#15803D', marginBottom: 14 },

  // Purple Card (Voice)
  cardPurple: { backgroundColor: '#FAF5FF', borderColor: '#E9D5FF' },
  cardTitlePurple: { fontSize: 16, fontWeight: '700', color: '#581C87' },
  cardDescriptionPurple: { fontSize: 13, color: '#7C3AED', marginBottom: 14 },

  // Body Parts Grid
  bodyPartsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 },
  bodyPartCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#FECACA',
  },
  bodyPartCardActive: { borderColor: '#EF4444', backgroundColor: '#FEE2E2' },
  bodyPartIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  bodyPartIconContainerActive: { backgroundColor: '#EF4444' },
  bodyPartLabel: { fontSize: 13, color: '#374151', fontWeight: '600' },
  bodyPartLabelActive: { color: '#DC2626' },

  selectedPartsContainer: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#FECACA' },
  selectedPartsTitle: { fontSize: 13, fontWeight: '600', color: '#991B1B', marginBottom: 8 },
  selectedPartsList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  selectedPartChip: { backgroundColor: '#FEE2E2', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  selectedPartText: { fontSize: 12, color: '#B91C1C', fontWeight: '500' },

  // Buttons
  buttonRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  buttonGreen: { flex: 1, backgroundColor: '#16A34A', paddingVertical: 12, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  buttonGreenText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  buttonOutlineGreen: { flex: 1, borderWidth: 1.5, borderColor: '#86EFAC', backgroundColor: '#FFFFFF', paddingVertical: 12, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  buttonOutlineGreenText: { color: '#16A34A', fontWeight: '600', fontSize: 14 },
  buttonOutlinePurple: { flex: 1, borderWidth: 1.5, borderColor: '#C4B5FD', backgroundColor: '#FFFFFF', paddingVertical: 12, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  buttonOutlinePurpleActive: { backgroundColor: '#EDE9FE' },
  buttonOutlinePurpleText: { color: '#7C3AED', fontWeight: '600', fontSize: 14 },

  // AI Info Card
  aiInfoCard: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#BBF7D0' },
  aiInfoTitle: { fontSize: 14, fontWeight: '600', color: '#166534', marginTop: 8 },
  aiInfoSubtitle: { fontSize: 12, color: '#22C55E', marginTop: 2 },

  // Timer Display
  timerDisplay: { alignItems: 'center', paddingVertical: 16 },
  timerText: { fontSize: 48, fontWeight: '700', color: '#111827' },
  timerLabel: { fontSize: 14, color: '#6B7280', marginTop: 4 },

  // Session Status
  sessionStatus: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF6FF', borderWidth: 1, borderColor: '#BFDBFE', borderRadius: 10, padding: 12, marginBottom: 16, gap: 8 },
  sessionStatusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2563EB' },
  sessionStatusText: { flex: 1, fontSize: 14, fontWeight: '600', color: '#1E40AF' },
  sessionRemaining: { fontSize: 13, color: '#3B82F6' },

  // Intensity Section
  intensitySection: { marginBottom: 16 },
  intensityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  intensityLabel: { fontSize: 14, color: '#374151', fontWeight: '500' },
  intensityBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#E5E7EB' },
  intensityBadgeText: { fontSize: 12, color: '#374151', fontWeight: '600' },
  intensityButtons: { flexDirection: 'row', alignItems: 'center' },
  intensityButton: { width: 44, height: 44, backgroundColor: '#EF4444', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  progressTrack: { flex: 1, height: 10, backgroundColor: '#E5E7EB', borderRadius: 999, marginHorizontal: 12, overflow: 'hidden' },
  progressFill: { height: 10, borderRadius: 999 },
  intensityLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 4 },
  intensityLabelText: { color: '#9CA3AF', fontSize: 12, fontWeight: '500' },

  // Control Buttons
  controlButtons: { flexDirection: 'row', gap: 10 },
  controlButton: { flex: 1, paddingVertical: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  controlButtonPrimary: { backgroundColor: '#EF4444' },
  controlButtonOrange: { backgroundColor: '#F97316' },
  controlButtonOutline: { backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#E5E7EB' },
  controlButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  controlButtonOutlineText: { color: '#374151', fontWeight: '600', fontSize: 14 },

  // Program List
  programList: { gap: 10 },
  programCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 14,
    borderRadius: 12,
  },
  programIconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#DBEAFE', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  programInfo: { flex: 1 },
  programTitle: { fontSize: 15, fontWeight: '600', color: '#111827' },
  programMeta: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  loadButton: { backgroundColor: '#FFFFFF', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  loadButtonText: { fontSize: 13, fontWeight: '600', color: '#374151' },

  // Voice Control
  listeningIndicator: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#EDE9FE', borderWidth: 1, borderColor: '#C4B5FD', borderRadius: 10, padding: 12, marginBottom: 12 },
  listeningText: { fontSize: 14, fontWeight: '600', color: '#581C87' },
  voiceCommands: { marginTop: 8 },
  voiceCommandText: { fontSize: 12, color: '#7C3AED', lineHeight: 20 },

  // Recent Sessions
  sessionList: { gap: 10, marginBottom: 12 },
  sessionItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10 },
  sessionItemLeft: {},
  sessionItemRight: {},
  sessionItemProgram: { fontSize: 15, fontWeight: '600', color: '#111827' },
  sessionItemMeta: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  ratingContainer: { flexDirection: 'row' },
  star: { fontSize: 12, opacity: 0.3 },
  starActive: { opacity: 1 },
  viewAllButton: { backgroundColor: '#F3F4F6', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  viewAllButtonText: { fontSize: 14, fontWeight: '600', color: '#374151' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  modalDescription: { fontSize: 14, color: '#6B7280', marginBottom: 20 },
  
  timerPresetsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  timerPreset: { width: '30%', paddingVertical: 16, backgroundColor: '#F3F4F6', borderRadius: 12, alignItems: 'center', borderWidth: 1.5, borderColor: '#E5E7EB' },
  timerPresetActive: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  timerPresetNumber: { fontSize: 22, fontWeight: '700', color: '#374151' },
  timerPresetNumberActive: { color: '#2563EB' },
  timerPresetLabel: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  
  customTimerContainer: { marginBottom: 16 },
  customTimerLabel: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  customTimerRow: { flexDirection: 'row', gap: 10 },
  customTimerInput: { flex: 1, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16 },
  customTimerSetButton: { backgroundColor: '#F3F4F6', paddingHorizontal: 20, borderRadius: 10, justifyContent: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  customTimerSetButtonText: { fontSize: 14, fontWeight: '600', color: '#374151' },
  
  selectedDurationCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#EFF6FF', borderWidth: 1, borderColor: '#BFDBFE', borderRadius: 10, padding: 14, marginBottom: 20 },
  selectedDurationLabel: { fontSize: 14, color: '#3B82F6' },
  selectedDurationValue: { fontSize: 18, fontWeight: '700', color: '#1E40AF' },
  
  modalButtons: { flexDirection: 'row', gap: 12 },
  modalCancelButton: { flex: 1, paddingVertical: 14, backgroundColor: '#F3F4F6', borderRadius: 12, alignItems: 'center' },
  modalCancelButtonText: { fontSize: 15, fontWeight: '600', color: '#374151' },
  modalApplyButton: { flex: 1, paddingVertical: 14, backgroundColor: '#2563EB', borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  modalApplyButtonText: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
});

export default TherapyScreen;
