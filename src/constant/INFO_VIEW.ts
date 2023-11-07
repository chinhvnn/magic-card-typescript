import { SCREEN } from './constant';

export const INFO_VIEW = {
  x: SCREEN.width - 150,
  y: 0,
  width: 150,
  height: SCREEN.height,
  fillStyle: '#ABABAB',
};

export const INFO_PLAYER = {
  x: INFO_VIEW.x,
  y: SCREEN.height - 100,
  width: 150,
  height: 50,
  fillStyle: '#8FD24B',
};

export const INFO_PLAYER_SCORE = {
  x: INFO_PLAYER.x + 5,
  y: INFO_PLAYER.y + 18,
  font: 'bold 14px Arial',
  fillStyle: 'red',
};

export const INFO_PLAYER_PHASE = {
  x: INFO_PLAYER_SCORE.x,
  y: INFO_PLAYER_SCORE.y + 18,
  font: 'bold 14px Arial',
  fillStyle: 'blue',
};

export const INFO_OPPONENT = {
  x: INFO_VIEW.x,
  y: INFO_VIEW.y + 10,
  width: 150,
  height: 50,
  fillStyle: '#8FD24B',
};

export const INFO_OPPONENT_SCORE = {
  x: INFO_OPPONENT.x + 5,
  y: INFO_OPPONENT.y + 18,
  font: 'bold 14px Arial',
  fillStyle: 'red',
};
export const INFO_OPPONENT_PHASE = {
  x: INFO_OPPONENT_SCORE.x,
  y: INFO_OPPONENT_SCORE.y + 18,
  font: 'bold 14px Arial',
  fillStyle: 'blue',
};

export const INFO_CARD = {
  x: INFO_VIEW.x + 5,
  y: INFO_OPPONENT.y + INFO_OPPONENT.height + 10,
  width: 140,
  height: 193,
  fillStyle: 'white',
};

export const INFO_CARD_NAME = {
  x: INFO_CARD.x + 5,
  y: INFO_CARD.y + 18,
  font: 'bold 14px Arial',
  fillStyle: 'black',
};

export const INFO_CARD_IMG = {
  x: INFO_CARD_NAME.x,
  y: INFO_CARD_NAME.y + 15,
  width: INFO_CARD.width - 10,
  height: INFO_CARD.width - 30,
  strokeStyle: 'black',
};

export const INFO_CARD_ATK = {
  x: INFO_CARD.x + INFO_CARD.width - 10,
  y: INFO_CARD_IMG.y + INFO_CARD_IMG.height + 20,
  font: '12px Arial',
  textAlign: 'right',
  fillStyle: 'black',
};

export const INFO_CARD_DEF = {
  x: INFO_CARD_ATK.x,
  y: INFO_CARD_ATK.y + 20,
  font: '12px Arial',
  textAlign: 'right',
  fillStyle: 'black',
};

export const INFO_CARD_DES = {
  x: INFO_CARD.x,
  y: INFO_CARD.y + INFO_CARD.height + 10,
  width: INFO_CARD.width,
  height: INFO_CARD.width,
  fillStyle: 'white',
};

export const INFO_CARD_DES_TEXT = {
  x: INFO_CARD_DES.x + 10,
  y: INFO_CARD_DES.y + 15,
  font: '12px Arial',
  fillStyle: 'black',
  maxWidth: INFO_CARD_DES.width - 10,
};

export const INFO_PHASE = {
  x: INFO_CARD.x,
  y: INFO_CARD_DES.y + INFO_CARD_DES.height + 10,
  width: INFO_CARD.width,
  height: 60,
  fillStyle: '#D9EAD3',
};

export const INFO_PHASE_BTN = {
  x: INFO_CARD.x + 5,
  y: INFO_PHASE.y + 10,
  width: INFO_PHASE.width - 10,
  height: 35,
  fillStyle: 'white',
};

export const INFO_PHASE_BTN_TEXT = {
  x: INFO_PHASE_BTN.x + INFO_PHASE_BTN.width / 2,
  y: INFO_PHASE_BTN.y + 22,
  width: INFO_PHASE_BTN.width,
  font: 'bold 14px Arial',
  fillStyle: 'black',
  textAlign: 'center',
  maxWidth: INFO_PHASE_BTN.width - 10,
};
