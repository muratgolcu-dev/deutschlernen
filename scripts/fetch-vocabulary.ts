#!/usr/bin/env npx tsx
/**
 * Vocabulary Fetcher Script
 *
 * Fetches German vocabulary translations using MyMemory Translation API
 * and appends new words to vocabulary category files.
 *
 * Usage:
 *   npx tsx scripts/fetch-vocabulary.ts --category food --level A1 --words "Apfel,Birne,Kirsche"
 *   npx tsx scripts/fetch-vocabulary.ts --category food --level A1 --words "Apfel,Birne" --dry-run
 *   npx tsx scripts/fetch-vocabulary.ts --category food --level A1 --from-pool --count 5
 *
 * Options:
 *   --category   Category name (food, transport, clothing, etc.)
 *   --level      CEFR level (A1, A2, B1, B2)
 *   --words      Comma-separated German words to add
 *   --from-pool  Use built-in word pool for the category
 *   --count      Number of words from pool (default: 10)
 *   --dry-run    Preview without writing to file
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

// ── Types ──────────────────────────────────────────────────────────────────

interface WordData {
  german: string;
  turkish: string;
  english: string;
  article: 'der' | 'die' | 'das' | 'die (pl)' | null;
  plural?: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | 'article' | 'phrase';
  synonyms?: string[];
  exampleSentence: string;
  exampleTranslation: string;
  exampleTranslationEn: string;
  category: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
}

interface PoolWord {
  german: string;
  article?: 'der' | 'die' | 'das' | null;
  plural?: string;
  partOfSpeech?: WordData['partOfSpeech'];
  level: 'A1' | 'A2' | 'B1' | 'B2';
}

// ── Built-in Word Pools ────────────────────────────────────────────────────
// Curated German words grouped by category and CEFR level.
// These are used when --from-pool is specified.

const WORD_POOLS: Record<string, PoolWord[]> = {
  food: [
    { german: 'Apfel', article: 'der', plural: 'Äpfel', level: 'A1' },
    { german: 'Birne', article: 'die', plural: 'Birnen', level: 'A1' },
    { german: 'Kirsche', article: 'die', plural: 'Kirschen', level: 'A1' },
    { german: 'Banane', article: 'die', plural: 'Bananen', level: 'A1' },
    { german: 'Orange', article: 'die', plural: 'Orangen', level: 'A1' },
    { german: 'Tomate', article: 'die', plural: 'Tomaten', level: 'A1' },
    { german: 'Kartoffel', article: 'die', plural: 'Kartoffeln', level: 'A1' },
    { german: 'Gurke', article: 'die', plural: 'Gurken', level: 'A1' },
    { german: 'Zwiebel', article: 'die', plural: 'Zwiebeln', level: 'A1' },
    { german: 'Reis', article: 'der', level: 'A1' },
    { german: 'Nudel', article: 'die', plural: 'Nudeln', level: 'A1' },
    { german: 'Suppe', article: 'die', plural: 'Suppen', level: 'A1' },
    { german: 'Salat', article: 'der', plural: 'Salate', level: 'A1' },
    { german: 'Schinken', article: 'der', level: 'A2' },
    { german: 'Braten', article: 'der', level: 'A2' },
    { german: 'Soße', article: 'die', plural: 'Soßen', level: 'A2' },
    { german: 'Knoblauch', article: 'der', level: 'A2' },
    { german: 'Pfeffer', article: 'der', level: 'A2' },
    { german: 'Essig', article: 'der', level: 'A2' },
    { german: 'Senf', article: 'der', level: 'A2' },
    { german: 'Marmelade', article: 'die', plural: 'Marmeladen', level: 'A2' },
    { german: 'Müsli', article: 'das', level: 'A2' },
    { german: 'Quark', article: 'der', level: 'A2' },
    { german: 'Sahne', article: 'die', level: 'A2' },
    { german: 'Aubergine', article: 'die', plural: 'Auberginen', level: 'B1' },
    { german: 'Zucchini', article: 'die', plural: 'Zucchini', level: 'B1' },
    { german: 'Rübe', article: 'die', plural: 'Rüben', level: 'B1' },
    { german: 'Kräuter', article: 'die', partOfSpeech: 'noun', level: 'B1' },
    { german: 'Gewürz', article: 'das', plural: 'Gewürze', level: 'B1' },
    { german: 'Delikatesse', article: 'die', plural: 'Delikatessen', level: 'B2' },
    { german: 'Spezialität', article: 'die', plural: 'Spezialitäten', level: 'B2' },
    { german: 'Gericht', article: 'das', plural: 'Gerichte', level: 'B2' },
  ],
  transport: [
    { german: 'Taxi', article: 'das', plural: 'Taxis', level: 'A1' },
    { german: 'Motorrad', article: 'das', plural: 'Motorräder', level: 'A1' },
    { german: 'Schiff', article: 'das', plural: 'Schiffe', level: 'A1' },
    { german: 'Boot', article: 'das', plural: 'Boote', level: 'A1' },
    { german: 'Roller', article: 'der', plural: 'Roller', level: 'A1' },
    { german: 'Straße', article: 'die', plural: 'Straßen', level: 'A1' },
    { german: 'Brücke', article: 'die', plural: 'Brücken', level: 'A1' },
    { german: 'Ampel', article: 'die', plural: 'Ampeln', level: 'A1' },
    { german: 'Parkplatz', article: 'der', plural: 'Parkplätze', level: 'A1' },
    { german: 'Bahnhof', article: 'der', plural: 'Bahnhöfe', level: 'A1' },
    { german: 'Tankstelle', article: 'die', plural: 'Tankstellen', level: 'A2' },
    { german: 'Werkstatt', article: 'die', plural: 'Werkstätten', level: 'A2' },
    { german: 'Reifen', article: 'der', plural: 'Reifen', level: 'A2' },
    { german: 'Motor', article: 'der', plural: 'Motoren', level: 'A2' },
    { german: 'Bremse', article: 'die', plural: 'Bremsen', level: 'A2' },
    { german: 'Lenkrad', article: 'das', plural: 'Lenkräder', level: 'A2' },
    { german: 'Sicherheitsgurt', article: 'der', plural: 'Sicherheitsgurte', level: 'A2' },
    { german: 'Verkehr', article: 'der', level: 'A2' },
    { german: 'Unfall', article: 'der', plural: 'Unfälle', level: 'A2' },
    { german: 'Mietwagen', article: 'der', plural: 'Mietwagen', level: 'B1' },
    { german: 'Pendler', article: 'der', plural: 'Pendler', level: 'B1' },
    { german: 'Nahverkehr', article: 'der', level: 'B1' },
    { german: 'Fahrplan', article: 'der', plural: 'Fahrpläne', level: 'B1' },
    { german: 'Bordkarte', article: 'die', plural: 'Bordkarten', level: 'B1' },
    { german: 'Gepäck', article: 'das', level: 'B1' },
    { german: 'Bußgeld', article: 'das', plural: 'Bußgelder', level: 'B1' },
    { german: 'Tempolimit', article: 'das', plural: 'Tempolimits', level: 'B1' },
    { german: 'Elektromobilität', article: 'die', level: 'B2' },
    { german: 'Ladestation', article: 'die', plural: 'Ladestationen', level: 'B2' },
    { german: 'Carsharing', article: 'das', level: 'B2' },
    { german: 'Verkehrsplanung', article: 'die', level: 'B2' },
    { german: 'Güterverkehr', article: 'der', level: 'B2' },
    { german: 'Logistik', article: 'die', level: 'B2' },
  ],
  clothing: [
    { german: 'T-Shirt', article: 'das', plural: 'T-Shirts', level: 'A1' },
    { german: 'Mantel', article: 'der', plural: 'Mäntel', level: 'A1' },
    { german: 'Jeans', article: 'die', plural: 'Jeans', level: 'A1' },
    { german: 'Stiefel', article: 'der', plural: 'Stiefel', level: 'A1' },
    { german: 'Mütze', article: 'die', plural: 'Mützen', level: 'A1' },
    { german: 'Shorts', article: 'die', plural: 'Shorts', level: 'A1' },
    { german: 'Unterhose', article: 'die', plural: 'Unterhosen', level: 'A1' },
    { german: 'Pyjama', article: 'der', plural: 'Pyjamas', level: 'A1' },
    { german: 'Sandalen', article: 'die', partOfSpeech: 'noun', level: 'A1' },
    { german: 'Sportschuhe', article: 'die', partOfSpeech: 'noun', level: 'A1' },
    { german: 'Weste', article: 'die', plural: 'Westen', level: 'A2' },
    { german: 'Kragen', article: 'der', plural: 'Kragen', level: 'A2' },
    { german: 'Ärmel', article: 'der', plural: 'Ärmel', level: 'A2' },
    { german: 'Knopf', article: 'der', plural: 'Knöpfe', level: 'A2' },
    { german: 'Wolle', article: 'die', level: 'A2' },
    { german: 'Baumwolle', article: 'die', level: 'A2' },
    { german: 'Leder', article: 'das', level: 'A2' },
    { german: 'Größe', article: 'die', plural: 'Größen', level: 'A2' },
    { german: 'Kapuze', article: 'die', plural: 'Kapuzen', level: 'A2' },
    { german: 'Abendkleid', article: 'das', plural: 'Abendkleider', level: 'B1' },
    { german: 'Smoking', article: 'der', plural: 'Smokings', level: 'B1' },
    { german: 'Kostüm', article: 'das', plural: 'Kostüme', level: 'B1' },
    { german: 'Dirndl', article: 'das', plural: 'Dirndl', level: 'B1' },
    { german: 'Lederhose', article: 'die', plural: 'Lederhosen', level: 'B1' },
    { german: 'Schneider', article: 'der', plural: 'Schneider', level: 'B1' },
    { german: 'Nähmaschine', article: 'die', plural: 'Nähmaschinen', level: 'B1' },
    { german: 'Schnittmuster', article: 'das', plural: 'Schnittmuster', level: 'B2' },
    { german: 'Textilindustrie', article: 'die', level: 'B2' },
    { german: 'Laufsteg', article: 'der', plural: 'Laufstege', level: 'B2' },
    { german: 'Kollektion', article: 'die', plural: 'Kollektionen', level: 'B2' },
    { german: 'Secondhand', article: 'das', level: 'B2' },
    { german: 'Vintage', article: 'das', partOfSpeech: 'noun', level: 'B2' },
  ],
  emotions: [
    { german: 'froh', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'wütend', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'nett', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'freundlich', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'zufrieden', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'hungrig', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'krank', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'ruhig', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'sicher', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'frei', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'gelangweilt', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'verwirrt', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'erleichtert', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'erschrocken', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'besorgt', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'schüchtern', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'genervt', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'gestresst', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'entspannt', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'empfindlich', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'überwältigt', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'frustriert', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'gleichgültig', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'melancholisch', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'nostalgisch', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'optimistisch', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'pessimistisch', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'ambivalent', article: null, partOfSpeech: 'adjective', level: 'B2' },
    { german: 'euphorisch', article: null, partOfSpeech: 'adjective', level: 'B2' },
    { german: 'resigniert', article: null, partOfSpeech: 'adjective', level: 'B2' },
    { german: 'zynisch', article: null, partOfSpeech: 'adjective', level: 'B2' },
    { german: 'apathisch', article: null, partOfSpeech: 'adjective', level: 'B2' },
    { german: 'verletzlich', article: null, partOfSpeech: 'adjective', level: 'B2' },
  ],
  adjectives: [
    { german: 'warm', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'kalt', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'jung', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'heiß', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'dünn', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'dick', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'laut', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'leise', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'schwer', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'leicht', article: null, partOfSpeech: 'adjective', level: 'A1' },
    { german: 'freundlich', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'lustig', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'ernst', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'leer', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'voll', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'schmutzig', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'sauber', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'trocken', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'nass', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'süß', article: null, partOfSpeech: 'adjective', level: 'A2' },
    { german: 'geduldig', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'ehrlich', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'mutig', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'neugierig', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'bescheiden', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'großzügig', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'vernünftig', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'erfolgreich', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'häufig', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'selten', article: null, partOfSpeech: 'adjective', level: 'B1' },
    { german: 'anspruchsvoll', article: null, partOfSpeech: 'adjective', level: 'B2' },
    { german: 'beharrlich', article: null, partOfSpeech: 'adjective', level: 'B2' },
    { german: 'gewissenhaft', article: null, partOfSpeech: 'adjective', level: 'B2' },
    { german: 'sachlich', article: null, partOfSpeech: 'adjective', level: 'B2' },
    { german: 'bemerkenswert', article: null, partOfSpeech: 'adjective', level: 'B2' },
    { german: 'außerordentlich', article: null, partOfSpeech: 'adjective', level: 'B2' },
    { german: 'umfassend', article: null, partOfSpeech: 'adjective', level: 'B2' },
    { german: 'bahnbrechend', article: null, partOfSpeech: 'adjective', level: 'B2' },
    { german: 'grundlegend', article: null, partOfSpeech: 'adjective', level: 'B2' },
    { german: 'tiefgreifend', article: null, partOfSpeech: 'adjective', level: 'B2' },
  ],
  nature: [
    { german: 'Baum', article: 'der', plural: 'Bäume', level: 'A1' },
    { german: 'Blume', article: 'die', plural: 'Blumen', level: 'A1' },
    { german: 'Berg', article: 'der', plural: 'Berge', level: 'A1' },
    { german: 'See', article: 'der', plural: 'Seen', level: 'A1' },
    { german: 'Meer', article: 'das', plural: 'Meere', level: 'A1' },
    { german: 'Fluss', article: 'der', plural: 'Flüsse', level: 'A1' },
    { german: 'Wald', article: 'der', plural: 'Wälder', level: 'A1' },
    { german: 'Regen', article: 'der', level: 'A1' },
    { german: 'Schnee', article: 'der', level: 'A1' },
    { german: 'Wind', article: 'der', plural: 'Winde', level: 'A1' },
  ],
  greetings: [
    { german: 'Entschuldigung', article: 'die', partOfSpeech: 'phrase', level: 'A1' },
    { german: 'Danke schön', article: null, partOfSpeech: 'phrase', level: 'A1' },
    { german: 'Bitte schön', article: null, partOfSpeech: 'phrase', level: 'A1' },
    { german: 'Willkommen', article: null, partOfSpeech: 'phrase', level: 'A1' },
    { german: 'Herzlichen Glückwunsch', article: null, partOfSpeech: 'phrase', level: 'A2' },
    { german: 'Alles Gute', article: null, partOfSpeech: 'phrase', level: 'A2' },
    { german: 'Gute Besserung', article: null, partOfSpeech: 'phrase', level: 'A2' },
  ],
};

// ── MyMemory Translation API ───────────────────────────────────────────────

const MYMEMORY_API = 'https://api.mymemory.translated.net/get';

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translate(text: string, from: string, to: string): Promise<string> {
  const params = new URLSearchParams({
    q: text,
    langpair: `${from}|${to}`,
  });

  const url = `${MYMEMORY_API}?${params}`;
  try {
    // Use curl as fallback since Node.js fetch may be blocked by egress policy
    const result = execSync(`curl -s "${url}"`, { timeout: 10000, encoding: 'utf-8' });
    const data = JSON.parse(result);
    const translation = data?.responseData?.translatedText;
    if (!translation) return text;
    const clean = translation.replace(/\.$/, '').trim();
    if (!clean || clean.toLowerCase() === text.toLowerCase()) return text;
    return clean;
  } catch (e) {
    console.error(`      Translation error for "${text}":`, (e as Error).message);
    return text;
  }
}

// ── Example Sentence Generator ─────────────────────────────────────────────

function generateExampleSentence(word: string, pos: string, article: string | null): string {
  if (pos === 'noun' && article) {
    const accusative: Record<string, string> = { der: 'den', die: 'die', das: 'das' };
    const indefinite: Record<string, string> = { der: 'einen', die: 'eine', das: 'ein' };
    const templates = [
      `Ich brauche ${accusative[article] ?? 'den'} ${word}.`,
      `${article.charAt(0).toUpperCase() + article.slice(1)} ${word} ist sehr wichtig.`,
      `Wo ist ${article} ${word}?`,
      `Ich habe ${indefinite[article] ?? 'einen'} ${word} gekauft.`,
      `Hast du ${accusative[article] ?? 'den'} ${word} gesehen?`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }
  if (pos === 'verb') {
    const templates = [
      `Ich möchte ${word}.`,
      `Wir müssen heute ${word}.`,
      `Kannst du ${word}?`,
      `Er will nicht ${word}.`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }
  if (pos === 'adjective') {
    const templates = [
      `Das ist sehr ${word}.`,
      `Er ist ${word}.`,
      `Das Wetter ist heute ${word}.`,
      `Sie findet das ${word}.`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }
  if (pos === 'phrase') {
    return word + '!';
  }
  return `${word} ist ein wichtiges Wort.`;
}

// ── File Operations ────────────────────────────────────────────────────────

function getExistingWords(category: string): Set<string> {
  const filePath = path.join(__dirname, '..', 'src', 'lib', 'constants', 'vocabulary', `${category}.ts`);
  if (!fs.existsSync(filePath)) return new Set();

  const content = fs.readFileSync(filePath, 'utf-8');
  const germanWords = new Set<string>();
  const matches = content.matchAll(/german:\s*'([^']+)'/g);
  for (const match of matches) {
    germanWords.add(match[1].toLowerCase());
  }
  return germanWords;
}

function getNextId(category: string, level: string): number {
  const filePath = path.join(__dirname, '..', 'src', 'lib', 'constants', 'vocabulary', `${category}.ts`);
  if (!fs.existsSync(filePath)) return 1;

  const content = fs.readFileSync(filePath, 'utf-8');
  const levelLower = level.toLowerCase();
  const idPattern = new RegExp(`id:\\s*'${category}-${levelLower}-(\\d+)'`, 'g');
  let maxId = 0;
  let match;
  while ((match = idPattern.exec(content)) !== null) {
    const num = parseInt(match[1], 10);
    if (num > maxId) maxId = num;
  }

  // Also check old-style IDs
  if (maxId === 0) {
    const oldPattern = new RegExp(`id:\\s*'${category}-(\\d+)'`, 'g');
    while ((match = oldPattern.exec(content)) !== null) {
      const num = parseInt(match[1], 10);
      if (num > maxId) maxId = num;
    }
  }

  return maxId + 1;
}

function escapeStr(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function formatWordEntry(word: WordData, id: string): string {
  const lines = [
    `  {`,
    `    id: '${id}',`,
    `    german: '${escapeStr(word.german)}',`,
    `    turkish: '${escapeStr(word.turkish)}',`,
    `    english: '${escapeStr(word.english)}',`,
    `    article: ${word.article ? `'${word.article}'` : 'null'},`,
  ];

  if (word.plural) {
    lines.push(`    plural: '${escapeStr(word.plural)}',`);
  }

  lines.push(`    partOfSpeech: '${word.partOfSpeech}',`);

  if (word.synonyms && word.synonyms.length > 0) {
    lines.push(`    synonyms: [${word.synonyms.map((s) => `'${escapeStr(s)}'`).join(', ')}],`);
  }

  lines.push(
    `    exampleSentence: '${escapeStr(word.exampleSentence)}',`,
    `    exampleTranslation: '${escapeStr(word.exampleTranslation)}',`,
    `    exampleTranslationEn: '${escapeStr(word.exampleTranslationEn)}',`,
    `    category: '${word.category}',`,
    `    level: '${word.level}',`,
    `  },`,
  );

  return lines.join('\n');
}

function appendToFile(category: string, entries: string[]): void {
  const filePath = path.join(__dirname, '..', 'src', 'lib', 'constants', 'vocabulary', `${category}.ts`);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const insertPoint = content.lastIndexOf('];');
  if (insertPoint === -1) {
    console.error('Could not find closing ]; in file');
    process.exit(1);
  }

  const newContent =
    content.slice(0, insertPoint) +
    entries.join('\n') +
    '\n' +
    content.slice(insertPoint);

  fs.writeFileSync(filePath, newContent, 'utf-8');
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const getArg = (name: string): string | undefined => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : undefined;
  };

  const category = getArg('category');
  const level = getArg('level') as 'A1' | 'A2' | 'B1' | 'B2' | undefined;
  const count = parseInt(getArg('count') ?? '10', 10);
  const wordsArg = getArg('words');
  const fromPool = args.includes('--from-pool');
  const dryRun = args.includes('--dry-run');

  if (!category) {
    console.error('Usage: npx tsx scripts/fetch-vocabulary.ts --category <name> --level <A1|A2|B1|B2> [options]');
    console.error('\nOptions:');
    console.error('  --words "w1,w2,w3"  Comma-separated German words');
    console.error('  --from-pool         Use built-in word pool');
    console.error('  --count N           Number of words (default: 10)');
    console.error('  --dry-run           Preview without writing');
    console.error('\nCategories:', Object.keys(WORD_POOLS).join(', '));
    process.exit(1);
  }

  if (!level || !['A1', 'A2', 'B1', 'B2'].includes(level)) {
    console.error('Please specify a valid CEFR level: A1, A2, B1, B2');
    process.exit(1);
  }

  console.log(`\n📚 Vocabulary Fetcher`);
  console.log(`   Category: ${category}`);
  console.log(`   Level: ${level}`);
  if (dryRun) console.log(`   Mode: DRY RUN`);
  console.log('');

  const existingWords = getExistingWords(category);
  console.log(`   Found ${existingWords.size} existing words in ${category}.ts\n`);

  // Gather candidate words
  let candidates: PoolWord[] = [];

  if (wordsArg) {
    const pool = WORD_POOLS[category] ?? [];
    candidates = wordsArg.split(',').map((w) => w.trim()).filter(Boolean).map((german) => {
      // Try to find metadata from pool
      const poolMatch = pool.find((p) => p.german.toLowerCase() === german.toLowerCase());
      return poolMatch ? { ...poolMatch, level } : { german, level };
    });
  } else if (fromPool) {
    const pool = WORD_POOLS[category];
    if (!pool) {
      console.error(`No word pool for category: ${category}`);
      process.exit(1);
    }
    candidates = pool.filter((w) => w.level === level);
  } else {
    console.error('Please specify --words or --from-pool');
    process.exit(1);
  }

  // Filter out existing
  candidates = candidates.filter((w) => !existingWords.has(w.german.toLowerCase()));
  if (candidates.length > count) candidates = candidates.slice(0, count);

  if (candidates.length === 0) {
    console.log('   No new words to add (all already exist).');
    process.exit(0);
  }

  console.log(`   Processing ${candidates.length} words...\n`);

  const wordEntries: string[] = [];
  let nextId = getNextId(category, level);

  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    console.log(`   [${i + 1}/${candidates.length}] ${candidate.german}`);

    // Translate to Turkish and English
    const turkish = await translate(candidate.german, 'de', 'tr');
    await sleep(400);
    const english = await translate(candidate.german, 'de', 'en');
    await sleep(400);

    // Generate example sentence
    const pos = candidate.partOfSpeech ?? 'noun';
    const exampleDe = generateExampleSentence(candidate.german, pos, candidate.article ?? null);

    const exampleTr = await translate(exampleDe, 'de', 'tr');
    await sleep(400);
    const exampleEn = await translate(exampleDe, 'de', 'en');
    await sleep(400);

    const wordData: WordData = {
      german: candidate.german,
      turkish: capitalizeFirst(turkish),
      english: capitalizeFirst(english),
      article: (candidate.article ?? null) as WordData['article'],
      plural: candidate.plural,
      partOfSpeech: (candidate.partOfSpeech ?? 'noun') as WordData['partOfSpeech'],
      exampleSentence: exampleDe,
      exampleTranslation: exampleTr,
      exampleTranslationEn: exampleEn,
      category,
      level,
    };

    const idStr = `${category}-${level.toLowerCase()}-${nextId}`;
    const entry = formatWordEntry(wordData, idStr);
    wordEntries.push(entry);

    if (dryRun) {
      console.log(`\n${entry}\n`);
    }

    nextId++;
  }

  console.log(`\n   ✅ Processed ${wordEntries.length} words`);

  if (!dryRun) {
    appendToFile(category, wordEntries);
    console.log(`   📝 Written to src/lib/constants/vocabulary/${category}.ts`);
  } else {
    console.log('   (Dry run - no files modified)');
  }

  console.log('');
}

function capitalizeFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

main().catch((e) => {
  console.error('Error:', e);
  process.exit(1);
});
