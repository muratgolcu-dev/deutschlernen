'use client';

import { useState } from 'react';
import { allGrammarLessons } from '@/lib/constants/grammar';
import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { useLanguage } from '@/hooks/useLanguage';
import { GrammarLesson, MultipleChoiceData, FillInBlankData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

type View = 'list' | 'lesson' | 'exercise';

export default function GrammarPage() {
  const [view, setView] = useState<View>('list');
  const [activeLesson, setActiveLesson] = useState<GrammarLesson | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const { lessonProgress, completeLessonExercise, completeLessonAttempt } = useDeutschStore();
  const { t, lang } = useLanguage();

  const openLesson = (lesson: GrammarLesson) => {
    setActiveLesson(lesson);
    setView('lesson');
  };

  const startExercises = () => {
    setExerciseIndex(0);
    setAnswer('');
    setSelectedOption(null);
    setShowResult(false);
    setCorrectCount(0);
    setView('exercise');
  };

  const checkAnswer = () => {
    if (!activeLesson) return;
    const ex = activeLesson.exercises[exerciseIndex];
    let correct = false;
    if (ex.type === 'multiple-choice') {
      const data = ex.data as MultipleChoiceData;
      correct = selectedOption === data.correctIndex;
    } else if (ex.type === 'fill-in-the-blank') {
      const data = ex.data as FillInBlankData;
      const mainAnswer = data.answer || data.blanks?.[0]?.answer || '';
      const alts = data.acceptableAnswers || data.blanks?.[0]?.alternatives || [];
      const accepted = [mainAnswer, ...alts].map(a => a.toLowerCase());
      correct = accepted.includes(answer.trim().toLowerCase());
    }
    if (correct) setCorrectCount((c) => c + 1);
    completeLessonExercise(activeLesson.id, ex.id, correct);
    setShowResult(true);
  };

  const nextExercise = () => {
    if (!activeLesson) return;
    if (exerciseIndex < activeLesson.exercises.length - 1) {
      setExerciseIndex((i) => i + 1);
      setAnswer('');
      setSelectedOption(null);
      setShowResult(false);
    } else {
      const score = Math.round((correctCount / activeLesson.exercises.length) * 100);
      completeLessonAttempt(activeLesson.id, score);
      setView('lesson');
    }
  };

  // Exercise view
  if (view === 'exercise' && activeLesson) {
    const ex = activeLesson.exercises[exerciseIndex];
    const isMultiple = ex.type === 'multiple-choice';
    const data = ex.data as MultipleChoiceData & FillInBlankData;
    let isCorrect = false;
    if (isMultiple) isCorrect = selectedOption === (data as MultipleChoiceData).correctIndex;
    else {
      const mainAns = data.answer || data.blanks?.[0]?.answer || '';
      const alts = data.acceptableAnswers || data.blanks?.[0]?.alternatives || [];
      const accepted = [mainAns, ...alts].map(a => a?.toLowerCase());
      isCorrect = accepted.includes(answer.trim().toLowerCase());
    }

    return (
      <div className="mx-auto max-w-lg space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setView('lesson')}>
            <ArrowLeft className="mr-1 h-4 w-4" /> {t('vocab.back')}
          </Button>
          <span className="text-sm text-muted-foreground">{exerciseIndex + 1}/{activeLesson.exercises.length}</span>
        </div>
        <Progress value={((exerciseIndex + 1) / activeLesson.exercises.length) * 100} className="h-2" />

        <Card>
          <CardContent className="space-y-4 p-6">
            <p className="text-sm text-muted-foreground">{ex.instruction || ex.type}</p>
            <p className="text-lg font-medium">{ex.question}</p>

            {isMultiple ? (
              <div className="space-y-2">
                {(data as MultipleChoiceData).options.map((opt, i) => (
                  <Button
                    key={i}
                    variant={showResult ? (i === (data as MultipleChoiceData).correctIndex ? 'default' : selectedOption === i ? 'destructive' : 'outline') : selectedOption === i ? 'secondary' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => !showResult && setSelectedOption(i)}
                    disabled={showResult}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            ) : (
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={t('grammar.answerPlaceholder')}
                disabled={showResult}
                onKeyDown={(e) => e.key === 'Enter' && !showResult && checkAnswer()}
              />
            )}

            {showResult && (
              <div className={`flex items-center gap-2 rounded-lg p-3 ${isCorrect ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400'}`}>
                {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                <span className="text-sm">
                  {isCorrect ? t('grammar.correct') : `${t('grammar.wrong')}: ${isMultiple ? (data as MultipleChoiceData).options[(data as MultipleChoiceData).correctIndex] : (data.answer || data.blanks?.[0]?.answer)}`}
                </span>
              </div>
            )}

            {!showResult ? (
              <Button onClick={checkAnswer} disabled={isMultiple ? selectedOption === null : !answer.trim()} className="w-full">
                {t('grammar.check')}
              </Button>
            ) : (
              <Button onClick={nextExercise} className="w-full">
                {exerciseIndex < activeLesson.exercises.length - 1 ? t('grammar.next') : t('grammar.finish')}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Lesson detail view
  if (view === 'lesson' && activeLesson) {
    const progress = lessonProgress[activeLesson.id];
    return (
      <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-8">
        <Button variant="ghost" size="sm" onClick={() => { setView('list'); setActiveLesson(null); }}>
          <ArrowLeft className="mr-1 h-4 w-4" /> {t('grammar.lessons')}
        </Button>

        <div>
          <Badge variant="outline">{activeLesson.level}</Badge>
          <h1 className="mt-2 text-2xl font-bold">{activeLesson.title}</h1>
          <p className="text-muted-foreground">{lang === 'en' ? (activeLesson.englishTitle || activeLesson.turkishTitle) : activeLesson.turkishTitle}</p>
          {progress && (
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary">{t('grammar.best')}: %{progress.bestScore}</Badge>
              <Badge variant="outline">{progress.attempts} {t('grammar.attempts')}</Badge>
            </div>
          )}
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">{t('grammar.explanation')}</CardTitle></CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-line">{lang === 'en' ? (activeLesson.explanationEn || activeLesson.explanation) : activeLesson.explanation}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">{t('grammar.examples')}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {activeLesson.examples.map((ex, i) => (
              <div key={i} className="rounded-lg border p-3">
                <p className="font-medium">{ex.german}</p>
                <p className="text-sm text-muted-foreground">{lang === 'en' ? (ex.english || ex.turkish) : ex.turkish}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {activeLesson.tips.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-base">{t('grammar.tips')}</CardTitle></CardHeader>
            <CardContent>
              <ul className="list-disc space-y-1 pl-4 text-sm">
                {(lang === 'en' && activeLesson.tipsEn ? activeLesson.tipsEn : activeLesson.tips).map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </CardContent>
          </Card>
        )}

        <Button onClick={startExercises} className="w-full" size="lg">
          {t('grammar.startExercises')} ({activeLesson.exercises.length} {t('grammar.questions')})
        </Button>
      </div>
    );
  }

  // Lesson list
  const levels = ['A1', 'A2', 'B1', 'B2'] as const;
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold">{t('grammar.title')}</h1>

      {levels.map((level) => {
        const lessons = allGrammarLessons.filter((l) => l.level === level);
        if (lessons.length === 0) return null;
        return (
          <div key={level}>
            <h2 className="mb-3 text-lg font-semibold">{level}</h2>
            <div className="space-y-2">
              {lessons.map((lesson) => {
                const progress = lessonProgress[lesson.id];
                return (
                  <Card key={lesson.id} className="cursor-pointer transition-colors hover:bg-accent" onClick={() => openLesson(lesson)}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex-1">
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm text-muted-foreground">{lang === 'en' ? (lesson.englishTitle || lesson.turkishTitle) : lesson.turkishTitle}</p>
                      </div>
                      {progress?.completed && (
                        <Badge variant="secondary" className="gap-1">
                          <CheckCircle className="h-3 w-3" /> %{progress.bestScore}
                        </Badge>
                      )}
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
