
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

export function getCardAbsoluteValue(card: Card): number {
  // Multiply rank by a factor to ensure it's primary comparison, then add suit as tie-breaker
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
