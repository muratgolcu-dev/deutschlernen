import { VocabularyCategory } from '@/lib/types';
import { greetingsWords } from './greetings';
import { foodWords } from './food';
import { familyWords } from './family';
import { numbersWords } from './numbers';
import { colorsWords } from './colors';
import { timeWords } from './time';
import { travelWords } from './travel';
import { workWords } from './work';
import { shoppingWords } from './shopping';
import { bodyWords } from './body';
import { homeWords } from './home';
import { natureWords } from './nature';

export const vocabularyCategories: VocabularyCategory[] = [
  {
    id: 'greetings',
    name: 'Begrüßungen',
    turkishName: 'Selamlaşma',
    englishName: 'Greetings',
    icon: '👋',
    words: greetingsWords,
  },
  {
    id: 'food',
    name: 'Essen & Trinken',
    turkishName: 'Yiyecek ve İçecek',
    englishName: 'Food & Drinks',
    icon: '🍽️',
    words: foodWords,
  },
  {
    id: 'family',
    name: 'Familie',
    turkishName: 'Aile',
    englishName: 'Family',
    icon: '👨‍👩‍👧‍👦',
    words: familyWords,
  },
  {
    id: 'numbers',
    name: 'Zahlen',
    turkishName: 'Sayılar',
    englishName: 'Numbers',
    icon: '🔢',
    words: numbersWords,
  },
  {
    id: 'colors',
    name: 'Farben',
    turkishName: 'Renkler',
    englishName: 'Colors',
    icon: '🎨',
    words: colorsWords,
  },
  {
    id: 'time',
    name: 'Zeit & Tage',
    turkishName: 'Zaman ve Günler',
    englishName: 'Time & Days',
    icon: '🕐',
    words: timeWords,
  },
  {
    id: 'travel',
    name: 'Reisen',
    turkishName: 'Seyahat',
    englishName: 'Travel',
    icon: '✈️',
    words: travelWords,
  },
  {
    id: 'work',
    name: 'Arbeit & Beruf',
    turkishName: 'İş ve Meslek',
    englishName: 'Work & Career',
    icon: '💼',
    words: workWords,
  },
  {
    id: 'shopping',
    name: 'Einkaufen',
    turkishName: 'Alışveriş',
    englishName: 'Shopping',
    icon: '🛒',
    words: shoppingWords,
  },
  {
    id: 'body',
    name: 'Körper & Gesundheit',
    turkishName: 'Vücut ve Sağlık',
    englishName: 'Body & Health',
    icon: '🏥',
    words: bodyWords,
  },
  {
    id: 'home',
    name: 'Zuhause',
    turkishName: 'Ev',
    englishName: 'Home',
    icon: '🏠',
    words: homeWords,
  },
  {
    id: 'nature',
    name: 'Natur & Wetter',
    turkishName: 'Doğa ve Hava',
    englishName: 'Nature & Weather',
    icon: '🌿',
    words: natureWords,
  },
];

export const allVocabularyWords = vocabularyCategories.flatMap((c) => c.words);

export function getWordById(id: string, customWords?: import('@/lib/types').VocabularyWord[]) {
  const found = allVocabularyWords.find((w) => w.id === id);
  if (found) return found;
  return customWords?.find((w) => w.id === id);
}

export function getWordsByCategory(categoryId: string) {
  return vocabularyCategories.find((c) => c.id === categoryId)?.words ?? [];
}

export function getWordsByLevel(level: string) {
  return allVocabularyWords.filter((w) => w.level === level);
}
