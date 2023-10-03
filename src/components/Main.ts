import Deck from './Deck';
import Player from './Player';

export default class Main {
  protected players: Player[] = [];
  protected decks: Deck[] = [];

  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;
  protected isStarting: boolean;

  constructor(playerNames: string[]) {
    this.isStarting = false;
    for (let i = 0; i < playerNames.length; i++) {
      this.players.push(new Player(playerNames[i]));
    }

    const app = <HTMLElement>document.getElementById('app');
    this.canvas = document.createElement('canvas');
    app.appendChild(this.canvas).setAttribute('id', 'canvas-game');
    this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
  }

  public start(): void {
    this.isStarting = true;
    this.context.fillStyle = 'rgba(30, 30, 30, 0.5)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = 'rgba(30, 30, 30)';
    this.context.fillText('Hello World', 10, 50);
  }

  public stop(): void {
    this.isStarting = false;
    this.clear();
  }

  public clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
