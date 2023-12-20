import { HAND_CARDS_WRAPPER, SCREEN } from '../../constant/constant';
import { drawFillRect, drawRect } from '../../helper/draw';
import { IAction } from '../../types';
import Player from '../Player';

export const drawMainFrame = (
  context: CanvasRenderingContext2D,
  player?: Player,
  opponent?: Player,
  action?: IAction,
) => {
  // Draw background game
  drawFillRect(context, SCREEN);

  // Draw player hand-card wrapper
  drawFillRect(context, HAND_CARDS_WRAPPER);
  drawRect(context, HAND_CARDS_WRAPPER);

  // Draw opponent hand-card wrapper
  //...
};
