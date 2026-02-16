'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft, CheckCircle, XCircle, Trophy, Target,
  BookOpen, GraduationCap, Shuffle, Lightbulb, RotateCcw, ChevronRight,
} from 'lucide-react';
import {
  quizDefinitions,
  generateQuizQuestions,
  QuizDefinition,
  QuizQuestion,
} from '@/lib/constants/quiz';

type View = 'levels' | 'topics' | 'quiz' | 'result';

interface QuizResult {
  question: QuizQuestion;
  selectedIndex: number;
  correct: boolean;
}

export default function QuizPage() {
  const { t, lang } = useLanguage();
  const [view, setView] = useState<View>('levels');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizDefinition | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);

  const levels = ['A1', 'A2', 'B1', 'B2'] as const;
  const levelColors: Record<string, string> = {
    A1: 'from-green-500 to-emerald-600',
    A2: 'from-blue-500 to-cyan-600',
    B1: 'from-violet-500 to-purple-600',
    B2: 'from-orange-500 to-red-600',
  };
  const levelDescriptions: Record<string, { tr: string; en: string }> = {
    A1: { tr: 'Başlangıç', en: 'Beginner' },
    A2: { tr: 'Temel', en: 'Elementary' },
    B1: { tr: 'Orta', en: 'Intermediate' },
    B2: { tr: 'İleri Orta', en: 'Upper Intermediate' },
  };

  const typeIcons: Record<string, React.ReactNode> = {
    grammar: <GraduationCap className="h-5 w-5" />,
    vocabulary: <BookOpen className="h-5 w-5" />,
    mixed: <Shuffle className="h-5 w-5" />,
  };

  const quizzesForLevel = useMemo(() => {
    if (!selectedLevel) return [];
    return quizDefinitions.filter(q => q.level === selectedLevel);
  }, [selectedLevel]);

  const selectLevel = (level: string) => {
    setSelectedLevel(level);
    setView('topics');
  };

  const startQuiz = (quiz: QuizDefinition) => {
    setSelectedQuiz(quiz);
    const q = generateQuizQuestions(quiz);
    setQuestions(q);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setResults([]);
    setView('quiz');
  };

  const checkAnswer = () => {
    if (selectedOption === null || !questions[currentIndex]) return;
    const q = questions[currentIndex];
    const correct = selectedOption === q.correctIndex;
    setResults(prev => [...prev, { question: q, selectedIndex: selectedOption, correct }]);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setView('result');
    }
  };

  const correctCount = results.filter(r => r.correct).length;
  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  // --- RESULT VIEW ---
  if (view === 'result') {
    const wrongResults = results.filter(r => !r.correct);
    // Group weak topics
    const weakTopics = new Map<string, number>();
    wrongResults.forEach(r => {
      const topic = lang === 'en' ? r.question.topicEn : r.question.topic;
      weakTopics.set(topic, (weakTopics.get(topic) || 0) + 1);
    });

    const getMessage = () => {
      if (score === 100) return t('quiz.perfect');
      if (score >= 80) return t('quiz.great');
      if (score >= 50) return t('quiz.good');
      return t('quiz.needsPractice');
    };

    const scoreColor = score === 100
      ? 'from-green-400 to-emerald-500'
      : score >= 80
        ? 'from-blue-400 to-cyan-500'
        : score >= 50
          ? 'from-amber-400 to-orange-500'
          : 'from-red-400 to-rose-500';

    return (
      <div className="mx-auto max-w-lg space-y-6 p-4 md:p-8">
        {/* Score card */}
        <Card className="overflow-hidden">
          <div className={`bg-gradient-to-br ${scoreColor} p-8 text-center text-white`}>
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Trophy className="h-10 w-10" />
            </div>
            <div className="mt-4 text-5xl font-black">{score}%</div>
            <p className="mt-2 text-lg font-medium opacity-90">
              {correctCount}/{questions.length} {t('quiz.correct')}
            </p>
          </div>
          <CardContent className="p-5 text-center">
            <p className="text-muted-foreground">{getMessage()}</p>
          </CardContent>
        </Card>

        {/* Weak points */}
        {weakTopics.size > 0 && (
          <Card className="border-amber-200 dark:border-amber-900/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-amber-500" />
                {t('quiz.weakPoints')}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{t('quiz.weakPointsDesc')}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {Array.from(weakTopics.entries()).map(([topic, count]) => (
                <div key={topic} className="flex items-center justify-between rounded-lg bg-amber-50 dark:bg-amber-950/10 p-3">
                  <span className="text-sm font-medium">{topic}</span>
                  <Badge variant="outline" className="text-amber-600 border-amber-300">
                    {count} {t('quiz.wrong')}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Wrong answers detail */}
        {wrongResults.length > 0 && (
          <div className="space-y-2">
            {wrongResults.map((r, i) => {
              const explanation = lang === 'en' && r.question.explanationEn
                ? r.question.explanationEn
                : r.question.explanation;
              return (
                <Card key={i} className="border-red-100 dark:border-red-900/20">
                  <CardContent className="p-4 space-y-2">
                    <p className="text-sm font-medium">{r.question.question}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <XCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      <span className="text-red-600 dark:text-red-400 line-through">
                        {r.question.options[r.selectedIndex]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0" />
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        {r.question.options[r.question.correctIndex]}
                      </span>
                    </div>
                    {explanation && (
                      <div className="flex items-start gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-2.5 text-xs">
                        <Lightbulb className="h-3.5 w-3.5 text-blue-500 mt-0.5 shrink-0" />
                        <p className="text-blue-700 dark:text-blue-400">{explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button onClick={() => selectedQuiz && startQuiz(selectedQuiz)} className="w-full gap-2">
            <RotateCcw className="h-4 w-4" />
            {t('quiz.tryAgain')}
          </Button>
          <Button variant="outline" onClick={() => { setView('topics'); }} className="w-full">
            {t('quiz.backToQuizzes')}
          </Button>
        </div>
      </div>
    );
  }

  // --- QUIZ VIEW ---
  if (view === 'quiz' && questions.length > 0) {
    const q = questions[currentIndex];
    if (!q) return null;

    const explanation = lang === 'en' && q.explanationEn ? q.explanationEn : q.explanation;

    return (
      <div className="mx-auto max-w-lg space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setView('topics')}>
            <ArrowLeft className="mr-1 h-4 w-4" /> {t('quiz.backToQuizzes')}
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{selectedLevel}</Badge>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1}/{questions.length}
            </span>
          </div>
        </div>

        <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-2" />

        <Card>
          <CardContent className="p-6 space-y-5">
            {/* Topic badge */}
            <Badge variant="secondary" className="text-xs">
              {lang === 'en' ? q.topicEn : q.topic}
            </Badge>

            {/* Question */}
            <p className="text-lg font-semibold leading-relaxed">{q.question}</p>

            {/* Options */}
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                let variant: 'outline' | 'default' | 'destructive' | 'secondary' = 'outline';
                if (showAnswer) {
                  if (i === q.correctIndex) variant = 'default';
                  else if (selectedOption === i) variant = 'destructive';
                } else if (selectedOption === i) {
                  variant = 'secondary';
                }
                return (
                  <Button
                    key={i}
                    variant={variant}
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => !showAnswer && setSelectedOption(i)}
                    disabled={showAnswer}
                  >
                    <span className="mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </Button>
                );
              })}
            </div>

            {/* Answer feedback */}
            {showAnswer && (
              <div className="space-y-3">
                <div className={`flex items-center gap-2 rounded-lg p-3 ${
                  results[results.length - 1]?.correct
                    ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400'
                    : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400'
                }`}>
                  {results[results.length - 1]?.correct
                    ? <CheckCircle className="h-5 w-5" />
                    : <XCircle className="h-5 w-5" />
                  }
                  <span className="text-sm font-medium">
                    {results[results.length - 1]?.correct ? t('grammar.correct') : `${t('quiz.correct')}: ${q.options[q.correctIndex]}`}
                  </span>
                </div>

                {!results[results.length - 1]?.correct && explanation && (
                  <div className="flex items-start gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 text-sm">
                    <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-blue-700 dark:text-blue-400">{explanation}</p>
                  </div>
                )}
              </div>
            )}

            {/* Action button */}
            {!showAnswer ? (
              <Button onClick={checkAnswer} disabled={selectedOption === null} className="w-full" size="lg">
                {t('grammar.check')}
              </Button>
            ) : (
              <Button onClick={nextQuestion} className="w-full" size="lg">
                {currentIndex < questions.length - 1 ? t('grammar.next') : t('quiz.result')}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- TOPIC SELECTION VIEW ---
  if (view === 'topics' && selectedLevel) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-8">
        <Button variant="ghost" size="sm" onClick={() => setView('levels')}>
          <ArrowLeft className="mr-1 h-4 w-4" /> {t('quiz.selectLevel')}
        </Button>

        <div className={`rounded-2xl bg-gradient-to-br ${levelColors[selectedLevel]} p-6 text-white`}>
          <div className="text-4xl font-black">{selectedLevel}</div>
          <p className="mt-1 text-lg opacity-90">
            {lang === 'en' ? levelDescriptions[selectedLevel]?.en : levelDescriptions[selectedLevel]?.tr}
          </p>
          <p className="mt-2 text-sm opacity-75">
            {quizzesForLevel.length} {t('quiz.quizzesAvailable')}
          </p>
        </div>

        <h2 className="text-lg font-bold">{t('quiz.selectTopic')}</h2>

        <div className="space-y-3">
          {quizzesForLevel.map(quiz => (
            <Card
              key={quiz.id}
              className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30"
              onClick={() => startQuiz(quiz)}
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${
                  quiz.type === 'grammar'
                    ? 'from-violet-100 to-purple-100 text-violet-600 dark:from-violet-900/30 dark:to-purple-900/30 dark:text-violet-400'
                    : quiz.type === 'vocabulary'
                      ? 'from-blue-100 to-cyan-100 text-blue-600 dark:from-blue-900/30 dark:to-cyan-900/30 dark:text-blue-400'
                      : 'from-amber-100 to-orange-100 text-amber-600 dark:from-amber-900/30 dark:to-orange-900/30 dark:text-amber-400'
                }`}>
                  {typeIcons[quiz.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{lang === 'en' ? quiz.titleEn : quiz.title}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {lang === 'en' ? quiz.descriptionEn : quiz.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className="text-xs">
                    {quiz.questionCount} {t('quiz.questions')}
                  </Badge>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // --- LEVEL SELECTION VIEW ---
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold">{t('quiz.title')}</h1>
      <p className="text-muted-foreground">{t('quiz.selectLevel')}</p>

      <div className="grid grid-cols-2 gap-4">
        {levels.map(level => {
          const count = quizDefinitions.filter(q => q.level === level).length;
          return (
            <Card
              key={level}
              className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
              onClick={() => selectLevel(level)}
            >
              <CardContent className="p-0">
                <div className={`bg-gradient-to-br ${levelColors[level]} rounded-t-lg p-6 text-center text-white`}>
                  <div className="text-4xl font-black">{level}</div>
                  <p className="mt-1 text-sm opacity-90">
                    {lang === 'en' ? levelDescriptions[level].en : levelDescriptions[level].tr}
                  </p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    {count} {t('quiz.quizzesAvailable')}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
