import * as XLSX from 'xlsx';
import type { Flashcard } from '../types';

export async function loadVocabulary(): Promise<Flashcard[]> {
  const response = await fetch('/1000Vocabulary.xlsx');
  if (!response.ok) return [];

  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });

  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  return jsonData
    .filter((item) => item.Word && item.Translation)
    .map((item, index) => ({
      id: index + 1,
      word: item.Word || "N/A",
      meaning: item.Translation || "N/A",
      category: item.PartOfSpeech || "Unknown",
      phonetic: item.Phonetic || "-",
      example: item.Example || "N/A",
    }));
}
