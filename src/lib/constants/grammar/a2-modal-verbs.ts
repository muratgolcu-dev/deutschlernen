import { GrammarLesson } from '@/lib/types';

export const a2ModalVerbs: GrammarLesson = {
  id: 'a2-modal-verbs',
  title: 'Modalverben',
  turkishTitle: 'Yardımcı Fiiller (Modal)',
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
  examples: [
    { german: 'Kannst du mir helfen?', turkish: 'Bana yardım edebilir misin?' },
    { german: 'Ich muss jetzt gehen.', turkish: 'Şimdi gitmem gerekiyor.' },
    { german: 'Wir wollen Deutsch lernen.', turkish: 'Almanca öğrenmek istiyoruz.' },
    { german: 'Darf ich hier rauchen?', turkish: 'Burada sigara içebilir miyim?' },
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
};
