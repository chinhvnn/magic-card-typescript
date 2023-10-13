//System
export type TPlayStatus = 'inMenuStartGame' | 'inGame' | 'playing' | 'pause';
export type TCardPosition = 'def' | 'atk' | 'block';
export type TActionType = null | 'card' | 'deck' | 'grave' | 'action-menu';
export type TEffect = 'power' | 'heal';
export type TPlayerAction =
  | ''
  | 'init'
  | 'click-deck'
  | 'click-grave'
  | 'click-hand-card'
  | 'click-field-card'
  | 'click-opponent-field-card'
  | 'click-attack-opponent-field-card'
  | 'click-ok'
  | 'click-attack'
  | 'click-change-position'
  | 'click-use-effect';

export interface IAction {
  name: TPlayerAction;
  mouseCoordinate: any;
  type: TActionType;
  payload?: any;
}

export interface IEffect {
  id: number;
  name: string;
  description: string;
  type: TEffect;
}
