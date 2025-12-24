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
