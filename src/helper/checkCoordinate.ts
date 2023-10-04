import Card from '../components/Card';
import { CARD_INFO } from '../constant';

export const checkStaticCoordinate = (
  xMouse: number,
  yMouse: number,
  xItem: number,
  yItem: number,
  width: number,
  height: number,
): boolean => {
  if (xMouse >= xItem && xMouse <= xItem + width && yMouse >= yItem && yMouse <= yItem + height) {
    return true;
  } else return false;
};

export const checkHandCardCoordinate = (xMouse: number, yMouse: number, handCards: Card[]): string | null => {
  let id = null;

  handCards.map((card: Card) => {
    console.log('111 check', card);
    if (checkStaticCoordinate(xMouse, yMouse, card.x, card.y, CARD_INFO.width, CARD_INFO.height)) {
      id = card.id;
      return;
    }
  });
  return id;
};
