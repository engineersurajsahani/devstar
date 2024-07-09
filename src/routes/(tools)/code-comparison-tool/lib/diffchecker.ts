// lib/diffchecker.ts
import * as diff from 'diff';

export enum FileType {
  TEXT = 'text',
  DOCUMENT = 'document',
}

export class DiffChecker {
  async compare(original: string | File, changed: string | File, fileType: FileType = FileType.TEXT): Promise<string> {
    if (fileType === FileType.TEXT) {
      return this.compareText(original as string, changed as string);
    } else if (fileType === FileType.DOCUMENT) {
      return this.compareDocument(original as File, changed as File);
    }
    return '';
  }

  private compareText(original: string, changed: string): string {
    const differences = diff.diffChars(original, changed);
    let diffString = '';
    differences.forEach((part) => {
      if (part.added) {
        diffString += `+${part.value}`;
      } else if (part.removed) {
        diffString += `-${part.value}`;
      } else {
        diffString += ` ${part.value}`;
      }
    });
    return diffString;
  }

  private async compareDocument(original: File, changed: File): Promise<string> {
    const originalText = await this.readFileAsync(original);
    const changedText = await this.readFileAsync(changed);
    return this.compareText(originalText, changedText);
  }

  private readFileAsync(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
}