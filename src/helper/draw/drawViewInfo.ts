import Player from '../../components/Player';
import { INFO_VIEW } from '../../constant';
import { IAction } from '../../types';

export const drawViewInfo = (
  context: CanvasRenderingContext2D,
  player: Player,
  opponent: Player,
  action?: IAction,
) => {
  context.beginPath();
  context.fillStyle = INFO_VIEW.bg;
  context.fillRect(INFO_VIEW.x, INFO_VIEW.y, INFO_VIEW.width, INFO_VIEW.height);
  context.closePath();

  // Draw player info
  context.beginPath();
  context.fillStyle = INFO_VIEW.player.bg;
  context.fillRect(INFO_VIEW.player.x, INFO_VIEW.player.y, INFO_VIEW.player.width, INFO_VIEW.player.height);
  context.fillStyle = 'red';
  context.fillText(player.getScore().toString(), INFO_VIEW.player.x + 5, INFO_VIEW.player.y + 20);
  context.closePath();

  context.beginPath();
  context.fillStyle = INFO_VIEW.opponent.bg;
  context.fillRect(
    INFO_VIEW.opponent.x,
    INFO_VIEW.opponent.y,
    INFO_VIEW.opponent.width,
    INFO_VIEW.opponent.height,
  );
  context.fillStyle = 'red';
  context.fillText(opponent.getScore().toString(), INFO_VIEW.opponent.x + 5, INFO_VIEW.opponent.y + 20);
  context.closePath();
};
