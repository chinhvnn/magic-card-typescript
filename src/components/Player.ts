import {
  CARD_INFO,
  DECK_COORDINATE,
  GRAVE_COORDINATE,
  HAND_CARDS_COORDINATE,
  SCREEN_SIZE,
} from '../constant';
import Card from './Card';

export default class Player {
  protected playerName: string;
  private handCards: Card[] = [];
  private field: Card[] = [];
  private grave: Card[] = [];
  private deck: Card[] = [
    new Card('1'),
    new Card('2'),
    new Card('3'),
    new Card('4'),
    new Card('5'),
    new Card('6'),
    new Card('7'),
    new Card('8'),
    new Card('9'),
  ];

  constructor(playerName: string) {
    this.playerName = playerName;
  }

  addToHand(cards: Card[]) {
    // add cards to hand
    this.handCards.push(...cards);

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
    console.log('111 hand', this.handCards);
    console.log('111 deck', this.deck);
  }

  playOneCard(card: Card) {
    // add card to field
    this.field.push(card);

    // remove card in hand
    for (let i = 0; i < this.deck.length; i++) {
      if (this.deck[i].id === card.id) {
        this.deck.splice(i, 1);
        i--;
      }
    }
  }

  getDeck(): Card[] {
    return this.deck;
  }

  getHandCards(): Card[] {
    return this.handCards;
  }

  getFieldCards(): Card[] {
    return this.field;
  }

  getGraveCards(): Card[] {
    return this.grave;
  }

  drawHandCards(context: CanvasRenderingContext2D, dispatch: any) {
    let x = HAND_CARDS_COORDINATE.x;
    let y = HAND_CARDS_COORDINATE.y;

    for (let i = 0; i < this.handCards.length; i++) {
      console.log('111 drawHandCard -', i, this.handCards[i]);
      this.handCards[i].drawFaceUpCard(context, x, y, dispatch);
      x += CARD_INFO.width + 10;
    }
  }

  drawDeck(context: CanvasRenderingContext2D, dispatch: any) {
    let x = DECK_COORDINATE.x;
    let y = DECK_COORDINATE.y;
    let borderColor = 'white';

    // if has action
    if (dispatch.action == 'click-deck') {
      borderColor = 'red';
    }

    // draw background
    context.beginPath();
    context.fillStyle = 'grey';
    context.fillRect(x, y, CARD_INFO.width - 2, CARD_INFO.height - 2);
    context.closePath();

    // draw card border
    context.beginPath();
    context.strokeStyle = borderColor;
    context.rect(x - 1, y - 1, CARD_INFO.width, CARD_INFO.height);
    context.stroke();
    context.closePath();
  }

  drawGrave(context: CanvasRenderingContext2D, dispatch: any) {
    let x = GRAVE_COORDINATE.x;
    let y = GRAVE_COORDINATE.y;
    let borderColor = 'white';

    // if has action
    if (dispatch.action == 'click-grave') {
      borderColor = 'red';
    }

    // draw background
    context.beginPath();
    context.fillStyle = 'grey';
    context.fillRect(x, y, CARD_INFO.width - 2, CARD_INFO.height - 2);
    context.closePath();

    // draw card border
    context.beginPath();
    context.strokeStyle = borderColor;
    context.rect(x - 1, y - 1, CARD_INFO.width, CARD_INFO.height);
    context.stroke();
    context.closePath();
  }
}
