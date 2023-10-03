export default class Card {
  public id: string;
  private cardWidth: number = 50;
  private cardHeight: number = 100;

  constructor(id: string) {
    this.id = id;
  }

  public render(context: CanvasRenderingContext2D): void {
    if (context) {
      console.log('111 render card');
      context.fillRect(1, 2, this.cardWidth, this.cardHeight);
    }
  }
}
