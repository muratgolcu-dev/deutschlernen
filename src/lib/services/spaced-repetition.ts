import { WordProgress, WordStatus } from '@/lib/types';

export function getWordsForReview(wordProgress: Record<string, WordProgress>, limit: number = 20): string[] {
  const today = new Date().toISOString().split('T')[0];
  return Object.values(wordProgress)
    .filter((wp) => wp.nextReviewDate <= today && wp.status !== 'new')
    .sort((a, b) => a.nextReviewDate.localeCompare(b.nextReviewDate))
    .slice(0, limit)
    .map((wp) => wp.wordId);
}

export function getNewWords(allWordIds: string[], wordProgress: Record<string, WordProgress>, limit: number = 10): string[] {
  return allWordIds.filter((id) => !wordProgress[id] || wordProgress[id].status === 'new').slice(0, limit);
}

export function getWordStats(wordProgress: Record<string, WordProgress>) {
  const values = Object.values(wordProgress);
  return {
    total: values.length,
    new: values.filter((w) => w.status === 'new').length,
    learning: values.filter((w) => w.status === 'learning').length,
    review: values.filter((w) => w.status === 'review').length,
    mastered: values.filter((w) => w.status === 'mastered').length,
    dueToday: values.filter((w) => w.nextReviewDate <= new Date().toISOString().split('T')[0] && w.status !== 'new').length,
  };
}
