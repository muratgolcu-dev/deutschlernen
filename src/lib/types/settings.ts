import { CEFRLevel } from './vocabulary';

export type NativeLanguage = 'tr' | 'en';

export interface UserSettings {
  nativeLanguage: NativeLanguage | null;
  anthropicApiKey: string;
  currentLevel: CEFRLevel;
  dailyWordGoal: number;
  dailyMinuteGoal: number;
  theme: 'light' | 'dark' | 'system';
  speechRate: number;
  speechVoice: string;
  flashcardAutoPlay: boolean;
  showTranslationHints: boolean;
}
