/**
 * Home Screen
 * SmartHeal App - Main Dashboard
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { useAuth } from '../../context/AuthContext';
import { useDevice } from '../../context/DeviceContext';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { isConnected } = useDevice();

  const currentDate = new Date();
  const greeting = currentDate.getHours() < 12 ? 'Morning' : currentDate.getHours() < 17 ? 'Afternoon' : 'Evening';
  const displayName = user?.displayName?.split(' ')[0] || 'User';

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.background.primary, colors.background.secondary]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good {greeting},</Text>
              <Text style={styles.name}>{displayName}!</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile' as never)}
              style={styles.avatar}
            >
              <Ionicons name="person" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          {/* Device Status */}
          <Card variant="glass" style={styles.deviceCard}>
            <CardContent>
              <View style={styles.deviceStatus}>
                <View style={styles.deviceInfo}>
                  <View style={[styles.statusDot, isConnected && styles.statusDotConnected]} />
                  <View>
                    <Text style={styles.deviceStatusText}>
                      {isConnected ? 'Device Connected' : 'No Device Connected'}
                    </Text>
                    <Text style={styles.deviceName}>
                      {isConnected ? 'SmartHeal Pro ITT' : 'Tap to connect'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Ionicons name="bluetooth" size={24} color={isConnected ? colors.primary : colors.text.tertiary} />
                </TouchableOpacity>
              </View>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => navigation.navigate('Therapy' as never)}
              >
                <LinearGradient
                  colors={colors.gradients.primary}
                  style={styles.actionGradient}
                >
                  <Ionicons name="play-circle" size={32} color={colors.text.primary} />
                  <Text style={styles.actionText}>Quick Session</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => navigation.navigate('AI' as never)}
              >
                <LinearGradient
                  colors={colors.gradients.purple}
                  style={styles.actionGradient}
                >
                  <Ionicons name="camera" size={32} color={colors.text.primary} />
                  <Text style={styles.actionText}>AI Guidance</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => navigation.navigate('Settings' as never)}
              >
                <LinearGradient
                  colors={colors.gradients.blue}
                  style={styles.actionGradient}
                >
                  <Ionicons name="settings" size={32} color={colors.text.primary} />
                  <Text style={styles.actionText}>Settings</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionCard}>
                <LinearGradient
                  colors={colors.gradients.warm}
                  style={styles.actionGradient}
                >
                  <Ionicons name="stats-chart" size={32} color={colors.text.primary} />
                  <Text style={styles.actionText}>Reports</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Today's Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Stats</Text>
            <View style={styles.statsGrid}>
              <Card variant="elevated" style={styles.statCard}>
                <CardContent>
                  <Ionicons name="time" size={24} color={colors.primary} />
                  <Text style={styles.statValue}>45</Text>
                  <Text style={styles.statLabel}>Minutes</Text>
                </CardContent>
              </Card>

              <Card variant="elevated" style={styles.statCard}>
                <CardContent>
                  <Ionicons name="flame" size={24} color={colors.accent.orange} />
                  <Text style={styles.statValue}>320</Text>
                  <Text style={styles.statLabel}>Calories</Text>
                </CardContent>
              </Card>

              <Card variant="elevated" style={styles.statCard}>
                <CardContent>
                  <Ionicons name="pulse" size={24} color={colors.accent.purple} />
                  <Text style={styles.statValue}>3</Text>
                  <Text style={styles.statLabel}>Sessions</Text>
                </CardContent>
              </Card>

              <Card variant="elevated" style={styles.statCard}>
                <CardContent>
                  <Ionicons name="trending-up" size={24} color={colors.success} />
                  <Text style={styles.statValue}>92%</Text>
                  <Text style={styles.statLabel}>Progress</Text>
                </CardContent>
              </Card>
            </View>
          </View>

          {/* Recent Sessions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Sessions</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>

            <Card variant="glass" style={styles.sessionCard}>
              <CardContent>
                <View style={styles.sessionRow}>
                  <View style={styles.sessionInfo}>
                    <Text style={styles.sessionTitle}>Lower Back Therapy</Text>
                    <Text style={styles.sessionDate}>Today, 2:30 PM</Text>
                  </View>
                  <Badge variant="success">Completed</Badge>
                </View>
                <Progress value={100} style={styles.sessionProgress} />
                <View style={styles.sessionStats}>
                  <Text style={styles.sessionStat}>⏱ 20 min</Text>
                  <Text style={styles.sessionStat}>⚡ Level 5</Text>
                  <Text style={styles.sessionStat}>🔥 120 cal</Text>
                </View>
              </CardContent>
            </Card>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  greeting: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
  },
  name: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceCard: {
    marginBottom: spacing.xl,
  },
  deviceStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.text.tertiary,
  },
  statusDotConnected: {
    backgroundColor: colors.success,
  },
  deviceStatusText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  deviceName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  seeAll: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionCard: {
    width: '48%',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statCard: {
    width: '48%',
  },
  statValue: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginTop: spacing.sm,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
  sessionCard: {
    marginBottom: spacing.md,
  },
  sessionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  sessionDate: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
  sessionProgress: {
    marginBottom: spacing.md,
  },
  sessionStats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  sessionStat: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
});

export default HomeScreen;
