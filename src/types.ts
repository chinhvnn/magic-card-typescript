//System
export type TPlayStatus = 'inMenuStartGame' | 'inGame' | 'playing' | 'pause';
export type TPlayerAction =
  | ''
  | 'init'
  | 'click-deck'
  | 'click-grave'
  | 'click-hand-card'
  | 'click-field-card'
  | 'click-ok';
export interface IAction {
  name: TPlayerAction;
  mouseCoordinate: any;
  payload?: any;
}
