import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Main } from './Main';
import { Game } from './Game';

export class App {
  public game: Game;

  constructor() {
    this.game = new Game();
    this.render();
  }

  private render(): void {
    ReactDOM.render(
      <Main app={this} />,
      document.getElementById("app")
    );
  }
}

new App();