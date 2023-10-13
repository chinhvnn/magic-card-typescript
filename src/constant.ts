export const SCREEN = {
  width: 800,
  height: 600,
  padding: 30,
  lobby: 15,
  bg: 'black',
};

export const CARD_INFO = {
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
  y: SCREEN.height / 2 + SCREEN.lobby + SCREEN.padding + (3 * CARD_INFO.height) / 4,
  x1: SCREEN.padding,
  y1: SCREEN.height / 2 - SCREEN.lobby - SCREEN.padding - (2 * 3 * CARD_INFO.height) / 4,
  width: (3 * CARD_INFO.width) / 4,
  height: (3 * CARD_INFO.height) / 4,
  bg: 'blue',
};

export const GRAVE = {
  x: SCREEN.padding,
  y: SCREEN.height / 2 + SCREEN.lobby,
  x1: SCREEN.padding,
  y1: SCREEN.height / 2 - SCREEN.lobby - (3 * CARD_INFO.height) / 4,
  width: (3 * CARD_INFO.width) / 4,
  height: (3 * CARD_INFO.height) / 4,
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
  y: SCREEN.height - 5 - CARD_INFO.height,
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
  y: SCREEN.height / 2 - CARD_INFO.height - SCREEN.padding - SCREEN.lobby,
  bg: '',
};

export const INFO_VIEW = {
  x: SCREEN.width - 150,
  y: 0,
  width: 150,
  height: SCREEN.height,
  bg: 'rgb(157,155,137,1)',
  player: {
    x: SCREEN.width - 150,
    y: SCREEN.height - 100,
    width: 150,
    height: 50,
    bg: 'white',
  },
  opponent: {
    x: SCREEN.width - 150,
    y: 10,
    width: 150,
    height: 50,
    bg: 'white',
  },
};
