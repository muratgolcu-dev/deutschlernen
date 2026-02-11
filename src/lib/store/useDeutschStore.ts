import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  WordProgress,
  WordStatus,
  LessonProgress,
  Conversation,
  ChatMessage,
  NotebookPageMeta,
  DailyActivity,
  BadgeState,
  DailyChallenge,
  UserSettings,
  CEFRLevel,
} from '@/lib/types';

const RANKS = [
  { title: 'Anfänger', minXP: 0 },
  { title: 'Lerner', minXP: 100 },
  { title: 'Entdecker', minXP: 500 },
  { title: 'Sprecher', minXP: 1500 },
  { title: 'Kenner', minXP: 4000 },
  { title: 'Meister', minXP: 8000 },
  { title: 'Experte', minXP: 15000 },
] as const;

const DAILY_CHALLENGES = [
  { id: 'review-15', description: 'Review 15 flashcards', turkishDescription: '15 kelime kartı çalış', target: 15, type: 'wordsReviewed' },
  { id: 'learn-5', description: 'Learn 5 new words', turkishDescription: '5 yeni kelime öğren', target: 5, type: 'wordsLearned' },
  { id: 'grammar-1', description: 'Complete a grammar lesson', turkishDescription: 'Bir gramer dersi tamamla', target: 1, type: 'lessonsCompleted' },
  { id: 'master-5', description: 'Master 5 words', turkishDescription: '5 kelimeyi ustalaş', target: 5, type: 'wordsMastered' },
  { id: 'practice-10', description: 'Practice for 10 minutes', turkishDescription: '10 dakika çalış', target: 10, type: 'minutesPracticed' },
];

function getRank(xp: number): string {
  let rank: string = RANKS[0].title;
  for (const r of RANKS) {
    if (xp >= r.minXP) rank = r.title as string;
  }
  return rank;
}

function getTodayStr(): string {
  return new Date().toISOString().split('T')[0];
}

interface DeutschState {
  wordProgress: Record<string, WordProgress>;
  lessonProgress: Record<string, LessonProgress>;
  conversations: Conversation[];
  activeConversationId: string | null;
  notebookPages: NotebookPageMeta[];
  dailyActivities: Record<string, DailyActivity>;
  settings: UserSettings;
  xp: number;
  rank: string;
  badges: Record<string, BadgeState>;
  dailyChallenge: DailyChallenge;
  showLevelUp: boolean;
  lastXPGain: { amount: number; timestamp: number } | null;

  recordReview: (wordId: string, quality: number) => void;
  initWordProgress: (wordId: string) => void;
  completeLessonExercise: (lessonId: string, exerciseId: string, correct: boolean) => void;
  completeLessonAttempt: (lessonId: string, score: number) => void;
  addConversation: (conversation: Conversation) => void;
  setActiveConversation: (id: string | null) => void;
  addMessage: (conversationId: string, message: ChatMessage) => void;
  deleteConversation: (id: string) => void;
  addNotebookPage: (page: NotebookPageMeta) => void;
  updateNotebookPage: (id: string, updates: Partial<NotebookPageMeta>) => void;
  deleteNotebookPage: (id: string) => void;
  recordActivity: (updates: Partial<DailyActivity>) => void;
  addXP: (amount: number) => void;
  checkBadges: () => void;
  generateDailyChallenge: () => void;
  updateChallengeProgress: (type: string, amount: number) => void;
  dismissLevelUp: () => void;
  updateSettings: (partial: Partial<UserSettings>) => void;
  resetAllData: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
}

const defaultSettings: UserSettings = {
  nativeLanguage: null,
  anthropicApiKey: '',
  currentLevel: 'A1',
  dailyWordGoal: 10,
  dailyMinuteGoal: 15,
  theme: 'system',
  speechRate: 0.8,
  speechVoice: '',
  flashcardAutoPlay: false,
  showTranslationHints: true,
};

const defaultDailyChallenge: DailyChallenge = {
  id: '',
  description: '',
  turkishDescription: '',
  target: 0,
  progress: 0,
  completed: false,
  date: '',
  xpReward: 50,
};

