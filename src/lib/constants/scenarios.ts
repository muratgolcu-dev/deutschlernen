import { ConversationScenario } from '@/lib/types';

export const conversationScenarios: ConversationScenario[] = [
  {
    id: 'restaurant',
    title: 'Im Restaurant',
    turkishTitle: 'Restoranda',
    description: 'Bestelle Essen und Getränke in einem Restaurant.',
    turkishDescription: 'Bir restoranda yemek ve içecek sipariş et.',
    icon: '🍽️',
    level: 'A1',
    systemPromptAddition:
      'The conversation takes place in a German restaurant. The user is ordering food. Start by greeting them as a waiter and presenting the menu.',
  },
  {
    id: 'shopping',
    title: 'Im Geschäft',
    turkishTitle: 'Mağazada',
    description: 'Kaufe Kleidung oder Lebensmittel ein.',
    turkishDescription: 'Giysi veya market alışverişi yap.',
    icon: '🛍️',
    level: 'A1',
    systemPromptAddition:
      'The conversation takes place in a German shop. The user wants to buy something. Start by greeting them as a shop assistant.',
  },
  {
    id: 'directions',
    title: 'Nach dem Weg fragen',
    turkishTitle: 'Yol Sormak',
    description: 'Frage nach dem Weg zu einem bestimmten Ort.',
    turkishDescription: 'Bir yere nasıl gidileceğini sor.',
    icon: '🗺️',
    level: 'A2',
    systemPromptAddition:
      'The user is lost in a German city and asking for directions. You are a helpful passerby. Use common direction vocabulary.',
  },
  {
    id: 'doctor',
    title: 'Beim Arzt',
    turkishTitle: 'Doktorda',
    description: 'Beschreibe deine Symptome beim Arzt.',
    turkishDescription: 'Doktora şikayetlerini anlat.',
    icon: '🏥',
    level: 'A2',
    systemPromptAddition:
      'The user is visiting a doctor in Germany. You are the doctor. Ask about their symptoms and give simple advice.',
  },
  {
    id: 'hotel',
    title: 'Im Hotel',
    turkishTitle: 'Otelde',
    description: 'Buche ein Hotelzimmer und stelle Fragen.',
    turkishDescription: 'Otel odası rezervasyonu yap ve sorular sor.',
    icon: '🏨',
    level: 'A2',
    systemPromptAddition:
      'The user is checking into a German hotel. You are the receptionist. Help them with booking and room information.',
  },
  {
    id: 'job-interview',
    title: 'Vorstellungsgespräch',
    turkishTitle: 'İş Görüşmesi',
    description: 'Übe ein Vorstellungsgespräch auf Deutsch.',
    turkishDescription: 'Almanca iş görüşmesi pratiği yap.',
    icon: '💼',
    level: 'B1',
    systemPromptAddition:
      'The user is in a German job interview. You are the interviewer. Ask common interview questions and evaluate their responses.',
  },
  {
    id: 'apartment',
    title: 'Wohnungssuche',
    turkishTitle: 'Ev Aramak',
    description: 'Besichtige eine Wohnung und stelle Fragen.',
    turkishDescription: 'Bir daireyi gez ve sorular sor.',
    icon: '🏠',
    level: 'B1',
    systemPromptAddition:
      'The user is viewing an apartment in Germany. You are the landlord showing the apartment. Discuss rent, utilities, and rules.',
  },
  {
    id: 'bank',
    title: 'Bei der Bank',
    turkishTitle: 'Bankada',
    description: 'Eröffne ein Konto oder frage nach Bankdienstleistungen.',
    turkishDescription: 'Hesap aç veya banka hizmetleri hakkında bilgi al.',
    icon: '🏦',
    level: 'B1',
    systemPromptAddition:
      'The user is at a German bank. You are the bank employee. Help them open an account or discuss banking services.',
  },
  {
    id: 'debate',
    title: 'Diskussion',
    turkishTitle: 'Tartışma',
    description: 'Diskutiere über ein aktuelles Thema.',
    turkishDescription: 'Güncel bir konu hakkında tartış.',
    icon: '💬',
    level: 'B2',
    systemPromptAddition:
      'Have a debate/discussion with the user about a current topic (environment, technology, education). Present arguments and counter-arguments at B2 level.',
  },
  {
    id: 'phone-call',
    title: 'Telefonat',
    turkishTitle: 'Telefon Görüşmesi',
    description: 'Führe ein formelles Telefongespräch.',
    turkishDescription: 'Resmi bir telefon görüşmesi yap.',
    icon: '📞',
    level: 'B2',
    systemPromptAddition:
      'The user is making a formal phone call in German (e.g., to cancel a subscription, make a complaint, schedule an appointment). Respond formally.',
  },
];
