
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, GameState } from '../types';
import { createDeck, evaluateResult } from '../utils/gameLogic';
import { audio } from '../utils/audio';
import CardComponent from '../components/CardComponent';

interface GameScreenProps {
  deckCount: number;
  onRestart: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ deckCount, onRestart }) => {
  const [state, setState] = useState<GameState>({
    deck: createDeck(deckCount),
    leftCard: null,
    rightCard: null,
    middleCard: null,
    leftFlipped: false,
    rightFlipped: false,
    revealed: false,
    drinks: 0,
    result: null,
    deckCount,
    autoDeal: false,
    soundEnabled: true,
  });

  const [isDealing, setIsDealing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  const deckRef = useRef(state.deck);
  useEffect(() => {
    deckRef.current = state.deck;
  }, [state.deck]);

  const dealRound = useCallback(() => {
    if (deckRef.current.length < 3) {
      alert("Deck empty! Shuffling new deck...");
      const newDeck = createDeck(deckCount);
      setState(prev => ({ ...prev, deck: newDeck }));
      return;
    }

    setIsDealing(true);
    setShowResult(false);
    
    setState(prev => ({
      ...prev,
      leftFlipped: false,
      rightFlipped: false,
      revealed: false,
      result: null,
    }));

    setTimeout(() => {
      audio.playFlip();
      const currentDeck = [...deckRef.current];
      const left = currentDeck.pop()!;
      const right = currentDeck.pop()!;

      setState(prev => ({
        ...prev,
        deck: currentDeck,
        leftCard: left,
        rightCard: right,
        middleCard: null,
      }));

      setTimeout(() => {
        setIsDealing(false);
      }, 300);
    }, 500); 
  }, [deckCount]);

  useEffect(() => {
    dealRound();
  }, [dealRound]);

  const flipBases = () => {
    if (isDealing || state.leftFlipped || state.rightFlipped) return;
    audio.playFlip();
    setState(prev => ({ ...prev, leftFlipped: true, rightFlipped: true }));
  };

  const drawMiddle = () => {
    if (state.revealed || isDealing || state.deck.length === 0) return;
    if (!state.leftFlipped || !state.rightFlipped) return;

    audio.playFlip();
    const d = [...state.deck];
    const middle = d.pop()!;
    const res = evaluateResult(state.leftCard!, state.rightCard!, middle);

    setState(prev => ({
      ...prev,
      deck: d,
      middleCard: middle,
      revealed: true,
      result: res,
      drinks: res === 'SAFE' ? prev.drinks : prev.drinks + (res === 'DOUBLE' ? 2 : 1)
    }));

    setTimeout(() => {
      setShowResult(true);
      if (res === 'SAFE') audio.playSafe();
      else if (res === 'DRINK') audio.playBuzzer();
      else if (res === 'DOUBLE') audio.playDouble();

      if (state.autoDeal) {
        setTimeout(dealRound, 3000);
      }
    }, 400);
  };

  const toggleSound = () => {
    const newState = !state.soundEnabled;
    audio.setEnabled(newState);
    setState(prev => ({ ...prev, soundEnabled: newState }));
  };

  const toggleAutoDeal = () => {
    setState(prev => ({ ...prev, autoDeal: !prev.autoDeal }));
  };

  const canDraw = state.leftFlipped && state.rightFlipped;

  return (
    <div className={`w-full h-full relative flex flex-col items-center justify-center p-2 md:p-8 ${state.result === 'DOUBLE' ? 'animate-pulse-red' : ''}`}>
      
      {/* Result Message Overlay - More compact for mobile */}
      {showResult && state.result && (
        <div className="absolute top-1 md:top-6 left-0 right-0 text-center z-[60] animate-in fade-in slide-in-from-top-4 duration-500 pointer-events-none">
          <div className="mx-auto inline-block bg-black/80 backdrop-blur-xl py-1.5 md:py-6 px-6 md:px-20 rounded-xl border-2 md:border-4 border-amber-500/50 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            {state.result === 'SAFE' && (
              <div className="text-emerald-400 font-black text-lg md:text-6xl drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]">
                SAFE! 🍀
              </div>
            )}
            {state.result === 'DRINK' && (
              <div className={`text-red-500 font-black text-lg md:text-6xl drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-shake`}>
                DRINK! 🍻
              </div>
            )}
            {state.result === 'DOUBLE' && (
              <div className="text-orange-500 font-black text-lg md:text-6xl drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]">
                CLASH! 🔥🍻🍻
              </div>
            )}
          </div>
        </div>
      )}

      {/* Top Left Header - Scoreboard */}
      <div className="absolute top-1 left-1 md:top-6 md:left-6 z-30">
        <div className="bg-black/40 p-1.5 md:p-4 rounded-lg md:rounded-xl border border-white/20 backdrop-blur-md shadow-lg">
          <p className="text-white/70 text-[7px] md:text-xs font-bold uppercase tracking-widest leading-none mb-0.5">Drinks</p>
          <p className="text-amber-400 text-lg md:text-4xl font-black leading-none">{state.drinks}</p>
        </div>
      </div>

      {/* Top Right Controls - Sound & Restart */}
      <div className="absolute top-1 right-1 md:top-6 md:right-6 flex flex-col items-end space-y-1 md:space-y-3 z-30 bg-black/20 p-1 rounded-lg md:rounded-2xl backdrop-blur-sm border border-white/5">
        <div className="flex space-x-1 md:space-x-2">
          <button 
            onClick={toggleAutoDeal}
            className={`px-1.5 py-1 md:w-36 md:py-3 rounded md:rounded-xl border transition-all shadow-md ${state.autoDeal ? 'bg-amber-500/30 border-amber-500/50 text-amber-500' : 'bg-black/40 border-white/10 text-white/40'}`}
          >
             <span className="text-[7px] md:text-xs font-bold uppercase tracking-wider">Auto {state.autoDeal ? 'On' : 'Off'}</span>
          </button>
          <button 
            onClick={toggleSound}
            className={`w-6 h-6 md:w-16 md:h-12 flex items-center justify-center bg-black/40 rounded md:rounded-xl border border-white/10 text-white hover:bg-white/20 transition-all shadow-md`}
          >
            {state.soundEnabled ? (
              <svg className="w-3 h-3 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
            ) : (
              <svg className="w-3 h-3 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
            )}
          </button>
        </div>
        <button 
          onClick={onRestart}
          className="w-full py-1 md:py-4 bg-red-600 hover:bg-red-500 text-white rounded md:rounded-xl text-[7px] md:text-sm font-black uppercase tracking-[0.2em] transition-all border border-white/30 shadow-xl"
        >
          Restart
        </button>
      </div>

      {/* Main Game Area - Optimized Card scaling for landscape */}
      <div className="flex items-center justify-center space-x-4 md:space-x-16 relative max-w-6xl w-full mt-2 sm:mt-0">
        
        {/* Base Card 1 */}
        <div 
          onClick={flipBases}
          className={`flex flex-col items-center space-y-1 md:space-y-4 transition-transform duration-300 ${!state.leftFlipped && !isDealing ? 'hover:scale-105 cursor-pointer' : ''}`}
        >
           <CardComponent 
             card={state.leftCard} 
             faceDown={!state.leftFlipped} 
             className="w-24 h-32 sm:w-28 sm:h-38 md:w-56 md:h-80 shadow-2xl" 
           />
           <span className={`text-[7px] sm:text-[9px] md:text-sm font-black uppercase tracking-[0.25em] ${state.leftFlipped ? 'text-white/20' : 'text-amber-400 animate-pulse'}`}>
             Base 1
           </span>
        </div>

        {/* Middle Result Slot */}
        <div className="relative flex flex-col items-center">
          <div className="relative w-24 h-32 sm:w-28 sm:h-38 md:w-56 md:h-80 flex items-center justify-center">
            {state.middleCard ? (
              <CardComponent card={state.middleCard} className="w-24 h-32 sm:w-28 sm:h-38 md:w-56 md:h-80 z-10" />
            ) : (
              <div className={`w-24 h-32 sm:w-28 sm:h-38 md:w-56 md:h-80 border-2 sm:border-4 border-dashed rounded-lg md:rounded-2xl flex items-center justify-center transition-colors shadow-inner ${canDraw ? 'border-white/40 bg-white/10' : 'border-white/10'}`}>
                 <span className={`font-serif text-4xl sm:text-5xl md:text-[10rem] transition-opacity ${canDraw ? 'text-white/30' : 'text-white/5'}`}>?</span>
              </div>
            )}
          </div>
          
          {/* Draw Button Area - Shifted up for landscape mobile */}
          <div className="absolute -bottom-8 md:-bottom-60 flex flex-col items-center z-40">
            {!canDraw && !state.revealed && !isDealing && (
              <div className="mb-1.5 sm:mb-2 bg-amber-500 text-black px-2 py-0.5 md:px-8 md:py-3 rounded-full font-black uppercase tracking-widest shadow-2xl text-[7px] sm:text-[9px] md:text-lg animate-bounce">
                Flip bases
              </div>
            )}
            
            <button
              onClick={drawMiddle}
              disabled={state.revealed || isDealing || !canDraw}
              className={`bg-red-600 border-2 md:border-8 border-white rounded-lg md:rounded-[2rem] px-6 py-2 md:px-24 md:py-8 shadow-2xl text-white font-black text-xs sm:text-sm md:text-5xl uppercase tracking-[0.3em] transition-all
                ${state.revealed || isDealing || !canDraw ? 'opacity-20 grayscale pointer-events-none' : 'hover:scale-110 active:scale-90 shadow-red-500/30'}
              `}
            >
              DRAW
            </button>
          </div>
        </div>

        {/* Base Card 2 */}
        <div 
          onClick={flipBases}
          className={`flex flex-col items-center space-y-1 md:space-y-4 transition-transform duration-300 ${!state.rightFlipped && !isDealing ? 'hover:scale-105 cursor-pointer' : ''}`}
        >
           <CardComponent 
             card={state.rightCard} 
             faceDown={!state.rightFlipped} 
             className="w-24 h-32 sm:w-28 sm:h-38 md:w-56 md:h-80 shadow-2xl" 
           />
           <span className={`text-[7px] sm:text-[9px] md:text-sm font-black uppercase tracking-[0.25em] ${state.rightFlipped ? 'text-white/20' : 'text-amber-400 animate-pulse'}`}>
             Base 2
           </span>
        </div>
      </div>

      {/* Bottom Left - Cards Remaining Counter */}
      <div className="absolute bottom-1 left-1 md:bottom-12 md:left-12 flex flex-col items-start z-50">
        <span className="text-white/50 text-[7px] md:text-sm font-bold uppercase tracking-[0.3em] leading-none">Left</span>
        <span className="text-white text-xl sm:text-2xl md:text-9xl font-black tabular-nums leading-none tracking-tighter drop-shadow-lg">{state.deck.length}</span>
      </div>

      {/* Bottom Right - "Next Turn" Button */}
      <div className="absolute bottom-1 right-1 md:bottom-10 md:right-10 z-50">
        <button 
          onClick={dealRound}
          disabled={!state.revealed || isDealing}
          className={`rounded-full font-black text-[9px] sm:text-[11px] md:text-2xl uppercase tracking-tighter transition-all flex flex-col items-center justify-center text-center p-1 md:p-6 leading-none border-2 md:border-8 ${
            state.revealed && !isDealing 
              ? 'bg-amber-500 text-black border-amber-100 shadow-[0_0_40px_rgba(245,158,11,0.5)] animate-flash-ring active:scale-90' 
              : 'bg-white/5 text-white/10 border-white/5 grayscale pointer-events-none'
          }`}
          style={{ width: 'clamp(45px, 12vw, 150px)', height: 'clamp(45px, 12vw, 150px)' }}
        >
          <span>Next</span>
        </button>
      </div>
    </div>
  );
};

export default GameScreen;
