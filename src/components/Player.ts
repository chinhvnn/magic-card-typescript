import Card from './Card';

export default class Player {
  protected playerName: string;
  private hand: Card[] = [];
  private field: Card[] = [];
  private grave: Card[] = [];
  private deck: Card[] = [new Card('1'), new Card('2'), new Card('3')];

  constructor(playerName: string) {
    this.playerName = playerName;
  }

  addToHand(cards: Card[]) {
    // add cards to hand
    this.hand.push(...cards);

    // remove cards in deck
    for (let i = 0; i < this.deck.length; i++) {
      for (let j = 0; j < cards.length; j++) {
        if (this.deck[i].id === cards[j].id) {
          this.deck.splice(i, 1);
          i--;
          break;
        }
      }
    }
    console.log('111 hand', this.hand);
    console.log('111 deck', this.deck);
  }

  showHand(): Card[] {
    return [];
  }

  render() {
    // for (let i = 0; i < this.quantity.length; i++) {
    //   console.log('111 CardInHand', i, this.quantity[i]);
    // }
  }
}
