import Main from './Main';

export default class GameControlButton extends Main {
  private controlButton: HTMLElement;

  constructor() {
    super(['player', 'computer']);

    const app = <HTMLElement>document.getElementById('app');
    this.controlButton = <HTMLElement>document.createElement('div');
    this.controlButton.setAttribute('id', 'bottom-game');
    app.appendChild(this.controlButton);
  }

  public render(): void {
    this.controlButton.innerHTML = `
      <div class='title-game'>
        <h5>Vite + TypeScript + Game</h5>
      </div>
      <div class='control-button'>
        <div>
            <button id="control-button__start" type="button">Start</button>
          </div>
        <div>
          <button id="control-button__stop" type="button" disabled>Stop</button>
        </div>
      </div>
    `;
    this.controlButtonClicked(
      document.querySelector<HTMLButtonElement>('#control-button__start')!,
      document.querySelector<HTMLButtonElement>('#control-button__stop')!,
    );
  }

  private controlButtonClicked(startButton: HTMLButtonElement, stopButton: HTMLButtonElement) {
    startButton.addEventListener('click', () => {
      if (this.playStatus === 'inMenuStartGame') {
        this.start();
        startButton.disabled = true;
        stopButton.disabled = false;
      }
    });
    stopButton.addEventListener('click', () => {
      if (this.playStatus !== 'inMenuStartGame') {
        this.stop();
        startButton.disabled = false;
        stopButton.disabled = true;
      }
    });
  }
}
