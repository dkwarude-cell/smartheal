/**
 * Start Screen
 * SmartHeal App - Initial Welcome Screen
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation.types';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';

type StartScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Start'>;

interface StartScreenProps {
  navigation: StartScreenNavigationProp;
}

const StartScreen: React.FC<StartScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[colors.background.primary, colors.background.secondary]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brandContainer}>
            <View style={styles.logoContainer}>
              <Ionicons name="heart" size={24} color={colors.text.primary} />
            </View>
            <Text style={styles.appName}>SmartHeal</Text>
          </View>
          <Text style={styles.brandTag}>by Runverve</Text>
        </View>

        {/* Hero Content */}
        <View style={styles.content}>
          <View style={styles.heroLogo}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.heroGradient}
            >
              <Ionicons name="heart" size={48} color={colors.text.primary} />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Welcome to SmartHeal</Text>
          <Text style={styles.subtitle}>
            Professional ITT therapy device with AI-powered guidance and personalized treatment plans
          </Text>

          {/* Features */}
          <View style={styles.features}>
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="flash" size={20} color={colors.primary} />
              </View>
              <Text style={styles.featureText}>AI Guidance</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
              </View>
              <Text style={styles.featureText}>Smart Tracking</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="bluetooth" size={20} color={colors.primary} />
              </View>
              <Text style={styles.featureText}>Device Sync</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="analytics" size={20} color={colors.primary} />
              </View>
              <Text style={styles.featureText}>Progress Reports</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('Welcome')}
            gradient
            fullWidth
            size="lg"
          />
          <Button
            title="I already have an account"
            onPress={() => navigation.navigate('Login')}
            variant="ghost"
            fullWidth
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  gradient: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 32,
    height: 32,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  appName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  brandTag: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroLogo: {
    marginBottom: spacing.xl,
  },
  heroGradient: {
    width: 96,
    height: 96,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.md * typography.lineHeight.relaxed,
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.md,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
  },
  featureCard: {
    width: '45%',
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  featureIcon: {
    width: 40,
    height: 40,
    backgroundColor: `${colors.primary}20`,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  featureText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  actions: {
    gap: spacing.md,
  },
});

export default StartScreen;
