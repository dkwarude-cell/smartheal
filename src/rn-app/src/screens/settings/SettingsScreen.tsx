import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const menuItems = [
    { title: 'Profile Settings', icon: 'person', screen: 'ProfileSettings' },
    { title: 'Therapy Settings', icon: 'pulse', screen: 'TherapySettings' },
    { title: 'Notifications', icon: 'notifications', screen: 'Notifications' },
    { title: 'Bluetooth Settings', icon: 'bluetooth', screen: 'BluetoothSettings' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Settings</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen as never)}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon as any} size={24} color={colors.text.secondary} />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.text.tertiary} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={logout}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="log-out" size={24} color={colors.error} />
            <Text style={[styles.menuItemText, { color: colors.error }]}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { padding: spacing.lg },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.xl },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.background.secondary, padding: spacing.md, borderRadius: 12, marginBottom: spacing.sm },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  menuItemText: { fontSize: 16, color: colors.text.primary },
  logoutButton: { marginTop: spacing.xl },
});

export default SettingsScreen;
