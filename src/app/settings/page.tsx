'use client';

import { useState } from 'react';
import { useDeutschStore } from '@/lib/store/useDeutschStore';
import { useSpeech } from '@/hooks/useSpeech';
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
import { Download, Upload, Trash2 } from 'lucide-react';

const BADGES_INFO: Record<string, { name: string; icon: string }> = {
  'erste-schritte': { name: 'İlk Adımlar', icon: '🎯' },
  'wortschatz-50': { name: '50 Kelime', icon: '📚' },
  'wortschatz-100': { name: '100 Kelime', icon: '📖' },
  'wortschatz-250': { name: '250 Kelime', icon: '🏅' },
  'grammatik-held': { name: 'Gramer Kahramanı', icon: '🎓' },
  'flamme-7': { name: '7 Günlük Seri', icon: '🔥' },
  'flamme-30': { name: '30 Günlük Seri', icon: '💎' },
  'gespraech-10': { name: '10 Konuşma', icon: '💬' },
  'buecherwurm-10': { name: '10 Not Defteri', icon: '📝' },
  'perfektionist': { name: 'Mükemmeliyetçi', icon: '⭐' },
  'nachtlerner': { name: 'Gece Kuşu', icon: '🦉' },
  'schnelllernen': { name: 'Hızlı Öğrenci', icon: '⚡' },
};

export default function SettingsPage() {
  const { settings, updateSettings, badges, xp, rank, resetAllData, exportData, importData } = useDeutschStore();
  const { voices } = useSpeech();
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
      alert('Veriler başarıyla yüklendi!');
    } else {
      alert('Geçersiz veri formatı.');
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold">Ayarlar</h1>

      {/* Profile */}
      <Card>
        <CardHeader><CardTitle className="text-base">Profil</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Rütbe</span>
            <Badge>{rank}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Toplam XP</span>
            <span className="font-medium">{xp}</span>
          </div>
        </CardContent>
      </Card>

      {/* Learning Preferences */}
      <Card>
        <CardHeader><CardTitle className="text-base">Öğrenme Tercihleri</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Seviye</Label>
            <Select value={settings.currentLevel} onValueChange={(v) => updateSettings({ currentLevel: v as CEFRLevel })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="A1">A1 - Başlangıç</SelectItem>
                <SelectItem value="A2">A2 - Temel</SelectItem>
                <SelectItem value="B1">B1 - Orta</SelectItem>
                <SelectItem value="B2">B2 - İleri Orta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Günlük Kelime Hedefi: {settings.dailyWordGoal}</Label>
            <Slider value={[settings.dailyWordGoal]} onValueChange={([v]) => updateSettings({ dailyWordGoal: v })} min={5} max={50} step={5} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Çeviri İpuçları</Label>
            <Switch checked={settings.showTranslationHints} onCheckedChange={(v) => updateSettings({ showTranslationHints: v })} />
          </div>
        </CardContent>
      </Card>

      {/* Speech */}
      <Card>
        <CardHeader><CardTitle className="text-base">Konuşma</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Konuşma Hızı: {settings.speechRate}x</Label>
            <Slider value={[settings.speechRate]} onValueChange={([v]) => updateSettings({ speechRate: v })} min={0.5} max={1.5} step={0.1} />
          </div>
          {voices.length > 0 && (
            <div className="space-y-2">
              <Label>Ses</Label>
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
        <CardHeader><CardTitle className="text-base">Rozetler</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {Object.entries(badges).map(([id, state]) => {
              const info = BADGES_INFO[id];
              if (!info) return null;
              return (
                <div key={id} className={`flex flex-col items-center gap-1 rounded-lg p-2 text-center ${state.earned ? '' : 'opacity-30'}`}>
                  <span className="text-2xl">{info.icon}</span>
                  <span className="text-xs">{info.name}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader><CardTitle className="text-base">Veri Yönetimi</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" /> Verileri Dışa Aktar
          </Button>

          <div className="space-y-2">
            <Input
              placeholder="JSON verisini yapıştırın..."
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
            />
            <Button variant="outline" className="w-full gap-2" onClick={handleImport} disabled={!importText}>
              <Upload className="h-4 w-4" /> Verileri İçe Aktar
            </Button>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full gap-2">
                <Trash2 className="h-4 w-4" /> Tüm Verileri Sil
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                <AlertDialogDescription>Bu işlem tüm ilerlemenizi, kelimelerinizi ve ayarlarınızı silecektir. Bu işlem geri alınamaz.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction onClick={resetAllData}>Sil</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
