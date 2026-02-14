import { GrammarLesson } from '@/lib/types';

export const b1Passiv: GrammarLesson = {
  id: 'b1-passiv',
  title: 'Passiv (Edilgen Çatı)',
  turkishTitle: 'Passiv (Edilgen Çatı: werden + Partizip II)',
  englishTitle: 'Passive Voice (werden + Past Participle)',
  level: 'B1',
  order: 13,
  explanation: `# Passiv (Edilgen Çatı)

Almanca'da edilgen çatı (Passiv) **werden + Partizip II** ile oluşturulur. Eylemi yapan değil, eylemin kendisi veya etkilenen ön plana çıkar.

## Aktiv vs. Passiv

| Aktiv (Etken) | Passiv (Edilgen) |
|----------------|-----------------|
| Der Koch **kocht** die Suppe. | Die Suppe **wird gekocht**. |
| Aşçı çorbayı pişiriyor. | Çorba pişiriliyor. |

## Präsens Passiv (Şimdiki Zaman Edilgen)

**werden (çekimli) + Partizip II**

| Özne | werden | Partizip II |
|------|--------|-------------|
| ich | **werde** | gefragt |
| du | **wirst** | gefragt |
| er/sie/es | **wird** | gefragt |
| wir | **werden** | gefragt |
| ihr | **werdet** | gefragt |
| sie/Sie | **werden** | gefragt |

- Das Auto **wird** repariert. (Araba tamir ediliyor.)
- Die Briefe **werden** geschrieben. (Mektuplar yazılıyor.)

## Präteritum Passiv (Geçmiş Zaman Edilgen)

**wurde (çekimli) + Partizip II**

| Özne | wurde | Partizip II |
|------|-------|-------------|
| ich | **wurde** | gefragt |
| du | **wurdest** | gefragt |
| er/sie/es | **wurde** | gefragt |
| wir | **wurden** | gefragt |
| ihr | **wurdet** | gefragt |
| sie/Sie | **wurden** | gefragt |

- Das Haus **wurde** 1990 gebaut. (Ev 1990'da inşa edildi.)
- Die Fenster **wurden** geöffnet. (Pencereler açıldı.)

## Passiv mit Modalverben (Modal Fiilli Edilgen)

**Modalverb (çekimli) + Partizip II + werden**

- Das Auto **muss** repariert **werden**. (Araba tamir edilmeli.)
- Die Hausaufgabe **kann** morgen abgegeben **werden**. (Ödev yarın teslim edilebilir.)
- Der Text **soll** übersetzt **werden**. (Metin tercüme edilmeli.)

## "von" + Dativ (Tarafından)

Eylemi yapan kişi belirtilmek istenirse **von + Dativ** kullanılır:
- Das Buch **wird von** dem Lehrer **gelesen**. (Kitap öğretmen tarafından okunuyor.)
- Der Kuchen **wurde von** meiner Mutter **gebacken**. (Pasta annem tarafından pişirildi.)`,
  explanationEn: `# Passiv (Passive Voice)

In German, the passive voice (Passiv) is formed with **werden + Past Participle (Partizip II)**. The focus shifts from the doer to the action or the one affected.

## Active vs. Passive

| Active | Passive |
|--------|---------|
| Der Koch **kocht** die Suppe. | Die Suppe **wird gekocht**. |
| The cook cooks the soup. | The soup is being cooked. |

## Present Passive (Präsens Passiv)

**werden (conjugated) + Past Participle**

| Subject | werden | Past Participle |
|---------|--------|-----------------|
| ich | **werde** | gefragt |
| du | **wirst** | gefragt |
| er/sie/es | **wird** | gefragt |
| wir | **werden** | gefragt |
| ihr | **werdet** | gefragt |
| sie/Sie | **werden** | gefragt |

- Das Auto **wird** repariert. (The car is being repaired.)
- Die Briefe **werden** geschrieben. (The letters are being written.)

## Past Passive (Präteritum Passiv)

**wurde (conjugated) + Past Participle**

| Subject | wurde | Past Participle |
|---------|-------|-----------------|
| ich | **wurde** | gefragt |
| du | **wurdest** | gefragt |
| er/sie/es | **wurde** | gefragt |
| wir | **wurden** | gefragt |
| ihr | **wurdet** | gefragt |
| sie/Sie | **wurden** | gefragt |

- Das Haus **wurde** 1990 gebaut. (The house was built in 1990.)
- Die Fenster **wurden** geöffnet. (The windows were opened.)

## Passive with Modal Verbs

**Modal verb (conjugated) + Past Participle + werden**

- Das Auto **muss** repariert **werden**. (The car must be repaired.)
- Die Hausaufgabe **kann** morgen abgegeben **werden**. (The homework can be submitted tomorrow.)
- Der Text **soll** übersetzt **werden**. (The text should be translated.)

## "von" + Dative (by someone)

To indicate who performs the action, use **von + Dative**:
- Das Buch **wird von** dem Lehrer **gelesen**. (The book is being read by the teacher.)
- Der Kuchen **wurde von** meiner Mutter **gebacken**. (The cake was baked by my mother.)`,
  examples: [
    { german: 'Das Fenster wird geöffnet.', turkish: 'Pencere açılıyor.', english: 'The window is being opened.' },
    { german: 'Die E-Mail wurde gestern geschickt.', turkish: 'E-posta dün gönderildi.', english: 'The email was sent yesterday.' },
    { german: 'Das Essen muss noch gekocht werden.', turkish: 'Yemek daha pişirilmeli.', english: 'The food still needs to be cooked.' },
    { german: 'Der Brief wird von dem Chef unterschrieben.', turkish: 'Mektup müdür tarafından imzalanıyor.', english: 'The letter is being signed by the boss.' },
    { german: 'Die Straße wurde letztes Jahr gebaut.', turkish: 'Yol geçen yıl inşa edildi.', english: 'The road was built last year.' },
  ],
  exercises: [
    {
      id: 'b1-ps-1',
      type: 'fill-in-the-blank',
      question: 'Das Auto ___ repariert. (Präsens Passiv)',
      explanation: 'Tekil 3. şahıs (das Auto = es) için "werden" fiilinin çekimi "wird" olur. Präsens Passiv: wird + Partizip II → "wird repariert" = tamir ediliyor.',
      explanationEn: 'For 3rd person singular (das Auto = it), "werden" conjugates to "wird". Present passive: wird + past participle → "wird repariert" = is being repaired.',
      data: {
        answer: 'wird',
        hint: 'werden fiilinin er/sie/es çekimi',
        acceptableAnswers: ['wird'],
      },
    },
    {
      id: 'b1-ps-2',
      type: 'multiple-choice',
      question: 'Die Briefe ___ gestern geschickt. (Präteritum Passiv)',
      explanation: 'Çoğul özne (die Briefe) için "werden" fiilinin Präteritum çekimi "wurden" olur. Geçmiş zaman edilgen: wurden + Partizip II → "wurden geschickt" = gönderildi.',
      explanationEn: 'For plural subject (die Briefe), "werden" in Präteritum conjugates to "wurden". Past passive: wurden + past participle → "wurden geschickt" = were sent.',
      data: {
        options: ['wird', 'wurde', 'wurden', 'werden'],
        correctIndex: 2,
        explanation: 'Çoğul + Präteritum Passiv: die Briefe → wurden geschickt.',
      },
    },
    {
      id: 'b1-ps-3',
      type: 'fill-in-the-blank',
      question: 'Der Kuchen ___ von meiner Oma gebacken. (Präteritum Passiv)',
      explanation: 'Tekil 3. şahıs (der Kuchen) için Präteritum Passiv: "wurde" + Partizip II. "wurde gebacken" = pişirildi. "von meiner Oma" = büyükannem tarafından.',
      explanationEn: 'For 3rd person singular (der Kuchen) in past passive: "wurde" + past participle. "wurde gebacken" = was baked. "von meiner Oma" = by my grandmother.',
      data: {
        answer: 'wurde',
        hint: 'werden fiilinin Präteritum er/sie/es çekimi',
        acceptableAnswers: ['wurde'],
      },
    },
    {
      id: 'b1-ps-4',
      type: 'multiple-choice',
      question: 'Das Buch ___ bis morgen gelesen werden.',
      explanation: '"muss" modal fiili zorunluluk bildirir. Passiv + Modalverb yapısı: Modalverb (çekimli) + Partizip II + werden. "Das Buch muss gelesen werden" = Kitap okunmalı.',
      explanationEn: '"muss" (must) expresses obligation. Passive with modal verb structure: modal verb (conjugated) + past participle + werden. "Das Buch muss gelesen werden" = The book must be read.',
      data: {
        options: ['muss', 'wird', 'wurde', 'ist'],
        correctIndex: 0,
        explanation: 'Zorunluluk + Passiv: muss + Partizip II + werden.',
      },
    },
    {
      id: 'b1-ps-5',
      type: 'fill-in-the-blank',
      question: 'In Deutschland ___ viel Brot gegessen. (Präsens Passiv)',
      explanation: 'Genel bir ifade, özne belirtilmemiş (es/man anlamında). Tekil Präsens Passiv: "wird" + Partizip II. "wird gegessen" = yenilir/yeniyor. Almanya\'da çok ekmek yenir.',
      explanationEn: 'This is a general statement with no specific subject. Singular present passive: "wird" + past participle. "wird gegessen" = is eaten. A lot of bread is eaten in Germany.',
      data: {
        answer: 'wird',
        hint: 'Genel ifade, Präsens Passiv tekil',
        acceptableAnswers: ['wird'],
      },
    },
  ],
  tips: [
    'Passiv = werden + Partizip II. "werden" fiilinin çekimini iyi öğrenin.',
    'Präsens: wird/werden + Partizip II. Präteritum: wurde/wurden + Partizip II.',
    'Modal fiil + Passiv: Modalverb + Partizip II + werden (mastar). Örn: muss gemacht werden.',
    'Eylemi yapanı belirtmek için "von + Dativ" kullanılır: von dem Lehrer, von meiner Mutter.',
    'Her fiil Passiv yapılamaz: haben, sein, wissen gibi fiillerin Passiv hali yoktur.',
  ],
  tipsEn: [
    'Passive = werden + past participle. Learn the conjugation of "werden" well.',
    'Present: wird/werden + past participle. Past: wurde/wurden + past participle.',
    'Modal verb + passive: modal verb + past participle + werden (infinitive). E.g., muss gemacht werden.',
    'To indicate who performs the action, use "von + Dative": von dem Lehrer, von meiner Mutter.',
    'Not every verb can form a passive: haben, sein, wissen have no passive form.',
  ],
};
