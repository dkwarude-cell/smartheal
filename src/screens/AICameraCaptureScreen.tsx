import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { Camera, CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface AICameraCaptureScreenProps {
  onClose?: () => void;
}

const AICameraCaptureScreen: React.FC<AICameraCaptureScreenProps> = ({ onClose }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const capturePhoto = async () => {
    if (cameraRef.current && !isCapturing) {
      setIsCapturing(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.7,
        });
        if (photo) {
          setCapturedImage(photo.uri);
          // Store the base64 for later use
          (global as any).capturedImageBase64 = photo.base64;
        }
      } catch (error) {
        console.error('Error capturing photo:', error);
        Alert.alert('Error', 'Failed to capture photo. Please try again.');
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    (global as any).capturedImageBase64 = null;
  };

  const handleProceed = () => {
    // Navigate directly to analysis screen without additional info modal
    navigation.navigate('AIAnalysisResults' as any, {
      imageUri: capturedImage,
      imageBase64: (global as any).capturedImageBase64,
      additionalInfo: '', // Empty initially, user can ask questions in results screen
    });
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#EF4444" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <LinearGradient
          colors={['#1a1a2e', '#16213e']}
          style={styles.permissionGradient}
        >
          <View style={styles.permissionContent}>
            <View style={styles.permissionIconContainer}>
              <Icon name="camera-off" size={64} color="#EF4444" />
            </View>
            <Text style={styles.permissionTitle}>Camera Access Required</Text>
            <Text style={styles.permissionText}>
              We need camera access to capture photos for AI analysis and therapy recommendations.
            </Text>
            <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
              <LinearGradient
                colors={['#EF4444', '#DC2626']}
                style={styles.permissionButtonGradient}
              >
                <Icon name="camera" size={20} color="#FFFFFF" />
                <Text style={styles.permissionButtonText}>Enable Camera</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={handleClose}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {!capturedImage ? (
        // Camera View
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
        >
          {/* Header */}
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.header}
          >
            <TouchableOpacity style={styles.headerButton} onPress={handleClose}>
              <Icon name="close" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <View style={styles.headerIconContainer}>
                <Icon name="camera" size={18} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.headerTitle}>AI Therapy Analysis</Text>
                <Text style={styles.headerSubtitle}>Capture the affected area</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.headerButton} onPress={toggleCameraFacing}>
              <Icon name="camera-flip" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          </LinearGradient>

          {/* Camera Guides */}
          <View style={styles.guideContainer}>
            <View style={styles.guideFrame}>
              <View style={[styles.guideCorner, styles.topLeft]} />
              <View style={[styles.guideCorner, styles.topRight]} />
              <View style={[styles.guideCorner, styles.bottomLeft]} />
              <View style={[styles.guideCorner, styles.bottomRight]} />
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.instructionContainer}>
            <View style={styles.instructionCard}>
              <Text style={styles.instructionText}>
                Center the affected area within the frame for best results
              </Text>
            </View>
          </View>

          {/* Bottom Controls */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.bottomControls}
          >
            <TouchableOpacity style={styles.sideButton} onPress={toggleCameraFacing}>
              <Icon name="camera-flip-outline" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.captureButton}
              onPress={capturePhoto}
              disabled={isCapturing}
            >
              <View style={styles.captureButtonOuter}>
                <View style={styles.captureButtonInner}>
                  {isCapturing ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Icon name="camera" size={32} color="#FFFFFF" />
                  )}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sideButton} onPress={handleClose}>
              <Icon name="close-circle-outline" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </LinearGradient>
        </CameraView>
      ) : (
        // Preview View
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
          
          {/* Header */}
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.header}
          >
            <TouchableOpacity style={styles.headerButton} onPress={retakePhoto}>
              <Icon name="arrow-left" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Preview</Text>
              <Text style={styles.headerSubtitle}>Review your photo</Text>
            </View>
            <View style={styles.headerButton} />
          </LinearGradient>

          {/* Preview Actions */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={styles.previewActions}
          >
            <Text style={styles.previewHint}>
              Make sure the affected area is clearly visible
            </Text>
            
            <View style={styles.previewButtons}>
              <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
                <Icon name="refresh" size={22} color="#FFFFFF" />
                <Text style={styles.retakeButtonText}>Retake</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.analyzeButton} onPress={handleProceed}>
                <LinearGradient
                  colors={['#EF4444', '#DC2626']}
                  style={styles.analyzeButtonGradient}
                >
                  <Icon name="brain" size={22} color="#FFFFFF" />
                  <Text style={styles.analyzeButtonText}>Analyze with AI</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  permissionContainer: {
    flex: 1,
  },
  permissionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContent: {
    alignItems: 'center',
    padding: 32,
  },
  permissionIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  permissionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 10,
  },
  permissionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  backButton: {
    padding: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  camera: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 16 : 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  guideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideFrame: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_WIDTH * 0.75,
    position: 'relative',
  },
  guideCorner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#EF4444',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  instructionContainer: {
    position: 'absolute',
    bottom: 180,
    left: 20,
    right: 20,
  },
  instructionCard: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 40,
    paddingHorizontal: 40,
    paddingBottom: Platform.OS === 'ios' ? 50 : 40,
  },
  sideButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  previewActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
  },
  previewHint: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  previewButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  retakeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
  },
  retakeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  analyzeButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  analyzeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  analyzeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default AICameraCaptureScreen;
