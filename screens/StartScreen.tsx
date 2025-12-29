
import React, { useState } from 'react';

interface StartScreenProps {
  onStart: (decks: number) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [decks, setDecks] = useState(1);
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="relative w-full h-full flex flex-row items-center justify-center overflow-hidden casino-felt p-2 sm:p-4">
      
      {/* Left Section: Giant Beer - Hidden on shorter mobile screens even if wide */}
      <div className="hidden lg:flex flex-1 h-full items-center justify-center z-0">
        <div className="text-[15rem] xl:text-[20rem] animate-wobble-beer drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-80 select-none">
          🍺
        </div>
      </div>

      {/* Center Section: Main Content */}
      <div className="flex-[3] lg:flex-1 flex flex-col items-center justify-center z-10 px-2 space-y-2 sm:space-y-4">
        
        {/* Mobile-only background beers (Very subtle to save visual space) */}
        <div className="lg:hidden absolute inset-0 flex flex-row justify-between items-center px-4 sm:px-12 pointer-events-none opacity-20">
           <div className="text-5xl sm:text-7xl animate-wobble-beer">🍺</div>
           <div className="text-5xl sm:text-7xl animate-wobble-beer-delayed scale-x-[-1]">🍺</div>
        </div>

        <div className="text-center relative">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[7rem] font-serif text-white tracking-tighter drop-shadow-[0_5px_20px_rgba(0,0,0,0.7)] leading-none">
            IN BETWEEN
          </h1>
          <p className="text-amber-400 font-black tracking-[0.2em] uppercase text-[7px] sm:text-[9px] md:text-xs lg:text-xl mt-1 md:mt-2 opacity-95">
            Allan drinking game series :
          </p>
        </div>

        {/* Compact selection container - Reduced padding and max-widths */}
        <div className="bg-black/50 backdrop-blur-2xl p-3 sm:p-5 lg:p-10 rounded-[1.5rem] lg:rounded-[3rem] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col items-center w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[500px]">
          <label className="text-white/60 text-[7px] sm:text-[10px] uppercase tracking-[0.4em] mb-1 sm:mb-3 font-black">
            Choose Decks
          </label>
          <div className="flex space-x-1.5 sm:space-x-3 mb-3 sm:mb-6 w-full">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setDecks(n)}
                className={`flex-1 py-1.5 sm:py-3 lg:py-6 rounded-lg lg:rounded-2xl font-black text-[10px] sm:text-lg lg:text-3xl transition-all shadow-md ${
                  decks === n 
                    ? 'bg-amber-500 text-black scale-105 shadow-amber-500/50 ring-2 lg:ring-6 ring-amber-500/20' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <button
            onClick={() => onStart(decks)}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-2.5 sm:py-4 lg:py-8 rounded-lg lg:rounded-[1.5rem] text-[12px] sm:text-lg lg:text-5xl shadow-[0_10px_30px_rgba(220,38,38,0.5)] transition-all active:scale-95 mb-2 sm:mb-4 tracking-[0.1em]"
          >
            START GAME
          </button>

          <button
            onClick={() => setShowInstructions(true)}
            className="text-white/50 hover:text-white transition-colors text-[8px] sm:text-[11px] lg:text-lg font-bold underline underline-offset-2 lg:underline-offset-6 decoration-1 lg:decoration-2"
          >
            How to Play
          </button>
        </div>
      </div>

      {/* Right Section: Giant Beer */}
      <div className="hidden lg:flex flex-1 h-full items-center justify-center z-0">
        <div className="text-[15rem] xl:text-[20rem] animate-wobble-beer-delayed drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-x-[-1] opacity-80 select-none">
          🍺
        </div>
      </div>

      {/* Instructions Modal - Scaled for landscape mobile */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 z-[100]">
          <div className="bg-white rounded-[1.25rem] lg:rounded-[3rem] p-4 sm:p-8 lg:p-16 max-w-xl lg:max-w-2xl w-full shadow-[0_0_100px_rgba(0,0,0,1)] animate-in slide-in-from-bottom-10 duration-500 overflow-y-auto max-h-[95vh] border-2 lg:border-4 border-gray-100">
            <h2 className="text-xl sm:text-3xl lg:text-6xl font-black mb-4 lg:mb-12 text-gray-900 tracking-tight text-center">Instructions</h2>
            <ul className="space-y-3 sm:space-y-6 lg:space-y-12 text-gray-700 text-[10px] sm:text-sm lg:text-3xl leading-tight">
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 w-5 h-5 sm:w-10 sm:h-10 lg:w-16 lg:h-16 flex items-center justify-center rounded lg:rounded-2xl font-black mr-2 lg:mr-8 flex-shrink-0 text-[10px] sm:text-lg lg:text-2xl">1</span>
                <span>Pull a card from the deck. If it's <strong className="text-black underline font-black">strictly in between</strong> the values of the two base cards, you're safe.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-red-100 text-red-700 w-5 h-5 sm:w-10 sm:h-10 lg:w-16 lg:h-16 flex items-center justify-center rounded lg:rounded-2xl font-black mr-2 lg:mr-8 flex-shrink-0 text-[10px] sm:text-lg lg:text-2xl">2</span>
                <span>If it falls outside the range, <strong className="text-black">you drink!</strong></span>
              </li>
              <li className="flex items-start">
                <span className="bg-orange-100 text-orange-700 w-5 h-5 sm:w-10 sm:h-10 lg:w-16 lg:h-16 flex items-center justify-center rounded lg:rounded-2xl font-black mr-2 lg:mr-8 flex-shrink-0 text-[10px] sm:text-lg lg:text-2xl">3</span>
                <span>If the rank matches <strong className="text-black">either side</strong>, you drink <strong className="text-black underline font-black">DOUBLE</strong>.</span>
              </li>
            </ul>
            <button
              onClick={() => setShowInstructions(false)}
              className="mt-4 lg:mt-16 w-full bg-gray-900 hover:bg-black text-white font-black py-2.5 sm:py-5 lg:py-8 rounded-lg lg:rounded-2xl text-[11px] sm:text-lg lg:text-4xl transition-all active:scale-90 shadow-xl"
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
