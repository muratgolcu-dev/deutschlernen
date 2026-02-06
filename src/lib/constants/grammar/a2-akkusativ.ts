import { GrammarLesson } from '@/lib/types';

export const a2Akkusativ: GrammarLesson = {
  id: 'a2-akkusativ',
  title: 'Akkusativ (Belirtme Hali)',
  turkishTitle: 'Akkusativ (Belirtme Hali / -i hali)',
  level: 'A2',
  order: 6,
  explanation: `# Akkusativ (-i Hali)

Akkusativ, cümledeki **doğrudan nesneyi** (belirtili nesne) ifade eder.

## Artikel Değişimleri

| Nominativ | Akkusativ | Değişim |
|-----------|-----------|---------|
| **der** Mann | **den** Mann | der → den |
| **die** Frau | **die** Frau | değişmez |
| **das** Kind | **das** Kind | değişmez |
| **die** Kinder | **die** Kinder | değişmez |

**Sadece eril (maskulin) artikelde değişim olur!**

## Belirsiz Artikel

| Nominativ | Akkusativ |
|-----------|-----------|
| **ein** Mann | **einen** Mann |
| **eine** Frau | **eine** Frau |
| **ein** Kind | **ein** Kind |

## Akkusativ Gerektiren Fiiller
- **haben** (sahip olmak): Ich habe **einen** Hund.
- **kaufen** (satın almak): Er kauft **den** Computer.
- **sehen** (görmek): Sie sieht **den** Film.
- **brauchen** (ihtiyacı olmak): Wir brauchen **einen** Tisch.
- **essen** (yemek): Ich esse **einen** Apfel.
- **trinken** (içmek): Er trinkt **den** Kaffee.

## Kişi Zamirleri - Akkusativ

| Nominativ | Akkusativ |
|-----------|-----------|
| ich | **mich** |
| du | **dich** |
| er | **ihn** |
| sie | **sie** |
| es | **es** |
| wir | **uns** |
| ihr | **euch** |
| sie/Sie | **sie/Sie** |`,
  examples: [
    { german: 'Ich sehe den Mann.', turkish: 'Adamı görüyorum.' },
    { german: 'Sie kauft einen Rock.', turkish: 'Bir etek satın alıyor.' },
    { german: 'Hast du den Schlüssel?', turkish: 'Anahtarın var mı?' },
    { german: 'Er liebt sie.', turkish: 'O onu seviyor.' },
  ],
  exercises: [
    {
      id: 'a2-ak-1',
      type: 'fill-in-the-blank',
      question: 'Ich kaufe ___ (der) Computer.',
      data: {
        answer: 'den',
        hint: 'Eril isimler Akkusativ\'de der → den olur',
        acceptableAnswers: ['den'],
      },
    },
    {
      id: 'a2-ak-2',
      type: 'multiple-choice',
      question: 'Er trinkt ___ Kaffee.',
      data: {
        options: ['der', 'den', 'dem', 'des'],
        correctIndex: 1,
        explanation: 'Kaffee eril bir isimdir. Akkusativ\'de der → den.',
      },
    },
    {
      id: 'a2-ak-3',
      type: 'fill-in-the-blank',
      question: 'Siehst du ___ (ich)?',
      data: {
        answer: 'mich',
        hint: 'ich zamirinin Akkusativ hali',
        acceptableAnswers: ['mich'],
      },
    },
    {
      id: 'a2-ak-4',
      type: 'multiple-choice',
      question: 'Ich brauche ___ Tasche.',
      data: {
        options: ['einen', 'eine', 'ein', 'einer'],
        correctIndex: 1,
        explanation: 'Tasche dişildir. Dişil isimlerin Akkusativ\'de artikeli değişmez: eine.',
      },
    },
    {
      id: 'a2-ak-5',
      type: 'fill-in-the-blank',
      question: 'Wir sehen ___ (ein) Film.',
      data: {
        answer: 'einen',
        hint: 'Film erildir, ein → einen',
        acceptableAnswers: ['einen'],
      },
    },
  ],
  tips: [
    'Sadece eril (maskulin) artikelde değişim olur: der → den, ein → einen.',
    'Dişil ve nötr artikeller Akkusativ\'de DEĞİŞMEZ.',
    'Bir fiilin Akkusativ gerektirip gerektirmediğini öğrenmek önemlidir.',
  ],
};
