import React, { useState, useEffect } from 'react';
import { FlashCard } from './components/FlashCard';
import { loadVocabulary } from './utils/excelReader';
import type { Flashcard } from '../types';
import shuffle from 'lodash/shuffle';

export default function App() {
  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVocabulary().then((data) => {
      if (data.length > 0) {
        const shuffledDeck = shuffle(data).map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setDeck(shuffledDeck);
        setCurrentIndex(0);
      }
      setIsLoading(false);
    });
  }, []);

  const handleNext = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const shuffledDeck = shuffle(deck).map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      setDeck(shuffledDeck);
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#2D1B69] py-12 px-4 text-white flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Boost Your Vocabulary with 1,000 Flashcards!
        </h1>

        {deck.length > 0 ? (
          <FlashCard
            card={deck[currentIndex]}
            onNext={handleNext}
            onPrev={handlePrev}
            totalCards={deck.length}
          />
        ) : (
          <p className="text-center text-red-500 text-lg">
            Vocabulary not found. Please upload a file.
          </p>
        )}
      </div>
    </div>
  );
}
