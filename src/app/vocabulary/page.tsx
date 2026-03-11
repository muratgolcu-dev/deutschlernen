'use client';

import { useState, useCallback, useRef } from 'react';
import { vocabularyCategories, getWordById } from '@/lib/constants/vocabulary';
import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { useSpacedRepetition } from '@/hooks/useSpacedRepetition';
import { useSpeech } from '@/hooks/useSpeech';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, Volume2, Eye, EyeOff, ChevronRight, RotateCcw, FileUp, Trash2, Loader2, FileText, Check } from 'lucide-react';
import { VocabularyWord, CustomVocabularyCategory, CEFRLevel } from '@/lib/types';

type View = 'categories' | 'category-words' | 'flashcard';

async function extractTextFromPdf(file: File): Promise<string> {
  const pdfjsLib = await import('pdfjs-dist');

  // Use jsdelivr CDN for worker (cdnjs doesn't have v5.x)
  const version = pdfjsLib.version;
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();

  let pdf;
  try {
    pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  } catch (docError) {
    console.error('PDF document load error:', docError);
    // Fallback: try without worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = '';
    pdf = await pdfjsLib.getDocument({ data: arrayBuffer, isEvalSupported: false }).promise;
  }

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .filter((item: Record<string, unknown>) => 'str' in item)
      .map((item: Record<string, unknown>) => {
        return (item.str as string) + (item.hasEOL ? '\n' : '');
      })
      .join('');
    fullText += pageText + '\n\n';
  }

  const cleaned = fullText.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();

  if (!cleaned || cleaned.length < 5) {
    throw new Error('PDF dosyasından metin çıkarılamadı. PDF görsel tabanlı olabilir.');
  }

  return cleaned;
}

