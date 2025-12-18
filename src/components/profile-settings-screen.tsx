import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Ruler,
  Weight,
  Heart,
  Activity,
  AlertCircle,
  Edit2,
  Camera,
  Save,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

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
    // Validate required fields
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Call update callback
    if (onUpdate) {
      onUpdate({ ...formData, medicalConditions });
    }

    toast.success('Profile updated successfully');
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">Profile Settings</h1>
          </div>

          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="text-gray-600"
              >
                <X className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* Profile Picture */}
        <Card className="p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-red-600" />
              </div>
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-red-500 hover:bg-red-600"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            <h2 className="mt-4 font-semibold text-gray-900">{formData.name || 'User'}</h2>
            <p className="text-sm text-gray-500">{formData.email}</p>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-4">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <User className="w-5 h-5 text-red-500" />
            <span>Personal Information</span>
          </h2>

          <div className="space-y-4">
            <div>
              <Label>Full Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your full name"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your email"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your phone number"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Age</Label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Age"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Gender</Label>
                <Input
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Gender"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Health Information */}
        <Card className="p-4">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Health Information</span>
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center space-x-2">
                  <Ruler className="w-4 h-4" />
                  <span>Height (cm)</span>
                </Label>
                <Input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  disabled={!isEditing}
                  placeholder="175"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="flex items-center space-x-2">
                  <Weight className="w-4 h-4" />
                  <span>Weight (kg)</span>
                </Label>
                <Input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  disabled={!isEditing}
                  placeholder="70"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Blood Type</Label>
              <Input
                value={formData.bloodType}
                onChange={(e) => handleInputChange('bloodType', e.target.value)}
                disabled={!isEditing}
                placeholder="O+"
                className="mt-1"
              />
            </div>

            {/* Medical Conditions */}
            <div>
              <Label className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4" />
                <span>Medical Conditions</span>
              </Label>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {medicalConditions.map((condition, index) => (
                  <Badge key={index} variant="secondary" className="py-1 px-3">
                    {condition}
                    {isEditing && (
                      <button
                        onClick={() => removeMedicalCondition(index)}
                        className="ml-2 text-red-600 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>

              {isEditing && (
                <div className="flex items-center space-x-2">
                  <Input
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    placeholder="Add medical condition"
                    onKeyPress={(e) => e.key === 'Enter' && addMedicalCondition()}
                  />
                  <Button
                    size="sm"
                    onClick={addMedicalCondition}
                    variant="outline"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            <div>
              <Label>Medical Notes</Label>
              <Textarea
                value={formData.medicalNotes}
                onChange={(e) => handleInputChange('medicalNotes', e.target.value)}
                disabled={!isEditing}
                placeholder="Any important medical information or allergies..."
                className="mt-1 min-h-[100px]"
              />
            </div>
          </div>
        </Card>

        {/* Emergency Contact */}
        <Card className="p-4">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span>Emergency Contact</span>
          </h2>

          <div className="space-y-4">
            <div>
              <Label>Contact Name</Label>
              <Input
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                disabled={!isEditing}
                placeholder="Emergency contact name"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Contact Phone</Label>
              <Input
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                disabled={!isEditing}
                placeholder="Emergency contact phone"
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Account Stats */}
        <Card className="p-4">
          <h2 className="font-semibold text-gray-900 mb-4">Account Statistics</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-semibold text-red-600">42</p>
              <p className="text-xs text-gray-600">Total Sessions</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-semibold text-blue-600">8</p>
              <p className="text-xs text-gray-600">Week Streak</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-semibold text-green-600">87%</p>
              <p className="text-xs text-gray-600">Recovery Rate</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-semibold text-purple-600">24h</p>
              <p className="text-xs text-gray-600">Total Time</p>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        {isEditing && (
          <Card className="p-4 border-red-200">
            <h2 className="font-semibold text-red-600 mb-4">Danger Zone</h2>
            
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
