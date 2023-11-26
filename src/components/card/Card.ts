import { CARD, CARD_MAGIC_ZONE, SELECTED } from '../../constant/constant';
import {
  TCardPosition,
  IAction,
  IEffect,
  TPlayerType,
  TCardType,
  TCardFace,
  TCardPlace,
  IActionCount,
} from '../../types';

export default abstract class Card {
  public id: number;
  public idWithDeck: string = '';
  public x: number = 0;
  public y: number = 0;
  public width: number = CARD.width;
  public height: number = CARD.height;
  public attribute: string = '';
  public description?: string = 'des';
  public face: TCardFace;
  protected position: TCardPosition;
  public actionCount: IActionCount;
  public place?: TCardPlace;

  // public type: TCardType;
  // public atk?: number;
  // public def?: number;
  // public effect?: IEffect;
  // public actionCount?: IActionCount;

  constructor(
    id: number,
    face: TCardFace,
    position: TCardPosition,
    // atk: number,
    // def: number,
    // type: TCardType,
    // effect: IEffect,
    actionCount: IActionCount,
  ) {
    this.id = id;
    // this.type = type;
    // this.atk = atk;
    // this.def = def;
    this.face = face;
    this.position = position;
    // this.effect = effect;
    this.actionCount = actionCount;
  }

  getPosition() {
    return this.position;
  }

  setPosition(nextPosition: TCardPosition) {
    this.position = nextPosition;
  }

  setFace(face: TCardFace) {
    this.face = face;
  }

  getIdWithDeck() {
    return this.idWithDeck;
  }

  setIdWithDeck(idWithDeck: string) {
    this.idWithDeck = idWithDeck;
  }

  public drawCard(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    playerType: TPlayerType,
    from: TCardPlace,
    action?: IAction,
  ): void {
    let bgWidth, bgHeight, cardBorderWidth, cardBorderHeight, imgBorderWidth, imgBorderHeight;
    let card = from === 'magic-zone' ? CARD_MAGIC_ZONE : CARD;

    // calculator data
    if (this.position === 'atk') {
      // atk position
      bgWidth = card.width - 2;
      bgHeight = card.height - 2;
      cardBorderWidth = card.width;
      cardBorderHeight = card.height;
      imgBorderWidth = card.width - card.space * 2 - 2;
      imgBorderHeight = card.imgHeight;
    } else {
      // def position
      x = x - (card.height - card.width) / 2;
      y = y + (card.height - card.width) / 2;
      bgWidth = card.height - 2;
      bgHeight = card.width - 2;
      cardBorderWidth = card.height;
      cardBorderHeight = card.width;
      imgBorderWidth = card.imgHeight;
      imgBorderHeight = card.width - card.space * 2 - 2;
    }

    // Set new data
    this.x = x;
    this.y = y;
    this.width = cardBorderWidth;
    this.height = cardBorderHeight;
    this.place = from;

    if (context) {
      let borderColor = 'white';

      // draw background
      context.beginPath();
      context.save();
      // context.translate(x + card.width / 2, y + card.height / 2);
      if (action) {
        if (playerType === 'player') {
          // Hover selected card
          if (
            (action.name === 'click-hand-card' || action.name === 'click-field-card') &&
            this.idWithDeck == action.payload.idWithDeck
          ) {
            context.shadowBlur = 30;
            context.shadowColor = SELECTED.shadowColor;
            borderColor = SELECTED.borderColor;
          }
        }
        if (playerType === 'opponent') {
          // check if card in field & attack
          if (action.name === 'click-attack') {
            if (this.place === 'field') {
              context.shadowBlur = 30;
              context.shadowColor = 'red';
              borderColor = 'red';
            }
          }
          // Hover selected card
          if (action.name === 'click-opponent-field-card' && this.idWithDeck == action.payload.idWithDeck) {
            context.shadowBlur = 30;
            context.shadowColor = SELECTED.shadowColor;
            borderColor = SELECTED.borderColor;
          }
        }
      }
      context.fillStyle = 'white';
      context.fillRect(x, y, bgWidth, bgHeight);
      context.restore();
      context.closePath();

      // draw card border
      context.beginPath();
      context.save();
      context.rect(x - 1, y - 1, cardBorderWidth, cardBorderHeight);
      context.strokeStyle = borderColor;
      context.stroke();
      context.restore();
      context.closePath();

      if (
        (from === 'hand' && playerType === 'player') ||
        (this.face === 'up' && (from === 'field' || from === 'magic-zone'))
      ) {
        // draw card name
        context.beginPath();
        context.save();
        context.fillStyle = 'red';
        context.font = card.titleFont;
        if (this.position === 'def') {
          const xTrans = x + card.space + card.titleHeight / 2;
          const yTrans = y + card.space + card.titleHeight / 2;
          context.textAlign = 'right';
          context.translate(xTrans, yTrans);
          context.rotate(-Math.PI / 2);
          context.translate(-xTrans, -yTrans);
        }
        context.fillText(
          this.idWithDeck.toString(),
          x + card.space,
          y + card.space + card.titleHeight / 2,
          card.width - card.space * 2,
        );
        context.restore();
        context.closePath();

        // draw card image border
        context.beginPath();
        context.save();
        context.strokeStyle = 'black';
        if (this.position === 'def') {
          const xTrans = x + card.space + (card.width - card.space * 2 - 2) / 2;
          const yTrans = y + card.space * 2 + card.titleHeight + card.imgHeight / 2 - 10;
          context.translate(xTrans, yTrans);
          context.rotate(-Math.PI / 2);
          context.translate(-xTrans, -yTrans);
        }
        context.rect(
          x + card.space,
          y + card.space * 2 + card.titleHeight,
          card.width - card.space * 2 - 2,
          card.imgHeight,
        );
        context.stroke();
        context.restore();
        context.closePath();
      }
    }
  }
}
