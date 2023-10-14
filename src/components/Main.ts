import { IAction, IEffect, TPlayStatus } from '../types';
import { DECK, GRAVE, SCREEN } from '../constant/constant';
import Deck from './Deck';
import Player from './Player';
import { checkCoordinate, getSelectedCard } from '../helper/checkCoordinate';
import { drawViewInfo } from './draw/drawViewInfo';
import Card from './Card';
import {
  drawActionMenu,
  drawMagicActionMenu,
  getActionMenuCoordinate,
  getMagicMenuCoordinate,
} from './draw/drawActionMenu';

export default class Main {
  protected players: Player[] = [];
  protected decks: Deck[] = [];
  protected turn: string;
  protected action: IAction = { name: 'init', mouseCoordinate: {}, type: null };

  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;
  protected playStatus: TPlayStatus;

  constructor(playerNames: string[]) {
    this.playStatus = 'inMenuStartGame';
    this.turn = playerNames[0];
    this.players.push(
      new Player('player', [
        new Card(1, 100, 100, 'up', 'effect', {} as IEffect, 'atk'),
        new Card(2, 200, 200, 'up', 'effect', {} as IEffect, 'atk'),
        new Card(3, 300, 300, 'up', 'effect', {} as IEffect, 'atk'),
        new Card(4, 400, 400, 'up', 'effect', {} as IEffect, 'atk'),
        new Card(5, 500, 500, 'up', 'monster', {} as IEffect, 'atk'),
        new Card(6, 600, 600, 'up', 'monster', {} as IEffect, 'atk'),
        new Card(7, 700, 700, 'up', 'monster', {} as IEffect, 'atk'),
        new Card(8, 800, 800, 'up', 'monster', {} as IEffect, 'atk'),
        new Card(9, 800, 800, 'up', 'monster', {} as IEffect, 'atk'),
      ]),
    );
    this.players.push(
      new Player('opponent', [
        new Card(11, 100, 100, 'down', 'effect', {} as IEffect, 'atk'),
        new Card(12, 200, 200, 'down', 'effect', {} as IEffect, 'atk'),
        new Card(13, 300, 300, 'down', 'effect', {} as IEffect, 'atk'),
        new Card(14, 400, 400, 'up', 'effect', {} as IEffect, 'atk'),
        new Card(15, 500, 500, 'up', 'monster', {} as IEffect, 'atk'),
        new Card(16, 600, 600, 'down', 'monster', {} as IEffect, 'atk'),
        new Card(17, 700, 700, 'down', 'monster', {} as IEffect, 'atk'),
        new Card(18, 800, 800, 'down', 'monster', {} as IEffect, 'atk'),
        new Card(19, 800, 800, 'down', 'monster', {} as IEffect, 'atk'),
        new Card(20, 800, 800, 'down', 'monster', {} as IEffect, 'atk'),
        new Card(21, 800, 800, 'down', 'monster', {} as IEffect, 'atk'),
        new Card(22, 800, 800, 'down', 'monster', {} as IEffect, 'atk'),
        new Card(23, 800, 800, 'down', 'monster', {} as IEffect, 'atk'),
        new Card(24, 800, 800, 'down', 'monster', {} as IEffect, 'atk'),
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
      this.players[0].getDeck()[4],
      this.players[0].getDeck()[5],
      this.players[0].getDeck()[6],
      this.players[0].getDeck()[7],
    ]);
    this.players[0].playOneCard(6, 'down', 'def', 'hand', 'field');
    this.players[0].playOneCard(7, 'up', 'atk', 'hand', 'field');
    // this.players[0].playOneCard(8, 'down', 'atk', 'hand', 'field');
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
    this.players[1].playOneCard(11, 'up', 'atk', 'hand', 'magic-zone');
    // this.players[1].playOneCard(12, 'up', 'hand', 'magic-zone');
    // this.players[1].playOneCard(13, 'up', 'hand', 'magic-zone');
    console.log('111 computer', this.players[1]);

    // draw game
    this.drawGame({ name: 'init', mouseCoordinate: {}, type: null });
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

    // draw player item
    this.players[0].drawHandCards(this.context, action);
    this.players[0].drawFieldCards(this.context, action);
    this.players[0].drawMagic(this.context, action);
    this.players[0].drawDeck(this.context, action);
    this.players[0].drawGrave(this.context, action);

    // draw computer item
    this.players[1].drawHandCards(this.context, action);
    this.players[1].drawFieldCards(this.context, action);
    this.players[1].drawMagic(this.context, action);
    this.players[1].drawDeck(this.context, action);
    this.players[1].drawGrave(this.context, action);

    // draw action menu
    drawActionMenu(this.context, action);
    drawMagicActionMenu(this.context, action);
  }

  /*----------------------------------------------------------------*
   * Check play action
   *----------------------------------------------------------------*/
  public checkPlayAction(e: MouseEvent) {
    let xMouse = e.clientX - (window.innerWidth - SCREEN.width) / 2;
    let yMouse = e.clientY - (window.innerHeight - SCREEN.height - 53) / 2;
    let mouseCoordinate = { x: xMouse, y: yMouse };
    let nextAction: IAction = { name: '', mouseCoordinate, type: null, payload: {} };
    const selectedHandCard: Card = getSelectedCard(mouseCoordinate, this.players[0].getHandCards());
    const selectedFieldCard: Card = getSelectedCard(mouseCoordinate, this.players[0].getFieldCards());
    const selectedMagicCard: Card = getSelectedCard(mouseCoordinate, this.players[0].getMagicCards());
    const selectedOpponentFieldCard: Card = getSelectedCard(mouseCoordinate, this.players[1].getFieldCards());
    const player = this.players[0];
    const opponent = this.players[1];

    //check click deck
    if (checkCoordinate(mouseCoordinate, DECK)) {
      nextAction.name = 'click-deck';
      nextAction.type = 'deck';
      nextAction.payload.x = DECK.x;
      nextAction.payload.y = DECK.y;
    }

    //check click grave
    if (checkCoordinate(mouseCoordinate, GRAVE)) {
      nextAction.name = 'click-grave';
      nextAction.type = 'grave';
      nextAction.payload.x = GRAVE.x;
      nextAction.payload.y = GRAVE.y;
    }

    //check click hand cards
    if (selectedHandCard?.id) {
      nextAction.name = 'click-hand-card';
      nextAction.type = 'card';
      nextAction.payload = selectedHandCard;
    }

    //check click field cards
    if (selectedFieldCard?.id) {
      nextAction.name = 'click-field-card';
      nextAction.type = 'card';
      nextAction.payload = selectedFieldCard;
    }

    //check click magic cards
    if (selectedMagicCard?.id) {
      nextAction.name = 'click-magic-card';
      nextAction.type = 'card';
      nextAction.payload = selectedMagicCard;
    }

    //check click attack opponent card
    if (selectedOpponentFieldCard?.id) {
      if (this.action?.name === 'click-attack') {
        nextAction.type = 'action-menu';
        nextAction.name = 'click-attack-opponent-field-card';
        nextAction.payload = selectedOpponentFieldCard;

        //calculator atk
        this.cardAttack(this.action.payload.id, selectedOpponentFieldCard.id, player, opponent);
      }
    }

    // check click button MAGIC CARD ACTION
    if (this.action && this.action.name === 'click-magic-card') {
      const { magicBtn } = getMagicMenuCoordinate(this.action);
      if (checkCoordinate(mouseCoordinate, magicBtn)) {
        nextAction.name = 'click-use-effect';
        nextAction.payload = this.action.payload;
        //handle use effect
        if (this.action.payload.face === 'down') {
          this.action.payload.setFace('up');
        }
        //...
      }
    }

    // check click button FIELD & HAND CARD ACTION
    if (this.action && (this.action.name === 'click-hand-card' || this.action.name === 'click-field-card')) {
      const { attackBtn, changePositionBtn, useEffectBtn } = getActionMenuCoordinate(this.action);

      // ACTION-1: atk/ summon/ use effect
      if (checkCoordinate(mouseCoordinate, attackBtn)) {
        if (this.action.name === 'click-hand-card') {
          // summon
          if (this.action.payload.type === 'monster' && player.getFieldCards().length < 3) {
            player.playOneCard(this.action.payload.id, 'up', 'atk', 'hand', 'field');
          }
          // use effect
          if (this.action.payload.type === 'effect' && player.getMagicCards().length < 3) {
            // handle use card effect
            nextAction.name = 'click-use-effect';
          }
        }
        if (this.action && this.action.name === 'click-field-card') {
          // attack
          if (this.action.payload.position === 'atk') {
            nextAction.name = 'click-attack';
          }
          nextAction.payload = this.action.payload;
        }
      }

      // ACTION-2: change position/ Set / Face up
      if (checkCoordinate(mouseCoordinate, changePositionBtn)) {
        // change position or Face up
        if (this.action.name === 'click-field-card') {
          // change position
          if (this.action.payload.face === 'up') {
            nextAction.name = 'click-change-position';
            const position = this.action.payload.position === 'atk' ? 'def' : 'atk';
            this.action.payload.changePosition(position);
          }
          // change face up
          if (this.action.payload.face === 'down') {
            nextAction.name = 'click-change-face';
            this.action.payload.setFace('up');
          }

          nextAction.payload = this.action.payload;
        }
        // set card
        if (this.action.name === 'click-hand-card') {
          if (
            (this.action.payload.type === 'effect' || this.action.payload.type === 'trap') &&
            player.getMagicCards().length < 3
          ) {
            nextAction.name = 'click-set-magic-card';
            player.playOneCard(this.action.payload.id, 'down', 'atk', 'hand', 'magic-zone');
          }
          if (this.action.payload.type === 'monster' && player.getFieldCards().length < 3) {
            nextAction.name = 'click-set-monster-card';
            player.playOneCard(this.action.payload.id, 'down', 'def', 'hand', 'field');
          }
          nextAction.payload = this.action.payload;
        }
      }
      // ACTION-3: use card effect
      if (checkCoordinate(mouseCoordinate, useEffectBtn)) {
        if (this.action && this.action.name === 'click-field-card' && this.action.payload.effect?.id) {
          nextAction.name = 'click-use-effect';
          nextAction.payload = this.action.payload;
        }
      }
    }

    // if action change update & draw game
    if (this.action && (this.action.name !== '' || nextAction.name !== '')) {
      this.drawGame(nextAction);
    }

    console.log('111 nextAction', nextAction);

    this.action = nextAction;
  }
}
