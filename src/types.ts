import Card from './components/card/Card';
import EffectCard from './components/card/EffectCard';
import MonsterCard from './components/card/MonsterCard';
import TrapCard from './components/card/TrapCard';

// Card
export type TCardType = 'monster' | 'effect' | 'trap';
export type TCard = MonsterCard & EffectCard & TrapCard;

// System
export type TScenes = 'start-menu-scenes' | 'lobby-scenes' | 'arena-scenes';
export type TPlayStatus = 'inMenuStartGame' | 'inGame' | 'playing' | 'pause';
export type TCardPosition = 'def' | 'atk' | 'block';
export type TCardFace = 'up' | 'down';
export type TCardPlace = 'deck' | 'grave' | 'hand' | 'magic-zone' | 'field';
export type TActionType = null | 'card' | 'deck' | 'grave' | 'action-menu' | 'game-menu';
export type TEffect = 'power' | 'heal';
export type TPlayerType = 'player' | 'opponent';
export type TPlayerPhase = 'main' | 'attack' | 'waiting';
export type TPlayerAction =
  | ''
  | 'init'
  | 'click-deck'
  | 'click-grave'
  | 'click-hand-card'
  | 'click-field-card'
  | 'click-magic-card'
  | 'click-opponent-deck'
  | 'click-opponent-grave'
  | 'click-opponent-field-card'
  | 'click-opponent-magic-card'
  | 'click-ok'
  | 'click-attack'
  | 'click-attack-opponent-field-card'
  | 'click-attack-opponent-directly'
  | 'click-change-position'
  | 'click-change-face'
  | 'click-set-magic-card'
  | 'click-set-monster-card'
  | 'click-use-effect'
  | 'click-next-phase'
  | IGameAction;

type IGameAction = 'click-start-game' | 'click-start-arena';

export interface IAction {
  name: TPlayerAction;
  mouseCoordinate: any;
  type: TActionType;
  payload?: Card | any;
}

export interface IEffect {
  id: number;
  name: string;
  description: string;
  type: TEffect;
}

export interface IActionCount {
  atkCount: number;
  maxAtkCount: number;
  useEffCount: number;
  maxUseEffCount: number;
}
