import { allGrammarLessons } from '@/lib/constants/grammar';
import { allVocabularyWords } from '@/lib/constants/vocabulary';
import { GrammarExercise, MultipleChoiceData } from '@/lib/types';
import { CEFRLevel } from '@/lib/types/vocabulary';

export interface QuizDefinition {
  id: string;
  title: string;
  titleEn: string;
  level: CEFRLevel;
  type: 'grammar' | 'vocabulary' | 'mixed';
  description: string;
  descriptionEn: string;
  questionCount: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationEn: string;
  topic: string;
  topicEn: string;
}

// --- Quiz definitions: at least 3 per level ---

export const quizDefinitions: QuizDefinition[] = [
  // A1
  { id: 'a1-grammar-1', title: 'Artikeller ve İsim Cinsiyetleri', titleEn: 'Articles & Noun Genders', level: 'A1', type: 'grammar', description: 'der, die, das ve isim cinsiyet kuralları', descriptionEn: 'der, die, das and noun gender rules', questionCount: 10 },
  { id: 'a1-vocab-1', title: 'Temel Kelimeler', titleEn: 'Basic Words', level: 'A1', type: 'vocabulary', description: 'Günlük hayat kelimeleri', descriptionEn: 'Everyday vocabulary', questionCount: 10 },
  { id: 'a1-mixed-1', title: 'A1 Genel Test', titleEn: 'A1 General Test', level: 'A1', type: 'mixed', description: 'Gramer ve kelime karışık', descriptionEn: 'Mixed grammar and vocabulary', questionCount: 10 },

  // A2
  { id: 'a2-grammar-1', title: 'Akkusativ & Dativ', titleEn: 'Accusative & Dative', level: 'A2', type: 'grammar', description: 'Akkusativ ve Dativ halleri', descriptionEn: 'Accusative and dative cases', questionCount: 10 },
  { id: 'a2-vocab-1', title: 'Günlük Yaşam Kelimeleri', titleEn: 'Daily Life Vocabulary', level: 'A2', type: 'vocabulary', description: 'Yemek, seyahat, alışveriş', descriptionEn: 'Food, travel, shopping', questionCount: 10 },
  { id: 'a2-mixed-1', title: 'A2 Genel Test', titleEn: 'A2 General Test', level: 'A2', type: 'mixed', description: 'Gramer ve kelime karışık', descriptionEn: 'Mixed grammar and vocabulary', questionCount: 10 },

  // B1
  { id: 'b1-grammar-1', title: 'Yan Cümleler & Genitiv', titleEn: 'Subordinate Clauses & Genitive', level: 'B1', type: 'grammar', description: 'Nebensätze, Passiv, Genitiv', descriptionEn: 'Nebensätze, Passiv, Genitive case', questionCount: 10 },
  { id: 'b1-vocab-1', title: 'B1 Kelime Hazinesi', titleEn: 'B1 Vocabulary', level: 'B1', type: 'vocabulary', description: 'İş, sağlık, çevre kelimeleri', descriptionEn: 'Work, health, environment words', questionCount: 10 },
  { id: 'b1-mixed-1', title: 'B1 Genel Test', titleEn: 'B1 General Test', level: 'B1', type: 'mixed', description: 'Gramer ve kelime karışık', descriptionEn: 'Mixed grammar and vocabulary', questionCount: 10 },

  // B2
  { id: 'b2-grammar-1', title: 'Konjunktiv & Konnektoren', titleEn: 'Subjunctive & Connectors', level: 'B2', type: 'grammar', description: 'Konjunktiv I/II, Partizip, Konnektoren', descriptionEn: 'Subjunctive I/II, Participles, Connectors', questionCount: 10 },
  { id: 'b2-vocab-1', title: 'B2 İleri Kelimeler', titleEn: 'B2 Advanced Vocabulary', level: 'B2', type: 'vocabulary', description: 'Akademik ve profesyonel kelimeler', descriptionEn: 'Academic and professional words', questionCount: 10 },
  { id: 'b2-mixed-1', title: 'B2 Genel Test', titleEn: 'B2 General Test', level: 'B2', type: 'mixed', description: 'Gramer ve kelime karışık', descriptionEn: 'Mixed grammar and vocabulary', questionCount: 10 },
];

