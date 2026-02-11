import { GrammarLesson } from '@/lib/types';

export const a1BasicSentences: GrammarLesson = {
  id: 'a1-basic-sentences',
  title: 'Einfache Sätze',
  turkishTitle: 'Temel Cümleler',
  englishTitle: 'Basic Sentences',
  level: 'A1',
  order: 4,
  explanation: `# Temel Cümle Yapısı

## Düz Cümle (Aussagesatz)
Almanca'da fiil **her zaman ikinci sırada** gelir.

**Özne + Fiil + Diğer öğeler**

- Ich **lerne** Deutsch. (Almanca öğreniyorum.)
- Der Mann **kauft** Brot. (Adam ekmek alıyor.)

## Soru Cümlesi (Fragesatz)

### Evet/Hayır Soruları
Fiil **birinci sırada** gelir:
- **Lernst** du Deutsch? (Almanca öğreniyor musun?)
- **Ist** er Student? (O öğrenci mi?)

### W-Soruları
Soru kelimesi + fiil:
- **Wo** wohnst du? (Nerede oturuyorsun?)
- **Was** machst du? (Ne yapıyorsun?)
- **Wie** heißt du? (Adın ne?)
- **Wann** kommst du? (Ne zaman geliyorsun?)
- **Warum** lernst du Deutsch? (Neden Almanca öğreniyorsun?)
- **Wer** ist das? (Bu kim?)

## Olumsuz Cümle
"**nicht**" fiilden sonra veya cümle sonunda gelir:
- Ich spreche **nicht** Französisch.
- Das ist **nicht** richtig.

"**kein/keine**" belirsiz artikel yerine kullanılır:
- Ich habe **kein** Auto. (Arabam yok.)
- Ich habe **keine** Zeit. (Zamanım yok.)`,
  explanationEn: `# Basic Sentence Structure

## Declarative Sentence (Aussagesatz)
In German, the verb **always comes in second position**.

**Subject + Verb + Other elements**

- Ich **lerne** Deutsch. (I am learning German.)
- Der Mann **kauft** Brot. (The man is buying bread.)

## Question Sentence (Fragesatz)

### Yes/No Questions
The verb comes in **first position**:
- **Lernst** du Deutsch? (Are you learning German?)
- **Ist** er Student? (Is he a student?)

### W-Questions
Question word + verb:
- **Wo** wohnst du? (Where do you live?)
- **Was** machst du? (What are you doing?)
- **Wie** heißt du? (What is your name?)
- **Wann** kommst du? (When are you coming?)
- **Warum** lernst du Deutsch? (Why are you learning German?)
- **Wer** ist das? (Who is that?)

## Negative Sentences
"**nicht**" comes after the verb or at the end of the sentence:
- Ich spreche **nicht** Französisch.
- Das ist **nicht** richtig.

"**kein/keine**" is used instead of the indefinite article:
- Ich habe **kein** Auto. (I don't have a car.)
- Ich habe **keine** Zeit. (I don't have time.)`,
  examples: [
    { german: 'Ich komme aus der Türkei.', turkish: "Türkiye'den geliyorum.", english: 'I come from Turkey.' },
    { german: 'Wo wohnst du?', turkish: 'Nerede oturuyorsun?', english: 'Where do you live?' },
    { german: 'Ich spreche nicht gut Deutsch.', turkish: 'İyi Almanca konuşmuyorum.', english: 'I don\'t speak German well.' },
    { german: 'Hast du ein Handy?', turkish: 'Cep telefonun var mı?', english: 'Do you have a mobile phone?' },
  ],
  exercises: [
    {
      id: 'a1-bs-1',
      type: 'word-ordering',
      question: 'Cümleyi doğru sıraya koyun:',
      data: {
        words: ['Deutsch', 'Ich', 'lerne'],
        correctOrder: [1, 2, 0],
        hint: 'Fiil ikinci sırada gelir',
      },
    },
    {
      id: 'a1-bs-2',
      type: 'word-ordering',
      question: 'Soru cümlesini oluşturun:',
      data: {
        words: ['du', 'Wo', 'wohnst'],
        correctOrder: [1, 2, 0],
        hint: 'W-sorusu: soru kelimesi + fiil + özne',
      },
    },
    {
      id: 'a1-bs-3',
      type: 'multiple-choice',
      question: '"Arabam yok" cümlesini Almanca\'ya çevirin:',
      data: {
        options: ['Ich habe nicht Auto.', 'Ich habe kein Auto.', 'Ich nicht habe Auto.', 'Ich habe Auto nicht.'],
        correctIndex: 1,
        explanation: 'Belirsiz artikel (ein) yerine olumsuzda "kein" kullanılır.',
      },
    },
    {
      id: 'a1-bs-4',
      type: 'fill-in-the-blank',
      question: '___ heißt du? (Adın ne?)',
      data: {
        answer: 'Wie',
        hint: 'Nasıl anlamında soru kelimesi',
        acceptableAnswers: ['Wie', 'wie'],
      },
    },
    {
      id: 'a1-bs-5',
      type: 'multiple-choice',
      question: 'Hangisi doğru cümle yapısıdır?',
      data: {
        options: ['Ich Deutsch lerne.', 'Deutsch ich lerne.', 'Ich lerne Deutsch.', 'Lerne ich Deutsch.'],
        correctIndex: 2,
        explanation: 'Düz cümlede fiil ikinci sıradadır: Özne + Fiil + Nesne.',
      },
    },
  ],
  tips: [
    'Almanca\'da fiil HER ZAMAN ikinci sıradadır (düz cümlede).',
    'Evet/Hayır sorularında fiil en başa gelir.',
    'kein = ein\'in olumsuz hali, nicht = genel olumsuzluk.',
  ],
  tipsEn: [
    'In German, the verb is ALWAYS in second position (in declarative sentences).',
    'In yes/no questions, the verb comes first.',
    'kein = negative form of ein, nicht = general negation.',
  ],
};