export default function VocabularyPage() {
  const [view, setView] = useState<View>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [reviewWords, setReviewWords] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const { recordReview, wordProgress, settings, customCategories, addCustomCategory, removeCustomCategory } = useDeutschStore();
  const { dueWords, newWords, stats } = useSpacedRepetition(selectedCategory ?? undefined);
  const { speak } = useSpeech();
  const { t, lang, getTranslation, getExampleTranslation } = useLanguage();

  // PDF import state
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [pdfImporting, setPdfImporting] = useState(false);
  const [pdfStatus, setPdfStatus] = useState('');
  const [pdfResult, setPdfResult] = useState<{ categoryName: string; categoryNameTr: string; categoryNameEn?: string; words: VocabularyWord[] } | null>(null);
  const [pdfError, setPdfError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startReview = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    // Check built-in categories first
    const builtIn = vocabularyCategories.find((c) => c.id === categoryId);
    if (builtIn) {
      setReviewWords(builtIn.words.slice(0, 10));
      setCurrentIndex(0);
      setShowAnswer(false);
      setView('flashcard');
      return;
    }
    // Check custom categories
    const custom = customCategories.find((c) => c.id === categoryId);
    if (custom) {
      setReviewWords(custom.words.slice(0, 10));
      setCurrentIndex(0);
      setShowAnswer(false);
      setView('flashcard');
    }
  }, [customCategories]);

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

  const handlePdfSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 50MB file size limit
    if (file.size > 50 * 1024 * 1024) {
      setPdfError(t('vocab.fileTooLarge'));
      return;
    }

    if (!settings.anthropicApiKey) {
      setPdfError(t('vocab.noApiKey'));
      return;
    }

    setPdfImporting(true);
    setPdfError('');
    setPdfResult(null);

    try {
      // Step 1: Extract text from PDF
      setPdfStatus(t('vocab.extractingText'));
      let text: string;
      try {
        text = await extractTextFromPdf(file);
      } catch (extractErr) {
        const msg = extractErr instanceof Error ? extractErr.message : String(extractErr);
        console.error('PDF text extraction failed:', msg);
        setPdfError(`PDF metin çıkarma hatası: ${msg}`);
        setPdfImporting(false);
        return;
      }

      if (!text || text.trim().length < 10) {
        setPdfError('PDF dosyasından yeterli metin çıkarılamadı. Lütfen metin içeren bir PDF deneyin.');
        setPdfImporting(false);
        return;
      }

      console.log(`PDF text extracted: ${text.length} chars from file "${file.name}"`);

      // Step 2: Truncate text client-side to avoid body size limits
      const truncatedText = text.length > 50000 ? text.substring(0, 50000) : text;

      // Step 3: Send to Claude for analysis
      setPdfStatus(t('vocab.analyzingWords'));
      const response = await fetch('/api/analyze-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: truncatedText,
          level: settings.currentLevel,
          apiKey: settings.anthropicApiKey,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const detail = errData.error || `HTTP ${response.status}`;
        throw new Error(detail);
      }

      const data = await response.json();
      const analysis = data.analysis;

      if (!analysis?.words || analysis.words.length === 0) {
        setPdfError(t('vocab.noWordsFound'));
        setPdfImporting(false);
        return;
      }

      // Transform words to VocabularyWord format
      const categoryId = `pdf-${Date.now()}`;
      const words: VocabularyWord[] = analysis.words.map((w: Record<string, unknown>, i: number) => ({
        id: `${categoryId}-${i}`,
        german: (w.german as string) || '',
        turkish: (w.turkish as string) || '',
        english: (w.english as string) || '',
        article: (['der', 'die', 'das', 'die (pl)'].includes(w.article as string) ? w.article : null) as VocabularyWord['article'],
        plural: (w.plural as string) || undefined,
        partOfSpeech: (w.partOfSpeech as VocabularyWord['partOfSpeech']) || 'noun',
        emoji: (w.emoji as string) || undefined,
        exampleSentence: (w.exampleSentence as string) || '',
        exampleTranslation: (w.exampleTranslation as string) || '',
        exampleTranslationEn: (w.exampleTranslationEn as string) || '',
        category: categoryId,
        level: (['A1', 'A2', 'B1', 'B2'].includes(w.level as string) ? w.level : settings.currentLevel) as CEFRLevel,
        tags: (w.tags as string[]) || [],
      }));

      setPdfResult({
        categoryName: analysis.categoryName || 'PDF Import',
        categoryNameTr: analysis.categoryNameTr || 'PDF İçe Aktarma',
        categoryNameEn: analysis.categoryNameEn || 'PDF Import',
        words,
      });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error('PDF import error:', errMsg);
      setPdfError(`${t('vocab.importError')}: ${errMsg}`);
    } finally {
      setPdfImporting(false);
      setPdfStatus('');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [settings.anthropicApiKey, settings.currentLevel, t]);

  const handleAddToVocabulary = useCallback(() => {
    if (!pdfResult) return;

    const categoryId = `pdf-${Date.now()}`;
    const category: CustomVocabularyCategory = {
      id: categoryId,
      name: pdfResult.categoryName,
      turkishName: pdfResult.categoryNameTr,
      englishName: pdfResult.categoryNameEn,
      icon: '📄',
      words: pdfResult.words.map((w) => ({ ...w, category: categoryId })),
      level: settings.currentLevel as CEFRLevel,
      importedAt: new Date().toISOString(),
      source: 'pdf',
    };

    addCustomCategory(category);
    setPdfResult(null);
    setPdfDialogOpen(false);
  }, [pdfResult, settings.currentLevel, addCustomCategory]);

  const handleDeleteCustomCategory = useCallback((e: React.MouseEvent, categoryId: string) => {
    e.stopPropagation();
    removeCustomCategory(categoryId);
  }, [removeCustomCategory]);

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('vocab.title')}</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => { setPdfDialogOpen(true); setPdfResult(null); setPdfError(''); }}
        >
          <FileUp className="mr-1.5 h-4 w-4" />
          {t('vocab.importPdf')}
        </Button>
      </div>

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

      {/* Built-in categories */}
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

      {/* Custom (imported) categories */}
      {customCategories.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-6">{t('vocab.customCategories')}</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {customCategories.map((cat) => {
              const learnedCount = cat.words.filter((w) => wordProgress[w.id] && wordProgress[w.id].status !== 'new').length;
              return (
                <Card key={cat.id} className="cursor-pointer transition-colors hover:bg-accent" onClick={() => startReview(cat.id)}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <span className="text-3xl">{cat.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{cat.name}</p>
                        <Badge variant="secondary" className="text-[10px]">{t('vocab.imported')}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{lang === 'en' ? (cat.englishName || cat.turkishName) : cat.turkishName}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Progress value={cat.words.length > 0 ? (learnedCount / cat.words.length) * 100 : 0} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground">{learnedCount}/{cat.words.length}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        onClick={(e) => handleDeleteCustomCategory(e, cat.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* PDF Import Dialog */}
      <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('vocab.pdfImport')}
            </DialogTitle>
            <DialogDescription>{t('vocab.importPdfDesc')}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* File input */}
            {!pdfResult && (
              <div className="flex flex-col items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfSelect}
                  className="hidden"
                  id="pdf-upload"
                />
                <label
                  htmlFor="pdf-upload"
                  className={`flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-8 transition-colors ${
                    pdfImporting ? 'border-muted cursor-not-allowed' : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50'
                  }`}
                >
                  {pdfImporting ? (
                    <>
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-sm font-medium">{pdfStatus}</p>
                    </>
                  ) : (
                    <>
                      <FileUp className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm font-medium">{t('vocab.selectPdf')}</p>
                      <p className="text-xs text-muted-foreground">PDF (maks. 50MB)</p>
                    </>
                  )}
                </label>
              </div>
            )}

            {/* Error */}
            {pdfError && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {pdfError}
              </div>
            )}

            {/* Results preview */}
            {pdfResult && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <p className="text-sm font-medium">
                    {pdfResult.words.length} {t('vocab.wordsFound')}
                  </p>
                </div>

                <div className="rounded-md border p-3">
                  <p className="text-sm font-medium mb-1">{pdfResult.categoryName}</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    {lang === 'en' ? (pdfResult.categoryNameEn || pdfResult.categoryNameTr) : pdfResult.categoryNameTr}
                  </p>
                  <div className="max-h-48 space-y-1.5 overflow-y-auto">
                    {pdfResult.words.map((word, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="font-medium">
                          {word.emoji && `${word.emoji} `}
                          {word.article ? `${word.article} ` : ''}{word.german}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {getTranslation(word)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPdfDialogOpen(false)}>
              {t('vocab.cancel')}
            </Button>
            {pdfResult && (
              <Button onClick={handleAddToVocabulary}>
                {t('vocab.addToVocabulary')}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
