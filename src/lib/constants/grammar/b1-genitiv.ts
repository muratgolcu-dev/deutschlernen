import { GrammarLesson } from '@/lib/types';

export const b1Genitiv: GrammarLesson = {
  id: 'b1-genitiv',
  title: 'Genitiv (İyelik Hali)',
  turkishTitle: 'Genitiv (İyelik Hali / -in hali)',
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
  examples: [
    { german: 'Das ist das Auto des Lehrers.', turkish: "Bu öğretmenin arabası." },
    { german: 'Die Tasche der Frau ist rot.', turkish: 'Kadının çantası kırmızı.' },
    { german: 'Trotz des Regens gehen wir spazieren.', turkish: 'Yağmura rağmen yürüyüşe gidiyoruz.' },
    { german: 'Während der Pause esse ich.', turkish: 'Mola sırasında yiyorum.' },
  ],
  exercises: [
    {
      id: 'b1-gn-1',
      type: 'fill-in-the-blank',
      question: 'Das ist das Haus ___ (der) Lehrer_.',
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
};
