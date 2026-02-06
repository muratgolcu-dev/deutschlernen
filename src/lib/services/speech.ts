export function speak(text: string, options: { rate?: number; lang?: string; voice?: SpeechSynthesisVoice | null; onEnd?: () => void } = {}): SpeechSynthesisUtterance | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = options.lang || 'de-DE';
  utterance.rate = options.rate || 0.8;
  if (options.voice) utterance.voice = options.voice;
  if (options.onEnd) utterance.onend = options.onEnd;
  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function getGermanVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('de'));
}

export function stopSpeaking(): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}