// --- Generate quiz questions dynamically ---

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateGrammarQuestions(level: CEFRLevel, count: number): QuizQuestion[] {
  const lessons = allGrammarLessons.filter(l => l.level === level);
  const allExercises: { exercise: GrammarExercise; lessonTitle: string; lessonTitleEn: string }[] = [];

  for (const lesson of lessons) {
    for (const ex of lesson.exercises) {
      allExercises.push({
        exercise: ex,
        lessonTitle: lesson.turkishTitle,
        lessonTitleEn: lesson.englishTitle || lesson.turkishTitle,
      });
    }
  }

  const shuffled = shuffleArray(allExercises);
  const selected = shuffled.slice(0, count);

  return selected.map((item, i) => {
    const ex = item.exercise;
    if (ex.type === 'multiple-choice') {
      const data = ex.data as MultipleChoiceData;
      return {
        id: `gq-${level}-${i}`,
        question: ex.question,
        options: data.options,
        correctIndex: data.correctIndex,
        explanation: ex.explanation || data.explanation || '',
        explanationEn: ex.explanationEn || '',
        topic: item.lessonTitle,
        topicEn: item.lessonTitleEn,
      };
    } else {
      // Convert fill-in-the-blank to multiple choice
      const data = ex.data as { answer?: string; blanks?: { answer: string; alternatives?: string[] }[]; hint?: string };
      const correctAnswer = data.answer || data.blanks?.[0]?.answer || '';
      const distractors = generateDistractors(correctAnswer, level);
      const options = shuffleArray([correctAnswer, ...distractors]);
      return {
        id: `gq-${level}-${i}`,
        question: ex.question,
        options,
        correctIndex: options.indexOf(correctAnswer),
        explanation: ex.explanation || '',
        explanationEn: ex.explanationEn || '',
        topic: item.lessonTitle,
        topicEn: item.lessonTitleEn,
      };
    }
  });
}

function generateDistractors(correct: string, level: CEFRLevel): string[] {
  // Common German grammar distractors based on pattern
  const articleSets: Record<string, string[]> = {
    'der': ['die', 'das', 'den'],
    'die': ['der', 'das', 'dem'],
    'das': ['der', 'die', 'den'],
    'den': ['der', 'die', 'dem'],
    'dem': ['der', 'den', 'des'],
    'des': ['der', 'dem', 'den'],
    'ein': ['eine', 'einen', 'einem'],
    'eine': ['ein', 'einen', 'einem'],
    'einen': ['ein', 'eine', 'einem'],
    'einem': ['ein', 'eine', 'einen'],
    'mich': ['mir', 'mein', 'ich'],
    'mir': ['mich', 'mein', 'ich'],
    'ihn': ['ihm', 'er', 'ihr'],
    'ihm': ['ihn', 'er', 'ihr'],
  };

  const lower = correct.toLowerCase();
  if (articleSets[lower]) {
    return articleSets[lower].slice(0, 3);
  }

  // Verb conjugation distractors
  const verbEndings = ['e', 'st', 't', 'en', 'et'];
  if (verbEndings.some(e => lower.endsWith(e)) && lower.length > 3) {
    const stem = lower.replace(/(e|st|t|en|et)$/, '');
    return shuffleArray(verbEndings.map(e => stem + e).filter(v => v !== lower)).slice(0, 3);
  }

  // Conjunction distractors
  const conjSets: Record<string, string[]> = {
    'weil': ['dass', 'ob', 'wenn'],
    'dass': ['weil', 'ob', 'wenn'],
    'wenn': ['weil', 'dass', 'ob'],
    'ob': ['weil', 'dass', 'wenn'],
    'obwohl': ['weil', 'damit', 'wenn'],
    'damit': ['weil', 'obwohl', 'dass'],
  };
  if (conjSets[lower]) return conjSets[lower];

  // Fallback: return plausible-looking words
  return ['nicht', 'auch', 'aber'].slice(0, 3);
}

