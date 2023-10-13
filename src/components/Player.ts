import { CARD_INFO, DECK, FIELD_CARDS, GRAVE, HAND_CARDS, OPPONENT_FIELD_CARDS, SCREEN } from '../constant';
import Card from './Card';

export default class Player {
  protected playerType: string;
  private handCards: Card[] = [];
  private field: Card[] = [];
  private grave: Card[] = [];
  private deck: Card[];
  private score: number = 4000;

  constructor(playerType: string, deck: Card[]) {
    this.playerType = playerType;
    this.deck = deck;
  }

  changeScore(damageType: string, damage: number) {
    if (damageType === 'atk' && damage > 0) {
      this.score = this.score - damage;
    }
  }

  addCardFromDeckToHand(cards: Card[]) {
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

  removeCardFromFieldToGrave(cards: Card[]) {
    // add cards to grave
    this.grave.push(...cards);

    // remove cards in field
    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < cards.length; j++) {
        if (this.field[i].id === cards[j].id) {
          this.field.splice(i, 1);
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

  getScore(): number {
    return this.score;
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

  getOneFieldCard(id: number): Card {
    return this.field.find((card) => card.id === id) as Card;
  }

  getGraveCards(): Card[] {
    return this.grave;
  }

  getOneGraveCard(id: number): Card | undefined {
    return this.grave.find((card) => card.id === id) as Card;
  }

  drawHandCards(context: CanvasRenderingContext2D, action: any) {
    let x = HAND_CARDS.x;
    let y = HAND_CARDS.y;

    for (let i = 0; i < this.handCards.length; i++) {
      this.handCards[i].drawFaceUpCard(context, x, y, this.playerType, action);
      x += CARD_INFO.width + HAND_CARDS.spaceBetweenCard;
    }
  }

  drawFieldCards(context: CanvasRenderingContext2D, action: any) {
    let positionSpace = (CARD_INFO.height - CARD_INFO.width) / 2;
    let x = (this.playerType === 'player' ? FIELD_CARDS.x : OPPONENT_FIELD_CARDS.x) + positionSpace;
    let y = (this.playerType === 'player' ? FIELD_CARDS.y : OPPONENT_FIELD_CARDS.y) - positionSpace;

    for (let i = 0; i < this.field.length; i++) {
      this.field[i].drawFaceUpCard(context, x, y, this.playerType, action);
      x += CARD_INFO.height + FIELD_CARDS.spaceBetweenCard;
    }
  }

  drawDeck(context: CanvasRenderingContext2D, action: any) {
    let x = this.playerType === 'player' ? DECK.x : DECK.x1;
    let y = this.playerType === 'player' ? DECK.y : DECK.y1;
    let borderColor = 'white';

    // if has action
    if (action && this.playerType === 'player') {
      if (action.name == 'click-deck') {
        borderColor = 'red';
      }
    }

    // draw background
    context.beginPath();
    context.fillStyle = DECK.bg;
    context.fillRect(x, y, DECK.width - 2, DECK.height - 2);
    context.closePath();

    // draw card border
    context.beginPath();
    context.strokeStyle = borderColor;
    context.rect(x - 1, y - 1, DECK.width, DECK.height);
    context.stroke();
    context.closePath();
  }

  drawGrave(context: CanvasRenderingContext2D, action: any) {
    let x = this.playerType === 'player' ? GRAVE.x : GRAVE.x1;
    let y = this.playerType === 'player' ? GRAVE.y : GRAVE.y1;
    let borderColor = 'white';

    // if has action
    if (action && this.playerType === 'player') {
      if (action.name == 'click-grave') {
        borderColor = 'red';
      }
    }

    // draw background
    context.beginPath();
    context.fillStyle = GRAVE.bg;
    context.fillRect(x, y, GRAVE.width - 2, GRAVE.height - 2);
    context.closePath();

    // draw card border
    context.beginPath();
    context.strokeStyle = borderColor;
    context.rect(x - 1, y - 1, GRAVE.width, GRAVE.height);
    context.stroke();
    context.closePath();
  }
}
