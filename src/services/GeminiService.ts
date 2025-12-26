import { Platform } from 'react-native';

// Gemini API configuration
const OPENROUTER_API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export interface AnalysisResult {
  success: boolean;
  detectedArea: string;
  severity: 'mild' | 'moderate' | 'severe';
  confidence: number;
  recommendations: TherapyRecommendation;
  analysis: string[];
  precautions: string[];
  error?: string;
}

export interface TherapyRecommendation {
  primaryTherapy: string;
  secondaryTherapy: string;
  intensity: number;
  duration: number;
  temperature: string;
  frequency: string;
}

class GeminiService {
  /**
   * Analyze an image with additional context using Gemini via OpenRouter
   * NOTE: Currently bypassing API due to rate limits - using local analysis
   */
  async analyzeImage(
    imageBase64: string,
    additionalInfo: string
  ): Promise<AnalysisResult> {
    const models = [
      'google/gemini-2.0-flash-exp:free',
      'google/learnlm-1.5-pro-experimental:free',
      'google/gemini-2.0-flash-thinking-exp:free'
    ];

    let lastError = null;

    for (const model of models) {
      try {
        console.log(`Attempting analysis with ${model}...`);
        
        // Remove data URL prefix if present
        const base64Data = imageBase64.includes('base64,')
          ? imageBase64.split('base64,')[1]
          : imageBase64;

        const prompt = `You are an AI medical therapy assistant for SmartHeal, a therapeutic device application. Analyze this image of a body part/area that needs therapy treatment.

${additionalInfo ? `Additional information from user: ${additionalInfo}` : 'No additional information provided - analyze based solely on the image.'}

Please analyze the image and provide a detailed therapy recommendation in the following JSON format:
{
  "detectedArea": "Specific body part or area detected (e.g., 'Lower Back - Lumbar Region', 'Right Shoulder', 'Left Knee')",
  "severity": "mild | moderate | severe",
  "confidence": 85,
  "recommendations": {
    "primaryTherapy": "Main therapy type (e.g., 'Heat Therapy', 'EMS Stimulation', 'Cold Therapy')",
    "secondaryTherapy": "Supporting therapy if needed",
    "intensity": 5,
    "duration": 20,
    "temperature": "Medium (38°C)",
    "frequency": "2-3 times daily"
  },
  "analysis": [
    "Key observation 1 about the area",
    "Key observation 2 about potential issues",
    "Key observation 3 about treatment approach"
  ],
  "precautions": [
    "Safety precaution 1",
    "Safety precaution 2"
  ]
}

Important guidelines:
- Be specific about the detected area based on visual analysis
- Provide practical therapy recommendations suitable for a portable therapy device
- Consider the user's additional information in your analysis
- Suggest appropriate intensity levels (1-10 scale)
- Duration should be in minutes (typical range: 10-30 minutes)
- Include relevant precautions for safe therapy application

Respond ONLY with the JSON object, no additional text.`;

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://smartheal.app',
            'X-Title': 'SmartHeal Therapy App',
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: prompt,
                  },
                  {
                    type: 'image_url',
                    image_url: {
                      url: `data:image/jpeg;base64,${base64Data}`,
                    },
                  },
                ],
              },
            ],
            max_tokens: 1000,
            temperature: 0.3,
          }),
        });

        if (response.status === 429) {
          console.log(`${model} is rate limited, trying next model...`);
          continue;
        }

        if (!response.ok) {
          const errorData = await response.text();
          console.warn(`API Error with ${model}:`, errorData);
          continue;
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) {
          console.warn(`No content from ${model}`);
          continue;
        }

        // Parse JSON response
        let cleanContent = content.trim();
        if (cleanContent.startsWith('```json')) {
          cleanContent = cleanContent.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        } else if (cleanContent.startsWith('```')) {
          cleanContent = cleanContent.replace(/^```\n?/, '').replace(/\n?```$/, '');
        }
        
        const parsedResult = JSON.parse(cleanContent);

        return {
          success: true,
          detectedArea: parsedResult.detectedArea || 'Unknown Area',
          severity: parsedResult.severity || 'moderate',
          confidence: parsedResult.confidence || 75,
          recommendations: {
            primaryTherapy: parsedResult.recommendations?.primaryTherapy || 'Heat Therapy',
            secondaryTherapy: parsedResult.recommendations?.secondaryTherapy || 'Light Massage',
            intensity: parsedResult.recommendations?.intensity || 5,
            duration: parsedResult.recommendations?.duration || 20,
            temperature: parsedResult.recommendations?.temperature || 'Medium (38°C)',
            frequency: parsedResult.recommendations?.frequency || '2-3 times daily',
          },
          analysis: parsedResult.analysis || ['Analysis completed'],
          precautions: parsedResult.precautions || ['Consult a healthcare provider if symptoms persist'],
        };
      } catch (error) {
        console.error(`Error with ${model}:`, error);
        lastError = error;
      }
    }

    // If all models fail or are rate limited
    console.log('All AI models exhausted or rate limited, using smart fallback');
    return this.getSmartFallbackAnalysis(additionalInfo);
  }

  /**
   * Enhanced fallback analysis with helpful default recommendations
   */
  getSmartFallbackAnalysis(additionalInfo: string): AnalysisResult {
    return {
      success: true,
      detectedArea: 'Body Area - Image Captured',
      severity: 'moderate',
      confidence: 70,
      recommendations: {
        primaryTherapy: 'Heat Therapy',
        secondaryTherapy: 'Light EMS',
        intensity: 5,
        duration: 20,
        temperature: 'Medium (38°C)',
        frequency: '2-3 times daily',
      },
      analysis: [
        '✓ Image captured successfully',
        '⚡ AI analysis temporarily unavailable due to high demand',
        '💬 Use "Ask AI About This" below to get specific answers about your condition',
        '📋 Standard therapy protocol recommended - adjust based on comfort',
      ],
      precautions: [
        'Start with lower intensity (3-4) and gradually increase',
        'Apply therapy for 15-20 minutes per session',
        'Stop immediately if you experience increased pain or discomfort',
        'Use the Ask AI feature below for personalized guidance',
        'Consult a healthcare provider for severe or persistent symptoms',
      ],
    };
  }

  /**
   * Get a default analysis result for fallback
   */
  getDefaultAnalysis(additionalInfo: string): AnalysisResult {
    // Try to extract body part from additional info
    const lowerInfo = additionalInfo.toLowerCase();
    let detectedArea = 'Upper Body Area'; // More specific default
    let primaryTherapy = 'Heat Therapy';
    let secondaryTherapy = 'Low-Frequency EMS';
    let severity: 'mild' | 'moderate' | 'severe' = 'moderate';
    
    // Detect area - More comprehensive detection
    // Back areas
    if (lowerInfo.includes('lower back') || lowerInfo.includes('lumbar')) {
      detectedArea = 'Lower Back - Lumbar Region';
    } else if (lowerInfo.includes('upper back') || lowerInfo.includes('thoracic')) {
      detectedArea = 'Upper Back - Thoracic Region';
    } else if (lowerInfo.includes('mid back') || lowerInfo.includes('middle back')) {
      detectedArea = 'Mid Back Region';
    } else if (lowerInfo.includes('back')) {
      detectedArea = 'Back - Lumbar Region';
    }
    // Shoulder areas
    else if (lowerInfo.includes('left shoulder')) {
      detectedArea = 'Left Shoulder Joint';
    } else if (lowerInfo.includes('right shoulder')) {
      detectedArea = 'Right Shoulder Joint';
    } else if (lowerInfo.includes('shoulder')) {
      detectedArea = 'Shoulder Joint';
    }
    // Neck areas
    else if (lowerInfo.includes('neck') || lowerInfo.includes('cervical')) {
      detectedArea = 'Neck - Cervical Region';
    }
    // Leg areas
    else if (lowerInfo.includes('left knee')) {
      detectedArea = 'Left Knee Joint';
    } else if (lowerInfo.includes('right knee')) {
      detectedArea = 'Right Knee Joint';
    } else if (lowerInfo.includes('knee')) {
      detectedArea = 'Knee Joint';
    } else if (lowerInfo.includes('thigh') || lowerInfo.includes('quad')) {
      detectedArea = 'Thigh - Quadriceps Area';
    } else if (lowerInfo.includes('calf') || lowerInfo.includes('shin')) {
      detectedArea = 'Calf Muscle Area';
    } else if (lowerInfo.includes('hamstring')) {
      detectedArea = 'Hamstring Area';
    }
    // Arm areas
    else if (lowerInfo.includes('elbow')) {
      detectedArea = 'Elbow Joint';
    } else if (lowerInfo.includes('wrist')) {
      detectedArea = 'Wrist Joint';
    } else if (lowerInfo.includes('forearm')) {
      detectedArea = 'Forearm Area';
    } else if (lowerInfo.includes('bicep') || lowerInfo.includes('upper arm')) {
      detectedArea = 'Upper Arm - Biceps Area';
    }
    // Ankle and foot
    else if (lowerInfo.includes('ankle')) {
      detectedArea = 'Ankle Joint';
    } else if (lowerInfo.includes('foot') || lowerInfo.includes('feet')) {
      detectedArea = 'Foot Area';
    }
    // Hip and glutes
    else if (lowerInfo.includes('hip')) {
      detectedArea = 'Hip Joint';
    } else if (lowerInfo.includes('glute') || lowerInfo.includes('buttock')) {
      detectedArea = 'Gluteal Area';
    }
    // Abdomen and chest
    else if (lowerInfo.includes('abdomen') || lowerInfo.includes('stomach') || lowerInfo.includes('abs')) {
      detectedArea = 'Abdominal Area';
    } else if (lowerInfo.includes('chest') || lowerInfo.includes('pectoral')) {
      detectedArea = 'Chest - Pectoral Area';
    }
    
    // Detect severity
    if (lowerInfo.includes('severe') || lowerInfo.includes('intense') || lowerInfo.includes('sharp')) {
      severity = 'severe';
    } else if (lowerInfo.includes('mild') || lowerInfo.includes('slight') || lowerInfo.includes('minor')) {
      severity = 'mild';
    }
    
    // Adjust therapy based on description
    if (lowerInfo.includes('muscle') || lowerInfo.includes('tight') || lowerInfo.includes('stiff')) {
      primaryTherapy = 'Heat Therapy';
      secondaryTherapy = 'EMS Muscle Stimulation';
    } else if (lowerInfo.includes('inflammation') || lowerInfo.includes('swell') || lowerInfo.includes('acute')) {
      primaryTherapy = 'Cold Therapy';
      secondaryTherapy = 'Light Compression';
    } else if (lowerInfo.includes('chronic') || lowerInfo.includes('recurring')) {
      primaryTherapy = 'Alternating Heat & EMS';
      secondaryTherapy = 'Low-Frequency Stimulation';
    }

    return {
      success: true,
      detectedArea,
      severity,
      confidence: 70,
      recommendations: {
        primaryTherapy,
        secondaryTherapy,
        intensity: severity === 'severe' ? 6 : severity === 'mild' ? 4 : 5,
        duration: 20,
        temperature: 'Medium (38°C)',
        frequency: '2-3 times daily',
      },
      analysis: [
        `Analysis based on your description: "${additionalInfo}"`,
        'Recommended standard therapy protocol for this area',
        'AI image analysis temporarily unavailable - using text-based analysis',
      ],
      precautions: [
        'Start with lower intensity and gradually increase',
        'Stop if you experience any discomfort or pain',
        'Consult a healthcare provider for persistent or severe symptoms',
      ],
    };
  }

  /**
   * Ask AI a question about the detected area or therapy
   */
  async askQuestion(question: string, context?: string): Promise<string> {
    const models = [
      'google/gemini-2.0-flash-exp:free',
      'google/learnlm-1.5-pro-experimental:free',
      'mistralai/mistral-7b-instruct:free'
    ];

    for (const model of models) {
      try {
        const prompt = `You are a medical therapy assistant for SmartHeal. ${context ? `Context: ${context}. ` : ''}Answer this question concisely and helpfully: ${question}`;

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://smartheal.app',
            'X-Title': 'SmartHeal Therapy App',
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
            temperature: 0.5,
          }),
        });

        if (response.status === 429) {
          console.log(`Chat model ${model} rate limited, trying next...`);
          continue;
        }

        if (!response.ok) {
          continue;
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || 'Sorry, I could not process your question. Please try again.';
      } catch (error) {
        console.error(`Chat error with ${model}:`, error);
      }
    }

    return this.getFallbackAnswer(question, context);
  }

  /**
   * Provide helpful fallback answers when AI is unavailable
   */
  getFallbackAnswer(question: string, context?: string): string {
    const lowerQ = question.toLowerCase();
    
    // Common question patterns
    if (lowerQ.includes('how long') && (lowerQ.includes('rest') || lowerQ.includes('recover'))) {
      return 'For most minor injuries, rest for 24-48 hours is recommended. For moderate pain, consider 3-5 days of modified activity. Always listen to your body and consult a healthcare provider for severe or persistent symptoms.';
    }
    
    if (lowerQ.includes('exercise') || lowerQ.includes('stretch')) {
      return 'Gentle stretching and range-of-motion exercises are generally helpful after the acute phase (24-48 hours). Start with light movements, avoid painful ranges, and gradually increase activity. Consider consulting a physical therapist for a personalized exercise plan.';
    }
    
    if (lowerQ.includes('doctor') || lowerQ.includes('see a') || lowerQ.includes('medical')) {
      return 'Seek medical attention if you experience: severe pain, numbness or tingling, inability to move the area, swelling that doesn\'t improve after 48 hours, or symptoms that worsen despite treatment. When in doubt, it\'s always best to consult a healthcare professional.';
    }
    
    if (lowerQ.includes('sport') || lowerQ.includes('activity') || lowerQ.includes('continue')) {
      return 'Return to sports/activities gradually. Start with light activity and increase intensity only if you remain pain-free. Use the 10% rule: increase activity by no more than 10% per week. Stop if pain returns and consider consulting a sports medicine professional.';
    }
    
    if (lowerQ.includes('heat') || lowerQ.includes('cold') || lowerQ.includes('ice')) {
      return 'Use cold therapy (ice) for the first 48-72 hours after injury to reduce swelling. After that, heat therapy can help relax muscles and improve blood flow. Never apply ice or heat directly to skin - always use a barrier. Sessions should be 15-20 minutes.';
    }
    
    // Generic fallback
    return `I'm temporarily unable to provide a detailed answer. However, here are general recommendations:\n\n• Start therapy at lower intensity and increase gradually\n• Apply for 15-20 minutes, 2-3 times daily\n• Stop if pain increases\n• Rest between sessions\n• Consult a healthcare provider for specific guidance\n\nFor immediate concerns, please consult a medical professional.`;
  }

  /**
   * Text-only analysis for cases where image analysis fails
   */
  async analyzeText(description: string): Promise<AnalysisResult> {
    // Use local analysis for quick fallback
    console.log('Using local text analysis');
    return this.getDefaultAnalysis(description);
    
    /* Original API-based implementation - disabled due to rate limits
    try {
      const prompt = `You are an AI medical therapy assistant for SmartHeal. Based on the following description of a problem area, provide therapy recommendations.

User description: ${description}

Provide recommendations in JSON format:
{
  "detectedArea": "Body area mentioned",
  "severity": "mild | moderate | severe",
  "confidence": 75,
  "recommendations": {
    "primaryTherapy": "Main therapy type",
    "secondaryTherapy": "Supporting therapy",
    "intensity": 5,
    "duration": 20,
    "temperature": "Medium (38°C)",
    "frequency": "2-3 times daily"
  },
  "analysis": ["Observation 1", "Observation 2"],
  "precautions": ["Precaution 1", "Precaution 2"]
}

Respond ONLY with JSON.`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://smartheal.app',
          'X-Title': 'SmartHeal Therapy App',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-exp:free',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 800,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('No content in response');
      }

      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/^```json\n?/, '').replace(/\n?```$/, '');
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/^```\n?/, '').replace(/\n?```$/, '');
      }

      const parsedResult = JSON.parse(cleanContent);

      return {
        success: true,
        detectedArea: parsedResult.detectedArea || 'Unknown Area',
        severity: parsedResult.severity || 'moderate',
        confidence: parsedResult.confidence || 75,
        recommendations: parsedResult.recommendations || {
          primaryTherapy: 'Heat Therapy',
          secondaryTherapy: 'None',
          intensity: 5,
          duration: 20,
          temperature: 'Medium',
          frequency: 'As needed',
        },
        analysis: parsedResult.analysis || [],
        precautions: parsedResult.precautions || [],
      };
    } catch (error: any) {
      console.error('Text analysis error:', error);
      return this.getDefaultAnalysis(description);
    }
    */
  }
}

export const geminiService = new GeminiService();
export default geminiService;
