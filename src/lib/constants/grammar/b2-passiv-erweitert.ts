import { GrammarLesson } from '@/lib/types';

export const b2PassivErweitert: GrammarLesson = {
  id: 'b2-passiv-erweitert',
  title: 'Erweiterte Passivformen',
  turkishTitle: 'Genişletilmiş Edilgen Yapılar (Zustandspassiv, Modalverben ile Passiv, Passiversatzformen)',
  englishTitle: 'Advanced Passive Forms (Statal Passive, Passive with Modals, Passive Alternatives)',
  level: 'B2',
  order: 19,
  explanation: `# Erweiterte Passivformen (Genişletilmiş Edilgen Yapılar)

Almancada temel Passiv yapısının (werden + Partizip II) ötesinde, farklı Passiv formları ve Passiv yerine kullanılan alternatif yapılar vardır.

## 1. Vorgangspassiv vs. Zustandspassiv

### Vorgangspassiv (Oluş Edilgeni) — werden + Partizip II
Bir eylemin **yapılma sürecini** anlatır:
- Die Tür **wird geschlossen**. (Kapı kapatılıyor. — kapatma eylemi devam ediyor)
- Das Haus **wurde gebaut**. (Ev inşa edildi. — inşa süreci)

### Zustandspassiv (Durum Edilgeni) — sein + Partizip II
Bir eylemin **sonucu olan durumu** anlatır:
- Die Tür **ist geschlossen**. (Kapı kapalı. — şu anki durum)
- Das Haus **ist gebaut**. (Ev inşa edilmiş durumda. — sonuç)

| Vorgangspassiv | Zustandspassiv |
|----------------|----------------|
| Die Rechnung **wird bezahlt**. (Fatura ödeniyor.) | Die Rechnung **ist bezahlt**. (Fatura ödenmiş durumda.) |
| Der Brief **wurde geschrieben**. (Mektup yazıldı.) | Der Brief **ist geschrieben**. (Mektup yazılmış durumda.) |

## 2. Passiv mit Modalverben (Modal Fiillerle Edilgen)

**Modalverb + Partizip II + werden** yapısı kullanılır:
- Das Formular **muss ausgefüllt werden**. (Form doldurulmak zorunda.)
- Der Patient **kann operiert werden**. (Hasta ameliyat edilebilir.)
- Das Auto **soll repariert werden**. (Araba tamir edilmeli.)
- Hier **darf nicht geraucht werden**. (Burada sigara içilemez.)

## 3. Passiversatzformen (Edilgen Yerine Kullanılan Yapılar)

### a) man (Belirsiz özne)
- **Man** spricht hier Deutsch. (Burada Almanca konuşulur.)

### b) sich lassen + Infinitiv (yapılabilirlik)
- Das Problem **lässt sich** lösen. (= Das Problem kann gelöst werden.)
  (Sorun çözülebilir.)
- Die Tür **lässt sich** nicht öffnen. (Kapı açılamıyor.)

### c) -bar / -lich Adjektive (yapılabilirlik sıfatları)
- Das Wasser ist **trinkbar**. (= Das Wasser kann getrunken werden.) (Su içilebilir.)
- Der Text ist **lesbar**. (= Der Text kann gelesen werden.) (Metin okunabilir.)
- Das ist **verständlich**. (= Das kann verstanden werden.) (Bu anlaşılabilir.)

### d) sein + zu + Infinitiv
- Die Aufgabe **ist** noch **zu erledigen**. (= Die Aufgabe muss noch erledigt werden.)
  (Görev hâlâ yerine getirilmek zorunda.)`,
  explanationEn: `# Advanced Passive Forms (Erweiterte Passivformen)

Beyond the basic passive (werden + Partizip II), German has different passive forms and alternative constructions that replace the passive.

## 1. Vorgangspassiv vs. Zustandspassiv

### Vorgangspassiv (Process Passive) — werden + Partizip II
Describes the **process** of an action:
- Die Tür **wird geschlossen**. (The door is being closed. — action in progress)
- Das Haus **wurde gebaut**. (The house was built. — the building process)

### Zustandspassiv (Statal Passive) — sein + Partizip II
Describes the **resulting state** of an action:
- Die Tür **ist geschlossen**. (The door is closed. — current state)
- Das Haus **ist gebaut**. (The house is built. — result)

| Vorgangspassiv | Zustandspassiv |
|----------------|----------------|
| Die Rechnung **wird bezahlt**. (The bill is being paid.) | Die Rechnung **ist bezahlt**. (The bill is paid.) |
| Der Brief **wurde geschrieben**. (The letter was written.) | Der Brief **ist geschrieben**. (The letter is written.) |

## 2. Passive with Modal Verbs

Structure: **modal verb + Partizip II + werden**:
- Das Formular **muss ausgefüllt werden**. (The form must be filled out.)
- Der Patient **kann operiert werden**. (The patient can be operated on.)
- Das Auto **soll repariert werden**. (The car should be repaired.)
- Hier **darf nicht geraucht werden**. (Smoking is not allowed here.)

## 3. Passive Alternatives (Passiversatzformen)

### a) man (Indefinite subject)
- **Man** spricht hier Deutsch. (German is spoken here.)

### b) sich lassen + infinitive (possibility)
- Das Problem **lässt sich** lösen. (= Das Problem kann gelöst werden.)
  (The problem can be solved.)
- Die Tür **lässt sich** nicht öffnen. (The door cannot be opened.)

### c) -bar / -lich adjectives (ability adjectives)
- Das Wasser ist **trinkbar**. (= Das Wasser kann getrunken werden.) (The water is drinkable.)
- Der Text ist **lesbar**. (= Der Text kann gelesen werden.) (The text is readable.)
- Das ist **verständlich**. (= Das kann verstanden werden.) (That is understandable.)

### d) sein + zu + infinitive
- Die Aufgabe **ist** noch **zu erledigen**. (= Die Aufgabe muss noch erledigt werden.)
  (The task still has to be completed.)`,
  examples: [
    { german: 'Die Tür ist geschlossen.', turkish: 'Kapı kapalı.', english: 'The door is closed.' },
    { german: 'Das Formular muss ausgefüllt werden.', turkish: 'Form doldurulmak zorunda.', english: 'The form must be filled out.' },
    { german: 'Das Problem lässt sich leicht lösen.', turkish: 'Sorun kolayca çözülebilir.', english: 'The problem can be easily solved.' },
    { german: 'Dieses Wasser ist nicht trinkbar.', turkish: 'Bu su içilebilir değil.', english: 'This water is not drinkable.' },
    { german: 'Die Aufgabe ist bis morgen zu erledigen.', turkish: 'Görev yarına kadar yerine getirilmek zorunda.', english: 'The task must be completed by tomorrow.' },
  ],
  exercises: [
    {
      id: 'b2-pe-1',
      type: 'multiple-choice',
      question: 'Die Tür ___ geschlossen. (Durum: Kapı şu an kapalı.)',
      explanation: 'Zustandspassiv (durum edilgeni) "sein + Partizip II" ile kurulur. Kapının şu anki durumunu ifade eder: "Kapı kapalı (durumda)."',
      explanationEn: 'The Zustandspassiv (statal passive) is formed with "sein + Partizip II". It expresses the current state: "The door is closed."',
      data: {
        options: ['wird', 'ist', 'hat', 'wurde'],
        correctIndex: 1,
        explanation: 'Zustandspassiv: sein + Partizip II → Die Tür ist geschlossen.',
      },
    },
    {
      id: 'b2-pe-2',
      type: 'fill-in-the-blank',
      question: 'Der Brief ___ gestern geschrieben. (werden — Präteritum)',
      explanation: 'Vorgangspassiv geçmiş zaman: "wurde + Partizip II". Eylemin yapılma sürecini anlatır: "Mektup dün yazıldı."',
      explanationEn: 'Vorgangspassiv past tense: "wurde + Partizip II". Describes the process: "The letter was written yesterday."',
      data: {
        answer: 'wurde',
        hint: 'Vorgangspassiv Präteritum: wurde + Partizip II',
        acceptableAnswers: ['wurde'],
      },
    },
    {
      id: 'b2-pe-3',
      type: 'multiple-choice',
      question: 'Das Auto ___ sofort repariert werden.',
      explanation: 'Passiv mit Modalverben: "Modalverb + Partizip II + werden". "muss" zorunluluk bildirir: "Araba hemen tamir edilmek zorunda."',
      explanationEn: 'Passive with modal verbs: "modal + Partizip II + werden". "muss" expresses obligation: "The car must be repaired immediately."',
      data: {
        options: ['kann', 'muss', 'wird', 'ist'],
        correctIndex: 1,
        explanation: 'Modalverb + Partizip II + werden: muss repariert werden.',
      },
    },
    {
      id: 'b2-pe-4',
      type: 'fill-in-the-blank',
      question: 'Das Problem lässt ___ lösen. (Passiversatzform)',
      explanation: '"sich lassen + Infinitiv" yapısı Passiv yerine kullanılır ve yapılabilirlik ifade eder: "Sorun çözülebilir." = "Das Problem kann gelöst werden."',
      explanationEn: '"sich lassen + infinitive" is a passive alternative expressing possibility: "The problem can be solved." = "Das Problem kann gelöst werden."',
      data: {
        answer: 'sich',
        hint: 'sich lassen + Infinitiv = Passiversatzform',
        acceptableAnswers: ['sich'],
      },
    },
    {
      id: 'b2-pe-5',
      type: 'multiple-choice',
      question: 'Der Text ist gut ___. (= Der Text kann gut gelesen werden.)',
      explanation: '"-bar" soneki Passiversatzform olarak kullanılır. "lesbar" = "okunabilir". "lesen" fiilinden türetilmiştir.',
      explanationEn: 'The "-bar" suffix is used as a passive alternative. "lesbar" = "readable". Derived from the verb "lesen".',
      data: {
        options: ['lesbar', 'lernbar', 'lebbar', 'liebbar'],
        correctIndex: 0,
        explanation: 'lesen → lesbar (readable). -bar Adjektiv als Passiversatzform.',
      },
    },
  ],
  tips: [
    'Zustandspassiv (sein + Partizip II) bir durumu, Vorgangspassiv (werden + Partizip II) bir süreci anlatır.',
    'Modal fiillerle Passiv: Modalverb + Partizip II + werden (fiil sonda). Örn: muss gemacht werden.',
    '"sich lassen + Infinitiv" yapısı "können + Passiv" ile aynı anlama gelir: Es lässt sich machen = Es kann gemacht werden.',
    '"-bar" soneki birçok fiilden yapılabilirlik sıfatı türetir: trinken → trinkbar, lesen → lesbar.',
    '"sein + zu + Infinitiv" hem zorunluluk hem de yapılabilirlik ifade edebilir: Die Arbeit ist zu erledigen.',
  ],
  tipsEn: [
    'Zustandspassiv (sein + Partizip II) describes a state; Vorgangspassiv (werden + Partizip II) describes a process.',
    'Passive with modals: modal + Partizip II + werden (verb at end). E.g.: muss gemacht werden.',
    '"sich lassen + infinitive" means the same as "können + passive": Es lässt sich machen = Es kann gemacht werden.',
    'The "-bar" suffix derives ability adjectives from verbs: trinken → trinkbar, lesen → lesbar.',
    '"sein + zu + infinitive" can express both obligation and possibility: Die Arbeit ist zu erledigen.',
  ],
};
