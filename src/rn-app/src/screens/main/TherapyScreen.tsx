import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../components/ui/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const TherapyScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[colors.background.primary, colors.background.secondary]} style={styles.gradient}>
        <View style={styles.content}>
          <Text style={styles.title}>Therapy Session</Text>
          <Text style={styles.subtitle}>Start a new therapy session or view active sessions</Text>
          <Button title="Start Quick Session" onPress={() => {}} gradient fullWidth style={{ marginBottom: spacing.md }} />
          <Button title="Select Body Part" onPress={() => {}} variant="outline" fullWidth />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  gradient: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', padding: spacing.lg },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.md },
  subtitle: { fontSize: 16, color: colors.text.secondary, marginBottom: spacing.xxl },
});

export default TherapyScreen;
