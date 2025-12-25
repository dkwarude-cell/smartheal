import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';

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
  streakLabel?: string;
  streakDays?: number;
};

type FilterTab = 'all' | 'priority' | 'recent';

const accentMap: Record<Athlete['accent'], { border: string; tint: string; text: string }> = {
  red: { border: '#EF4444', tint: '#FEE2E2', text: '#B91C1C' },
  green: { border: '#22C55E', tint: '#DCFCE7', text: '#166534' },
  blue: { border: '#3B82F6', tint: '#DBEAFE', text: '#1D4ED8' },
  orange: { border: '#F97316', tint: '#FFEDD5', text: '#9A3412' },
};

const CoachHomeScreen = () => {
  const { user } = useAuth();
  const name = useMemo(() => {
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
      streakLabel: 'day streak',
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
      streakLabel: 'day streak',
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
      streakLabel: 'day streak',
      streakDays: 5,
    },
  ];

  const filtered = useMemo<Athlete[]>(() => {
    const q = query.trim().toLowerCase();
    let list = athletes;
    if (tab === 'priority') list = athletes.filter((a) => a.accent === 'red' || a.accent === 'orange');
    if (tab === 'recent') list = athletes.filter((a) => a.lastActivity.includes('Today') || a.lastActivity.includes('hours'));
    if (!q) return list;
    return list.filter((a) => a.name.toLowerCase().includes(q) || a.sport.toLowerCase().includes(q));
  }, [athletes, query, tab]);

  const tabCounts = {
    all: athletes.length,
    priority: athletes.filter((a) => a.accent === 'red' || a.accent === 'orange').length,
    recent: athletes.filter((a) => a.lastActivity.includes('Today') || a.lastActivity.includes('hours')).length,
  };

  const coachTitle = 'Personal Coach';
  const athletesCount = 4;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.gradient}>
        {/* Header */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="menu" size={22} color="#111827" />
          </TouchableOpacity>

          <View style={styles.brandRow}>
            <View style={styles.brandIcon}>
              <Icon name="heart" size={14} color="#FFFFFF" />
            </View>
            <Text style={styles.brandText}>SmartHeal</Text>
          </View>

          <View style={styles.topActions}>
            <View style={styles.badgeDot} />
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="bell-outline" size={22} color="#111827" />
            </TouchableOpacity>
            <View style={styles.avatarDot} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.welcomeTitle}>Welcome Coach Dr. {name}!</Text>
          <Text style={styles.welcomeSubtitle}>
            {coachTitle} {'  '}•{'  '}{athletesCount} Athletes
          </Text>

          {/* Alerts */}
          <View style={styles.alertCardWrap}>
            <View style={[styles.alertAccent, { backgroundColor: accentMap.red.border }]} />
            <View style={[styles.alertCard, { backgroundColor: '#FEF2F2' }]}>
              <View style={styles.alertIconWrap}>
                <View style={[styles.alertIconBg, { backgroundColor: '#FEE2E2' }]}>
                  <Icon name="alert-circle-outline" size={18} color={accentMap.red.text} />
                </View>
              </View>
              <View style={styles.alertBody}>
                <View style={styles.alertHeaderRow}>
                  <Text style={styles.alertName}>Sarah Johnson</Text>
                  <Text style={styles.alertTime}>2h ago</Text>
                </View>
                <Text style={styles.alertText}>Missed 2 consecutive sessions. Recovery score dropped to 65%.</Text>
                <Text style={[styles.alertLink, { color: accentMap.red.text }]}>Schedule check-in →</Text>
              </View>
              <TouchableOpacity style={styles.alertClose}>
                <Icon name="close" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.alertCardWrap}>
            <View style={[styles.alertAccent, { backgroundColor: accentMap.green.border }]} />
            <View style={[styles.alertCard, { backgroundColor: '#ECFDF5' }]}>
              <View style={styles.alertIconWrap}>
                <View style={[styles.alertIconBg, { backgroundColor: '#DCFCE7' }]}>
                  <Icon name="sparkles" size={18} color={accentMap.green.text} />
                </View>
              </View>
              <View style={styles.alertBody}>
                <View style={styles.alertHeaderRow}>
                  <Text style={styles.alertName}>Mike Chen</Text>
                  <Text style={styles.alertTime}>4h ago</Text>
                </View>
                <Text style={styles.alertText}>Completed 14-day streak! Recovery score improved by 18%.</Text>
                <Text style={[styles.alertLink, { color: accentMap.green.text }]}>Send congratulations →</Text>
              </View>
              <TouchableOpacity style={styles.alertClose}>
                <Icon name="close" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Team Overview header */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Team Overview</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>View Analytics →</Text>
            </TouchableOpacity>
          </View>

          {/* Stats grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIconRow}>
                <View style={[styles.statIconBg, { backgroundColor: '#DBEAFE' }]}>
                  <Icon name="account-group-outline" size={20} color="#2563EB" />
                </View>
              </View>
              <Text style={styles.statValueRow}>
                <Text style={styles.statValue}>24</Text>
                <Text style={styles.statValueMuted}>/28</Text>
              </Text>
              <Text style={styles.statLabel}>Active Athletes</Text>
              <View style={styles.deltaRow}>
                <Icon name="arrow-up" size={14} color="#16A34A" />
                <Text style={styles.deltaText}>+2</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: '86%', backgroundColor: '#2563EB' }]} />
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIconRow}>
                <View style={[styles.statIconBg, { backgroundColor: '#DCFCE7' }]}>
                  <Icon name="check-circle-outline" size={20} color="#16A34A" />
                </View>
              </View>
              <Text style={styles.statValue}>92%</Text>
              <Text style={styles.statLabel}>Avg Compliance</Text>
              <View style={styles.deltaRow}>
                <Icon name="arrow-up" size={14} color="#16A34A" />
                <Text style={styles.deltaText}>+5%</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: '92%', backgroundColor: '#16A34A' }]} />
              </View>
            </View>

            <View style={[styles.statCard, styles.statCardBorderOrange]}>
              <View style={styles.statIconRow}>
                <View style={[styles.statIconBg, { backgroundColor: '#FFEDD5' }]}>
                  <Icon name="alert-circle-outline" size={20} color="#F97316" />
                </View>
              </View>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>At-Risk Athletes</Text>
              <View style={styles.deltaRow}>
                <Icon name="arrow-down" size={14} color="#DC2626" />
                <Text style={[styles.deltaText, { color: '#DC2626' }]}>-1</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: '12%', backgroundColor: '#F97316' }]} />
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIconRow}>
                <View style={[styles.statIconBg, { backgroundColor: '#F3E8FF' }]}>
                  <Icon name="video-outline" size={20} color="#A855F7" />
                </View>
              </View>
              <Text style={styles.statValue}>84%</Text>
              <Text style={styles.statLabel}>Avg Readiness</Text>
              <View style={styles.deltaRow}>
                <Icon name="arrow-up" size={14} color="#16A34A" />
                <Text style={styles.deltaText}>+3%</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: '84%', backgroundColor: '#A855F7' }]} />
              </View>
            </View>
          </View>

          {/* Search */}
          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <Icon name="magnify" size={18} color="#9CA3AF" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search athletes..."
                placeholderTextColor="#9CA3AF"
                style={styles.searchInput}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Icon name="filter-variant" size={18} color="#111827" />
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

          {/* Athlete list header */}
          <View style={styles.listHeaderRow}>
            <Text style={styles.listTitle}>All Athletes</Text>
            <Text style={styles.listCount}>{filtered.length} athletes</Text>
          </View>

          {filtered.map((athlete: Athlete) => {
            const accent = accentMap[athlete.accent];
            const readinessColor = athlete.accent === 'green' ? '#16A34A' : athlete.accent === 'blue' ? '#2563EB' : athlete.accent === 'orange' ? '#F97316' : '#EF4444';
            return (
              <View key={athlete.id} style={styles.athleteWrap}>
                <View style={[styles.athleteAccent, { backgroundColor: accent.border }]} />
                <View style={styles.athleteCard}>
                  <View style={styles.athleteTop}>
                    <View style={styles.avatar}>
                      <Icon name="account" size={20} color="#111827" />
                    </View>
                    <View style={styles.athleteInfo}>
                      <View style={styles.athleteNameRow}>
                        <Text style={styles.athleteName}>{athlete.name}</Text>
                      </View>
                      <Text style={styles.athleteSport}>{athlete.sport}</Text>
                      <View style={styles.tagsRow}>
                        {athlete.tag1 ? (
                          <View style={[styles.tagPill, { backgroundColor: accent.tint, borderColor: accent.border }]}>
                            <Text style={[styles.tagText, { color: accent.text }]}>{athlete.tag1}</Text>
                          </View>
                        ) : null}
                        {athlete.tag2 ? (
                          <View style={[styles.tagPill, { backgroundColor: '#F3F4F6', borderColor: '#E5E7EB' }]}>
                            <Text style={[styles.tagText, { color: '#111827' }]}>{athlete.tag2}</Text>
                          </View>
                        ) : null}
                      </View>
                    </View>

                    <View style={styles.readinessCol}>
                      <Text style={[styles.readinessValue, { color: readinessColor }]}>{athlete.readiness}%</Text>
                      <Text style={styles.readinessLabel}>Readiness</Text>
                    </View>
                  </View>

                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <Icon name="clock-outline" size={14} color="#6B7280" />
                      <Text style={styles.metaText}>{athlete.lastActivity}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Icon name="target" size={14} color="#6B7280" />
                      <Text style={styles.metaText}>{athlete.compliance}% compliance</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Icon name="lightning-bolt-outline" size={14} color="#F97316" />
                      <Text style={[styles.metaText, { color: '#F97316', fontWeight: '800' }]}>
                        {athlete.streakDays ? `${athlete.streakDays} ${athlete.streakLabel ?? ''}`.trim() : ''}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.trendLabel}>7-day trend</Text>

                  <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.primaryAction} activeOpacity={0.9}>
                      <Icon name="message-text-outline" size={18} color="#2563EB" />
                      <Text style={styles.primaryActionText}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconAction} activeOpacity={0.9}>
                      <Icon name="phone-outline" size={18} color="#111827" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconAction} activeOpacity={0.9}>
                      <Icon name="eye-outline" size={18} color="#111827" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chevAction} activeOpacity={0.9}>
                      <Icon name="chevron-right" size={22} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  gradient: { flex: 1 },

  topBar: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F5',
  },
  iconButton: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandIcon: { width: 22, height: 22, borderRadius: 7, backgroundColor: '#F52E32', alignItems: 'center', justifyContent: 'center' },
  brandText: { fontSize: 18, fontWeight: '800', color: '#111827' },
  topActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  badgeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', position: 'absolute', right: 42, top: 10, zIndex: 2 },
  avatarDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#D1D5DB' },

  scrollContent: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 28 },
  welcomeTitle: { fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 6 },
  welcomeSubtitle: { fontSize: 14, color: '#6B7280', marginBottom: 16 },

  alertCardWrap: { marginBottom: 12 },
  alertAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, borderRadius: 3 },
  alertCard: {
    borderRadius: 18,
    padding: 14,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: '#EEF0F5',
    flexDirection: 'row',
    gap: 12,
    overflow: 'hidden',
  },
  alertIconWrap: { paddingTop: 2 },
  alertIconBg: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  alertBody: { flex: 1, gap: 6 },
  alertHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  alertName: { fontSize: 16, fontWeight: '800', color: '#111827' },
  alertTime: { fontSize: 12, color: '#6B7280' },
  alertText: { color: '#374151', lineHeight: 18 },
  alertLink: { fontWeight: '800' },
  alertClose: { width: 32, height: 32, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },

  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
  sectionLink: { color: '#2563EB', fontWeight: '700' },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginBottom: 14 },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EEF0F5',
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  statCardBorderOrange: { borderColor: '#FED7AA' },
  statIconRow: { marginBottom: 10 },
  statIconBg: { width: 46, height: 46, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  statValueRow: { marginBottom: 2 },
  statValue: { fontSize: 26, fontWeight: '900', color: '#111827' },
  statValueMuted: { fontSize: 18, fontWeight: '800', color: '#9CA3AF' },
  statLabel: { color: '#6B7280', fontWeight: '700', marginTop: 2 },
  deltaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, marginBottom: 8 },
  deltaText: { color: '#16A34A', fontWeight: '800' },
  progressTrack: { height: 6, backgroundColor: '#E5E7EB', borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 999 },

  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8, marginBottom: 12 },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF0F5',
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 50,
  },
  searchInput: { flex: 1, color: '#111827', fontWeight: '600' },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF0F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  tabPill: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  tabPillActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  tabText: { fontWeight: '800', color: '#111827' },
  tabTextActive: { color: '#FFFFFF' },
  tabCount: { minWidth: 22, height: 22, borderRadius: 11, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  tabCountActive: { backgroundColor: 'rgba(255,255,255,0.2)' },
  tabCountText: { fontSize: 12, fontWeight: '900', color: '#1D4ED8' },
  tabCountTextActive: { color: '#FFFFFF' },

  listHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2, marginBottom: 10 },
  listTitle: { fontSize: 16, fontWeight: '900', color: '#111827' },
  listCount: { color: '#6B7280', fontWeight: '700' },

  athleteWrap: { marginBottom: 14 },
  athleteAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, borderRadius: 3 },
  athleteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EEF0F5',
    padding: 14,
    paddingLeft: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  athleteTop: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 46, height: 46, borderRadius: 16, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  athleteInfo: { flex: 1, paddingLeft: 12, paddingRight: 8 },
  athleteNameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  athleteName: { fontSize: 16, fontWeight: '900', color: '#111827' },
  athleteSport: { color: '#6B7280', marginTop: 2, fontWeight: '700' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  tagPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, borderWidth: 1 },
  tagText: { fontSize: 12, fontWeight: '800' },
  readinessCol: { alignItems: 'flex-end' },
  readinessValue: { fontSize: 18, fontWeight: '900' },
  readinessLabel: { fontSize: 12, color: '#6B7280', fontWeight: '700', marginTop: 2 },

  metaRow: { flexDirection: 'row', gap: 12, marginTop: 12, alignItems: 'center', flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { color: '#374151', fontWeight: '700' },
  trendLabel: { color: '#DC2626', fontWeight: '800', marginTop: 10 },

  actionsRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  primaryAction: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryActionText: { color: '#2563EB', fontWeight: '900' },
  iconAction: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chevAction: { marginLeft: 'auto' },
});

export default CoachHomeScreen;
