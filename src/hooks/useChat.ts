'use client';
import { useState, useCallback } from 'react';
import { Correction } from '@/lib/types';

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');

  const parseCorrections = useCallback((content: string): { cleanContent: string; corrections: Correction[] } => {
    const corrections: Correction[] = [];
    let cleanContent = content;
    const regex = /<!--CORRECTIONS\[(.*?)\]-->/gs;
    let match;
    while ((match = regex.exec(content)) !== null) {
      try { const parsed = JSON.parse(match[1]); corrections.push(...(Array.isArray(parsed) ? parsed : [parsed])); } catch {}
      cleanContent = cleanContent.replace(match[0], '');
    }
    return { cleanContent: cleanContent.trim(), corrections };
  }, []);

  const parseTranslation = useCallback((content: string): { cleanContent: string; translation?: string } => {
    let cleanContent = content;
    const match = /<!--TRANSLATION\[(.*?)\]-->/gs.exec(content);
    if (match) { cleanContent = cleanContent.replace(match[0], ''); return { cleanContent: cleanContent.trim(), translation: match[1].trim() }; }
    return { cleanContent: cleanContent.trim() };
  }, []);

  const sendMessage = useCallback(async (messages: { role: string; content: string }[], _apiKey?: string, systemPrompt?: string): Promise<{ content: string; corrections: Correction[]; translation?: string } | null> => {
    setIsLoading(true); setStreamingContent('');
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages, systemPrompt }) });
      if (!response.ok) throw new Error('Failed');
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader');
      const decoder = new TextDecoder();
      let fullContent = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try { const p = JSON.parse(data); if (p.content) { fullContent += p.content; setStreamingContent(fullContent); } } catch {}
          }
        }
      }
      const { cleanContent: c1, corrections } = parseCorrections(fullContent);
      const { cleanContent, translation } = parseTranslation(c1);
      return { content: cleanContent, corrections, translation };
    } catch { return null; }
    finally { setIsLoading(false); setStreamingContent(''); }
  }, [parseCorrections, parseTranslation]);

  return { sendMessage, isLoading, streamingContent };
}
