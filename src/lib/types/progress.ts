export interface DailyActivity {
  date: string;
  wordsReviewed: number;
  wordsLearned: number;
  minutesPracticed: number;
  lessonsCompleted: number;
  conversationMessages: number;
  xpEarned: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
}

export type RankTitle = 'Anfänger' | 'Lerner' | 'Entdecker' | 'Sprecher' | 'Kenner' | 'Meister' | 'Experte';

export interface RankInfo {
  title: RankTitle;
  minXP: number;
  icon: string;
}

export interface BadgeState {
  earned: boolean;
  earnedAt: string | null;
}

export interface Badge {
  id: string;
  name: string;
  turkishName: string;
  description: string;
  icon: string;
  condition: string;
}

export interface DailyChallenge {
  id: string;
  description: string;
  turkishDescription: string;
  target: number;
  progress: number;
  completed: boolean;
  date: string;
  xpReward: number;
}
