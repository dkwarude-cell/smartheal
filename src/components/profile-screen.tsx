import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Switch, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [editMode, setEditMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const userInfo = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    age: '28 years',
    joinDate: 'Member since Oct 2023',
    totalSessions: 156,
    membershipTier: 'Premium'
  };

  const deviceInfo = {
    model: 'ITT Therapeutic Device Pro',
    serialNumber: 'ITT-2023-8847',
    batteryLevel: '85%',
    lastSync: '2 min ago',
    firmwareVersion: 'v2.1.4',
    connectionStatus: 'Connected'
  };

  const therapyPreferences = [
    { label: 'Preferred Intensity', value: 'Medium', editable: true },
    { label: 'Default Duration', value: '15 minutes', editable: true },
    { label: 'Therapy Focus', value: 'Pain Relief', editable: true },
    { label: 'Auto-Start Sessions', value: 'Enabled', editable: false }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Profile Header */}
      <LinearGradient colors={['#EFF6FF', '#F5F3FF']} style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Text style={styles.cardTitle}>Profile</Text>
          <TouchableOpacity onPress={() => setEditMode(!editMode)} style={styles.editButton}>
            <Icon name="pencil" size={16} color="#3B82F6" />
            <Text style={styles.editButtonText}>{editMode ? 'Save' : 'Edit Profile'}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileContent}>
          <LinearGradient colors={['#3B82F6', '#8B5CF6']} style={styles.avatar}>
            <Icon name="account" size={32} color="#FFFFFF" />
          </LinearGradient>
          <View style={styles.profileInfo}>
            {editMode ? (
              <View style={styles.editForm}>
                <TextInput
                  style={styles.editInput}
                  defaultValue={userInfo.name}
                  placeholder="Full Name"
                  placeholderTextColor="#9CA3AF"
                />
                <TextInput
                  style={styles.editInput}
                  defaultValue={userInfo.email}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            ) : (
              <>
                <Text style={styles.userName}>{userInfo.name}</Text>
                <Text style={styles.userEmail}>{userInfo.email}</Text>
                <View style={styles.userMeta}>
                  <View style={styles.metaItem}>
                    <Icon name="calendar" size={12} color="#6B7280" />
                    <Text style={styles.metaText}>{userInfo.age}</Text>
                  </View>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.metaText}>{userInfo.joinDate}</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.premiumText}>{userInfo.membershipTier}</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </LinearGradient>

      {/* Connected Device */}
      <View style={[styles.card, styles.deviceCard]}>
        <View style={styles.deviceHeader}>
          <View style={styles.deviceTitle}>
            <Icon name="wifi" size={16} color="#10B981" />
            <Text style={styles.deviceTitleText}>Connected Device</Text>
          </View>
          <View style={styles.deviceStatus}>
            <View style={styles.statusDot} />
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{deviceInfo.connectionStatus}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.deviceContent}>
          <View style={styles.deviceLogo}>
            <Text style={styles.deviceLogoText}>ITT</Text>
          </View>
          <View style={styles.deviceInfo}>
            <Text style={styles.deviceModel}>{deviceInfo.model}</Text>
            <Text style={styles.deviceSerial}>SN: {deviceInfo.serialNumber}</Text>
            <View style={styles.deviceStats}>
              <View style={styles.deviceStat}>
                <Icon name="battery" size={12} color="#10B981" />
                <Text style={styles.deviceStatText}>{deviceInfo.batteryLevel}</Text>
              </View>
              <View style={styles.deviceStat}>
                <Icon name="clock-outline" size={12} color="#3B82F6" />
                <Text style={styles.deviceStatText}>{deviceInfo.lastSync}</Text>
              </View>
              <Text style={styles.deviceStatText}>{deviceInfo.firmwareVersion}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Therapy Preferences */}
      <View style={styles.card}>
        <View style={styles.preferencesHeader}>
          <View style={styles.preferencesTitle}>
            <Icon name="cog" size={16} color="#8B5CF6" />
            <Text style={styles.preferencesTitleText}>Therapy Preferences</Text>
          </View>
          <TouchableOpacity onPress={() => onNavigate('settings')}>
            <Text style={styles.customizeText}>Customize</Text>
          </TouchableOpacity>
        </View>
        
        {therapyPreferences.map((pref, index) => (
          <TouchableOpacity key={index} style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <View style={styles.prefDot} />
              <Text style={styles.preferenceLabel}>{pref.label}</Text>
            </View>
            <View style={styles.preferenceRight}>
              <Text style={styles.preferenceValue}>{pref.value}</Text>
              {pref.editable && <Icon name="chevron-right" size={14} color="#9CA3AF" />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Settings */}
      <View style={styles.quickSettingsRow}>
        <View style={styles.quickSettingCard}>
          <View>
            <Text style={styles.quickSettingTitle}>Notifications</Text>
            <Text style={styles.quickSettingDesc}>Push alerts</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
            thumbColor={notifications ? '#EF4444' : '#F3F4F6'}
          />
        </View>
        
        <View style={[styles.quickSettingCard, styles.dataSharingCard]}>
          <View>
            <Text style={styles.dataSharingTitle}>Data Sharing</Text>
            <Text style={styles.dataSharingDesc}>Help improve AI</Text>
          </View>
          <Switch
            value={dataSharing}
            onValueChange={setDataSharing}
            trackColor={{ false: '#BFDBFE', true: '#93C5FD' }}
            thumbColor={dataSharing ? '#3B82F6' : '#EFF6FF'}
          />
        </View>
      </View>

      {/* Account Management */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account Management</Text>
        {[
          { icon: 'cog', label: 'Privacy Settings' },
          { icon: 'shield-check', label: 'Security' },
          { icon: 'bell-outline', label: 'Notification Preferences' }
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuButton}>
            <Icon name={item.icon} size={18} color="#6B7280" />
            <Text style={styles.menuButtonText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Support & Help */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Support & Help</Text>
        {['Help Center', 'Contact Support', 'Device Manual'].map((item, index) => (
          <TouchableOpacity key={index} style={styles.helpButton}>
            <Text style={styles.helpButtonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Account Actions */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.exportButtonText}>Export Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
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
    gap: 16,
  },
  profileCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  profileInfo: {
    flex: 1,
  },
  editForm: {
    gap: 12,
  },
  editInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#111827',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  metaDot: {
    fontSize: 12,
    color: '#9CA3AF',
    marginHorizontal: 6,
  },
  premiumText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  deviceCard: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  deviceTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deviceTitleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  statusBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    color: '#047857',
    fontWeight: '500',
  },
  deviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  deviceLogo: {
    width: 48,
    height: 32,
    backgroundColor: '#111827',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceLogoText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceModel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  deviceSerial: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
    marginBottom: 8,
  },
  deviceStats: {
    flexDirection: 'row',
    gap: 12,
  },
  deviceStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deviceStatText: {
    fontSize: 12,
    color: '#6B7280',
  },
  preferencesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  preferencesTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  preferencesTitleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  customizeText: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '500',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  prefDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
  },
  preferenceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  preferenceRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  preferenceValue: {
    fontSize: 14,
    color: '#111827',
  },
  quickSettingsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quickSettingCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickSettingTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  quickSettingDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  dataSharingCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  dataSharingTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E40AF',
  },
  dataSharingDesc: {
    fontSize: 12,
    color: '#3B82F6',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    marginBottom: 10,
  },
  menuButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  helpButton: {
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  helpButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  exportButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  exportButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  signOutButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FECACA',
    alignItems: 'center',
  },
  signOutButtonText: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '500',
  },
});