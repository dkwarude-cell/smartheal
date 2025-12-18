import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'ConnectionSuccess'>;

const ConnectionSuccessScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainApp');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#1A1A1A']} style={styles.gradient}>
        <View style={styles.content}>
          <Icon name="check-circle" size={120} color="#00C6AE" />
          <Text style={styles.title}>Connected!</Text>
          <Text style={styles.subtitle}>Your device is ready to use</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF', marginTop: 30, marginBottom: 16 },
  subtitle: { fontSize: 16, color: '#B0B0B0', textAlign: 'center' },
});

export default ConnectionSuccessScreen;
