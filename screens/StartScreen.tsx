
import React, { useState } from 'react';

interface StartScreenProps {
  onStart: (decks: number) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [decks, setDecks] = useState(1);
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="relative w-full h-full flex flex-row items-center justify-center overflow-hidden casino-felt">
      
      {/* Left Section: Giant Beer - Scaled down for mobile compatibility */}
      <div className="hidden md:flex flex-1 h-full items-center justify-center z-0">
        <div className="text-[12rem] lg:text-[20rem] animate-wobble-beer drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-80 select-none">
          🍺
        </div>
      </div>

      {/* Center Section: Main Content */}
      <div className="flex-[2] md:flex-1 flex flex-col items-center justify-center z-10 px-2 space-y-2 md:space-y-6">
        
        {/* Mobile-only background beers (Very subtle to save visual space) */}
        <div className="md:hidden absolute inset-0 flex flex-row justify-between items-center px-6 pointer-events-none opacity-20">
           <div className="text-6xl animate-wobble-beer">🍺</div>
           <div className="text-6xl animate-wobble-beer-delayed scale-x-[-1]">🍺</div>
        </div>

        <div className="text-center relative">
          <h1 className="text-3xl sm:text-4xl md:text-[6rem] lg:text-[8rem] font-serif text-white tracking-tighter drop-shadow-[0_5px_20px_rgba(0,0,0,0.7)] leading-none">
            IN BETWEEN
          </h1>
          <p className="text-amber-400 font-black tracking-[0.2em] uppercase text-[7px] sm:text-[9px] md:text-lg lg:text-xl mt-1 md:mt-4 opacity-95">
            Allan drinking game series :
          </p>
        </div>

        {/* Compact selection container */}
        <div className="bg-black/50 backdrop-blur-2xl p-3 sm:p-4 md:p-8 lg:p-10 rounded-[1.5rem] md:rounded-[3rem] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col items-center w-full max-w-[240px] sm:max-w-[280px] md:max-w-[400px] lg:max-w-[500px]">
          <label className="text-white/60 text-[7px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase tracking-[0.4em] mb-1 sm:mb-3 md:mb-5 font-black">
            Choose Decks
          </label>
          <div className="flex space-x-1.5 sm:space-x-2 md:space-x-4 mb-3 sm:mb-6 md:mb-10 w-full">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setDecks(n)}
                className={`flex-1 py-1.5 sm:py-2 md:py-4 lg:py-6 rounded-lg md:rounded-2xl font-black text-[9px] sm:text-[11px] md:text-xl lg:text-3xl transition-all shadow-md ${
                  decks === n 
                    ? 'bg-amber-500 text-black scale-105 shadow-amber-500/50 ring-2 md:ring-6 ring-amber-500/20' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <button
            onClick={() => onStart(decks)}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-2.5 sm:py-3.5 md:py-6 lg:py-8 rounded-lg md:rounded-[1.5rem] text-[11px] sm:text-sm md:text-2xl lg:text-5xl shadow-[0_10px_30px_rgba(220,38,38,0.5)] transition-all active:scale-95 mb-2 sm:mb-4 md:mb-8 tracking-[0.1em]"
          >
            START GAME
          </button>

          <button
            onClick={() => setShowInstructions(true)}
            className="text-white/50 hover:text-white transition-colors text-[8px] sm:text-[10px] md:text-base lg:text-lg font-bold underline underline-offset-2 md:underline-offset-6 decoration-1 md:decoration-2"
          >
            How to Play
          </button>
        </div>
      </div>

      {/* Right Section: Giant Beer */}
      <div className="hidden md:flex flex-1 h-full items-center justify-center z-0">
        <div className="text-[12rem] lg:text-[20rem] animate-wobble-beer-delayed drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-x-[-1] opacity-80 select-none">
          🍺
        </div>
      </div>

      {/* Instructions Modal - Scaled for landscape mobile */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 z-[100]">
          <div className="bg-white rounded-[1.25rem] md:rounded-[3rem] p-4 sm:p-6 md:p-16 max-w-2xl w-full shadow-[0_0_100px_rgba(0,0,0,1)] animate-in slide-in-from-bottom-10 duration-500 overflow-y-auto max-h-[95vh] border-2 md:border-4 border-gray-100">
            <h2 className="text-xl sm:text-2xl md:text-6xl font-black mb-4 sm:mb-8 text-gray-900 tracking-tight text-center">Instructions</h2>
            <ul className="space-y-2 sm:space-y-6 md:space-y-12 text-gray-700 text-[10px] sm:text-xs md:text-3xl leading-tight">
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 w-5 h-5 sm:w-8 sm:h-8 md:w-16 md:h-16 flex items-center justify-center rounded md:rounded-2xl font-black mr-2 sm:mr-4 md:mr-8 flex-shrink-0 text-[10px] md:text-2xl">1</span>
                <span>Pull a card from the deck. If it's <strong className="text-black underline font-black">strictly in between</strong> the values of the two base cards, you're safe.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-red-100 text-red-700 w-5 h-5 sm:w-8 sm:h-8 md:w-16 md:h-16 flex items-center justify-center rounded md:rounded-2xl font-black mr-2 sm:mr-4 md:mr-8 flex-shrink-0 text-[10px] md:text-2xl">2</span>
                <span>If it falls outside the range, <strong className="text-black">you drink!</strong></span>
              </li>
              <li className="flex items-start">
                <span className="bg-orange-100 text-orange-700 w-5 h-5 sm:w-8 sm:h-8 md:w-16 md:h-16 flex items-center justify-center rounded md:rounded-2xl font-black mr-2 sm:mr-4 md:mr-8 flex-shrink-0 text-[10px] md:text-2xl">3</span>
                <span>If the rank matches <strong className="text-black">either side</strong>, you drink <strong className="text-black underline font-black">DOUBLE</strong>.</span>
              </li>
            </ul>
            <button
              onClick={() => setShowInstructions(false)}
              className="mt-4 sm:mt-8 w-full bg-gray-900 hover:bg-black text-white font-black py-2.5 sm:py-4 md:py-8 rounded-lg md:rounded-2xl text-[11px] sm:text-sm md:text-4xl transition-all active:scale-90 shadow-xl"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartScreen;
