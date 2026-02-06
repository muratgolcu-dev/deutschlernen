'use client';

import { useDashboardData } from '@/hooks/useDashboardData';
import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Star, BookOpen, GraduationCap, MessageCircle, Trophy, Target } from 'lucide-react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function Dashboard() {
  const { wordStats, streak, weeklyActivity, todayActivity, lessonsCompleted, totalLessons, xp, rank, level, dailyWordGoal } = useDashboardData();
  const { dailyChallenge, showLevelUp, dismissLevelUp } = useDeutschStore();

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-8">
      {showLevelUp && (
        <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="font-bold">Tebrikler! Yeni seviye: {rank}</p>
                <p className="text-sm text-muted-foreground">Harika ilerliyorsun!</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={dismissLevelUp}>Kapat</Button>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Merhaba!</h1>
          <p className="text-muted-foreground">Seviye: {level} &middot; {rank}</p>
        </div>
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="text-lg font-bold">{streak.currentStreak}</span>
          <Star className="ml-2 h-5 w-5 text-yellow-500" />
          <span className="text-lg font-bold">{xp} XP</span>
        </div>
      </div>

      {/* Daily Challenge */}
      {dailyChallenge.id && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="font-medium">Günlük Görev</span>
              {dailyChallenge.completed && <Badge variant="secondary">Tamamlandı!</Badge>}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{dailyChallenge.turkishDescription}</p>
            <Progress value={(dailyChallenge.progress / dailyChallenge.target) * 100} className="h-2" />
            <p className="mt-1 text-xs text-muted-foreground">{dailyChallenge.progress}/{dailyChallenge.target}</p>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{wordStats.mastered}</p>
            <p className="text-xs text-muted-foreground">Ustalaşılan</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{wordStats.learning}</p>
            <p className="text-xs text-muted-foreground">Öğrenilen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{wordStats.dueToday}</p>
            <p className="text-xs text-muted-foreground">Bugün Tekrar</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{lessonsCompleted}/{totalLessons}</p>
            <p className="text-xs text-muted-foreground">Dersler</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Bugünkü İlerleme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Kelimeler</span>
              <span>{todayActivity?.wordsLearned ?? 0}/{dailyWordGoal}</span>
            </div>
            <Progress value={((todayActivity?.wordsLearned ?? 0) / dailyWordGoal) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Weekly Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Haftalık Aktivite</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity}>
                <XAxis dataKey="date" tickFormatter={(v) => new Date(v).toLocaleDateString('tr', { weekday: 'short' })} fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip labelFormatter={(v) => new Date(v).toLocaleDateString('tr')} />
                <Bar dataKey="wordsReviewed" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Tekrar" />
                <Bar dataKey="xpEarned" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="XP" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Link href="/vocabulary">
          <Card className="cursor-pointer transition-colors hover:bg-accent">
            <CardContent className="flex items-center gap-3 p-4">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-medium">Kelime Çalış</p>
                <p className="text-xs text-muted-foreground">{wordStats.dueToday} kelime bekliyor</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/grammar">
          <Card className="cursor-pointer transition-colors hover:bg-accent">
            <CardContent className="flex items-center gap-3 p-4">
              <GraduationCap className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-medium">Gramer Dersi</p>
                <p className="text-xs text-muted-foreground">{totalLessons - lessonsCompleted} ders kaldı</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/chat">
          <Card className="cursor-pointer transition-colors hover:bg-accent">
            <CardContent className="flex items-center gap-3 p-4">
              <MessageCircle className="h-8 w-8 text-purple-500" />
              <div>
                <p className="font-medium">Konuşma Pratiği</p>
                <p className="text-xs text-muted-foreground">AI ile Almanca konuş</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
