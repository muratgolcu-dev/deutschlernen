import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 300;

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

// Split text into chunks at paragraph boundaries
function splitTextIntoChunks(text: string, maxChunkSize: number): string[] {
  if (text.length <= maxChunkSize) return [text];

  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= maxChunkSize) {
      chunks.push(remaining);
      break;
    }

    // Find a good split point (paragraph break) near the max size
    let splitAt = remaining.lastIndexOf('\n\n', maxChunkSize);
    if (splitAt < maxChunkSize * 0.5) {
      // If no good paragraph break, try single newline
      splitAt = remaining.lastIndexOf('\n', maxChunkSize);
    }
    if (splitAt < maxChunkSize * 0.5) {
      // If still no good break, just split at max size
      splitAt = maxChunkSize;
    }

    chunks.push(remaining.substring(0, splitAt));
    remaining = remaining.substring(splitAt).trim();
  }

  return chunks;
}

interface WordData {
  german: string;
  turkish: string;
  english: string;
  article: string | null;
  plural: string | null;
  partOfSpeech: string;
  emoji: string;
  exampleSentence: string;
  exampleTranslation: string;
  exampleTranslationEn: string;
  level: string;
  tags: string[];
}

async function analyzeChunk(
  chunk: string,
  level: string,
  apiKey: string,
  existingWords: string[],
  chunkIndex: number,
  totalChunks: number,
): Promise<{ words: WordData[]; categoryName: string; categoryNameTr: string; categoryNameEn: string }> {
  const excludeInstruction = existingWords.length > 0
    ? `\n- Daha önce çıkarılmış kelimeleri TEKRAR EKLEME. Zaten bulunan kelimeler: ${existingWords.join(', ')}`
    : '';

  const systemPrompt = `Sen bir Almanca kelime çıkarma asistanısın. Öğrenci ${level || 'A1'} seviyesinde Türk bir öğrenci.

Sana bir PDF'den çıkarılmış metin verilecek (parça ${chunkIndex + 1}/${totalChunks}). Bu metinden TÜM Almanca kelimeleri çıkar.

Kurallar:
- Metindeki TÜM anlamlı Almanca kelimeleri çıkar (artikeller, bağlaçlar tek başına değil)
- Tekrar eden kelimeleri sadece bir kez ekle${excludeInstruction}
- Her kelime için Türkçe ve İngilizce çeviri ver
- Artikelleri doğru belirle (der/die/das/die (pl) veya null)
- Kelime türünü belirle (noun, verb, adjective, adverb, preposition, conjunction, pronoun, phrase)
- Her kelime için bir örnek cümle ve çevirisi yaz
- Kelime seviyesini belirle (A1, A2, B1, B2)
- Bir kategori adı öner (Almanca ve Türkçe)
- Bulabildiğin TÜM kelimeleri çıkar, limit yok
- Mümkünse emoji ekle

ÖNEMLI: Yanıtında SADECE JSON yaz. Açıklama, markdown veya başka metin ekleme. Sadece aşağıdaki formatta tek bir JSON objesi döndür:
{"categoryName":"Almanca Ad","categoryNameTr":"Türkçe Ad","categoryNameEn":"English Name","words":[{"german":"kelime","turkish":"çeviri","english":"translation","article":"der/die/das/null","plural":"çoğul/null","partOfSpeech":"noun","emoji":"📚","exampleSentence":"Örnek cümle","exampleTranslation":"Türkçe çeviri","exampleTranslationEn":"English translation","level":"A1","tags":["etiket"]}]}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 16384,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Bu PDF metninden TÜM Almanca kelimeleri çıkar. SADECE JSON döndür:\n\n${chunk}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 401) {
      throw new Error('API anahtarı geçersiz. Lütfen Ayarlar sayfasından API anahtarınızı kontrol edin.');
    }
    throw new Error(`Anthropic API hatası (${response.status}): ${errorText.substring(0, 200)}`);
  }

  const data = await response.json();
  const content = data.content?.[0]?.text || '';

  if (!content) {
    throw new Error('API boş yanıt döndürdü');
  }

  const analysis = tryFixAndParseJSON(content);
  if (!analysis) {
    console.error('JSON parse failed for chunk', chunkIndex, '. Preview:', content.substring(0, 300));
    throw new Error(`Parça ${chunkIndex + 1} için JSON ayrıştırılamadı`);
  }

  return {
    words: (analysis.words as WordData[]) || [],
    categoryName: (analysis.categoryName as string) || 'PDF Import',
    categoryNameTr: (analysis.categoryNameTr as string) || 'PDF İçe Aktarma',
    categoryNameEn: (analysis.categoryNameEn as string) || 'PDF Import',
  };
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { text, level, apiKey } = requestBody;

    if (!apiKey) {
      return NextResponse.json({ error: 'API anahtarı gerekli' }, { status: 400 });
    }

    if (!text || text.trim().length < 10) {
      return NextResponse.json({ error: 'PDF metni çok kısa veya boş' }, { status: 400 });
    }

    // Split text into chunks (~30K chars each for optimal extraction)
    const CHUNK_SIZE = 30000;
    const chunks = splitTextIntoChunks(text, CHUNK_SIZE);
    const totalChunks = chunks.length;

    console.log(`PDF analysis: ${text.length} chars, split into ${totalChunks} chunks`);

    const allWords: WordData[] = [];
    const seenGerman = new Set<string>();
    let categoryName = 'PDF Import';
    let categoryNameTr = 'PDF İçe Aktarma';
    let categoryNameEn = 'PDF Import';

    // Process chunks sequentially to avoid rate limits and pass existing words
    for (let i = 0; i < totalChunks; i++) {
      try {
        const result = await analyzeChunk(
          chunks[i],
          level,
          apiKey,
          Array.from(seenGerman),
          i,
          totalChunks,
        );

        // Use category name from first chunk
        if (i === 0) {
          categoryName = result.categoryName;
          categoryNameTr = result.categoryNameTr;
          categoryNameEn = result.categoryNameEn;
        }

        // Deduplicate words
        for (const word of result.words) {
          const key = (word.german || '').toLowerCase().trim();
          if (key && !seenGerman.has(key)) {
            seenGerman.add(key);
            allWords.push(word);
          }
        }

        console.log(`Chunk ${i + 1}/${totalChunks}: found ${result.words.length} words (total unique: ${allWords.length})`);
      } catch (chunkErr) {
        console.error(`Chunk ${i + 1} failed:`, chunkErr);
        // Continue with other chunks if one fails
        if (i === 0 && totalChunks === 1) {
          // If single chunk fails, return error
          throw chunkErr;
        }
      }
    }

    if (allWords.length === 0) {
      return NextResponse.json(
        { error: 'PDF\'den kelime çıkarılamadı' },
        { status: 502 }
      );
    }

    console.log(`PDF analysis complete: ${allWords.length} unique words extracted`);

    return NextResponse.json({
      analysis: {
        categoryName,
        categoryNameTr,
        categoryNameEn,
        words: allWords,
        totalChunks,
      },
    });
  } catch (error) {
    console.error('Server error:', error);
    const message = error instanceof Error ? error.message : 'Sunucu hatası';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
