import './style.css';
import GameControlButton from './components/GameControlButton';

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

  app.setup();
};
