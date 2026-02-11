'use client';

import { useState } from 'react';
import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { useSpeech } from '@/hooks/useSpeech';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CEFRLevel } from '@/lib/types';
import { NativeLanguage } from '@/lib/types/settings';
import { Download, Upload, Trash2 } from 'lucide-react';

const BADGES_INFO: Record<string, { icon: string }> = {
  'erste-schritte': { icon: '🎯' },
  'wortschatz-50': { icon: '📚' },
  'wortschatz-100': { icon: '📖' },
  'wortschatz-250': { icon: '🏅' },
  'grammatik-held': { icon: '🎓' },
  'flamme-7': { icon: '🔥' },
  'flamme-30': { icon: '💎' },
  'gespraech-10': { icon: '💬' },
  'buecherwurm-10': { icon: '📝' },
  'perfektionist': { icon: '⭐' },
  'nachtlerner': { icon: '🦉' },
  'schnelllernen': { icon: '⚡' },
};

export default function SettingsPage() {
  const { settings, updateSettings, badges, xp, rank, resetAllData, exportData, importData } = useDeutschStore();
  const { voices } = useSpeech();
  const { t, lang, setLanguage } = useLanguage();
  const [importText, setImportText] = useState('');

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deutschlernen-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (importText && importData(importText)) {
      setImportText('');
      alert(t('settings.importSuccess'));
    } else {
      alert(t('settings.importError'));
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold">{t('settings.title')}</h1>

      {/* Profile */}
      <Card>
        <CardHeader><CardTitle className="text-base">{t('settings.profile')}</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">{t('settings.rank')}</span>
            <Badge>{rank}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">{t('settings.totalXP')}</span>
            <span className="font-medium">{xp}</span>
          </div>
        </CardContent>
      </Card>

      {/* Learning Preferences */}
      <Card>
        <CardHeader><CardTitle className="text-base">{t('settings.preferences')}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t('settings.helperLanguage')}</Label>
            <Select value={lang} onValueChange={(v) => setLanguage(v as NativeLanguage)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="tr">Turkce</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t('settings.level')}</Label>
            <Select value={settings.currentLevel} onValueChange={(v) => updateSettings({ currentLevel: v as CEFRLevel })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="A1">{t('settings.a1')}</SelectItem>
                <SelectItem value="A2">{t('settings.a2')}</SelectItem>
                <SelectItem value="B1">{t('settings.b1')}</SelectItem>
                <SelectItem value="B2">{t('settings.b2')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t('settings.dailyGoal')}: {settings.dailyWordGoal}</Label>
            <Slider value={[settings.dailyWordGoal]} onValueChange={([v]) => updateSettings({ dailyWordGoal: v })} min={5} max={50} step={5} />
          </div>

          <div className="flex items-center justify-between">
            <Label>{t('settings.translationHints')}</Label>
            <Switch checked={settings.showTranslationHints} onCheckedChange={(v) => updateSettings({ showTranslationHints: v })} />
          </div>
        </CardContent>
      </Card>

      {/* Speech */}
      <Card>
        <CardHeader><CardTitle className="text-base">{t('settings.speech')}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t('settings.speechRate')}: {settings.speechRate}x</Label>
            <Slider value={[settings.speechRate]} onValueChange={([v]) => updateSettings({ speechRate: v })} min={0.5} max={1.5} step={0.1} />
          </div>
          {voices.length > 0 && (
            <div className="space-y-2">
              <Label>{t('settings.voice')}</Label>
              <Select value={settings.speechVoice || voices[0]?.name} onValueChange={(v) => updateSettings({ speechVoice: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {voices.map((v) => <SelectItem key={v.name} value={v.name}>{v.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader><CardTitle className="text-base">{t('settings.badges')}</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {Object.entries(badges).map(([id, state]) => {
              const info = BADGES_INFO[id];
              if (!info) return null;
              const badgeKey = `badge.${id}` as Parameters<typeof t>[0];
              return (
                <div key={id} className={`flex flex-col items-center gap-1 rounded-lg p-2 text-center ${state.earned ? '' : 'opacity-30'}`}>
                  <span className="text-2xl">{info.icon}</span>
                  <span className="text-xs">{t(badgeKey)}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader><CardTitle className="text-base">{t('settings.dataManagement')}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" /> {t('settings.export')}
          </Button>

          <div className="space-y-2">
            <Input
              placeholder={t('settings.importPlaceholder')}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
            />
            <Button variant="outline" className="w-full gap-2" onClick={handleImport} disabled={!importText}>
              <Upload className="h-4 w-4" /> {t('settings.import')}
            </Button>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full gap-2">
                <Trash2 className="h-4 w-4" /> {t('settings.deleteAll')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('settings.deleteConfirm')}</AlertDialogTitle>
                <AlertDialogDescription>{t('settings.deleteDesc')}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('settings.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={resetAllData}>{t('settings.delete')}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
