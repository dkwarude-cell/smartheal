/**
 * Firebase Cloud Functions
 * SmartHeal (RunVerve) - Backend AI Processing with Vertex AI
 * 
 * IMPORTANT: This file should be deployed to Firebase Functions
 * 
 * Setup Instructions:
 * 1. Install Firebase CLI: npm install -g firebase-tools
 * 2. Initialize Functions: firebase init functions
 * 3. Copy this code to functions/src/index.ts
 * 4. Install dependencies: cd functions && npm install
 * 5. Deploy: firebase deploy --only functions
 * 
 * Required environment variables:
 * - VERTEX_AI_PROJECT_ID: Your Google Cloud project ID
 * - VERTEX_AI_LOCATION: Region (e.g., us-central1)
 * - VERTEX_AI_MODEL: Model name (e.g., gemini-pro)
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { VertexAI } from '@google-cloud/vertexai';

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Vertex AI
const vertexAI = new VertexAI({
  project: process.env.VERTEX_AI_PROJECT_ID || functions.config().vertex.project_id,
  location: process.env.VERTEX_AI_LOCATION || 'us-central1'
});

const model = vertexAI.preview.getGenerativeModel({
  model: process.env.VERTEX_AI_MODEL || 'gemini-pro',
  generation_config: {
    max_output_tokens: 2048,
    temperature: 0.7,
    top_p: 0.8,
    top_k: 40
  }
});

/**
 * Analyze health data and provide insights
 */
