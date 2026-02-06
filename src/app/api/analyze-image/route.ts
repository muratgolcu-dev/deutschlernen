import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageData, level, apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'API anahtarı gerekli' }, { status: 400 });
    }

    if (!imageData) {
      return NextResponse.json({ error: 'Resim verisi gerekli' }, { status: 400 });
    }

    const systemPrompt = `Sen bir Almanca ders notu analiz asistanısın. Öğrenci ${level || 'A1'} seviyesinde Türk bir öğrenci.

Bu resimde bir Almanca ders notu veya çalışma kitabı sayfası var. Lütfen şunları yap:

1. Resimdeki tüm Almanca metni çıkar.
2. Önemli kelimeleri bul ve Türkçe karşılıklarını ver.
3. Hangi gramer konuları işleniyor?
4. Sayfanın kısa bir özeti (Türkçe).
5. Bu içerikten 2-3 alıştırma öner.

Yanıtını şu JSON formatında ver (başka bir şey yazma, sadece JSON):
{
  "extractedText": "resimdeki metin",
  "vocabulary": [{"german": "kelime", "turkish": "çeviri", "article": "der/die/das veya null", "context": "bağlam"}],
  "grammarTopics": ["konu1", "konu2"],
  "summary": "Türkçe özet",
  "exercises": [
    {
      "id": "ex1",
      "type": "multiple-choice",
      "question": "soru",
      "instruction": "talimat",
      "data": {"options": ["a", "b", "c", "d"], "correctIndex": 0, "explanation": "açıklama"}
    }
  ]
}`;

    // Extract base64 data and media type
    let mediaType = 'image/jpeg';
    let base64Data = imageData;

    if (imageData.startsWith('data:')) {
      const match = imageData.match(/^data:(image\/\w+);base64,(.+)$/);
      if (match) {
        mediaType = match[1];
        base64Data = match[2];
      }
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2048,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mediaType,
                  data: base64Data,
                },
              },
              {
                type: 'text',
                text: 'Bu ders notunu/çalışma sayfasını analiz et ve JSON formatında yanıt ver.',
              },
            ],
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
      // Try to parse the JSON response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
      return NextResponse.json({ analysis });
    } catch {
      // If JSON parsing fails, return raw text
      return NextResponse.json({
        analysis: {
          extractedText: content,
          vocabulary: [],
          grammarTopics: [],
          summary: 'Analiz yapıldı ancak yapılandırılmış format oluşturulamadı.',
          exercises: [],
        },
      });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
