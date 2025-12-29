
import { Rank, Suit } from './types';

export const RANK_ORDER: Rank[] = [
  Rank.ACE, Rank.TWO, Rank.THREE, Rank.FOUR, Rank.FIVE,
  Rank.SIX, Rank.SEVEN, Rank.EIGHT, Rank.NINE, Rank.TEN,
  Rank.JACK, Rank.QUEEN, Rank.KING
];

export const SUIT_ORDER: Suit[] = [
  Suit.DIAMONDS, Suit.CLUBS, Suit.HEARTS, Suit.SPADES
];

export const RANK_VALUES: Record<Rank, number> = {
  [Rank.ACE]: 1,
  [Rank.TWO]: 2,
  [Rank.THREE]: 3,
  [Rank.FOUR]: 4,
  [Rank.FIVE]: 5,
  [Rank.SIX]: 6,
  [Rank.SEVEN]: 7,
  [Rank.EIGHT]: 8,
  [Rank.NINE]: 9,
  [Rank.TEN]: 10,
  [Rank.JACK]: 11,
  [Rank.QUEEN]: 12,
  [Rank.KING]: 13,
};

export const SUIT_VALUES: Record<Suit, number> = {
  [Suit.DIAMONDS]: 1,
  [Suit.CLUBS]: 2,
  [Suit.HEARTS]: 3,
  [Suit.SPADES]: 4,
};
