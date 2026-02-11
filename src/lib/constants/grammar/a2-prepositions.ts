import { GrammarLesson } from '@/lib/types';

export const a2Prepositions: GrammarLesson = {
  id: 'a2-prepositions',
  title: 'Präpositionen',
  turkishTitle: 'Edatlar (Präpositionen)',
  englishTitle: 'Prepositions',
  level: 'A2',
  order: 10,
  explanation: `# Edatlar (Präpositionen)

Almanca'da edatlar belirli halleri (Kasus) gerektirir.

## Akkusativ Edatları (FUDGO)
- **für** (için): Das ist für dich. (Bu senin için.)
- **um** (etrafında, -de): um 8 Uhr (saat 8'de)
- **durch** (boyunca, içinden): durch die Stadt (şehrin içinden)
- **gegen** (karşı): gegen die Wand (duvara karşı)
- **ohne** (olmadan): ohne mich (bensiz)

## Dativ Edatları (MASB-VN)
- **mit** (ile): mit dem Bus (otobüsle)
- **aus** (den, -dan): aus der Türkei (Türkiye'den)
- **seit** (den beri): seit zwei Jahren (iki yıldır)
- **bei** (-de, yanında): bei mir (bende)
- **von** (-den, -nın): von der Schule (okuldan)
- **nach** (-e, sonra): nach Berlin (Berlin'e)
- **zu** (-e, -a): zum Arzt (doktora)

## Wechselpräpositionen (Değişken Edatlar)
Hem Akkusativ hem Dativ alabilirler:
- **Wohin?** (Nereye?) → Akkusativ: Ich gehe **in die** Schule.
- **Wo?** (Nerede?) → Dativ: Ich bin **in der** Schule.

Değişken edatlar: **in, an, auf, über, unter, vor, hinter, neben, zwischen**`,
  explanationEn: `# Prepositions (Präpositionen)

In German, prepositions require specific cases (Kasus).

## Accusative Prepositions (FUDGO)
- **für** (for): Das ist für dich. (This is for you.)
- **um** (around, at): um 8 Uhr (at 8 o'clock)
- **durch** (through): durch die Stadt (through the city)
- **gegen** (against): gegen die Wand (against the wall)
- **ohne** (without): ohne mich (without me)

## Dative Prepositions (MASB-VN)
- **mit** (with): mit dem Bus (by bus)
- **aus** (from, out of): aus der Türkei (from Turkey)
- **seit** (since, for): seit zwei Jahren (for two years)
- **bei** (at, near): bei mir (at my place)
- **von** (from, of): von der Schule (from school)
- **nach** (to, after): nach Berlin (to Berlin)
- **zu** (to): zum Arzt (to the doctor)

## Two-Way Prepositions (Wechselpräpositionen)
These can take either accusative or dative:
- **Wohin?** (Where to?) -> Accusative: Ich gehe **in die** Schule.
- **Wo?** (Where?) -> Dative: Ich bin **in der** Schule.

Two-way prepositions: **in, an, auf, über, unter, vor, hinter, neben, zwischen**`,
  examples: [
    { german: 'Ich fahre mit dem Zug.', turkish: 'Trenle gidiyorum.', english: 'I am going by train.' },
    { german: 'Das Geschenk ist für dich.', turkish: 'Hediye senin için.', english: 'The gift is for you.' },
    { german: 'Ich komme aus der Türkei.', turkish: "Türkiye'den geliyorum.", english: 'I come from Turkey.' },
    { german: 'Er geht in die Schule.', turkish: 'Okula gidiyor.', english: 'He is going to school.' },
  ],
  exercises: [
    {
      id: 'a2-pp-1',
      type: 'multiple-choice',
      question: 'Ich fahre ___ dem Bus.',
      data: {
        options: ['mit', 'für', 'ohne', 'gegen'],
        correctIndex: 0,
        explanation: '"ile" anlamında → mit (Dativ gerektirir: dem Bus).',
      },
    },
    {
      id: 'a2-pp-2',
      type: 'fill-in-the-blank',
      question: 'Das ist ___ (für/mit) meine Mutter.',
      data: {
        answer: 'für',
        hint: '"için" anlamında',
        acceptableAnswers: ['für'],
      },
    },
    {
      id: 'a2-pp-3',
      type: 'multiple-choice',
      question: 'Ich komme ___ der Türkei.',
      data: {
        options: ['von', 'aus', 'nach', 'zu'],
        correctIndex: 1,
        explanation: 'Ülkelerden gelmek → aus: aus der Türkei.',
      },
    },
    {
      id: 'a2-pp-4',
      type: 'multiple-choice',
      question: 'Er geht in ___ Schule. (okula gidiyor - hareket)',
      data: {
        options: ['der', 'die', 'dem', 'den'],
        correctIndex: 1,
        explanation: 'Wohin? sorusu → Akkusativ. die Schule → in die Schule.',
      },
    },
    {
      id: 'a2-pp-5',
      type: 'fill-in-the-blank',
      question: 'Ich warte ___ (seit/für) drei Stunden.',
      data: {
        answer: 'seit',
        hint: '"den beri" anlamında',
        acceptableAnswers: ['seit'],
      },
    },
  ],
  tips: [
    'FUDGO = für, um, durch, gegen, ohne → Akkusativ',
    'mit, aus, seit, bei, von, nach, zu → Dativ',
    'Değişken edatlarda: Wohin? (nereye) → Akk, Wo? (nerede) → Dat',
  ],
  tipsEn: [
    'FUDGO = für, um, durch, gegen, ohne -> Accusative',
    'mit, aus, seit, bei, von, nach, zu -> Dative',
    'Two-way prepositions: Wohin? (where to?) -> Acc, Wo? (where?) -> Dat',
  ],
};
