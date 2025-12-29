
import React, { useState } from 'react';

interface StartScreenProps {
  onStart: (decks: number) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [decks, setDecks] = useState(1);
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="relative w-full h-full flex flex-row items-center justify-center overflow-hidden casino-felt">
      
      {/* Left 1/3 Section: Giant Beer */}
      <div className="hidden md:flex flex-1 h-full items-center justify-center z-0">
        <div className="text-[18rem] lg:text-[25rem] animate-wobble-beer drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-90 select-none">
          🍺
        </div>
      </div>

      {/* Center 1/3 Section: Main Content */}
      <div className="flex-[1.5] md:flex-1 flex flex-col items-center justify-center z-10 px-4 space-y-4 md:space-y-6">
        
        {/* Mobile-only beers (scaled down but still prominent) */}
        <div className="md:hidden absolute inset-0 flex flex-row justify-between items-center px-2 pointer-events-none opacity-40">
           <div className="text-8xl animate-wobble-beer">🍺</div>
           <div className="text-8xl animate-wobble-beer-delayed scale-x-[-1]">🍺</div>
        </div>

        <div className="text-center relative">
          <h1 className="text-5xl md:text-[8rem] lg:text-[10rem] font-serif text-white tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)] leading-none">
            IN BETWEEN
          </h1>
          <p className="text-amber-400 font-black tracking-[0.3em] uppercase text-[10px] md:text-lg lg:text-xl mt-2 md:mt-4 opacity-95">
            Allan drinking game series :
          </p>
        </div>

        {/* Shrunk the container and internal padding */}
        <div className="bg-black/50 backdrop-blur-2xl p-5 md:p-8 lg:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.8)] flex flex-col items-center w-full max-w-[300px] md:max-w-[440px] lg:max-w-[540px]">
          <label className="text-white/60 text-[9px] md:text-[11px] lg:text-xs uppercase tracking-[0.4em] mb-3 md:mb-5 font-black">
            Choose Decks
          </label>
          <div className="flex space-x-2 md:space-x-4 mb-6 md:mb-10 w-full">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setDecks(n)}
                className={`flex-1 py-3 md:py-5 lg:py-6 rounded-xl md:rounded-3xl font-black text-xs md:text-xl lg:text-3xl transition-all shadow-md ${
                  decks === n 
                    ? 'bg-amber-500 text-black scale-105 md:scale-110 shadow-amber-500/50 ring-4 md:ring-6 ring-amber-500/20' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <button
            onClick={() => onStart(decks)}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 md:py-6 lg:py-8 rounded-xl md:rounded-[2rem] text-lg md:text-3xl lg:text-5xl shadow-[0_15px_40px_rgba(220,38,38,0.5)] hover:shadow-red-500/60 transition-all active:scale-95 mb-4 md:mb-8 tracking-[0.1em]"
          >
            START GAME
          </button>

          <button
            onClick={() => setShowInstructions(true)}
            className="text-white/50 hover:text-white transition-colors text-[10px] md:text-base lg:text-lg font-bold underline underline-offset-4 md:underline-offset-6 decoration-1 md:decoration-2"
          >
            How to Play
          </button>
        </div>
      </div>

      {/* Right 1/3 Section: Giant Beer */}
      <div className="hidden md:flex flex-1 h-full items-center justify-center z-0">
        <div className="text-[18rem] lg:text-[25rem] animate-wobble-beer-delayed drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-x-[-1] opacity-90 select-none">
          🍺
        </div>
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 z-[100]">
          <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 max-w-3xl w-full shadow-[0_0_150px_rgba(0,0,0,1)] animate-in slide-in-from-bottom-20 duration-500 overflow-y-auto max-h-[90vh] border-4 border-gray-100">
            <h2 className="text-4xl md:text-8xl font-black mb-10 md:mb-16 text-gray-900 tracking-tight text-center md:text-left">Instructions</h2>
            <ul className="space-y-8 md:space-y-16 text-gray-700 text-lg md:text-4xl leading-tight">
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 w-12 h-12 md:w-24 md:h-24 flex items-center justify-center rounded-2xl md:rounded-3xl font-black mr-5 md:mr-12 flex-shrink-0 text-xl md:text-4xl shadow-sm">1</span>
                <span>Pull a card from the deck. If it's <strong className="text-black underline underline-offset-4 font-black">strictly in between</strong> the values of the two base cards, you're safe.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-red-100 text-red-700 w-12 h-12 md:w-24 md:h-24 flex items-center justify-center rounded-2xl md:rounded-3xl font-black mr-5 md:mr-12 flex-shrink-0 text-xl md:text-4xl shadow-sm">2</span>
                <span>If it falls outside the range, <strong className="text-black">you drink!</strong></span>
              </li>
              <li className="flex items-start">
                <span className="bg-orange-100 text-orange-700 w-12 h-12 md:w-24 md:h-24 flex items-center justify-center rounded-2xl md:rounded-3xl font-black mr-5 md:mr-12 flex-shrink-0 text-xl md:text-4xl shadow-sm">3</span>
                <span>If the rank matches <strong className="text-black">either side</strong>, you drink <strong className="text-black underline underline-offset-4 font-black">DOUBLE</strong>.</span>
              </li>
            </ul>
            <button
              onClick={() => setShowInstructions(false)}
              className="mt-12 md:mt-24 w-full bg-gray-900 hover:bg-black text-white font-black py-6 md:py-10 rounded-2xl md:rounded-[2rem] text-2xl md:text-6xl transition-all active:scale-90 shadow-2xl"
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
