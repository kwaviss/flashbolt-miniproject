import React, { useState } from 'react';
import { ChevronDown, Layers, ChevronRight, ChevronLeft, Volume2 } from 'lucide-react';
import type { Flashcard } from '../types';

interface FlashCardProps {
  card: Flashcard;
  onNext: () => void;
  onPrev: () => void;
  totalCards: number;
}

export function FlashCard({ card, onNext, onPrev, totalCards }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const progress = (card.id / totalCards) * 100;

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(card.word);
      utterance.lang = /^[a-zA-Z]+$/.test(card.word) ? "en-US" : "th-TH";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-lg p-4 sm:p-6">
      {/* Header */}
      <div className="bg-violet-500 p-3 sm:p-4 rounded-t-3xl flex justify-between items-center text-white shadow-md">
        <span className="text-sm sm:text-lg font-semibold">1,000 คำศัพท์พื้นฐาน</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="text-sm sm:text-lg font-semibold">{card.id}</span>
          </div>
          <div className="flex items-center gap-1">
            <Layers className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="text-sm sm:text-lg font-semibold">{totalCards - card.id}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-2">
        <div className="bg-green-400 h-1.5 sm:h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Flashcard */}
      <div
        className="relative min-h-[180px] sm:min-h-[170px] flex items-center justify-center cursor-pointer bg-gray-50 rounded-xl shadow-md mt-4"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`absolute w-full h-full p-4 sm:p-6 text-center transition-all ${isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100'}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-black">{card.word || "⚠ No Word"}</h2>
          <div className="text-gray-900 mt-2 flex items-center justify-center gap-1">
            <span>{card.phonetic || "-"}</span>
          </div>
          <span className="bg-gray-200 px-2 py-1 rounded-full text-sm mt-2 inline-block">{card.category || "Unknown"}</span>
        </div>

        <div className={`absolute w-full h-full p-4 sm:p-6 text-center transition-all ${isFlipped ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180'}`}>
          <h2 className="text-xl sm:text-2xl font-bold text-black">{card.meaning || "⚠ No Meaning"}</h2>
          {card.example && <p className="text-gray-900 mt-2"><strong>Example:</strong> {card.example}</p>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center items-center mt-4 gap-2">
        {card.id > 1 && (
          <button onClick={onPrev} className="bg-gray-300 px-3 sm:px-4 py-2 rounded-full font-semibold hover:bg-gray-400 transition-colors flex items-center gap-1">
            <ChevronLeft className="w-5 h-5" />
            ย้อนกลับ
          </button>
        )}

        <button onClick={speakWord} className="bg-blue-500 p-2 sm:p-3 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center">
          <Volume2 className="w-5 sm:w-6 h-5 sm:h-6" />
        </button>

        <button onClick={onNext} className="bg-yellow-300 px-3 sm:px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors flex items-center gap-1">
          คำต่อไป
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
