import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation.types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

interface SignupScreenProps {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = () => {
    navigation.navigate('OTP', { phone: '+1234567890', email });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Input label="Full Name" value={name} onChangeText={setName} placeholder="Enter your name" />
        <Input label="Email" value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" />
        <Input label="Password" value={password} onChangeText={setPassword} placeholder="Create a password" secureTextEntry />
        <Button title="Sign Up" onPress={handleSignup} gradient fullWidth />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { padding: spacing.lg },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.xl },
});

export default SignupScreen;
