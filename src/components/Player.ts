import {
  CARD_INFO,
  DECK_COORDINATE,
  FIELD_CARDS_COORDINATE,
  GRAVE_COORDINATE,
  HAND_CARDS_COORDINATE,
  SCREEN_SIZE,
} from '../constant';
import Card from './Card';

export default class Player {
  protected playerType: string;
  private handCards: Card[] = [];
  private field: Card[] = [];
  private grave: Card[] = [];
  private deck: Card[] = [
    new Card(1),
    new Card(2),
    new Card(3),
    new Card(4),
    new Card(5),
    new Card(6),
    new Card(7),
    new Card(8),
    new Card(9),
  ];

  constructor(playerType: string) {
    this.playerType = playerType;
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
  }

  playOneCard(id: number) {
    console.log('111 playOneCard');

    // get card from hand cards
    const card = this.getOneHandCard(id);

    if (card) {
      // add card to field
      this.field.push(card);
      // remove card in hand
      for (let i = 0; i < this.handCards.length; i++) {
        if (this.handCards[i].id === card.id) {
          this.handCards.splice(i, 1);
          i--;
        }
      }
    }
  }

  getDeck(): Card[] {
    return this.deck;
  }

  getHandCards(): Card[] {
    return this.handCards;
  }

  getOneHandCard(id: number): Card | undefined {
    return this.handCards.find((card) => card.id === id);
  }

  getFieldCards(): Card[] {
    return this.field;
  }

  getOneFieldCard(id: number): Card | undefined {
    return this.field.find((card) => card.id === id);
  }

  getGraveCards(): Card[] {
    return this.grave;
  }

  getOneGraveCard(id: number): Card | undefined {
    return this.grave.find((card) => card.id === id);
  }

  drawHandCards(context: CanvasRenderingContext2D, action: any) {
    let x = HAND_CARDS_COORDINATE.x;
    let y = HAND_CARDS_COORDINATE.y;

    for (let i = 0; i < this.handCards.length; i++) {
      this.handCards[i].drawFaceUpCard(context, x, y, this.playerType, action);
      x += CARD_INFO.width + CARD_INFO.spaceBetweenCard;
    }
  }

  drawFieldCards(context: CanvasRenderingContext2D, action: any) {
    let x = this.playerType === 'player' ? FIELD_CARDS_COORDINATE.x : FIELD_CARDS_COORDINATE.x1;
    let y = this.playerType === 'player' ? FIELD_CARDS_COORDINATE.y : FIELD_CARDS_COORDINATE.y1;

    for (let i = 0; i < this.field.length; i++) {
      this.field[i].drawFaceUpCard(context, x, y, this.playerType, action);
      x += CARD_INFO.width + CARD_INFO.spaceBetweenCard;
    }
  }

  drawDeck(context: CanvasRenderingContext2D, action: any) {
    let x = this.playerType === 'player' ? DECK_COORDINATE.x : DECK_COORDINATE.x1;
    let y = this.playerType === 'player' ? DECK_COORDINATE.y : DECK_COORDINATE.y1;
    let borderColor = 'white';

    // if has action
    if (action && this.playerType === 'player') {
      if (action.name == 'click-deck') {
        borderColor = 'red';
      }
    }

    // draw background
    context.beginPath();
    context.fillStyle = 'blue';
    context.fillRect(x, y, DECK_COORDINATE.width - 2, DECK_COORDINATE.height - 2);
    context.closePath();

    // draw card border
    context.beginPath();
    context.strokeStyle = borderColor;
    context.rect(x - 1, y - 1, DECK_COORDINATE.width, DECK_COORDINATE.height);
    context.stroke();
    context.closePath();
  }

  drawGrave(context: CanvasRenderingContext2D, action: any) {
    let x = this.playerType === 'player' ? GRAVE_COORDINATE.x : GRAVE_COORDINATE.x1;
    let y = this.playerType === 'player' ? GRAVE_COORDINATE.y : GRAVE_COORDINATE.y1;
    let borderColor = 'white';

    // if has action
    if (action && this.playerType === 'player') {
      if (action.name == 'click-grave') {
        borderColor = 'red';
      }
    }

    // draw background
    context.beginPath();
    context.fillStyle = 'grey';
    context.fillRect(x, y, GRAVE_COORDINATE.width - 2, GRAVE_COORDINATE.height - 2);
    context.closePath();

    // draw card border
    context.beginPath();
    context.strokeStyle = borderColor;
    context.rect(x - 1, y - 1, GRAVE_COORDINATE.width, GRAVE_COORDINATE.height);
    context.stroke();
    context.closePath();
  }
}
