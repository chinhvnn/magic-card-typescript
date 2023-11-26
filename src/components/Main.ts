import { IAction, IActionCount, IEffect, TCard, TPlayStatus, TPlayerType } from '../types';
import { DECK, GRAVE, HAND_CARDS_WRAPPER, OPPONENT_HAND_CARDS_WRAPPER, SCREEN } from '../constant/constant';
import Player from './Player';
import { checkCoordinate, getSelectedCard } from '../helper/checkCoordinate';
import { drawViewInfo } from './draw/drawViewInfo';
import Card from './card/Card';
import {
  drawActionMenu,
  drawMagicActionMenu,
  getActionMenuCoordinate,
  getMagicMenuCoordinate,
} from './draw/drawActionMenu';
import { INFO_PHASE_BTN } from '../constant/INFO_VIEW';
import { drawFillRect, drawRect } from '../helper/draw';
import MonsterCard from './card/MonsterCard';
import { drawMainFrame } from './draw/drawMainFrame';
import dwarf from '../data/cards/warrior/dwarf.json';
import { getCardData, getDeckData } from '../helper/getData';

export default class Main {
  protected players: Player[] = [];
  public player: Player;
  public opponent: Player;
  protected turn: string;
  protected action: IAction = { name: 'init', mouseCoordinate: {}, type: null };

  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;
  protected playStatus: TPlayStatus;

