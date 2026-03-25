# DeutschLernen - CLAUDE.md v2

## Project Overview
Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + Zustand app for learning German (TR/EN support).

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — type check

## Project Structure
```
src/app/          → Pages: vocabulary, quiz, grammar, chat, settings
src/components/   → UI components (app-shell, navigation, grammar, ui/)
src/lib/constants/vocabulary/ → 20 category files (VocabularyWord[])
src/lib/store/    → Zustand stores
src/lib/types/    → TypeScript types (vocabulary, grammar, conversation, notebook, progress, settings)
src/lib/services/ → API services
```

## Vocabulary Files
- Each file exports a typed array: `export const xxxWords: VocabularyWord[]`
- Fields: id, german, turkish, english, article, plural, partOfSpeech, synonyms, antonyms, collocations, emoji, exampleSentence, exampleTranslation, exampleTranslationEn, category, level
- IDs: `{category}-{number}` (e.g. `food-42`)
- Levels: A1, A2, B1, B2
- Target: 100 words per category
- Categories at 100: adjectives, clothing, colors, education, emotions, food, greetings, numbers, technology, transport, verbs, time
- Categories needing expansion: body(35), home(35), nature(35), shopping(35), travel(35), work(35), family(40)

## Deployment (Vercel)
- **NEVER create a new Vercel project.** Deploy to existing `deutschlernen`.
- `vercel --prod --yes` for production deploys.
- Before deploying, check `vercel project ls` (max 10 projects on free plan).

## Key Rules
- Always run `npx tsc --noEmit` after changes to verify no type errors.
- Check for duplicate IDs when adding vocabulary.
- Keep article: null for adjectives/verbs, set proper article for nouns.
- UI language: Turkish for user-facing, German for learning content.
