import Player from '../Player';
import {
  INFO_CARD,
  INFO_CARD_ATK,
  INFO_CARD_DEF,
  INFO_CARD_DES,
  INFO_CARD_DES_TEXT,
  INFO_CARD_IMG,
  INFO_CARD_NAME,
  INFO_OPPONENT,
  INFO_OPPONENT_PHASE,
  INFO_OPPONENT_SCORE,
  INFO_PHASE,
  INFO_PHASE_BTN,
  INFO_PHASE_BTN_TEXT,
  INFO_PLAYER,
  INFO_PLAYER_PHASE,
  INFO_PLAYER_SCORE,
  INFO_VIEW,
} from '../../constant/INFO_VIEW';
import { IAction } from '../../types';
import { drawFillRect, drawFillText, drawRect } from '../../helper/draw';

export const drawViewInfo = (
  context: CanvasRenderingContext2D,
  player: Player,
  opponent: Player,
  action?: IAction,
) => {
  let phase = 'Next phase';
  if (player.getPhase() === 'attack') {
    phase = 'End phase';
  } else if (player.getPhase() === 'main') {
    phase = 'Next to Attack phase';
  }

  // Draw wrapper info view
  drawFillRect(context, INFO_VIEW);

  // Draw player info
  drawFillRect(context, INFO_PLAYER);
  drawFillText(context, INFO_PLAYER_SCORE, player.getScore());
  drawFillText(context, INFO_PLAYER_PHASE, `Phase: ${player.getPhase()}`);

  drawFillRect(context, INFO_OPPONENT);
  drawFillText(context, INFO_OPPONENT_SCORE, opponent.getScore());
  drawFillText(context, INFO_OPPONENT_PHASE, `Phase: ${opponent.getPhase()}`);

  // Draw view card info
  if (action?.type === 'card') {
    // bg
    drawFillRect(context, INFO_CARD);

    // name
    drawFillText(context, INFO_CARD_NAME, action?.payload?.idWithDeck);

    // img
    drawRect(context, INFO_CARD_IMG);

    // atk-def
    drawFillText(context, INFO_CARD_ATK, `ATK: ${action?.payload?.atk}`);
    drawFillText(context, INFO_CARD_DEF, `DEF: ${action?.payload?.def}`);

    // des
    drawFillRect(context, INFO_CARD_DES);
    drawFillText(context, INFO_CARD_DES_TEXT, action.payload.description);
  }
  // Draw Phase status
  // Phase
  drawFillRect(context, INFO_PHASE);
  // Button next phase
  if (player.getPhase() !== 'waiting') {
    drawFillRect(context, INFO_PHASE_BTN);
    drawFillText(context, INFO_PHASE_BTN_TEXT, phase);
  }
};
