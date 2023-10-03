import Main from './Main';

export default class GameControlButton extends Main {
  private controlButton: HTMLElement;

  constructor() {
    super(['chinh1', 'chinh2']);

    const app = <HTMLElement>document.getElementById('app');
    this.controlButton = <HTMLElement>document.createElement('div');
    this.controlButton.setAttribute('id', 'control-button');
    app.appendChild(this.controlButton);
  }

  public render(): void {
    this.controlButton.innerHTML = `
      <h5>Vite + TypeScript + Game</h5>
      <div>
        <button id="control-button__start" type="button">Start</button>
      </div>
      <div>
        <button id="control-button__stop" type="button" disabled>Stop</button>
      </div>
    `;
    this.controlButtonClicked(
      document.querySelector<HTMLButtonElement>('#control-button__start')!,
      document.querySelector<HTMLButtonElement>('#control-button__stop')!
    );
  }

  private controlButtonClicked(
    startButton: HTMLButtonElement,
    stopButton: HTMLButtonElement
  ) {
    startButton.addEventListener('click', () => {
      console.log('111 startGameClicked');
      if (!this.isStarting) {
        this.start();
        startButton.disabled = true;
        stopButton.disabled = false;
      }
    });
    stopButton.addEventListener('click', () => {
      console.log('111 stop cliecked');
      if (this.isStarting) {
        this.stop();
        startButton.disabled = false;
        stopButton.disabled = true;
      }
    });
  }
}
