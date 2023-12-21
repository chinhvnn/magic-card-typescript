import { START_BTN } from '../../constant/GAME_START';
import { SCREEN } from '../../constant/constant';
import { checkCoordinate, getMouseInfo } from '../../helper/checkCoordinate';
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
    const { mouseCoordinate, screenRatio } = getMouseInfo(e);
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
    console.log('[LOG] - this.action:', this.action, '\n[LOG] - nextAction:', nextAction);
  };
}

export default GameStart;
