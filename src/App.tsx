import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GameBoard } from './GameBoard';
import { Game } from './Game';
import { Main } from './Main';
import EPlayerColor from './EPlayerColors';

export class App {
  public game: Game;

  constructor() {
    this.render();
  }

  public startGame(players: Array<{ playerName: string, color: EPlayerColor }>) {
    this.game = new Game(players);
  }

  private render(): void {
    ReactDOM.render(
      <Main app={this} />,
      document.getElementById("app")
    );
  }
}

new App();