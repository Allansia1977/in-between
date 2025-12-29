
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
        <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white rounded-xl lg:rounded-2xl border-2 lg:border-4 border-gray-200 shadow-xl overflow-hidden`}>
          {card ? (
            <div className="relative w-full h-full p-1.5 lg:p-4">
              {/* Top Left Corner - Rank Only */}
              <div className={`absolute top-0.5 left-1.5 lg:top-3 lg:left-4 flex flex-col items-center leading-none ${isRedSuit ? 'text-red-600' : 'text-gray-900'}`}>
                <span className="text-xl sm:text-2xl lg:text-5xl font-black tracking-tighter">{card.rank}</span>
              </div>
              
              {/* Center Suit Symbol - Resized to be more balanced on mobile landscape */}
              <div className={`absolute inset-0 flex justify-center items-center text-[4.5rem] sm:text-[5.5rem] lg:text-[10rem] opacity-90 ${isRedSuit ? 'text-red-600' : 'text-gray-900'}`}>
                {card.suit}
              </div>
              
              {/* Bottom Right Corner - Rank Only (Upside down) */}
              <div className={`absolute bottom-0.5 right-1.5 lg:bottom-3 lg:right-4 flex flex-col items-center leading-none rotate-180 ${isRedSuit ? 'text-red-600' : 'text-gray-900'}`}>
                <span className="text-xl sm:text-2xl lg:text-5xl font-black tracking-tighter">{card.rank}</span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-10 h-10 lg:w-24 lg:h-24 border-2 lg:border-4 border-dashed border-gray-300 rounded-full opacity-30"></div>
            </div>
          )}
        </div>

        {/* Back of Card */}
        <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl lg:rounded-2xl shadow-xl border-[4px] lg:border-8 border-white ${isRedBack ? 'bg-[#C41E3A]' : 'bg-[#1E40AF]'}`}>
          <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_white_2px,_transparent_2px)] bg-[length:12px_12px] lg:bg-[length:24px_24px] flex items-center justify-center">
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
