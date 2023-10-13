export const SCREEN = {
  width: 800,
  height: 600,
  padding: 30,
  lobby: 15,
  bg: 'black',
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
  descHeight: 30,
  bg: 'grey',
};

export const DECK = {
  x: SCREEN.padding,
  y: SCREEN.height / 2 + SCREEN.lobby + SCREEN.padding + (3 * CARD.height) / 4,
  x1: SCREEN.padding,
  y1: SCREEN.height / 2 - SCREEN.lobby - SCREEN.padding - (2 * 3 * CARD.height) / 4,
  width: (3 * CARD.width) / 4,
  height: (3 * CARD.height) / 4,
  bg: 'blue',
};

export const GRAVE = {
  x: SCREEN.padding,
  y: SCREEN.height / 2 + SCREEN.lobby,
  x1: SCREEN.padding,
  y1: SCREEN.height / 2 - SCREEN.lobby - (3 * CARD.height) / 4,
  width: (3 * CARD.width) / 4,
  height: (3 * CARD.height) / 4,
  bg: 'grey',
};

export const ATK_BUTTON = {
  width: 50,
  height: 25,
  bg: 'white',
};

export const CHANGE_POSITION_BUTTON = {
  width: 50,
  height: 25,
  bg: 'white',
};

export const USE_EFFECT_BUTTON = {
  width: 50,
  height: 25,
  bg: 'white',
};

export const HAND_CARDS = {
  x: SCREEN.padding * 2 + DECK.width,
  y: SCREEN.height - 5 - CARD.height,
  spaceBetweenCard: 10,
  bg: '',
};

export const FIELD_CARDS = {
  x: SCREEN.padding + 120,
  y: SCREEN.height / 2 + SCREEN.lobby + SCREEN.padding,
  spaceBetweenCard: 10,
  bg: '',
};

export const OPPONENT_FIELD_CARDS = {
  x: SCREEN.padding + 120,
  y: SCREEN.height / 2 - CARD.height - SCREEN.padding - SCREEN.lobby,
  bg: '',
};
