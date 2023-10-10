import Card from '../components/Card';
import { CARD_INFO } from '../constant';

export const checkCoordinate = (mouseCoordinate: any, itemCoordinate: any, size: any): boolean => {
  const { x: xMouse, y: yMouse } = mouseCoordinate;
  const { x: xItem, y: yItem } = itemCoordinate;
  const { width, height } = size;

  if (xMouse >= xItem && xMouse <= xItem + width && yMouse >= yItem && yMouse <= yItem + height) {
    return true;
  } else return false;
};

export const getSelectedCard = (mouseCoordinate: any, cards: Card[], wrapper: any) => {
  let selectedCard: any = {};

  cards.find((card: Card, index) => {
    if (checkCoordinate(mouseCoordinate, card, CARD_INFO)) {
      selectedCard.id = card.id;
      selectedCard.x = wrapper.x + index * (CARD_INFO.width + CARD_INFO.spaceBetweenCard);
      selectedCard.y = wrapper.y;
      return;
    }
  });
  return selectedCard;
};
