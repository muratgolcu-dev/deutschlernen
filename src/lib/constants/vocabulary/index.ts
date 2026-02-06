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
    icon: '👋',
    words: greetingsWords,
  },
  {
    id: 'food',
    name: 'Essen & Trinken',
    turkishName: 'Yiyecek ve İçecek',
    icon: '🍽️',
    words: foodWords,
  },
  {
    id: 'family',
    name: 'Familie',
    turkishName: 'Aile',
    icon: '👨‍👩‍👧‍👦',
    words: familyWords,
  },
  {
    id: 'numbers',
    name: 'Zahlen',
    turkishName: 'Sayılar',
    icon: '🔢',
    words: numbersWords,
  },
  {
    id: 'colors',
    name: 'Farben',
    turkishName: 'Renkler',
    icon: '🎨',
    words: colorsWords,
  },
  {
    id: 'time',
    name: 'Zeit & Tage',
    turkishName: 'Zaman ve Günler',
    icon: '🕐',
    words: timeWords,
  },
  {
    id: 'travel',
    name: 'Reisen',
    turkishName: 'Seyahat',
    icon: '✈️',
    words: travelWords,
  },
  {
    id: 'work',
    name: 'Arbeit & Beruf',
    turkishName: 'İş ve Meslek',
    icon: '💼',
    words: workWords,
  },
  {
    id: 'shopping',
    name: 'Einkaufen',
    turkishName: 'Alışveriş',
    icon: '🛒',
    words: shoppingWords,
  },
  {
    id: 'body',
    name: 'Körper & Gesundheit',
    turkishName: 'Vücut ve Sağlık',
    icon: '🏥',
    words: bodyWords,
  },
  {
    id: 'home',
    name: 'Zuhause',
    turkishName: 'Ev',
    icon: '🏠',
    words: homeWords,
  },
  {
    id: 'nature',
    name: 'Natur & Wetter',
    turkishName: 'Doğa ve Hava',
    icon: '🌿',
    words: natureWords,
  },
];

export const allVocabularyWords = vocabularyCategories.flatMap((c) => c.words);

export function getWordById(id: string) {
  return allVocabularyWords.find((w) => w.id === id);
}

export function getWordsByCategory(categoryId: string) {
  return vocabularyCategories.find((c) => c.id === categoryId)?.words ?? [];
}

export function getWordsByLevel(level: string) {
  return allVocabularyWords.filter((w) => w.level === level);
}
