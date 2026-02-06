import { GrammarLesson } from '@/lib/types';

export const a1NumbersTime: GrammarLesson = {
  id: 'a1-numbers-time',
  title: 'Zahlen & Uhrzeit',
  turkishTitle: 'Sayılar ve Saat',
  level: 'A1',
  order: 5,
  explanation: `# Sayılar ve Saat

## Sayılar (Zahlen)

| Sayı | Almanca | Sayı | Almanca |
|------|---------|------|---------|
| 1 | eins | 11 | elf |
| 2 | zwei | 12 | zwölf |
| 3 | drei | 13 | dreizehn |
| 4 | vier | 20 | zwanzig |
| 5 | fünf | 21 | einundzwanzig |
| 6 | sechs | 30 | dreißig |
| 7 | sieben | 100 | hundert |
| 8 | acht | 1000 | tausend |

**Dikkat:** 21-99 arası sayılarda birler basamağı önce söylenir:
- 24 = **vier**und**zwanzig** (dört ve yirmi)

## Saat Sorma ve Söyleme

### Resmi Saat
- 14:30 = Es ist **vierzehn Uhr dreißig**.

### Günlük Konuşma
- 2:00 = Es ist **zwei Uhr**.
- 2:15 = Es ist **Viertel nach zwei**.
- 2:30 = Es ist **halb drei** (⚠️ yarım üç = 2:30!)
- 2:45 = Es ist **Viertel vor drei**.

**Önemli:** "halb drei" = 2:30 (3:30 değil! Türkçe'den farklı!)`,
  examples: [
    { german: 'Wie spät ist es?', turkish: 'Saat kaç?' },
    { german: 'Es ist halb vier.', turkish: 'Saat üç buçuk.' },
    { german: 'Ich bin fünfundzwanzig Jahre alt.', turkish: 'Yirmi beş yaşındayım.' },
    { german: 'Der Zug kommt um Viertel nach sieben.', turkish: 'Tren yediyi çeyrek geçe geliyor.' },
  ],
  exercises: [
    {
      id: 'a1-nt-1',
      type: 'multiple-choice',
      question: '"halb sechs" saat kaçtır?',
      data: {
        options: ['6:30', '5:30', '5:00', '6:00'],
        correctIndex: 1,
        explanation: '"halb sechs" = 5:30. Almanca\'da "halb" bir sonraki saate yarım kala demektir.',
      },
    },
    {
      id: 'a1-nt-2',
      type: 'fill-in-the-blank',
      question: '47 = sieben___ (Almanca yazın)',
      data: {
        answer: 'undvierzig',
        hint: 'Birler önce söylenir: 7 ve 40',
        acceptableAnswers: ['undvierzig'],
      },
    },
    {
      id: 'a1-nt-3',
      type: 'multiple-choice',
      question: '3:15 için doğru ifade hangisidir?',
      data: {
        options: ['Viertel vor drei', 'Viertel nach drei', 'halb drei', 'drei Uhr fünfzehn'],
        correctIndex: 1,
        explanation: '3:15 = Viertel nach drei (üçü çeyrek geçe).',
      },
    },
    {
      id: 'a1-nt-4',
      type: 'fill-in-the-blank',
      question: 'Ich bin ___ (32) Jahre alt.',
      data: {
        answer: 'zweiunddreißig',
        hint: '2 ve 30',
        acceptableAnswers: ['zweiunddreißig', 'zweiundreißig', 'zweiunddreissig'],
      },
    },
  ],
  tips: [
    '"halb" ifadesine dikkat: halb drei = 2:30 (Türkçe\'deki gibi değil!)',
    '21-99 arası sayılarda birler basamağı önce söylenir.',
    'Resmi saatte 24 saat sistemi kullanılır.',
  ],
};
