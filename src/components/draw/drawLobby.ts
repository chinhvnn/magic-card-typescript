import { ARENA_GATE, CARD_COLLECTION_GATE } from '../../constant/LOBBY';
import { drawFillRect, drawTextBox } from '../../helper/draw';

export const drawArenaGate = (context: CanvasRenderingContext2D) => {
  drawTextBox(context, ARENA_GATE, 'Arena gate');
};

export const drawCardCollectionGate = (context: CanvasRenderingContext2D) => {
  drawTextBox(context, CARD_COLLECTION_GATE, 'Card collection');
};
