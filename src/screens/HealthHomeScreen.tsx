import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HealthHomeScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>Wellness Dashboard</Text>
              <Text style={styles.subtitle}>Pain relief, mobility, and daily care</Text>
            </View>
            <View style={styles.badge}>
              <Icon name="heart-outline" size={18} color="#F52E32" />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today’s Plan</Text>
            <Text style={styles.cardBody}>This screen will be customized from your screenshots (health flow).</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Comfort Tracking</Text>
            <Text style={styles.cardBody}>Placeholders until we match your design.</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: { padding: 16, paddingTop: 56, paddingBottom: 28 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  title: { fontSize: 26, fontWeight: '800', color: '#111827' },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  badge: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#FEE2E2', alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#EEF0F5', padding: 16, marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  cardBody: { color: '#4B5563', lineHeight: 18 },
});
