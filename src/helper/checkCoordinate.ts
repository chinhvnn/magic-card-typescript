import Card from '../components/card/Card';
import { TCard } from '../types';

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