function generateVocabQuestions(level: CEFRLevel, count: number): QuizQuestion[] {
  const words = allVocabularyWords.filter(w => w.level === level);
  if (words.length < 4) return [];

  const shuffled = shuffleArray(words);
  const selected = shuffled.slice(0, Math.min(count, words.length));

  return selected.map((word, i) => {
    // Random question type
    const questionType = Math.random() > 0.5 ? 'de-to-tr' : 'tr-to-de';

    if (questionType === 'de-to-tr') {
      // German → Turkish/English
      const correctTranslation = word.turkish;
      const correctEn = word.english || word.turkish;
      // Find 3 distractors from same level
      const others = shuffleArray(words.filter(w => w.id !== word.id)).slice(0, 3);
      const options = shuffleArray([
        correctTranslation,
        ...others.map(w => w.turkish),
      ]);
      return {
        id: `vq-${level}-${i}`,
        question: `"${word.german}" ne demek?`,
        options,
        correctIndex: options.indexOf(correctTranslation),
        explanation: `${word.german} = ${word.turkish}. Örnek: ${word.exampleSentence}`,
        explanationEn: `${word.german} = ${correctEn}. Example: ${word.exampleSentence}`,
        topic: getCategoryName(word.category, 'tr'),
        topicEn: getCategoryName(word.category, 'en'),
      };
    } else {
      // Turkish/English → German
      const others = shuffleArray(words.filter(w => w.id !== word.id)).slice(0, 3);
      const options = shuffleArray([
        word.german,
        ...others.map(w => w.german),
      ]);
      return {
        id: `vq-${level}-${i}`,
        question: `"${word.turkish}" Almanca'da nasıl söylenir?`,
        options,
        correctIndex: options.indexOf(word.german),
        explanation: `${word.turkish} = ${word.german}. Örnek: ${word.exampleSentence}`,
        explanationEn: `${word.english || word.turkish} = ${word.german}. Example: ${word.exampleSentence}`,
        topic: getCategoryName(word.category, 'tr'),
        topicEn: getCategoryName(word.category, 'en'),
      };
    }
  });
}

function getCategoryName(category: string, lang: 'tr' | 'en'): string {
  const names: Record<string, { tr: string; en: string }> = {
    greetings: { tr: 'Selamlaşma', en: 'Greetings' },
    food: { tr: 'Yemek', en: 'Food' },
    family: { tr: 'Aile', en: 'Family' },
    numbers: { tr: 'Sayılar', en: 'Numbers' },
    colors: { tr: 'Renkler', en: 'Colors' },
    time: { tr: 'Zaman', en: 'Time' },
    travel: { tr: 'Seyahat', en: 'Travel' },
    work: { tr: 'İş', en: 'Work' },
    shopping: { tr: 'Alışveriş', en: 'Shopping' },
    body: { tr: 'Vücut', en: 'Body' },
    home: { tr: 'Ev', en: 'Home' },
    nature: { tr: 'Doğa', en: 'Nature' },
  };
  return names[category]?.[lang] || category;
}

export function generateQuizQuestions(quizDef: QuizDefinition): QuizQuestion[] {
  const count = quizDef.questionCount;

  if (quizDef.type === 'grammar') {
    return generateGrammarQuestions(quizDef.level, count);
  }

  if (quizDef.type === 'vocabulary') {
    return generateVocabQuestions(quizDef.level, count);
  }

  // Mixed: half grammar, half vocabulary
  const grammarQ = generateGrammarQuestions(quizDef.level, Math.ceil(count / 2));
  const vocabQ = generateVocabQuestions(quizDef.level, Math.floor(count / 2));
  return shuffleArray([...grammarQ, ...vocabQ]).slice(0, count);
}
