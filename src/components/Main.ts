import { IAction, TPlayStatus } from '../types';
import {
  CARD_INFO,
  DECK_COORDINATE,
  FIELD_CARDS_COORDINATE,
  FIRE_BUTTON,
  GRAVE_COORDINATE,
  HAND_CARDS_COORDINATE,
  SCREEN_SIZE,
} from '../constant';
import Deck from './Deck';
import Player from './Player';
import { checkCoordinate, getSelectedCard } from '../helper/checkCoordinate';

export default class Main {
  protected players: Player[] = [];
  protected decks: Deck[] = [];
  protected turn: string;
  protected action: IAction | null = null;

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

    // add event click game
    this.canvas.addEventListener('click', (e: MouseEvent) => this.checkPlayAction(e));
  }

  /*----------------------------------------------------------------*
   * Start game
   *----------------------------------------------------------------*/
  public start(): void {
    this.playStatus = 'inGame';

    // player
    this.players[0].addToHand([
      this.players[0].getDeck()[0],
      this.players[0].getDeck()[1],
      this.players[0].getDeck()[2],
      this.players[0].getDeck()[3],
      // this.players[0].getDeck()[4],
      // this.players[0].getDeck()[5],
      // this.players[0].getDeck()[6],
      // this.players[0].getFieldDeck()[7],
    ]);
    this.players[0].playOneCard(1);

    // computer
    this.players[1].addToHand([
      this.players[1].getDeck()[0],
      this.players[1].getDeck()[1],
      this.players[1].getDeck()[2],
      this.players[1].getDeck()[3],
    ]);
    this.players[1].playOneCard(1);

    // draw game
    this.drawGame();
  }

  /*----------------------------------------------------------------*
   * Stop game
   *----------------------------------------------------------------*/
  public stop(): void {
    this.playStatus = 'inMenuStartGame';
    // this.clear();
  }

  public clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /*----------------------------------------------------------------*
   * Draw/Update game
   *----------------------------------------------------------------*/
  public drawGame(action?: IAction) {
    // clear before rerender
    this.clear();

    // draw background game
    this.context.beginPath();
    this.context.fillStyle = 'rgba(30, 30, 30, 1)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.closePath();

    // draw action menu
    if (action?.name === 'click-hand-card' || action?.name === 'click-field-card') {
      const actionMenu = { x: action.payload.x, y: action?.payload.y - 35 };
      this.context.beginPath();
      this.context.fillStyle = 'white';
      this.context.fillRect(actionMenu.x, actionMenu.y, FIRE_BUTTON.width, FIRE_BUTTON.height);
      this.context.closePath();
      this.context.beginPath();
      this.context.fillStyle = 'red';
      this.context.fillText('OK', actionMenu.x + 8, actionMenu.y + 18, FIRE_BUTTON.width);
      this.context.closePath();
    }

    // draw player item
    this.players[0].drawHandCards(this.context, action);
    this.players[0].drawFieldCards(this.context, action);
    this.players[0].drawDeck(this.context, action);
    this.players[0].drawGrave(this.context, action);

    // draw computer item
    this.players[1].drawDeck(this.context, action);
    this.players[1].drawGrave(this.context, action);
    this.players[1].drawFieldCards(this.context, action);
  }

  /*----------------------------------------------------------------*
   * Check play action
   *----------------------------------------------------------------*/
  public checkPlayAction(e: MouseEvent) {
    let xMouse = e.clientX - (window.innerWidth - SCREEN_SIZE.width) / 2;
    let yMouse = e.clientY - (window.innerHeight - SCREEN_SIZE.height - 53) / 2;
    let mouseCoordinate = { x: xMouse, y: yMouse };
    let nextAction: IAction = { name: '', mouseCoordinate, payload: {} };
    // if (!this.action) {
    //   this.action = nextAction;
    //   return;
    // }

    //check click deck
    if (checkCoordinate(mouseCoordinate, DECK_COORDINATE, DECK_COORDINATE)) {
      nextAction.name = 'click-deck';
      nextAction.payload.x = DECK_COORDINATE.x;
      nextAction.payload.y = DECK_COORDINATE.y;
    }

    //check click grave
    if (checkCoordinate(mouseCoordinate, GRAVE_COORDINATE, GRAVE_COORDINATE)) {
      nextAction.name = 'click-grave';
      nextAction.payload.x = GRAVE_COORDINATE.x;
      nextAction.payload.y = GRAVE_COORDINATE.y;
    }

    //check click hand cards
    const selectHandCard: any = getSelectedCard(
      mouseCoordinate,
      this.players[0].getHandCards(),
      HAND_CARDS_COORDINATE,
    );
    if (selectHandCard?.id) {
      nextAction.name = 'click-hand-card';
      nextAction.payload.id = selectHandCard.id;
      nextAction.payload.x = selectHandCard.x;
      nextAction.payload.y = selectHandCard.y;
    }

    //check click field cards
    const selectFieldCard: any = getSelectedCard(
      mouseCoordinate,
      this.players[0].getFieldCards(),
      FIELD_CARDS_COORDINATE,
    );
    if (selectFieldCard?.id) {
      nextAction.name = 'click-field-card';
      nextAction.payload.id = selectFieldCard.id;
      nextAction.payload.x = selectFieldCard.x;
      nextAction.payload.y = selectFieldCard.y;
    }

    //check click button summon card
    const actionMenu = { x: this.action?.payload.x, y: this.action?.payload.y - 35 };
    if (checkCoordinate(mouseCoordinate, actionMenu, FIRE_BUTTON)) {
      if (this.action && this.action.name === 'click-hand-card') {
        this.players[0].playOneCard(this.action.payload.id);
      }
      if (this.action && this.action.name === 'click-field-card') {
        // click to another card to fire
      }
    }

    // if action change update & draw game
    if ((this.action && this.action.name !== '') || nextAction.name !== '') {
      this.drawGame(nextAction);
    }

    console.log('111 nextAction', nextAction);

    this.action = nextAction;
  }
}
