import { CEFRLevel } from './vocabulary';

export type ConversationMode = 'free' | 'scenario';
export type Formality = 'du' | 'Sie';
export type MessageRole = 'user' | 'assistant' | 'system';

export interface Conversation {
  id: string;
  title: string;
  mode: ConversationMode;
  scenarioId?: string;
  level: CEFRLevel;
  formality: Formality;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  corrections?: Correction[];
  translation?: string;
  timestamp: string;
}

export interface Correction {
  original: string;
  corrected: string;
  explanation: string;
  rule: string;
}

export interface ConversationScenario {
  id: string;
  title: string;
  turkishTitle: string;
  description: string;
  turkishDescription?: string;
  icon: string;
  level: CEFRLevel;
  systemPromptAddition: string;
  starterMessage?: string;
}
