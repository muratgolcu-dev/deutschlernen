import { GrammarLesson } from '@/lib/types';

export const a2Dativ: GrammarLesson = {
  id: 'a2-dativ',
  title: 'Dativ (Yönelme Hali)',
  turkishTitle: 'Dativ (Yönelme Hali / -e hali)',
  englishTitle: 'Dative Case',
  level: 'A2',
  order: 7,
  explanation: `# Dativ (-e Hali)

Dativ, cümledeki **dolaylı nesneyi** ifade eder. "Kime?" sorusunun cevabıdır.

## Artikel Değişimleri

| Nominativ | Dativ |
|-----------|-------|
| **der** → **dem** |
| **die** → **der** |
| **das** → **dem** |
| **die** (çoğul) → **den** + n |

## Belirsiz Artikel

| Nominativ | Dativ |
|-----------|-------|
| ein → **einem** |
| eine → **einer** |
| ein → **einem** |

## Dativ Gerektiren Fiiller
- **helfen** (yardım etmek): Ich helfe **dem** Mann.
- **geben** (vermek): Er gibt **der** Frau ein Buch.
- **danken** (teşekkür etmek): Ich danke **dir**.
- **gehören** (ait olmak): Das Buch gehört **mir**.
- **gefallen** (hoşuna gitmek): Berlin gefällt **mir**.
- **schmecken** (tadı hoşuna gitmek): Der Kuchen schmeckt **uns**.

## Dativ Zamirleri

| Nominativ | Dativ |
|-----------|-------|
| ich | **mir** |
| du | **dir** |
| er | **ihm** |
| sie | **ihr** |
| es | **ihm** |
| wir | **uns** |
| ihr | **euch** |
| sie/Sie | **ihnen/Ihnen** |`,
  explanationEn: `# Dative Case

The dative case marks the **indirect object** in a sentence. It answers the question "To whom?"

## Article Changes

| Nominative | Dative |
|------------|--------|
| **der** -> **dem** |
| **die** -> **der** |
| **das** -> **dem** |
| **die** (plural) -> **den** + n |

## Indefinite Articles

| Nominative | Dative |
|------------|--------|
| ein -> **einem** |
| eine -> **einer** |
| ein -> **einem** |

## Verbs That Take the Dative
- **helfen** (to help): Ich helfe **dem** Mann.
- **geben** (to give): Er gibt **der** Frau ein Buch.
- **danken** (to thank): Ich danke **dir**.
- **gehören** (to belong to): Das Buch gehört **mir**.
- **gefallen** (to be pleasing to): Berlin gefällt **mir**.
- **schmecken** (to taste good to): Der Kuchen schmeckt **uns**.

## Dative Pronouns

| Nominative | Dative |
|------------|--------|
| ich | **mir** |
| du | **dir** |
| er | **ihm** |
| sie | **ihr** |
| es | **ihm** |
| wir | **uns** |
| ihr | **euch** |
| sie/Sie | **ihnen/Ihnen** |`,
  examples: [
    { german: 'Ich gebe dem Kind ein Geschenk.', turkish: 'Çocuğa bir hediye veriyorum.', english: 'I am giving the child a gift.' },
    { german: 'Er hilft der Frau.', turkish: 'Kadına yardım ediyor.', english: 'He is helping the woman.' },
    { german: 'Das Buch gehört mir.', turkish: 'Kitap bana ait.', english: 'The book belongs to me.' },
    { german: 'Wie gefällt dir Berlin?', turkish: "Berlin'i nasıl buldun?", english: 'How do you like Berlin?' },
  ],
  exercises: [
    {
      id: 'a2-dv-1',
      type: 'fill-in-the-blank',
      question: 'Ich helfe ___ (die) Frau.',
      data: {
        answer: 'der',
        hint: 'Dativ\'de die → der olur',
        acceptableAnswers: ['der'],
      },
    },
    {
      id: 'a2-dv-2',
      type: 'multiple-choice',
      question: 'Er gibt ___ Kind einen Ball.',
      data: {
        options: ['das', 'dem', 'den', 'der'],
        correctIndex: 1,
        explanation: 'Kind nötr. Dativ\'de das → dem.',
      },
    },
    {
      id: 'a2-dv-3',
      type: 'fill-in-the-blank',
      question: 'Das Auto gehört ___ (ich).',
      data: {
        answer: 'mir',
        hint: 'ich → Dativ',
        acceptableAnswers: ['mir'],
      },
    },
    {
      id: 'a2-dv-4',
      type: 'multiple-choice',
      question: 'Berlin gefällt ___.',
      data: {
        options: ['mich', 'mir', 'ich', 'mein'],
        correctIndex: 1,
        explanation: 'gefallen fiili Dativ gerektirir: mir.',
      },
    },
    {
      id: 'a2-dv-5',
      type: 'fill-in-the-blank',
      question: 'Ich danke ___ (du) sehr.',
      data: {
        answer: 'dir',
        hint: 'du → Dativ',
        acceptableAnswers: ['dir'],
      },
    },
  ],
  tips: [
    'Dativ sorusu: Wem? (Kime?)',
    'helfen, danken, gefallen, gehören → her zaman Dativ!',
    'Çoğul Dativ\'de isimlere -n eklenir: die Kinder → den Kindern.',
  ],
  tipsEn: [
    'Dative question: Wem? (To whom?)',
    'helfen, danken, gefallen, gehören -> always dative!',
    'In the dative plural, nouns get an -n ending: die Kinder -> den Kindern.',
  ],
};
