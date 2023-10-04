export const SCREEN_SIZE = {
  width: 800,
  height: 600,
  space: 10,
};

export const CARD_INFO = {
  width: 80,
  height: 110,
  space: 5,
  titleFont: `13px Arial`,
  titleHeight: 13,
  imgHeight: 55,
  descFont: `11px Arial`,
  descHeight: 30,
};

export const HAND_CARDS_COORDINATE = {
  x: SCREEN_SIZE.space + CARD_INFO.width + 35,
  y: SCREEN_SIZE.height - CARD_INFO.height - 10,
};

export const DECK_COORDINATE = {
  x: SCREEN_SIZE.space,
  y: SCREEN_SIZE.height / 2 + SCREEN_SIZE.space + 20,
};

export const GRAVE_COORDINATE = {
  x: SCREEN_SIZE.width - CARD_INFO.width - SCREEN_SIZE.space,
  y: SCREEN_SIZE.height / 2 + SCREEN_SIZE.space + 20,
};
