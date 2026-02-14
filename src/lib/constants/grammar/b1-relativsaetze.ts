import { GrammarLesson } from '@/lib/types';

export const b1Relativsaetze: GrammarLesson = {
  id: 'b1-relativsaetze',
  title: 'Relativsätze (Sıfat Cümleleri)',
  turkishTitle: 'Relativsätze (Sıfat Cümleleri / İlgi Cümleleri)',
  englishTitle: 'Relative Clauses (Relative Pronouns: der/die/das)',
  level: 'B1',
  order: 14,
  explanation: `# Relativsätze (Sıfat Cümleleri / İlgi Cümleleri)

Relativsätze, bir ismi daha detaylı tanımlayan yan cümlelerdir. Türkçe'deki "ki, olan, -en/-an" yapılarına benzer. Almanca'da **Relativpronomen** (ilgi zamiri) ile başlar ve **fiil sona** gider.

## Relativpronomen (İlgi Zamirleri)

İlgi zamiri, tanımladığı ismin **cinsiyetine** ve **sayısına** göre seçilir, ancak **hali (Kasus)** yan cümledeki görevine göre belirlenir.

| | Nominativ | Akkusativ | Dativ |
|---|-----------|-----------|-------|
| **Maskulin** | **der** | **den** | **dem** |
| **Feminin** | **die** | **die** | **der** |
| **Neutrum** | **das** | **das** | **dem** |
| **Plural** | **die** | **die** | **denen** |

## Nominativ (Özne Olarak)

İlgi zamiri yan cümlede **özne** görevindeyse Nominativ kullanılır:
- Der Mann, **der** dort steht, ist mein Vater. (Orada duran adam babam.)
- Die Frau, **die** Deutsch spricht, ist meine Lehrerin. (Almanca konuşan kadın öğretmenim.)
- Das Kind, **das** spielt, ist mein Sohn. (Oynayan çocuk oğlum.)
- Die Leute, **die** hier wohnen, sind nett. (Burada oturan insanlar nazik.)

## Akkusativ (Nesne Olarak)

İlgi zamiri yan cümlede **belirtili nesne** ise Akkusativ kullanılır:
- Der Film, **den** ich gesehen habe, war toll. (İzlediğim film harikaydı.)
- Die Pizza, **die** wir bestellt haben, ist lecker. (Sipariş ettiğimiz pizza lezzetli.)
- Das Buch, **das** ich lese, ist spannend. (Okuduğum kitap heyecan verici.)

## Dativ (Dolaylı Nesne Olarak)

İlgi zamiri yan cümlede **dolaylı nesne** ise Dativ kullanılır:
- Der Mann, **dem** ich geholfen habe, war dankbar. (Yardım ettiğim adam minnettardı.)
- Die Frau, **der** ich das Buch gegeben habe, ist meine Nachbarin. (Kitabı verdiğim kadın komşum.)
- Die Kinder, **denen** wir Geschenke gekauft haben, waren glücklich. (Hediye aldığımız çocuklar mutluydu.)

## Edatlarla Kullanım

Edat varsa, edat ilgi zamirinin **önüne** gelir:
- Der Stuhl, **auf dem** ich sitze, ist bequem. (Üzerinde oturduğum sandalye rahat.)
- Die Stadt, **in der** ich wohne, ist schön. (İçinde yaşadığım şehir güzel.)
- Das Thema, **über das** wir gesprochen haben, war wichtig. (Hakkında konuştuğumuz konu önemliydi.)`,
  explanationEn: `# Relativsätze (Relative Clauses)

Relative clauses are subordinate clauses that provide more detail about a noun. They begin with a **relative pronoun** (Relativpronomen) and the **verb goes to the end**.

## Relative Pronouns (Relativpronomen)

The relative pronoun matches the **gender** and **number** of the noun it refers to, but its **case** is determined by its role within the relative clause.

| | Nominative | Accusative | Dative |
|---|------------|------------|--------|
| **Masculine** | **der** | **den** | **dem** |
| **Feminine** | **die** | **die** | **der** |
| **Neuter** | **das** | **das** | **dem** |
| **Plural** | **die** | **die** | **denen** |

## Nominative (as Subject)

When the relative pronoun is the **subject** of the relative clause:
- Der Mann, **der** dort steht, ist mein Vater. (The man who is standing there is my father.)
- Die Frau, **die** Deutsch spricht, ist meine Lehrerin. (The woman who speaks German is my teacher.)
- Das Kind, **das** spielt, ist mein Sohn. (The child who is playing is my son.)
- Die Leute, **die** hier wohnen, sind nett. (The people who live here are nice.)

## Accusative (as Direct Object)

When the relative pronoun is the **direct object** in the relative clause:
- Der Film, **den** ich gesehen habe, war toll. (The film that I saw was great.)
- Die Pizza, **die** wir bestellt haben, ist lecker. (The pizza that we ordered is delicious.)
- Das Buch, **das** ich lese, ist spannend. (The book that I am reading is exciting.)

## Dative (as Indirect Object)

When the relative pronoun is the **indirect object** in the relative clause:
- Der Mann, **dem** ich geholfen habe, war dankbar. (The man whom I helped was grateful.)
- Die Frau, **der** ich das Buch gegeben habe, ist meine Nachbarin. (The woman to whom I gave the book is my neighbor.)
- Die Kinder, **denen** wir Geschenke gekauft haben, waren glücklich. (The children for whom we bought gifts were happy.)

## With Prepositions

When a preposition is involved, it comes **before** the relative pronoun:
- Der Stuhl, **auf dem** ich sitze, ist bequem. (The chair on which I am sitting is comfortable.)
- Die Stadt, **in der** ich wohne, ist schön. (The city in which I live is beautiful.)
- Das Thema, **über das** wir gesprochen haben, war wichtig. (The topic about which we spoke was important.)`,
  examples: [
    { german: 'Der Mann, der dort steht, ist mein Vater.', turkish: 'Orada duran adam babam.', english: 'The man who is standing there is my father.' },
    { german: 'Die Pizza, die wir bestellt haben, ist lecker.', turkish: 'Sipariş ettiğimiz pizza lezzetli.', english: 'The pizza that we ordered is delicious.' },
    { german: 'Der Freund, dem ich geholfen habe, war sehr dankbar.', turkish: 'Yardım ettiğim arkadaş çok minnettardı.', english: 'The friend whom I helped was very grateful.' },
    { german: 'Das Haus, in dem wir wohnen, ist sehr alt.', turkish: 'İçinde yaşadığımız ev çok eski.', english: 'The house in which we live is very old.' },
    { german: 'Die Kinder, die im Garten spielen, sind laut.', turkish: 'Bahçede oynayan çocuklar gürültücü.', english: 'The children who are playing in the garden are loud.' },
  ],
  exercises: [
    {
      id: 'b1-rs-1',
      type: 'multiple-choice',
      question: 'Die Frau, ___ dort sitzt, ist meine Mutter.',
      explanation: '"Die Frau" dişil (feminin) bir isimdir. Yan cümlede ilgi zamiri özne konumunda (oturan = sitzen), yani Nominativ gerekir. Feminin Nominativ → "die".',
      explanationEn: '"Die Frau" is feminine. The relative pronoun is the subject of the clause (the one sitting), so Nominative case is needed. Feminine Nominative → "die".',
      data: {
        options: ['der', 'die', 'das', 'den'],
        correctIndex: 1,
        explanation: 'Feminin + Nominativ (özne) → die.',
      },
    },
    {
      id: 'b1-rs-2',
      type: 'fill-in-the-blank',
      question: 'Der Film, ___ ich gesehen habe, war sehr gut.',
      explanation: '"Der Film" eril (maskulin) bir isimdir. Yan cümlede ilgi zamiri nesne konumunda (filmi izledim → Akkusativ). Maskulin Akkusativ → "den".',
      explanationEn: '"Der Film" is masculine. The relative pronoun is the direct object in the clause (I saw the film → Accusative). Masculine Accusative → "den".',
      data: {
        answer: 'den',
        hint: 'Eril (maskulin) isim, Akkusativ hali',
        acceptableAnswers: ['den'],
      },
    },
    {
      id: 'b1-rs-3',
      type: 'multiple-choice',
      question: 'Das Kind, ___ ich ein Geschenk gegeben habe, ist mein Neffe.',
      explanation: '"Das Kind" nötr (neutrum) bir isimdir. Yan cümlede "ich habe dem Kind ein Geschenk gegeben" (çocuğa hediye verdim) → dolaylı nesne, Dativ gerekir. Neutrum Dativ → "dem".',
      explanationEn: '"Das Kind" is neuter. In the relative clause, the child is the indirect object (I gave a gift to the child → Dative). Neuter Dative → "dem".',
      data: {
        options: ['das', 'dem', 'den', 'der'],
        correctIndex: 1,
        explanation: 'Neutrum + Dativ (dolaylı nesne) → dem.',
      },
    },
    {
      id: 'b1-rs-4',
      type: 'fill-in-the-blank',
      question: 'Die Kollegen, ___ ich jeden Tag sehe, sind sehr freundlich.',
      explanation: '"Die Kollegen" çoğul (Plural) bir isimdir. Yan cümlede ilgi zamiri nesne konumunda (meslektaşları görüyorum → Akkusativ). Plural Akkusativ → "die".',
      explanationEn: '"Die Kollegen" is plural. The relative pronoun is the direct object (I see the colleagues → Accusative). Plural Accusative → "die".',
      data: {
        answer: 'die',
        hint: 'Çoğul (Plural), Akkusativ hali',
        acceptableAnswers: ['die'],
      },
    },
    {
      id: 'b1-rs-5',
      type: 'fill-in-the-blank',
      question: 'Der Lehrer, von ___ wir viel gelernt haben, geht in Rente.',
      explanation: '"Der Lehrer" eril (maskulin) bir isimdir. "von" edatı Dativ gerektirir. Maskulin Dativ → "dem". "von dem wir gelernt haben" = kendisinden çok şey öğrendiğimiz.',
      explanationEn: '"Der Lehrer" is masculine. The preposition "von" requires Dative case. Masculine Dative → "dem". "von dem wir gelernt haben" = from whom we learned a lot.',
      data: {
        answer: 'dem',
        hint: '"von" edatı + Eril Dativ',
        acceptableAnswers: ['dem'],
      },
    },
  ],
  tips: [
    'Relativpronomen seçerken 2 soru sorun: 1) İsmin cinsiyeti ne? 2) Yan cümledeki görevi ne (Nom/Akk/Dat)?',
    'Cinsiyet (der/die/das) tanımladığı isimden, hal (Kasus) ise yan cümledeki görevden gelir.',
    'Relativsätze her zaman virgülle ayrılır ve fiil sona gider.',
    'Edat varsa, edatın önüne gelir: in dem, auf der, mit denen, über das.',
    'Çoğul Dativ\'de özel form: denen (die yerine). Bunu unutmayın!',
  ],
  tipsEn: [
    'When choosing a relative pronoun, ask 2 questions: 1) What is the gender of the noun? 2) What is its role in the clause (Nom/Acc/Dat)?',
    'Gender (der/die/das) comes from the noun being described; case comes from its function in the relative clause.',
    'Relative clauses are always separated by commas and the verb goes to the end.',
    'With prepositions, the preposition comes before the pronoun: in dem, auf der, mit denen, über das.',
    'Special form in Plural Dative: denen (instead of die). Don\'t forget this!',
  ],
};
