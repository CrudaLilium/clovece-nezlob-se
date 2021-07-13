import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Game } from './Game/Game';
import { Main } from './Main';
import { Board4Factory } from './Game/Board4PFactory';
import { IdentityFactory } from './Game/IdentityGenerator';
import { PlayerFactory4PBoard } from './Game/PlayerFactory4PBoard';
import { IPlayerInfo } from './IPlayerInfo';
import { IBoardCell, IObjectIdentity } from './Game/GameStructs';

class GameConfigFactory {
  getFactories(players: Array<IPlayerInfo>) {
    return {
      boardFactory: new Board4Factory(IdentityFactory),
      playerFactory: {
        create: (board: Array<IBoardCell & IObjectIdentity>) => {
          const playerFactory = new PlayerFactory4PBoard(IdentityFactory);
          return players.map((playerInfo, index) => playerFactory.createPlayerablePlayer(playerInfo, index, board));
        }
      }
    };
  }
}

export class App {
  public game: Game;

  constructor() {
    this.render();
  }

  public startGame(players: Array<IPlayerInfo>) {
    this.game = new Game(new GameConfigFactory().getFactories(players));
  }

  private render(): void {
    ReactDOM.render(
      <Main app={this} />,
      document.getElementById("app")
    );
  }
}

new App();