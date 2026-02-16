import { GrammarLesson } from '@/lib/types';

export const a2Akkusativ: GrammarLesson = {
  id: 'a2-akkusativ',
  title: 'Akkusativ (Belirtme Hali)',
  turkishTitle: 'Akkusativ (Belirtme Hali / -i hali)',
  englishTitle: 'Accusative Case',
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
  explanationEn: `# Accusative Case

The accusative case marks the **direct object** in a sentence.

## Article Changes

| Nominative | Accusative | Change |
|------------|------------|--------|
| **der** Mann | **den** Mann | der -> den |
| **die** Frau | **die** Frau | no change |
| **das** Kind | **das** Kind | no change |
| **die** Kinder | **die** Kinder | no change |

**Only the masculine article changes!**

## Indefinite Articles

| Nominative | Accusative |
|------------|------------|
| **ein** Mann | **einen** Mann |
| **eine** Frau | **eine** Frau |
| **ein** Kind | **ein** Kind |

## Verbs That Take the Accusative
- **haben** (to have): Ich habe **einen** Hund.
- **kaufen** (to buy): Er kauft **den** Computer.
- **sehen** (to see): Sie sieht **den** Film.
- **brauchen** (to need): Wir brauchen **einen** Tisch.
- **essen** (to eat): Ich esse **einen** Apfel.
- **trinken** (to drink): Er trinkt **den** Kaffee.

## Personal Pronouns - Accusative

| Nominative | Accusative |
|------------|------------|
| ich | **mich** |
| du | **dich** |
| er | **ihn** |
| sie | **sie** |
| es | **es** |
| wir | **uns** |
| ihr | **euch** |
| sie/Sie | **sie/Sie** |`,
  examples: [
    { german: 'Ich sehe den Mann.', turkish: 'Adamı görüyorum.', english: 'I see the man.' },
    { german: 'Sie kauft einen Rock.', turkish: 'Bir etek satın alıyor.', english: 'She is buying a skirt.' },
    { german: 'Hast du den Schlüssel?', turkish: 'Anahtarın var mı?', english: 'Do you have the key?' },
    { german: 'Er liebt sie.', turkish: 'O onu seviyor.', english: 'He loves her.' },
  ],
  exercises: [
    {
      id: 'a2-ak-1',
      type: 'fill-in-the-blank',
      question: 'Ich kaufe ___ (der) Computer.',
      explanation: 'Akkusativ hali: eril der → den olur. "den Computer" = bilgisayarı.',
      explanationEn: 'Accusative case: masculine der → den. "den Computer" = the computer (accusative).',
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
      explanation: 'Kaffee eril bir isimdir. Akkusativ\'de der → den olur.',
      explanationEn: 'Kaffee is a masculine noun. In the accusative, der → den.',
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
      explanation: 'Kişi zamiri "ich" Akkusativ\'de "mich" olur. sehen fiili Akkusativ gerektirir.',
      explanationEn: 'The personal pronoun "ich" becomes "mich" in the accusative. The verb sehen requires the accusative.',
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
      explanation: 'Tasche dişil bir isimdir. Dişil isimlerde Akkusativ\'de artikel değişmez: eine kalır.',
      explanationEn: 'Tasche is a feminine noun. Feminine articles do not change in the accusative: eine stays eine.',
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
      explanation: 'Film eril bir isimdir. Akkusativ\'de ein → einen olur.',
      explanationEn: 'Film is a masculine noun. In the accusative, ein → einen.',
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
  tipsEn: [
    'Only the masculine article changes: der -> den, ein -> einen.',
    'Feminine and neuter articles DO NOT CHANGE in the accusative.',
    'It is important to learn whether a verb requires the accusative case.',
  ],
};
