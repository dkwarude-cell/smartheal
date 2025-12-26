import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable, Platform, StatusBar, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import healthService, { HealthData } from '../services/HealthService';

interface PerformanceItem {
  id: string;
  label: string;
  value: string;
  target: string;
  progress: number;
  delta: string;
  icon: string;
  color: string;
  bgColor: string;
}

const PerformanceOverviewScreen = () => {
  const navigation = useNavigation();
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncedApps, setSyncedApps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Generate performance data based on health data or defaults
  const getPerformanceData = useCallback((): PerformanceItem[] => {
    const steps = healthData?.steps || 8542;
    const activeEnergy = healthData?.activeEnergy || 420;
    const restingEnergy = healthData?.restingEnergy || 1680;
    const headphoneLevel = healthData?.headphoneAudioLevel || 72;
    const weeklyDistance = healthData?.distance ? healthData.distance * 7 : 42.8; // Approximate weekly

    return [
      { 
        id: 'steps',
        label: "Today's Steps", 
        value: steps.toLocaleString(), 
        target: '10,000',
        progress: Math.min(Math.round((steps / 10000) * 100), 100),
        delta: healthData ? 'From Apple Health' : '+1,200 vs yesterday', 
        icon: 'walk', 
        color: '#10B981',
        bgColor: '#ECFDF5'
      },
      { 
        id: 'active-energy',
        label: 'Active Energy', 
        value: `${activeEnergy} kcal`, 
        target: '500 kcal',
        progress: Math.min(Math.round((activeEnergy / 500) * 100), 100),
        delta: healthData ? 'From Apple Health' : '+45 kcal vs yesterday', 
        icon: 'fire', 
        color: '#F97316',
        bgColor: '#FFF7ED'
      },
      { 
        id: 'resting-energy',
        label: 'Resting Energy', 
        value: `${restingEnergy.toLocaleString()} kcal`, 
        target: '—',
        progress: 100,
        delta: healthData ? 'From Apple Health' : 'Based on BMR', 
        icon: 'sleep', 
        color: '#8B5CF6',
        bgColor: '#F5F3FF'
      },
      { 
        id: 'headphone-audio',
        label: 'Headphone Audio', 
        value: `${headphoneLevel} dB`, 
        target: '< 80 dB',
        progress: Math.min(Math.round((headphoneLevel / 100) * 100), 100),
        delta: headphoneLevel < 80 ? 'Safe level' : 'High exposure', 
        icon: 'headphones', 
        color: '#06B6D4',
        bgColor: '#ECFEFF'
      },
      { 
        id: 'weekly-distance',
        label: 'Weekly Distance', 
        value: `${weeklyDistance.toFixed(1)} km`, 
        target: '50 km',
        progress: Math.min(Math.round((weeklyDistance / 50) * 100), 100),
        delta: healthData ? 'From Apple Health' : '+12% vs last week', 
        icon: 'map-marker-distance', 
        color: '#3B82F6',
        bgColor: '#EFF6FF'
      },
      { 
        id: 'recovery-score',
        label: 'Recovery Score', 
        value: '87%', 
        target: '100%',
        progress: 87,
        delta: '+5% vs last week', 
        icon: 'heart-pulse', 
        color: '#EF4444',
        bgColor: '#FEF2F2'
      },
      { 
        id: 'training-load',
        label: 'Training Load', 
        value: '245', 
        target: '300',
        progress: 82,
        delta: '+8% vs last week', 
        icon: 'flash', 
        color: '#FBBF24',
        bgColor: '#FFFBEB'
      },
      { 
        id: 'avg-pace',
        label: 'Avg Pace', 
        value: '5:20/km', 
        target: '5:00/km',
        progress: 94,
        delta: '+16s vs last week', 
        icon: 'timer-outline', 
        color: '#EC4899',
        bgColor: '#FDF2F8'
      },
    ];
  }, [healthData]);

  const performanceData = getPerformanceData();

  const healthApps = [
    { id: 'apple-health', name: 'Apple Health', icon: 'apple', platform: 'ios', color: '#FF3B30' },
    { id: 'samsung-health', name: 'Samsung Health', icon: 'cellphone', platform: 'android', color: '#1428A0' },
    { id: 'google-fit', name: 'Google Fit', icon: 'google-fit', platform: 'all', color: '#4285F4' },
  ];

  // Fetch health data from Apple Health
  const fetchHealthData = useCallback(async (showLoading = true) => {
    if (Platform.OS !== 'ios') {
      Alert.alert(
        'Not Available',
        'Apple Health is only available on iOS devices.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (showLoading) setIsLoading(true);
    
    try {
      const result = await healthService.fetchAllHealthData();
      
      if (result.success && result.data) {
        setHealthData(result.data);
        setLastSyncTime(new Date());
        
        // Add apple-health to synced apps if not already
        if (!syncedApps.includes('apple-health')) {
          setSyncedApps(prev => [...prev, 'apple-health']);
        }
      } else {
        Alert.alert(
          'Sync Failed',
          result.error || 'Unable to fetch data from Apple Health. Please ensure you have granted the necessary permissions.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.log('Health data fetch error:', error);
      Alert.alert(
        'Error',
        'An error occurred while fetching health data.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [syncedApps]);

  // Handle pull to refresh
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    if (syncedApps.includes('apple-health')) {
      fetchHealthData(false);
    } else {
      setIsRefreshing(false);
    }
  }, [syncedApps, fetchHealthData]);

  const handleSync = async (appId: string) => {
    if (appId === 'apple-health') {
      if (syncedApps.includes(appId)) {
        // Disconnect
        setSyncedApps(syncedApps.filter(id => id !== appId));
        setHealthData(null);
        setLastSyncTime(null);
      } else {
        // Connect and fetch data
        setShowSyncModal(false);
        await fetchHealthData();
      }
    } else {
      // For other apps, just toggle the state (placeholder)
      if (syncedApps.includes(appId)) {
        setSyncedApps(syncedApps.filter(id => id !== appId));
      } else {
        setSyncedApps([...syncedApps, appId]);
        Alert.alert(
          'Coming Soon',
          `${appId === 'samsung-health' ? 'Samsung Health' : 'Google Fit'} integration will be available in a future update.`,
          [{ text: 'OK' }]
        );
      }
    }
  };

  // Format last sync time
  const getLastSyncText = () => {
    if (!lastSyncTime) return 'Connect to import your health data';
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastSyncTime.getTime()) / 1000 / 60);
    
    if (diff < 1) return 'Synced just now';
    if (diff < 60) return `Synced ${diff} min ago`;
    return `Synced at ${lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#ffcf98', '#FF6B3D', '#FF5252', '#FF7B9C', '#C084FC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Performance Overview</Text>
          <TouchableOpacity style={styles.syncButton} onPress={() => setShowSyncModal(true)}>
            <Icon name="sync" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="#FF6B3D"
            colors={['#FF6B3D', '#FF5252', '#C084FC']}
          />
        }
      >
        {/* Loading Overlay */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingCard}>
              <ActivityIndicator size="large" color="#FF6B3D" />
              <Text style={styles.loadingText}>Syncing with Apple Health...</Text>
            </View>
          </View>
        )}

        {/* Sync Status Card */}
        <TouchableOpacity style={[styles.syncCard, syncedApps.includes('apple-health') && styles.syncCardActive]} onPress={() => setShowSyncModal(true)}>
          <View style={styles.syncCardLeft}>
            <View style={[styles.syncIconContainer, syncedApps.includes('apple-health') && styles.syncIconContainerActive]}>
              <Icon name={syncedApps.includes('apple-health') ? 'check-circle' : 'link-variant'} size={20} color={syncedApps.includes('apple-health') ? '#10B981' : '#3B82F6'} />
            </View>
            <View>
              <Text style={styles.syncCardTitle}>
                {syncedApps.includes('apple-health') ? 'Apple Health Connected' : 'Sync with Health Apps'}
              </Text>
              <Text style={styles.syncCardSubtitle}>{getLastSyncText()}</Text>
            </View>
          </View>
          {syncedApps.includes('apple-health') ? (
            <TouchableOpacity style={styles.refreshButton} onPress={() => fetchHealthData()}>
              <Icon name="refresh" size={18} color="#10B981" />
            </TouchableOpacity>
          ) : (
            <Icon name="chevron-right" size={22} color="#9CA3AF" />
          )}
        </TouchableOpacity>

        {/* Performance Cards */}
        <View style={styles.cardsGrid}>
          {performanceData.map((item) => (
            <View key={item.id} style={styles.perfCard}>
              <View style={styles.perfCardHeader}>
                <View style={[styles.perfIconContainer, { backgroundColor: item.bgColor }]}>
                  <Icon name={item.icon} size={22} color={item.color} />
                </View>
                <Text style={styles.perfLabel}>{item.label}</Text>
              </View>
              
              <View style={styles.perfCardBody}>
                <Text style={styles.perfValue}>{item.value}</Text>
                {item.target !== '—' && (
                  <Text style={styles.perfTarget}>/ {item.target}</Text>
                )}
              </View>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${Math.min(item.progress, 100)}%`, backgroundColor: item.color }
                    ]} 
                  />
                </View>
                <Text style={[styles.progressText, { color: item.color }]}>{item.progress}%</Text>
              </View>

              <Text style={[styles.perfDelta, { color: item.color }]}>{item.delta}</Text>
            </View>
          ))}
        </View>

        {/* Summary Card */}
        <LinearGradient
          colors={['#7C5CFF', '#F92F60']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.summaryCard}
        >
          <View style={styles.summaryHeader}>
            <Icon name="chart-line" size={24} color="#FFFFFF" />
            <Text style={styles.summaryTitle}>Weekly Summary</Text>
          </View>
          <Text style={styles.summaryText}>
            Great progress! You're on track to meet 6 out of 8 goals this week. Keep up the momentum!
          </Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryStatValue}>86%</Text>
              <Text style={styles.summaryStatLabel}>Goal Completion</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryStat}>
              <Text style={styles.summaryStatValue}>+12%</Text>
              <Text style={styles.summaryStatLabel}>vs Last Week</Text>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>

      {/* Sync Modal */}
      <Modal
        visible={showSyncModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSyncModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setShowSyncModal(false)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sync Health Apps</Text>
              <TouchableOpacity onPress={() => setShowSyncModal(false)}>
                <Icon name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalDescription}>
              Connect your health apps to automatically import your activity data, steps, and health metrics.
            </Text>

            <View style={styles.appsList}>
              {healthApps.map((app) => {
                const isSynced = syncedApps.includes(app.id);
                const isAvailable = app.platform === 'all' || 
                  (app.platform === 'ios' && Platform.OS === 'ios') ||
                  (app.platform === 'android' && Platform.OS === 'android');
                
                return (
                  <TouchableOpacity 
                    key={app.id} 
                    style={[styles.appItem, isSynced && styles.appItemSynced]}
                    onPress={() => isAvailable && handleSync(app.id)}
                    disabled={!isAvailable}
                  >
                    <View style={[styles.appIconContainer, { backgroundColor: `${app.color}15` }]}>
                      <Icon name={app.icon} size={24} color={app.color} />
                    </View>
                    <View style={styles.appInfo}>
                      <Text style={[styles.appName, !isAvailable && styles.appNameDisabled]}>
                        {app.name}
                      </Text>
                      <Text style={styles.appStatus}>
                        {!isAvailable 
                          ? `Only available on ${app.platform === 'ios' ? 'iOS' : 'Android'}`
                          : isSynced 
                            ? 'Connected' 
                            : 'Tap to connect'}
                      </Text>
                    </View>
                    {isAvailable && (
                      <View style={[styles.syncToggle, isSynced && styles.syncToggleActive]}>
                        <Icon 
                          name={isSynced ? 'check' : 'plus'} 
                          size={18} 
                          color={isSynced ? '#FFFFFF' : '#6B7280'} 
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.modalFooter}>
              <Text style={styles.footerNote}>
                <Icon name="shield-check" size={14} color="#6B7280" /> Your data is encrypted and secure
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FBFF' },
  
  // Header
  header: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 16 : 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  syncButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollContent: { padding: 16, paddingBottom: 40 },

  // Sync Card
  syncCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  syncCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  syncIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncIconContainerActive: {
    backgroundColor: '#ECFDF5',
  },
  syncCardActive: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  syncCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  syncCardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },

  // Cards Grid
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  perfCard: {
    width: '47.5%',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  perfCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  perfIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  perfLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  perfCardBody: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  perfValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  perfTarget: {
    fontSize: 13,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 999,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
  },
  perfDelta: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Summary Card
  summaryCard: {
    borderRadius: 18,
    padding: 18,
    marginTop: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  summaryText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 14,
  },
  summaryStat: {
    flex: 1,
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  summaryStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  modalDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 20,
  },
  appsList: {
    gap: 12,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  appItemSynced: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  appIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  appNameDisabled: {
    color: '#9CA3AF',
  },
  appStatus: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  syncToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncToggleActive: {
    backgroundColor: '#10B981',
  },
  modalFooter: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerNote: {
    fontSize: 13,
    color: '#6B7280',
  },
});

export default PerformanceOverviewScreen;
