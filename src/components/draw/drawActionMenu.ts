import {
  ATK_BUTTON,
  CARD,
  CHANGE_POSITION_BUTTON,
  USE_EFFECT_BUTTON,
  MAGIC_BUTTON,
  CARD_MAGIC_ZONE,
} from '../../constant/constant';
import { drawFillCircle, drawFillRect, drawFillText } from '../../helper/draw';
import { IAction, TPlayerPhase } from '../../types';

export const getActionMenuCoordinate = (action: IAction) => {
  let attackBtn = { x: 0, y: 0 };
  let changePositionBtn = { x: 0, y: 0 };
  let useEffectBtn = { x: 0, y: 0 };
  let yPlus: number = action && action.payload.position === 'def' ? -(CARD.height - CARD.width) / 2 : 0;

  if (action.payload) {
    attackBtn = { x: action.payload?.x, y: action?.payload?.y - 35 + yPlus };
    changePositionBtn = { x: attackBtn.x + ATK_BUTTON.width + 3, y: action?.payload.y - 35 + yPlus };
    useEffectBtn = {
      x: changePositionBtn.x + CHANGE_POSITION_BUTTON.width + 3,
      y: action?.payload.y - 35 + yPlus,
    };
  }
  return {
    attackBtn: { ...ATK_BUTTON, ...attackBtn },
    changePositionBtn: { ...CHANGE_POSITION_BUTTON, ...changePositionBtn },
    useEffectBtn: { ...USE_EFFECT_BUTTON, ...useEffectBtn },
  };
};

export const getMagicMenuCoordinate = (action: IAction) => {
  let magicBtn = { x: 0, y: 0 };

  if (action.payload) {
    magicBtn = {
      x: action.payload?.x + 3,
      y: action?.payload?.y + 10,
    };
    // magicBtn = {
    //   x: action.payload?.x + CARD_MAGIC_ZONE.width / 2 - 1,
    //   y: action?.payload?.y + CARD_MAGIC_ZONE.height / 2 - 1,
    // };
  }
  return {
    magicBtn: { ...MAGIC_BUTTON, ...magicBtn },
  };
};

export const drawActionMenu = (context: CanvasRenderingContext2D, phase: TPlayerPhase, action?: IAction) => {
  if (action?.name === 'click-field-card' || (action?.name === 'click-hand-card' && phase === 'main')) {
    const { attackBtn, changePositionBtn, useEffectBtn } = getActionMenuCoordinate(action);

    let textBtn1 = '';
    if (action.name === 'click-hand-card') {
      if (action.payload.cardType === 'monster') {
        textBtn1 = 'Summon';
      }
      if (action.payload.cardType === 'effect') {
        textBtn1 = 'Use Effect';
      }
    }
    if (action.name === 'click-field-card') {
      if (action.payload.position === 'atk') {
        textBtn1 = 'Attack';
      }
    }

    let textBtn2 = '';
    if (action.name === 'click-hand-card') {
      textBtn2 = 'Set';
    }
    if (action.name === 'click-field-card') {
      textBtn2 = action.payload.face === 'up' ? 'Change pos' : 'Face up';
    }

    // Summon/Atk/Use effect button
    drawFillRect(context, attackBtn);
    drawFillText(
      context,
      { x: attackBtn.x + 6, y: attackBtn.y + 16, maxWidth: ATK_BUTTON.width - 16, textColor: 'red' },
      textBtn1,
    );

    // Change pos button
    drawFillRect(context, changePositionBtn);
    drawFillText(
      context,
      {
        x: changePositionBtn.x + 6,
        y: changePositionBtn.y + 16,
        maxWidth: CHANGE_POSITION_BUTTON.width - 16,
        textColor: 'red',
      },
      textBtn2,
    );

    if (action.name === 'click-field-card') {
      // Use effect button
      if (action.payload?.effect?.idWithDeck) {
        context.beginPath();
        context.fillStyle = USE_EFFECT_BUTTON.fillStyle;
        context.fillRect(useEffectBtn.x, useEffectBtn.y, USE_EFFECT_BUTTON.width, USE_EFFECT_BUTTON.height);
        context.closePath();
        context.beginPath();
        context.fillStyle = 'red';
        context.fillText('Use effect', useEffectBtn.x + 8, useEffectBtn.y + 18, USE_EFFECT_BUTTON.width - 16);
        context.closePath();
      }
    }
  }
};

export const drawMagicActionMenu = (
  context: CanvasRenderingContext2D,
  phase: TPlayerPhase,
  action?: IAction,
) => {
  if (action?.name === 'click-magic-card' && phase !== 'waiting') {
    const { magicBtn } = getMagicMenuCoordinate(action);
    drawFillRect(context, magicBtn);
    drawFillText(context, { ...magicBtn, x: magicBtn.x + 2, y: magicBtn.y + 20, textColor: 'red' }, 'Active');
  }
};
