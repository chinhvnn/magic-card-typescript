import Card from './Card';

export default class Deck {
  private deckId: string;
  constructor(deckId: string) {
    this.deckId = deckId;
  }

  getShuffledDeck(): Card[] {
    return [];
  }
}
