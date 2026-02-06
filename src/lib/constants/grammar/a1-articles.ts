import { GrammarLesson } from '@/lib/types';

export const a1Articles: GrammarLesson = {
  id: 'a1-articles',
  title: 'Artikel: der, die, das',
  turkishTitle: 'Artikeller: der, die, das',
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
  examples: [
    { german: 'Der Mann ist groß.', turkish: 'Adam uzun boylu.' },
    { german: 'Die Frau liest ein Buch.', turkish: 'Kadın bir kitap okuyor.' },
    { german: 'Das Kind spielt.', turkish: 'Çocuk oynuyor.' },
    { german: 'Die Kinder spielen.', turkish: 'Çocuklar oynuyorlar.' },
  ],
  exercises: [
    {
      id: 'a1-art-1',
      type: 'multiple-choice',
      question: '___ Haus ist groß.',
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
};
