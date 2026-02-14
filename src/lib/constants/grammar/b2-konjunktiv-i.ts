import { GrammarLesson } from '@/lib/types';

export const b2KonjunktivI: GrammarLesson = {
  id: 'b2-konjunktiv-i',
  title: 'Konjunktiv I (Dolaylı Anlatım)',
  turkishTitle: 'Konjunktiv I (Dolaylı Anlatım: er sei, er habe, er könne)',
  englishTitle: 'Subjunctive I (Indirect / Reported Speech)',
  level: 'B2',
  order: 16,
  explanation: `# Konjunktiv I (Dolaylı Anlatım)

Konjunktiv I, başkasının söylediğini aktarmak (dolaylı anlatım / indirekte Rede) için kullanılır. Özellikle gazete ve haber dilinde çok yaygındır.

## Oluşturulması

Fiilin kökü (Infinitiv - "en") + Konjunktiv I ekleri:

| Şahıs | Ek | sein | haben | können |
|--------|-----|------|-------|--------|
| ich | -e | sei | habe | könne |
| du | -est | sei(e)st | habest | könnest |
| er/sie/es | -e | **sei** | **habe** | **könne** |
| wir | -en | seien | haben* | können* |
| ihr | -et | seiet | habet | könnet |
| sie/Sie | -en | seien | haben* | können* |

*\\* "wir" ve "sie/Sie" formları Indikativ ile aynı olduğunda, Konjunktiv II kullanılır.*

## Kullanım Alanları

### 1. Dolaylı Anlatım (Indirekte Rede)
Direkt: Er sagte: "Ich **bin** krank."
Indirekt: Er sagte, er **sei** krank.

Direkt: Sie sagte: "Ich **habe** keine Zeit."
Indirekt: Sie sagte, sie **habe** keine Zeit.

### 2. Gazete / Haber Dili
- Der Minister **erklärte**, die Wirtschaft **wachse** weiter.
  (Bakan, ekonominin büyümeye devam ettiğini açıkladı.)
- Die Polizei **teilte** mit, der Verdächtige **sei** geflohen.
  (Polis, şüphelinin kaçtığını bildirdi.)

### 3. Konjunktiv I Geçmiş Zaman
**habe/sei + Partizip II** ile oluşturulur:
- Er sagte, er **habe** das Buch **gelesen**.
  (Kitabı okuduğunu söyledi.)
- Sie berichtete, sie **sei** nach Berlin **gefahren**.
  (Berlin'e gittiğini bildirdi.)

## Konjunktiv I = Konjunktiv II Olduğunda
Konjunktiv I formu Indikativ ile aynıysa, Konjunktiv II kullanılır:
- Sie sagten, sie **hätten** (nicht: haben) keine Zeit.
- Wir behaupteten, wir **wüssten** (nicht: wissen) nichts davon.

## Önemli Aktarım Fiilleri
sagen, erklären, berichten, behaupten, meinen, mitteilen, betonen`,
  explanationEn: `# Konjunktiv I (Indirect / Reported Speech)

Konjunktiv I is used to report what someone else said (indirect speech / indirekte Rede). It is especially common in newspaper and journalistic language.

## Formation

Verb stem (Infinitive minus "-en") + Konjunktiv I endings:

| Person | Ending | sein | haben | können |
|--------|--------|------|-------|--------|
| ich | -e | sei | habe | könne |
| du | -est | sei(e)st | habest | könnest |
| er/sie/es | -e | **sei** | **habe** | **könne** |
| wir | -en | seien | haben* | können* |
| ihr | -et | seiet | habet | könnet |
| sie/Sie | -en | seien | haben* | können* |

*\\* When "wir" and "sie/Sie" forms are identical to the indicative, Konjunktiv II is used instead.*

## Usage

### 1. Indirect Speech (Indirekte Rede)
Direct: Er sagte: "Ich **bin** krank."
Indirect: Er sagte, er **sei** krank.

Direct: Sie sagte: "Ich **habe** keine Zeit."
Indirect: Sie sagte, sie **habe** keine Zeit.

### 2. Newspaper / Journalistic Language
- Der Minister **erklärte**, die Wirtschaft **wachse** weiter.
  (The minister stated that the economy continued to grow.)
- Die Polizei **teilte** mit, der Verdächtige **sei** geflohen.
  (The police reported that the suspect had fled.)

### 3. Konjunktiv I Past Tense
Formed with **habe/sei + Partizip II**:
- Er sagte, er **habe** das Buch **gelesen**.
  (He said he had read the book.)
- Sie berichtete, sie **sei** nach Berlin **gefahren**.
  (She reported that she had gone to Berlin.)

## When Konjunktiv I = Indicative
If the Konjunktiv I form is identical to the indicative, Konjunktiv II is used instead:
- Sie sagten, sie **hätten** (not: haben) keine Zeit.
- Wir behaupteten, wir **wüssten** (not: wissen) nichts davon.

## Important Reporting Verbs
sagen, erklären, berichten, behaupten, meinen, mitteilen, betonen`,
  examples: [
    { german: 'Er sagte, er sei krank.', turkish: 'Hasta olduğunu söyledi.', english: 'He said he was sick.' },
    { german: 'Sie behauptete, sie habe nichts gewusst.', turkish: 'Hiçbir şey bilmediğini iddia etti.', english: 'She claimed she had known nothing.' },
    { german: 'Der Minister erklärte, die Lage sei stabil.', turkish: 'Bakan durumun stabil olduğunu açıkladı.', english: 'The minister stated that the situation was stable.' },
    { german: 'Die Zeitung berichtete, der Präsident habe das Land verlassen.', turkish: 'Gazete, başkanın ülkeyi terk ettiğini bildirdi.', english: 'The newspaper reported that the president had left the country.' },
    { german: 'Sie sagten, sie hätten keine Zeit.', turkish: 'Zamanları olmadığını söylediler.', english: 'They said they had no time.' },
  ],
  exercises: [
    {
      id: 'b2-kj1-1',
      type: 'multiple-choice',
      question: 'Er sagte, er ___ keine Zeit.',
      explanation: '"haben" fiilinin Konjunktiv I formu (er/sie/es): "habe". Dolaylı anlatımda kullanılır: "Zamanı olmadığını söyledi."',
      explanationEn: 'Konjunktiv I of "haben" (er/sie/es): "habe". Used in indirect speech: "He said he had no time."',
      data: {
        options: ['hat', 'habe', 'hätte', 'haben'],
        correctIndex: 1,
        explanation: 'Indirekte Rede: haben → habe (Konjunktiv I, 3. Şahıs).',
      },
    },
    {
      id: 'b2-kj1-2',
      type: 'fill-in-the-blank',
      question: 'Die Lehrerin sagte, die Prüfung ___ leicht. (sein)',
      explanation: '"sein" fiilinin Konjunktiv I formu (er/sie/es): "sei". Dolaylı anlatımda: "Öğretmen, sınavın kolay olduğunu söyledi."',
      explanationEn: 'Konjunktiv I of "sein" (er/sie/es): "sei". In indirect speech: "The teacher said the exam was easy."',
      data: {
        answer: 'sei',
        hint: 'sein → Konjunktiv I (3. Şahıs)',
        acceptableAnswers: ['sei'],
      },
    },
    {
      id: 'b2-kj1-3',
      type: 'multiple-choice',
      question: 'Der Arzt meinte, der Patient ___ sich mehr ausruhen.',
      explanation: '"müssen" fiilinin Konjunktiv I formu (er/sie/es): "müsse". "Doktor, hastanın daha fazla dinlenmesi gerektiğini söyledi."',
      explanationEn: 'Konjunktiv I of "müssen" (er/sie/es): "müsse". "The doctor said the patient needed to rest more."',
      data: {
        options: ['muss', 'müsse', 'müsste', 'musste'],
        correctIndex: 1,
        explanation: 'Indirekte Rede: müssen → müsse (Konjunktiv I).',
      },
    },
    {
      id: 'b2-kj1-4',
      type: 'fill-in-the-blank',
      question: 'Sie berichtete, sie ___ das Buch schon gelesen. (haben)',
      explanation: 'Konjunktiv I geçmiş zaman: "habe + Partizip II". "Kitabı çoktan okuduğunu bildirdi." habe burada yardımcı fiil olarak kullanılır.',
      explanationEn: 'Konjunktiv I past tense: "habe + Partizip II". "She reported she had already read the book." habe is used here as the auxiliary verb.',
      data: {
        answer: 'habe',
        hint: 'Konjunktiv I Vergangenheit: habe + Partizip II',
        acceptableAnswers: ['habe'],
      },
    },
    {
      id: 'b2-kj1-5',
      type: 'multiple-choice',
      question: 'Die Studenten sagten, sie ___ den Text nicht verstanden. (Konjunktiv I formu Indikativ ile aynı olduğundan?)',
      explanation: '"sie haben" Konjunktiv I formu "sie haben" ile aynıdır (Indikativ = Konjunktiv I). Bu yüzden Konjunktiv II "hätten" kullanılır.',
      explanationEn: 'The Konjunktiv I of "sie haben" is identical to the indicative "sie haben". Therefore, Konjunktiv II "hätten" is used instead.',
      data: {
        options: ['haben', 'habe', 'hätten', 'hatten'],
        correctIndex: 2,
        explanation: 'Konjunktiv I = Indikativ olduğunda → Konjunktiv II (hätten) kullanılır.',
      },
    },
  ],
  tips: [
    'Konjunktiv I en çok 3. tekil şahısta (er/sie/es) kullanılır: sei, habe, könne, müsse.',
    'Gazete haberleri ve resmi metinlerde çok yaygındır.',
    'Konjunktiv I formu Indikativ ile aynıysa → Konjunktiv II kullanın.',
    'Geçmiş zaman: habe/sei + Partizip II.',
    'Günlük konuşmada genellikle "dass" ile Indikativ kullanılır: Er sagte, dass er krank ist.',
  ],
  tipsEn: [
    'Konjunktiv I is most commonly used in 3rd person singular: sei, habe, könne, müsse.',
    'Very common in newspaper reports and formal texts.',
    'If Konjunktiv I is identical to indicative → use Konjunktiv II instead.',
    'Past tense: habe/sei + Partizip II.',
    'In everyday speech, "dass" + indicative is often used instead: Er sagte, dass er krank ist.',
  ],
};
