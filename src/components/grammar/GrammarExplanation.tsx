'use client';

import React from 'react';
import { AlertTriangle, BookOpen, Zap, ArrowRight } from 'lucide-react';

interface GrammarExplanationProps {
  text: string;
}

// Parse markdown-like text into visual, educational blocks
export function GrammarExplanation({ text }: GrammarExplanationProps) {
  const blocks = parseBlocks(text);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => (
        <RenderBlock key={i} block={block} />
      ))}
    </div>
  );
}

// --- Types ---

type Block =
  | { type: 'h1'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'list'; items: string[] }
  | { type: 'blockquote'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'empty' };

// --- Parser ---

function parseBlocks(text: string): Block[] {
  const lines = text.split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      i++;
      continue;
    }

    // H1
    if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
      blocks.push({ type: 'h1', text: trimmed.slice(2) });
      i++;
      continue;
    }

    // H3 (check before H2)
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', text: trimmed.slice(4) });
      i++;
      continue;
    }

    // H2
    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.slice(3) });
      i++;
      continue;
    }

    // Table
    if (trimmed.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      const parsed = parseTable(tableLines);
      if (parsed) blocks.push(parsed);
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
        i++;
      }
      blocks.push({ type: 'blockquote', text: quoteLines.join(' ') });
      continue;
    }

    // List
    if (trimmed.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ type: 'list', items });
      continue;
    }

    // Paragraph (collect consecutive non-special lines)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('- ')
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: 'paragraph', text: paraLines.join(' ') });
    }
  }

  return blocks;
}

function parseTable(lines: string[]): Block | null {
  if (lines.length < 2) return null;

  const parseLine = (line: string) =>
    line.split('|').map(c => c.trim()).filter(c => c.length > 0);

  const headers = parseLine(lines[0]);

  // Skip separator line (|---|---|)
  const startRow = lines[1].includes('---') ? 2 : 1;
  const rows = lines.slice(startRow).map(parseLine);

  return { type: 'table', headers, rows };
}

// --- Renderers ---

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'h1':
      return (
        <div className="flex items-center gap-3 pb-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            <InlineMarkdown text={block.text} />
          </h2>
        </div>
      );

    case 'h2':
      return (
        <div className="mt-3 flex items-center gap-2 border-l-4 border-blue-500 pl-3">
          <h3 className="text-base font-bold text-blue-700 dark:text-blue-400">
            <InlineMarkdown text={block.text} />
          </h3>
        </div>
      );

    case 'h3':
      return (
        <div className="mt-1 flex items-center gap-2 pl-1">
          <Zap className="h-4 w-4 text-amber-500 shrink-0" />
          <h4 className="text-sm font-bold text-foreground">
            <InlineMarkdown text={block.text} />
          </h4>
        </div>
      );

    case 'table':
      return <RenderTable headers={block.headers} rows={block.rows} />;

    case 'list':
      return <RenderList items={block.items} />;

    case 'blockquote':
      return (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            <InlineMarkdown text={block.text} />
          </p>
        </div>
      );

    case 'paragraph':
      return (
        <p className="text-sm leading-relaxed text-muted-foreground">
          <InlineMarkdown text={block.text} />
        </p>
      );

    default:
      return null;
  }
}

function RenderTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left font-bold text-foreground">
                <InlineMarkdown text={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`border-t border-border/60 ${
                ri % 2 === 0 ? 'bg-background' : 'bg-muted/30'
              }`}
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-2.5 text-muted-foreground">
                  <InlineMarkdown text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RenderList({ items }: { items: string[] }) {
  return (
    <div className="space-y-1.5 pl-1">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2.5">
          <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
          <span className="text-sm text-muted-foreground leading-relaxed">
            <InlineMarkdown text={item} />
          </span>
        </div>
      ))}
    </div>
  );
}

// --- Inline markdown (bold + arrow) ---

function InlineMarkdown({ text }: { text: string }) {
  // Parse **bold** patterns and → arrows
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Text before the bold
    if (match.index > lastIndex) {
      parts.push(renderPlainSegment(text.slice(lastIndex, match.index), parts.length));
    }
    // The bold part - render as highlighted badge
    parts.push(
      <span
        key={`b-${parts.length}`}
        className="inline-flex items-center rounded-md bg-blue-100 px-1.5 py-0.5 font-bold text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
      >
        {match[1]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(renderPlainSegment(text.slice(lastIndex), parts.length));
  }

  return <>{parts}</>;
}

function renderPlainSegment(text: string, keyBase: number): React.ReactNode {
  // Replace -> and → with styled arrow
  const arrowParts = text.split(/(→|->)/);
  if (arrowParts.length === 1) return <React.Fragment key={`p-${keyBase}`}>{text}</React.Fragment>;

  return (
    <React.Fragment key={`p-${keyBase}`}>
      {arrowParts.map((part, i) =>
        part === '→' || part === '->' ? (
          <span key={i} className="mx-1 inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold">
            →
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </React.Fragment>
  );
}
