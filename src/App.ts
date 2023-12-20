import './style.css';
import GameStart from './components/scenes/GameStart';
class App {
  constructor() {}

  /*----------------------------------------------------------------*
   * Start game
   *----------------------------------------------------------------*/
  public startGame(type: string): void {
    switch (type) {
      case 'init': {
        const gameStart = new GameStart();
        gameStart.render();
        break;
      }
      case 'continues': {
        break;
      }

      default:
        break;
    }
  }
}

window.onload = () => {
  let app = new App();

  app.startGame('init');
};
