import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const ReportsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const progressStats = [
    { label: 'Total Sessions', value: '24', change: '+8%', trend: 'up', icon: 'target', color: '#3B82F6' },
    { label: 'Avg Duration', value: '18min', change: '+2min', trend: 'up', icon: 'clock-outline', color: '#10B981' },
    { label: 'Consistency', value: '85%', change: '+15%', trend: 'up', icon: 'trending-up', color: '#8B5CF6' },
  ];

  const weeklyData = [
    { day: 'Mon', sessions: 3, duration: 45 },
    { day: 'Tue', sessions: 4, duration: 60 },
    { day: 'Wed', sessions: 2, duration: 30 },
    { day: 'Thu', sessions: 5, duration: 75 },
    { day: 'Fri', sessions: 3, duration: 45 },
    { day: 'Sat', sessions: 4, duration: 60 },
    { day: 'Sun', sessions: 3, duration: 45 },
  ];

  const recentSessions = [
    { date: 'Today 2:30 PM', type: 'EMS Therapy', duration: '20 min', intensity: 'Medium', effectiveness: 'High' },
    { date: 'Today 9:15 AM', type: 'TENS Relief', duration: '15 min', intensity: 'Low', effectiveness: 'Medium' },
    { date: 'Yesterday 6:45 PM', type: 'Vibration', duration: '25 min', intensity: 'High', effectiveness: 'High' },
    { date: 'Yesterday 8:30 AM', type: 'Heat Therapy', duration: '18 min', intensity: 'Medium', effectiveness: 'Medium' },
  ];

  const achievements = [
    { icon: 'medal', title: '7-Day Streak', desc: 'Completed therapy for 7 days', date: '2 days ago', color: '#F59E0B' },
    { icon: 'trophy', title: 'Pain Fighter', desc: 'Reduced pain levels by 50%', date: '1 week ago', color: '#EF4444' },
    { icon: 'lightning-bolt', title: 'Consistency Champion', desc: 'Maintained 90% adherence', date: '2 weeks ago', color: '#8B5CF6' },
  ];

  const monthlySummary = [
    { value: '89', label: 'Total Sessions', color: '#3B82F6', bgColor: '#EFF6FF' },
    { value: '22.4h', label: 'Therapy Time', color: '#10B981', bgColor: '#ECFDF5' },
    { value: '94%', label: 'Effectiveness', color: '#8B5CF6', bgColor: '#F5F3FF' },
    { value: '7.2', label: 'Pain Reduction', color: '#F97316', bgColor: '#FFF7ED' },
  ];

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness) {
      case 'High': return { bg: '#DCFCE7', text: '#16A34A' };
      case 'Medium': return { bg: '#FEF9C3', text: '#CA8A04' };
      case 'Low': return { bg: '#FEE2E2', text: '#DC2626' };
      default: return { bg: '#F3F4F6', text: '#6B7280' };
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Progress Reports</Text>
              <Text style={styles.subtitle}>Track your therapy journey</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Icon name="download" size={20} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Icon name="share-variant" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Overview */}
          <View style={styles.statsGrid}>
            {progressStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                  <Icon name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={[styles.statChange, { color: stat.trend === 'up' ? '#16A34A' : '#DC2626' }]}>
                  {stat.change}
                </Text>
              </View>
            ))}
          </View>

          {/* Period Selector */}
          <View style={styles.periodSelector}>
            {['week', 'month', 'quarter'].map((period) => (
              <TouchableOpacity
                key={period}
                style={[styles.periodButton, selectedPeriod === period && styles.periodButtonActive]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text style={[styles.periodText, selectedPeriod === period && styles.periodTextActive]}>
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Weekly Progress Chart */}
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <View style={styles.chartTitleRow}>
                <Icon name="chart-bar" size={18} color="#3B82F6" />
                <Text style={styles.chartTitle}>Weekly Progress</Text>
              </View>
              <TouchableOpacity>
                <Icon name="download" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            <View style={styles.barChart}>
              {weeklyData.slice(0, 5).map((day, index) => (
                <View key={index} style={styles.barRow}>
                  <Text style={styles.barLabel}>{day.day}</Text>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: `${(day.sessions / 5) * 100}%` }]} />
                  </View>
                  <Text style={styles.barValue}>{day.duration}m</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Presets */}
          <LinearGradient
            colors={['#FAF5FF', '#FDF2F8']}
            style={styles.presetsCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.presetsHeader}>
              <View style={styles.presetsTitle}>
                <Icon name="lightning-bolt" size={18} color="#9333EA" />
                <Text style={styles.presetsTitleText}>Quick Presets</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.manageText}>Manage</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.presetsGrid}>
              <TouchableOpacity style={[styles.presetItem, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
                <View style={[styles.presetIcon, { backgroundColor: '#3B82F6' }]}>
                  <Icon name="pulse" size={18} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.presetName}>Recovery</Text>
                  <Text style={styles.presetDuration}>15 min</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.presetItem, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
                <View style={[styles.presetIcon, { backgroundColor: '#10B981' }]}>
                  <Icon name="cog" size={18} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.presetName}>Relax</Text>
                  <Text style={styles.presetDuration}>20 min</Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Recent Sessions */}
          <View style={styles.sessionsCard}>
            <View style={styles.sessionsHeader}>
              <View style={styles.sessionsTitleRow}>
                <Icon name="calendar" size={18} color="#6366F1" />
                <Text style={styles.sessionsTitle}>Recent Sessions</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.exportText}>Export</Text>
              </TouchableOpacity>
            </View>
            {recentSessions.map((session, index) => {
              const effectColors = getEffectivenessColor(session.effectiveness);
              return (
                <TouchableOpacity key={index} style={styles.sessionItem}>
                  <LinearGradient
                    colors={['#3B82F6', '#8B5CF6']}
                    style={styles.sessionIcon}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Icon name="pulse" size={20} color="#FFFFFF" />
                  </LinearGradient>
                  <View style={styles.sessionInfo}>
                    <Text style={styles.sessionType}>{session.type}</Text>
                    <Text style={styles.sessionDate}>{session.date}</Text>
                  </View>
                  <View style={styles.sessionRight}>
                    <Text style={styles.sessionDuration}>{session.duration}</Text>
                    <View style={[styles.effectBadge, { backgroundColor: effectColors.bg }]}>
                      <Text style={[styles.effectText, { color: effectColors.text }]}>{session.effectiveness}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Weekly Analysis */}
          <LinearGradient
            colors={['#EEF2FF', '#E0F2FE']}
            style={styles.analysisCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.analysisTitleRow}>
              <Icon name="trending-up" size={18} color="#6366F1" />
              <Text style={styles.analysisTitle}>Weekly Analysis</Text>
            </View>
            <View style={styles.analysisItem}>
              <Text style={styles.analysisItemTitle}>Most Effective Time</Text>
              <Text style={styles.analysisItemDesc}>Evening sessions show 23% better results</Text>
            </View>
            <View style={styles.analysisItem}>
              <Text style={styles.analysisItemTitle}>Recommended Focus</Text>
              <Text style={styles.analysisItemDesc}>Consider increasing EMS intensity for faster recovery</Text>
            </View>
          </LinearGradient>

          {/* Monthly Summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Monthly Summary</Text>
            <View style={styles.summaryGrid}>
              {monthlySummary.map((item, index) => (
                <View key={index} style={[styles.summaryItem, { backgroundColor: item.bgColor }]}>
                  <Text style={[styles.summaryValue, { color: item.color }]}>{item.value}</Text>
                  <Text style={styles.summaryLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Achievements */}
          <View style={styles.achievementsCard}>
            <View style={styles.achievementsTitleRow}>
              <Icon name="trophy" size={18} color="#F59E0B" />
              <Text style={styles.achievementsTitle}>Recent Achievements</Text>
            </View>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <View style={[styles.achievementIcon, { backgroundColor: `${achievement.color}20` }]}>
                  <Icon name={achievement.icon} size={22} color={achievement.color} />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDesc}>{achievement.desc}</Text>
                  <Text style={styles.achievementDate}>{achievement.date}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* AI Health Insights */}
          <View style={styles.insightsCard}>
            <Text style={styles.insightsTitle}>AI Health Insights</Text>
            
            <View style={[styles.insightItem, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
              <Text style={styles.insightItemTitle}>💡 Recommendation</Text>
              <Text style={styles.insightItemText}>
                Your pain levels show significant improvement on days with morning sessions. Consider scheduling more morning therapy sessions.
              </Text>
            </View>

            <View style={[styles.insightItem, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
              <Text style={styles.insightItemTitle}>📈 Progress Note</Text>
              <Text style={styles.insightItemText}>
                Your consistency has improved by 25% this month. Keep up the excellent work!
              </Text>
            </View>

            <View style={[styles.insightItem, { backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }]}>
              <Text style={styles.insightItemTitle}>⚠️ Gentle Reminder</Text>
              <Text style={styles.insightItemText}>
                Consider increasing session duration gradually. Your body is responding well.
              </Text>
            </View>
          </View>

        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  gradient: { flex: 1 },
  scrollContent: { padding: 16, paddingTop: 50, paddingBottom: 100 },
  
  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  headerActions: { flexDirection: 'row', gap: 8 },
  headerButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },

  // Stats
  statsGrid: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  statIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statValue: { fontSize: 18, fontWeight: '700', color: '#111827' },
  statLabel: { fontSize: 11, color: '#6B7280', marginTop: 2, textAlign: 'center' },
  statChange: { fontSize: 11, fontWeight: '600', marginTop: 4 },

  // Period Selector
  periodSelector: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  periodButton: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#F3F4F6', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  periodButtonActive: { backgroundColor: '#EF4444', borderColor: '#EF4444' },
  periodText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  periodTextActive: { color: '#FFFFFF' },

  // Chart Card
  chartCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  chartTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  chartTitle: { fontSize: 15, fontWeight: '600', color: '#111827' },
  barChart: { gap: 10 },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  barLabel: { width: 30, fontSize: 12, color: '#6B7280' },
  barTrack: { flex: 1, height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: '#3B82F6', borderRadius: 4 },
  barValue: { width: 40, fontSize: 12, color: '#6B7280', textAlign: 'right' },

  // Presets Card
  presetsCard: { borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E9D5FF' },
  presetsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  presetsTitle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  presetsTitleText: { fontSize: 15, fontWeight: '600', color: '#111827' },
  manageText: { fontSize: 13, color: '#9333EA', fontWeight: '600' },
  presetsGrid: { flexDirection: 'row', gap: 12 },
  presetItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 12, borderWidth: 1 },
  presetIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  presetName: { fontSize: 14, fontWeight: '600', color: '#111827' },
  presetDuration: { fontSize: 12, color: '#6B7280' },

  // Sessions Card
  sessionsCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  sessionsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sessionsTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sessionsTitle: { fontSize: 15, fontWeight: '600', color: '#111827' },
  exportText: { fontSize: 13, color: '#3B82F6', fontWeight: '600' },
  sessionItem: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 10 },
  sessionIcon: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  sessionInfo: { flex: 1, marginLeft: 12 },
  sessionType: { fontSize: 14, fontWeight: '600', color: '#111827' },
  sessionDate: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  sessionRight: { alignItems: 'flex-end' },
  sessionDuration: { fontSize: 14, fontWeight: '600', color: '#111827' },
  effectBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginTop: 4 },
  effectText: { fontSize: 11, fontWeight: '600' },

  // Analysis Card
  analysisCard: { borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#C7D2FE' },
  analysisTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  analysisTitle: { fontSize: 15, fontWeight: '600', color: '#111827' },
  analysisItem: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 12, marginBottom: 8 },
  analysisItemTitle: { fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 4 },
  analysisItemDesc: { fontSize: 12, color: '#6B7280', lineHeight: 18 },

  // Summary Card
  summaryCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  summaryTitle: { fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 12 },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  summaryItem: { width: '47%', padding: 14, borderRadius: 12, alignItems: 'center' },
  summaryValue: { fontSize: 20, fontWeight: '700' },
  summaryLabel: { fontSize: 11, color: '#6B7280', marginTop: 4, textAlign: 'center' },

  // Achievements Card
  achievementsCard: { backgroundColor: '#FFFBEB', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#FDE68A' },
  achievementsTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  achievementsTitle: { fontSize: 15, fontWeight: '600', color: '#92400E' },
  achievementItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#FDE68A' },
  achievementIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  achievementInfo: { flex: 1, marginLeft: 12 },
  achievementTitle: { fontSize: 14, fontWeight: '600', color: '#92400E' },
  achievementDesc: { fontSize: 12, color: '#B45309', marginTop: 2 },
  achievementDate: { fontSize: 11, color: '#CA8A04', marginTop: 2 },

  // Insights Card
  insightsCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  insightsTitle: { fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 12 },
  insightItem: { padding: 14, borderRadius: 12, marginBottom: 10, borderWidth: 1 },
  insightItemTitle: { fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 6 },
  insightItemText: { fontSize: 13, color: '#4B5563', lineHeight: 20 },
});

export default ReportsScreen;
