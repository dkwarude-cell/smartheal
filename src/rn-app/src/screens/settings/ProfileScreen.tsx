import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const ProfileScreen: React.FC = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.displayName || 'N/A'}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email || 'N/A'}</Text>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user?.phoneNumber || 'N/A'}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { padding: spacing.lg },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.xl },
  label: { fontSize: 12, color: colors.text.tertiary, marginTop: spacing.md, marginBottom: spacing.xs },
  value: { fontSize: 16, color: colors.text.primary, backgroundColor: colors.background.secondary, padding: spacing.md, borderRadius: 8 },
});

export default ProfileScreen;
