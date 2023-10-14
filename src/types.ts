import Card from './components/Card';

//System
export type TPlayStatus = 'inMenuStartGame' | 'inGame' | 'playing' | 'pause';
export type TCardPosition = 'def' | 'atk' | 'block';
export type TCardFace = 'up' | 'down';
export type TCardType = 'monster' | 'effect' | 'trap';
export type TCardPlace = 'deck' | 'grave' | 'hand' | 'magic-zone' | 'field';
export type TActionType = null | 'card' | 'deck' | 'grave' | 'action-menu';
export type TEffect = 'power' | 'heal';
export type IPlayerType = 'player' | 'opponent';
export type TPlayerAction =
  | ''
  | 'init'
  | 'click-deck'
  | 'click-grave'
  | 'click-hand-card'
  | 'click-field-card'
  | 'click-magic-card'
  | 'click-opponent-field-card'
  | 'click-ok'
  | 'click-attack'
  | 'click-attack-opponent-field-card'
  | 'click-change-position'
  | 'click-change-face'
  | 'click-set-magic-card'
  | 'click-set-monster-card'
  | 'click-use-effect';

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
