
import React from 'react';
import { Card, Suit } from '../types';

interface CardComponentProps {
  card: Card | null;
  faceDown?: boolean;
  className?: string;
  isRedBack?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({ 
  card, 
  faceDown = false, 
  className = "",
  isRedBack = true 
}) => {
  const isRedSuit = card && (card.suit === Suit.HEARTS || card.suit === Suit.DIAMONDS);

  return (
    <div className={`relative [perspective:1000px] ${className}`}>
      <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${faceDown ? '[transform:rotateY(180deg)]' : ''}`}>
        
        {/* Front of Card */}
        <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white rounded-xl md:rounded-2xl border-2 md:border-4 border-gray-200 shadow-xl overflow-hidden`}>
          {card ? (
            <div className="relative w-full h-full p-2 md:p-4">
              {/* Top Left Corner - Rank Only */}
              <div className={`absolute top-1 left-2 md:top-3 md:left-4 flex flex-col items-center leading-none ${isRedSuit ? 'text-red-600' : 'text-gray-900'}`}>
                <span className="text-2xl md:text-5xl font-black tracking-tighter">{card.rank}</span>
              </div>
              
              {/* Center Suit Symbol - Enlarged to ~1/3 of card height */}
              <div className={`absolute inset-0 flex justify-center items-center text-[6.5rem] md:text-[12rem] opacity-90 ${isRedSuit ? 'text-red-600' : 'text-gray-900'}`}>
                {card.suit}
              </div>
              
              {/* Bottom Right Corner - Rank Only (Upside down) */}
              <div className={`absolute bottom-1 right-2 md:bottom-3 md:right-4 flex flex-col items-center leading-none rotate-180 ${isRedSuit ? 'text-red-600' : 'text-gray-900'}`}>
                <span className="text-2xl md:text-5xl font-black tracking-tighter">{card.rank}</span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 md:w-24 md:h-24 border-4 border-dashed border-gray-300 rounded-full opacity-30"></div>
            </div>
          )}
        </div>

        {/* Back of Card */}
        <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl md:rounded-2xl shadow-xl border-[4px] md:border-8 border-white ${isRedBack ? 'bg-[#C41E3A]' : 'bg-[#1E40AF]'}`}>
          <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_white_2px,_transparent_2px)] bg-[length:12px_12px] md:bg-[length:24px_24px] flex items-center justify-center">
             {/* Removed "A" character */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
