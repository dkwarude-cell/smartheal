import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ReportsTabProps {
  user: any;
}

// Simple Progress Bar Component
const ProgressBar = ({ value, color = '#EF4444' }: { value: number; color?: string }) => (
  <View style={styles.progressBarBg}>
    <View style={[styles.progressBarFill, { width: `${value}%`, backgroundColor: color }]} />
  </View>
);

// Simple Bar Chart Component
const SimpleBarChart = ({ data }: { data: { day: string; value: number }[] }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <View style={styles.barChart}>
      {data.map((item, index) => (
        <View key={index} style={styles.barChartItem}>
          <View style={styles.barWrapper}>
            <View style={[styles.bar, { height: `${(item.value / maxValue) * 100}%` }]} />
          </View>
          <Text style={styles.barLabel}>{item.day}</Text>
        </View>
      ))}
    </View>
  );
};

export function ReportsTab({ user }: ReportsTabProps) {
  const [timeRange, setTimeRange] = useState('week');
  const [reportType, setReportType] = useState('progress');

  const weeklyData = [
    { day: 'Mon', sessions: 2, duration: 45, pain: 3 },
    { day: 'Tue', sessions: 3, duration: 60, pain: 2 },
    { day: 'Wed', sessions: 1, duration: 20, pain: 4 },
    { day: 'Thu', sessions: 2, duration: 40, pain: 2 },
    { day: 'Fri', sessions: 3, duration: 65, pain: 1 },
    { day: 'Sat', sessions: 2, duration: 45, pain: 2 },
    { day: 'Sun', sessions: 1, duration: 25, pain: 3 }
  ];

  const programDistribution = [
    { name: 'Pain Relief', value: 45, color: '#EF4444' },
    { name: 'Muscle Recovery', value: 30, color: '#3B82F6' },
    { name: 'Stress Relief', value: 20, color: '#10B981' },
    { name: 'Custom', value: 5, color: '#F59E0B' }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Progress Reports</Text>
          <Text style={styles.headerSubtitle}>Track your therapy journey</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerBtn}>
            <Icon name="download" size={18} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <Icon name="share-variant" size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Time Range Selector */}
      <View style={styles.timeRangeCard}>
        <View style={styles.timeRangeLeft}>
          <Icon name="calendar" size={20} color="#6B7280" />
          <Text style={styles.timeRangeLabel}>Time Period</Text>
        </View>
        <View style={styles.timeRangePicker}>
          {['week', 'month', 'year'].map((range) => (
            <TouchableOpacity
              key={range}
              style={[styles.timeRangeBtn, timeRange === range && styles.timeRangeBtnActive]}
              onPress={() => setTimeRange(range)}
            >
              <Text style={[styles.timeRangeBtnText, timeRange === range && styles.timeRangeBtnTextActive]}>
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricLabel}>Total Sessions</Text>
            <Icon name="trending-up" size={16} color="#10B981" />
          </View>
          <View style={styles.metricValue}>
            <Text style={styles.metricNumber}>47</Text>
            <Text style={styles.metricChange}>+12%</Text>
          </View>
          <Text style={styles.metricSubtext}>vs last week</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricLabel}>Avg Duration</Text>
            <Icon name="clock-outline" size={16} color="#3B82F6" />
          </View>
          <View style={styles.metricValue}>
            <Text style={styles.metricNumber}>23m</Text>
            <Text style={styles.metricChange}>+5%</Text>
          </View>
          <Text style={styles.metricSubtext}>vs last week</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricLabel}>Pain Reduction</Text>
            <Icon name="trending-down" size={16} color="#10B981" />
          </View>
          <View style={styles.metricValue}>
            <Text style={styles.metricNumber}>68%</Text>
            <Text style={styles.metricChange}>+15%</Text>
          </View>
          <Text style={styles.metricSubtext}>improvement</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricLabel}>Consistency</Text>
            <Icon name="target" size={16} color="#8B5CF6" />
          </View>
          <View style={styles.metricValue}>
            <Text style={styles.metricNumber}>94%</Text>
            <Text style={styles.metricChange}>+8%</Text>
          </View>
          <Text style={styles.metricSubtext}>goal adherence</Text>
        </View>
      </View>

      {/* Report Type Tabs */}
      <View style={styles.tabsContainer}>
        {['progress', 'sessions', 'programs'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, reportType === tab && styles.tabActive]}
            onPress={() => setReportType(tab)}
          >
            <Text style={[styles.tabText, reportType === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Progress Tab Content */}
      {reportType === 'progress' && (
        <>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="chart-line" size={20} color="#3B82F6" />
              <Text style={styles.cardTitle}>Pain Level Trend</Text>
            </View>
            <SimpleBarChart data={weeklyData.map(d => ({ day: d.day, value: 5 - d.pain }))} />
            <View style={styles.chartLegend}>
              <Text style={styles.legendText}>0 = No pain</Text>
              <Text style={styles.legendText}>5 = Severe pain</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weekly Goals Progress</Text>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Sessions Completed</Text>
                <Text style={styles.progressValue}>14/15</Text>
              </View>
              <ProgressBar value={93} color="#EF4444" />
            </View>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Total Duration</Text>
                <Text style={styles.progressValue}>4.2/5 hours</Text>
              </View>
              <ProgressBar value={84} color="#3B82F6" />
            </View>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Pain Reduction Goal</Text>
                <Text style={styles.progressValue}>68/60%</Text>
              </View>
              <ProgressBar value={100} color="#10B981" />
            </View>
          </View>
        </>
      )}

      {/* Sessions Tab Content */}
      {reportType === 'sessions' && (
        <>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="chart-bar" size={20} color="#10B981" />
              <Text style={styles.cardTitle}>Daily Sessions</Text>
            </View>
            <SimpleBarChart data={weeklyData.map(d => ({ day: d.day, value: d.sessions }))} />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Session Duration Analysis</Text>
            <View style={styles.durationStats}>
              <View style={styles.durationStat}>
                <Text style={styles.durationValue}>23m</Text>
                <Text style={styles.durationLabel}>Avg Duration</Text>
              </View>
              <View style={styles.durationStat}>
                <Text style={styles.durationValue}>15m</Text>
                <Text style={styles.durationLabel}>Min Duration</Text>
              </View>
              <View style={styles.durationStat}>
                <Text style={styles.durationValue}>35m</Text>
                <Text style={styles.durationLabel}>Max Duration</Text>
              </View>
            </View>
          </View>
        </>
      )}

      {/* Programs Tab Content */}
      {reportType === 'programs' && (
        <>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="chart-pie" size={20} color="#8B5CF6" />
              <Text style={styles.cardTitle}>Program Distribution</Text>
            </View>
            <View style={styles.programList}>
              {programDistribution.map((program, index) => (
                <View key={index} style={styles.programItem}>
                  <View style={[styles.programDot, { backgroundColor: program.color }]} />
                  <Text style={styles.programName}>{program.name}</Text>
                  <Text style={styles.programValue}>{program.value}%</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Program Effectiveness</Text>
            {[
              { name: 'Pain Relief', effectiveness: 92, sessions: 21 },
              { name: 'Muscle Recovery', effectiveness: 88, sessions: 14 },
              { name: 'Stress Relief', effectiveness: 85, sessions: 9 },
              { name: 'Custom Programs', effectiveness: 79, sessions: 3 }
            ].map((program, index) => (
              <View key={index} style={styles.effectivenessItem}>
                <View style={styles.effectivenessHeader}>
                  <Text style={styles.effectivenessName}>{program.name}</Text>
                  <Text style={styles.effectivenessSessions}>{program.sessions} sessions</Text>
                </View>
                <View style={styles.effectivenessRow}>
                  <View style={styles.effectivenessBarContainer}>
                    <ProgressBar value={program.effectiveness} />
                  </View>
                  <Text style={styles.effectivenessPercent}>{program.effectiveness}%</Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Achievements */}
      <View style={[styles.card, styles.achievementsCard]}>
        <View style={styles.cardHeader}>
          <Icon name="trophy" size={20} color="#D97706" />
          <Text style={[styles.cardTitle, { color: '#92400E' }]}>Recent Achievements</Text>
        </View>
        {[
          { icon: 'medal', title: '7-Day Streak', desc: 'Completed therapy for 7 consecutive days', date: '2 days ago' },
          { icon: 'shield-star', title: 'Pain Fighter', desc: 'Reduced pain levels by 50%', date: '1 week ago' },
          { icon: 'chart-timeline-variant', title: 'Consistency Champion', desc: 'Maintained 90% adherence rate', date: '2 weeks ago' }
        ].map((achievement, index) => (
          <View key={index} style={styles.achievementItem}>
            <View style={styles.achievementIcon}>
              <Icon name={achievement.icon} size={20} color="#D97706" />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDesc}>{achievement.desc}</Text>
              <Text style={styles.achievementDate}>{achievement.date}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Health Insights */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI Health Insights</Text>
        
        <View style={[styles.insightCard, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
          <Text style={[styles.insightTitle, { color: '#1E40AF' }]}>💡 Recommendation</Text>
          <Text style={[styles.insightText, { color: '#1D4ED8' }]}>
            Your pain levels show significant improvement on days with morning sessions. Consider scheduling more morning therapy sessions for optimal results.
          </Text>
        </View>
        
        <View style={[styles.insightCard, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
          <Text style={[styles.insightTitle, { color: '#065F46' }]}>📈 Progress Note</Text>
          <Text style={[styles.insightText, { color: '#047857' }]}>
            Your consistency has improved by 25% this month. Keep up the excellent work! You're on track to exceed your recovery goals.
          </Text>
        </View>
        
        <View style={[styles.insightCard, { backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }]}>
          <Text style={[styles.insightTitle, { color: '#92400E' }]}>⚠️ Gentle Reminder</Text>
          <Text style={[styles.insightText, { color: '#B45309' }]}>
            Consider increasing session duration gradually. Your body is responding well to the current intensity levels.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    padding: 16,
    paddingTop: 50,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeRangeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timeRangeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeRangeLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  timeRangePicker: {
    flexDirection: 'row',
    gap: 6,
  },
  timeRangeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  timeRangeBtnActive: {
    backgroundColor: '#EF4444',
  },
  timeRangeBtnText: {
    fontSize: 13,
    color: '#6B7280',
  },
  timeRangeBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  metricValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  metricChange: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  metricSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#111827',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingVertical: 10,
  },
  barChartItem: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    height: 100,
    width: 24,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    backgroundColor: '#EF4444',
    borderRadius: 6,
  },
  barLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 6,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  legendText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  progressItem: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#374151',
  },
  progressValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  durationStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  durationStat: {
    alignItems: 'center',
  },
  durationValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  durationLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  programList: {
    gap: 12,
  },
  programItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  programDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  programName: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  programValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  effectivenessItem: {
    marginBottom: 16,
  },
  effectivenessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  effectivenessName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  effectivenessSessions: {
    fontSize: 13,
    color: '#6B7280',
  },
  effectivenessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  effectivenessBarContainer: {
    flex: 1,
  },
  effectivenessPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    width: 40,
  },
  achievementsCard: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  achievementItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementContent: {
    flex: 1,
    marginLeft: 12,
  },
  achievementTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#92400E',
  },
  achievementDesc: {
    fontSize: 13,
    color: '#B45309',
    marginTop: 2,
  },
  achievementDate: {
    fontSize: 12,
    color: '#D97706',
    marginTop: 4,
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ReportsTab;