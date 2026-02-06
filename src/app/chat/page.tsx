'use client';

import { useState, useRef, useEffect } from 'react';
import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { useChat } from '@/hooks/useChat';
import { useSpeech } from '@/hooks/useSpeech';
import { conversationScenarios } from '@/lib/constants/scenarios';
import { getConversationSystemPrompt } from '@/lib/services/prompts';
import { ChatMessage, Conversation, ConversationScenario } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Volume2, Plus, ArrowLeft, AlertCircle, ChevronRight, Trash2 } from 'lucide-react';

type View = 'list' | 'scenarios' | 'conversation';

export default function ChatPage() {
  const [view, setView] = useState<View>('list');
  const [input, setInput] = useState('');
  const { sendMessage, isLoading, streamingContent } = useChat();
  const { speak } = useSpeech();
  const {
    conversations, activeConversationId, settings,
    addConversation, setActiveConversation, addMessage, deleteConversation,
  } = useDeutschStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConversationId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages.length, streamingContent]);

  const startFreeChat = () => {
    const conv: Conversation = {
      id: crypto.randomUUID(), title: 'Serbest Konuşma', mode: 'free',
      level: settings.currentLevel, formality: 'du', messages: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    addConversation(conv);
    setView('conversation');
  };

  const startScenario = (scenario: ConversationScenario) => {
    const conv: Conversation = {
      id: crypto.randomUUID(), title: scenario.turkishTitle, mode: 'scenario',
      scenarioId: scenario.id, level: scenario.level, formality: 'Sie',
      messages: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    addConversation(conv);
    setView('conversation');
    // Send initial AI message
    const systemPrompt = getConversationSystemPrompt(scenario.level, 'Sie', scenario.systemPromptAddition);
    sendMessage([{ role: 'user', content: 'Bitte starte das Gespräch.' }], settings.anthropicApiKey, systemPrompt).then((res) => {
      if (res) {
        addMessage(conv.id, { id: crypto.randomUUID(), role: 'assistant', content: res.content, corrections: res.corrections, translation: res.translation, timestamp: new Date().toISOString() });
      }
    });
  };

  const handleSend = async () => {
    if (!input.trim() || !activeConv || isLoading) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: input.trim(), timestamp: new Date().toISOString() };
    addMessage(activeConv.id, userMsg);
    setInput('');

    const scenario = activeConv.scenarioId ? conversationScenarios.find((s) => s.id === activeConv.scenarioId) : undefined;
    const systemPrompt = getConversationSystemPrompt(activeConv.level, activeConv.formality, scenario?.systemPromptAddition);
    const messages = [...activeConv.messages, userMsg].filter((m) => m.role !== 'system').map((m) => ({ role: m.role, content: m.content }));

    const res = await sendMessage(messages, settings.anthropicApiKey, systemPrompt);
    if (res) {
      addMessage(activeConv.id, { id: crypto.randomUUID(), role: 'assistant', content: res.content, corrections: res.corrections, translation: res.translation, timestamp: new Date().toISOString() });
    }
  };

  const openConversation = (id: string) => {
    setActiveConversation(id);
    setView('conversation');
  };

  // Conversation view
  if (view === 'conversation' && activeConv) {
    return (
      <div className="flex h-[calc(100vh-4rem)] flex-col md:h-screen">
        <div className="flex items-center gap-3 border-b p-3">
          <Button variant="ghost" size="sm" onClick={() => setView('list')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <p className="font-medium text-sm">{activeConv.title}</p>
            <p className="text-xs text-muted-foreground">{activeConv.level} &middot; {activeConv.formality}</p>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="mx-auto max-w-2xl space-y-4">
            {activeConv.messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.translation && (
                    <p className="mt-1 text-xs opacity-70 italic">{msg.translation}</p>
                  )}
                  {msg.corrections && msg.corrections.length > 0 && (
                    <div className="mt-2 space-y-1 border-t pt-2 border-white/20">
                      {msg.corrections.map((c, i) => (
                        <div key={i} className="text-xs">
                          <span className="line-through opacity-60">{c.original}</span>{' → '}
                          <span className="font-medium">{c.corrected}</span>
                          <p className="opacity-70">{c.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {msg.role === 'assistant' && (
                    <Button variant="ghost" size="sm" className="mt-1 h-6 px-1 opacity-60 hover:opacity-100" onClick={() => speak(msg.content)}>
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {streamingContent && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl bg-muted px-4 py-2.5">
                  <p className="text-sm whitespace-pre-wrap">{streamingContent}</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t p-3">
          <div className="mx-auto flex max-w-2xl gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Almanca yaz..."
              className="min-h-[44px] max-h-32 resize-none"
              rows={1}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            />
            <Button onClick={handleSend} disabled={!input.trim() || isLoading} size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Scenarios view
  if (view === 'scenarios') {
    return (
      <div className="mx-auto max-w-2xl space-y-4 p-4 md:p-8">
        <Button variant="ghost" size="sm" onClick={() => setView('list')}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <h1 className="text-2xl font-bold">Senaryolar</h1>
        <div className="space-y-2">
          {conversationScenarios.map((s) => (
            <Card key={s.id} className="cursor-pointer transition-colors hover:bg-accent" onClick={() => startScenario(s)}>
              <CardContent className="flex items-center gap-4 p-4">
                <span className="text-2xl">{s.icon}</span>
                <div className="flex-1">
                  <p className="font-medium">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.turkishTitle}</p>
                </div>
                <Badge variant="outline">{s.level}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Conversation list
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold">Konuşma Pratiği</h1>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card className="cursor-pointer transition-colors hover:bg-accent" onClick={startFreeChat}>
          <CardContent className="flex items-center gap-3 p-4">
            <Plus className="h-6 w-6" />
            <div>
              <p className="font-medium">Serbest Konuşma</p>
              <p className="text-xs text-muted-foreground">İstediğin konuda Almanca konuş</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer transition-colors hover:bg-accent" onClick={() => setView('scenarios')}>
          <CardContent className="flex items-center gap-3 p-4">
            <ChevronRight className="h-6 w-6" />
            <div>
              <p className="font-medium">Senaryo Seç</p>
              <p className="text-xs text-muted-foreground">Restoran, doktor, otel...</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {conversations.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">Geçmiş Konuşmalar</h2>
          <div className="space-y-2">
            {conversations.map((conv) => (
              <Card key={conv.id} className="cursor-pointer transition-colors hover:bg-accent">
                <CardContent className="flex items-center gap-3 p-4" onClick={() => openConversation(conv.id)}>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{conv.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {conv.messages.length} mesaj &middot; {new Date(conv.updatedAt).toLocaleDateString('tr')}
                    </p>
                  </div>
                  <Badge variant="outline">{conv.level}</Badge>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id); }}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
