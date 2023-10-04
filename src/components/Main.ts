import { TPlayStatus } from '../types';
import {
  CARD_INFO,
  DECK_COORDINATE,
  GRAVE_COORDINATE,
  HAND_CARDS_COORDINATE,
  SCREEN_SIZE,
} from '../constant';
import Deck from './Deck';
import Player from './Player';
import { checkStaticCoordinate, checkHandCardCoordinate } from '../helper/checkCoordinate';

export default class Main {
  protected players: Player[] = [];
  protected decks: Deck[] = [];
  protected turn: string;

  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;
  protected playStatus: TPlayStatus;

  constructor(playerNames: string[]) {
    this.playStatus = 'inMenuStartGame';
    this.turn = playerNames[0];
    for (let i = 0; i < playerNames.length; i++) {
      this.players.push(new Player(playerNames[i]));
    }

    // initialize canvas 2d render game
    const app = <HTMLElement>document.getElementById('app');
    this.canvas = document.createElement('canvas');
    this.canvas.height = SCREEN_SIZE.height;
    this.canvas.width = SCREEN_SIZE.width;
    app.appendChild(this.canvas).setAttribute('id', 'canvas-game');
    this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.canvas.addEventListener('click', (e: MouseEvent) => this.checkPlayAction(e));
  }

  /*
   * Start game
   */
  public start(): void {
    this.playStatus = 'inGame';
    this.players[0].addToHand([
      this.players[0].getDeck()[0],
      this.players[0].getDeck()[1],
      this.players[0].getDeck()[2],
      this.players[0].getDeck()[3],
      this.players[0].getDeck()[4],
      this.players[0].getDeck()[5],
      // this.players[0].getDeck()[6],
      // this.players[0].getFieldDeck()[7],
    ]);
    this.drawGame('init');
  }

  /**
   * Stop game
   */
  public stop(): void {
    this.playStatus = 'inMenuStartGame';
    // this.clear();
  }

  public clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Update game
   */
  public drawGame(dispatch: any) {
    console.log('111 draw game', dispatch);

    // clear before rerender
    this.clear();

    // draw player hand card
    this.context.fillStyle = 'rgba(30, 30, 30, 1)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.players[0].drawHandCards(this.context, dispatch);
    this.players[0].drawDeck(this.context, dispatch);
    this.players[0].drawGrave(this.context, dispatch);

    // draw computer hand card
    //...
  }

  /**
   * Check play action
   */
  public checkPlayAction(e: MouseEvent) {
    let xMouse = e.clientX - (window.innerWidth - SCREEN_SIZE.width) / 2;
    let yMouse = e.clientY - (window.innerHeight - SCREEN_SIZE.height - 50) / 2;
    let dispatch: any = { action: '', index: null };
    const selectIdHandCard: any = checkHandCardCoordinate(xMouse, yMouse, this.players[0].getHandCards());

    console.log('111 Coordinate', xMouse, yMouse, e);

    if (
      checkStaticCoordinate(
        xMouse,
        yMouse,
        DECK_COORDINATE.x,
        DECK_COORDINATE.y,
        CARD_INFO.width,
        CARD_INFO.height,
      )
    ) {
      console.log('click deck');
      dispatch = { action: 'click-deck', index: null };
    } else if (
      checkStaticCoordinate(
        xMouse,
        yMouse,
        GRAVE_COORDINATE.x,
        GRAVE_COORDINATE.y,
        CARD_INFO.width,
        CARD_INFO.height,
      )
    ) {
      console.log('click grave');
      dispatch = { action: 'click-grave', index: null };
    } else if (selectIdHandCard) {
      console.log('click-hand-cards');
      dispatch = { action: 'click-card', index: selectIdHandCard };
    }

    this.drawGame(dispatch);
  }
}
