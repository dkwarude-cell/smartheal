/**
 * Coach Home Screen
 * SmartHeal App - Coach Dashboard
 */

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { useAuth } from '../../context/AuthContext';

type Athlete = {
  id: string;
  name: string;
  sport: string;
  readiness: number;
  compliance: number;
  lastActivity: string;
  tag1?: string;
  tag2?: string;
  accent: 'red' | 'green' | 'blue' | 'orange';
  streakDays?: number;
};

type FilterTab = 'all' | 'priority' | 'recent';

type Accent = {
  border: string;
  tint: string;
  text: string;
};

const accentMap: Record<Athlete['accent'], Accent> = {
  red: { border: colors.error, tint: colors.background.light, text: colors.error },
  green: { border: colors.success, tint: colors.background.light, text: colors.success },
  blue: { border: colors.info, tint: colors.background.light, text: colors.info },
  orange: { border: colors.accent.orange, tint: colors.background.light, text: colors.accent.orange },
};

const CoachHomeScreen: React.FC = () => {
  const { user } = useAuth();
  const coachName = useMemo(() => {
    const raw = user?.displayName || user?.email?.split('@')[0] || 'Coach';
    return raw.replace(/\s+/g, ' ').trim();
  }, [user]);

  const [tab, setTab] = useState<FilterTab>('all');
  const [query, setQuery] = useState('');

  const athletes: Athlete[] = [
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      sport: 'Marathon',
      readiness: 65,
      compliance: 78,
      lastActivity: '3 days ago',
      tag1: 'Needs attention',
      tag2: 'Low compliance',
      accent: 'red',
    },
    {
      id: 'mike',
      name: 'Mike Chen',
      sport: 'Track & Field',
      readiness: 94,
      compliance: 96,
      lastActivity: '2 hours ago',
      tag1: '14-day streak',
      tag2: 'Top performer',
      accent: 'green',
      streakDays: 14,
    },
    {
      id: 'emma',
      name: 'Emma Davis',
      sport: 'Cross Country',
      readiness: 82,
      compliance: 88,
      lastActivity: 'Today, 10 AM',
      tag1: 'Consistent',
      accent: 'blue',
      streakDays: 7,
    },
    {
      id: 'james',
      name: 'James Wilson',
      sport: 'Triathlon',
      readiness: 76,
      compliance: 84,
      lastActivity: 'Yesterday',
      tag1: 'Monitor closely',
      accent: 'orange',
      streakDays: 5,
    },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = athletes;

    if (tab === 'priority') {
      list = athletes.filter((a) => a.accent === 'red' || a.accent === 'orange');
    } else if (tab === 'recent') {
      list = athletes.filter((a) => a.lastActivity.includes('Today') || a.lastActivity.includes('hours'));
    }

    if (!q) return list;
    return list.filter((a) => a.name.toLowerCase().includes(q) || a.sport.toLowerCase().includes(q));
  }, [athletes, query, tab]);

  const tabCounts = {
    all: athletes.length,
    priority: athletes.filter((a) => a.accent === 'red' || a.accent === 'orange').length,
    recent: athletes.filter((a) => a.lastActivity.includes('Today') || a.lastActivity.includes('hours')).length,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="menu" size={22} color={colors.text.dark} />
        </TouchableOpacity>

        <View style={styles.brandRow}>
          <View style={styles.brandIcon}>
            <Ionicons name="heart" size={14} color={colors.text.primary} />
          </View>
          <Text style={styles.brandText}>SmartHeal</Text>
        </View>

        <View style={styles.topActions}>
          <View style={styles.badgeDot} />
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color={colors.text.dark} />
          </TouchableOpacity>
          <View style={styles.avatarDot} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeTitle}>Welcome Coach Dr. {coachName}!</Text>
        <Text style={styles.welcomeSubtitle}>Personal Coach  •  4 Athletes</Text>

        {/* Alerts */}
        <View style={styles.alertWrap}>
          <View style={[styles.alertAccent, { backgroundColor: colors.error }]} />
          <View style={[styles.alertCard, { backgroundColor: colors.background.white }]}>
            <View style={[styles.alertIconBg, { backgroundColor: colors.background.light }]}>
              <Ionicons name="alert-circle-outline" size={18} color={colors.error} />
            </View>
            <View style={styles.alertBody}>
              <View style={styles.alertHeaderRow}>
                <Text style={styles.alertName}>Sarah Johnson</Text>
                <Text style={styles.alertTime}>2h ago</Text>
              </View>
              <Text style={styles.alertText}>Missed 2 consecutive sessions. Recovery score dropped to 65%.</Text>
              <Text style={[styles.alertLink, { color: colors.error }]}>Schedule check-in →</Text>
            </View>
            <TouchableOpacity style={styles.alertClose}>
              <Ionicons name="close" size={18} color={colors.text.muted} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.alertWrap}>
          <View style={[styles.alertAccent, { backgroundColor: colors.success }]} />
          <View style={[styles.alertCard, { backgroundColor: colors.background.white }]}>
            <View style={[styles.alertIconBg, { backgroundColor: colors.background.light }]}>
              <Ionicons name="sparkles-outline" size={18} color={colors.success} />
            </View>
            <View style={styles.alertBody}>
              <View style={styles.alertHeaderRow}>
                <Text style={styles.alertName}>Mike Chen</Text>
                <Text style={styles.alertTime}>4h ago</Text>
              </View>
              <Text style={styles.alertText}>Completed 14-day streak! Recovery score improved by 18%.</Text>
              <Text style={[styles.alertLink, { color: colors.success }]}>Send congratulations →</Text>
            </View>
            <TouchableOpacity style={styles.alertClose}>
              <Ionicons name="close" size={18} color={colors.text.muted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Team Overview */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Team Overview</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>View Analytics →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: colors.background.light }]}>
              <Ionicons name="people-outline" size={20} color={colors.info} />
            </View>
            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statValueMuted}>/28</Text>
            </View>
            <Text style={styles.statLabel}>Active Athletes</Text>
            <View style={styles.deltaRow}>
              <Ionicons name="arrow-up" size={14} color={colors.success} />
              <Text style={styles.deltaText}>+2</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '86%', backgroundColor: colors.info }]} />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: colors.background.light }]}>
              <Ionicons name="checkmark-circle-outline" size={20} color={colors.success} />
            </View>
            <Text style={styles.statValueOnly}>92%</Text>
            <Text style={styles.statLabel}>Avg Compliance</Text>
            <View style={styles.deltaRow}>
              <Ionicons name="arrow-up" size={14} color={colors.success} />
              <Text style={styles.deltaText}>+5%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '92%', backgroundColor: colors.success }]} />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: colors.background.light }]}>
              <Ionicons name="alert-circle-outline" size={20} color={colors.accent.orange} />
            </View>
            <Text style={styles.statValueOnly}>3</Text>
            <Text style={styles.statLabel}>At-Risk Athletes</Text>
            <View style={styles.deltaRow}>
              <Ionicons name="arrow-down" size={14} color={colors.error} />
              <Text style={[styles.deltaText, { color: colors.error }]}>-1</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '12%', backgroundColor: colors.accent.orange }]} />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: colors.background.light }]}>
              <Ionicons name="videocam-outline" size={20} color={colors.accent.purple} />
            </View>
            <Text style={styles.statValueOnly}>84%</Text>
            <Text style={styles.statLabel}>Avg Readiness</Text>
            <View style={styles.deltaRow}>
              <Ionicons name="arrow-up" size={14} color={colors.success} />
              <Text style={styles.deltaText}>+3%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '84%', backgroundColor: colors.accent.purple }]} />
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color={colors.text.muted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search athletes..."
              placeholderTextColor={colors.text.muted}
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={18} color={colors.text.dark} />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            onPress={() => setTab('all')}
            style={[styles.tabPill, tab === 'all' && styles.tabPillActive]}
            activeOpacity={0.9}
          >
            <Text style={[styles.tabText, tab === 'all' && styles.tabTextActive]}>All Athletes</Text>
            <View style={[styles.tabCount, tab === 'all' && styles.tabCountActive]}>
              <Text style={[styles.tabCountText, tab === 'all' && styles.tabCountTextActive]}>{tabCounts.all}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTab('priority')}
            style={[styles.tabPill, tab === 'priority' && styles.tabPillActive]}
            activeOpacity={0.9}
          >
            <Text style={[styles.tabText, tab === 'priority' && styles.tabTextActive]}>Priority</Text>
            <View style={[styles.tabCount, tab === 'priority' && styles.tabCountActive]}>
              <Text style={[styles.tabCountText, tab === 'priority' && styles.tabCountTextActive]}>{tabCounts.priority}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTab('recent')}
            style={[styles.tabPill, tab === 'recent' && styles.tabPillActive]}
            activeOpacity={0.9}
          >
            <Text style={[styles.tabText, tab === 'recent' && styles.tabTextActive]}>Recent</Text>
            <View style={[styles.tabCount, tab === 'recent' && styles.tabCountActive]}>
              <Text style={[styles.tabCountText, tab === 'recent' && styles.tabCountTextActive]}>{tabCounts.recent}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* List */}
        <View style={styles.listHeaderRow}>
          <Text style={styles.listTitle}>All Athletes</Text>
          <Text style={styles.listCount}>{filtered.length} athletes</Text>
        </View>

        {filtered.map((athlete: Athlete) => {
          const accent = accentMap[athlete.accent];
          return (
            <View key={athlete.id} style={styles.athleteWrap}>
              <View style={[styles.athleteAccent, { backgroundColor: accent.border }]} />
              <View style={styles.athleteCard}>
                <View style={styles.athleteTop}>
                  <View style={styles.avatar}>
                    <Ionicons name="person" size={20} color={colors.text.dark} />
                  </View>

                  <View style={styles.athleteInfo}>
                    <Text style={styles.athleteName}>{athlete.name}</Text>
                    <Text style={styles.athleteSport}>{athlete.sport}</Text>

                    <View style={styles.tagsRow}>
                      {athlete.tag1 ? (
                        <View style={[styles.tagPill, { backgroundColor: accent.tint, borderColor: accent.border }]}>
                          <Text style={[styles.tagText, { color: accent.text }]}>{athlete.tag1}</Text>
                        </View>
                      ) : null}
                      {athlete.tag2 ? (
                        <View style={[styles.tagPill, { backgroundColor: colors.background.light, borderColor: colors.border }]}>
                          <Text style={[styles.tagText, { color: colors.text.dark }]}>{athlete.tag2}</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>

                  <View style={styles.readinessCol}>
                    <Text style={[styles.readinessValue, { color: accent.border }]}>{athlete.readiness}%</Text>
                    <Text style={styles.readinessLabel}>Readiness</Text>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={14} color={colors.text.tertiary} />
                    <Text style={styles.metaText}>{athlete.lastActivity}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="fitness-outline" size={14} color={colors.text.tertiary} />
                    <Text style={styles.metaText}>{athlete.compliance}% compliance</Text>
                  </View>
                  {athlete.streakDays ? (
                    <View style={styles.metaItem}>
                      <Ionicons name="flash-outline" size={14} color={colors.accent.orange} />
                      <Text style={[styles.metaText, { color: colors.accent.orange, fontWeight: typography.fontWeight.bold }]}>
                        {athlete.streakDays} day streak
                      </Text>
                    </View>
                  ) : null}
                </View>

                <Text style={[styles.trendLabel, { color: athlete.accent === 'green' ? colors.success : colors.error }]}>7-day trend</Text>

                <View style={styles.actionsRow}>
                  <TouchableOpacity style={styles.primaryAction} activeOpacity={0.9}>
                    <Ionicons name="chatbubble-outline" size={18} color={colors.info} />
                    <Text style={styles.primaryActionText}>Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconAction} activeOpacity={0.9}>
                    <Ionicons name="call-outline" size={18} color={colors.text.dark} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconAction} activeOpacity={0.9}>
                    <Ionicons name="eye-outline" size={18} color={colors.text.dark} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chevAction} activeOpacity={0.9}>
                    <Ionicons name="chevron-forward" size={22} color={colors.text.muted} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.light },

  topBar: {
    height: 56,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandIcon: {
    width: 22,
    height: 22,
    borderRadius: 7,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: { fontSize: 18, fontWeight: typography.fontWeight.bold, color: colors.text.dark },
  topActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
    position: 'absolute',
    right: 42,
    top: 10,
    zIndex: 2,
  },
  avatarDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.border },

  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xl },
  welcomeTitle: { fontSize: 28, fontWeight: typography.fontWeight.bold, color: colors.text.dark, marginBottom: spacing.xs },
  welcomeSubtitle: { fontSize: 14, color: colors.text.tertiary, marginBottom: spacing.lg },

  alertWrap: { marginBottom: spacing.md },
  alertAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, borderRadius: 3 },
  alertCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    paddingLeft: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: spacing.md,
  },
  alertIconBg: { width: 44, height: 44, borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center' },
  alertBody: { flex: 1, gap: 6 },
  alertHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  alertName: { fontSize: 16, fontWeight: typography.fontWeight.bold, color: colors.text.dark },
  alertTime: { fontSize: 12, color: colors.text.tertiary },
  alertText: { color: colors.text.dark, opacity: 0.8, lineHeight: 18 },
  alertLink: { fontWeight: typography.fontWeight.bold },
  alertClose: { width: 32, height: 32, borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center' },

  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.md },
  sectionTitle: { fontSize: 16, fontWeight: typography.fontWeight.bold, color: colors.text.dark },
  sectionLink: { color: colors.info, fontWeight: typography.fontWeight.semibold },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: spacing.md, marginBottom: spacing.md },
  statCard: {
    width: '48%',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIconBg: { width: 46, height: 46, borderRadius: borderRadius.xl, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  statValueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  statValue: { fontSize: 26, fontWeight: typography.fontWeight.bold, color: colors.text.dark },
  statValueMuted: { fontSize: 18, fontWeight: typography.fontWeight.semibold, color: colors.text.muted },
  statValueOnly: { fontSize: 26, fontWeight: typography.fontWeight.bold, color: colors.text.dark },
  statLabel: { color: colors.text.tertiary, fontWeight: typography.fontWeight.semibold, marginTop: 2 },
  deltaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.sm, marginBottom: spacing.sm },
  deltaText: { color: colors.success, fontWeight: typography.fontWeight.bold },
  progressTrack: { height: 6, backgroundColor: colors.border, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 999 },

  searchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm, marginBottom: spacing.md },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  searchInput: { flex: 1, color: colors.text.dark, fontWeight: typography.fontWeight.semibold },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  tabPill: {
    flex: 1,
    height: 44,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  tabPillActive: { backgroundColor: colors.info, borderColor: colors.info },
  tabText: { fontWeight: typography.fontWeight.bold, color: colors.text.dark },
  tabTextActive: { color: colors.background.white },
  tabCount: { minWidth: 22, height: 22, borderRadius: 11, backgroundColor: colors.background.light, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  tabCountActive: { backgroundColor: 'rgba(255,255,255,0.2)' },
  tabCountText: { fontSize: 12, fontWeight: typography.fontWeight.bold, color: colors.info },
  tabCountTextActive: { color: colors.background.white },

  listHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xs, marginBottom: spacing.sm },
  listTitle: { fontSize: 16, fontWeight: typography.fontWeight.bold, color: colors.text.dark },
  listCount: { color: colors.text.tertiary, fontWeight: typography.fontWeight.semibold },

  athleteWrap: { marginBottom: spacing.md },
  athleteAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, borderRadius: 3 },
  athleteCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    paddingLeft: spacing.lg,
  },
  athleteTop: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 46, height: 46, borderRadius: borderRadius.xl, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  athleteInfo: { flex: 1, paddingLeft: spacing.md, paddingRight: spacing.sm },
  athleteName: { fontSize: 16, fontWeight: typography.fontWeight.bold, color: colors.text.dark },
  athleteSport: { color: colors.text.tertiary, marginTop: 2, fontWeight: typography.fontWeight.semibold },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  tagPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, borderWidth: 1 },
  tagText: { fontSize: 12, fontWeight: typography.fontWeight.bold },
  readinessCol: { alignItems: 'flex-end' },
  readinessValue: { fontSize: 18, fontWeight: typography.fontWeight.bold },
  readinessLabel: { fontSize: 12, color: colors.text.tertiary, fontWeight: typography.fontWeight.semibold, marginTop: 2 },

  metaRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md, alignItems: 'center', flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { color: colors.text.dark, opacity: 0.8, fontWeight: typography.fontWeight.semibold },
  trendLabel: { fontWeight: typography.fontWeight.bold, marginTop: spacing.sm },

  actionsRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  primaryAction: {
    flex: 1,
    height: 46,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.background.light,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  primaryActionText: { color: colors.info, fontWeight: typography.fontWeight.bold },
  iconAction: {
    width: 46,
    height: 46,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.background.light,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  chevAction: { marginLeft: 'auto' },
});

export default CoachHomeScreen;
