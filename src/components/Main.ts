import { IAction, IActionCount, IEffect, TCard, TPlayStatus, TPlayerType, TScenes } from '../types';
import { DECK, GRAVE, HAND_CARDS_WRAPPER, OPPONENT_HAND_CARDS_WRAPPER, SCREEN } from '../constant/constant';
import Player from './Player';

export default class Main {
  protected players: Player[] = [];
  // public player: Player;
  // public opponent: Player;
  // protected turn: string;
  protected action: IAction = { name: 'init', mouseCoordinate: {}, type: null };

  // protected playStatus: TPlayStatus;

  protected scenesType: TScenes = 'start-menu-scenes';
  // protected gameStartScenes: GameStart;
  // protected arenaScenes: Arena;

  constructor() {}

  initCanvas = (mouseAction: any) => {
    // clear
    this.removeCanvas();

    // initialize canvas 2d render game
    const app = <HTMLElement>document.getElementById('app');
    let canvas = document.createElement('canvas');
    canvas.height = SCREEN.height;
    canvas.width = SCREEN.width;
    app.appendChild(canvas).setAttribute('id', 'canvas-game');

    let context = <CanvasRenderingContext2D>canvas.getContext('2d');

    // add event click scene start-game
    canvas.addEventListener('click', (e: MouseEvent) => mouseAction(e));

    return { canvas, context };
  };

  clearCanvas = (canvas: any, context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  removeCanvas = (): void => {
    document.querySelector('canvas')?.remove();
  };
}
