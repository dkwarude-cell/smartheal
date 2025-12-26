import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Animated, Dimensions, Pressable, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { useDevice } from '../context/DeviceContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const SmartHealLogo = require('../assets/smartheal-logo.png');

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8;

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const { isConnected } = useDevice();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    setDrawerOpen(false);
    await logout?.();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Start' }],
    });
  };

  const name = useMemo(() => {
    const raw = user?.displayName || user?.email || 'SmartHeal';
    return raw.split(' ')[0] || 'SmartHeal';
  }, [user]);

  const performance = [
    { label: 'Weekly Distance', value: '42.8 km', delta: '+12% vs last week', icon: 'walk', color: ['#ffffffff', '#ffffffff'] },
    { label: 'Recovery Score', value: '87%', delta: '+5% vs last week', icon: 'heart-outline', color: ['#ffffffff', '#ffffffff'] },
    { label: 'Training Load', value: '245', delta: '+8% vs last week', icon: 'flash', color: ['#ffffffff', '#ffffffff'] },
    { label: 'Avg Pace', value: '5:20/km', delta: '+16s vs last week', icon: 'timer-outline', color: ['#ffffffff', '#ffffffff'] },
  ];

  const wins = [
    { title: '7-Day Streak', note: 'Longest ever', icon: 'fire', color: '#FB923C' },
    { title: '15 Sessions', note: '5 more to gold', icon: 'medal', color: '#8B5CF6' },
    { title: '98% Adherence', note: 'This month', icon: 'checkbox-marked-circle-outline', color: '#38BDF8' },
  ];

  const sessions = [
    {
      title: 'Recovery Session',
      subtitle: 'Post-workout recovery therapy',
      area: 'Hamstrings',
      status: 'Low',
      kcal: 85,
      effectiveness: 92,
      time: 'Today',
      nextIn: 'Next in 2h 30m',
      levelColor: '#22C55E',
    },
    {
      title: 'Performance Session',
      subtitle: 'Pre-training muscle activation',
      area: 'Quadriceps',
      status: 'High',
      kcal: 120,
      effectiveness: 88,
      time: 'Later today',
      nextIn: 'Due in 5h',
      levelColor: '#F97316',
    },
  ];

  const readiness = {
    score: 87,
    delta: '+5% today',
    metrics: [
      { label: 'Mood', value: 'Good', icon: 'emoticon-happy-outline' },
      { label: 'Sleep', value: '7.5h', icon: 'moon-waning-crescent' },
      { label: 'HRV', value: 'Optimal', icon: 'pulse' },
    ],
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      {/* Sidebar Drawer Modal */}
      <Modal
        visible={drawerOpen}
        transparent={true}
        animationType="none"
        onRequestClose={() => setDrawerOpen(false)}
      >
        <View style={styles.drawerOverlay}>
          <Pressable style={styles.drawerBackdrop} onPress={() => setDrawerOpen(false)} />
          <View style={styles.drawer}>
            {/* Drawer Header */}
            <View style={styles.drawerHeader}>
              <View style={styles.drawerLogo}>
                <View style={styles.logoIcon}>
                  <Image source={SmartHealLogo} style={styles.logoImage} resizeMode="contain" />
                </View>
                <View>
                  <Text style={styles.drawerBrand}>SmartHeal</Text>
                  <Text style={styles.drawerSubBrand}>by Runverve</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setDrawerOpen(false)} style={styles.closeButton}>
                <Icon name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* User Profile */}
            <TouchableOpacity style={styles.drawerProfile}>
              <View style={styles.profileAvatar}>
                <Icon name="account" size={24} color="#EF4444" />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Dr. {name}</Text>
                <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
              </View>
              <TouchableOpacity style={styles.shareButton}>
                <Icon name="share-variant" size={18} color="#6B7280" />
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Device Status */}
            <View style={styles.drawerSection}>
              <Text style={styles.drawerSectionTitle}>Device Status</Text>
              <View style={styles.deviceStatus}>
                <View style={styles.deviceInfo}>
                  <Icon name="bluetooth" size={18} color="#3B82F6" />
                  <Text style={styles.deviceName}>SmartHeal ITT{'\n'}Device</Text>
                </View>
                <View style={[styles.connectionBadge, isConnected ? styles.connectedBadge : styles.disconnectedBadge]}>
                  <Text style={[styles.connectionText, isConnected ? styles.connectedText : styles.disconnectedText]}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Menu Items */}
            <View style={styles.drawerMenu}>
              <TouchableOpacity style={styles.menuItem} onPress={() => { setDrawerOpen(false); (navigation as any).navigate('Profile'); }}>
                <Icon name="account-outline" size={22} color="#374151" />
                <Text style={styles.menuText}>My Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => { setDrawerOpen(false); }}>
                <Icon name="cog-outline" size={22} color="#374151" />
                <Text style={styles.menuText}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => { setDrawerOpen(false); }}>
                <Icon name="bell-outline" size={22} color="#374151" />
                <Text style={styles.menuText}>Notifications</Text>
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => { setDrawerOpen(false); (navigation as any).navigate('DeviceConnection'); }}>
                <Icon name="bluetooth" size={22} color="#374151" />
                <Text style={styles.menuText}>Device Settings</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem} onPress={() => { setDrawerOpen(false); (navigation as any).navigate('BasicInfo'); }}>
                <Icon name="heart-outline" size={22} color="#374151" />
                <Text style={styles.menuText}>Health Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => { setDrawerOpen(false); (navigation as any).navigate('Goals'); }}>
                <Icon name="target" size={22} color="#374151" />
                <Text style={styles.menuText}>Goals & Progress</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Icon name="logout" size={22} color="#EF4444" />
                <Text style={[styles.menuText, styles.logoutText]}>Sign Out</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.drawerFooter}>
              <Text style={styles.footerVersion}>SmartHeal v2.4.1</Text>
              <Text style={styles.footerCopyright}>© 2025 Runverve Inc.</Text>
            </View>
          </View>
        </View>
      </Modal>

      <LinearGradient 
        colors={["#ffcf98ff","#FF6B3D", "#FF5252", "#FF7B9C", "#C084FC"]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        {/* Gradient Header Section */}
        <View style={styles.gradientHeader}>
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.iconButtonWhite} onPress={() => setDrawerOpen(true)}>
              <Icon name="menu" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.topActions}>
              <TouchableOpacity style={styles.iconButtonWhite}><Icon name="bell-outline" size={18} color="#FFFFFF" /></TouchableOpacity>
              <TouchableOpacity style={styles.iconButtonWhite}><Icon name="cog-outline" size={18} color="#FFFFFF" /></TouchableOpacity>
            </View>
          </View>

          <View style={styles.heroRowGradient}>
            <View style={styles.heroCopy}>
              <Text style={styles.heroGreetingWhite}>Good Morning</Text>
              <Text style={styles.heroNameWhite}>{name}</Text>
            </View>
            <View style={styles.profileScoreContainer}>
              <View style={styles.profileAvatarHeader}>
                <Icon name="account" size={28} color="#FFFFFF" />
              </View>
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreBadgeText}>92</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <LinearGradient colors={["#7C5CFF", "#F92F60"]} style={styles.calloutCard}>
            <View style={styles.calloutHeader}>
              <View style={styles.calloutIcon}><Icon name="information-outline" size={14} color="#FFFFFF" /></View>
              <Text style={styles.calloutTitle}>Focus: Active Recovery</Text>
              <View style={styles.matchPill}>
                <Text style={styles.matchPillText}>94% match</Text>
              </View>
            </View>
            <Text style={styles.calloutBody}>
              Your training load is optimal. Today’s session will enhance blood flow and reduce muscle soreness by 40%.
            </Text>
            <View style={styles.calloutFooter}>
              <View style={styles.footerItem}><Icon name="radio" size={14} color="#FFFFFF" /><Text style={styles.footerText}>20-minute low-intensity session on hamstrings</Text></View>
            </View>
          </LinearGradient>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Performance Overview</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PerformanceOverview' as never)}><Text style={styles.link}>View All</Text></TouchableOpacity>
          </View>
          <View style={styles.performanceGrid}>
            {performance.map((item) => (
              <View key={item.label} style={styles.perfCard}>
                <View style={styles.perfIcon}><Icon name={item.icon} size={18} color="#0F172A" /></View>
                <Text style={styles.perfValue}>{item.value}</Text>
                <Text style={styles.perfLabel}>{item.label}</Text>
                <Text style={styles.perfDelta}>{item.delta}</Text>
              </View>
            ))}
          </View>

    

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>This Week’s Wins</Text>
            <Icon name="star" size={16} color="#F59E0B" />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.winRow}>
            {wins.map((win) => (
              <View key={win.title} style={styles.winCard}>
                <View style={[styles.winIcon, { backgroundColor: `${win.color}22` }]}>
                  <Icon name={win.icon} size={16} color={win.color} />
                </View>
                <Text style={styles.winTitle}>{win.title}</Text>
                <Text style={styles.winNote}>{win.note}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
            <Text style={styles.link}>View list</Text>
          </View>
          <View style={styles.sessionList}>
            {sessions.map((session) => (
              <View key={session.title} style={styles.sessionCard}>
                <View style={styles.sessionTop}>
                  <View>
                    <Text style={styles.sessionLabel}>{session.title}</Text>
                    <Text style={styles.sessionMeta}>{session.time} · {session.area}</Text>
                  </View>
                  <View style={[styles.statusPill, { backgroundColor: `${session.levelColor}1A`, borderColor: `${session.levelColor}44` }]}>
                    <Text style={[styles.statusText, { color: session.levelColor }]}>{session.status}</Text>
                  </View>
                </View>
                <Text style={styles.sessionSubtitle}>{session.subtitle}</Text>
                <View style={styles.sessionStatsRow}>
                  <Text style={styles.sessionStat}>🔥 {session.kcal} cal</Text>
                  <Text style={styles.sessionStat}>🎯 {session.effectiveness}% effective</Text>
                  <Text style={styles.sessionStat}>🕒 {session.nextIn}</Text>
                </View>
              </View>
            ))}
          </View>

          <LinearGradient colors={["#1e293b", "#0f172a"]} style={styles.readinessCard}>
            {/* Header */}
            <View style={styles.readinessHeader}>
              <View style={styles.readinessLeft}>
                <Text style={styles.readinessTitle}>Recovery Readiness</Text>
                <Text style={styles.readinessUpdated}>Updated 2 hours ago</Text>
              </View>
              <View style={styles.readinessRight}>
                <Text style={styles.readinessScore}>{readiness.score}%</Text>
                <View style={styles.readinessDeltaContainer}>
                  <Text style={styles.readinessDeltaArrow}>↑</Text>
                  <Text style={styles.readinessDelta}>{readiness.delta}</Text>
                </View>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <LinearGradient
                  colors={["#10b981", "#22d3ee", "#a855f7"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressBarFill, { width: `${readiness.score}%` }]}
                />
              </View>
            </View>

            {/* Metrics Grid */}
            <View style={styles.readinessMetrics}>
              {readiness.metrics.map((metric, index) => (
                <View key={metric.label} style={styles.metricChip}>
                  <Text style={styles.metricEmoji}>{index === 0 ? '💪' : index === 1 ? '😴' : '❤️'}</Text>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                  <Text style={styles.metricValue}>{metric.value}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FBFF' },
  headerGradient: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ? StatusBar.currentHeight + 15 : 50 : 55,
    paddingBottom: 16,
    paddingHorizontal: 14,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  gradientHeader: {
    // Container for gradient header content
  },
  gradient: { flex: 1 },
  scrollContent: { padding: 14, paddingBottom: 32, backgroundColor: '#F8FBFF' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  iconButtonWhite: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  brand: { fontWeight: '800', color: '#111827', fontSize: 14 },
  topActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  heroRowGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  heroCopy: { flex: 1 },
  heroGreetingWhite: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  heroNameWhite: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4,
  },
  heroGreeting: { fontSize: 22, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  heroSub: { color: '#6B7280', lineHeight: 18 },
  profileScoreContainer: {
    alignItems: 'center',
  },
  profileAvatarHeader: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  scoreBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  scoreBadgeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#EF4444',
  },
  streakBadge: {
    width: 74,
    height: 74,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF3D68',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  streakNumber: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  streakLabel: { color: '#FFE4E8', fontSize: 11, textAlign: 'center' },
  calloutCard: {
    borderRadius: 18,
    padding: 14,
    marginVertical: 12,
    shadowColor: '#7C5CFF',
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  calloutHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  calloutIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutTitle: { color: '#FFFFFF', fontWeight: '800', flex: 1 },
  matchPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  matchPillText: { color: '#FFFFFF', fontWeight: '800', fontSize: 12 },
  calloutBody: { color: '#F9FAFB', lineHeight: 18, marginBottom: 10 },
  calloutFooter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerText: { color: '#F9FAFB', fontSize: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
  link: { color: '#F52E32', fontWeight: '700', fontSize: 12 },
  performanceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  perfCard: {
    width: '47%',
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  perfIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  perfValue: { color: '#0F172A', fontWeight: '800', fontSize: 18 },
  perfLabel: { color: '#334155', fontWeight: '700', marginTop: 2 },
  perfDelta: { color: '#16A34A', marginTop: 4, fontSize: 12 },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, marginBottom: 8 },
  navTab: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  navTabActive: { backgroundColor: '#FEF2F2', borderColor: '#FEE2E2' },
  navText: { color: '#6B7280', fontWeight: '700', fontSize: 12 },
  navTextActive: { color: '#F52E32' },
  winRow: { gap: 10, paddingRight: 10 },
  winCard: {
    width: 140,
    borderRadius: 14,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  winIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  winTitle: { fontWeight: '800', color: '#111827', marginBottom: 4 },
  winNote: { color: '#6B7280', fontSize: 12 },
  sessionList: { gap: 10 },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  sessionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sessionLabel: { fontWeight: '800', color: '#111827' },
  sessionMeta: { color: '#6B7280', marginTop: 2 },
  statusPill: { borderWidth: 1, borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10 },
  statusText: { fontWeight: '800', fontSize: 12 },
  sessionSubtitle: { color: '#4B5563', marginTop: 6 },
  sessionStatsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 },
  sessionStat: { color: '#111827', fontWeight: '700' },
  readinessCard: {
    marginTop: 12,
    borderRadius: 20,
    padding: 14,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  readinessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  readinessLeft: {
    flex: 1,
  },
  readinessTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 2,
  },
  readinessUpdated: {
    color: '#9CA3AF',
    fontSize: 11,
  },
  readinessRight: {
    alignItems: 'flex-end',
  },
  readinessScore: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 36,
  },
  readinessDeltaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readinessDeltaArrow: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '700',
  },
  readinessDelta: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '700',
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
  },
  readinessMetrics: {
    flexDirection: 'row',
    gap: 8,
  },
  metricChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  metricEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  metricLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricValue: {
    color: '#D1D5DB',
    fontSize: 11,
  },
  
  // Drawer Styles
  drawerOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 20,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  drawerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  brandLogo: {
    width: 20,
    height: 20,
  },
  drawerBrand: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  drawerSubBrand: {
    fontSize: 12,
    color: '#6B7280',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    margin: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  profileEmail: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  shareText: {
    fontSize: 13,
    color: '#6B7280',
  },
  drawerSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  drawerSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deviceName: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
  },
  connectionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  connectedBadge: {
    backgroundColor: '#DCFCE7',
  },
  disconnectedBadge: {
    backgroundColor: '#F3F4F6',
  },
  connectionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  connectedText: {
    color: '#16A34A',
  },
  disconnectedText: {
    color: '#6B7280',
  },
  drawerMenu: {
    paddingHorizontal: 16,
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  menuText: {
    fontSize: 15,
    color: '#374151',
    marginLeft: 14,
    flex: 1,
  },
  logoutText: {
    color: '#EF4444',
  },
  notificationBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
  },
  footerVersion: {
    fontSize: 12,
    color: '#6B7280',
  },
  footerCopyright: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
});

export default HomeScreen;
