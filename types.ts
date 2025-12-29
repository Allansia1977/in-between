
export enum Suit {
  DIAMONDS = '♦',
  CLUBS = '♣',
  HEARTS = '♥',
  SPADES = '♠'
}

export enum Rank {
  ACE = 'A',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'J',
  QUEEN = 'Q',
  KING = 'K'
}

export interface Card {
  suit: Suit;
  rank: Rank;
  id: string;
}

export interface GameState {
  deck: Card[];
  leftCard: Card | null;
  rightCard: Card | null;
  middleCard: Card | null;
  leftFlipped: boolean;
  rightFlipped: boolean;
  revealed: boolean;
  drinks: number;
  result: 'SAFE' | 'DRINK' | 'DOUBLE' | null;
  deckCount: number;
  autoDeal: boolean;
  soundEnabled: boolean;
}
