import { GrammarLesson } from '@/lib/types';

export const a1Articles: GrammarLesson = {
  id: 'a1-articles',
  title: 'Artikel: der, die, das',
  turkishTitle: 'Artikeller: der, die, das',
  englishTitle: 'Articles: der, die, das',
  level: 'A1',
  order: 1,
  explanation: `# Almanca Artikeller (der, die, das)

Almanca'da her ismin bir cinsiyeti vardır ve bu cinsiyet **artikel** ile belirlenir.

## Üç Artikel

| Artikel | Cinsiyet | Türkçe Karşılığı |
|---------|----------|-------------------|
| **der** | Maskulin (Eril) | - |
| **die** | Feminin (Dişil) | - |
| **das** | Neutrum (Nötr) | - |

## Çoğul

Çoğulda tüm isimler **die** artikelini alır.

## İpuçları

### Genellikle **der** (eril):
- Günler: der Montag, der Dienstag...
- Aylar: der Januar, der Februar...
- Mevsimler: der Frühling, der Sommer...
- **-er** ile bitenler: der Computer, der Lehrer

### Genellikle **die** (dişil):
- **-e** ile bitenler: die Lampe, die Tasche
- **-ung** ile bitenler: die Zeitung, die Wohnung
- **-heit/-keit** ile bitenler: die Freiheit, die Möglichkeit
- **-tion** ile bitenler: die Nation, die Information

### Genellikle **das** (nötr):
- **-chen** ile bitenler: das Mädchen, das Brötchen
- **-lein** ile bitenler: das Fräulein
- **-ment** ile bitenler: das Dokument
- **-um** ile bitenler: das Museum, das Zentrum`,
  explanationEn: `# German Articles (der, die, das)

In German, every noun has a gender, and this gender is determined by the **article**.

## Three Articles

| Article | Gender | English Equivalent |
|---------|--------|-------------------|
| **der** | Masculine | the (masc.) |
| **die** | Feminine | the (fem.) |
| **das** | Neuter | the (neut.) |

## Plural

In the plural, all nouns take the article **die**.

## Tips

### Usually **der** (masculine):
- Days: der Montag, der Dienstag...
- Months: der Januar, der Februar...
- Seasons: der Frühling, der Sommer...
- Words ending in **-er**: der Computer, der Lehrer

### Usually **die** (feminine):
- Words ending in **-e**: die Lampe, die Tasche
- Words ending in **-ung**: die Zeitung, die Wohnung
- Words ending in **-heit/-keit**: die Freiheit, die Möglichkeit
- Words ending in **-tion**: die Nation, die Information

### Usually **das** (neuter):
- Words ending in **-chen**: das Mädchen, das Brötchen
- Words ending in **-lein**: das Fräulein
- Words ending in **-ment**: das Dokument
- Words ending in **-um**: das Museum, das Zentrum`,
  examples: [
    { german: 'Der Mann ist groß.', turkish: 'Adam uzun boylu.', english: 'The man is tall.' },
    { german: 'Die Frau liest ein Buch.', turkish: 'Kadın bir kitap okuyor.', english: 'The woman is reading a book.' },
    { german: 'Das Kind spielt.', turkish: 'Çocuk oynuyor.', english: 'The child is playing.' },
    { german: 'Die Kinder spielen.', turkish: 'Çocuklar oynuyorlar.', english: 'The children are playing.' },
  ],
  exercises: [
    {
      id: 'a1-art-1',
      type: 'multiple-choice',
      question: '___ Haus ist groß.',
      explanation: '"Haus" nötr (Neutrum) bir isimdir → Artikel: das. Nötr isimlerde Nominativ hali "das" kullanılır. Örnek: das Haus, das Buch, das Kind.',
      explanationEn: '"Haus" is a neuter noun → Article: das. In nominative case, neuter nouns use "das". Example: das Haus, das Buch, das Kind.',
      data: {
        options: ['Der', 'Die', 'Das', 'Ein'],
        correctIndex: 2,
        explanation: 'Haus nötr bir isimdir, bu yüzden "das" artikelini alır.',
      },
    },
    {
      id: 'a1-art-2',
      type: 'multiple-choice',
      question: '___ Frau trinkt Kaffee.',
      explanation: '"Frau" dişil (Feminin) bir isimdir → Artikel: die. Dişil isimlerde Nominativ hali "die" kullanılır. Örnek: die Frau, die Lampe, die Tasche.',
      explanationEn: '"Frau" is a feminine noun → Article: die. In nominative case, feminine nouns use "die". Example: die Frau, die Lampe, die Tasche.',
      data: {
        options: ['Der', 'Die', 'Das', 'Den'],
        correctIndex: 1,
        explanation: 'Frau dişil bir isimdir, bu yüzden "die" artikelini alır.',
      },
    },
    {
      id: 'a1-art-3',
      type: 'fill-in-the-blank',
      question: '___ Mann arbeitet.',
      explanation: '"Mann" eril (Maskulin) bir isimdir → Artikel: der. Eril isimlerde Nominativ hali "der" kullanılır. Örnek: der Mann, der Tisch, der Computer.',
      explanationEn: '"Mann" is a masculine noun → Article: der. In nominative case, masculine nouns use "der". Example: der Mann, der Tisch, der Computer.',
      data: {
        answer: 'Der',
        hint: 'Eril artikel',
        acceptableAnswers: ['der', 'Der'],
      },
    },
    {
      id: 'a1-art-4',
      type: 'multiple-choice',
      question: '___ Zeitung ist interessant.',
      explanation: '"Zeitung" -ung ile biter → Dişil (Feminin). Kural: -ung ile biten isimler genellikle dişildir ve "die" artikelini alır. Örnek: die Zeitung, die Wohnung, die Übung.',
      explanationEn: '"Zeitung" ends in -ung → Feminine. Rule: Nouns ending in -ung are usually feminine and take "die". Example: die Zeitung, die Wohnung, die Übung.',
      data: {
        options: ['Der', 'Die', 'Das', 'Den'],
        correctIndex: 1,
        explanation: '-ung ile biten isimler genellikle dişildir → die Zeitung.',
      },
    },
    {
      id: 'a1-art-5',
      type: 'fill-in-the-blank',
      question: '___ Mädchen spielt im Garten.',
      explanation: '"Mädchen" -chen ile biter → Nötr (Neutrum). Kural: -chen küçültme eki ile biten tüm isimler nötr olup "das" artikelini alır. Örnek: das Mädchen, das Brötchen, das Häuschen.',
      explanationEn: '"Mädchen" ends in -chen → Neuter. Rule: All nouns with the diminutive suffix -chen are neuter and take "das". Example: das Mädchen, das Brötchen, das Häuschen.',
      data: {
        answer: 'Das',
        hint: '-chen ile biten isimler nötr',
        acceptableAnswers: ['das', 'Das'],
      },
    },
  ],
  tips: [
    'Her yeni kelimeyi artikeliyle birlikte öğrenin!',
    'Çoğulda hep "die" kullanılır.',
    'Sonu -ung, -heit, -keit ile biten kelimeler genellikle dişildir.',
  ],
  tipsEn: [
    'Learn every new word together with its article!',
    'In the plural, "die" is always used.',
    'Words ending in -ung, -heit, -keit are usually feminine.',
  ],
};
