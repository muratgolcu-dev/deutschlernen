import { GrammarLesson } from '@/lib/types';

export const a1PresentTense: GrammarLesson = {
  id: 'a1-present-tense',
  title: 'Präsens: Geniş Zaman',
  turkishTitle: 'Şimdiki/Geniş Zaman',
  englishTitle: 'Present Tense',
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
  explanationEn: `# Präsens (Present Tense)

In German, the present tense is formed by adding personal endings to the verb stem.

## Regular Verbs - Conjugation Table

**machen** (to do/make) - stem: **mach-**

| Person | Ending | Example |
|--------|--------|---------|
| ich | -e | ich mach**e** |
| du | -st | du mach**st** |
| er/sie/es | -t | er mach**t** |
| wir | -en | wir mach**en** |
| ihr | -t | ihr mach**t** |
| sie/Sie | -en | sie mach**en** |

## Important Irregular Verbs

### sein (to be)
ich **bin**, du **bist**, er **ist**, wir **sind**, ihr **seid**, sie **sind**

### haben (to have)
ich **habe**, du **hast**, er **hat**, wir **haben**, ihr **habt**, sie **haben**

### werden (to become)
ich **werde**, du **wirst**, er **wird**, wir **werden**, ihr **werdet**, sie **werden**`,
  examples: [
    { german: 'Ich lerne Deutsch.', turkish: 'Almanca öğreniyorum.', english: 'I am learning German.' },
    { german: 'Du spielst Fußball.', turkish: 'Futbol oynuyorsun.', english: 'You play football.' },
    { german: 'Er arbeitet in Berlin.', turkish: "Berlin'de çalışıyor.", english: 'He works in Berlin.' },
    { german: 'Wir wohnen in München.', turkish: "Münih'te oturuyoruz.", english: 'We live in Munich.' },
  ],
  exercises: [
    {
      id: 'a1-pt-1',
      type: 'fill-in-the-blank',
      question: 'Ich ___ (lernen) Deutsch.',
      explanation: 'Düzenli fiil çekimi: kök (lern-) + ich eki (-e) = lerne.',
      explanationEn: 'Regular verb conjugation: stem (lern-) + ich ending (-e) = lerne.',
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
      explanation: 'Düzenli fiil çekimi: kök (spiel-) + du eki (-st) = spielst.',
      explanationEn: 'Regular verb conjugation: stem (spiel-) + du ending (-st) = spielst.',
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
      explanation: 'Düzenli fiil: kök wohn- + kişi ekleri (-e, -st, -t, -en, -t, -en).',
      explanationEn: 'Regular verb: stem wohn- + personal endings (-e, -st, -t, -en, -t, -en).',
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
      explanation: 'sprechen düzensiz bir fiildir: er/sie/es formunda kök ünlüsü e → i olur: spricht.',
      explanationEn: 'sprechen is an irregular verb: in the er/sie/es form, the stem vowel changes from e → i: spricht.',
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
      explanation: 'sein tamamen düzensiz bir fiildir. "wir" ile sein → sind olur.',
      explanationEn: 'sein is a completely irregular verb. With "wir", sein becomes sind.',
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
  tipsEn: [
    'To find the stem of regular verbs, remove the -en ending.',
    'The du form always ends in -st.',
    'The er/sie/es form always ends in -t.',
    'The verbs sein, haben, and werden are completely irregular - memorize them!',
  ],
};
