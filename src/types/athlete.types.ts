import { BaseUser } from './user.types';
import { TherapySession } from './session.types';

export interface AthleteProfile extends BaseUser {
  profileType: 'athlete';
  details: {
    age: number;
    sport: string;
    experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'elite';
    goals: string[];
    weeklyTrainingDays: number;
    averageDistance?: number;
  };
  coachId?: string;
  coachName?: string;
  readiness: number;
  streak: number;
  longestStreak: number;
  compliance: number;
  weeklyDistance: number;
  trainingLoad: number;
  avgPace: number;
  upcomingSessions: TherapySession[];
  sessionHistory: TherapySession[];
  monthSessions: number;
  recentActivity: number[];
  workouts: Workout[];
  sleepData?: {
    hours: number;
    quality: number;
    deepSleepPercent: number;
    interruptions: number;
  };
  hrv?: number;
  soreness: number;
  lastSessionDate?: Date;
  trainingPlan?: TrainingPlan;
  currentWeek: number;
  totalWeeks: number;
}

export interface Workout {
  id: string;
  date: Date;
  type: 'running' | 'cycling' | 'swimming' | 'other';
  duration: number;
  distance: number;
  intensity: 'low' | 'moderate' | 'high' | 'very-high';
  pace?: number;
}

export interface TrainingPlan {
  id: string;
  name: string;
  totalWeeks: number;
  currentWeek: number;
  weeks: TrainingWeek[];
}

export interface TrainingWeek {
  weekNumber: number;
  workouts: Workout[];
  therapySessions: TherapySession[];
  totalDistance: number;
  totalDuration: number;
}
