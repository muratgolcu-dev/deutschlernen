import { DailyActivity, WordProgress } from '@/lib/types';

export function calculateStreak(activities: Record<string, DailyActivity>): { currentStreak: number; longestStreak: number } {
  const dates = Object.keys(activities).filter((d) => {
    const a = activities[d];
    return a.wordsReviewed > 0 || a.lessonsCompleted > 0 || a.conversationMessages > 0;
  }).sort().reverse();
  if (dates.length === 0) return { currentStreak: 0, longestStreak: 0 };
  let currentStreak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today); checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];
    if (dates.includes(dateStr)) currentStreak++;
    else if (i === 0) continue;
    else break;
  }
  let longestStreak = 0, tempStreak = 0;
  const sortedDates = [...dates].sort();
  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) { tempStreak = 1; }
    else {
      const prev = new Date(sortedDates[i - 1]); const curr = new Date(sortedDates[i]);
      const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
      tempStreak = diffDays === 1 ? tempStreak + 1 : 1;
    }
    longestStreak = Math.max(longestStreak, tempStreak);
  }
  return { currentStreak, longestStreak };
}

export function getWeeklyActivity(activities: Record<string, DailyActivity>): DailyActivity[] {
  const result: DailyActivity[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today); date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    result.push(activities[dateStr] || { date: dateStr, wordsReviewed: 0, wordsLearned: 0, minutesPracticed: 0, lessonsCompleted: 0, conversationMessages: 0, xpEarned: 0 });
  }
  return result;
}

export function getWordProgressOverTime(wordProgress: Record<string, WordProgress>): { date: string; mastered: number; learning: number; review: number }[] {
  const dateMap = new Map<string, { mastered: number; learning: number; review: number }>();
  Object.values(wordProgress).forEach((wp) => {
    if (wp.lastReviewDate) {
      const existing = dateMap.get(wp.lastReviewDate) || { mastered: 0, learning: 0, review: 0 };
      if (wp.status === 'mastered') existing.mastered++;
      else if (wp.status === 'review') existing.review++;
      else if (wp.status === 'learning') existing.learning++;
      dateMap.set(wp.lastReviewDate, existing);
    }
  });
  return Array.from(dateMap.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([date, counts]) => ({ date, ...counts }));
}
