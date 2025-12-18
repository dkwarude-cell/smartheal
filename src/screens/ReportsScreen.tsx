import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const ReportsScreen = () => {
  const weekData = [
    { day: 'Mon', sessions: 2, height: 40 },
    { day: 'Tue', sessions: 1, height: 20 },
    { day: 'Wed', sessions: 3, height: 60 },
    { day: 'Thu', sessions: 2, height: 40 },
    { day: 'Fri', sessions: 1, height: 20 },
    { day: 'Sat', sessions: 2, height: 40 },
    { day: 'Sun', sessions: 4, height: 80 },
  ];

  const insights = [
    { icon: 'trending-up', title: 'Progress', value: '+15%', color: '#00C6AE', description: 'vs last week' },
    { icon: 'fire', title: 'Streak', value: '7 days', color: '#FF9500', description: 'Keep it up!' },
    { icon: 'clock-outline', title: 'Avg Session', value: '25 min', color: '#007AFF', description: 'This week' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#1A1A1A']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Reports & Analytics</Text>

          {/* Weekly Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>This Week</Text>
            <View style={styles.chart}>
              {weekData.map((day, index) => (
                <View key={index} style={styles.chartColumn}>
                  <View style={styles.barContainer}>
                    <LinearGradient
                      colors={['#FF0000', '#CC0000']}
                      style={[styles.bar, { height: day.height }]}
                    />
                  </View>
                  <Text style={styles.chartLabel}>{day.day}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Insights */}
          <Text style={styles.sectionTitle}>Insights</Text>
          <View style={styles.insightsContainer}>
            {insights.map((insight, index) => (
              <View key={index} style={styles.insightCard}>
                <View style={[styles.insightIcon, { backgroundColor: `${insight.color}20` }]}>
                  <Icon name={insight.icon} size={28} color={insight.color} />
                </View>
                <Text style={styles.insightValue}>{insight.value}</Text>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.insightDescription}>{insight.description}</Text>
              </View>
            ))}
          </View>

          {/* Recent Sessions */}
          <Text style={styles.sectionTitle}>Recent Sessions</Text>
          {[1, 2, 3].map((session) => (
            <TouchableOpacity key={session} style={styles.sessionCard}>
              <View style={styles.sessionIcon}>
                <Icon name="hospital-box" size={24} color="#FF0000" />
              </View>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionTitle}>Therapy Session #{session}</Text>
                <Text style={styles.sessionDate}>Dec {18 - session}, 2025 • 25 min</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#666666" />
            </TouchableOpacity>
          ))}

          {/* Export Button */}
          <TouchableOpacity style={styles.exportButton}>
            <LinearGradient colors={['#2A2A2A', '#1A1A1A']} style={styles.exportGradient}>
              <Icon name="download" size={20} color="#FFFFFF" />
              <Text style={styles.exportText}>Export Report</Text>
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
  chartCard: { backgroundColor: '#2A2A2A', padding: 20, borderRadius: 16, marginBottom: 24 },
  chartTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 20 },
  chart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 },
  chartColumn: { flex: 1, alignItems: 'center' },
  barContainer: { flex: 1, width: '80%', justifyContent: 'flex-end', marginBottom: 8 },
  bar: { width: '100%', borderRadius: 4 },
  chartLabel: { fontSize: 12, color: '#B0B0B0', marginTop: 4 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 16 },
  insightsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  insightCard: { flex: 1, backgroundColor: '#2A2A2A', padding: 16, borderRadius: 12, alignItems: 'center', marginHorizontal: 4 },
  insightIcon: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  insightValue: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  insightTitle: { fontSize: 12, color: '#B0B0B0', marginBottom: 2 },
  insightDescription: { fontSize: 10, color: '#666666' },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sessionIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,0,0,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  sessionInfo: { flex: 1 },
  sessionTitle: { fontSize: 16, color: '#FFFFFF', fontWeight: '600', marginBottom: 4 },
  sessionDate: { fontSize: 14, color: '#B0B0B0' },
  exportButton: { marginTop: 24, borderRadius: 12, overflow: 'hidden' },
  exportGradient: { flexDirection: 'row', padding: 16, justifyContent: 'center', alignItems: 'center' },
  exportText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', marginLeft: 8 },
});

export default ReportsScreen;