  constructor(playerNames: string[]) {
    this.playStatus = 'inMenuStartGame';
    this.turn = playerNames[0];
    const playerDeck = getDeckData('dwarf');
    const opponentDeck = getDeckData('thousand-year-gold-dragon');
    console.log('111', opponentDeck[0]);

    playerDeck.map((card: Card, index) => card.setIdWithDeck('player-' + card.id + '-' + index));
    opponentDeck.map((card: Card, index) => card.setIdWithDeck('opponent-' + card.id + '-' + index));
    this.player = new Player('player', playerDeck);
    this.opponent = new Player('opponent', opponentDeck);
    this.players.push(this.player);
    this.players.push(this.opponent);

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

    // get data
    console.log('111 dwarf', this.opponent.getDeck()[0]);

    // player
    this.player.setPhase('main');
    this.player.addCardFromDeckToHand([
      this.player.getCard(this.player.getDeck()[0].getIdWithDeck(), this.player.getDeck()),
    ]);

    // computer
    this.opponent.setPhase('waiting');
    this.opponent.addCardFromDeckToHand([
      this.opponent.getCard(this.opponent.getDeck()[0].getIdWithDeck(), this.opponent.getDeck()),
    ]);

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
   * Action game: Card attack
   *----------------------------------------------------------------*/
  cardAttack(idWithDeck: string, targetId: string, player: Player, opponent: Player, isDirectly = false) {
    const card: TCard = this.player.getOneFieldCard(idWithDeck);
    const target: TCard = opponent.getOneFieldCard(targetId);

    if (card && card.atk && card.def) {
      if (target && target.atk && target.def) {
        if (target.getPosition() === 'def') {
          let defDamage = card.atk - target.def;
          if (defDamage < 0) {
            this.player.setScore('atk', defDamage * -1);
            player.playOneCard(card.idWithDeck, 'up', 'atk', 'field', 'grave');
          } else if (defDamage > 0) {
            opponent.playOneCard(target.idWithDeck, 'up', 'atk', 'field', 'grave');
          }
        } else if (target.getPosition() === 'atk') {
          let atkDamage = card.atk - target.atk;
          if (atkDamage === 0) {
            player.playOneCard(card.idWithDeck, 'up', 'atk', 'field', 'grave');
            opponent.playOneCard(target.idWithDeck, 'up', 'atk', 'field', 'grave');
          } else if (atkDamage > 0) {
            opponent.playOneCard(target.idWithDeck, 'up', 'atk', 'field', 'grave');
            opponent.setScore('atk', atkDamage);
          } else {
            player.playOneCard(card.idWithDeck, 'up', 'atk', 'field', 'grave');
            player.setScore('atk', atkDamage * -1);
          }
        }
      } else if (isDirectly) {
        opponent.setScore('atk', card.atk);
      }
    }
  }

  /*----------------------------------------------------------------*
   * Draw/Update game
   *----------------------------------------------------------------*/
  public handlePlayTurn(nextTurn: TPlayerType) {
    if (nextTurn === 'player') {
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

    // draw main frame
    drawMainFrame(this.context, player, opponent, action);

    // draw view info game
    drawViewInfo(this.context, player, opponent, action);

    // draw player item
    this.player.drawHand(this.context, action);
    this.player.drawField(this.context, action);
    this.player.drawMagic(this.context, action);
    this.player.drawDeck(this.context, action);
    this.player.drawGrave(this.context, action);

    // draw computer item
    drawFillRect(
      this.context,
      OPPONENT_HAND_CARDS_WRAPPER,
      action.name === 'click-attack' && !this.opponent.getField().length,
    );
    drawRect(this.context, {
      ...OPPONENT_HAND_CARDS_WRAPPER,
      strokeStyle: action.name === 'click-attack' && !this.opponent.getField().length ? 'red' : '',
    });

    this.opponent.drawHand(this.context, action);
    this.opponent.drawField(this.context, action);
    this.opponent.drawMagic(this.context, action);
    this.opponent.drawDeck(this.context, action);
    this.opponent.drawGrave(this.context, action);

    // draw action menu
    if (this.opponent.getPhase() === 'waiting') {
      drawActionMenu(this.context, this.player.getPhase(), action);
      drawMagicActionMenu(this.context, this.player.getPhase(), action);
    }

    // check opponent player action
    if (this.player.getPhase() === 'waiting') {
      this.autoPlay();
    }
  }

  /*----------------------------------------------------------------*
   * Auto play
   *----------------------------------------------------------------*/
  autoPlay() {
    setTimeout(() => {
      if (this.player.getPhase() === 'waiting' && this.opponent.getPhase() === 'waiting') {
        this.opponent.setPhase('main');
        if (this.opponent.getHand()[0]?.idWithDeck) {
          this.opponent.playOneCard(this.opponent.getHand()[0].idWithDeck, 'up', 'atk', 'hand', 'field');
        }
        this.drawGame(this.action);
        return;
      }

      if (this.opponent.getPhase() === 'main') {
        this.opponent.setPhase('attack');
        this.drawGame(this.action);
        return;
      }

      if (this.opponent.getPhase() === 'attack') {
        this.opponent.setPhase('waiting');
        this.player.setPhase('main');
        this.drawGame(this.action);
        return;
      }
    }, 1000);
  }

  /*----------------------------------------------------------------*
   * Check play action
   *----------------------------------------------------------------*/
  public checkPlayAction(e: MouseEvent) {
    const player = this.players[0];
    const opponent = this.players[1];
    console.log('111', document.querySelector('canvas')?.clientHeight);
    let gameWidth = document.querySelector('canvas')?.clientWidth || 0;
    let gameHeight = document.querySelector('canvas')?.clientHeight || 0;
    let screenRatio = gameWidth < SCREEN.width ? gameWidth / SCREEN.width : 1;
    let xMouse = e.clientX - (window.innerWidth - gameWidth) / 2;
    let yMouse = e.clientY - (window.innerHeight - gameHeight - 53) / 2;
    let mouseCoordinate = { x: xMouse, y: yMouse };
    let nextAction: IAction = { name: '', mouseCoordinate, type: null, payload: {} };
    const selectedHandCard: TCard = getSelectedCard(mouseCoordinate, player.getHand(), screenRatio);
    const selectedFieldCard: TCard = getSelectedCard(mouseCoordinate, player.getField(), screenRatio);
    const selectedMagicCard: TCard = getSelectedCard(mouseCoordinate, player.getMagicZone(), screenRatio);
    const selectedOptFieldCard: TCard = getSelectedCard(mouseCoordinate, opponent.getField(), screenRatio);

    // CHECK CLICK DECK
    if (checkCoordinate(mouseCoordinate, DECK, screenRatio)) {
      nextAction.name = 'click-deck';
      nextAction.type = 'deck';
      nextAction.payload.x = DECK.x;
      nextAction.payload.y = DECK.y;
    }

    // CHECK CLICK GRAVE
    if (checkCoordinate(mouseCoordinate, GRAVE, screenRatio)) {
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
    if (selectedOptFieldCard?.idWithDeck && selectedOptFieldCard?.idWithDeck.split('-')?.[0] === 'opponent') {
      nextAction.name = 'click-opponent-field-card';
      nextAction.type = 'card';
      nextAction.payload = selectedOptFieldCard;
    }

    // CHECK CLICK OPPONENT FIELD CARD
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
        this.players[1].getField(),
        screenRatio,
      );
      if (selectedOpponentFieldCard?.idWithDeck) {
        player.setPhase('attack');

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
      if (checkCoordinate(mouseCoordinate, OPPONENT_HAND_CARDS_WRAPPER, screenRatio)) {
        nextAction.name = 'click-attack-opponent-directly';
        nextAction.payload = OPPONENT_HAND_CARDS_WRAPPER;
        this.cardAttack(this.action.payload.idWithDeck, '', player, opponent, true);
      }
    }

    // CHECK ACTION PLAYER
    if (player.getPhase() !== 'waiting') {
      // check click button NEXT PHASE
      if (checkCoordinate(mouseCoordinate, INFO_PHASE_BTN, screenRatio)) {
        nextAction.name = 'click-next-phase';
        player.setPhase();
      }

      // check click button MAGIC CARD ACTION
      if (this.action && this.action.name === 'click-magic-card') {
        const { magicBtn } = getMagicMenuCoordinate(this.action);
        if (checkCoordinate(mouseCoordinate, magicBtn, screenRatio)) {
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
        if (checkCoordinate(mouseCoordinate, attackBtn, screenRatio)) {
          if (this.action.name === 'click-hand-card') {
            // summon
            if (this.action.payload.cardType === 'monster' && player.getField().length < 3) {
              player.playOneCard(this.action.payload.idWithDeck, 'up', 'atk', 'hand', 'field');
            }
            // use effect
            if (this.action.payload.cardType === 'effect' && player.getMagicZone().length < 3) {
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
        if (checkCoordinate(mouseCoordinate, changePositionBtn, screenRatio)) {
          // change position or Face up
          if (this.action.name === 'click-field-card') {
            // change position
            if (this.action.payload.face === 'up') {
              nextAction.name = 'click-change-position';
              const position = this.action.payload.position === 'atk' ? 'def' : 'atk';
              this.action.payload.setPosition(position);
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
              (this.action.payload.cardType === 'effect' || this.action.payload.type === 'trap') &&
              player.getMagicZone().length < 3
            ) {
              nextAction.name = 'click-set-magic-card';
              player.playOneCard(this.action.payload.idWithDeck, 'down', 'atk', 'hand', 'magic-zone');
            }
            if (this.action.payload.cardType === 'monster' && player.getField().length < 3) {
              nextAction.name = 'click-set-monster-card';
              player.playOneCard(this.action.payload.idWithDeck, 'down', 'def', 'hand', 'field');
            }
            nextAction.payload = this.action.payload;
          }
        }
        // ACTION-3: use card effect
        if (checkCoordinate(mouseCoordinate, useEffectBtn, screenRatio)) {
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

    console.log(
      '[LOG] - this.action:',
      this.action,
      '\n[LOG] - nextAction:',
      nextAction,
      '\n[LOG] - player:',
      player,
    );

    this.action = nextAction;
  }
}
