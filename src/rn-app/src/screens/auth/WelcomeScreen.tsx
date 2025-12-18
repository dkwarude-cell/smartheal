import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation.types';
import { Button } from '../../components/ui/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to SmartHeal</Text>
        <Text style={styles.subtitle}>Let's get you set up!</Text>
        <Button
          title="Continue"
          onPress={() => navigation.navigate('Signup')}
          gradient
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { flex: 1, justifyContent: 'center', padding: spacing.lg },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.md },
  subtitle: { fontSize: 18, color: colors.text.secondary, marginBottom: spacing.xl },
});

export default WelcomeScreen;
