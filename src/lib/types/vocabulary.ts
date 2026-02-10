export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2';
export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | 'article' | 'phrase';
export type Article = 'der' | 'die' | 'das' | 'die (pl)' | null;
export type WordStatus = 'new' | 'learning' | 'review' | 'mastered';
export type FlashcardMode = 'de-tr' | 'tr-de' | 'listening';

export interface VocabularyWord {
  id: string;
  german: string;
  turkish: string;
  article: Article;
  plural?: string;
  partOfSpeech: PartOfSpeech;
  synonyms?: string[];
  antonyms?: string[];
  collocations?: string[];
  emoji?: string;
  exampleSentence: string;
  exampleTranslation: string;
  category: string;
  level: CEFRLevel;
  tags?: string[];
}

export interface WordProgress {
  wordId: string;
  status: WordStatus;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: string;
  lastReviewDate: string | null;
  correctCount: number;
  incorrectCount: number;
}

export interface VocabularyCategory {
  id: string;
  name: string;
  turkishName: string;
  icon: string;
  words: VocabularyWord[];
}

export interface ReviewSession {
  mode: FlashcardMode;
  words: string[];
  currentIndex: number;
  results: ReviewResult[];
  startedAt: string;
  completedAt?: string;
}

export interface ReviewResult {
  wordId: string;
  quality: number;
  correct: boolean;
  timeSpent: number;
}
