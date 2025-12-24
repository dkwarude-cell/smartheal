import { BaseUser } from './user.types';
import { AthleteProfile } from './athlete.types';

export interface CoachProfile extends BaseUser {
  profileType: 'coach';
  details: {
    coachingType: string;
    specializations: string[];
    yearsExperience: number;
    certifications?: string;
  };
  athleteIds: string[];
  athletes?: AthleteProfile[];
  maxAthletes: number;
  teamMetrics: {
    activeAthletes: number;
    avgCompliance: number;
    atRiskCount: number;
    avgReadiness: number;
  };
  priorityAlerts: PriorityAlert[];
  unreadMessages: number;
}

export interface PriorityAlert {
  id: string;
  type: 'at-risk' | 'success' | 'milestone';
  athleteId: string;
  athleteName: string;
  message: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
}
