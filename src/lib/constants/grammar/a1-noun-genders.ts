import { GrammarLesson } from '@/lib/types';

export const a1NounGenders: GrammarLesson = {
  id: 'a1-noun-genders',
  title: 'Substantive & Geschlecht',
  turkishTitle: 'İsimler ve Cinsiyet',
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
  examples: [
    { german: 'Der Tisch ist braun.', turkish: 'Masa kahverengi.' },
    { german: 'Die Bücher sind interessant.', turkish: 'Kitaplar ilginç.' },
    { german: 'Das Handy ist neu.', turkish: 'Cep telefonu yeni.' },
    { german: 'Die Haustür ist offen.', turkish: 'Ev kapısı açık.' },
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
};
