import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

function tryFixAndParseJSON(raw: string): Record<string, unknown> | null {
  // 1. Try direct parse
  try {
    return JSON.parse(raw);
  } catch { /* continue */ }

  // 2. Extract JSON from markdown code block
  const codeBlockMatch = raw.match(/```(?:json)?\s*\n?([\s\S]*?)```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1].trim());
    } catch { /* continue */ }
  }

  // 3. Extract outermost { ... }
  const braceMatch = raw.match(/\{[\s\S]*\}/);
  if (braceMatch) {
    try {
      return JSON.parse(braceMatch[0]);
    } catch { /* continue */ }

    // 4. Try to fix truncated JSON (close open arrays/objects)
    let fixed = braceMatch[0];
    // Remove trailing comma before attempting to close
    fixed = fixed.replace(/,\s*$/, '');
    // Count open/close braces and brackets
    const openBraces = (fixed.match(/\{/g) || []).length;
    const closeBraces = (fixed.match(/\}/g) || []).length;
    const openBrackets = (fixed.match(/\[/g) || []).length;
    const closeBrackets = (fixed.match(/\]/g) || []).length;
    // Try to close them
    fixed += ']'.repeat(Math.max(0, openBrackets - closeBrackets));
    fixed += '}'.repeat(Math.max(0, openBraces - closeBraces));
    try {
      return JSON.parse(fixed);
    } catch { /* give up */ }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { text, level, apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'API anahtarı gerekli' }, { status: 400 });
    }

    if (!text || text.trim().length < 10) {
      return NextResponse.json({ error: 'PDF metni çok kısa veya boş' }, { status: 400 });
    }

    const systemPrompt = `Sen bir Almanca kelime çıkarma asistanısın. Öğrenci ${level || 'A1'} seviyesinde Türk bir öğrenci.

Sana bir PDF'den çıkarılmış metin verilecek. Bu metinden Almanca kelimeleri çıkar ve yapılandırılmış bir kelime listesi oluştur.

Kurallar:
- Sadece anlamlı Almanca kelimeleri çıkar (artikeller, bağlaçlar tek başına değil)
- Her kelime için Türkçe ve İngilizce çeviri ver
- Artikelleri doğru belirle (der/die/das/die (pl) veya null)
- Kelime türünü belirle (noun, verb, adjective, adverb, preposition, conjunction, pronoun, phrase)
- Her kelime için bir örnek cümle ve çevirisi yaz
- Kelime seviyesini belirle (A1, A2, B1, B2)
- Bir kategori adı öner (Almanca ve Türkçe)
- Maksimum 20 kelime çıkar, en önemlilerini seç
- Mümkünse emoji ekle

ÖNEMLI: Yanıtında SADECE JSON yaz. Açıklama, markdown veya başka metin ekleme. Sadece aşağıdaki formatta tek bir JSON objesi döndür:
{"categoryName":"Almanca Ad","categoryNameTr":"Türkçe Ad","categoryNameEn":"English Name","words":[{"german":"kelime","turkish":"çeviri","english":"translation","article":"der/die/das/null","plural":"çoğul/null","partOfSpeech":"noun","emoji":"📚","exampleSentence":"Örnek cümle","exampleTranslation":"Türkçe çeviri","exampleTranslationEn":"English translation","level":"A1","tags":["etiket"]}]}`;

    // Truncate text if too long (Claude has token limits)
    const truncatedText = text.length > 50000 ? text.substring(0, 50000) + '\n\n[Metin kısaltıldı...]' : text;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 8192,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Bu PDF metninden Almanca kelimeleri çıkar. SADECE JSON döndür, başka bir şey yazma:\n\n${truncatedText}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);

      if (response.status === 401) {
        return NextResponse.json(
          { error: 'API anahtarı geçersiz. Lütfen Ayarlar sayfasından API anahtarınızı kontrol edin.' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: `Anthropic API hatası (${response.status}): ${errorText.substring(0, 200)}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || '';
    const stopReason = data.stop_reason;

    if (!content) {
      return NextResponse.json(
        { error: 'API boş yanıt döndürdü' },
        { status: 502 }
      );
    }

    // Log for debugging
    console.log(`Claude response: stop_reason=${stopReason}, length=${content.length}`);

    const analysis = tryFixAndParseJSON(content);
    if (!analysis) {
      console.error('JSON parse failed. Response preview:', content.substring(0, 300));
      return NextResponse.json(
        { error: `API yanıtı JSON olarak ayrıştırılamadı (stop: ${stopReason})` },
        { status: 502 }
      );
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
