import { GrammarLesson } from '@/lib/types';

export const b1Genitiv: GrammarLesson = {
  id: 'b1-genitiv',
  title: 'Genitiv (İyelik Hali)',
  turkishTitle: 'Genitiv (İyelik Hali / -in hali)',
  englishTitle: 'Genitive Case (Possessive)',
  level: 'B1',
  order: 11,
  explanation: `# Genitiv (-in Hali / İyelik)

Genitiv aitlik/iyelik ifade eder: "Kimin?" sorusunun cevabıdır.

## Artikel Değişimleri

| Nominativ | Genitiv |
|-----------|---------|
| **der** → **des** + -(e)s |
| **die** → **der** |
| **das** → **des** + -(e)s |
| **die** (çoğul) → **der** |

## Örnekler
- **des** Mann**es** (adamın)
- **der** Frau (kadının)
- **des** Kind**es** (çocuğun)
- **der** Kinder (çocukların)

## Eril ve Nötr İsimlere -(e)s Eklenir
- der Vater → des Vater**s**
- das Haus → des Haus**es**
- der Arzt → des Arzt**es**

## Genitiv Edatları
- **wegen** (yüzünden): wegen **des** Wetters
- **trotz** (rağmen): trotz **des** Regens
- **während** (boyunca): während **der** Pause
- **statt/anstatt** (yerine): statt **eines** Buches

## Günlük Konuşmada
Konuşma dilinde Genitiv yerine sıklıkla **von + Dativ** kullanılır:
- das Buch **des** Lehrers = das Buch **von dem** Lehrer`,
  explanationEn: `# Genitive Case (Possessive)

The genitive expresses possession/ownership: it answers the question "Whose?"

## Article Changes

| Nominative | Genitive |
|------------|----------|
| **der** -> **des** + -(e)s |
| **die** -> **der** |
| **das** -> **des** + -(e)s |
| **die** (plural) -> **der** |

## Examples
- **des** Mann**es** (of the man / the man's)
- **der** Frau (of the woman / the woman's)
- **des** Kind**es** (of the child / the child's)
- **der** Kinder (of the children / the children's)

## Masculine and Neuter Nouns Take -(e)s
- der Vater -> des Vater**s**
- das Haus -> des Haus**es**
- der Arzt -> des Arzt**es**

## Genitive Prepositions
- **wegen** (because of): wegen **des** Wetters
- **trotz** (despite): trotz **des** Regens
- **während** (during): während **der** Pause
- **statt/anstatt** (instead of): statt **eines** Buches

## In Colloquial Speech
In spoken German, **von + Dative** is often used instead of genitive:
- das Buch **des** Lehrers = das Buch **von dem** Lehrer`,
  examples: [
    { german: 'Das ist das Auto des Lehrers.', turkish: "Bu öğretmenin arabası.", english: 'This is the teacher\'s car.' },
    { german: 'Die Tasche der Frau ist rot.', turkish: 'Kadının çantası kırmızı.', english: 'The woman\'s bag is red.' },
    { german: 'Trotz des Regens gehen wir spazieren.', turkish: 'Yağmura rağmen yürüyüşe gidiyoruz.', english: 'Despite the rain, we are going for a walk.' },
    { german: 'Während der Pause esse ich.', turkish: 'Mola sırasında yiyorum.', english: 'During the break, I eat.' },
  ],
  exercises: [
    {
      id: 'b1-gn-1',
      type: 'fill-in-the-blank',
      question: 'Das ist das Haus ___ (der) Lehrer_.',
      explanation: '"Lehrer" eril isimdir. Genitiv: der → des + -s eki. "des Lehrers" = öğretmenin.',
      explanationEn: '"Lehrer" is masculine. Genitive: der → des + -s ending. "des Lehrers" = of the teacher.',
      data: {
        answer: 'des Lehrers',
        hint: 'Eril Genitiv: der → des + -s',
        acceptableAnswers: ['des Lehrers'],
      },
    },
    {
      id: 'b1-gn-2',
      type: 'multiple-choice',
      question: 'Die Farbe ___ Autos ist blau.',
      explanation: '"Auto" nötr isimdir (das Auto). Genitiv: das → des + -s. "des Autos" = arabanın.',
      explanationEn: '"Auto" is neuter (das Auto). Genitive: das → des + -s. "des Autos" = of the car.',
      data: {
        options: ['der', 'des', 'dem', 'den'],
        correctIndex: 1,
        explanation: 'Auto nötr → Genitiv: des Autos.',
      },
    },
    {
      id: 'b1-gn-3',
      type: 'fill-in-the-blank',
      question: 'Trotz ___ (das) Wetter__ gehen wir raus.',
      explanation: '"trotz" Genitiv edatıdır. "Wetter" nötr → das → des + -s. "trotz des Wetters" = havaya rağmen.',
      explanationEn: '"trotz" is a genitive preposition. "Wetter" is neuter → das → des + -s. "trotz des Wetters" = despite the weather.',
      data: {
        answer: 'des Wetters',
        hint: 'Nötr Genitiv: das → des + -s',
        acceptableAnswers: ['des Wetters'],
      },
    },
    {
      id: 'b1-gn-4',
      type: 'multiple-choice',
      question: 'Die Mutter ___ Kinder ist nett.',
      explanation: '"Kinder" çoğul isimdir. Çoğul Genitiv: die → der. "der Kinder" = çocukların.',
      explanationEn: '"Kinder" is plural. Plural genitive: die → der. "der Kinder" = of the children.',
      data: {
        options: ['die', 'der', 'des', 'den'],
        correctIndex: 1,
        explanation: 'Çoğul Genitiv: die → der.',
      },
    },
  ],
  tips: [
    'Genitiv sorusu: Wessen? (Kimin?)',
    'Eril ve nötr isimlere -(e)s eklenir.',
    'wegen, trotz, während, statt → Genitiv edatları.',
    'Konuşma dilinde von + Dativ de kullanılabilir.',
  ],
  tipsEn: [
    'Genitive question: Wessen? (Whose?)',
    'Masculine and neuter nouns take -(e)s.',
    'wegen, trotz, während, statt -> Genitive prepositions.',
    'In colloquial speech, von + Dative can also be used.',
  ],
};
