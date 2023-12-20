import { START_BTN } from '../../constant/GAME_START';
import { SCREEN } from '../../constant/constant';
import { checkCoordinate } from '../../helper/checkCoordinate';
import { drawFillRect, drawFillText, drawTextBox } from '../../helper/draw';
import { IAction, TScenes } from '../../types';
import Main from '../Main';
import Lobby from './Lobby';

class GameStart extends Main {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;
  protected action: IAction = { name: '', mouseCoordinate: {}, type: null, payload: {} };

  constructor() {
    super();
    // initialize canvas 2d render game
    const { canvas, context } = this.initCanvas(this.checkMenuAction);
    this.canvas = canvas;
    this.context = context;
  }

  public render(): void {
    drawFillRect(this.context, SCREEN);

    // Draw Start button
    drawTextBox(this.context, START_BTN, 'START');
  }

  public checkMenuAction = (e: any) => {
    let gameWidth = document.querySelector('canvas')?.clientWidth || 0;
    let gameHeight = document.querySelector('canvas')?.clientHeight || 0;
    let screenRatio = gameWidth < SCREEN.width ? gameWidth / SCREEN.width : 1;
    let xMouse = e.clientX - (window.innerWidth - gameWidth) / 2;
    let yMouse = e.clientY - (window.innerHeight - gameHeight - 53) / 2;
    let mouseCoordinate = { x: xMouse, y: yMouse };
    let nextAction: IAction = { name: '', mouseCoordinate, type: null, payload: {} };

    // CHECK CLICK START BUTTON
    if (checkCoordinate(mouseCoordinate, START_BTN, screenRatio)) {
      nextAction.name = 'click-start-game';
      nextAction.type = 'game-menu';
      nextAction.payload = START_BTN;

      const lobby = new Lobby();
      lobby.render();
    }

    this.action = nextAction;
  };
}

export default GameStart;
