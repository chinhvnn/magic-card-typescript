import { IAction, IEffect, TPlayStatus } from '../types';
import { DECK, GRAVE, SCREEN } from '../constant';
import Deck from './Deck';
import Player from './Player';
import { checkCoordinate, getSelectedCard } from '../helper/checkCoordinate';
import { drawViewInfo } from '../helper/draw/drawViewInfo';
import Card from './Card';
import { drawActionMenu, getActionMenuCoordinate } from '../helper/draw/drawActionMenu';

export default class Main {
  protected players: Player[] = [];
  protected decks: Deck[] = [];
  protected turn: string;
  protected action: IAction = { name: 'init', mouseCoordinate: {} };

  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;
  protected playStatus: TPlayStatus;

  constructor(playerNames: string[]) {
    this.playStatus = 'inMenuStartGame';
    this.turn = playerNames[0];
    this.players.push(
      new Player('player', [
        new Card(1, 100, 100, {} as IEffect, 'def'),
        new Card(2, 200, 200, {} as IEffect, 'atk'),
        new Card(3, 300, 300, {} as IEffect, 'atk'),
        new Card(4, 400, 400, {} as IEffect, 'def'),
        new Card(5, 500, 500, {} as IEffect, 'def'),
        new Card(6, 600, 600, {} as IEffect, 'def'),
        new Card(7, 700, 700, {} as IEffect, 'def'),
        new Card(8, 800, 800, {} as IEffect, 'def'),
        new Card(9, 800, 800, {} as IEffect, 'def'),
      ]),
    );
    this.players.push(
      new Player('computer', [
        new Card(11, 100, 100, {} as IEffect, 'atk'),
        new Card(12, 200, 200, {} as IEffect, 'atk'),
        new Card(13, 300, 300, {} as IEffect, 'atk'),
        new Card(14, 400, 400, {} as IEffect, 'def'),
        new Card(15, 500, 500, {} as IEffect, 'atk'),
        new Card(16, 600, 600, {} as IEffect, 'atk'),
        new Card(17, 700, 700, {} as IEffect, 'atk'),
        new Card(18, 800, 800, {} as IEffect, 'atk'),
        new Card(19, 800, 800, {} as IEffect, 'atk'),
      ]),
    );

    // initialize canvas 2d render game
    const app = <HTMLElement>document.getElementById('app');
    this.canvas = document.createElement('canvas');
    this.canvas.height = SCREEN.height;
    this.canvas.width = SCREEN.width;
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
    this.players[0].addCardFromDeckToHand([
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
    console.log('111 player', this.players[0]);

    // computer

    this.players[1].addCardFromDeckToHand([
      this.players[1].getDeck()[0],
      this.players[1].getDeck()[1],
      this.players[1].getDeck()[2],
      this.players[1].getDeck()[3],
      this.players[1].getDeck()[4],
      this.players[1].getDeck()[5],
    ]);
    this.players[1].playOneCard(11);
    this.players[1].playOneCard(12);
    this.players[1].playOneCard(13);
    this.players[1].playOneCard(14);
    this.players[1].playOneCard(15);
    console.log('111 computer', this.players[1]);

    // draw game
    this.drawGame({ name: 'init', mouseCoordinate: {} });
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
   * Action game
   *----------------------------------------------------------------*/
  cardAttack(id: number, targetId: number, player: Player, opponent: Player) {
    const card: Card = player.getOneFieldCard(id);
    const target: Card = opponent.getOneFieldCard(targetId);

    if (card && target) {
      if (target.position === 'def') {
        let defDamage = card.atk - target.def;
        if (defDamage < 0) {
          player.changeScore('atk', defDamage * -1);
          player.removeCardFromFieldToGrave([card]);
        } else if (defDamage > 0) {
          opponent.removeCardFromFieldToGrave([target]);
        }
      } else if (target.position === 'atk') {
        let atkDamage = card.atk - target.atk;
        if (atkDamage === 0) {
          player.removeCardFromFieldToGrave([card]);
          opponent.removeCardFromFieldToGrave([target]);
        } else if (atkDamage > 0) {
          opponent.removeCardFromFieldToGrave([target]);
          opponent.changeScore('atk', atkDamage);
        } else {
          player.removeCardFromFieldToGrave([card]);
          player.changeScore('atk', atkDamage * -1);
        }
      }
    }
  }

  /*----------------------------------------------------------------*
   * Draw/Update game
   *----------------------------------------------------------------*/
  public drawGame(action: IAction) {
    // clear before rerender
    this.clear();

    // draw background game
    this.context.beginPath();
    this.context.fillStyle = SCREEN.bg;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.closePath();

    // draw view info game
    drawViewInfo(this.context, this.players[0], this.players[1], action);

    // draw action menu
    drawActionMenu(this.context, action);

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
    let xMouse = e.clientX - (window.innerWidth - SCREEN.width) / 2;
    let yMouse = e.clientY - (window.innerHeight - SCREEN.height - 53) / 2;
    let mouseCoordinate = { x: xMouse, y: yMouse };
    let nextAction: IAction = { name: '', mouseCoordinate, payload: {} };
    const selectedHandCard: Card = getSelectedCard(mouseCoordinate, this.players[0].getHandCards());
    const selectedFieldCard: Card = getSelectedCard(mouseCoordinate, this.players[0].getFieldCards());
    const selectedOpponentFieldCard: Card = getSelectedCard(mouseCoordinate, this.players[1].getFieldCards());

    //check click deck
    if (checkCoordinate(mouseCoordinate, DECK)) {
      nextAction.name = 'click-deck';
      nextAction.payload.x = DECK.x;
      nextAction.payload.y = DECK.y;
    }

    //check click grave
    if (checkCoordinate(mouseCoordinate, GRAVE)) {
      nextAction.name = 'click-grave';
      nextAction.payload.x = GRAVE.x;
      nextAction.payload.y = GRAVE.y;
    }

    //check click hand cards
    if (selectedHandCard?.id) {
      nextAction.name = 'click-hand-card';
      nextAction.payload = selectedHandCard;
    }

    //check click field cards
    if (selectedFieldCard?.id) {
      nextAction.name = 'click-field-card';
      nextAction.payload = selectedFieldCard;
    }

    //check click opponent card
    if (selectedOpponentFieldCard?.id) {
      if (this.action?.name === 'click-attack') {
        nextAction.name = 'click-opponent-field-card';
        nextAction.payload.id = selectedOpponentFieldCard.id;

        //calculator atk
        this.cardAttack(
          this.action.payload.id,
          selectedOpponentFieldCard.id,
          this.players[0],
          this.players[1],
        );
      }
    }

    // check click button action card
    if (this.action && (this.action.name === 'click-hand-card' || this.action.name === 'click-field-card')) {
      const { attackBtn, changePositionBtn, useEffectBtn } = getActionMenuCoordinate(this.action);

      // atk
      if (checkCoordinate(mouseCoordinate, attackBtn)) {
        if (this.action.name === 'click-hand-card') {
          this.players[0].playOneCard(this.action.payload.id);
        }
        if (this.action && this.action.name === 'click-field-card') {
          if (this.action.payload.position === 'atk') {
            nextAction.name = 'click-attack';
          }
          nextAction.payload = this.action.payload;
        }
      }

      // change position
      if (checkCoordinate(mouseCoordinate, changePositionBtn)) {
        if (this.action.name === 'click-field-card') {
          nextAction.name = 'click-change-position';
          nextAction.payload = this.action.payload;

          const position = this.action.payload.position === 'atk' ? 'def' : 'atk';
          this.action.payload.changePosition(position);
        }
      }

      // use card effect
      if (checkCoordinate(mouseCoordinate, useEffectBtn)) {
        if (this.action && this.action.name === 'click-field-card' && this.action.payload.effect?.id) {
          nextAction.name = 'click-use-effect';
          nextAction.payload = this.action.payload;
        }
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
