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

export default class EffectCard extends Card {
  public cardType: TCardType = 'effect';
  public effectDamage = 0;
  public effectBuff = 0;

  constructor(id: number, face: TCardFace, position: TCardPosition, actionCount: IActionCount) {
    super(id, face, position, actionCount);
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

    // draw card description
  }
}
