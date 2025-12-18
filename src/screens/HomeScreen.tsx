import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { useDevice } from '../context/DeviceContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const { user } = useAuth();
  const { device, isConnected } = useDevice();

  const stats = [
    { label: 'Sessions', value: '12', icon: 'calendar-check', color: '#FF0000' },
    { label: 'Hours', value: '24', icon: 'clock-outline', color: '#00C6AE' },
    { label: 'Streak', value: '7d', icon: 'fire', color: '#FF9500' },
  ];

  const quickActions = [
    { label: 'Start Session', icon: 'play-circle', color: '#FF0000' },
    { label: 'AI Assistant', icon: 'robot', color: '#00C6AE' },
    { label: 'My Reports', icon: 'chart-line', color: '#007AFF' },
    { label: 'Settings', icon: 'cog', color: '#666666' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#1A1A1A']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.username}>{user?.displayName || user?.email || 'User'}</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Icon name="bell-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Device Status */}
          <View style={styles.deviceCard}>
            <LinearGradient
              colors={isConnected ? ['#00C6AE', '#008C7A'] : ['#2A2A2A', '#1A1A1A']}
              style={styles.deviceGradient}
            >
              <View style={styles.deviceInfo}>
                <Icon
                  name={isConnected ? 'bluetooth-connect' : 'bluetooth-off'}
                  size={32}
                  color="#FFFFFF"
                />
                <View style={styles.deviceText}>
                  <Text style={styles.deviceTitle}>
                    {isConnected ? 'Device Connected' : 'No Device Connected'}
                  </Text>
                  <Text style={styles.deviceSubtitle}>
                    {isConnected ? device?.name || 'SmartHeal ITT' : 'Tap to connect'}
                  </Text>
                </View>
              </View>
              {isConnected && device?.batteryLevel && (
                <Text style={styles.battery}>{device.batteryLevel}%</Text>
              )}
            </LinearGradient>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Icon name={stat.icon} size={28} color={stat.color} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                  <Icon name={action.icon} size={28} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Activity */}
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <Icon name="hospital-box" size={24} color="#FF0000" />
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>Therapy Session</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  greeting: { fontSize: 16, color: '#B0B0B0' },
  username: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  notificationButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#2A2A2A', justifyContent: 'center', alignItems: 'center' },
  deviceCard: { marginBottom: 24, borderRadius: 16, overflow: 'hidden' },
  deviceGradient: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  deviceInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  deviceText: { marginLeft: 16, flex: 1 },
  deviceTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  deviceSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  battery: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: '#2A2A2A', padding: 16, borderRadius: 12, alignItems: 'center', marginHorizontal: 4 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginTop: 8 },
  statLabel: { fontSize: 12, color: '#B0B0B0', marginTop: 4 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 16 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  actionCard: { width: '48%', backgroundColor: '#2A2A2A', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  actionIcon: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  actionLabel: { fontSize: 14, color: '#FFFFFF', fontWeight: '600' },
  activityCard: { backgroundColor: '#2A2A2A', padding: 16, borderRadius: 12 },
  activityItem: { flexDirection: 'row', alignItems: 'center' },
  activityText: { marginLeft: 16, flex: 1 },
  activityTitle: { fontSize: 16, color: '#FFFFFF', fontWeight: '600', marginBottom: 4 },
  activityTime: { fontSize: 14, color: '#B0B0B0' },
});

export default HomeScreen;
