import {
  CARD,
  DECK,
  FIELD_CARDS,
  GRAVE,
  HAND_CARDS,
  MAGIC,
  OPPONENT_FIELD_CARDS,
  OPPONENT_HAND_CARDS,
  OPPONENT_MAGIC,
} from '../constant/constant';
import { drawRect } from '../helper/draw';
import { IPlayerType, TCardFace, TCardPlace, TCardPosition } from '../types';
import Card from './Card';

export default class Player {
  protected playerType: IPlayerType;
  private handCards: Card[] = [];
  private field: Card[] = [];
  private magicZone: Card[] = [];
  private grave: Card[] = [];
  private deck: Card[];
  private score: number = 4000;

  constructor(playerType: IPlayerType, deck: Card[]) {
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

  playOneCard(id: number, face: TCardFace, position: TCardPosition, from: TCardPlace, goTo: TCardPlace) {
    let goToPlace, card, fromPlace;

    switch (goTo) {
      case 'deck':
        goToPlace = this.deck;
        break;
      case 'hand':
        goToPlace = this.handCards;
        break;
      case 'field':
        goToPlace = this.field;
        break;
      case 'grave':
        goToPlace = this.grave;
        break;
      case 'magic-zone':
        goToPlace = this.magicZone;
        break;

      default:
        break;
    }

    switch (from) {
      case 'deck':
        // card = this.getOnDeckCard(id);
        break;
      case 'hand':
        card = this.getOneHandCard(id);
        fromPlace = this.handCards;
        break;
      case 'field':
        card = this.getOneFieldCard(id);
        fromPlace = this.field;
        break;
      case 'grave':
        card = this.getOneGraveCard(id);
        fromPlace = this.grave;
        break;
      case 'magic-zone':
        // card = this.getOneMagicCard(id);
        break;

      default:
        break;
    }

    if (card && goToPlace && fromPlace) {
      // add card to field
      card.setFace(face);
      card.changePosition(position);
      goToPlace.push(card);

      // remove card in hand
      for (let i = 0; i < fromPlace.length; i++) {
        if (fromPlace[i].id === card.id) {
          fromPlace.splice(i, 1);
          i--;
        }
      }
      console.log('111 playOneCard', id, card, this.field);
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

  getMagicCards(): Card[] {
    return this.magicZone;
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
    let x = this.playerType === 'player' ? HAND_CARDS.x : OPPONENT_HAND_CARDS.x;
    let y = this.playerType === 'player' ? HAND_CARDS.y : OPPONENT_HAND_CARDS.y;
    let space =
      this.playerType === 'player' ? HAND_CARDS.spaceBetweenCard : OPPONENT_HAND_CARDS.spaceBetweenCard;

    for (let i = 0; i < this.handCards.length; i++) {
      this.handCards[i].drawCard(context, x, y, this.playerType, 'hand', action);
      x += CARD.width + space;
    }
  }

  drawFieldCards(context: CanvasRenderingContext2D, action: any) {
    let positionSpace = (CARD.height - CARD.width) / 2;
    let x = (this.playerType === 'player' ? FIELD_CARDS.x : OPPONENT_FIELD_CARDS.x) + positionSpace;
    let y = (this.playerType === 'player' ? FIELD_CARDS.y : OPPONENT_FIELD_CARDS.y) - positionSpace;
    let space =
      this.playerType === 'player' ? FIELD_CARDS.spaceBetweenCard : OPPONENT_FIELD_CARDS.spaceBetweenCard;

    for (let i = 0; i < this.field.length; i++) {
      this.field[i].drawCard(context, x, y, this.playerType, 'field', action);
      x += CARD.height + space;
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

  drawMagic(context: CanvasRenderingContext2D, action: any) {
    let borderColor = 'white';
    let magic = this.playerType === 'player' ? MAGIC : OPPONENT_MAGIC;

    const magic2 = { ...magic, x: magic.x - magic.width - 10 };
    const magic3 = { ...magic, y: magic.y + magic.height + 10 };
    const env = { ...magic2, y: magic2.y + magic2.height + 10 };

    // Draw grid
    drawRect(context, magic);
    drawRect(context, magic2);
    drawRect(context, magic3);
    drawRect(context, env);

    // Draw card
    this.magicZone[0] &&
      this.magicZone[0].drawCard(context, magic.x + 1, magic.y + 1, this.playerType, 'magic-zone', action);
    this.magicZone[1] &&
      this.magicZone[1].drawCard(context, magic2.x + 1, magic2.y + 1, this.playerType, 'magic-zone', action);
    this.magicZone[2] &&
      this.magicZone[2].drawCard(context, magic3.x + 1, magic3.y + 1, this.playerType, 'magic-zone', action);

    console.log('111', this.magicZone);
  }
}
