import { GrammarLesson } from '@/lib/types';

export const a2ModalVerbs: GrammarLesson = {
  id: 'a2-modal-verbs',
  title: 'Modalverben',
  turkishTitle: 'Yardımcı Fiiller (Modal)',
  englishTitle: 'Modal Verbs',
  level: 'A2',
  order: 8,
  explanation: `# Modalverben (Yardımcı Fiiller)

Modal fiiller ana fiilin anlamını değiştirir. Ana fiil cümle sonunda mastar haliyle kalır.

## 6 Modal Fiil

| Modal | Anlam | Örnek |
|-------|-------|-------|
| **können** | -ebilmek | Ich **kann** schwimmen. |
| **müssen** | -meli, zorunda | Ich **muss** arbeiten. |
| **wollen** | istemek | Ich **will** essen. |
| **sollen** | -meli (tavsiye) | Du **sollst** lernen. |
| **dürfen** | izni olmak | Ich **darf** rauchen? |
| **möchten** | istemek (kibar) | Ich **möchte** Kaffee. |

## Çekim: können

| Kişi | Çekim |
|------|-------|
| ich | **kann** |
| du | **kannst** |
| er/sie/es | **kann** |
| wir | **können** |
| ihr | **könnt** |
| sie/Sie | **können** |

## Cümle Yapısı
Modal fiil → 2. pozisyon, Ana fiil → cümle sonu (mastar)

**Ich kann gut Deutsch sprechen.**
(İyi Almanca konuşabiliyorum.)

## müssen vs. nicht müssen vs. nicht dürfen
- Ich **muss** gehen. (Gitmem gerekiyor.)
- Ich **muss nicht** gehen. (Gitmem gerekmiyor.) ← zorunluluk yok
- Ich **darf nicht** gehen. (Gitmem yasak.) ← yasak!`,
  explanationEn: `# Modal Verbs (Modalverben)

Modal verbs modify the meaning of the main verb. The main verb stays in infinitive form at the end of the sentence.

## 6 Modal Verbs

| Modal | Meaning | Example |
|-------|---------|---------|
| **können** | can, to be able to | Ich **kann** schwimmen. |
| **müssen** | must, to have to | Ich **muss** arbeiten. |
| **wollen** | to want | Ich **will** essen. |
| **sollen** | should, ought to | Du **sollst** lernen. |
| **dürfen** | may, to be allowed to | Ich **darf** rauchen? |
| **möchten** | would like (polite) | Ich **möchte** Kaffee. |

## Conjugation: können

| Person | Conjugation |
|--------|-------------|
| ich | **kann** |
| du | **kannst** |
| er/sie/es | **kann** |
| wir | **können** |
| ihr | **könnt** |
| sie/Sie | **können** |

## Sentence Structure
Modal verb -> 2nd position, Main verb -> end of sentence (infinitive)

**Ich kann gut Deutsch sprechen.**
(I can speak German well.)

## müssen vs. nicht müssen vs. nicht dürfen
- Ich **muss** gehen. (I have to go.)
- Ich **muss nicht** gehen. (I don't have to go.) <- no obligation
- Ich **darf nicht** gehen. (I am not allowed to go.) <- forbidden!`,
  examples: [
    { german: 'Kannst du mir helfen?', turkish: 'Bana yardım edebilir misin?', english: 'Can you help me?' },
    { german: 'Ich muss jetzt gehen.', turkish: 'Şimdi gitmem gerekiyor.', english: 'I have to go now.' },
    { german: 'Wir wollen Deutsch lernen.', turkish: 'Almanca öğrenmek istiyoruz.', english: 'We want to learn German.' },
    { german: 'Darf ich hier rauchen?', turkish: 'Burada sigara içebilir miyim?', english: 'Am I allowed to smoke here?' },
  ],
  exercises: [
    {
      id: 'a2-mv-1',
      type: 'fill-in-the-blank',
      question: 'Ich ___ (können) gut schwimmen.',
      data: {
        answer: 'kann',
        hint: 'ich formu',
        acceptableAnswers: ['kann'],
      },
    },
    {
      id: 'a2-mv-2',
      type: 'multiple-choice',
      question: '"Gitmem yasak" Almanca\'da nasıl söylenir?',
      data: {
        options: ['Ich muss nicht gehen.', 'Ich darf nicht gehen.', 'Ich kann nicht gehen.', 'Ich will nicht gehen.'],
        correctIndex: 1,
        explanation: 'Yasak → darf nicht. "muss nicht" sadece zorunluluk olmadığını ifade eder.',
      },
    },
    {
      id: 'a2-mv-3',
      type: 'word-ordering',
      question: 'Cümleyi doğru sıraya koyun:',
      data: {
        words: ['sprechen', 'du', 'Kannst', 'Deutsch'],
        correctOrder: [2, 1, 3, 0],
        hint: 'Modal fiil 2. sırada, ana fiil sonda',
      },
    },
    {
      id: 'a2-mv-4',
      type: 'fill-in-the-blank',
      question: 'Er ___ (müssen) morgen früh aufstehen.',
      data: {
        answer: 'muss',
        hint: 'er formu',
        acceptableAnswers: ['muss'],
      },
    },
    {
      id: 'a2-mv-5',
      type: 'multiple-choice',
      question: 'Ich ___ einen Kaffee, bitte.',
      data: {
        options: ['möchte', 'muss', 'kann', 'darf'],
        correctIndex: 0,
        explanation: 'Kibar istek → möchte (isterdim).',
      },
    },
  ],
  tips: [
    'Modal fiil 2. pozisyonda, ana fiil cümle sonunda mastar haliyle!',
    'nicht dürfen = yasak, nicht müssen = gerekmiyor (farklı!)',
    'möchten kibar istek ifadesidir, wollen daha doğrudan.',
  ],
  tipsEn: [
    'Modal verb in 2nd position, main verb at the end of the sentence in infinitive form!',
    'nicht dürfen = forbidden, nicht müssen = not necessary (different!)',
    'möchten is a polite request, wollen is more direct.',
  ],
};
