// lib/diffchecker.text.ts
import diff from 'diff';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

export async function compareText(originalText: string, changedText: string): Promise<string> {
  const originalLines = originalText.split('\n').join('');
  const changedLines = changedText.split('\n').join('');

  // Compare the lines
  const diffResults = diff.diffLines(originalLines, changedLines);

  // Format the diff results
  let output = '';
  for (const part of diffResults) {
    // Apply syntax highlighting
    if (part.added) {
      output += `<span class="text-green-500">${part.value}</span>\n`;
    } else if (part.removed) {
      output += `<span class="text-red-500">${part.value}</span>\n`;
    } else {
      output += `<span class="text-gray-700">${part.value}</span>\n`;
    }
  }

  // Convert to HTML for rendering
  const html = await unified()
    .use(remarkParse)
    .use(remarkStringify, {
      listItemIndent: 'one',
    })
    .process(output);

  return html.toString();
}