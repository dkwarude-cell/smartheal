import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../ui/button';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileDetails'>;

const experienceLevels = [
  {
    key: 'beginner',
    title: 'Beginner',
    description: 'New to running or returning after a break',
  },
  {
    key: 'intermediate',
    title: 'Intermediate',
    description: 'Regular runner, 3-5 times per week',
  },
  {
    key: 'advanced',
    title: 'Advanced',
    description: 'Experienced runner, training for competitions',
  },
  {
    key: 'professional',
    title: 'Professional',
    description: 'Elite athlete or serious competitor',
  },
];

const ProfileDetailsScreen = ({ navigation, route }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  const isContinueEnabled = useMemo(() => Boolean(selected), [selected]);

  const toggleOption = (key: string) => {
    setSelected((prev) => (prev === key ? null : key));
  };

  const handleContinue = () => {
    navigation.navigate('Interests', { profileType: route.params.profileType });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#FFF5EF', '#FFFFFF']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.heroIconWrapper}>
            <LinearGradient colors={['#FF5F6D', '#FF7E33']} style={styles.heroIconBg}>
              <Icon name="heart-outline" size={40} color="#FFFFFF" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>What's your experience level?</Text>
          <Text style={styles.subtitle}>Help us personalize your experience</Text>

          <View style={styles.cardList}>
            {experienceLevels.map((item) => {
              const checked = selected === item.key;
              return (
                <TouchableOpacity
                  key={item.key}
                  style={[styles.card, checked && styles.cardActive]}
                  activeOpacity={0.9}
                  onPress={() => toggleOption(item.key)}
                >
                  <View style={styles.cardTextBlock}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDescription}>{item.description}</Text>
                  </View>
                  <View style={[styles.radioOuter, checked && styles.radioOuterActive]}>
                    {checked ? <View style={styles.radioInner} /> : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!isContinueEnabled}
            style={[styles.primaryButton, !isContinueEnabled && { opacity: 0.6 }]}
          />
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 32,
  },
  heroIconWrapper: { alignItems: 'center', marginBottom: 12 },
  heroIconBg: {
    width: 82,
    height: 82,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  title: { fontSize: 17, fontWeight: '700', color: '#0F172A', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 15, color: '#4B5563', textAlign: 'center', marginBottom: 18 },
  cardList: { gap: 12, marginBottom: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EEF0F5',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardActive: {
    borderColor: '#F52E32',
    shadowOpacity: 0.12,
    shadowRadius: 14,
  },
  cardTextBlock: { flex: 1, paddingRight: 12 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  cardDescription: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD2D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: { borderColor: '#F52E32' },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F52E32',
  },
  primaryButton: {
    marginTop: 4,
    backgroundColor: '#F52E32',
    borderRadius: 16,
    paddingVertical: 14,
  },
});

export default ProfileDetailsScreen;
