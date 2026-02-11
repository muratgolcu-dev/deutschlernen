'use client';

import { NativeLanguage } from '@/lib/types/settings';
import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { Card, CardContent } from '@/components/ui/card';

export function LanguagePicker() {
  const { updateSettings } = useDeutschStore();

  const selectLanguage = (lang: NativeLanguage) => {
    updateSettings({ nativeLanguage: lang });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <span className="text-6xl">🇩🇪</span>
          <h1 className="mt-4 text-3xl font-bold">Deutsch Lernen</h1>
          <p className="mt-2 text-muted-foreground">
            Choose your language / Dilinizi seçin
          </p>
        </div>

        <div className="space-y-4">
          <Card
            className="cursor-pointer border-2 transition-all hover:border-primary hover:shadow-lg"
            onClick={() => selectLanguage('tr')}
          >
            <CardContent className="flex items-center gap-4 p-6">
              <span className="text-4xl">🇹🇷</span>
              <div className="text-left">
                <p className="text-lg font-semibold">Türkçe</p>
                <p className="text-sm text-muted-foreground">
                  Açıklamalar ve çeviriler Türkçe olacak
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer border-2 transition-all hover:border-primary hover:shadow-lg"
            onClick={() => selectLanguage('en')}
          >
            <CardContent className="flex items-center gap-4 p-6">
              <span className="text-4xl">🇬🇧</span>
              <div className="text-left">
                <p className="text-lg font-semibold">English</p>
                <p className="text-sm text-muted-foreground">
                  Explanations and translations will be in English
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-xs text-muted-foreground">
          Bu seçimi daha sonra ayarlardan değiştirebilirsiniz.<br />
          You can change this later in settings.
        </p>
      </div>
    </div>
  );
}
