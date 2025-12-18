import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const AIScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[colors.background.primary, colors.background.secondary]} style={styles.gradient}>
        <View style={styles.content}>
          <Ionicons name="camera" size={64} color={colors.primary} style={{ marginBottom: spacing.xl }} />
          <Text style={styles.title}>AI Assistant</Text>
          <Text style={styles.subtitle}>Get AI-powered therapy placement guidance using your camera</Text>
          <Button title="Open Camera" onPress={() => {}} gradient fullWidth icon={<Ionicons name="camera" size={20} color={colors.text.primary} />} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  gradient: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.md },
  subtitle: { fontSize: 16, color: colors.text.secondary, textAlign: 'center', marginBottom: spacing.xxl },
});

export default AIScreen;
