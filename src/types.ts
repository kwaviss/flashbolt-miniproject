export interface Flashcard {
  id: number;
  word: string;
  meaning: string;
  example?: string;
  category?: string;
  phonetic?: string;
}

export type FlashcardDeck = Flashcard[];
