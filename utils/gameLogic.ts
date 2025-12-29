
import { Card, Suit, Rank } from '../types';
import { RANK_VALUES, SUIT_VALUES, RANK_ORDER } from '../constants';

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
 * Balanced Fairness: Ensures the two base cards have a reasonable spread.
 * Target average Safe probability: ~35%
 * We use MIN_GAP = 4 to ensure at least 3 ranks are in between.
 */
export function getFairBaseCards(deck: Card[]): { left: Card, right: Card, remainingDeck: Card[] } {
  let tempDeck = [...deck];
  const MIN_GAP = 4; // Changed from 5 to 4 to target ~35% safe probability
  
  for (let i = 0; i < 20; i++) {
    if (tempDeck.length < 3) break;
    
    const card1 = tempDeck[tempDeck.length - 1];
    const card2 = tempDeck[tempDeck.length - 2];
    
    const diff = Math.abs(RANK_VALUES[card1.rank] - RANK_VALUES[card2.rank]);
    
    // With MIN_GAP 4, minimum safe ranks is 3 (e.g., 2 and 6 has 3, 4, 5 safe)
    if (diff >= MIN_GAP) {
      const left = tempDeck.pop()!;
      const right = tempDeck.pop()!;
      return { left, right, remainingDeck: tempDeck };
    }
    
    tempDeck = shuffleDeck(tempDeck);
  }

  const left = tempDeck.pop()!;
  const right = tempDeck.pop()!;
  return { left, right, remainingDeck: tempDeck };
}

export function getSafeRange(left: Card, right: Card): string[] {
  const v1 = RANK_VALUES[left.rank];
  const v2 = RANK_VALUES[right.rank];
  const start = Math.min(v1, v2) + 1;
  const end = Math.max(v1, v2) - 1;
  
  if (start > end) return [];
  
  const safeRanks: string[] = [];
  for (let i = start; i <= end; i++) {
    const rankEntry = Object.entries(RANK_VALUES).find(([_, val]) => val === i);
    if (rankEntry) safeRanks.push(rankEntry[0]);
  }
  return safeRanks;
}

export function getCardAbsoluteValue(card: Card): number {
  return (RANK_VALUES[card.rank] * 10) + SUIT_VALUES[card.suit];
}

export function evaluateResult(left: Card, right: Card, middle: Card): 'SAFE' | 'DRINK' | 'DOUBLE' {
  if (middle.rank === left.rank || middle.rank === right.rank) {
    return 'DOUBLE';
  }

  const vL = getCardAbsoluteValue(left);
  const vR = getCardAbsoluteValue(right);
  const vM = getCardAbsoluteValue(middle);

  const minV = Math.min(vL, vR);
  const maxV = Math.max(vL, vR);

  if (vM > minV && vM < maxV) {
    return 'SAFE';
  }

  return 'DRINK';
}
