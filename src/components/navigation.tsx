'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, MessageCircle, GraduationCap, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: BarChart3 },
  { href: '/vocabulary', label: 'Kelimeler', icon: BookOpen },
  { href: '/grammar', label: 'Gramer', icon: GraduationCap },
  { href: '/chat', label: 'Sohbet', icon: MessageCircle },
  { href: '/settings', label: 'Ayarlar', icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r bg-card md:flex md:flex-col">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <span className="text-2xl">🇩🇪</span>
          <span className="text-lg font-bold">Deutsch Lernen</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-card md:hidden">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1 text-xs transition-colors',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
