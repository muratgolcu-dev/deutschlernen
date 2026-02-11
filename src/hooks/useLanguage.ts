import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { t as translate, TranslationKey, getTranslation, getExampleTranslation } from '@/lib/i18n';
import { NativeLanguage } from '@/lib/types/settings';

export function useLanguage() {
  const { settings, updateSettings } = useDeutschStore();
  const lang: NativeLanguage = settings.nativeLanguage || 'tr';

  const t = (key: TranslationKey) => translate(key, lang);

  const setLanguage = (language: NativeLanguage) => {
    updateSettings({ nativeLanguage: language });
  };

  return {
    lang,
    t,
    setLanguage,
    isLanguageSelected: settings.nativeLanguage !== null,
    getTranslation: (word: { turkish: string; english?: string }) => getTranslation(word, lang),
    getExampleTranslation: (word: { exampleTranslation: string; exampleTranslationEn?: string }) => getExampleTranslation(word, lang),
  };
}
