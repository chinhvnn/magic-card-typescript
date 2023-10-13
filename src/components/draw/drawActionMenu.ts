import { ATK_BUTTON, CARD, CHANGE_POSITION_BUTTON, USE_EFFECT_BUTTON } from '../../constant/constant';
import { IAction } from '../../types';

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

export const drawActionMenu = (context: CanvasRenderingContext2D, action?: IAction) => {
  if (action?.name === 'click-hand-card' || action?.name === 'click-field-card') {
    const { attackBtn, changePositionBtn, useEffectBtn } = getActionMenuCoordinate(action);

    let text = '';
    if (action.name === 'click-hand-card') {
      text = 'Summon';
    }
    if (action.name === 'click-field-card') {
      if (action.payload.position === 'atk') {
        text = 'Attack';
      }
    }

    // Atk button
    context.beginPath();
    context.fillStyle = ATK_BUTTON.bg;
    context.fillRect(attackBtn.x, attackBtn.y, ATK_BUTTON.width, ATK_BUTTON.height);
    context.closePath();
    context.beginPath();
    context.fillStyle = 'red';
    context.fillText(text, attackBtn.x + 8, attackBtn.y + 18, ATK_BUTTON.width - 16);
    context.closePath();

    if (action.name === 'click-field-card') {
      // Change pos button
      context.beginPath();
      context.fillStyle = CHANGE_POSITION_BUTTON.bg;
      context.fillRect(
        changePositionBtn.x,
        changePositionBtn.y,
        CHANGE_POSITION_BUTTON.width,
        CHANGE_POSITION_BUTTON.height,
      );
      context.closePath();
      context.beginPath();
      context.fillStyle = 'red';
      context.fillText(
        'Change pos',
        changePositionBtn.x + 8,
        changePositionBtn.y + 18,
        CHANGE_POSITION_BUTTON.width - 16,
      );
      context.closePath();

      // Use effect button
      if (action.payload?.effect?.id) {
        context.beginPath();
        context.fillStyle = USE_EFFECT_BUTTON.bg;
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
