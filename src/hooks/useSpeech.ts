'use client';
import { useState, useEffect, useCallback } from 'react';
import { useDeutschStore } from '@/lib/store/useDeutschStore';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const { settings } = useDeutschStore();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('de')));
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.cancel(); };
  }, []);

  const speak = useCallback((text: string, rate?: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = rate ?? settings.speechRate;
    const selectedVoice = voices.find((v) => v.name === settings.speechVoice) || voices[0];
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [settings.speechRate, settings.speechVoice, voices]);

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel(); setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, voices };
}
