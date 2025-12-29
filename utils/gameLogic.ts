
import { Card, Suit, Rank } from '../types';
import { RANK_VALUES, SUIT_VALUES } from '../constants';

export function createDeck(count: number = 1): Card[] {
  const suits = Object.values(Suit);
  const ranks = Object.values(Rank);
  const deck: Card[] = [];

  for (let i = 0; i < count; i++) {
    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({
          suit,
          rank,
          id: `${i}-${suit}-${rank}-${Math.random().toString(36).substr(2, 9)}`,
        });
      }
    }
  }
  return shuffleDeck(deck);
}

export function shuffleDeck(deck: Card[]): Card[] {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

/**
 * Ensures the two base cards have a minimum spread to make the game "Fair"
 * Returns the two cards and the updated deck
 */
export function getFairBaseCards(deck: Card[]): { left: Card, right: Card, remainingDeck: Card[] } {
  let tempDeck = [...deck];
  
  // Attempt to find a pair with at least a gap of 2 ranks (e.g., 5 and 8)
  // If we can't find one in 10 tries, just take whatever (fallback)
  for (let i = 0; i < 10; i++) {
    if (tempDeck.length < 3) break;
    
    const card1 = tempDeck[tempDeck.length - 1];
    const card2 = tempDeck[tempDeck.length - 2];
    
    const diff = Math.abs(RANK_VALUES[card1.rank] - RANK_VALUES[card2.rank]);
    
    if (diff >= 2) {
      const left = tempDeck.pop()!;
      const right = tempDeck.pop()!;
      return { left, right, remainingDeck: tempDeck };
    }
    
    // If not a good spread, shuffle the deck and try again
    tempDeck = shuffleDeck(tempDeck);
  }

  // Fallback if no fair pair found
  const left = tempDeck.pop()!;
  const right = tempDeck.pop()!;
  return { left, right, remainingDeck: tempDeck };
}

export function getCardAbsoluteValue(card: Card): number {
  return (RANK_VALUES[card.rank] * 10) + SUIT_VALUES[card.suit];
}

export function evaluateResult(left: Card, right: Card, middle: Card): 'SAFE' | 'DRINK' | 'DOUBLE' {
  // If ranks match, it's an immediate Clash (Double)
  if (middle.rank === left.rank || middle.rank === right.rank) {
    return 'DOUBLE';
  }

  const vL = getCardAbsoluteValue(left);
  const vR = getCardAbsoluteValue(right);
  const vM = getCardAbsoluteValue(middle);

  const minV = Math.min(vL, vR);
  const maxV = Math.max(vL, vR);

  // Strictly between
  if (vM > minV && vM < maxV) {
    return 'SAFE';
  }

  return 'DRINK';
}
