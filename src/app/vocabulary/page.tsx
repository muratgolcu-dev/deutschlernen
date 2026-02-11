'use client';

import { useState, useCallback } from 'react';
import { vocabularyCategories, getWordById } from '@/lib/constants/vocabulary';
import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { useSpacedRepetition } from '@/hooks/useSpacedRepetition';
import { useSpeech } from '@/hooks/useSpeech';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Volume2, Eye, EyeOff, ChevronRight, RotateCcw } from 'lucide-react';
import { VocabularyWord } from '@/lib/types';

type View = 'categories' | 'category-words' | 'flashcard';

export default function VocabularyPage() {
  const [view, setView] = useState<View>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [reviewWords, setReviewWords] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const { recordReview, wordProgress } = useDeutschStore();
  const { dueWords, newWords, stats } = useSpacedRepetition(selectedCategory ?? undefined);
  const { speak } = useSpeech();
  const { t, lang, getTranslation, getExampleTranslation } = useLanguage();

  const startReview = useCallback((category: string) => {
    setSelectedCategory(category);
    const cat = vocabularyCategories.find((c) => c.id === category);
    if (!cat) return;
    const words = cat.words.slice(0, 10);
    setReviewWords(words);
    setCurrentIndex(0);
    setShowAnswer(false);
    setView('flashcard');
  }, []);

  const handleRate = useCallback((quality: number) => {
    if (!reviewWords[currentIndex]) return;
    recordReview(reviewWords[currentIndex].id, quality);
    if (currentIndex < reviewWords.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowAnswer(false);
    } else {
      setView('categories');
    }
  }, [currentIndex, reviewWords, recordReview]);

  const currentWord = reviewWords[currentIndex];

  if (view === 'flashcard' && currentWord) {
    const wp = wordProgress[currentWord.id];
    return (
      <div className="mx-auto max-w-lg space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setView('categories')}>
            <ArrowLeft className="mr-1 h-4 w-4" /> {t('vocab.back')}
          </Button>
          <span className="text-sm text-muted-foreground">{currentIndex + 1}/{reviewWords.length}</span>
        </div>
        <Progress value={((currentIndex + 1) / reviewWords.length) * 100} className="h-2" />

        <Card className="min-h-[340px]" onClick={() => !showAnswer && setShowAnswer(true)}>
          <CardContent className="flex flex-col items-center justify-center p-8 text-center min-h-[340px]">
            {currentWord.emoji && (
              <span className="text-5xl mb-3">{currentWord.emoji}</span>
            )}
            <p className="text-sm text-muted-foreground mb-2">{currentWord.partOfSpeech}</p>
            <p className="text-3xl font-bold mb-1">
              {currentWord.article ? `${currentWord.article} ` : ''}{currentWord.german}
            </p>
            {currentWord.plural && (
              <p className="text-sm text-muted-foreground mb-1">{t('vocab.plural')}: <span className="font-medium">die {currentWord.plural}</span></p>
            )}
            <Button variant="ghost" size="sm" className="mb-4" onClick={(e) => { e.stopPropagation(); speak(currentWord.german); }}>
              <Volume2 className="h-4 w-4" />
            </Button>
            {showAnswer ? (
              <div className="space-y-3 w-full">
                <p className="text-xl text-primary">{getTranslation(currentWord)}</p>
                {currentWord.synonyms && currentWord.synonyms.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <span className="text-xs text-muted-foreground">{t('vocab.synonyms')}:</span>
                    {currentWord.synonyms.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                    ))}
                  </div>
                )}
                {currentWord.antonyms && currentWord.antonyms.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <span className="text-xs text-muted-foreground">{t('vocab.antonyms')}:</span>
                    {currentWord.antonyms.map((a) => (
                      <Badge key={a} variant="outline" className="text-xs">{a}</Badge>
                    ))}
                  </div>
                )}
                {currentWord.collocations && currentWord.collocations.length > 0 && (
                  <div className="rounded-md bg-muted/50 p-2">
                    <p className="text-xs font-medium text-muted-foreground mb-1">{t('vocab.collocations')}</p>
                    {currentWord.collocations.map((c) => (
                      <p key={c} className="text-xs text-muted-foreground">• {c}</p>
                    ))}
                  </div>
                )}
                <p className="text-sm italic text-muted-foreground">{currentWord.exampleSentence}</p>
                <p className="text-xs text-muted-foreground">{getExampleTranslation(currentWord)}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{t('vocab.tapToReveal')}</p>
            )}
          </CardContent>
        </Card>

        {showAnswer && (
          <div className="grid grid-cols-3 gap-2">
            <Button variant="destructive" onClick={() => handleRate(1)} className="flex-col py-3 h-auto">
              <span className="text-xs">{t('vocab.hard')}</span>
            </Button>
            <Button variant="secondary" onClick={() => handleRate(3)} className="flex-col py-3 h-auto">
              <span className="text-xs">{t('vocab.medium')}</span>
            </Button>
            <Button onClick={() => handleRate(5)} className="flex-col py-3 h-auto bg-green-600 hover:bg-green-700">
              <span className="text-xs">{t('vocab.easy')}</span>
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold">{t('vocab.title')}</h1>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold">{stats.total}</p>
            <p className="text-xs text-muted-foreground">{t('vocab.total')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-green-500">{stats.mastered}</p>
            <p className="text-xs text-muted-foreground">{t('dash.mastered')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-blue-500">{stats.learning}</p>
            <p className="text-xs text-muted-foreground">{t('dash.learning')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-orange-500">{stats.dueToday}</p>
            <p className="text-xs text-muted-foreground">{t('dash.review')}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {vocabularyCategories.map((cat) => {
          const learnedCount = cat.words.filter((w) => wordProgress[w.id] && wordProgress[w.id].status !== 'new').length;
          return (
            <Card key={cat.id} className="cursor-pointer transition-colors hover:bg-accent" onClick={() => startReview(cat.id)}>
              <CardContent className="flex items-center gap-4 p-4">
                <span className="text-3xl">{cat.icon}</span>
                <div className="flex-1">
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-sm text-muted-foreground">{lang === 'en' ? (cat.englishName || cat.turkishName) : cat.turkishName}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={(learnedCount / cat.words.length) * 100} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground">{learnedCount}/{cat.words.length}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
