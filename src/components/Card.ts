import { CARD_INFO, SCREEN } from '../constant';
import { TCardPosition, IAction, IEffect } from '../types';

export default class Card {
  public id: number;
  public x: number = 0;
  public y: number = 0;
  public width: number = CARD_INFO.width;
  public height: number = CARD_INFO.height;
  public position: TCardPosition;
  public atk: number;
  public def: number;
  public effect: IEffect;
  public description: string = '';
  public attribute: string = '';

  constructor(id: number, atk: number, def: number, effect: IEffect, position: TCardPosition) {
    this.id = id;
    this.atk = atk;
    this.def = def;
    this.position = position;
    this.effect = effect;
  }

  changePosition(nextPosition: TCardPosition) {
    this.position = nextPosition;
  }

  public drawFaceUpCard(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    playerType: string,
    action?: IAction,
  ): void {
    let bgWidth = CARD_INFO.width - 2;
    let bgHeight = CARD_INFO.height - 2;
    let cardBorderWidth = CARD_INFO.width;
    let cardBorderHeight = CARD_INFO.height;
    let imgBorderWidth = CARD_INFO.width - CARD_INFO.space * 2 - 2;
    let imgBorderHeight = CARD_INFO.imgHeight;

    if (this.position === 'atk') {
    } else if (this.position === 'def') {
      x = x - (CARD_INFO.height - CARD_INFO.width) / 2;
      y = y + (CARD_INFO.height - CARD_INFO.width) / 2;
      bgWidth = CARD_INFO.height - 2;
      bgHeight = CARD_INFO.width - 2;
      cardBorderWidth = CARD_INFO.height;
      cardBorderHeight = CARD_INFO.width;
      imgBorderWidth = CARD_INFO.imgHeight;
      imgBorderHeight = CARD_INFO.width - CARD_INFO.space * 2 - 2;
    }

    this.x = x;
    this.y = y;
    this.width = cardBorderWidth;
    this.height = cardBorderHeight;

    if (context) {
      let borderColor: string = 'white';

      if (action) {
        if (playerType === 'player') {
          if (
            (action.name === 'click-hand-card' || action.name === 'click-field-card') &&
            this.id == action.payload.id
          ) {
            borderColor = 'red';
          }
        }
        if (playerType === 'computer') {
          if (action.name === 'click-attack') {
            borderColor = 'blue';
          }
        }
      }

      // // Save point
      // context.save();
      // context.translate(400, y);
      // context.rotate((90 * Math.PI) / 180);

      // draw background
      context.beginPath();
      // context.translate(x + CARD_INFO.width / 2, y + CARD_INFO.height / 2);
      context.fillStyle = 'white';
      context.fillRect(x, y, bgWidth, bgHeight);
      context.closePath();

      // draw card border
      context.beginPath();
      context.strokeStyle = borderColor;
      context.rect(x - 1, y - 1, cardBorderWidth, cardBorderHeight);
      context.stroke();
      context.closePath();

      // draw card name
      context.beginPath();
      context.fillStyle = 'red';
      context.font = CARD_INFO.titleFont;
      context.save();
      if (this.position === 'def') {
        const xTrans = x + CARD_INFO.space + CARD_INFO.titleHeight / 2;
        const yTrans = y + CARD_INFO.space + CARD_INFO.titleHeight / 2;
        context.translate(xTrans, yTrans);
        context.rotate(-Math.PI / 2);
        context.translate(-xTrans, -yTrans);
      }
      context.fillText(
        this.id.toString(),
        x + CARD_INFO.space,
        y + CARD_INFO.space + CARD_INFO.titleHeight / 2,
        CARD_INFO.width - CARD_INFO.space * 2,
      );
      context.restore();
      context.closePath();

      // draw card image border
      context.beginPath();
      context.save();
      context.strokeStyle = 'black';
      if (this.position === 'def') {
        const xTrans = x + CARD_INFO.space + (CARD_INFO.width - CARD_INFO.space * 2 - 2) / 2;
        const yTrans = y + CARD_INFO.space * 2 + CARD_INFO.titleHeight + CARD_INFO.imgHeight / 2 - 10;
        context.translate(xTrans, yTrans);
        context.rotate(-Math.PI / 2);
        context.translate(-xTrans, -yTrans);
      }
      context.rect(
        x + CARD_INFO.space,
        y + CARD_INFO.space * 2 + CARD_INFO.titleHeight,
        CARD_INFO.width - CARD_INFO.space * 2 - 2,
        CARD_INFO.imgHeight,
      );
      context.stroke();
      context.restore();
      context.closePath();

      // draw card description
      context.beginPath();
      context.fillStyle = 'red';
      context.font = CARD_INFO.descFont;
      context.save();
      if (this.position === 'def') {
        const xTrans = x + 2 + CARD_INFO.width / 2 - 5;
        const yTrans = y + CARD_INFO.space * 3 + CARD_INFO.titleHeight + CARD_INFO.imgHeight - 45;
        context.translate(xTrans, yTrans);
        context.rotate(-Math.PI / 2);
        context.translate(-xTrans, -yTrans);
      }
      context.fillText(
        `ATK: ${this.atk}`,
        x + 2,
        y + CARD_INFO.space * 3 + CARD_INFO.titleHeight + CARD_INFO.imgHeight + 11 / 2,
        // CARD_INFO.width - CARD_INFO.space * 2
      );
      context.fillText(
        `DEF: ${this.def}`,
        x + 2,
        y + CARD_INFO.space * 3 + CARD_INFO.titleHeight + CARD_INFO.imgHeight + 11 / 2 + 12,
        // CARD_INFO.width - CARD_INFO.space * 2
      );
      context.restore();
      context.closePath();

      // Restore canvas state as saved from above
      // context.restore();
    }
  }

  public drawFaceDownCard(context: CanvasRenderingContext2D, x: number, y: number) {}
}
