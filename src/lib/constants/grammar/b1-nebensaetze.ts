import { GrammarLesson } from '@/lib/types';

export const b1Nebensaetze: GrammarLesson = {
  id: 'b1-nebensaetze',
  title: 'Nebensätze (Yan Cümleler)',
  turkishTitle: 'Nebensätze (Yan Cümleler: weil, dass, wenn, ob, obwohl, damit)',
  englishTitle: 'Subordinate Clauses (weil, dass, wenn, ob, obwohl, damit)',
  level: 'B1',
  order: 12,
  explanation: `# Nebensätze (Yan Cümleler)

Almanca'da yan cümleler (Nebensätze) belirli bağlaçlarla (Konjunktionen) başlar ve **fiil cümlenin sonuna** gider. Bu, Almanca'nın en önemli gramer kurallarından biridir.

## Temel Kural: Fiil Sonda!

Ana cümlede fiil 2. sırada iken, yan cümlede **fiil en sona** gider:
- Ana cümle: Ich **gehe** heute nicht zur Arbeit.
- Yan cümle: ..., weil ich heute nicht zur Arbeit **gehe**.

## Önemli Bağlaçlar

| Bağlaç | Anlamı | Örnek |
|--------|--------|-------|
| **weil** | çünkü | Ich bleibe zu Hause, **weil** es **regnet**. |
| **dass** | -dığı / -diği (ki) | Ich weiß, **dass** er morgen **kommt**. |
| **wenn** | eğer / -dığında | **Wenn** es **regnet**, bleibe ich zu Hause. |
| **ob** | -ip -mediği / olup olmadığı | Ich weiß nicht, **ob** er **kommt**. |
| **obwohl** | -e rağmen | Er geht raus, **obwohl** es **regnet**. |
| **damit** | -mesi için / -sin diye | Ich lerne, **damit** ich die Prüfung **bestehe**. |

## Söz Dizimi (Wortstellung)

### Yan cümle sonda:
**Ana cümle + , + Bağlaç + ... + Fiil.**
- Ich lerne Deutsch, **weil** ich in Deutschland arbeiten **möchte**.

### Yan cümle başta:
**Bağlaç + ... + Fiil, + Fiil + Ana cümle.**
- **Wenn** ich Zeit **habe**, **gehe** ich ins Kino.

> ⚠️ Yan cümle başta geldiğinde, ana cümle **fiille** başlar (devrik cümle).

## Ayrılabilen Fiiller (Trennbare Verben)

Yan cümlede ayrılabilen fiiller **tekrar birleşir**:
- Ana cümle: Ich **stehe** morgens früh **auf**.
- Yan cümle: ..., weil ich morgens früh **aufstehe**.

## Modalfiiller ile Yan Cümle

Yan cümlede modal fiil varsa, modal fiil en sona gider:
- ..., weil ich morgen arbeiten **muss**.`,
  explanationEn: `# Nebensätze (Subordinate Clauses)

In German, subordinate clauses (Nebensätze) begin with specific conjunctions (Konjunktionen) and the **verb moves to the end** of the clause. This is one of the most important grammar rules in German.

## Key Rule: Verb Goes to the End!

In a main clause, the verb is in the 2nd position. In a subordinate clause, the **verb goes to the very end**:
- Main clause: Ich **gehe** heute nicht zur Arbeit.
- Subordinate clause: ..., weil ich heute nicht zur Arbeit **gehe**.

## Important Conjunctions

| Conjunction | Meaning | Example |
|-------------|---------|---------|
| **weil** | because | Ich bleibe zu Hause, **weil** es **regnet**. |
| **dass** | that | Ich weiß, **dass** er morgen **kommt**. |
| **wenn** | if / when | **Wenn** es **regnet**, bleibe ich zu Hause. |
| **ob** | whether / if | Ich weiß nicht, **ob** er **kommt**. |
| **obwohl** | although | Er geht raus, **obwohl** es **regnet**. |
| **damit** | so that | Ich lerne, **damit** ich die Prüfung **bestehe**. |

## Word Order (Wortstellung)

### Subordinate clause at the end:
**Main clause + , + Conjunction + ... + Verb.**
- Ich lerne Deutsch, **weil** ich in Deutschland arbeiten **möchte**.

### Subordinate clause at the beginning:
**Conjunction + ... + Verb, + Verb + Main clause.**
- **Wenn** ich Zeit **habe**, **gehe** ich ins Kino.

> Note: When the subordinate clause comes first, the main clause starts with the **verb** (inverted word order).

## Separable Verbs (Trennbare Verben)

In subordinate clauses, separable verbs are **joined back together**:
- Main clause: Ich **stehe** morgens früh **auf**.
- Subordinate clause: ..., weil ich morgens früh **aufstehe**.

## Modal Verbs in Subordinate Clauses

When there is a modal verb, the modal verb goes to the very end:
- ..., weil ich morgen arbeiten **muss**.`,
  examples: [
    { german: 'Ich bleibe zu Hause, weil es regnet.', turkish: 'Evde kalıyorum, çünkü yağmur yağıyor.', english: 'I stay at home because it is raining.' },
    { german: 'Er sagt, dass er morgen kommt.', turkish: 'Yarın geleceğini söylüyor.', english: 'He says that he is coming tomorrow.' },
    { german: 'Wenn ich Zeit habe, lese ich ein Buch.', turkish: 'Zamanım olduğunda bir kitap okurum.', english: 'When I have time, I read a book.' },
    { german: 'Ich weiß nicht, ob sie heute kommt.', turkish: 'Bugün gelip gelmeyeceğini bilmiyorum.', english: 'I don\'t know whether she is coming today.' },
    { german: 'Obwohl er müde ist, geht er zur Arbeit.', turkish: 'Yorgun olmasına rağmen işe gidiyor.', english: 'Although he is tired, he goes to work.' },
    { german: 'Ich spare Geld, damit ich ein Auto kaufen kann.', turkish: 'Araba alabilmek için para biriktiriyorum.', english: 'I save money so that I can buy a car.' },
  ],
  exercises: [
    {
      id: 'b1-nb-1',
      type: 'fill-in-the-blank',
      question: 'Ich bleibe zu Hause, ___ es regnet.',
      explanation: '"weil" (çünkü) bağlacı neden bildiren yan cümleler kurar. "weil es regnet" → fiil (regnet) sona gider. Çünkü yağmur yağıyor.',
      explanationEn: '"weil" (because) is a subordinating conjunction that introduces a reason clause. The verb moves to the end: "weil es regnet" → Because it is raining.',
      data: {
        answer: 'weil',
        hint: 'Neden bildiren bağlaç: çünkü',
        acceptableAnswers: ['weil'],
      },
    },
    {
      id: 'b1-nb-2',
      type: 'multiple-choice',
      question: 'Ich hoffe, ___ du morgen kommst.',
      explanation: '"dass" (ki / -dığı) bağlacı bir düşünceyi veya bilgiyi aktarırken kullanılır. "dass du morgen kommst" → Yarın geleceğini.',
      explanationEn: '"dass" (that) is used to introduce a statement or thought as a subordinate clause. "dass du morgen kommst" → that you come tomorrow.',
      data: {
        options: ['weil', 'dass', 'ob', 'wenn'],
        correctIndex: 1,
        explanation: '"dass" bir düşünceyi/bilgiyi aktarır: Umarım (ki) yarın gelirsin.',
      },
    },
    {
      id: 'b1-nb-3',
      type: 'fill-in-the-blank',
      question: '___ ich müde bin, kann ich nicht schlafen.',
      explanation: '"Obwohl" (rağmen) zıtlık bildiren bir bağlaçtır. "Obwohl ich müde bin" → Yorgun olmama rağmen. Yan cümlede fiil (bin) sonda.',
      explanationEn: '"Obwohl" (although) is a concessive conjunction expressing contrast. "Obwohl ich müde bin" → Although I am tired. The verb (bin) goes to the end of the subordinate clause.',
      data: {
        answer: 'Obwohl',
        hint: 'Zıtlık bildiren bağlaç: -e rağmen',
        acceptableAnswers: ['Obwohl', 'obwohl'],
      },
    },
    {
      id: 'b1-nb-4',
      type: 'multiple-choice',
      question: 'Weißt du, ___ der Zug schon abgefahren ist?',
      explanation: '"ob" (olup olmadığı) bağlacı dolaylı evet/hayır soruları için kullanılır. Trenin kalkıp kalkmadığını soruyor.',
      explanationEn: '"ob" (whether/if) is used for indirect yes/no questions. It asks whether the train has already departed.',
      data: {
        options: ['dass', 'weil', 'ob', 'damit'],
        correctIndex: 2,
        explanation: 'Dolaylı evet/hayır soruları için "ob" kullanılır: ...kalkıp kalkmadığını.',
      },
    },
    {
      id: 'b1-nb-5',
      type: 'fill-in-the-blank',
      question: 'Er lernt viel, ___ er die Prüfung besteht.',
      explanation: '"damit" (diye / için) amaç bildiren bir bağlaçtır. "damit er die Prüfung besteht" → Sınavı geçsin diye. Yan cümlede fiil (besteht) sona gider.',
      explanationEn: '"damit" (so that) expresses purpose. "damit er die Prüfung besteht" → so that he passes the exam. The verb (besteht) moves to the end of the subordinate clause.',
      data: {
        answer: 'damit',
        hint: 'Amaç bildiren bağlaç: -sin diye / -mesi için',
        acceptableAnswers: ['damit'],
      },
    },
  ],
  tips: [
    'Yan cümlede fiil HER ZAMAN sona gider.',
    'Yan cümle başta gelirse, ana cümle fiille başlar (devrik cümle).',
    'Ayrılabilen fiiller yan cümlede tekrar birleşir: aufstehen → ...weil ich aufstehe.',
    '"weil" = çünkü, "dass" = ki/-dığı, "wenn" = eğer/-dığında, "ob" = olup olmadığı, "obwohl" = rağmen, "damit" = için/diye.',
    'Virgülü unutmayın: ana cümle ile yan cümle arasına daima virgül gelir.',
  ],
  tipsEn: [
    'In subordinate clauses, the verb ALWAYS goes to the end.',
    'If the subordinate clause comes first, the main clause starts with the verb (inverted order).',
    'Separable verbs rejoin in subordinate clauses: aufstehen → ...weil ich aufstehe.',
    '"weil" = because, "dass" = that, "wenn" = if/when, "ob" = whether, "obwohl" = although, "damit" = so that.',
    'Don\'t forget the comma: always place a comma between the main clause and subordinate clause.',
  ],
};
