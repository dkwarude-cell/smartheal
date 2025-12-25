import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileType'>;

const profileCards = [
  {
    type: 'athlete' as const,
    title: 'Runner / Athlete',
    description: 'Train smarter, recover faster, perform better',
    icon: 'trophy-outline',
    bullets: ['Performance tracking', 'Training plans', 'Recovery optimization'],
  },
  {
    type: 'coach' as const,
    title: 'Coach / Trainer',
    description: 'Manage athletes and optimize their performance',
    icon: 'account-tie',
    bullets: ['Client management', 'Progress monitoring', 'Treatment planning'],
  },
  {
    type: 'health' as const,
    title: 'Health & Wellness',
    description: 'Manage pain, improve mobility, feel better',
    icon: 'heart-outline',
    bullets: ['Pain management', 'Wellness tracking', 'Self-care guidance'],
  },
];

const ProfileTypeSelectionScreen = ({ navigation }: Props) => {
  const { updateProfile } = useAuth();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#FFF5EF', '#FFFFFF']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.heroIconWrapper}>
            <LinearGradient colors={['#FF5F6D', '#FF7E33']} style={styles.heroIconBg}>
              <Icon name="heart-outline" size={46} color="#FFFFFF" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Tell us about yourself</Text>
          <Text style={styles.subtitle}>We’ll customize your SmartHeal experience</Text>

          {profileCards.map((card) => (
            <TouchableOpacity
              key={card.type}
              style={styles.card}
              activeOpacity={0.9}
              onPress={async () => {
                await updateProfile({ profileType: card.type });
                navigation.navigate('ProfileDetails', { profileType: card.type });
              }}
            >
              <LinearGradient colors={['#FF5F6D', '#FF7E33']} style={styles.cardIconBg}>
                <Icon name={card.icon} size={28} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardDescription}>{card.description}</Text>
                <View style={styles.bulletList}>
                  {card.bullets.map((item) => (
                    <View style={styles.bulletRow} key={item}>
                      <Icon name="chevron-right" size={16} color="#F52E32" />
                      <Text style={styles.bulletText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <Text style={styles.footerNote}>You can change this later in settings</Text>
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
    paddingBottom: 28,
  },
  heroIconWrapper: { alignItems: 'center', marginBottom: 12 },
  heroIconBg: {
    width: 92,
    height: 92,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  title: { fontSize: 18, fontWeight: '700', color: '#0F172A', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 15, color: '#4B5563', textAlign: 'center', marginBottom: 18 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    gap: 14,
    borderWidth: 1,
    borderColor: '#EEF0F5',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardIconBg: {
    width: 54,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: { gap: 6 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  cardDescription: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  bulletList: { gap: 6, marginTop: 6 },
  bulletRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bulletText: { color: '#0F172A', fontSize: 14 },
  footerNote: { textAlign: 'center', color: '#6B7280', marginTop: 8 },
});

export default ProfileTypeSelectionScreen;
