'use client';
import { useMemo } from 'react';
import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { calculateStreak } from '@/lib/services/analytics';

export function useStreakTracker() {
  const { dailyActivities } = useDeutschStore();
  return useMemo(() => calculateStreak(dailyActivities), [dailyActivities]);
}
