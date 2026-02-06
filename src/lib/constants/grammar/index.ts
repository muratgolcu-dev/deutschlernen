import { a1Articles } from './a1-articles';
import { a1PresentTense } from './a1-present-tense';
import { a1NounGenders } from './a1-noun-genders';
import { a1BasicSentences } from './a1-basic-sentences';
import { a1NumbersTime } from './a1-numbers-time';
import { a2Akkusativ } from './a2-akkusativ';
import { a2Dativ } from './a2-dativ';
import { a2ModalVerbs } from './a2-modal-verbs';
import { a2PastTense } from './a2-past-tense';
import { a2Prepositions } from './a2-prepositions';
import { b1Genitiv } from './b1-genitiv';
import { GrammarLesson } from '@/lib/types';

export const allGrammarLessons: GrammarLesson[] = [
  a1Articles, a1PresentTense, a1NounGenders, a1BasicSentences, a1NumbersTime,
  a2Akkusativ, a2Dativ, a2ModalVerbs, a2PastTense, a2Prepositions,
  b1Genitiv,
].sort((a, b) => a.order - b.order);

export function getLessonsByLevel(level: string): GrammarLesson[] {
  return allGrammarLessons.filter((l) => l.level === level);
}

export function getLessonById(id: string): GrammarLesson | undefined {
  return allGrammarLessons.find((l) => l.id === id);
}
