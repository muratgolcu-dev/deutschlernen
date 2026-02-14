'use client';

import { useState, useMemo } from 'react';
import { allGrammarLessons, getLessonById } from '@/lib/constants/grammar';
import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { useLanguage } from '@/hooks/useLanguage';
import { GrammarLesson, GrammarExercise, MultipleChoiceData, FillInBlankData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CheckCircle, XCircle, ChevronRight, AlertTriangle, RotateCcw, Lightbulb } from 'lucide-react';

type View = 'list' | 'lesson' | 'exercise' | 'result' | 'mistakeReview';

interface ExerciseResult {
  exercise: GrammarExercise;
  correct: boolean;
  userAnswer: string;
  correctAnswer: string;
}

export default function GrammarPage() {
  const [view, setView] = useState<View>('list');
  const [activeLesson, setActiveLesson] = useState<GrammarLesson | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<ExerciseResult[]>([]);
  const [mistakeExercises, setMistakeExercises] = useState<GrammarExercise[]>([]);
  const [isMistakeReviewMode, setIsMistakeReviewMode] = useState(false);

  const {
    lessonProgress, completeLessonExercise, completeLessonAttempt,
    grammarMistakes, recordGrammarMistake, recordMistakeCorrect, getUnreviewedMistakes,
  } = useDeutschStore();
  const { t, lang } = useLanguage();

  // Get all unreviewed mistakes count
  const totalMistakeCount = useMemo(() => {
    return Object.values(grammarMistakes).filter(m => m.timesCorrectAfterMistake < 2).length;
  }, [grammarMistakes]);

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
    setExerciseResults([]);
    setIsMistakeReviewMode(false);
    setView('exercise');
  };

  const startMistakeReview = (lessonId?: string) => {
    const mistakes = getUnreviewedMistakes(lessonId);
    if (mistakes.length === 0) return;

    // Find the actual exercises from lessons
    const reviewExercises: GrammarExercise[] = [];
    for (const mistake of mistakes) {
      const lesson = getLessonById(mistake.lessonId);
      if (!lesson) continue;
      const ex = lesson.exercises.find(e => e.id === mistake.exerciseId);
      if (ex) reviewExercises.push(ex);
    }

    if (reviewExercises.length === 0) return;

    setMistakeExercises(reviewExercises);
    setExerciseIndex(0);
    setAnswer('');
    setSelectedOption(null);
    setShowResult(false);
    setCorrectCount(0);
    setExerciseResults([]);
    setIsMistakeReviewMode(true);
    setView('exercise');
  };

  const getCurrentExercises = (): GrammarExercise[] => {
    if (isMistakeReviewMode) return mistakeExercises;
    return activeLesson?.exercises || [];
  };

  const checkAnswer = () => {
    const exercises = getCurrentExercises();
    const ex = exercises[exerciseIndex];
    if (!ex) return;

    let correct = false;
    let userAns = '';
    let correctAns = '';

    if (ex.type === 'multiple-choice') {
      const data = ex.data as MultipleChoiceData;
      correct = selectedOption === data.correctIndex;
      userAns = selectedOption !== null ? data.options[selectedOption] : '';
      correctAns = data.options[data.correctIndex];
    } else if (ex.type === 'fill-in-the-blank') {
      const data = ex.data as FillInBlankData;
      const mainAnswer = data.answer || data.blanks?.[0]?.answer || '';
      const alts = data.acceptableAnswers || data.blanks?.[0]?.alternatives || [];
      const accepted = [mainAnswer, ...alts].map(a => a.toLowerCase());
      correct = accepted.includes(answer.trim().toLowerCase());
      userAns = answer.trim();
      correctAns = mainAnswer;
    }

    if (correct) setCorrectCount((c) => c + 1);

    // Track exercise result
    setExerciseResults(prev => [...prev, { exercise: ex, correct, userAnswer: userAns, correctAnswer: correctAns }]);

    // Record in store
    if (activeLesson && !isMistakeReviewMode) {
      completeLessonExercise(activeLesson.id, ex.id, correct);
    }

    // Track mistakes
    if (!correct) {
      // Find which lesson this exercise belongs to
      const lessonId = isMistakeReviewMode
        ? grammarMistakes[ex.id]?.lessonId || ''
        : activeLesson?.id || '';
      recordGrammarMistake(lessonId, ex.id, userAns, correctAns);
    } else if (isMistakeReviewMode) {
      // If correctly answered during mistake review, record it
      recordMistakeCorrect(ex.id);
    }

    setShowResult(true);
  };

  const nextExercise = () => {
    const exercises = getCurrentExercises();
    if (exerciseIndex < exercises.length - 1) {
      setExerciseIndex((i) => i + 1);
      setAnswer('');
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // End of exercises
      if (!isMistakeReviewMode && activeLesson) {
        const score = Math.round((correctCount / exercises.length) * 100);
        completeLessonAttempt(activeLesson.id, score);
      }
      setView('result');
    }
  };

  const getExplanation = (ex: GrammarExercise): string => {
    // Check exercise-level explanation
    if (lang === 'en' && ex.explanationEn) return ex.explanationEn;
    if (ex.explanation) return ex.explanation;
    // Fall back to data-level explanation (MultipleChoice)
    if (ex.type === 'multiple-choice') {
      const data = ex.data as MultipleChoiceData;
      if (data.explanation) return data.explanation;
    }
    return '';
  };

  // Result summary view
  if (view === 'result') {
    const exercises = getCurrentExercises();
    const score = exercises.length > 0 ? Math.round((correctCount / exercises.length) * 100) : 0;
    const wrongResults = exerciseResults.filter(r => !r.correct);

    return (
      <div className="mx-auto max-w-lg space-y-4 p-4 md:p-8">
        <div className="text-center space-y-2">
          <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${score === 100 ? 'bg-green-100 dark:bg-green-950/30' : score >= 60 ? 'bg-yellow-100 dark:bg-yellow-950/30' : 'bg-red-100 dark:bg-red-950/30'}`}>
            <span className="text-2xl font-bold">{score}%</span>
          </div>
          <h2 className="text-xl font-bold">{t('grammar.lessonScore')}</h2>
          {score === 100 ? (
            <p className="text-green-600 dark:text-green-400">{t('grammar.perfectScore')}</p>
          ) : (
            <p className="text-muted-foreground">{t('grammar.mistakeSummary')}</p>
          )}
        </div>

        {/* Wrong answers detail */}
        {wrongResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              {wrongResults.length} {lang === 'tr' ? 'hata' : 'mistake(s)'}
            </h3>
            {wrongResults.map((result, i) => {
              const explanation = getExplanation(result.exercise);
              return (
                <Card key={i} className="border-red-200 dark:border-red-900/30">
                  <CardContent className="p-4 space-y-2">
                    <p className="font-medium text-sm">{result.exercise.question}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                      <span className="text-red-600 dark:text-red-400 line-through">{result.userAnswer || '—'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span className="text-green-600 dark:text-green-400 font-medium">{result.correctAnswer}</span>
                    </div>
                    {explanation && (
                      <div className="mt-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 text-sm">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                          <p className="text-blue-800 dark:text-blue-300">{explanation}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-2 pt-2">
          {wrongResults.length > 0 && (
            <Button onClick={() => startMistakeReview(activeLesson?.id)} variant="outline" className="w-full gap-2">
              <RotateCcw className="h-4 w-4" />
              {t('grammar.reviewMistakes')} ({wrongResults.length})
            </Button>
          )}
          <Button onClick={() => {
            if (isMistakeReviewMode) {
              setView('list');
              setActiveLesson(null);
            } else {
              setView('lesson');
            }
          }} className="w-full">
            {isMistakeReviewMode ? t('grammar.lessons') : t('vocab.back')}
          </Button>
        </div>
      </div>
    );
  }

  // Exercise view
  if (view === 'exercise') {
    const exercises = getCurrentExercises();
    const ex = exercises[exerciseIndex];
    if (!ex) return null;

    const isMultiple = ex.type === 'multiple-choice';
    const data = ex.data as MultipleChoiceData & FillInBlankData;
    let isCorrect = false;
    if (showResult) {
      if (isMultiple) isCorrect = selectedOption === (data as MultipleChoiceData).correctIndex;
      else {
        const mainAns = data.answer || data.blanks?.[0]?.answer || '';
        const alts = data.acceptableAnswers || data.blanks?.[0]?.alternatives || [];
        const accepted = [mainAns, ...alts].map(a => a?.toLowerCase());
        isCorrect = accepted.includes(answer.trim().toLowerCase());
      }
    }

    const explanation = getExplanation(ex);
    const correctAnswer = isMultiple
      ? (data as MultipleChoiceData).options[(data as MultipleChoiceData).correctIndex]
      : (data.answer || data.blanks?.[0]?.answer || '');

    return (
      <div className="mx-auto max-w-lg space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => {
            if (isMistakeReviewMode) { setView('list'); }
            else { setView('lesson'); }
          }}>
            <ArrowLeft className="mr-1 h-4 w-4" /> {t('vocab.back')}
          </Button>
          <div className="flex items-center gap-2">
            {isMistakeReviewMode && (
              <Badge variant="outline" className="gap-1 text-orange-600">
                <RotateCcw className="h-3 w-3" /> {t('grammar.mistakeReview')}
              </Badge>
            )}
            <span className="text-sm text-muted-foreground">{exerciseIndex + 1}/{exercises.length}</span>
          </div>
        </div>
        <Progress value={((exerciseIndex + 1) / exercises.length) * 100} className="h-2" />

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
              <div className="space-y-3">
                {/* Correct/Wrong indicator */}
                <div className={`flex items-center gap-2 rounded-lg p-3 ${isCorrect ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400'}`}>
                  {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  <div className="flex-1">
                    {isCorrect ? (
                      <span className="text-sm font-medium">{t('grammar.correct')}</span>
                    ) : (
                      <div className="space-y-1">
                        <span className="text-sm">{t('grammar.correctAnswer')}: <strong>{correctAnswer}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Detailed explanation - shown for WRONG answers */}
                {!isCorrect && explanation && (
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">{t('grammar.whyWrong')}</p>
                        <p className="text-sm text-blue-700 dark:text-blue-400">{explanation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!showResult ? (
              <Button onClick={checkAnswer} disabled={isMultiple ? selectedOption === null : !answer.trim()} className="w-full">
                {t('grammar.check')}
              </Button>
            ) : (
              <Button onClick={nextExercise} className="w-full">
                {exerciseIndex < exercises.length - 1 ? t('grammar.next') : t('grammar.finish')}
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
    const lessonMistakes = getUnreviewedMistakes(activeLesson.id);

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

        {/* Mistake review button for this lesson */}
        {lessonMistakes.length > 0 && (
          <Card className="border-orange-200 dark:border-orange-900/30 bg-orange-50/50 dark:bg-orange-950/10">
            <CardContent className="flex items-center gap-3 p-4">
              <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">{lessonMistakes.length} {t('grammar.mistakesRemaining')}</p>
                <p className="text-xs text-muted-foreground">{t('grammar.mistakeCount')}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => startMistakeReview(activeLesson.id)} className="gap-1">
                <RotateCcw className="h-3 w-3" />
                {t('grammar.reviewMistakes')}
              </Button>
            </CardContent>
          </Card>
        )}

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

      {/* Global mistake review */}
      {totalMistakeCount > 0 && (
        <Card className="border-orange-200 dark:border-orange-900/30 bg-orange-50/50 dark:bg-orange-950/10">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950/30">
              <RotateCcw className="h-5 w-5 text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{t('grammar.mistakeReview')}</p>
              <p className="text-sm text-muted-foreground">{totalMistakeCount} {t('grammar.mistakesRemaining')}</p>
            </div>
            <Button onClick={() => startMistakeReview()} className="gap-1">
              <RotateCcw className="h-4 w-4" />
              {t('grammar.reviewMistakes')}
            </Button>
          </CardContent>
        </Card>
      )}

      {levels.map((level) => {
        const lessons = allGrammarLessons.filter((l) => l.level === level);
        if (lessons.length === 0) return null;
        return (
          <div key={level}>
            <h2 className="mb-3 text-lg font-semibold">{level}</h2>
            <div className="space-y-2">
              {lessons.map((lesson) => {
                const progress = lessonProgress[lesson.id];
                const lessonMistakeCount = Object.values(grammarMistakes).filter(
                  m => m.lessonId === lesson.id && m.timesCorrectAfterMistake < 2
                ).length;
                return (
                  <Card key={lesson.id} className="cursor-pointer transition-colors hover:bg-accent" onClick={() => openLesson(lesson)}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex-1">
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm text-muted-foreground">{lang === 'en' ? (lesson.englishTitle || lesson.turkishTitle) : lesson.turkishTitle}</p>
                      </div>
                      {lessonMistakeCount > 0 && (
                        <Badge variant="outline" className="gap-1 text-orange-600 border-orange-300">
                          <AlertTriangle className="h-3 w-3" /> {lessonMistakeCount}
                        </Badge>
                      )}
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
