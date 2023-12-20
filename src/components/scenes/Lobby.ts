import Main from '../Main';
import Arena from './Arena';
import { SCREEN } from '../../constant/constant';
import { drawFillRect } from '../../helper/draw';
import { drawMainFrame } from '../draw/drawMainFrame';
import { drawArenaGate, drawCardCollectionGate } from '../draw/drawLobby';
import { IAction } from '../../types';
import { checkCoordinate } from '../../helper/checkCoordinate';
import { ARENA_GATE } from '../../constant/LOBBY';

class Lobby extends Main {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;
  protected action: IAction = { name: '', mouseCoordinate: {}, type: null, payload: {} };

  constructor() {
    super();
    // initialize canvas 2d render game
    const { canvas, context } = this.initCanvas(this.checkLobbyAction);
    this.canvas = canvas;
    this.context = context;
  }

  render() {
    // draw main frame
    // Draw background game
    drawFillRect(this.context, SCREEN);

    // Draw Arena gate
    drawArenaGate(this.context);

    // Draw Card manager and collection gate
    drawCardCollectionGate(this.context);
  }

  /*----------------------------------------------------------------*
   * Check play action
   *----------------------------------------------------------------*/
  public checkLobbyAction(e: MouseEvent) {
    let gameWidth = document.querySelector('canvas')?.clientWidth || 0;
    let gameHeight = document.querySelector('canvas')?.clientHeight || 0;
    let screenRatio = gameWidth < SCREEN.width ? gameWidth / SCREEN.width : 1;
    let xMouse = e.clientX - (window.innerWidth - gameWidth) / 2;
    let yMouse = e.clientY - (window.innerHeight - gameHeight - 53) / 2;
    let mouseCoordinate = { x: xMouse, y: yMouse };
    let nextAction: IAction = { name: '', mouseCoordinate, type: null, payload: {} };

    if (checkCoordinate(mouseCoordinate, ARENA_GATE, screenRatio)) {
      nextAction.name = 'click-start-arena';

      const arena = new Arena();
      arena.render();
    }
  }
}

export default Lobby;
