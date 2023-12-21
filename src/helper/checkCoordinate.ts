import Card from '../components/card/Card';
import { SCREEN } from '../constant/constant';
import { TCard } from '../types';

export const getMouseInfo = (e: MouseEvent) => {
  let gameWidth = document.querySelector('canvas')?.clientWidth || 0;
  let gameHeight = document.querySelector('canvas')?.clientHeight || 0;
  let screenRatio = gameWidth < SCREEN.width ? gameWidth / SCREEN.width : 1;
  let xMouse = e.clientX - (window.innerWidth - gameWidth) / 2;
  let yMouse = e.clientY - (window.innerHeight - gameHeight - 3) / 2;
  let mouseCoordinate = { x: xMouse, y: yMouse };

  return { mouseCoordinate, screenRatio };
};

export const checkCoordinate = (mouseCoordinate: any, item: any, screenRatio: number): boolean => {
  const { x: xMouse, y: yMouse } = mouseCoordinate;
  // get new coordinate based on screen size
  const xItem = item.x * screenRatio;
  const yItem = item.y * screenRatio;
  const width = item.width * screenRatio;
  const height = item.height * screenRatio;

  if (xMouse >= xItem && xMouse <= xItem + width && yMouse >= yItem && yMouse <= yItem + height) {
    return true;
  } else return false;
};

export const getSelectedCard = (mouseCoordinate: any, cards: TCard[], screenRatio: number) => {
  let selectedCard = {} as TCard;

  return (
    cards.find((card: TCard) => {
      return checkCoordinate(mouseCoordinate, card, screenRatio);
    }) || selectedCard
  );
};
