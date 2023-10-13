import Card from '../components/Card';

export const checkCoordinate = (mouseCoordinate: any, item: any): boolean => {
  const { x: xMouse, y: yMouse } = mouseCoordinate;
  const { x: xItem, y: yItem, width, height } = item;

  if (xMouse >= xItem && xMouse <= xItem + width && yMouse >= yItem && yMouse <= yItem + height) {
    return true;
  } else return false;
};

export const getSelectedCard = (mouseCoordinate: any, cards: Card[]) => {
  let selectedCard = {} as Card;

  return (
    cards.find((card: Card) => {
      return checkCoordinate(mouseCoordinate, card);
    }) || selectedCard
  );
};
