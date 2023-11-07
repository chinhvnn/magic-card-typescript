import { CARD } from '../../constant/constant';
import {
  IAction,
  IActionCount,
  TCardFace,
  TCardPlace,
  TCardPosition,
  TCardType,
  TPlayerType,
} from '../../types';
import Card from './Card';

export default class MonsterCard extends Card {
  public cardType: TCardType = 'monster';
  public atk: number;
  public def: number;

  constructor(
    id: number,
    face: TCardFace,
    position: TCardPosition,
    actionCount: IActionCount,
    atk: number,
    def: number,
  ) {
    super(id, face, position, actionCount);

    this.atk = atk;
    this.def = def;
  }

  public drawCard(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    playerType: TPlayerType,
    from: TCardPlace,
    action?: IAction,
  ) {
    // overloading
    super.drawCard(context, x, y, playerType, from, action);

    // draw card attack & defend
    if (
      (from === 'hand' && playerType === 'player') ||
      (this.face === 'up' && (from === 'field' || from === 'magic-zone'))
    ) {
      context.beginPath();
      context.save();
      context.fillStyle = 'red';
      context.font = CARD.descFont;
      if (this.position === 'def') {
        const xTrans = x + 2 + CARD.width / 2 - 5;
        const yTrans = y + CARD.space * 3 + CARD.titleHeight + CARD.imgHeight - 30;
        context.translate(xTrans, yTrans);
        context.rotate(-Math.PI / 2);
        context.translate(-xTrans, -yTrans);
      }
      context.fillText(
        `ATK: ${this.atk}`,
        x + 2,
        y + CARD.space * 3 + CARD.titleHeight + CARD.imgHeight + CARD.desHeight,
        // CARD.width - CARD.space * 2
      );
      context.fillText(
        `DEF: ${this.def}`,
        x + 2,
        y + CARD.space * 3 + CARD.titleHeight + CARD.imgHeight + CARD.desHeight + CARD.descSpace,
        // CARD.width - CARD.space * 2
      );
      context.restore();
      context.closePath();
    }
  }
}
