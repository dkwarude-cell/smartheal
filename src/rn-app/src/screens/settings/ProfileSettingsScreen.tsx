import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const ProfileSettingsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile Settings</Text>
        <Text style={styles.subtitle}>Manage your profile information</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { padding: spacing.lg },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.md },
  subtitle: { fontSize: 16, color: colors.text.secondary },
});

export default ProfileSettingsScreen;
