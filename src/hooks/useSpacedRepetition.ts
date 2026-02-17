'use client';
import { useMemo } from 'react';
import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { getWordsForReview, getNewWords, getWordStats } from '@/lib/services/spaced-repetition';
import { allVocabularyWords } from '@/lib/constants/vocabulary';

export function useSpacedRepetition(category?: string) {
  const { wordProgress, customCategories } = useDeutschStore();

  const allWordIds = useMemo(() => {
    // Combine built-in and custom vocabulary words
    const customWords = customCategories.flatMap((c) => c.words);
    const combinedWords = [...allVocabularyWords, ...customWords];

    const words = category
      ? combinedWords.filter((w) => w.category === category)
      : combinedWords;
    return words.map((w) => w.id);
  }, [category, customCategories]);

  const dueWords = useMemo(() => getWordsForReview(wordProgress), [wordProgress]);
  const newWords = useMemo(() => getNewWords(allWordIds, wordProgress), [allWordIds, wordProgress]);
  const stats = useMemo(() => getWordStats(wordProgress), [wordProgress]);
  return { dueWords, newWords, stats };
}
