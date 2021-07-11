import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Game } from './Game/Game';
import { Main } from './Main';
import EPlayerColor from './EPlayerColors';
import { Board4Factory } from './Game/Board4PFactory';
import { IdentityFactory } from './Game/IdentityGenerator';
import { PlayerFactory4PBoard } from './Game/PlayerFactory4PBoard';

export class App {
  public game: Game;

  constructor() {
    this.render();
  }

  public startGame(players: Array<{ playerName: string, color: EPlayerColor }>) {
    const factories = { boardFactory: new Board4Factory(IdentityFactory), playerFactory: new PlayerFactory4PBoard(IdentityFactory) };
    this.game = new Game(factories, players);
  }

  private render(): void {
    ReactDOM.render(
      <Main app={this} />,
      document.getElementById("app")
    );
  }
}

new App();