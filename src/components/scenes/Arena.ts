import { INFO_PHASE_BTN } from '../../constant/INFO_VIEW';
import { DECK, GRAVE, OPPONENT_HAND_CARDS_WRAPPER, SCREEN } from '../../constant/constant';
import { checkCoordinate, getSelectedCard } from '../../helper/checkCoordinate';
import { drawFillRect, drawRect } from '../../helper/draw';
import { getDeckData } from '../../helper/getData';
import { IAction, TCard, TPlayStatus, TPlayerType } from '../../types';
import Main from '../Main';
import Player from '../Player';
import Card from '../card/Card';
import {
  drawActionMenu,
  drawMagicActionMenu,
  getActionMenuCoordinate,
  getMagicMenuCoordinate,
} from '../draw/drawActionMenu';
import { drawMainFrame } from '../draw/drawMainFrame';
import { drawViewInfo } from '../draw/drawViewInfo';

export default class Arena extends Main {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;
  protected players: Player[] = [];
  public player: Player;
  public opponent: Player;
  protected turn: string;
  protected action: IAction = { name: 'init', mouseCoordinate: {}, type: null };

  protected playStatus: TPlayStatus;

  constructor() {
    super();
    // initialize canvas 2d render game
    const { canvas, context } = this.initCanvas(this.checkPlayAction.bind(this));
    this.canvas = canvas;
    this.context = context;

    this.playStatus = 'inMenuStartGame';
    this.turn = ['player1', 'player2'][0];
    const playerDeck = getDeckData('dwarf');
    const opponentDeck = getDeckData('thousand-year-gold-dragon');

    playerDeck.map((card: Card, index) => card.setIdWithDeck('player-' + card.id + '-' + index));
    opponentDeck.map((card: Card, index) => card.setIdWithDeck('opponent-' + card.id + '-' + index));
    this.player = new Player('player', playerDeck);
    this.opponent = new Player('opponent', opponentDeck);
    this.players.push(this.player);
    this.players.push(this.opponent);
  }

  public render(): void {
    this.playStatus = 'inGame';
    // get data
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
   * Game turn
   *----------------------------------------------------------------*/
  public handlePlayTurn(nextTurn: TPlayerType) {
    if (nextTurn === 'player') {
    }
  }

  /*----------------------------------------------------------------*
   * Draw/Update game
   *----------------------------------------------------------------*/
  public drawGame(action: IAction) {
    // clear before rerender
    // this.clear();

    // draw main frame
    drawMainFrame(this.context, this.player, this.opponent, action);

    // draw view info game
    drawViewInfo(this.context, this.player, this.opponent, action);

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
          this.opponent.playOneCard(this.opponent.getHand()[0].idWithDeck, 'hand', 'field');
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
   * Action game: Card attack
   *----------------------------------------------------------------*/
  cardAttack(idWithDeck: string, targetId: string, isDirectly = false) {
    const card: TCard = this.player.getOneFieldCard(idWithDeck);
    const target: TCard = this.opponent.getOneFieldCard(targetId);

    if (card && card.atk && card.def) {
      if (target && target.atk && target.def) {
        if (target.getPosition() === 'def') {
          let defDamage = card.atk - target.def;
          if (defDamage < 0) {
            this.player.setScore('atk', defDamage * -1);
            this.player.playOneCard(card.idWithDeck, 'field', 'grave');
          } else if (defDamage > 0) {
            this.opponent.playOneCard(target.idWithDeck, 'field', 'grave');
          }
        } else if (target.getPosition() === 'atk') {
          let atkDamage = card.atk - target.atk;
          console.log('111 atkDamage', atkDamage);
          if (atkDamage === 0) {
            this.player.playOneCard(card.idWithDeck, 'field', 'grave');
            this.opponent.playOneCard(target.idWithDeck, 'field', 'grave');
          } else if (atkDamage > 0) {
            this.opponent.playOneCard(target.idWithDeck, 'field', 'grave');
            this.opponent.setScore('atk', atkDamage);
          } else {
            this.player.playOneCard(card.idWithDeck, 'field', 'grave');
            this.player.setScore('atk', atkDamage * -1);
          }
        }
      } else if (isDirectly) {
        this.opponent.setScore('atk', card.atk);
      }
    }
  }

  /*----------------------------------------------------------------*
   * Check play action
   *----------------------------------------------------------------*/
  public checkPlayAction(e: any) {
    let gameWidth = document.querySelector('canvas')?.clientWidth || 0;
    let gameHeight = document.querySelector('canvas')?.clientHeight || 0;
    let screenRatio = gameWidth < SCREEN.width ? gameWidth / SCREEN.width : 1;
    let xMouse = e.clientX - (window.innerWidth - gameWidth) / 2;
    let yMouse = e.clientY - (window.innerHeight - gameHeight - 53) / 2;
    let mouseCoordinate = { x: xMouse, y: yMouse };
    let nextAction: IAction = { name: '', mouseCoordinate, type: null, payload: {} };

    const selectedHandCard: TCard = getSelectedCard(mouseCoordinate, this.player.getHand(), screenRatio);
    const selectedFieldCard: TCard = getSelectedCard(mouseCoordinate, this.player.getField(), screenRatio);
    const selectedMagicCard: TCard = getSelectedCard(
      mouseCoordinate,
      this.player.getMagicZone(),
      screenRatio,
    );
    const selectedOptFieldCard: TCard = getSelectedCard(
      mouseCoordinate,
      this.opponent.getField(),
      screenRatio,
    );

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
    if (
      selectedOptFieldCard?.idWithDeck &&
      selectedOptFieldCard?.idWithDeck.split('-')?.[0] === 'opponent' &&
      this.action.name !== 'click-attack'
    ) {
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
        this.opponent.getField(),
        screenRatio,
      );
      if (selectedOpponentFieldCard?.idWithDeck) {
        this.player.setPhase('attack');

        nextAction.name = 'click-attack-opponent-field-card';
        nextAction.payload = selectedOpponentFieldCard;

        //calculator atk
        this.cardAttack(this.action.payload.idWithDeck, selectedOpponentFieldCard.idWithDeck);
      }
      // If attack directly
      if (checkCoordinate(mouseCoordinate, OPPONENT_HAND_CARDS_WRAPPER, screenRatio)) {
        nextAction.name = 'click-attack-opponent-directly';
        nextAction.payload = OPPONENT_HAND_CARDS_WRAPPER;
        this.cardAttack(this.action.payload.idWithDeck, '', true);
      }
    }

    // CHECK ACTION PLAYER
    if (this.player.getPhase() !== 'waiting') {
      // check click button NEXT PHASE
      if (checkCoordinate(mouseCoordinate, INFO_PHASE_BTN, screenRatio)) {
        nextAction.name = 'click-next-phase';
        this.player.setPhase();
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
            if (this.action.payload.cardType === 'monster' && this.player.getField().length < 3) {
              this.player.playOneCard(this.action.payload.idWithDeck, 'hand', 'field');
            }
            // use effect
            if (this.action.payload.cardType === 'effect' && this.player.getMagicZone().length < 3) {
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
              this.player.getMagicZone().length < 3
            ) {
              nextAction.name = 'click-set-magic-card';
              this.player.playOneCard(this.action.payload.idWithDeck, 'hand', 'magic-zone', 'down', 'atk');
            }
            if (this.action.payload.cardType === 'monster' && this.player.getField().length < 3) {
              nextAction.name = 'click-set-monster-card';
              this.player.playOneCard(this.action.payload.idWithDeck, 'hand', 'field', 'down', 'def');
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
      this.player,
    );

    this.action = nextAction;
  }
}
