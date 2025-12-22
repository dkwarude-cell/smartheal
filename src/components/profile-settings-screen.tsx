import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProfileSettingsScreenProps {
  user: any;
  onBack: () => void;
  onUpdate?: (userData: any) => void;
}

export function ProfileSettingsScreen({ user, onBack, onUpdate }: ProfileSettingsScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    age: user?.age || '',
    weight: user?.weight || '',
    height: user?.height || '',
    gender: user?.gender || '',
    bloodType: user?.bloodType || '',
    emergencyContact: user?.emergencyContact || '',
    emergencyPhone: user?.emergencyPhone || '',
    medicalNotes: user?.medicalNotes || ''
  });

  const [medicalConditions, setMedicalConditions] = useState<string[]>(
    user?.medicalConditions || ['Lower Back Pain', 'Muscle Tension']
  );
  const [newCondition, setNewCondition] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (onUpdate) {
      onUpdate({ ...formData, medicalConditions });
    }

    Alert.alert('Success', 'Profile updated successfully');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      age: user?.age || '',
      weight: user?.weight || '',
      height: user?.height || '',
      gender: user?.gender || '',
      bloodType: user?.bloodType || '',
      emergencyContact: user?.emergencyContact || '',
      emergencyPhone: user?.emergencyPhone || '',
      medicalNotes: user?.medicalNotes || ''
    });
    setIsEditing(false);
  };

  const addMedicalCondition = () => {
    if (newCondition.trim()) {
      setMedicalConditions(prev => [...prev, newCondition.trim()]);
      setNewCondition('');
    }
  };

  const removeMedicalCondition = (index: number) => {
    setMedicalConditions(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Icon name="arrow-left" size={22} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Settings</Text>
        </View>

        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
            <Icon name="pencil" size={18} color="#3B82F6" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Icon name="close" size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Icon name="content-save" size={18} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Profile Picture */}
        <View style={styles.card}>
          <View style={styles.profilePictureSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Icon name="account" size={48} color="#EF4444" />
              </View>
              {isEditing && (
                <TouchableOpacity style={styles.cameraButton}>
                  <Icon name="camera" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.userName}>{formData.name || 'User'}</Text>
            <Text style={styles.userEmail}>{formData.email}</Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="account" size={20} color="#EF4444" />
            <Text style={styles.cardTitle}>Personal Information</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              editable={isEditing}
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              editable={isEditing}
              placeholder="Enter your email"
              keyboardType="email-address"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              editable={isEditing}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.age}
                onChangeText={(value) => handleInputChange('age', value)}
                editable={isEditing}
                placeholder="Age"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={[styles.formGroup, { flex: 1, marginLeft: 12 }]}>
              <Text style={styles.label}>Gender</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.gender}
                onChangeText={(value) => handleInputChange('gender', value)}
                editable={isEditing}
                placeholder="Gender"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>

        {/* Health Information */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="heart" size={20} color="#EF4444" />
            <Text style={styles.cardTitle}>Health Information</Text>
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.height}
                onChangeText={(value) => handleInputChange('height', value)}
                editable={isEditing}
                placeholder="175"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={[styles.formGroup, { flex: 1, marginLeft: 12 }]}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.weight}
                onChangeText={(value) => handleInputChange('weight', value)}
                editable={isEditing}
                placeholder="70"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Blood Type</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.bloodType}
              onChangeText={(value) => handleInputChange('bloodType', value)}
              editable={isEditing}
              placeholder="O+"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Medical Conditions */}
          <View style={styles.formGroup}>
            <View style={styles.labelRow}>
              <Icon name="clipboard-pulse" size={16} color="#6B7280" />
              <Text style={styles.label}>Medical Conditions</Text>
            </View>
            
            <View style={styles.badgesContainer}>
              {medicalConditions.map((condition, index) => (
                <View key={index} style={styles.badge}>
                  <Text style={styles.badgeText}>{condition}</Text>
                  {isEditing && (
                    <TouchableOpacity onPress={() => removeMedicalCondition(index)}>
                      <Icon name="close" size={14} color="#EF4444" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>

            {isEditing && (
              <View style={styles.addConditionRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={newCondition}
                  onChangeText={setNewCondition}
                  placeholder="Add medical condition"
                  placeholderTextColor="#9CA3AF"
                  onSubmitEditing={addMedicalCondition}
                />
                <TouchableOpacity onPress={addMedicalCondition} style={styles.addButton}>
                  <Icon name="plus" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Medical Notes</Text>
            <TextInput
              style={[styles.textArea, !isEditing && styles.inputDisabled]}
              value={formData.medicalNotes}
              onChangeText={(value) => handleInputChange('medicalNotes', value)}
              editable={isEditing}
              placeholder="Any important medical information or allergies..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="alert-circle" size={20} color="#EF4444" />
            <Text style={styles.cardTitle}>Emergency Contact</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Contact Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.emergencyContact}
              onChangeText={(value) => handleInputChange('emergencyContact', value)}
              editable={isEditing}
              placeholder="Emergency contact name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Contact Phone</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.emergencyPhone}
              onChangeText={(value) => handleInputChange('emergencyPhone', value)}
              editable={isEditing}
              placeholder="Emergency contact phone"
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Account Stats */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Statistics</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#EF4444' }]}>42</Text>
              <Text style={styles.statLabel}>Total Sessions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#3B82F6' }]}>8</Text>
              <Text style={styles.statLabel}>Week Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#10B981' }]}>87%</Text>
              <Text style={styles.statLabel}>Recovery Rate</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#8B5CF6' }]}>24h</Text>
              <Text style={styles.statLabel}>Total Time</Text>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        {isEditing && (
          <View style={[styles.card, styles.dangerCard]}>
            <Text style={styles.dangerTitle}>Danger Zone</Text>
            <TouchableOpacity style={styles.deleteButton}>
              <Icon name="delete" size={18} color="#EF4444" />
              <Text style={styles.deleteButtonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editButtonText: {
    fontSize: 15,
    color: '#3B82F6',
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cancelButton: {
    padding: 8,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EF4444',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  profilePictureSection: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  inputDisabled: {
    backgroundColor: '#F9FAFB',
    color: '#6B7280',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    minHeight: 100,
  },
  row: {
    flexDirection: 'row',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 13,
    color: '#374151',
  },
  addConditionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  statItem: {
    width: '47%',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  dangerCard: {
    borderColor: '#FECACA',
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 16,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 10,
    paddingVertical: 14,
  },
  deleteButtonText: {
    fontSize: 15,
    color: '#EF4444',
    fontWeight: '500',
  },
});
