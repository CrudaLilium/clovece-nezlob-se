import { EPlayerCellFlag, EPlayerGameState, IBoardCell, IObjectIdentity, IPlayer, IPlayerPiece } from "./GameStructs";
import { IPlayer as ILobbyPlayerData } from "../Lobby/PlayerLobbyInfo";
import { IPlayerCreationFactory } from "./IPlayerCreationFactory";
import { IIdentityGenerator } from "./IdentityGenerator";

export class PlayerFactory4PBoard implements IPlayerCreationFactory {
    private _idGenerator: IIdentityGenerator;
    constructor(idGenerator: IIdentityGenerator) {
        this._idGenerator = idGenerator;
    }

    public createPlayerablePlayer(entryData: ILobbyPlayerData, position: number, board: Array<IBoardCell & IObjectIdentity>): (IPlayer & IObjectIdentity) {
        const player: IPlayer & IObjectIdentity = {
            identity: this._idGenerator.createIdentity(),
            name: entryData.playerName,
            color: entryData.color,
            gameStatus: EPlayerGameState.startingRolls,
            cells: [],
            piecies: [],
            raceTrack: []
        };
        //cells
        this._createPlayerCells(player, position, board);
        //piecies
        const startingPositions = player.cells.filter(cell => cell.flag === EPlayerCellFlag.homeCell);
        startingPositions.forEach((position, index) => {
            const piece: IPlayerPiece & IObjectIdentity = {
                identity: this._idGenerator.createIdentity(),
                code: index.toString(),
                boardPosition: position,
                selectable: false
            };
            player.piecies.push(piece);
        });
        //raceTrack
        const boardSplit = board.indexOf(player.cells.find(cell => cell.flag === EPlayerCellFlag.boardStartCell).cell);
        const playerFinishCells = player.cells.filter(cell => cell.flag === EPlayerCellFlag.finishCell).map(cell => cell.cell);
        player.raceTrack = [
            ...board.slice(boardSplit, board.length),
            ...board.slice(0, boardSplit),
            ...playerFinishCells
        ];
        return player;
    }

    private _createPlayerCells(player: IPlayer, position: number, board: Array<IBoardCell & IObjectIdentity>) {
        switch (position) {
            case 0:
                //board.find(cell => cell.index === 0)
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: board.find(cell => cell.index === 0), flag: EPlayerCellFlag.boardStartCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 100, x: 1, y: 5 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 101, x: 2, y: 5 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 102, x: 3, y: 5 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 102, x: 4, y: 5 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 200, x: 0, y: 0 }, flag: EPlayerCellFlag.homeCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 201, x: 0, y: 1 }, flag: EPlayerCellFlag.homeCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 202, x: 1, y: 0 }, flag: EPlayerCellFlag.homeCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 203, x: 1, y: 1 }, flag: EPlayerCellFlag.homeCell });
                break;
            case 1:
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: board.find(cell => cell.index === 10), flag: EPlayerCellFlag.boardStartCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 110, x: 5, y: 1 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 111, x: 5, y: 2 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 112, x: 5, y: 3 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 112, x: 5, y: 4 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 210, x: 9, y: 0 }, flag: EPlayerCellFlag.homeCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 211, x: 10, y: 0 }, flag: EPlayerCellFlag.homeCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 212, x: 9, y: 1 }, flag: EPlayerCellFlag.homeCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 213, x: 10, y: 1 }, flag: EPlayerCellFlag.homeCell });
                break;
            case 2:
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: board.find(cell => cell.index === 20), flag: EPlayerCellFlag.boardStartCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 120, x: 9, y: 5 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 121, x: 8, y: 5 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 122, x: 7, y: 5 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 122, x: 6, y: 5 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 220, x: 9, y: 9 }, flag: EPlayerCellFlag.homeCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 221, x: 10, y: 9 }, flag: EPlayerCellFlag.homeCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 222, x: 9, y: 10 }, flag: EPlayerCellFlag.homeCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 223, x: 10, y: 10 }, flag: EPlayerCellFlag.homeCell });
                break;
            case 3:
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: board.find(cell => cell.index === 30), flag: EPlayerCellFlag.boardStartCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 130, x: 5, y: 9 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 131, x: 5, y: 8 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 132, x: 5, y: 7 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 132, x: 5, y: 6 }, flag: EPlayerCellFlag.finishCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 230, x: 0, y: 9 }, flag: EPlayerCellFlag.homeCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 231, x: 1, y: 9 }, flag: EPlayerCellFlag.homeCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 232, x: 0, y: 10 }, flag: EPlayerCellFlag.homeCell });
                player.cells.push({ identity: this._idGenerator.createIdentity(), cell: { index: 233, x: 1, y: 10 }, flag: EPlayerCellFlag.homeCell });
                break;
        }
    }
}