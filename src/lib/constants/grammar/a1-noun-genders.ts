import { GrammarLesson } from '@/lib/types';

export const a1NounGenders: GrammarLesson = {
  id: 'a1-noun-genders',
  title: 'Substantive & Geschlecht',
  turkishTitle: 'İsimler ve Cinsiyet',
  englishTitle: 'Nouns and Gender',
  level: 'A1',
  order: 3,
  explanation: `# İsimler ve Cinsiyet Kuralları

Almanca'da tüm isimler büyük harfle başlar ve bir cinsiyete sahiptir.

## Doğal Cinsiyet
- **der** Mann (adam), **der** Junge (oğlan)
- **die** Frau (kadın), **die** Mutter (anne)
- **das** Kind (çocuk), **das** Baby (bebek)

## Çoğul Oluşturma

| Tip | Tekil | Çoğul | Kural |
|-----|-------|-------|-------|
| -e | der Tag | die Tage | Sona -e eklenir |
| -er | das Kind | die Kinder | Sona -er eklenir |
| -en | die Frau | die Frauen | Sona -en eklenir |
| -s | das Auto | die Autos | Sona -s eklenir |
| Umlaut | der Vater | die Väter | Sesli harf değişir |
| Değişmez | der Lehrer | die Lehrer | Değişmez |

## Bileşik İsimler (Komposita)
Almanca'da isimler birleştirilebilir. Artikeli **son kelime** belirler:
- **die** Haus + **die** Tür = **die** Haustür (kapı)
- **der** Fuß + **der** Ball = **der** Fußball (futbol)`,
  explanationEn: `# Nouns and Gender Rules

In German, all nouns are capitalized and have a gender.

## Natural Gender
- **der** Mann (man), **der** Junge (boy)
- **die** Frau (woman), **die** Mutter (mother)
- **das** Kind (child), **das** Baby (baby)

## Plural Formation

| Type | Singular | Plural | Rule |
|------|----------|--------|------|
| -e | der Tag | die Tage | Add -e |
| -er | das Kind | die Kinder | Add -er |
| -en | die Frau | die Frauen | Add -en |
| -s | das Auto | die Autos | Add -s |
| Umlaut | der Vater | die Väter | Vowel change |
| Unchanged | der Lehrer | die Lehrer | No change |

## Compound Nouns (Komposita)
In German, nouns can be combined. The article is determined by the **last word**:
- **die** Haus + **die** Tür = **die** Haustür (front door)
- **der** Fuß + **der** Ball = **der** Fußball (football/soccer)`,
  examples: [
    { german: 'Der Tisch ist braun.', turkish: 'Masa kahverengi.', english: 'The table is brown.' },
    { german: 'Die Bücher sind interessant.', turkish: 'Kitaplar ilginç.', english: 'The books are interesting.' },
    { german: 'Das Handy ist neu.', turkish: 'Cep telefonu yeni.', english: 'The mobile phone is new.' },
    { german: 'Die Haustür ist offen.', turkish: 'Ev kapısı açık.', english: 'The front door is open.' },
  ],
  exercises: [
    {
      id: 'a1-ng-1',
      type: 'multiple-choice',
      question: '"Kinder" kelimesinin tekil hali nedir?',
      data: {
        options: ['der Kind', 'die Kind', 'das Kind', 'das Kinder'],
        correctIndex: 2,
        explanation: 'Kind nötr bir isimdir → das Kind. Çoğulu: die Kinder.',
      },
    },
    {
      id: 'a1-ng-2',
      type: 'multiple-choice',
      question: '"Hausaufgabe" (ödev) kelimesinin artikeli nedir?',
      data: {
        options: ['der', 'die', 'das', 'den'],
        correctIndex: 1,
        explanation: 'Bileşik isimlerde artikel son kelimeye göre belirlenir: die Aufgabe → die Hausaufgabe.',
      },
    },
    {
      id: 'a1-ng-3',
      type: 'fill-in-the-blank',
      question: 'der Stuhl → die ___ (çoğul)',
      data: {
        answer: 'Stühle',
        hint: 'Umlaut + e',
        acceptableAnswers: ['Stühle', 'stühle'],
      },
    },
    {
      id: 'a1-ng-4',
      type: 'multiple-choice',
      question: '"Auto" kelimesinin çoğulu nedir?',
      data: {
        options: ['Auten', 'Autos', 'Autoen', 'Auto'],
        correctIndex: 1,
        explanation: 'Yabancı kökenli kelimelerde çoğul genellikle -s ile yapılır → Autos.',
      },
    },
  ],
  tips: [
    'Her ismi artikeliyle birlikte öğrenin: der Tisch, die Lampe, das Buch.',
    'Bileşik isimlerde cinsiyet her zaman son kelimeye göre belirlenir.',
    'Almanca\'da tüm isimler büyük harfle başlar!',
  ],
  tipsEn: [
    'Learn every noun together with its article: der Tisch, die Lampe, das Buch.',
    'In compound nouns, the gender is always determined by the last word.',
    'In German, all nouns are capitalized!',
  ],
};
