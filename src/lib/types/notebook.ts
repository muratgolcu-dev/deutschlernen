import { CEFRLevel } from './vocabulary';
import { GrammarExercise } from './grammar';

export interface NotebookPageMeta {
  id: string;
  title: string;
  thumbnailData: string;
  aiAnalysis?: ImageAnalysis;
  createdAt: string;
  tags: string[];
  level: CEFRLevel;
}

export interface ImageAnalysis {
  extractedText: string;
  vocabulary: ExtractedWord[];
  grammarTopics: string[];
  exercises: GrammarExercise[];
  summary: string;
}

export interface ExtractedWord {
  german: string;
  turkish: string;
  article?: string;
  context?: string;
}

export interface StudySet {
  id: string;
  notebookPageId: string;
  generatedExercises: GrammarExercise[];
  vocabulary: ExtractedWord[];
  createdAt: string;
}
