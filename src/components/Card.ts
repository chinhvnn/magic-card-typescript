import { CARD, CARD_MAGIC_ZONE, SELECTED } from '../constant/constant';
import { TCardPosition, IAction, IEffect, TPlayerType, TCardType, TCardFace, TCardPlace } from '../types';

export default class Card {
  public id: number;
  public idWithDeck: string = '';
  public x: number = 0;
  public y: number = 0;
  public width: number = CARD.width;
  public height: number = CARD.height;
  public type: TCardType;
  public position: TCardPosition;
  public face: TCardFace;
  public atk: number;
  public def: number;
  public effect: IEffect;
  public description: string = 'des';
  public attribute: string = '';
  public actionCount: any = { atk: 0, useEffect: 0 };
  public place?: TCardPlace;

  constructor(
    id: number,
    atk: number,
    def: number,
    face: TCardFace,
    type: TCardType,
    effect: IEffect,
    position: TCardPosition,
  ) {
    this.id = id;
    this.type = type;
    this.atk = atk;
    this.def = def;
    this.face = face;
    this.position = position;
    this.effect = effect;
  }

  changePosition(nextPosition: TCardPosition) {
    this.position = nextPosition;
  }

  setFace(face: TCardFace) {
    this.face = face;
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
    let card = from === 'magic-zone' ? CARD_MAGIC_ZONE : CARD;
    let bgWidth = card.width - 2;
    let bgHeight = card.height - 2;
    let cardBorderWidth = card.width;
    let cardBorderHeight = card.height;
    let imgBorderWidth = card.width - card.space * 2 - 2;
    let imgBorderHeight = card.imgHeight;
    this.place = from;

    if (this.position === 'atk') {
    } else if (this.position === 'def') {
      x = x - (card.height - card.width) / 2;
      y = y + (card.height - card.width) / 2;
      bgWidth = card.height - 2;
      bgHeight = card.width - 2;
      cardBorderWidth = card.height;
      cardBorderHeight = card.width;
      imgBorderWidth = card.imgHeight;
      imgBorderHeight = card.width - card.space * 2 - 2;
    }

    this.x = x;
    this.y = y;
    this.width = cardBorderWidth;
    this.height = cardBorderHeight;

    if (context) {
      let borderColor = 'white';

      // draw background
      context.beginPath();
      context.save();
      // context.translate(x + card.width / 2, y + card.height / 2);
      if (action) {
        if (playerType === 'player') {
          if (
            (action.name === 'click-hand-card' || action.name === 'click-field-card') &&
            this.idWithDeck == action.payload.idWithDeck
          ) {
            context.shadowBlur = 30;
            context.shadowColor = SELECTED.shadowColor;
            borderColor = 'blue';
          }
        }
        if (playerType === 'opponent') {
          if (action.name === 'click-attack') {
            // check if card in field
            if (this.place === 'field') {
              context.shadowBlur = 30;
              context.shadowColor = 'red';
              borderColor = 'red';
            }
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

        // draw card description
        context.beginPath();
        context.save();
        context.fillStyle = 'red';
        context.font = card.descFont;
        if (this.position === 'def') {
          const xTrans = x + 2 + card.width / 2 - 5;
          const yTrans = y + card.space * 3 + card.titleHeight + card.imgHeight - 45;
          context.translate(xTrans, yTrans);
          context.rotate(-Math.PI / 2);
          context.translate(-xTrans, -yTrans);
        }
        context.fillText(
          `ATK: ${this.atk}`,
          x + 2,
          y + card.space * 3 + card.titleHeight + card.imgHeight + card.desHeight,
          // card.width - card.space * 2
        );
        context.fillText(
          `DEF: ${this.def}`,
          x + 2,
          y + card.space * 3 + card.titleHeight + card.imgHeight + card.desHeight + card.descSpace,
          // card.width - card.space * 2
        );
        context.restore();
        context.closePath();
      }
    }
  }
}
