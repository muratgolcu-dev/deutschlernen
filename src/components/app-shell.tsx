'use client';

import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { LanguagePicker } from '@/components/language-picker';
import { Navigation } from '@/components/navigation';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { settings } = useDeutschStore();

  if (!settings.nativeLanguage) {
    return <LanguagePicker />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pb-16 md:pb-0 md:pl-64">{children}</main>
      <Navigation />
    </div>
  );
}
