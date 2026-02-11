import { GrammarLesson } from '@/lib/types';

export const a2PastTense: GrammarLesson = {
  id: 'a2-past-tense',
  title: 'Perfekt (Geçmiş Zaman)',
  turkishTitle: 'Perfekt (Geçmiş Zaman)',
  englishTitle: 'Perfect Tense (Past Tense)',
  level: 'A2',
  order: 9,
  explanation: `# Perfekt (Geçmiş Zaman)

Günlük konuşmada geçmiş zaman için **Perfekt** kullanılır.

## Yapı: haben/sein + Partizip II

### haben ile (çoğu fiil):
**Ich habe** Deutsch **gelernt**. (Almanca öğrendim.)

### sein ile (hareket/değişim fiilleri):
**Ich bin** nach Berlin **gefahren**. (Berlin'e gittim.)

## Partizip II Oluşturma

### Düzenli fiiller: ge- + kök + -t
- machen → **ge**mach**t**
- lernen → **ge**lern**t**
- kaufen → **ge**kauf**t**

### Düzensiz fiiller: ge- + kök (değişmiş) + -en
- fahren → **ge**fahr**en**
- schreiben → **ge**schrieb**en**
- essen → **ge**gess**en**
- trinken → **ge**trunk**en**
- sprechen → **ge**sproch**en**

### ge- almayan fiiller:
- **be-**: besuchen → besucht
- **ver-**: verstehen → verstanden
- **er-**: erzählen → erzählt
- **-ieren**: studieren → studiert

## sein ile Kullanılan Fiiller
Hareket ve değişim fiilleri: gehen, kommen, fahren, fliegen, laufen, schwimmen, sein, werden, bleiben, sterben`,
  explanationEn: `# Perfekt (Past Tense)

In everyday speech, the **Perfekt** is used for the past tense.

## Structure: haben/sein + Partizip II

### With haben (most verbs):
**Ich habe** Deutsch **gelernt**. (I learned German.)

### With sein (verbs of movement/change):
**Ich bin** nach Berlin **gefahren**. (I went to Berlin.)

## Forming Partizip II

### Regular verbs: ge- + stem + -t
- machen -> **ge**mach**t**
- lernen -> **ge**lern**t**
- kaufen -> **ge**kauf**t**

### Irregular verbs: ge- + stem (changed) + -en
- fahren -> **ge**fahr**en**
- schreiben -> **ge**schrieb**en**
- essen -> **ge**gess**en**
- trinken -> **ge**trunk**en**
- sprechen -> **ge**sproch**en**

### Verbs that don't take ge-:
- **be-**: besuchen -> besucht
- **ver-**: verstehen -> verstanden
- **er-**: erzählen -> erzählt
- **-ieren**: studieren -> studiert

## Verbs Used with sein
Verbs of movement and change of state: gehen, kommen, fahren, fliegen, laufen, schwimmen, sein, werden, bleiben, sterben`,
  examples: [
    { german: 'Ich habe gestern Pizza gegessen.', turkish: 'Dün pizza yedim.', english: 'I ate pizza yesterday.' },
    { german: 'Wir sind nach Istanbul geflogen.', turkish: "İstanbul'a uçtuk.", english: 'We flew to Istanbul.' },
    { german: 'Hast du den Film gesehen?', turkish: 'Filmi gördün mü?', english: 'Did you see the film?' },
    { german: 'Sie ist spät gekommen.', turkish: 'Geç geldi.', english: 'She came late.' },
  ],
  exercises: [
    {
      id: 'a2-pst-1',
      type: 'fill-in-the-blank',
      question: 'Ich ___ gestern viel gelernt. (haben)',
      data: {
        answer: 'habe',
        hint: 'ich + haben',
        acceptableAnswers: ['habe'],
      },
    },
    {
      id: 'a2-pst-2',
      type: 'multiple-choice',
      question: 'Er ___ nach München gefahren.',
      data: {
        options: ['hat', 'ist', 'habe', 'bin'],
        correctIndex: 1,
        explanation: 'fahren hareket fiilidir → sein ile kullanılır: ist gefahren.',
      },
    },
    {
      id: 'a2-pst-3',
      type: 'fill-in-the-blank',
      question: 'machen → ge___ (Partizip II)',
      data: {
        answer: 'gemacht',
        hint: 'ge- + kök + -t',
        acceptableAnswers: ['gemacht'],
      },
    },
    {
      id: 'a2-pst-4',
      type: 'multiple-choice',
      question: 'Partizip II: trinken → ?',
      data: {
        options: ['getrinkt', 'getrunken', 'trinkt', 'getranken'],
        correctIndex: 1,
        explanation: 'trinken düzensizdir: ge- + trunk + -en → getrunken.',
      },
    },
    {
      id: 'a2-pst-5',
      type: 'word-ordering',
      question: 'Cümleyi oluşturun:',
      data: {
        words: ['habe', 'Ich', 'gekauft', 'ein Buch'],
        correctOrder: [1, 0, 3, 2],
        hint: 'haben 2. pozisyonda, Partizip II sonda',
      },
    },
  ],
  tips: [
    'Günlük konuşmada geçmiş zaman = Perfekt.',
    'Hareket fiilleri (gehen, fahren, kommen...) → sein ile.',
    'Düzenli: ge-...-t, Düzensiz: ge-...-en (kök değişir).',
    'be-, ver-, er- ve -ieren ile başlayan fiiller ge- almaz!',
  ],
  tipsEn: [
    'In everyday speech, past tense = Perfekt.',
    'Verbs of movement (gehen, fahren, kommen...) -> use sein.',
    'Regular: ge-...-t, Irregular: ge-...-en (stem changes).',
    'Verbs starting with be-, ver-, er- and -ieren do not take ge-!',
  ],
};
