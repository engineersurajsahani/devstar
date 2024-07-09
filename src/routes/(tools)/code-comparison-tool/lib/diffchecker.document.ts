// lib/diffchecker.document.ts
import { compare } from './diffchecker.compare';

export async function compareDocument(originalFile: File, changedFile: File): Promise<string> {
  // Convert file contents to text
  const originalText = await fileToText(originalFile);
  const changedText = await fileToText(changedFile);

  // Compare the text
  return compare(originalText, changedText);
}

// Helper function to read file contents
async function fileToText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsText(file);
  });
}