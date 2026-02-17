import { NextRequest, NextResponse } from 'next/server';

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
- Maksimum 30 kelime çıkar, en önemlilerini seç
- Mümkünse emoji ekle

Yanıtını şu JSON formatında ver (başka bir şey yazma, sadece JSON):
{
  "categoryName": "Kategori Adı (Almanca)",
  "categoryNameTr": "Kategori Adı (Türkçe)",
  "categoryNameEn": "Category Name (English)",
  "words": [
    {
      "german": "kelime",
      "turkish": "Türkçe çeviri",
      "english": "English translation",
      "article": "der/die/das/die (pl) veya null",
      "plural": "çoğul hali veya null",
      "partOfSpeech": "noun/verb/adjective/adverb/preposition/conjunction/pronoun/phrase",
      "emoji": "uygun emoji",
      "exampleSentence": "Almanca örnek cümle",
      "exampleTranslation": "Türkçe çeviri",
      "exampleTranslationEn": "English translation",
      "level": "A1/A2/B1/B2",
      "tags": ["etiket1", "etiket2"]
    }
  ]
}`;

    // Truncate text if too long (Claude has token limits)
    const truncatedText = text.length > 15000 ? text.substring(0, 15000) + '\n\n[Metin kısaltıldı...]' : text;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Bu PDF metninden Almanca kelimeleri çıkar ve JSON formatında yanıt ver:\n\n${truncatedText}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `API hatası: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || '{}';

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
      return NextResponse.json({ analysis });
    } catch {
      return NextResponse.json({
        analysis: {
          categoryName: 'PDF Import',
          categoryNameTr: 'PDF İçe Aktarma',
          categoryNameEn: 'PDF Import',
          words: [],
        },
      });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
