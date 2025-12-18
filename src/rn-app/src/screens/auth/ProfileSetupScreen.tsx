import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../types/navigation.types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type ProfileSetupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ProfileSetup'>;
type ProfileSetupScreenRouteProp = RouteProp<AuthStackParamList, 'ProfileSetup'>;

interface ProfileSetupScreenProps {
  navigation: ProfileSetupScreenNavigationProp;
  route: ProfileSetupScreenRouteProp;
}

const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const handleContinue = () => {
    navigation.navigate('DeviceConnection');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Input label="Age" value={age} onChangeText={setAge} placeholder="Enter your age" keyboardType="number-pad" />
        <Input label="Weight (kg)" value={weight} onChangeText={setWeight} placeholder="Enter your weight" keyboardType="decimal-pad" />
        <Input label="Height (cm)" value={height} onChangeText={setHeight} placeholder="Enter your height" keyboardType="number-pad" />
        <Button title="Continue" onPress={handleContinue} gradient fullWidth />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  content: { padding: spacing.lg },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.xl },
});

export default ProfileSetupScreen;
