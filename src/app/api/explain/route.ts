import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question, context, level, apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'API anahtarı gerekli' }, { status: 400 });
    }

    const systemPrompt = `Sen bir Almanca gramer öğretmenisin. Öğrenci ${level || 'A1'} seviyesinde Türk bir öğrenci.

KURALLAR:
1. Açıklamaları Türkçe yap.
2. Almanca örnekler ver ve Türkçe çevirilerini ekle.
3. Kısa ve net açıklamalar yap (en fazla 3-4 paragraf).
4. Öğrencinin seviyesine uygun dil kullan.
5. Benzer Türkçe gramer yapılarıyla karşılaştır (varsa).`;

    const userMessage = context
      ? `Soru: ${question}\n\nBağlam: ${context}`
      : question;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 512,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API hatası: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const explanation = data.content?.[0]?.text || 'Açıklama alınamadı.';

    return NextResponse.json({ explanation });
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
