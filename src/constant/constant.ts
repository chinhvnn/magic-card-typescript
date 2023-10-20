export const MAX_ITEM = {
  hand: 6,
  field: 3,
  effect: 3,
  env: 1,
  deck: 30,
};

export const SCREEN = {
  x: 0,
  y: 0,
  width: 800,
  height: 600,
  padding: 15,
  lobby: 15,
  fillStyle: 'black',
};

export const SELECTED = {
  shadowBlur: 20,
  shadowColor: 'white',
};

export const CARD = {
  width: 80,
  height: 110,
  space: 5,
  // spaceBetweenHandCard: 10,
  titleFont: `13px Arial`,
  titleHeight: 13,
  imgHeight: 55,
  descFont: `11px Arial`,
  desHeight: 8,
  descSpace: 12,
  fillStyle: 'grey',
};

export const CARD_MAGIC_ZONE = {
  width: 80 / 2,
  height: 110 / 2,
  space: 5 / 2,
  // spaceBetweenHandCard: 10,
  titleFont: `6px Arial`,
  titleHeight: 13 / 2,
  imgHeight: 55 / 2,
  descFont: `6px Arial`,
  desHeight: 8 / 2,
  descSpace: 12 / 2,
  fillStyle: 'grey',
  strokeStyle: 'white',
};

export const DECK = {
  x: SCREEN.padding,
  y: SCREEN.height / 2 + SCREEN.lobby + SCREEN.padding + (3 * CARD.height) / 4,
  width: (3 * CARD.width) / 4,
  height: (3 * CARD.height) / 4,
  fillStyle: 'blue',
};

export const OPPONENT_DECK = {
  x: SCREEN.padding,
  y: SCREEN.height / 2 - SCREEN.lobby - SCREEN.padding - (2 * 3 * CARD.height) / 4,
  width: (3 * CARD.width) / 4,
  height: (3 * CARD.height) / 4,
  fillStyle: 'blue',
};

export const GRAVE = {
  x: SCREEN.padding,
  y: SCREEN.height / 2 + SCREEN.lobby,
  width: (3 * CARD.width) / 4,
  height: (3 * CARD.height) / 4,
  fillStyle: 'grey',
};

export const OPPONENT_GRAVE = {
  x: SCREEN.padding,
  y: SCREEN.height / 2 - SCREEN.lobby - (3 * CARD.height) / 4,
  width: (3 * CARD.width) / 4,
  height: (3 * CARD.height) / 4,
  fillStyle: 'grey',
};

export const MAGIC = {
  x: SCREEN.width - 150 - (CARD.width * 3) / 4 - 10,
  y: SCREEN.height / 2 + SCREEN.lobby + 8,
  width: (CARD.width * 1) / 2,
  height: (CARD.height * 1) / 2,
  strokeStyle: 'red',
};

export const OPPONENT_MAGIC = {
  x: SCREEN.width - 150 - (CARD.width * 3) / 4 - 10,
  y: SCREEN.height / 2 - SCREEN.lobby - MAGIC.height * 2 - 25,
  width: (CARD.width * 1) / 2,
  height: (CARD.height * 1) / 2,
  strokeStyle: 'red',
};

export const MAGIC_BUTTON = {
  width: 32,
  height: 32,
  radius: 18,
  startAngle: 0,
  endAngle: 2 * Math.PI,
  fillStyle: 'blue',
};

export const ATK_BUTTON = {
  width: 50,
  height: 25,
  fillStyle: 'white',
};

export const CHANGE_POSITION_BUTTON = {
  width: 50,
  height: 25,
  fillStyle: 'white',
};

export const USE_EFFECT_BUTTON = {
  width: 50,
  height: 25,
  fillStyle: 'white',
};

export const HAND_CARDS = {
  x: SCREEN.padding * 2 + DECK.width,
  y: SCREEN.height - 5 - CARD.height,
  spaceBetweenCard: 10,
  fillStyle: '',
};

export const OPPONENT_HAND_CARDS = {
  x: SCREEN.padding * 2 + DECK.width,
  y: 10,
  spaceBetweenCard: 10,
  fillStyle: '',
};

export const OPPONENT_HAND_CARDS_WRAPPER = {
  x: SCREEN.padding + 6 + DECK.width,
  y: 5,
  width: (CARD.width + 10) * 6 + 5,
  height: CARD.height + 10,
  fillStyle: 'grey',
  strokeStyle: '',
};

export const FIELD_CARDS = {
  x: SCREEN.padding * 2 + DECK.width + 40,
  y: SCREEN.height / 2 + SCREEN.lobby + SCREEN.padding + 10,
  spaceBetweenCard: 10,
  fillStyle: '',
};

export const OPPONENT_FIELD_CARDS = {
  x: FIELD_CARDS.x,
  y: SCREEN.height / 2 - CARD.height - 15,
  spaceBetweenCard: 10,
  fillStyle: '',
};
