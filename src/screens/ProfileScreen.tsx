import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  const { user, signOut } = useAuth();

  const menuItems = [
    { icon: 'account-edit', title: 'Edit Profile', subtitle: 'Update your information' },
    { icon: 'bell', title: 'Notifications', subtitle: 'Manage notifications' },
    { icon: 'cog', title: 'Settings', subtitle: 'App preferences' },
    { icon: 'help-circle', title: 'Help & Support', subtitle: 'Get assistance' },
    { icon: 'information', title: 'About', subtitle: 'Version 1.0.0' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#1A1A1A']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              {user?.photoURL ? (
                <Image source={{ uri: user.photoURL }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Icon name="account" size={48} color="#FFFFFF" />
                </View>
              )}
            </View>
            <Text style={styles.name}>{user?.displayName || 'User'}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            
            {/* Stats */}
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Sessions</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>24h</Text>
                <Text style={styles.statLabel}>Total Time</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>7</Text>
                <Text style={styles.statLabel}>Streak</Text>
              </View>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <View style={styles.menuIcon}>
                  <Icon name={item.icon} size={24} color="#FF0000" />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Icon name="chevron-right" size={24} color="#666666" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <View style={styles.logoutContent}>
              <Icon name="logout" size={20} color="#FF3B30" />
              <Text style={styles.logoutText}>Logout</Text>
            </View>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Made by Runverve</Text>
            <Text style={styles.footerCopyright}>© 2025 SmartHeal. All rights reserved.</Text>
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
  profileHeader: { alignItems: 'center', marginBottom: 32 },
  avatarContainer: { marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  email: { fontSize: 16, color: '#B0B0B0', marginBottom: 24 },
  stats: { flexDirection: 'row', backgroundColor: '#2A2A2A', borderRadius: 12, padding: 16, width: '100%' },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#B0B0B0' },
  statDivider: { width: 1, backgroundColor: '#333333' },
  menuSection: { marginBottom: 24 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,0,0,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  menuText: { flex: 1 },
  menuTitle: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', marginBottom: 4 },
  menuSubtitle: { fontSize: 14, color: '#B0B0B0' },
  logoutButton: { backgroundColor: '#2A2A2A', borderRadius: 12, padding: 16, marginBottom: 24 },
  logoutContent: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  logoutText: { fontSize: 16, fontWeight: '600', color: '#FF3B30', marginLeft: 8 },
  footer: { alignItems: 'center', paddingTop: 20, paddingBottom: 20 },
  footerText: { fontSize: 14, color: '#666666', marginBottom: 4 },
  footerCopyright: { fontSize: 12, color: '#444444' },
});

export default ProfileScreen;
