import { BaseUser } from './user.types';

export interface HealthUserProfile extends BaseUser {
  profileType: 'health';
  details: {
    ageGroup: string;
    primaryGoal: string;
    painAreas: string[];
    mobilityIssues?: string[];
  };
  painLevel: number;
  mobilityScore: number;
  wellBeingScore: number;
  painHistory: PainRecord[];
  dailyTasks: DailyTask[];
  completedTasks: string[];
  dailyPoints: number;
  enrolledPrograms: TherapyProgram[];
  sessions: TherapySession[];
  streak: number;
  longestStreak: number;
  sleepData?: {
    hours: number;
    quality: number;
  };
}

export interface DailyTask {
  id: string;
  name: string;
  description: string;
  icon: string;
  scheduledTime: string;
  points: number;
  category: 'hydration' | 'mindfulness' | 'movement' | 'therapy' | 'sleep-prep';
}

export interface PainRecord {
  date: Date;
  level: number;
  areas: string[];
  notes?: string;
}

// Internal helper types to avoid circular imports
export interface TherapyProgram {
  id: string;
  name: string;
  description: string;
  totalDays: number;
  totalSessions: number;
  completed: number;
  nextSession?: Date;
  effectiveness: number;
  benefits: string[];
}

export interface TherapySession {
  id: string;
  userId: string;
  name: string;
  type: 'recovery' | 'performance' | 'pain-relief' | 'stress-relief' | 'custom';
  scheduledTime: Date;
  duration: number;
  bodyPart: string;
  intensityLevel: number;
  mode: 'pro' | 'guided';
  status: 'scheduled' | 'in-progress' | 'completed' | 'skipped';
  completedAt?: Date;
  effectiveness?: number;
  painBefore?: number;
  painAfter?: number;
  userNotes?: string;
  assignedBy?: string;
  coachNotes?: string;
  programId?: string;
}
