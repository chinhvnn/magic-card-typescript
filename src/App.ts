import './style.css';
import GameControlButton from './components/GameControlButton';
import Player from './components/Player';
import Card from './components/Card';

class App {
  private _controlButton: GameControlButton;

  constructor(controlButton: GameControlButton) {
    this._controlButton = controlButton;
  }

  public setup(): void {
    this._controlButton.render();
  }
}

window.onload = () => {
  let app = new App(new GameControlButton());
  // let cardInHand = new Player('Player');

  // cardInHand.addToHand([new Card('1')]);

  app.setup();
};
