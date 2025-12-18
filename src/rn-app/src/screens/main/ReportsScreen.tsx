import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, CardContent } from '../../components/ui/Card';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const ReportsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[colors.background.primary, colors.background.secondary]} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Reports & Analytics</Text>
          <Card variant="glass" style={{ marginBottom: spacing.md }}>
            <CardContent>
              <Text style={styles.cardTitle}>Weekly Summary</Text>
              <Text style={styles.cardText}>Total Sessions: 15</Text>
              <Text style={styles.cardText}>Total Duration: 4.5 hours</Text>
            </CardContent>
          </Card>
          <Card variant="glass">
            <CardContent>
              <Text style={styles.cardTitle}>Progress</Text>
              <Text style={styles.cardText}>You're doing great! Keep it up.</Text>
            </CardContent>
          </Card>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  gradient: { flex: 1 },
  content: { padding: spacing.lg },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.xl },
  cardTitle: { fontSize: 18, fontWeight: '600', color: colors.text.primary, marginBottom: spacing.sm },
  cardText: { fontSize: 14, color: colors.text.secondary },
});

export default ReportsScreen;
