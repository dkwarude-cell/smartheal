import { AthleteProfile, Workout } from '../types/athlete.types';
import { HealthUserProfile } from '../types/health.types';
import { CoachProfile } from '../types/coach.types';

export const calculateWeeklyDistance = (athlete: AthleteProfile): number => {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const workouts = athlete.workouts.filter((w) => w.date >= weekAgo && w.type === 'running');
  const totalDistance = workouts.reduce((sum, w) => sum + w.distance, 0);
  return Math.round(totalDistance * 10) / 10;
};

export const calculateTrainingLoad = (workouts: Workout[]): number => {
  return workouts.reduce((total, workout) => {
    const durationScore = workout.duration / 10;
    const intensityMultiplier = {
      low: 1,
      moderate: 1.5,
      high: 2,
      'very-high': 2.5
    }[workout.intensity];
    return total + durationScore * intensityMultiplier;
  }, 0);
};

export const calculateRecoveryScore = (athlete: AthleteProfile): number => {
  const sessionScore = athlete.sessionHistory.length > 0
    ? athlete.sessionHistory.slice(0, 5).reduce((sum, s) => sum + (s.effectiveness || 0), 0) / 5
    : 70;
  const sleepScore = athlete.sleepData?.quality || 70;
  const sorenessScore = 100 - athlete.soreness * 10;
  const hrvScore = athlete.hrv || 70;
  const recoveryScore = (sessionScore * 0.3) + (sleepScore * 0.25) + (sorenessScore * 0.25) + (hrvScore * 0.2);
  return Math.round(recoveryScore);
};

export const calculateStreak = (sessionHistory: any[]): number => {
  const today = new Date();
  let streak = 0;
  let checkDate = new Date(today);
  const sessions = sessionHistory
    .filter((s) => s.status === 'completed')
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  for (const session of sessions) {
    const sessionDate = new Date(session.completedAt);
    const daysDiff = Math.floor((checkDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff === 0 || daysDiff === 1) {
      streak++;
      checkDate = sessionDate;
    } else {
      break;
    }
  }
  return streak;
};

export const calculateTeamMetrics = (athletes: AthleteProfile[]) => {
  const total = athletes.length;
  if (total === 0) {
    return { activeAthletes: 0, avgCompliance: 0, atRiskCount: 0, avgReadiness: 0 };
  }
  const activeCount = athletes.filter((a) => a.streak > 0).length;
  const avgCompliance = Math.round(athletes.reduce((sum, a) => sum + a.compliance, 0) / total);
  const atRiskCount = athletes.filter((a) => a.compliance < 80 || a.readiness < 70).length;
  const avgReadiness = Math.round(athletes.reduce((sum, a) => sum + a.readiness, 0) / total);
  return { activeAthletes: activeCount, avgCompliance, atRiskCount, avgReadiness };
};

export const detectAtRiskAthletes = (athletes: AthleteProfile[]) => {
  const alerts: any[] = [];
  athletes.forEach((athlete) => {
    if (athlete.streak === 0 && athlete.lastSessionDate) {
      const daysSince = Math.floor((Date.now() - athlete.lastSessionDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysSince >= 2) {
        alerts.push({
          type: 'at-risk',
          athleteId: athlete.id,
          athleteName: athlete.name,
          message: `Missed ${daysSince} days of sessions. Recovery score: ${athlete.readiness}%.`,
          action: 'Schedule check-in',
          priority: 'high',
          timestamp: new Date()
        });
      }
    }
    if (athlete.readiness < 70) {
      alerts.push({
        type: 'at-risk',
        athleteId: athlete.id,
        athleteName: athlete.name,
        message: `Low readiness: ${athlete.readiness}%. May need adjusted program.`,
        action: 'Review program',
        priority: 'high',
        timestamp: new Date()
      });
    }
    if (athlete.compliance < 80) {
      alerts.push({
        type: 'at-risk',
        athleteId: athlete.id,
        athleteName: athlete.name,
        message: `Compliance at ${athlete.compliance}%. Missing scheduled sessions.`,
        action: 'Send motivation',
        priority: 'medium',
        timestamp: new Date()
      });
    }
  });
  return alerts;
};

export const calculatePainImprovement = (user: HealthUserProfile): number => {
  const today = user.painLevel;
  const weekAgo = user.painHistory.find((p) => {
    const daysDiff = Math.floor((Date.now() - p.date.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff === 7;
  })?.level || today;
  const improvement = weekAgo - today;
  return weekAgo > 0 ? Math.round((improvement / weekAgo) * 100) : 0;
};

export const calculatePainReliefPercentage = (painLevel: number): number => {
  return Math.round((10 - painLevel) * 10);
};

export const calculateDailyProgress = (completedTasks: string[], allTasks: any[]) => {
  const percentage = (completedTasks.length / allTasks.length) * 100;
  const points = completedTasks.reduce((sum, taskId) => {
    const task = allTasks.find((t) => t.id === taskId);
    return sum + (task?.points || 0);
  }, 0);
  const maxPoints = allTasks.reduce((sum, t) => sum + t.points, 0);
  return {
    tasksCompleted: completedTasks.length,
    totalTasks: allTasks.length,
    percentage: Math.round(percentage),
    points,
    maxPoints,
    isPerfectDay: completedTasks.length === allTasks.length
  };
};

export const calculateTrend = (current: number, previous: number) => {
  const change = current - previous;
  const percentChange = previous > 0 ? (change / previous) * 100 : 0;
  return {
    direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
    value: `${change > 0 ? '+' : ''}${Math.round(percentChange)}%`,
    absolute: change
  };
};

export const formatTimeUntil = (scheduledTime: Date): string => {
  const now = new Date();
  const diff = scheduledTime.getTime() - now.getTime();
  if (diff < 0) return 'Overdue';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) {
    return `in ${hours}h ${minutes}m`;
  }
  return `in ${minutes}m`;
};
