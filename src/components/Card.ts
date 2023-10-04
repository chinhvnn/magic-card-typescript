import { CARD_INFO } from '../constant';

export default class Card {
  public id: string;
  public x: number = 0;
  public y: number = 0;

  constructor(id: string) {
    this.id = id;
  }

  public drawFaceUpCard(context: CanvasRenderingContext2D, x: number, y: number, dispatch?: any): void {
    this.x = x;
    this.y = y;
    if (context) {
      let borderColor: string = 'white';
      if (dispatch.action === 'click-card' && this.id == dispatch.index) {
        borderColor = 'red';
      }
      console.log('111 render card', this.id);
      // draw background
      context.beginPath();
      context.fillStyle = 'white';
      context.fillRect(x, y, CARD_INFO.width - 2, CARD_INFO.height - 2);
      context.closePath();

      // draw card border
      context.beginPath();
      context.strokeStyle = borderColor;
      context.rect(x - 1, y - 1, CARD_INFO.width, CARD_INFO.height);
      context.stroke();
      context.closePath();

      // draw card name
      context.beginPath();
      context.fillStyle = 'black';
      context.font = CARD_INFO.titleFont;
      context.fillText(
        this.id,
        x + CARD_INFO.space,
        y + CARD_INFO.space + CARD_INFO.titleHeight / 2,
        CARD_INFO.width - CARD_INFO.space * 2,
      );
      context.closePath();

      // draw card image border
      context.beginPath();
      context.strokeStyle = 'black';
      context.rect(
        x + CARD_INFO.space,
        y + CARD_INFO.space * 2 + CARD_INFO.titleHeight,
        CARD_INFO.width - CARD_INFO.space * 2 - 2,
        CARD_INFO.imgHeight,
      );
      context.stroke();
      context.closePath();

      // draw card description
      context.beginPath();
      context.fillStyle = 'black';
      context.font = CARD_INFO.descFont;
      context.fillText(
        'card des',
        x + 2,
        y + CARD_INFO.space * 3 + CARD_INFO.titleHeight + CARD_INFO.imgHeight + 11 / 2,
        // CARD_INFO.width - CARD_INFO.space * 2
      );

      context.closePath();
    }
  }

  public drawFaceDownCard(context: CanvasRenderingContext2D, x: number, y: number) {}
}
