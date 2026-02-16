import { GrammarLesson } from '@/lib/types';

export const b2Partizip: GrammarLesson = {
  id: 'b2-partizip',
  title: 'Partizip I & II als Adjektiv',
  turkishTitle: 'Partizip I & II Sıfat Olarak (Ortaç Yapıları)',
  englishTitle: 'Participles I & II as Adjectives (Extended Attributes)',
  level: 'B2',
  order: 17,
  explanation: `# Partizip I & II als Adjektiv (Ortaçların Sıfat Olarak Kullanımı)

Almanca'da hem Partizip I (şimdiki zaman ortacı) hem de Partizip II (geçmiş zaman ortacı) sıfat olarak isimlerden önce kullanılabilir. Bu yapı özellikle yazı dilinde çok yaygındır.

## Partizip I (Partizip Präsens)

### Oluşturulması
**Infinitiv + d** → sıfat eki

| Infinitiv | Partizip I | Anlamı |
|-----------|------------|--------|
| schlafen | schlaf**end** | uyuyan |
| fahren | fahr**end** | süren / giden |
| lachen | lach**end** | gülen |
| spielen | spiel**end** | oynayan |
| wachsen | wachs**end** | büyüyen |

### Kullanımı
Partizip I, **aktif ve devam eden** bir eylemi ifade eder:
- das schlaf**ende** Kind = das Kind, das schläft (uyuyan çocuk)
- der fahr**ende** Zug = der Zug, der fährt (hareket eden tren)
- die lach**enden** Kinder = die Kinder, die lachen (gülen çocuklar)

## Partizip II (Partizip Perfekt)

### Oluşturulması
Fiilin Partizip II formu (ge-...-t / ge-...-en) → sıfat eki

| Infinitiv | Partizip II | Anlamı |
|-----------|-------------|--------|
| kochen | **gekocht** | pişirilmiş |
| schreiben | **geschrieben** | yazılmış |
| reparieren | **repariert** | tamir edilmiş |
| brechen | **gebrochen** | kırılmış |
| öffnen | **geöffnet** | açılmış |

### Kullanımı
Partizip II, **pasif ve tamamlanmış** bir eylemi ifade eder:
- das **gekochte** Ei = das Ei, das gekocht wurde (pişirilmiş yumurta)
- der **geschriebene** Brief = der Brief, der geschrieben wurde (yazılmış mektup)
- die **geöffnete** Tür = die Tür, die geöffnet wurde (açılmış kapı)

## Erweiterte Partizipialattribute (Genişletilmiş Ortaç Yapıları)

Partizip sıfatları, ek bilgilerle genişletilebilir:
- der **im Park spielende** Hund (parkta oynayan köpek)
- die **von meiner Mutter gekochte** Suppe (annem tarafından pişirilen çorba)
- das **gestern reparierte** Auto (dün tamir edilen araba)

### Yapı Kuralı
**Artikel + (ek bilgi) + Partizip + sıfat eki + İsim**

## Partizip I vs. Partizip II

| Partizip I (Aktif / Devam Eden) | Partizip II (Pasif / Tamamlanmış) |
|--------------------------------|----------------------------------|
| das **kochende** Wasser (kaynayan su) | das **gekochte** Wasser (kaynatılmış su) |
| der **fahrende** Zug (hareket eden tren) | der **gefahrene** Weg (gidilmiş yol) |
| die **wachsende** Stadt (büyüyen şehir) | die **gewachsene** Pflanze (büyümüş bitki) |`,
  explanationEn: `# Partizip I & II as Adjectives (Extended Attributes)

In German, both Partizip I (present participle) and Partizip II (past participle) can be used as adjectives before nouns. This structure is especially common in written language.

## Partizip I (Present Participle)

### Formation
**Infinitive + d** → adjective ending

| Infinitive | Partizip I | Meaning |
|------------|------------|---------|
| schlafen | schlaf**end** | sleeping |
| fahren | fahr**end** | driving / moving |
| lachen | lach**end** | laughing |
| spielen | spiel**end** | playing |
| wachsen | wachs**end** | growing |

### Usage
Partizip I expresses an **active and ongoing** action:
- das schlaf**ende** Kind = das Kind, das schläft (the sleeping child)
- der fahr**ende** Zug = der Zug, der fährt (the moving train)
- die lach**enden** Kinder = die Kinder, die lachen (the laughing children)

## Partizip II (Past Participle)

### Formation
The Partizip II form of the verb (ge-...-t / ge-...-en) → adjective ending

| Infinitive | Partizip II | Meaning |
|------------|-------------|---------|
| kochen | **gekocht** | cooked |
| schreiben | **geschrieben** | written |
| reparieren | **repariert** | repaired |
| brechen | **gebrochen** | broken |
| öffnen | **geöffnet** | opened |

### Usage
Partizip II expresses a **passive and completed** action:
- das **gekochte** Ei = das Ei, das gekocht wurde (the cooked/boiled egg)
- der **geschriebene** Brief = der Brief, der geschrieben wurde (the written letter)
- die **geöffnete** Tür = die Tür, die geöffnet wurde (the opened door)

## Extended Participial Attributes (Erweiterte Partizipialattribute)

Participial adjectives can be extended with additional information:
- der **im Park spielende** Hund (the dog playing in the park)
- die **von meiner Mutter gekochte** Suppe (the soup cooked by my mother)
- das **gestern reparierte** Auto (the car repaired yesterday)

### Structure Rule
**Article + (additional info) + Participle + adjective ending + Noun**

## Partizip I vs. Partizip II

| Partizip I (Active / Ongoing) | Partizip II (Passive / Completed) |
|-------------------------------|----------------------------------|
| das **kochende** Wasser (boiling water) | das **gekochte** Wasser (boiled water) |
| der **fahrende** Zug (moving train) | der **gefahrene** Weg (traveled path) |
| die **wachsende** Stadt (growing city) | die **gewachsene** Pflanze (grown plant) |`,
  examples: [
    { german: 'Das schlafende Kind liegt im Bett.', turkish: 'Uyuyan çocuk yatakta yatıyor.', english: 'The sleeping child is lying in bed.' },
    { german: 'Die gekochte Suppe schmeckt gut.', turkish: 'Pişirilmiş çorba lezzetli.', english: 'The cooked soup tastes good.' },
    { german: 'Der im Park spielende Hund gehört meinem Nachbarn.', turkish: 'Parkta oynayan köpek komşuma ait.', english: 'The dog playing in the park belongs to my neighbor.' },
    { german: 'Die gestern geschriebene E-Mail wurde schon beantwortet.', turkish: 'Dün yazılan e-posta zaten cevaplandı.', english: 'The email written yesterday has already been answered.' },
    { german: 'Das kochende Wasser ist sehr heiß.', turkish: 'Kaynayan su çok sıcak.', english: 'The boiling water is very hot.' },
  ],
  exercises: [
    {
      id: 'b2-ptz-1',
      type: 'multiple-choice',
      question: 'Das ___ Kind wurde von seiner Mutter geweckt.',
      explanation: 'Uyuyan çocuk = aktif, devam eden bir eylem → Partizip I: "schlafend". Sıfat eki: das Kind (nötr, Nominativ) → schlafende.',
      explanationEn: 'The sleeping child = active, ongoing action → Partizip I: "schlafend". Adjective ending: das Kind (neuter, nominative) → schlafende.',
      data: {
        options: ['schlafene', 'schlafende', 'geschlafene', 'geschlafende'],
        correctIndex: 1,
        explanation: 'Aktif/devam eden eylem → Partizip I: schlafend + sıfat eki.',
      },
    },
    {
      id: 'b2-ptz-2',
      type: 'fill-in-the-blank',
      question: 'Die ___ Suppe schmeckt sehr gut. (kochen → Partizip II)',
      explanation: '"kochen" fiilinin Partizip II formu "gekocht"tur. Pişirilmiş çorba = pasif, tamamlanmış eylem → Partizip II sıfat olarak: "gekochte".',
      explanationEn: 'The Partizip II of "kochen" is "gekocht". Cooked soup = passive, completed action → Partizip II as adjective: "gekochte".',
      data: {
        answer: 'gekochte',
        hint: 'Partizip II: ge- + Koch + -t + sıfat eki (die Suppe → -e)',
        acceptableAnswers: ['gekochte'],
      },
    },
    {
      id: 'b2-ptz-3',
      type: 'multiple-choice',
      question: 'Der ___ Zug hält nicht in dieser Station.',
      explanation: 'Hareket eden tren = aktif, devam eden eylem → Partizip I: "fahrend". Der Zug (eril, Nominativ) → "fahrende".',
      explanationEn: 'The moving train = active, ongoing action → Partizip I: "fahrend". Der Zug (masculine, nominative) → "fahrende".',
      data: {
        options: ['gefahrene', 'fahrende', 'gefahren', 'fahrender'],
        correctIndex: 1,
        explanation: 'Aktif/devam eden → Partizip I: fahrend + sıfat eki → fahrende.',
      },
    },
    {
      id: 'b2-ptz-4',
      type: 'fill-in-the-blank',
      question: 'Das gestern ___ Auto fährt wieder. (reparieren → Partizip II)',
      explanation: '"reparieren" fiilinin Partizip II formu "repariert"tir (ge- almaz, çünkü -ieren ile biter). Dün tamir edilen araba → "reparierte".',
      explanationEn: '"reparieren" Partizip II is "repariert" (no ge- prefix because it ends in -ieren). The car repaired yesterday → "reparierte".',
      data: {
        answer: 'reparierte',
        hint: '-ieren fiilleri ge- almaz: repariert + sıfat eki',
        acceptableAnswers: ['reparierte'],
      },
    },
    {
      id: 'b2-ptz-5',
      type: 'multiple-choice',
      question: 'Welcher Satz ist richtig? (Hangi cümle doğru?)',
      explanation: '"kochend" (Partizip I) = kaynayan (aktif, su şu an kaynıyor). "gekocht" (Partizip II) = kaynatılmış (pasif, su daha önce kaynatıldı). Kaynayan su = aktif eylem → kochende.',
      explanationEn: '"kochend" (Partizip I) = boiling (active, the water is boiling now). "gekocht" (Partizip II) = boiled (passive, the water was boiled before). Boiling water = active action → kochende.',
      data: {
        options: [
          'Gieß das kochende Wasser in die Tasse.',
          'Gieß das kochene Wasser in die Tasse.',
          'Gieß das gekochende Wasser in die Tasse.',
          'Gieß das kochte Wasser in die Tasse.',
        ],
        correctIndex: 0,
        explanation: 'Partizip I sıfat olarak: kochend + sıfat eki → kochende.',
      },
    },
  ],
  tips: [
    'Partizip I (aktif/devam eden): Infinitiv + d + sıfat eki → schlafende, fahrende.',
    'Partizip II (pasif/tamamlanmış): ge-...-t/en + sıfat eki → gekochte, geschriebene.',
    'Genişletilmiş yapılarda ek bilgi Partizip\'ten önce gelir: der im Park spielende Hund.',
    'Partizip I ve II arasındaki fark: kochendes Wasser (kaynayan) vs. gekochtes Wasser (kaynatılmış).',
    '-ieren ile biten fiillerin Partizip II\'si ge- almaz: repariert, studiert, organisiert.',
  ],
  tipsEn: [
    'Partizip I (active/ongoing): Infinitive + d + adjective ending → schlafende, fahrende.',
    'Partizip II (passive/completed): ge-...-t/en + adjective ending → gekochte, geschriebene.',
    'In extended attributes, additional info comes before the participle: der im Park spielende Hund.',
    'Key difference: kochendes Wasser (boiling) vs. gekochtes Wasser (boiled).',
    'Verbs ending in -ieren do not take ge- in Partizip II: repariert, studiert, organisiert.',
  ],
};
