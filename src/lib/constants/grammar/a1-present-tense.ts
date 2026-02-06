import { GrammarLesson } from '@/lib/types';

export const a1PresentTense: GrammarLesson = {
  id: 'a1-present-tense',
  title: 'Präsens: Geniş Zaman',
  turkishTitle: 'Şimdiki/Geniş Zaman',
  level: 'A1',
  order: 2,
  explanation: `# Präsens (Şimdiki/Geniş Zaman)

Almanca'da şimdiki zaman, fiil köküne kişi eklerinin eklenmesiyle oluşturulur.

## Düzenli Fiiller - Çekim Tablosu

**machen** (yapmak) → kök: **mach-**

| Kişi | Ek | Örnek |
|------|-----|-------|
| ich | -e | ich mach**e** |
| du | -st | du mach**st** |
| er/sie/es | -t | er mach**t** |
| wir | -en | wir mach**en** |
| ihr | -t | ihr mach**t** |
| sie/Sie | -en | sie mach**en** |

## Önemli Düzensiz Fiiller

### sein (olmak)
ich **bin**, du **bist**, er **ist**, wir **sind**, ihr **seid**, sie **sind**

### haben (sahip olmak)
ich **habe**, du **hast**, er **hat**, wir **haben**, ihr **habt**, sie **haben**

### werden (olmak/dönüşmek)
ich **werde**, du **wirst**, er **wird**, wir **werden**, ihr **werdet**, sie **werden**`,
  examples: [
    { german: 'Ich lerne Deutsch.', turkish: 'Almanca öğreniyorum.' },
    { german: 'Du spielst Fußball.', turkish: 'Futbol oynuyorsun.' },
    { german: 'Er arbeitet in Berlin.', turkish: "Berlin'de çalışıyor." },
    { german: 'Wir wohnen in München.', turkish: "Münih'te oturuyoruz." },
  ],
  exercises: [
    {
      id: 'a1-pt-1',
      type: 'fill-in-the-blank',
      question: 'Ich ___ (lernen) Deutsch.',
      data: {
        answer: 'lerne',
        hint: 'ich + -e',
        acceptableAnswers: ['lerne'],
      },
    },
    {
      id: 'a1-pt-2',
      type: 'fill-in-the-blank',
      question: 'Du ___ (spielen) Gitarre.',
      data: {
        answer: 'spielst',
        hint: 'du + -st',
        acceptableAnswers: ['spielst'],
      },
    },
    {
      id: 'a1-pt-3',
      type: 'conjugation-table',
      question: '"wohnen" (oturmak) fiilini çekimleyin:',
      data: {
        verb: 'wohnen',
        pronouns: ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'],
        answers: ['wohne', 'wohnst', 'wohnt', 'wohnen', 'wohnt', 'wohnen'],
      },
    },
    {
      id: 'a1-pt-4',
      type: 'multiple-choice',
      question: 'Er ___ sehr gut Deutsch.',
      data: {
        options: ['spreche', 'sprichst', 'spricht', 'sprechen'],
        correctIndex: 2,
        explanation: 'Er/sie/es kişisi için "sprechen" fiili "spricht" olur (kök değişimi e→i).',
      },
    },
    {
      id: 'a1-pt-5',
      type: 'fill-in-the-blank',
      question: 'Wir ___ (sein) aus der Türkei.',
      data: {
        answer: 'sind',
        hint: '"sein" düzensiz fiildir',
        acceptableAnswers: ['sind'],
      },
    },
  ],
  tips: [
    'Düzenli fiillerde kökü bulmak için -en sonekini kaldırın.',
    'Du formu her zaman -st ile biter.',
    'Er/sie/es formu her zaman -t ile biter.',
    'sein, haben ve werden fiilleri tamamen düzensizdir - ezberleyin!',
  ],
};