export const analyzeHealthData = functions.https.onCall(async (data, context) => {
  const startTime = Date.now();

  try {
    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { userId, input } = data;
    const { healthProfile, recentSessions } = input.data;

    // Construct prompt for Vertex AI
    const prompt = `You are a health and therapy AI assistant for SmartHeal, an ITT (Interferential Therapy) device.

Analyze this user's health data and provide personalized insights:

Health Profile:
- Age: ${healthProfile.age}
- Medical Conditions: ${healthProfile.medicalConditions.join(', ')}
- Goals: ${healthProfile.goals.join(', ')}

Recent Therapy Sessions: ${recentSessions.length} sessions
Average Duration: ${recentSessions.length > 0 ? (recentSessions.reduce((sum: number, s: any) => sum + s.duration, 0) / recentSessions.length / 60).toFixed(1) : 0} minutes

Provide:
1. 3-4 key insights about their progress
2. 4-5 specific recommendations for improvement
3. Confidence level (0-1) in your analysis

Format as JSON:
{
  "insights": ["insight1", "insight2", ...],
  "recommendations": ["rec1", "rec2", ...],
  "confidence": 0.85,
  "reasoning": "brief explanation"
}`;

    // Call Vertex AI
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.candidates![0].content.parts[0].text!;

    // Parse JSON response
    let aiData;
    try {
      aiData = JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
    } catch (e) {
      aiData = {
        insights: [text],
        recommendations: ['Continue with current therapy schedule'],
        confidence: 0.5
      };
    }

    // Save analysis to Firestore
    await admin.firestore().collection('ai_analysis').add({
      userId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      type: 'health_insight',
      input: { healthProfile, recentSessions },
      output: aiData,
      metadata: {
        modelVersion: 'gemini-pro',
        processingTime: Date.now() - startTime,
        tokens: response.usageMetadata?.totalTokenCount || 0
      }
    });

    return {
      success: true,
      data: aiData,
      metadata: {
        modelVersion: 'gemini-pro',
        processingTime: Date.now() - startTime,
        tokens: response.usageMetadata?.totalTokenCount || 0
      }
    };
  } catch (error: any) {
    console.error('Error in analyzeHealthData:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Generate therapy recommendations
 */
export const recommendTherapy = functions.https.onCall(async (data, context) => {
  const startTime = Date.now();

  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { userId, input } = data;
    const { painLevel, targetArea } = input.data;

    const prompt = `You are a therapy recommendation AI for SmartHeal ITT device.

Patient Information:
- Pain Level: ${painLevel}/10
- Target Area: ${targetArea}

Provide therapy recommendations including:
1. Recommended intensity level
2. Session duration
3. Frequency (sessions per day)
4. Additional care instructions
5. Expected outcomes

Format as JSON:
{
  "insights": ["insight1", "insight2", ...],
  "recommendations": ["rec1", "rec2", ...],
  "confidence": 0.9,
  "reasoning": "explanation"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.candidates![0].content.parts[0].text!;

    let aiData;
    try {
      aiData = JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
    } catch (e) {
      aiData = {
        insights: [text],
        recommendations: ['Use medium intensity for 15-20 minutes'],
        confidence: 0.7
      };
    }

    // Save to Firestore
    await admin.firestore().collection('ai_analysis').add({
      userId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      type: 'recommendation',
      input: { painLevel, targetArea },
      output: aiData,
      metadata: {
        modelVersion: 'gemini-pro',
        processingTime: Date.now() - startTime
      }
    });

    return {
      success: true,
      data: aiData,
      metadata: {
        modelVersion: 'gemini-pro',
        processingTime: Date.now() - startTime
      }
    };
  } catch (error: any) {
    console.error('Error in recommendTherapy:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Analyze body placement image
 */
export const analyzeBodyPlacement = functions.https.onCall(async (data, context) => {
  const startTime = Date.now();

  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { userId, input } = data;
    const { image, data: imageData } = input;
    const { targetArea } = imageData;

    // Use Vertex AI Vision model
    const visionModel = vertexAI.preview.getGenerativeModel({
      model: 'gemini-pro-vision'
    });

    const prompt = `Analyze this image showing ITT device placement on ${targetArea}.

Provide:
1. Whether placement is correct (true/false)
2. Placement accuracy percentage (0-100)
3. Specific adjustment instructions if needed
4. Safety considerations

Format as JSON:
{
  "insights": ["placement analysis", "accuracy info", ...],
  "recommendations": ["adjustment1", "adjustment2", ...],
  "confidence": 0.9
}`;

    const imagePart = {
      inline_data: {
        mime_type: 'image/jpeg',
        data: image.split(',')[1] // Remove data:image/jpeg;base64, prefix
      }
    };

    const result = await visionModel.generateContent([prompt, imagePart]);
    const text = result.response.candidates![0].content.parts[0].text!;

    let aiData;
    try {
      aiData = JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
    } catch (e) {
      aiData = {
        insights: [text],
        recommendations: ['Adjust device position slightly'],
        confidence: 0.8
      };
    }

    // Save to Firestore
    await admin.firestore().collection('ai_analysis').add({
      userId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      type: 'image_analysis',
      input: { targetArea },
      output: aiData,
      metadata: {
        modelVersion: 'gemini-pro-vision',
        processingTime: Date.now() - startTime
      }
    });

    return {
      success: true,
      data: aiData,
      metadata: {
        modelVersion: 'gemini-pro-vision',
        processingTime: Date.now() - startTime
      }
    };
  } catch (error: any) {
    console.error('Error in analyzeBodyPlacement:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Chat with AI assistant
 */
export const chatWithAI = functions.https.onCall(async (data, context) => {
  const startTime = Date.now();

  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { userId, input } = data;
    const { text: message, data: chatData } = input;
    const { conversationHistory = [] } = chatData;

    // Build conversation context
    const conversationContext = conversationHistory
      .map((msg: any) => `${msg.role}: ${msg.content}`)
      .join('\n');

    const prompt = `You are SmartHeal AI Assistant, helping users with ITT therapy.

Previous conversation:
${conversationContext}

User: ${message}

Respond naturally and helpfully. Provide practical advice about therapy, device usage, and health insights.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.candidates![0].content.parts[0].text!;

    const aiData = {
      insights: [responseText],
      recommendations: [],
      confidence: 0.85
    };

    return {
      success: true,
      data: aiData,
      metadata: {
        modelVersion: 'gemini-pro',
        processingTime: Date.now() - startTime,
        tokens: result.response.usageMetadata?.totalTokenCount || 0
      }
    };
  } catch (error: any) {
    console.error('Error in chatWithAI:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Predict recovery timeline
 */
export const predictRecovery = functions.https.onCall(async (data, context) => {
  const startTime = Date.now();

  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { userId, input } = data;
    const { condition, currentProgress } = input.data;

    const prompt = `Predict recovery timeline for a patient using ITT therapy.

Condition: ${condition}
Current Progress: ${JSON.stringify(currentProgress)}

Provide:
1. Estimated recovery time in weeks
2. Recovery milestones by week
3. Factors affecting timeline
4. Recommendations for faster recovery

Format as JSON:
{
  "insights": ["timeline info", "milestone info", ...],
  "recommendations": ["rec1", "rec2", ...],
  "confidence": 0.8,
  "reasoning": "explanation",
  "rawResponse": {
    "estimatedWeeks": 4,
    "milestones": [{"week": 1, "achievement": "..."}]
  }
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.candidates![0].content.parts[0].text!;

    let aiData;
    try {
      aiData = JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
    } catch (e) {
      aiData = {
        insights: [text],
        recommendations: ['Continue consistent therapy'],
        confidence: 0.7
      };
    }

    // Save to Firestore
    await admin.firestore().collection('ai_analysis').add({
      userId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      type: 'prediction',
      input: { condition, currentProgress },
      output: aiData,
      metadata: {
        modelVersion: 'gemini-pro',
        processingTime: Date.now() - startTime
      }
    });

    return {
      success: true,
      data: aiData,
      metadata: {
        modelVersion: 'gemini-pro',
        processingTime: Date.now() - startTime
      }
    };
  } catch (error: any) {
    console.error('Error in predictRecovery:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Scheduled function to generate daily health insights
 */
export const generateDailyInsights = functions.pubsub
  .schedule('every day 08:00')
  .timeZone('America/New_York')
  .onRun(async (context) => {
    console.log('Generating daily insights for all users...');

    // Get all users
    const usersSnapshot = await admin.firestore().collection('users').get();

    const promises = usersSnapshot.docs.map(async (userDoc) => {
      const userId = userDoc.id;

      // Get recent sessions
      const sessionsSnapshot = await admin
        .firestore()
        .collection('therapy_sessions')
        .where('userId', '==', userId)
        .orderBy('startTime', 'desc')
        .limit(7)
        .get();

      if (sessionsSnapshot.empty) return;

      // Generate insights (call analyzeHealthData internally)
      // Implementation details...
    });

    await Promise.all(promises);
    console.log('Daily insights generation completed');
  });
