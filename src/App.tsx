import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GameBoard } from './GameBoard';
import { Game } from './Game';
import { Main } from './Main';

export class App {
  public game: Game;

  constructor() {
    this.render();
  }

  public startGame(){
    this.game = new Game();
  }

  private render(): void {
    ReactDOM.render(
      <Main app={this} />,
      document.getElementById("app")
    );
  }
}

new App();