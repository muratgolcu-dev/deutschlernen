'use client';
import { useMemo } from 'react';
import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { calculateStreak, getWeeklyActivity, getWordProgressOverTime } from '@/lib/services/analytics';
import { getWordStats } from '@/lib/services/spaced-repetition';

export function useDashboardData() {
  const { wordProgress, lessonProgress, dailyActivities, xp, rank, settings } = useDeutschStore();
  const wordStats = useMemo(() => getWordStats(wordProgress), [wordProgress]);
  const streak = useMemo(() => calculateStreak(dailyActivities), [dailyActivities]);
  const weeklyActivity = useMemo(() => getWeeklyActivity(dailyActivities), [dailyActivities]);
  const progressOverTime = useMemo(() => getWordProgressOverTime(wordProgress), [wordProgress]);
  const today = new Date().toISOString().split('T')[0];
  const todayActivity = dailyActivities[today];
  const lessonsCompleted = Object.values(lessonProgress).filter((l) => l.completed).length;
  return { wordStats, streak, weeklyActivity, progressOverTime, todayActivity, lessonsCompleted, totalLessons: 16, xp, rank, level: settings.currentLevel, dailyWordGoal: settings.dailyWordGoal, dailyMinuteGoal: settings.dailyMinuteGoal };
}
