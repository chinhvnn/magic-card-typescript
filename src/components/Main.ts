import { IAction, IEffect, TPlayStatus } from '../types';
import { DECK, GRAVE, OPPONENT_HAND_CARDS, OPPONENT_HAND_CARDS_WRAPPER, SCREEN } from '../constant/constant';
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
import { INFO_PHASE_BTN } from '../constant/INFO_VIEW';
import { drawFillRect, drawRect } from '../helper/draw';

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
    const playerDeck = [
      new Card(1, 100, 100, 'up', 'effect', {} as IEffect, 'atk'),
      new Card(2, 200, 200, 'up', 'effect', {} as IEffect, 'atk'),
      new Card(3, 300, 300, 'up', 'effect', {} as IEffect, 'atk'),
      new Card(4, 400, 400, 'up', 'effect', {} as IEffect, 'atk'),
      new Card(5, 500, 500, 'up', 'monster', {} as IEffect, 'atk'),
      new Card(6, 600, 600, 'up', 'monster', {} as IEffect, 'atk'),
      new Card(7, 700, 700, 'up', 'monster', {} as IEffect, 'atk'),
      new Card(8, 800, 800, 'up', 'monster', {} as IEffect, 'atk'),
      new Card(9, 800, 800, 'up', 'monster', {} as IEffect, 'atk'),
    ];
    const opponentDeck = [
      new Card(1, 100, 100, 'up', 'effect', {} as IEffect, 'atk'),
      new Card(2, 200, 200, 'up', 'effect', {} as IEffect, 'atk'),
      new Card(3, 300, 300, 'up', 'effect', {} as IEffect, 'atk'),
      new Card(4, 400, 400, 'up', 'effect', {} as IEffect, 'atk'),
      new Card(5, 500, 500, 'up', 'monster', {} as IEffect, 'atk'),
      new Card(6, 600, 600, 'up', 'monster', {} as IEffect, 'atk'),
      new Card(7, 700, 700, 'up', 'monster', {} as IEffect, 'atk'),
      new Card(8, 800, 800, 'up', 'monster', {} as IEffect, 'atk'),
      new Card(9, 800, 800, 'up', 'monster', {} as IEffect, 'atk'),
    ];
    playerDeck.map((card: Card, index) => card.setIdWithDeck('player-' + card.id + '-' + index));
    opponentDeck.map((card: Card, index) => card.setIdWithDeck('opponent-' + card.id + '-' + index));
    this.players.push(new Player('player', playerDeck));
    this.players.push(new Player('opponent', opponentDeck));

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
    const player = this.players[0];
    const opponent = this.players[1];

    // player
    player.setPhase('main');
    player.addCardFromDeckToHand([
      player.getDeck()[0],
      player.getDeck()[1],
      // player.getDeck()[2],
      // player.getDeck()[3],
      // player.getDeck()[4],
      // player.getDeck()[5],
      player.getDeck()[6],
      player.getDeck()[7],
    ]);

    // computer
    opponent.setPhase('waiting');
    opponent.addCardFromDeckToHand([
      opponent.getDeck()[0],
      opponent.getDeck()[1],
      opponent.getDeck()[2],
      opponent.getDeck()[3],
      opponent.getDeck()[4],
      opponent.getDeck()[5],
      opponent.getDeck()[6],
    ]);
    opponent.playOneCard('opponent-2-1', 'up', 'atk', 'hand', 'magic-zone');
    // opponent.playOneCard(12, 'up', 'hand', 'magic-zone');
    // opponent.playOneCard(13, 'up', 'hand', 'magic-zone');
    console.log('111 computer', opponent);

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
  cardAttack(idWithDeck: string, targetId: string, player: Player, opponent: Player, isDirectly = false) {
    const card: Card = player.getOneFieldCard(idWithDeck);
    const target: Card = opponent.getOneFieldCard(targetId);

    if (!card) return;

    if (target) {
      if (target.position === 'def') {
        let defDamage = card.atk - target.def;
        if (defDamage < 0) {
          player.changeScore('atk', defDamage * -1);
          player.playOneCard(card.idWithDeck, 'up', 'atk', 'field', 'grave');
        } else if (defDamage > 0) {
          opponent.playOneCard(target.idWithDeck, 'up', 'atk', 'field', 'grave');
        }
      } else if (target.position === 'atk') {
        let atkDamage = card.atk - target.atk;
        if (atkDamage === 0) {
          player.playOneCard(card.idWithDeck, 'up', 'atk', 'field', 'grave');
          opponent.playOneCard(target.idWithDeck, 'up', 'atk', 'field', 'grave');
        } else if (atkDamage > 0) {
          opponent.playOneCard(target.idWithDeck, 'up', 'atk', 'field', 'grave');
          opponent.changeScore('atk', atkDamage);
        } else {
          player.playOneCard(card.idWithDeck, 'up', 'atk', 'field', 'grave');
          player.changeScore('atk', atkDamage * -1);
        }
      }
    } else if (isDirectly) {
      opponent.changeScore('atk', card.atk);
    }
  }

  /*----------------------------------------------------------------*
   * Draw/Update game
   *----------------------------------------------------------------*/
  public drawGame(action: IAction) {
    const player = this.players[0];
    const opponent = this.players[1];

    // clear before rerender
    this.clear();

    // draw background game
    drawFillRect(this.context, SCREEN);

    // draw view info game
    drawViewInfo(this.context, this.players[0], this.players[1], action);

    // draw player item
    player.drawHandCards(this.context, action);
    player.drawFieldCards(this.context, action);
    player.drawMagic(this.context, action);
    player.drawDeck(this.context, action);
    player.drawGrave(this.context, action);

    // draw computer item
    console.log('111 action in draw', action);

    drawFillRect(this.context, OPPONENT_HAND_CARDS_WRAPPER);
    drawRect(this.context, {
      ...OPPONENT_HAND_CARDS_WRAPPER,
      strokeStyle: action.name === 'click-attack' && opponent.getFieldCards().length === 0 ? 'red' : '',
    });
    opponent.drawHandCards(this.context, action);
    opponent.drawFieldCards(this.context, action);
    opponent.drawMagic(this.context, action);
    opponent.drawDeck(this.context, action);
    opponent.drawGrave(this.context, action);

    // draw action menu
    if (opponent.getPhase() === 'waiting') {
      drawActionMenu(this.context, player.getPhase(), action);
      drawMagicActionMenu(this.context, player.getPhase(), action);
    }

    // check opponent player action
    if (player.getPhase() === 'waiting') {
      this.autoPlay(opponent, player);
    }
  }

  /*----------------------------------------------------------------*
   * Auto play
   *----------------------------------------------------------------*/
  autoPlay(opponent: Player, player: Player) {
    console.log('111 autoPlay');
    setTimeout(() => {
      if (player.getPhase() === 'waiting' && opponent.getPhase() === 'waiting') {
        opponent.setPhase('main');
        if (opponent.getHandCards()[0].idWithDeck) {
          opponent.playOneCard(opponent.getHandCards()[0].idWithDeck, 'up', 'atk', 'hand', 'field');
        }
        this.drawGame(this.action);
        return;
      }

      if (opponent.getPhase() === 'main') {
        opponent.setPhase('attack');
        this.drawGame(this.action);
        return;
      }

      if (opponent.getPhase() === 'attack') {
        opponent.setPhase('waiting');
        player.setPhase('main');
        this.drawGame(this.action);
        return;
      }
    }, 1000);
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
    const player = this.players[0];
    const opponent = this.players[1];

    // CHECK CLICK DECK
    if (checkCoordinate(mouseCoordinate, DECK)) {
      nextAction.name = 'click-deck';
      nextAction.type = 'deck';
      nextAction.payload.x = DECK.x;
      nextAction.payload.y = DECK.y;
    }

    // CHECK CLICK GRAVE
    if (checkCoordinate(mouseCoordinate, GRAVE)) {
      nextAction.name = 'click-grave';
      nextAction.type = 'grave';
      nextAction.payload.x = GRAVE.x;
      nextAction.payload.y = GRAVE.y;
    }

    // CHECK CLICK HAND CARD
    if (selectedHandCard?.idWithDeck) {
      nextAction.name = 'click-hand-card';
      nextAction.type = 'card';
      nextAction.payload = selectedHandCard;
    }

    // CHECK CLICK FIELD CARD
    if (selectedFieldCard?.idWithDeck) {
      nextAction.name = 'click-field-card';
      nextAction.type = 'card';
      nextAction.payload = selectedFieldCard;
    }

    // CHECK CLICK MAGIC CARD
    if (selectedMagicCard?.idWithDeck) {
      nextAction.name = 'click-magic-card';
      nextAction.type = 'card';
      nextAction.payload = selectedMagicCard;
    }

    // CHECK CLICK ATTACK/USE EFFECT
    if (this.action?.name === 'click-attack') {
      // If attack card
      const selectedOpponentFieldCard: Card = getSelectedCard(
        mouseCoordinate,
        this.players[1].getFieldCards(),
      );
      if (selectedOpponentFieldCard?.idWithDeck) {
        nextAction.name = 'click-attack-opponent-field-card';
        nextAction.payload = selectedOpponentFieldCard;

        //calculator atk
        this.cardAttack(
          this.action.payload.idWithDeck,
          selectedOpponentFieldCard.idWithDeck,
          player,
          opponent,
        );
      }
      // If attack directly
      if (checkCoordinate(mouseCoordinate, OPPONENT_HAND_CARDS_WRAPPER)) {
        nextAction.name = 'click-attack-opponent-directly';
        nextAction.payload = OPPONENT_HAND_CARDS_WRAPPER;
        this.cardAttack(this.action.payload.idWithDeck, '', player, opponent, true);
      }
    }

    // CHECK ACTION PLAYER
    if (player.getPhase() !== 'waiting') {
      // check click button NEXT PHASE
      if (checkCoordinate(mouseCoordinate, INFO_PHASE_BTN)) {
        nextAction.name = 'click-next-phase';
        player.setNextPhase();
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
      if (
        this.action &&
        (this.action.name === 'click-hand-card' || this.action.name === 'click-field-card')
      ) {
        const { attackBtn, changePositionBtn, useEffectBtn } = getActionMenuCoordinate(this.action);

        // ACTION-1: atk/ summon/ use effect
        if (checkCoordinate(mouseCoordinate, attackBtn)) {
          if (this.action.name === 'click-hand-card') {
            // summon
            if (this.action.payload.type === 'monster' && player.getFieldCards().length < 3) {
              player.playOneCard(this.action.payload.idWithDeck, 'up', 'atk', 'hand', 'field');
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
              player.playOneCard(this.action.payload.idWithDeck, 'down', 'atk', 'hand', 'magic-zone');
            }
            if (this.action.payload.type === 'monster' && player.getFieldCards().length < 3) {
              nextAction.name = 'click-set-monster-card';
              player.playOneCard(this.action.payload.idWithDeck, 'down', 'def', 'hand', 'field');
            }
            nextAction.payload = this.action.payload;
          }
        }
        // ACTION-3: use card effect
        if (checkCoordinate(mouseCoordinate, useEffectBtn)) {
          if (
            this.action &&
            this.action.name === 'click-field-card' &&
            this.action.payload.effect?.idWithDeck
          ) {
            nextAction.name = 'click-use-effect';
            nextAction.payload = this.action.payload;
          }
        }
      }
    }

    // if action change update & draw game
    if (this.action && (this.action.name !== '' || nextAction.name !== '')) {
      this.drawGame(nextAction);
    }

    console.log('[LOG] - this.action, nextAction, player', this.action, nextAction, player);

    this.action = nextAction;
  }
}
