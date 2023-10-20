import * as C from '../constant/constant';
import { drawFillRect, drawRect } from '../helper/draw';
import { TPlayerPhase, TPlayerType, TCardFace, TCardPlace, TCardPosition } from '../types';
import Card from './Card';

export default class Player {
  protected playerType: TPlayerType;
  private handCards: Card[] = [];
  private field: Card[] = [];
  private magicZone: Card[] = [];
  private grave: Card[] = [];
  private deck: Card[];
  private score: number = 4000;
  private phase: TPlayerPhase = 'waiting';

  constructor(playerType: TPlayerType, deck: Card[]) {
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
        if (this.deck[i].idWithDeck === cards[j].idWithDeck) {
          this.deck.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }

  setPhase(phase: TPlayerPhase) {
    this.phase = phase;
  }

  setNextPhase() {
    switch (this.phase) {
      case 'main':
        this.phase = 'attack';
        break;
      case 'attack':
        this.phase = 'waiting';
        break;
      case 'waiting':
        this.phase = 'main';
        break;

      default:
        break;
    }
  }

  playOneCard(
    idWithDeck: string,
    face: TCardFace,
    position: TCardPosition,
    from: TCardPlace,
    goTo: TCardPlace,
  ) {
    let goToPlace,
      card,
      fromPlace,
      validate = true;

    switch (goTo) {
      case 'deck':
        goToPlace = this.deck;
        break;
      case 'hand':
        goToPlace = this.handCards;
        validate = goToPlace?.length < C.MAX_ITEM.hand;
        break;
      case 'field':
        goToPlace = this.field;
        validate = goToPlace?.length < C.MAX_ITEM.field;
        break;
      case 'grave':
        goToPlace = this.grave;
        break;
      case 'magic-zone':
        goToPlace = this.magicZone;
        validate = goToPlace?.length < C.MAX_ITEM.effect;
        break;

      default:
        break;
    }

    switch (from) {
      case 'deck':
        // card = this.getOnDeckCard(idWithDeck);
        break;
      case 'hand':
        card = this.getOneHandCard(idWithDeck);
        fromPlace = this.handCards;
        break;
      case 'field':
        card = this.getOneFieldCard(idWithDeck);
        fromPlace = this.field;
        break;
      case 'grave':
        card = this.getOneGraveCard(idWithDeck);
        fromPlace = this.grave;
        break;
      case 'magic-zone':
        // card = this.getOneMagicCard(idWithDeck);
        break;

      default:
        break;
    }
    console.log('INFO', goToPlace, fromPlace);

    if (card && goToPlace && fromPlace && fromPlace?.length > 0 && validate) {
      // add card to field
      card.setFace(face);
      card.changePosition(position);
      goToPlace.push(card);

      // remove card in hand
      for (let i = 0; i < fromPlace.length; i++) {
        if (fromPlace[i].idWithDeck === card.idWithDeck) {
          fromPlace.splice(i, 1);
          i--;
        }
      }
    } else {
      console.log('INFO-playOneCard: fail', idWithDeck, card);
    }
  }

  getPhase(): TPlayerPhase {
    return this.phase;
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

  getFieldCards(): Card[] {
    return this.field;
  }

  getMagicCards(): Card[] {
    return this.magicZone;
  }

  getOneHandCard(idWithDeck: string): Card | undefined {
    return this.handCards.find((card) => card.idWithDeck === idWithDeck);
  }

  getOneFieldCard(idWithDeck: string): Card {
    return this.field.find((card) => card.idWithDeck === idWithDeck) as Card;
  }

  getGraveCards(): Card[] {
    return this.grave;
  }

  getOneGraveCard(idWithDeck: string): Card | undefined {
    return this.grave.find((card) => card.idWithDeck === idWithDeck) as Card;
  }

  drawHandCards(context: CanvasRenderingContext2D, action: any) {
    let x = this.playerType === 'player' ? C.HAND_CARDS.x : C.OPPONENT_HAND_CARDS.x;
    let y = this.playerType === 'player' ? C.HAND_CARDS.y : C.OPPONENT_HAND_CARDS.y;
    let space =
      this.playerType === 'player' ? C.HAND_CARDS.spaceBetweenCard : C.OPPONENT_HAND_CARDS.spaceBetweenCard;

    for (let i = 0; i < this.handCards.length; i++) {
      this.handCards[i].drawCard(context, x, y, this.playerType, 'hand', action);
      x += C.CARD.width + space;
    }
  }

  drawFieldCards(context: CanvasRenderingContext2D, action: any) {
    let positionSpace = (C.CARD.height - C.CARD.width) / 2;
    let x = (this.playerType === 'player' ? C.FIELD_CARDS.x : C.OPPONENT_FIELD_CARDS.x) + positionSpace;
    let y = (this.playerType === 'player' ? C.FIELD_CARDS.y : C.OPPONENT_FIELD_CARDS.y) - positionSpace;
    let space =
      this.playerType === 'player' ? C.FIELD_CARDS.spaceBetweenCard : C.OPPONENT_FIELD_CARDS.spaceBetweenCard;

    for (let i = 0; i < this.field.length; i++) {
      this.field[i].drawCard(context, x, y, this.playerType, 'field', action);
      x += C.CARD.height + space;
    }
  }

  drawDeck(context: CanvasRenderingContext2D, action: any) {
    const deck = this.playerType === 'player' ? C.DECK : C.OPPONENT_DECK;
    let borderColor = 'white';

    // if has action
    if (action && this.playerType === 'player') {
      if (action.name == 'click-deck') {
        borderColor = 'red';
      }
    }

    // draw background
    drawFillRect(context, deck);

    // draw card border
    drawRect(context, { ...deck, strokeStyle: borderColor });
  }

  drawGrave(context: CanvasRenderingContext2D, action: any) {
    const grave = this.playerType === 'player' ? C.GRAVE : C.OPPONENT_GRAVE;
    let borderColor = 'white';

    // if has action
    if (action && this.playerType === 'player') {
      if (action.name == 'click-grave') {
        borderColor = 'red';
      }
    }

    // draw background
    drawFillRect(context, grave);

    // draw card border
    drawRect(context, { ...grave, strokeStyle: borderColor });
  }

  drawMagic(context: CanvasRenderingContext2D, action: any) {
    let borderColor = 'white';
    let magic = this.playerType === 'player' ? C.MAGIC : C.OPPONENT_MAGIC;

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
