'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';
import { useDeutschStore } from '@/lib/store/useDeutschStore';

export function Providers({ children }: { children: ReactNode }) {
  const { generateDailyChallenge } = useDeutschStore();

  useEffect(() => {
    generateDailyChallenge();
  }, [generateDailyChallenge]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
