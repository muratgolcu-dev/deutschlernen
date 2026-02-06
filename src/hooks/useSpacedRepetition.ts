'use client';
import { useMemo } from 'react';
import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { getWordsForReview, getNewWords, getWordStats } from '@/lib/services/spaced-repetition';
import { allVocabularyWords } from '@/lib/constants/vocabulary';

export function useSpacedRepetition(category?: string) {
  const { wordProgress } = useDeutschStore();
  const allWordIds = useMemo(() => {
    const words = category ? allVocabularyWords.filter((w) => w.category === category) : allVocabularyWords;
    return words.map((w) => w.id);
  }, [category]);
  const dueWords = useMemo(() => getWordsForReview(wordProgress), [wordProgress]);
  const newWords = useMemo(() => getNewWords(allWordIds, wordProgress), [allWordIds, wordProgress]);
  const stats = useMemo(() => getWordStats(wordProgress), [wordProgress]);
  return { dueWords, newWords, stats };
}
