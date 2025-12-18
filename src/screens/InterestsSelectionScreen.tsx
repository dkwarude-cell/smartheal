import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'Interests'>;

const featureGroups = [
  {
    header: 'Features & Tools',
    items: [
      {
        id: 'recovery-therapy',
        title: 'Recovery Therapy',
        description: 'Post-workout recovery and injury prevention',
        icon: 'heart',
      },
      {
        id: 'performance-enhancement',
        title: 'Performance Enhancement',
        description: 'Optimize training and competition results',
        icon: 'trending-up',
      },
      {
        id: 'training-plans',
        title: 'Training Plans',
        description: 'Structured workout programs',
        icon: 'target',
      },
      {
        id: 'performance-analytics',
        title: 'Performance Analytics',
        description: 'Track metrics and progress',
        icon: 'chart-line',
      },
    ],
  },
  {
    header: 'Primary Focus',
    items: [
      {
        id: 'recovery-focused',
        title: 'Recovery Focused',
        description: 'Prioritize muscle recovery and injury prevention',
        icon: 'heart-plus-outline',
      },
      {
        id: 'performance-focused',
        title: 'Performance Focused',
        description: 'Maximize athletic performance and results',
        icon: 'run-fast',
      },
      {
        id: 'balanced-approach',
        title: 'Balanced Approach',
        description: 'Equal focus on recovery and performance',
        icon: 'scale-balance',
      },
    ],
  },
];

const InterestsSelectionScreen = ({ navigation }: Props) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const isCompleteEnabled = useMemo(() => selected.length > 0, [selected]);
  const hasFeatureSelection = useMemo(() => {
    const featureIds = featureGroups[0].items.map((i) => i.id);
    return selected.some((id) => featureIds.includes(id));
  }, [selected]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#FFF5EF', '#FFFFFF']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.heroIconWrapper}>
            <LinearGradient colors={['#FF5F6D', '#FF7E33']} style={styles.heroIconBg}>
              <Icon name="heart-outline" size={42} color="#FFFFFF" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>What features interest you?</Text>
          <Text style={styles.subtitle}>Select all that apply to customize your experience</Text>

          {featureGroups.map((group) => (
            <View key={group.header} style={styles.section}>
              <Text style={styles.sectionHeader}>{group.header}</Text>
              {group.items.map((item) => {
                const checked = selected.includes(item.id);
                const isPrimaryFocus = group.header === 'Primary Focus';
                if (isPrimaryFocus && !hasFeatureSelection) {
                  return null;
                }
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.card, checked && styles.cardActive]}
                    activeOpacity={0.9}
                    onPress={() => toggleItem(item.id)}
                  >
                    <View style={styles.cardLeft}>
                      <LinearGradient colors={['#FF5F6D', '#FF7E33']} style={styles.cardIconBg}>
                        <Icon name={item.icon} size={22} color="#FFFFFF" />
                      </LinearGradient>
                      <View style={styles.cardTextBlock}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardDescription}>{item.description}</Text>
                      </View>
                    </View>
                    <View style={[styles.checkOuter, checked && styles.checkOuterActive]}>
                      {checked ? <Icon name="check" size={16} color="#FFFFFF" /> : null}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          <TouchableOpacity
            activeOpacity={0.9}
            disabled={!isCompleteEnabled}
            onPress={() => navigation.navigate('BasicInfo')}
            style={[styles.primaryButton, !isCompleteEnabled && { opacity: 0.8 }]}
          >
            <LinearGradient colors={['#F43B47', '#FF7300']} style={styles.primaryGradient}>
              <Text style={styles.primaryText}>Complete Setup</Text>
              <Icon name="chevron-right" size={18} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 28 },
  heroIconWrapper: { alignItems: 'center', marginBottom: 12 },
  heroIconBg: {
    width: 86,
    height: 86,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  title: { fontSize: 17, fontWeight: '700', color: '#0F172A', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 15, color: '#4B5563', textAlign: 'center', marginBottom: 18 },
  section: { marginBottom: 16 },
  sectionHeader: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 10 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EEF0F5',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  cardActive: { borderColor: '#F52E32', shadowOpacity: 0.12, shadowRadius: 12 },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  cardIconBg: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTextBlock: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  cardDescription: { fontSize: 13, color: '#4B5563', lineHeight: 18 },
  checkOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD2D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOuterActive: {
    backgroundColor: '#F52E32',
    borderColor: '#F52E32',
    shadowColor: '#F52E32',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  primaryButton: { marginTop: 6, borderRadius: 16, overflow: 'hidden' },
  primaryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
});

export default InterestsSelectionScreen;
