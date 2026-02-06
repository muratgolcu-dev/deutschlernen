import { CEFRLevel } from './vocabulary';

export interface UserSettings {
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
