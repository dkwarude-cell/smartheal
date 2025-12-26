import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  Platform,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { geminiService, AnalysisResult } from '../services/GeminiService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type AIAnalysisResultsRouteProp = RouteProp<RootStackParamList, 'AIAnalysisResults'>;

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAnalysisResultsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<AIAnalysisResultsRouteProp>();
  const { imageUri, imageBase64, additionalInfo } = route.params || {};

  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAskAI, setShowAskAI] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userQuestion, setUserQuestion] = useState('');
  const [isAskingAI, setIsAskingAI] = useState(false);

  const analysisSteps = [
    'Initializing AI Analysis...',
    'Processing image data...',
    'Detecting affected areas...',
    'Analyzing symptoms...',
    'Generating recommendations...',
    'Finalizing therapy plan...',
  ];

  useEffect(() => {
    performAnalysis();
  }, []);

  const performAnalysis = async () => {
    setIsAnalyzing(true);
    setCurrentStep(0);

    // Animate through steps
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < analysisSteps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 800);

    try {
      let result: AnalysisResult;
      
      if (imageBase64) {
        result = await geminiService.analyzeImage(imageBase64, additionalInfo || '');
      } else if (additionalInfo) {
        result = await geminiService.analyzeText(additionalInfo);
      } else {
        result = {
          success: false,
          detectedArea: 'Unknown',
          severity: 'moderate',
          confidence: 0,
          recommendations: {
            primaryTherapy: 'Heat Therapy',
            secondaryTherapy: 'None',
            intensity: 5,
            duration: 15,
            temperature: 'Medium',
            frequency: 'As needed',
          },
          analysis: ['No image or description provided'],
          precautions: ['Please try again with an image or description'],
          error: 'No input provided',
        };
      }

      clearInterval(stepInterval);
      setCurrentStep(analysisSteps.length - 1);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
      clearInterval(stepInterval);
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 500);
    }
  };

  const handleStartTherapy = () => {
    // Navigate to therapy session with the recommended settings
    navigation.navigate('MainApp' as any, {
      screen: 'Therapy',
      params: {
        preset: {
          intensity: analysisResult?.recommendations.intensity || 5,
          duration: analysisResult?.recommendations.duration || 20,
          bodyPart: analysisResult?.detectedArea || 'General',
        },
      },
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAskQuestion = async () => {
    if (!userQuestion.trim() || isAskingAI) return;
    
    const question = userQuestion.trim();
    setUserQuestion('');
    Keyboard.dismiss();
    
    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: question,
      isUser: true,
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, userMsg]);
    
    // Show loading
    setIsAskingAI(true);
    
    try {
      // Build context from analysis result
      const context = analysisResult 
        ? `Detected area: ${analysisResult.detectedArea}. Severity: ${analysisResult.severity}. Recommended therapy: ${analysisResult.recommendations.primaryTherapy}.`
        : '';
      
      const answer = await geminiService.askQuestion(question, context);
      
      // Add AI response
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: answer,
        isUser: false,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Ask AI error:', error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAskingAI(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return '#10B981';
      case 'moderate':
        return '#F59E0B';
      case 'severe':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getTherapyIcon = (therapy: string) => {
    const lowerTherapy = therapy.toLowerCase();
    if (lowerTherapy.includes('heat')) return 'thermometer';
    if (lowerTherapy.includes('cold') || lowerTherapy.includes('ice')) return 'snowflake';
    if (lowerTherapy.includes('ems') || lowerTherapy.includes('electric')) return 'flash';
    if (lowerTherapy.includes('massage')) return 'hand-heart';
    if (lowerTherapy.includes('ultrasound')) return 'wave';
    return 'medical-bag';
  };

  if (isAnalyzing) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f3460']}
          style={styles.loadingGradient}
        >
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          
          <View style={styles.loadingContent}>
            <View style={styles.loadingIconContainer}>
              <LinearGradient
                colors={['#EF4444', '#DC2626']}
                style={styles.loadingIconGradient}
              >
                <Icon name="brain" size={48} color="#FFFFFF" />
              </LinearGradient>
            </View>

            <Text style={styles.loadingTitle}>Analyzing Image</Text>
            <Text style={styles.loadingSubtitle}>
              Our AI is processing your photo to provide personalized recommendations
            </Text>

            <View style={styles.stepsContainer}>
              {analysisSteps.map((step, index) => (
                <View key={index} style={styles.stepRow}>
                  <View style={[
                    styles.stepIndicator,
                    index <= currentStep && styles.stepIndicatorActive,
                    index === currentStep && styles.stepIndicatorCurrent,
                  ]}>
                    {index < currentStep ? (
                      <Icon name="check" size={14} color="#FFFFFF" />
                    ) : index === currentStep ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <View style={styles.stepDot} />
                    )}
                  </View>
                  <Text style={[
                    styles.stepText,
                    index <= currentStep && styles.stepTextActive,
                  ]}>
                    {step}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${((currentStep + 1) / analysisSteps.length) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {Math.round(((currentStep + 1) / analysisSteps.length) * 100)}%
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF5EF" />
      
      {/* Header */}
      <LinearGradient
        colors={['#EF4444', '#DC2626']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Icon name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>AI Analysis Results</Text>
          </View>
          <View style={styles.backButton} />
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Card */}
        <View style={styles.successCard}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.successGradient}
          >
            <View style={styles.successIconContainer}>
              <Icon name="check-circle" size={40} color="#FFFFFF" />
            </View>
            <View style={styles.successTextContainer}>
              <Text style={styles.successTitle}>Analysis Complete</Text>
              <Text style={styles.successSubtitle}>
                AI Confidence: {analysisResult?.confidence || 0}%
              </Text>
            </View>
          </LinearGradient>
          <View style={styles.confidenceBar}>
            <View 
              style={[
                styles.confidenceFill, 
                { width: `${analysisResult?.confidence || 0}%` }
              ]} 
            />
          </View>
        </View>

        {/* Captured Image */}
        {imageUri && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Analyzed Image</Text>
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={styles.capturedImage} />
              <View style={styles.imageOverlay}>
                <Icon name="check-circle" size={24} color="#10B981" />
                <Text style={styles.imageOverlayText}>Analyzed</Text>
              </View>
            </View>
          </View>
        )}

        {/* Detected Area Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconContainer}>
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={styles.cardIconGradient}
              >
                <Icon name="crosshairs" size={24} color="#FFFFFF" />
              </LinearGradient>
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardLabel}>Detected Area</Text>
              <Text style={styles.cardValue}>{analysisResult?.detectedArea || 'Unknown'}</Text>
            </View>
          </View>
          
          <View style={styles.severityContainer}>
            <Text style={styles.severityLabel}>Severity Level:</Text>
            <View style={[
              styles.severityBadge,
              { backgroundColor: getSeverityColor(analysisResult?.severity || 'moderate') + '20' }
            ]}>
              <View style={[
                styles.severityDot,
                { backgroundColor: getSeverityColor(analysisResult?.severity || 'moderate') }
              ]} />
              <Text style={[
                styles.severityText,
                { color: getSeverityColor(analysisResult?.severity || 'moderate') }
              ]}>
                {(analysisResult?.severity || 'moderate').charAt(0).toUpperCase() + 
                 (analysisResult?.severity || 'moderate').slice(1)}
              </Text>
            </View>
          </View>
        </View>

        {/* Recommended Therapy Card */}
        <View style={styles.card}>
          <LinearGradient
            colors={['#EF4444', '#DC2626']}
            style={styles.therapyGradient}
          >
            <View style={styles.therapyHeader}>
              <View style={styles.therapyIconContainer}>
                <Icon 
                  name={getTherapyIcon(analysisResult?.recommendations.primaryTherapy || '')} 
                  size={28} 
                  color="#FFFFFF" 
                />
              </View>
              <View>
                <Text style={styles.therapyLabel}>Recommended Therapy</Text>
                <Text style={styles.therapyTitle}>
                  {analysisResult?.recommendations.primaryTherapy || 'Heat Therapy'}
                </Text>
              </View>
            </View>

            <View style={styles.therapyDetails}>
              <View style={styles.therapyDetailItem}>
                <Text style={styles.therapyDetailLabel}>Intensity</Text>
                <Text style={styles.therapyDetailValue}>
                  {analysisResult?.recommendations.intensity || 5}/10
                </Text>
              </View>
              <View style={styles.therapyDetailDivider} />
              <View style={styles.therapyDetailItem}>
                <Text style={styles.therapyDetailLabel}>Duration</Text>
                <Text style={styles.therapyDetailValue}>
                  {analysisResult?.recommendations.duration || 20} min
                </Text>
              </View>
              <View style={styles.therapyDetailDivider} />
              <View style={styles.therapyDetailItem}>
                <Text style={styles.therapyDetailLabel}>Temperature</Text>
                <Text style={styles.therapyDetailValue}>
                  {analysisResult?.recommendations.temperature || 'Medium'}
                </Text>
              </View>
            </View>
          </LinearGradient>

          {analysisResult?.recommendations.secondaryTherapy && 
           analysisResult.recommendations.secondaryTherapy !== 'None' && (
            <View style={styles.secondaryTherapy}>
              <Icon name="plus-circle" size={18} color="#6B7280" />
              <Text style={styles.secondaryTherapyText}>
                Secondary: {analysisResult.recommendations.secondaryTherapy}
              </Text>
            </View>
          )}
        </View>

        {/* Analysis Insights */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Icon name="lightbulb-on" size={20} color="#F59E0B" />
            <Text style={styles.cardTitle}>Analysis Insights</Text>
          </View>
          
          <View style={styles.insightsList}>
            {(analysisResult?.analysis || []).map((insight, index) => (
              <View key={index} style={styles.insightItem}>
                <View style={styles.insightDot} />
                <Text style={styles.insightText}>{insight}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Precautions */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Icon name="alert-circle" size={20} color="#EF4444" />
            <Text style={styles.cardTitle}>Precautions</Text>
          </View>
          
          <View style={styles.precautionsList}>
            {(analysisResult?.precautions || []).map((precaution, index) => (
              <View key={index} style={styles.precautionItem}>
                <Icon name="shield-alert" size={16} color="#F59E0B" />
                <Text style={styles.precautionText}>{precaution}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Frequency Recommendation */}
        <View style={styles.card}>
          <View style={styles.frequencyContainer}>
            <Icon name="calendar-clock" size={24} color="#8B5CF6" />
            <View style={styles.frequencyTextContainer}>
              <Text style={styles.frequencyLabel}>Recommended Frequency</Text>
              <Text style={styles.frequencyValue}>
                {analysisResult?.recommendations.frequency || '2-3 times daily'}
              </Text>
            </View>
          </View>
        </View>

        {/* Ask AI Section */}
        <View style={styles.card}>
          <TouchableOpacity 
            style={styles.askAIHeader}
            onPress={() => setShowAskAI(!showAskAI)}
          >
            <View style={styles.askAIHeaderLeft}>
              <LinearGradient
                colors={['#8B5CF6', '#7C3AED']}
                style={styles.askAIIcon}
              >
                <Icon name="chat-question" size={24} color="#FFFFFF" />
              </LinearGradient>
              <View>
                <Text style={styles.askAITitle}>Ask AI About This</Text>
                <Text style={styles.askAISubtitle}>
                  Get answers about your condition
                </Text>
              </View>
            </View>
            <Icon 
              name={showAskAI ? 'chevron-up' : 'chevron-down'} 
              size={24} 
              color="#6B7280" 
            />
          </TouchableOpacity>

          {showAskAI && (
            <View style={styles.askAIContent}>
              {/* Quick Questions */}
              {chatMessages.length === 0 && (
                <View style={styles.quickQuestions}>
                  <Text style={styles.quickQuestionsLabel}>Quick questions:</Text>
                  <View style={styles.quickQuestionChips}>
                    {[
                      'How long should I rest?',
                      'What exercises can help?',
                      'When should I see a doctor?',
                      'Can I continue sports?',
                    ].map((q, idx) => (
                      <TouchableOpacity
                        key={idx}
                        style={styles.quickQuestionChip}
                        onPress={() => setUserQuestion(q)}
                      >
                        <Text style={styles.quickQuestionText}>{q}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* Chat Messages */}
              {chatMessages.length > 0 && (
                <ScrollView 
                  style={styles.chatMessages}
                  contentContainerStyle={styles.chatMessagesContent}
                  showsVerticalScrollIndicator={false}
                >
                  {chatMessages.map(msg => (
                    <View
                      key={msg.id}
                      style={[
                        styles.chatMessage,
                        msg.isUser ? styles.userMessage : styles.aiMessage,
                      ]}
                    >
                      {!msg.isUser && (
                        <Icon name="robot" size={16} color="#8B5CF6" style={styles.aiIcon} />
                      )}
                      <Text style={[
                        styles.messageText,
                        msg.isUser ? styles.userMessageText : styles.aiMessageText,
                      ]}>
                        {msg.text}
                      </Text>
                    </View>
                  ))}
                  {isAskingAI && (
                    <View style={[styles.chatMessage, styles.aiMessage]}>
                      <ActivityIndicator size="small" color="#8B5CF6" />
                      <Text style={styles.aiMessageText}>Thinking...</Text>
                    </View>
                  )}
                </ScrollView>
              )}

              {/* Input */}
              <View style={styles.askAIInputContainer}>
                <TextInput
                  style={styles.askAIInput}
                  placeholder="Ask a question..."
                  placeholderTextColor="#9CA3AF"
                  value={userQuestion}
                  onChangeText={setUserQuestion}
                  multiline
                  maxLength={200}
                  editable={!isAskingAI}
                />
                <TouchableOpacity
                  style={[
                    styles.askAISendButton,
                    (!userQuestion.trim() || isAskingAI) && styles.askAISendButtonDisabled,
                  ]}
                  onPress={handleAskQuestion}
                  disabled={!userQuestion.trim() || isAskingAI}
                >
                  <LinearGradient
                    colors={
                      !userQuestion.trim() || isAskingAI
                        ? ['#D1D5DB', '#9CA3AF']
                        : ['#8B5CF6', '#7C3AED']
                    }
                    style={styles.askAISendGradient}
                  >
                    <Icon name="send" size={20} color="#FFFFFF" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Spacer for button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartTherapy}>
          <LinearGradient
            colors={['#EF4444', '#DC2626']}
            style={styles.startButtonGradient}
          >
            <Icon name="play-circle" size={24} color="#FFFFFF" />
            <Text style={styles.startButtonText}>Start Therapy Session</Text>
            <Icon name="arrow-right" size={24} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5EF',
  },
  loadingContainer: {
    flex: 1,
  },
  loadingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    padding: 32,
  },
  loadingIconContainer: {
    marginBottom: 24,
  },
  loadingIconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  stepsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepIndicatorActive: {
    backgroundColor: '#10B981',
  },
  stepIndicatorCurrent: {
    backgroundColor: '#EF4444',
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  stepText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
  },
  stepTextActive: {
    color: '#FFFFFF',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#EF4444',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  header: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 16 : 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  successGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  successIconContainer: {
    marginRight: 16,
  },
  successTextContainer: {
    flex: 1,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  successSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  confidenceBar: {
    height: 6,
    backgroundColor: '#D1FAE5',
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  capturedImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  imageOverlayText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIconContainer: {
    marginRight: 16,
  },
  cardIconGradient: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderText: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  severityLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  severityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  severityText: {
    fontSize: 14,
    fontWeight: '600',
  },
  therapyGradient: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  therapyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  therapyIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  therapyLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  therapyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  therapyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 16,
  },
  therapyDetailItem: {
    alignItems: 'center',
    flex: 1,
  },
  therapyDetailLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  therapyDetailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  therapyDetailDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  secondaryTherapy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
  },
  secondaryTherapyText: {
    fontSize: 14,
    color: '#6B7280',
  },
  insightsList: {
    gap: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B5CF6',
    marginTop: 6,
    marginRight: 12,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  precautionsList: {
    gap: 12,
  },
  precautionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  precautionText: {
    flex: 1,
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  frequencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  frequencyTextContainer: {
    flex: 1,
  },
  frequencyLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  frequencyValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: '#FFF5EF',
  },
  startButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  askAIHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  askAIHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  askAIIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  askAITitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  askAISubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  askAIContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  quickQuestions: {
    marginBottom: 16,
  },
  quickQuestionsLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  quickQuestionChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickQuestionChip: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quickQuestionText: {
    fontSize: 13,
    color: '#4B5563',
  },
  chatMessages: {
    maxHeight: 300,
    marginBottom: 12,
  },
  chatMessagesContent: {
    gap: 12,
  },
  chatMessage: {
    maxWidth: '85%',
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#8B5CF6',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  aiIcon: {
    marginTop: 2,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#1F2937',
    flex: 1,
  },
  askAIInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  askAIInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1F2937',
    maxHeight: 100,
  },
  askAISendButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  askAISendButtonDisabled: {
    opacity: 0.5,
  },
  askAISendGradient: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AIAnalysisResultsScreen;
