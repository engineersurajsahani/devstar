// lib/diffchecker.compare.ts

import diff from 'diff';

export function compare(original: string, changed: string): string {
  const originalLines = original.split('\n').join('');
  const changedLines = changed.split('\n').join('');

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

  return output;
}