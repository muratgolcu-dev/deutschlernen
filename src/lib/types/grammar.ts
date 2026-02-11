import { CEFRLevel } from './vocabulary';

export type ExerciseType = 'fill-in-the-blank' | 'multiple-choice' | 'word-ordering' | 'conjugation-table';

export interface GrammarLesson {
  id: string;
  title: string;
  turkishTitle: string;
  englishTitle?: string;
  level: CEFRLevel;
  order: number;
  description?: string;
  explanation: string;
  explanationEn?: string;
  examples: GrammarExample[];
  exercises: GrammarExercise[];
  tips: string[];
  tipsEn?: string[];
}

export interface GrammarExample {
  german: string;
  turkish: string;
  english?: string;
  highlight?: string;
}

export interface GrammarExercise {
  id: string;
  type: ExerciseType;
  question: string;
  instruction?: string;
  data: FillInBlankData | MultipleChoiceData | WordOrderingData | ConjugationTableData;
}

export interface FillInBlankData {
  sentence?: string;
  blanks?: { answer: string; alternatives?: string[] }[];
  answer?: string;
  acceptableAnswers?: string[];
  hint?: string;
}

export interface MultipleChoiceData {
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface WordOrderingData {
  words: string[];
  correctOrder: number[];
  translation: string;
}

export interface ConjugationTableData {
  verb: string;
  tense?: string;
  pronouns: string[];
  answers: string[];
  hints?: string[];
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  bestScore: number;
  attempts: number;
  exerciseResults: Record<string, boolean>;
  lastAttemptDate: string | null;
}
