export const SCREEN_SIZE = {
  width: 800,
  height: 600,
  padding: 30,
  lobby: 15,
};

export const CARD_INFO = {
  width: 80,
  height: 110,
  space: 5,
  spaceBetweenCard: 10,
  titleFont: `13px Arial`,
  titleHeight: 13,
  imgHeight: 55,
  descFont: `11px Arial`,
  descHeight: 30,
};

export const DECK_COORDINATE = {
  x: SCREEN_SIZE.padding,
  y: SCREEN_SIZE.height / 2 + SCREEN_SIZE.lobby + SCREEN_SIZE.padding + (3 * CARD_INFO.height) / 4,
  x1: SCREEN_SIZE.padding,
  y1: SCREEN_SIZE.height / 2 - SCREEN_SIZE.lobby - SCREEN_SIZE.padding - (2 * 3 * CARD_INFO.height) / 4,
  width: (3 * CARD_INFO.width) / 4,
  height: (3 * CARD_INFO.height) / 4,
};

export const GRAVE_COORDINATE = {
  x: SCREEN_SIZE.padding,
  y: SCREEN_SIZE.height / 2 + SCREEN_SIZE.lobby,
  x1: SCREEN_SIZE.padding,
  y1: SCREEN_SIZE.height / 2 - SCREEN_SIZE.lobby - (3 * CARD_INFO.height) / 4,
  width: (3 * CARD_INFO.width) / 4,
  height: (3 * CARD_INFO.height) / 4,
};

export const FIRE_BUTTON = {
  // x: SCREEN_SIZE.padding + CARD_INFO.width + 35,
  // y: SCREEN_SIZE.height - CARD_INFO.height - 45,
  width: 50,
  height: 30,
};

export const HAND_CARDS_COORDINATE = {
  x: SCREEN_SIZE.padding * 2 + DECK_COORDINATE.width,
  y: SCREEN_SIZE.height - 5 - CARD_INFO.height,
};

export const FIELD_CARDS_COORDINATE = {
  x: SCREEN_SIZE.padding + CARD_INFO.width + 35,
  y: SCREEN_SIZE.height / 2 + SCREEN_SIZE.lobby + SCREEN_SIZE.padding,
  x1: SCREEN_SIZE.padding + CARD_INFO.width + 35,
  y1: SCREEN_SIZE.height / 2 - CARD_INFO.height - SCREEN_SIZE.padding - SCREEN_SIZE.lobby,
};
