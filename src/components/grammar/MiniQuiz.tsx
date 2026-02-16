'use client';

import { useState, useMemo } from 'react';
import { GrammarExercise, MultipleChoiceData, FillInBlankData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, Lightbulb, Sparkles, Trophy } from 'lucide-react';

interface MiniQuizProps {
  exercises: GrammarExercise[];
  lang: 'tr' | 'en';
  maxQuestions?: number;
}

export function MiniQuiz({ exercises, lang, maxQuestions = 2 }: MiniQuizProps) {
  // Pick random exercises for mini quiz
  const quizExercises = useMemo(() => {
    const shuffled = [...exercises].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(maxQuestions, shuffled.length));
  }, [exercises, maxQuestions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  if (quizExercises.length === 0) return null;

  const ex = quizExercises[currentIndex];
  const isMultiple = ex?.type === 'multiple-choice';

  const getExplanation = (): string => {
    if (!ex) return '';
    if (lang === 'en' && ex.explanationEn) return ex.explanationEn;
    if (ex.explanation) return ex.explanation;
    if (ex.type === 'multiple-choice') {
      const data = ex.data as MultipleChoiceData;
      if (data.explanation) return data.explanation;
    }
    return '';
  };

  const checkAnswer = () => {
    if (!ex) return;
    let correct = false;

    if (isMultiple) {
      const data = ex.data as MultipleChoiceData;
      correct = selectedOption === data.correctIndex;
    } else {
      const data = ex.data as FillInBlankData;
      const mainAnswer = data.answer || data.blanks?.[0]?.answer || '';
      const alts = data.acceptableAnswers || data.blanks?.[0]?.alternatives || [];
      const accepted = [mainAnswer, ...alts].map(a => a.toLowerCase());
      correct = accepted.includes(answer.trim().toLowerCase());
    }

    if (correct) setCorrectCount(c => c + 1);
    setShowResult(true);
  };

  const next = () => {
    if (currentIndex < quizExercises.length - 1) {
      setCurrentIndex(i => i + 1);
      setAnswer('');
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizDone(true);
    }
  };

  // Quiz completed
  if (quizDone) {
    const allCorrect = correctCount === quizExercises.length;
    return (
      <Card className={`border-2 ${allCorrect ? 'border-green-300 dark:border-green-800' : 'border-border'}`}>
        <CardContent className="p-5 text-center space-y-2">
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${allCorrect ? 'bg-green-100 dark:bg-green-950/30' : 'bg-amber-100 dark:bg-amber-950/30'}`}>
            {allCorrect ? <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" /> : <Sparkles className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
          </div>
          <p className="font-bold text-lg">
            {correctCount}/{quizExercises.length}
          </p>
          <p className="text-sm text-muted-foreground">
            {allCorrect
              ? (lang === 'tr' ? 'Harika! Alıştırmalara hazırsın!' : 'Great! You are ready for the exercises!')
              : (lang === 'tr' ? 'Açıklamayı tekrar gözden geçir, sonra alıştırmalara geç.' : 'Review the explanation again, then try the exercises.')}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuizDone(false);
              setCurrentIndex(0);
              setAnswer('');
              setSelectedOption(null);
              setShowResult(false);
              setCorrectCount(0);
            }}
            className="text-xs"
          >
            {lang === 'tr' ? 'Tekrar dene' : 'Try again'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!ex) return null;

  const data = ex.data as MultipleChoiceData & FillInBlankData;
  let isCorrect = false;
  if (showResult) {
    if (isMultiple) {
      isCorrect = selectedOption === (data as MultipleChoiceData).correctIndex;
    } else {
      const mainAns = data.answer || data.blanks?.[0]?.answer || '';
      const alts = data.acceptableAnswers || data.blanks?.[0]?.alternatives || [];
      const accepted = [mainAns, ...alts].map(a => a?.toLowerCase());
      isCorrect = accepted.includes(answer.trim().toLowerCase());
    }
  }

  const correctAnswer = isMultiple
    ? (data as MultipleChoiceData).options[(data as MultipleChoiceData).correctIndex]
    : (data.answer || data.blanks?.[0]?.answer || '');
  const explanation = getExplanation();

  return (
    <Card className="border-2 border-dashed border-violet-300 dark:border-violet-800 bg-violet-50/30 dark:bg-violet-950/10">
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
              <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="text-sm font-bold text-violet-700 dark:text-violet-400">
              {lang === 'tr' ? 'Mini Test' : 'Mini Quiz'}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1}/{quizExercises.length}
          </span>
        </div>

        {/* Question */}
        <p className="font-medium text-sm">{ex.question}</p>

        {/* Answer area */}
        {isMultiple ? (
          <div className="grid grid-cols-2 gap-2">
            {(data as MultipleChoiceData).options.map((opt, i) => {
              let variant: 'outline' | 'default' | 'destructive' | 'secondary' = 'outline';
              if (showResult) {
                if (i === (data as MultipleChoiceData).correctIndex) variant = 'default';
                else if (selectedOption === i) variant = 'destructive';
              } else if (selectedOption === i) {
                variant = 'secondary';
              }
              return (
                <Button
                  key={i}
                  variant={variant}
                  size="sm"
                  className="justify-start text-xs h-9"
                  onClick={() => !showResult && setSelectedOption(i)}
                  disabled={showResult}
                >
                  {opt}
                </Button>
              );
            })}
          </div>
        ) : (
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={lang === 'tr' ? 'Cevabını yaz...' : 'Type your answer...'}
            disabled={showResult}
            className="text-sm h-9"
            onKeyDown={(e) => e.key === 'Enter' && !showResult && checkAnswer()}
          />
        )}

        {/* Result */}
        {showResult && (
          <div className="space-y-2">
            <div className={`flex items-center gap-2 rounded-lg p-2.5 text-xs ${isCorrect ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400'}`}>
              {isCorrect ? <CheckCircle className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
              {isCorrect ? (
                <span className="font-medium">{lang === 'tr' ? 'Doğru!' : 'Correct!'}</span>
              ) : (
                <span>{lang === 'tr' ? 'Doğru cevap' : 'Correct answer'}: <strong>{correctAnswer}</strong></span>
              )}
            </div>
            {!isCorrect && explanation && (
              <div className="flex items-start gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-2.5 text-xs">
                <Lightbulb className="h-3.5 w-3.5 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-blue-700 dark:text-blue-400">{explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* Action button */}
        {!showResult ? (
          <Button
            onClick={checkAnswer}
            disabled={isMultiple ? selectedOption === null : !answer.trim()}
            size="sm"
            className="w-full"
            variant="secondary"
          >
            {lang === 'tr' ? 'Kontrol Et' : 'Check'}
          </Button>
        ) : (
          <Button onClick={next} size="sm" className="w-full" variant="secondary">
            {currentIndex < quizExercises.length - 1
              ? (lang === 'tr' ? 'Sonraki' : 'Next')
              : (lang === 'tr' ? 'Sonucu Gör' : 'See Result')}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
