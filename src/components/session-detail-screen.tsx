import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SessionDetailScreenProps {
  session: any;
  onBack: () => void;
  onStart?: () => void;
}

export function SessionDetailScreen({ session, onBack, onStart }: SessionDetailScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const handleStartSession = () => {
    setIsPlaying(true);
    if (onStart) onStart();
  };

  const circumference = 2 * Math.PI * 56;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={22} color="#6B7280" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{session?.type || 'Session'}</Text>
          <Text style={styles.headerSubtitle}>{session?.bodyPart || 'Full Body'} • {session?.duration || '30 min'}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Session Preview Card */}
        <View style={styles.previewCard}>
          {/* Background Pattern */}
          <View style={styles.patternOverlay} />

          {!isPlaying && progress === 0 ? (
            <View style={styles.previewContent}>
              <View style={styles.readyBadge}>
                <Icon name="lightning-bolt" size={18} color="#FFFFFF" />
                <Text style={styles.readyText}>Ready to start</Text>
              </View>
              
              <Text style={styles.previewTitle}>{session?.type || 'Therapy Session'}</Text>
              <Text style={styles.previewDescription}>
                {session?.description || 'Professional therapy session optimized for recovery'}
              </Text>
              
              <TouchableOpacity onPress={handleStartSession} style={styles.startButton}>
                <Icon name="play" size={24} color="#EF4444" />
                <Text style={styles.startButtonText}>Start Session</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.previewContent}>
              <View style={styles.progressHeader}>
                <View style={styles.statusBadge}>
                  {isPlaying ? (
                    <>
                      <Icon name="pulse" size={18} color="#FFFFFF" />
                      <Text style={styles.statusText}>In Progress</Text>
                    </>
                  ) : (
                    <>
                      <Icon name="check-circle" size={18} color="#FFFFFF" />
                      <Text style={styles.statusText}>Completed</Text>
                    </>
                  )}
                </View>
                <TouchableOpacity onPress={() => setIsMuted(!isMuted)} style={styles.muteButton}>
                  <Icon name={isMuted ? 'volume-off' : 'volume-high'} size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Progress Circle */}
              <View style={styles.progressCircle}>
                <Svg width={128} height={128} style={styles.svg}>
                  <Circle
                    cx={64}
                    cy={64}
                    r={56}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={8}
                    fill="none"
                  />
                  <Circle
                    cx={64}
                    cy={64}
                    r={56}
                    stroke="#FFFFFF"
                    strokeWidth={8}
                    fill="none"
                    strokeDasharray={`${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation={-90}
                    origin="64, 64"
                  />
                </Svg>
                <View style={styles.progressText}>
                  <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
                </View>
              </View>

              <View style={styles.timeRemaining}>
                <Text style={styles.timeLabel}>Time Remaining</Text>
                <Text style={styles.timeValue}>{Math.ceil((45 * (100 - progress)) / 100)} min</Text>
              </View>

              {isPlaying && (
                <TouchableOpacity onPress={() => setIsPlaying(false)} style={styles.pauseButton}>
                  <Icon name="pause" size={20} color="#FFFFFF" />
                  <Text style={styles.pauseButtonText}>Pause Session</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* Session Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Session Details</Text>
          
          <View style={styles.detailRow}>
            <View style={[styles.detailIcon, { backgroundColor: '#EFF6FF' }]}>
              <Icon name="clock-outline" size={20} color="#3B82F6" />
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>{session?.duration || '30 min'}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={[styles.detailIcon, { backgroundColor: '#FFF7ED' }]}>
              <Icon name="lightning-bolt" size={20} color="#F97316" />
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Intensity</Text>
              <Text style={styles.detailValue}>{session?.intensity || 'Medium'}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={[styles.detailIcon, { backgroundColor: '#F5F3FF' }]}>
              <Icon name="target" size={20} color="#8B5CF6" />
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Target Area</Text>
              <Text style={styles.detailValue}>{session?.bodyPart || 'Full Body'}</Text>
            </View>
          </View>

          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <View style={[styles.detailIcon, { backgroundColor: '#ECFDF5' }]}>
              <Icon name="calendar" size={20} color="#10B981" />
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Scheduled</Text>
              <Text style={styles.detailValue}>{session?.time || 'Today'}</Text>
            </View>
          </View>
        </View>

        {/* Expected Benefits */}
        <View style={styles.benefitsCard}>
          <Text style={styles.cardTitle}>Expected Benefits</Text>
          
          {[
            { icon: 'heart-pulse', text: 'Improved blood circulation', color: '#EF4444', bg: '#FEF2F2' },
            { icon: 'arm-flex', text: 'Reduced muscle tension', color: '#3B82F6', bg: '#EFF6FF' },
            { icon: 'trending-up', text: 'Enhanced recovery speed', color: '#10B981', bg: '#ECFDF5' },
            { icon: 'lightning-bolt', text: 'Better performance readiness', color: '#F97316', bg: '#FFF7ED' }
          ].map((benefit, index) => (
            <View key={index} style={styles.benefitRow}>
              <View style={[styles.benefitIcon, { backgroundColor: benefit.bg }]}>
                <Icon name={benefit.icon} size={18} color={benefit.color} />
              </View>
              <Text style={styles.benefitText}>{benefit.text}</Text>
            </View>
          ))}
        </View>

        {/* Completion Card */}
        {progress === 100 && (
          <View style={styles.completionCard}>
            <View style={styles.completionHeader}>
              <View style={styles.completionIcon}>
                <Icon name="check-circle" size={28} color="#FFFFFF" />
              </View>
              <View style={styles.completionInfo}>
                <Text style={styles.completionTitle}>Session Complete!</Text>
                <Text style={styles.completionSubtitle}>How did it go?</Text>
              </View>
            </View>
            <View style={styles.completionActions}>
              <TouchableOpacity style={styles.rateButton}>
                <Text style={styles.rateButtonText}>Rate Session</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.notesButton}>
                <Text style={styles.notesButtonText}>Add Notes</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  backText: {
    fontSize: 15,
    color: '#6B7280',
  },
  headerContent: {},
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
  },
  previewCard: {
    backgroundColor: '#EF4444',
    borderRadius: 20,
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  previewContent: {
    position: 'relative',
    zIndex: 10,
  },
  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  readyText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  previewTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  previewDescription: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#EF4444',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  muteButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  svg: {
    transform: [{ rotate: '-90deg' }],
  },
  progressText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercent: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  timeRemaining: {
    alignItems: 'center',
    marginBottom: 16,
  },
  timeLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pauseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  pauseButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailInfo: {
    marginLeft: 14,
  },
  detailLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  benefitsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  benefitIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
  },
  completionCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  completionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  completionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionInfo: {
    marginLeft: 14,
  },
  completionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  completionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  completionActions: {
    flexDirection: 'row',
    gap: 10,
  },
  rateButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  rateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  notesButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
  },
  notesButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