const initialBadges: Record<string, BadgeState> = {
  'erste-schritte': { earned: false, earnedAt: null },
  'wortschatz-50': { earned: false, earnedAt: null },
  'wortschatz-100': { earned: false, earnedAt: null },
  'wortschatz-250': { earned: false, earnedAt: null },
  'grammatik-held': { earned: false, earnedAt: null },
  'flamme-7': { earned: false, earnedAt: null },
  'flamme-30': { earned: false, earnedAt: null },
  'gespraech-10': { earned: false, earnedAt: null },
  'buecherwurm-10': { earned: false, earnedAt: null },
  'perfektionist': { earned: false, earnedAt: null },
  'nachtlerner': { earned: false, earnedAt: null },
  'schnelllernen': { earned: false, earnedAt: null },
};

export const useDeutschStore = create<DeutschState>()(
  persist(
    (set, get) => ({
      wordProgress: {},
      lessonProgress: {},
      conversations: [],
      activeConversationId: null,
      notebookPages: [],
      dailyActivities: {},
      settings: defaultSettings,
      xp: 0,
      rank: 'Anfänger',
      badges: initialBadges,
      dailyChallenge: defaultDailyChallenge,
      showLevelUp: false,
      lastXPGain: null,

      recordReview: (wordId, quality) => {
        set((state) => {
          const existing = state.wordProgress[wordId] || {
            wordId, status: 'new' as WordStatus, easeFactor: 2.5, interval: 0,
            repetitions: 0, nextReviewDate: getTodayStr(), lastReviewDate: null,
            correctCount: 0, incorrectCount: 0,
          };
          const correct = quality >= 3;
          let { easeFactor, interval, repetitions } = existing;
          if (quality < 3) { repetitions = 0; interval = 1; }
          else {
            repetitions += 1;
            if (repetitions === 1) interval = 1;
            else if (repetitions === 2) interval = 6;
            else interval = Math.round(interval * easeFactor);
          }
          easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
          let status: WordStatus = 'learning';
          if (interval >= 21) status = 'mastered';
          else if (interval >= 7) status = 'review';
          const nextDate = new Date();
          nextDate.setDate(nextDate.getDate() + interval);
          return {
            wordProgress: {
              ...state.wordProgress,
              [wordId]: {
                ...existing, status, easeFactor, interval, repetitions,
                nextReviewDate: nextDate.toISOString().split('T')[0],
                lastReviewDate: getTodayStr(),
                correctCount: existing.correctCount + (correct ? 1 : 0),
                incorrectCount: existing.incorrectCount + (correct ? 0 : 1),
              },
            },
          };
        });
        const xpAmount = quality === 5 ? 10 : quality >= 3 ? 5 : 2;
        get().addXP(xpAmount);
        get().recordActivity({ wordsReviewed: 1, wordsLearned: quality >= 3 ? 1 : 0 });
        get().updateChallengeProgress('wordsReviewed', 1);
        if (quality >= 3) get().updateChallengeProgress('wordsLearned', 1);
        get().checkBadges();
      },

      initWordProgress: (wordId) => {
        set((state) => {
          if (state.wordProgress[wordId]) return state;
          return {
            wordProgress: {
              ...state.wordProgress,
              [wordId]: {
                wordId, status: 'new' as WordStatus, easeFactor: 2.5, interval: 0,
                repetitions: 0, nextReviewDate: getTodayStr(), lastReviewDate: null,
                correctCount: 0, incorrectCount: 0,
              },
            },
          };
        });
      },

      completeLessonExercise: (lessonId, exerciseId, correct) => {
        set((state) => {
          const existing = state.lessonProgress[lessonId] || {
            lessonId, completed: false, score: 0, bestScore: 0,
            attempts: 0, exerciseResults: {}, lastAttemptDate: null,
          };
          return {
            lessonProgress: {
              ...state.lessonProgress,
              [lessonId]: { ...existing, exerciseResults: { ...existing.exerciseResults, [exerciseId]: correct } },
            },
          };
        });
        get().addXP(correct ? 10 : 5);
      },

      completeLessonAttempt: (lessonId, score) => {
        set((state) => {
          const existing = state.lessonProgress[lessonId] || {
            lessonId, completed: false, score: 0, bestScore: 0,
            attempts: 0, exerciseResults: {}, lastAttemptDate: null,
          };
          return {
            lessonProgress: {
              ...state.lessonProgress,
              [lessonId]: {
                ...existing, completed: true, score,
                bestScore: Math.max(existing.bestScore, score),
                attempts: existing.attempts + 1, lastAttemptDate: getTodayStr(),
              },
            },
          };
        });
        get().recordActivity({ lessonsCompleted: 1 });
        get().updateChallengeProgress('lessonsCompleted', 1);
        get().checkBadges();
      },

      addConversation: (conversation) => set((state) => ({
        conversations: [conversation, ...state.conversations],
        activeConversationId: conversation.id,
      })),

      setActiveConversation: (id) => set({ activeConversationId: id }),

      addMessage: (conversationId, message) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? { ...c, messages: [...c.messages, message], updatedAt: new Date().toISOString() }
              : c
          ),
        }));
        if (message.role === 'user') {
          get().addXP(3);
          get().recordActivity({ conversationMessages: 1 });
        }
      },

      deleteConversation: (id) => set((state) => ({
        conversations: state.conversations.filter((c) => c.id !== id),
        activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
      })),

      addNotebookPage: (page) => {
        set((state) => ({ notebookPages: [page, ...state.notebookPages] }));
        get().addXP(20);
        get().checkBadges();
      },

      updateNotebookPage: (id, updates) => set((state) => ({
        notebookPages: state.notebookPages.map((p) => p.id === id ? { ...p, ...updates } : p),
      })),

      deleteNotebookPage: (id) => set((state) => ({
        notebookPages: state.notebookPages.filter((p) => p.id !== id),
      })),

      recordActivity: (updates) => {
        const today = getTodayStr();
        set((state) => {
          const existing = state.dailyActivities[today] || {
            date: today, wordsReviewed: 0, wordsLearned: 0, minutesPracticed: 0,
            lessonsCompleted: 0, conversationMessages: 0, xpEarned: 0,
          };
          return {
            dailyActivities: {
              ...state.dailyActivities,
              [today]: {
                ...existing,
                wordsReviewed: existing.wordsReviewed + (updates.wordsReviewed || 0),
                wordsLearned: existing.wordsLearned + (updates.wordsLearned || 0),
                minutesPracticed: existing.minutesPracticed + (updates.minutesPracticed || 0),
                lessonsCompleted: existing.lessonsCompleted + (updates.lessonsCompleted || 0),
                conversationMessages: existing.conversationMessages + (updates.conversationMessages || 0),
                xpEarned: existing.xpEarned + (updates.xpEarned || 0),
              },
            },
          };
        });
      },

      addXP: (amount) => {
        set((state) => {
          const newXP = state.xp + amount;
          const oldRank = state.rank;
          const newRank = getRank(newXP);
          return {
            xp: newXP, rank: newRank,
            showLevelUp: newRank !== oldRank ? true : state.showLevelUp,
            lastXPGain: { amount, timestamp: Date.now() },
          };
        });
        get().recordActivity({ xpEarned: amount });
      },

      checkBadges: () => {
        set((state) => {
          const badges = { ...state.badges };
          const now = new Date().toISOString();
          const today = getTodayStr();
          const totalReviews = Object.values(state.wordProgress).filter(w => w.lastReviewDate).length;
          if (totalReviews >= 1 && !badges['erste-schritte']?.earned) badges['erste-schritte'] = { earned: true, earnedAt: now };
          const mastered = Object.values(state.wordProgress).filter(w => w.status === 'mastered').length;
          if (mastered >= 50 && !badges['wortschatz-50']?.earned) badges['wortschatz-50'] = { earned: true, earnedAt: now };
          if (mastered >= 100 && !badges['wortschatz-100']?.earned) badges['wortschatz-100'] = { earned: true, earnedAt: now };
          if (mastered >= 250 && !badges['wortschatz-250']?.earned) badges['wortschatz-250'] = { earned: true, earnedAt: now };
          const perfectLessons = Object.values(state.lessonProgress).filter(l => l.bestScore === 100).length;
          if (perfectLessons >= 5 && !badges['grammatik-held']?.earned) badges['grammatik-held'] = { earned: true, earnedAt: now };
          const dates = Object.keys(state.dailyActivities).sort().reverse();
          let streak = 0;
          for (let i = 0; i < dates.length; i++) {
            const expected = new Date(); expected.setDate(expected.getDate() - i);
            if (dates.includes(expected.toISOString().split('T')[0])) streak++; else break;
          }
          if (streak >= 7 && !badges['flamme-7']?.earned) badges['flamme-7'] = { earned: true, earnedAt: now };
          if (streak >= 30 && !badges['flamme-30']?.earned) badges['flamme-30'] = { earned: true, earnedAt: now };
          if (state.conversations.length >= 10 && !badges['gespraech-10']?.earned) badges['gespraech-10'] = { earned: true, earnedAt: now };
          if (state.notebookPages.length >= 10 && !badges['buecherwurm-10']?.earned) badges['buecherwurm-10'] = { earned: true, earnedAt: now };
          if (new Date().getHours() >= 22 && !badges['nachtlerner']?.earned) badges['nachtlerner'] = { earned: true, earnedAt: now };
          const todayActivity = state.dailyActivities[today];
          if (todayActivity && todayActivity.wordsLearned >= 20 && !badges['schnelllernen']?.earned) badges['schnelllernen'] = { earned: true, earnedAt: now };
          return { badges };
        });
      },

      generateDailyChallenge: () => {
        const today = getTodayStr();
        if (get().dailyChallenge.date === today) return;
        const seed = today.split('-').join('');
        const index = parseInt(seed) % DAILY_CHALLENGES.length;
        const challenge = DAILY_CHALLENGES[index];
        set({
          dailyChallenge: {
            id: challenge.id, description: challenge.description,
            turkishDescription: challenge.turkishDescription, target: challenge.target,
            progress: 0, completed: false, date: today, xpReward: 50,
          },
        });
      },

      updateChallengeProgress: (type, amount) => {
        set((state) => {
          const challenge = state.dailyChallenge;
          if (challenge.completed || challenge.date !== getTodayStr()) return state;
          const challengeType = DAILY_CHALLENGES.find(c => c.id === challenge.id)?.type;
          if (challengeType !== type) return state;
          const newProgress = Math.min(challenge.progress + amount, challenge.target);
          const completed = newProgress >= challenge.target;
          if (completed && !challenge.completed) setTimeout(() => get().addXP(challenge.xpReward), 0);
          return { dailyChallenge: { ...challenge, progress: newProgress, completed } };
        });
      },

      dismissLevelUp: () => set({ showLevelUp: false }),

      updateSettings: (partial) => set((state) => ({ settings: { ...state.settings, ...partial } })),

      resetAllData: () => set({
        wordProgress: {}, lessonProgress: {}, conversations: [],
        activeConversationId: null, notebookPages: [], dailyActivities: {},
        settings: defaultSettings, xp: 0, rank: 'Anfänger', badges: initialBadges,
        dailyChallenge: defaultDailyChallenge, showLevelUp: false, lastXPGain: null,
      }),

      exportData: () => {
        const state = get();
        return JSON.stringify({
          wordProgress: state.wordProgress, lessonProgress: state.lessonProgress,
          conversations: state.conversations, notebookPages: state.notebookPages,
          dailyActivities: state.dailyActivities, settings: state.settings,
          xp: state.xp, rank: state.rank, badges: state.badges,
        });
      },

      importData: (json) => {
        try {
          const data = JSON.parse(json);
          set({
            wordProgress: data.wordProgress || {}, lessonProgress: data.lessonProgress || {},
            conversations: data.conversations || [], notebookPages: data.notebookPages || [],
            dailyActivities: data.dailyActivities || {}, settings: { ...defaultSettings, ...data.settings },
            xp: data.xp || 0, rank: data.rank || 'Anfänger', badges: { ...initialBadges, ...data.badges },
          });
          return true;
        } catch { return false; }
      },
    }),
    { name: 'deutschlernen-storage', version: 1 }
  )
);
