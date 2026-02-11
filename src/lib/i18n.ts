import { NativeLanguage } from '@/lib/types/settings';

const translations = {
  // Navigation
  'nav.dashboard': { tr: 'Panel', en: 'Dashboard' },
  'nav.vocabulary': { tr: 'Kelimeler', en: 'Vocabulary' },
  'nav.grammar': { tr: 'Gramer', en: 'Grammar' },
  'nav.chat': { tr: 'Sohbet', en: 'Chat' },
  'nav.settings': { tr: 'Ayarlar', en: 'Settings' },

  // Language picker
  'lang.title': { tr: 'Dil Seçin', en: 'Choose Your Language' },
  'lang.subtitle': { tr: 'Almanca öğrenirken hangi dili kullanmak istiyorsunuz?', en: 'Which language would you like to use while learning German?' },
  'lang.turkish': { tr: 'Türkçe', en: 'Turkish' },
  'lang.english': { tr: 'İngilizce', en: 'English' },
  'lang.turkishDesc': { tr: 'Açıklamalar ve çeviriler Türkçe', en: 'Explanations and translations in Turkish' },
  'lang.englishDesc': { tr: 'Açıklamalar ve çeviriler İngilizce', en: 'Explanations and translations in English' },
  'lang.start': { tr: 'Başla', en: 'Start' },

  // Dashboard
  'dash.hello': { tr: 'Merhaba!', en: 'Hello!' },
  'dash.level': { tr: 'Seviye', en: 'Level' },
  'dash.congrats': { tr: 'Tebrikler! Yeni seviye', en: 'Congratulations! New level' },
  'dash.great': { tr: 'Harika ilerliyorsun!', en: 'Great progress!' },
  'dash.close': { tr: 'Kapat', en: 'Close' },
  'dash.dailyTask': { tr: 'Günlük Görev', en: 'Daily Challenge' },
  'dash.completed': { tr: 'Tamamlandı!', en: 'Completed!' },
  'dash.mastered': { tr: 'Ustalaşılan', en: 'Mastered' },
  'dash.learning': { tr: 'Öğrenilen', en: 'Learning' },
  'dash.reviewToday': { tr: 'Bugün Tekrar', en: 'Due Today' },
  'dash.lessons': { tr: 'Dersler', en: 'Lessons' },
  'dash.todayProgress': { tr: 'Bugünkü İlerleme', en: "Today's Progress" },
  'dash.words': { tr: 'Kelimeler', en: 'Words' },
  'dash.weeklyActivity': { tr: 'Haftalık Aktivite', en: 'Weekly Activity' },
  'dash.review': { tr: 'Tekrar', en: 'Review' },
  'dash.studyWords': { tr: 'Kelime Çalış', en: 'Study Words' },
  'dash.wordsWaiting': { tr: 'kelime bekliyor', en: 'words waiting' },
  'dash.grammarLesson': { tr: 'Gramer Dersi', en: 'Grammar Lesson' },
  'dash.lessonsLeft': { tr: 'ders kaldı', en: 'lessons left' },
  'dash.conversation': { tr: 'Konuşma Pratiği', en: 'Conversation Practice' },
  'dash.chatWithAI': { tr: 'AI ile Almanca konuş', en: 'Chat in German with AI' },

  // Vocabulary
  'vocab.title': { tr: 'Kelime Hazinesi', en: 'Vocabulary' },
  'vocab.total': { tr: 'Toplam', en: 'Total' },
  'vocab.back': { tr: 'Geri', en: 'Back' },
  'vocab.tapToReveal': { tr: 'Cevabı görmek için dokun', en: 'Tap to reveal answer' },
  'vocab.hard': { tr: 'Bilmiyorum', en: "Don't Know" },
  'vocab.medium': { tr: 'Orta', en: 'Maybe' },
  'vocab.easy': { tr: 'Biliyorum', en: 'I Know' },
  'vocab.plural': { tr: 'Çoğul', en: 'Plural' },
  'vocab.synonyms': { tr: 'Eş', en: 'Syn' },
  'vocab.antonyms': { tr: 'Zıt', en: 'Ant' },
  'vocab.collocations': { tr: 'Kullanım Kalıpları', en: 'Usage Patterns' },

  // Grammar
  'grammar.title': { tr: 'Gramer Dersleri', en: 'Grammar Lessons' },
  'grammar.lessons': { tr: 'Dersler', en: 'Lessons' },
  'grammar.explanation': { tr: 'Açıklama', en: 'Explanation' },
  'grammar.examples': { tr: 'Örnekler', en: 'Examples' },
  'grammar.tips': { tr: 'İpuçları', en: 'Tips' },
  'grammar.startExercises': { tr: 'Alıştırmalara Başla', en: 'Start Exercises' },
  'grammar.questions': { tr: 'soru', en: 'questions' },
  'grammar.check': { tr: 'Kontrol Et', en: 'Check' },
  'grammar.next': { tr: 'Sonraki', en: 'Next' },
  'grammar.finish': { tr: 'Bitir', en: 'Finish' },
  'grammar.correct': { tr: 'Doğru!', en: 'Correct!' },
  'grammar.wrong': { tr: 'Yanlış. Doğru cevap', en: 'Wrong. Correct answer' },
  'grammar.best': { tr: 'En iyi', en: 'Best' },
  'grammar.attempts': { tr: 'deneme', en: 'attempts' },
  'grammar.answerPlaceholder': { tr: 'Cevabını yaz...', en: 'Type your answer...' },

  // Settings
  'settings.title': { tr: 'Ayarlar', en: 'Settings' },
  'settings.profile': { tr: 'Profil', en: 'Profile' },
  'settings.rank': { tr: 'Rütbe', en: 'Rank' },
  'settings.totalXP': { tr: 'Toplam XP', en: 'Total XP' },
  'settings.preferences': { tr: 'Öğrenme Tercihleri', en: 'Learning Preferences' },
  'settings.level': { tr: 'Seviye', en: 'Level' },
  'settings.helperLanguage': { tr: 'Yardımcı Dil', en: 'Helper Language' },
  'settings.dailyGoal': { tr: 'Günlük Kelime Hedefi', en: 'Daily Word Goal' },
  'settings.translationHints': { tr: 'Çeviri İpuçları', en: 'Translation Hints' },
  'settings.speech': { tr: 'Konuşma', en: 'Speech' },
  'settings.speechRate': { tr: 'Konuşma Hızı', en: 'Speech Rate' },
  'settings.voice': { tr: 'Ses', en: 'Voice' },
  'settings.badges': { tr: 'Rozetler', en: 'Badges' },
  'settings.dataManagement': { tr: 'Veri Yönetimi', en: 'Data Management' },
  'settings.export': { tr: 'Verileri Dışa Aktar', en: 'Export Data' },
  'settings.import': { tr: 'Verileri İçe Aktar', en: 'Import Data' },
  'settings.importPlaceholder': { tr: 'JSON verisini yapıştırın...', en: 'Paste JSON data...' },
  'settings.deleteAll': { tr: 'Tüm Verileri Sil', en: 'Delete All Data' },
  'settings.deleteConfirm': { tr: 'Emin misiniz?', en: 'Are you sure?' },
  'settings.deleteDesc': { tr: 'Bu işlem tüm ilerlemenizi, kelimelerinizi ve ayarlarınızı silecektir. Bu işlem geri alınamaz.', en: 'This will delete all your progress, words, and settings. This action cannot be undone.' },
  'settings.cancel': { tr: 'İptal', en: 'Cancel' },
  'settings.delete': { tr: 'Sil', en: 'Delete' },
  'settings.importSuccess': { tr: 'Veriler başarıyla yüklendi!', en: 'Data imported successfully!' },
  'settings.importError': { tr: 'Geçersiz veri formatı.', en: 'Invalid data format.' },
  'settings.a1': { tr: 'A1 - Başlangıç', en: 'A1 - Beginner' },
  'settings.a2': { tr: 'A2 - Temel', en: 'A2 - Elementary' },
  'settings.b1': { tr: 'B1 - Orta', en: 'B1 - Intermediate' },
  'settings.b2': { tr: 'B2 - İleri Orta', en: 'B2 - Upper Intermediate' },

  // Badge names
  'badge.erste-schritte': { tr: 'İlk Adımlar', en: 'First Steps' },
  'badge.wortschatz-50': { tr: '50 Kelime', en: '50 Words' },
  'badge.wortschatz-100': { tr: '100 Kelime', en: '100 Words' },
  'badge.wortschatz-250': { tr: '250 Kelime', en: '250 Words' },
  'badge.grammatik-held': { tr: 'Gramer Kahramanı', en: 'Grammar Hero' },
  'badge.flamme-7': { tr: '7 Günlük Seri', en: '7-Day Streak' },
  'badge.flamme-30': { tr: '30 Günlük Seri', en: '30-Day Streak' },
  'badge.gespraech-10': { tr: '10 Konuşma', en: '10 Conversations' },
  'badge.buecherwurm-10': { tr: '10 Not Defteri', en: '10 Notebooks' },
  'badge.perfektionist': { tr: 'Mükemmeliyetçi', en: 'Perfectionist' },
  'badge.nachtlerner': { tr: 'Gece Kuşu', en: 'Night Owl' },
  'badge.schnelllernen': { tr: 'Hızlı Öğrenci', en: 'Fast Learner' },

  // Daily challenges
  'challenge.review-15': { tr: '15 kelime kartı çalış', en: 'Review 15 flashcards' },
  'challenge.learn-5': { tr: '5 yeni kelime öğren', en: 'Learn 5 new words' },
  'challenge.grammar-1': { tr: 'Bir gramer dersi tamamla', en: 'Complete a grammar lesson' },
  'challenge.master-5': { tr: '5 kelimeyi ustalaş', en: 'Master 5 words' },
  'challenge.practice-10': { tr: '10 dakika çalış', en: 'Practice for 10 minutes' },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: NativeLanguage): string {
  return translations[key]?.[lang] ?? key;
}

export function getTranslation(word: { turkish: string; english?: string }, lang: NativeLanguage): string {
  if (lang === 'en') return word.english || word.turkish;
  return word.turkish;
}

export function getExampleTranslation(word: { exampleTranslation: string; exampleTranslationEn?: string }, lang: NativeLanguage): string {
  if (lang === 'en') return word.exampleTranslationEn || word.exampleTranslation;
  return word.exampleTranslation;
}
