import { INFO_VIEW } from './INFO_VIEW';

export const SCREEN = {
  width: 800,
  height: 600,
  padding: 15,
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
  desHeight: 8,
  descSpace: 12,
  bg: 'grey',
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

export const OPPONENT_HAND_CARDS = {
  x: SCREEN.padding * 2 + DECK.width,
  y: 10,
  spaceBetweenCard: 10,
  bg: '',
};

export const FIELD_CARDS = {
  x: SCREEN.padding * 2 + DECK.width + 40,
  y: SCREEN.height / 2 + SCREEN.lobby + SCREEN.padding + 10,
  spaceBetweenCard: 10,
  bg: '',
};

export const OPPONENT_FIELD_CARDS = {
  x: FIELD_CARDS.x,
  y: SCREEN.height / 2 - CARD.height - 15,
  spaceBetweenCard: 10,
  bg: '',
};
