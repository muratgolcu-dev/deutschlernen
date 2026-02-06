import { GrammarLesson } from '@/lib/types';

export const a1BasicSentences: GrammarLesson = {
  id: 'a1-basic-sentences',
  title: 'Einfache Sätze',
  turkishTitle: 'Temel Cümleler',
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
  examples: [
    { german: 'Ich komme aus der Türkei.', turkish: "Türkiye'den geliyorum." },
    { german: 'Wo wohnst du?', turkish: 'Nerede oturuyorsun?' },
    { german: 'Ich spreche nicht gut Deutsch.', turkish: 'İyi Almanca konuşmuyorum.' },
    { german: 'Hast du ein Handy?', turkish: 'Cep telefonun var mı?' },
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
};
