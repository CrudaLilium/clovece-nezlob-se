import { rollDice6 } from "./DiceRolls";
import EPlayerColor from "../EPlayerColors";
import { EPlayerCellFlag, EPlayerGameState, IBoardCell, IObjectIdentity, IPlayer, IPlayerCell, IPlayerPiece } from "./GameStructs";
import { IBoardCreationFactory } from "./IBoardCreationFactory";
import { IPlayerCreationFactory } from "./IPlayerCreationFactory";

export enum ETurnState {
    waitingForRoll,
    waitingForPieceSelection,
    waitingForPieceSelectionAndPass
}

export interface ITurnInfo {
    state: ETurnState;
    currentPlayer: IPlayer;
    throwNumber: number;
    maxThrows: number;
    message: string;
    special: boolean;
    roll?: number;
}

export class Game {
    public players: Array<IPlayer & IObjectIdentity>;
    public board: Array<IBoardCell & IObjectIdentity>;
    public turn: ITurnInfo;

    public get playerCells(): Array<IBoardCell & IObjectIdentity & { player: IPlayer }> {
        return this.players.reduce<Array<IBoardCell & IObjectIdentity & { player: IPlayer }>>((accumulator, player) => {
            const cells = player.cells.map((cell) => { return { ...cell.cell, player }; });
            return accumulator.concat(...cells);
        }, []);
    }

    public get playerPieces(): Array<IPlayerPiece & IObjectIdentity & { player: IPlayer }> {
        return this.players.reduce<Array<IPlayerPiece & IObjectIdentity & { player: IPlayer }>>((accumulator, player) => {
            const pieces = player.pieces.map((piece) => { return { ...piece, player }; });
            return accumulator.concat(...pieces);
        }, []);
    }

    constructor(factories: { boardFactory: IBoardCreationFactory, playerFactory: IPlayerCreationFactory }, players: Array<{ playerName: string, color: EPlayerColor }>) {
        this.board = factories.boardFactory.create();
        this.players = players.map((playerInfo, index) => factories.playerFactory.createPlayerablePlayer(playerInfo, index, this.board));

        this.turn = {
            state: ETurnState.waitingForRoll,
            currentPlayer: this.players[0],
            throwNumber: 0,
            maxThrows: 3,
            message: "Try rolling 6 to get into game!",
            special: false
        };
    }

    public roll() {
        if (this.turn.state !== ETurnState.waitingForRoll)
            return; //illegal roll

        if (this.turn.currentPlayer.gameStatus === EPlayerGameState.startingRolls) {
            this.turn.roll = rollDice6();
            if (this.turn.roll === 6) {
                this.turn.message = "select piece to get into board and roll again!";
                this.turn.special = true;
                this.turn.state = ETurnState.waitingForPieceSelection;
                this.turn.currentPlayer.gameStatus = EPlayerGameState.inPlay;
                this.turn.currentPlayer.pieces.forEach(piece => piece.selectable = true);
            }
            else {
                this.turn.special = false;
                this.turn.throwNumber++;
                this.turn.message = "Try rolling 6 to get into game!";
            }
            if (this.turn.throwNumber === this.turn.maxThrows) {
                this.passTurnToNextPlayer();
            }
            return this.turn.roll;
        }

        if (this.turn.currentPlayer.gameStatus === EPlayerGameState.inPlay) {
            this.turn.roll = rollDice6();
            const possibleMovablePieces = this.checkMoveablePieces();
            if (possibleMovablePieces === 0) {
                this.passTurnToNextPlayer();
                return;
            }
            this.turn.special = false;
            this.turn.message = "select piece on board to move!";
            this.turn.state = ETurnState.waitingForPieceSelectionAndPass;
            if (this.turn.roll === 6) {
                this.turn.special = true;
                this.turn.state = ETurnState.waitingForPieceSelection;
            }
            return this.turn.roll;
        }
    }

    private checkMoveablePieces() {
        let selectablePieces = 0;
        const playerStartingCells = this.turn.currentPlayer.cells.filter(cell => cell.flag === EPlayerCellFlag.homeCell).map(cell => cell.cell);
        if (this.turn.roll === 6) {
            const piecesAtStart = this.turn.currentPlayer.pieces.filter(piece => (piece.boardPosition as IPlayerCell).flag === EPlayerCellFlag.homeCell);
            for (let piece of piecesAtStart) {
                piece.selectable = true;
                selectablePieces++;
            }
        }
        const tracks = this.turn.currentPlayer.raceTrack;
        const piecesInPlay = this.turn.currentPlayer.pieces.filter(piece => tracks.some(cell => cell.cell.index === piece.boardPosition.cell.index));
        for (let piece of piecesInPlay) {
            const pieceIndexOnTrack = tracks.indexOf(piece.boardPosition);
            const possibleNewPosition = pieceIndexOnTrack + this.turn.roll;
            const position = tracks[possibleNewPosition];
            if (!position) //out of track
            {
                continue;
            }
            const isOccupied = piecesInPlay.some(piece => piece.boardPosition === position);
            if (!isOccupied) //can move
            {
                piece.selectable = true;
                selectablePieces++;
            }
        }
        return selectablePieces;
    }

    public pieceSelect(objectId: number) {
        console.log("pieceSelect", objectId);
        if (!(this.turn.state === ETurnState.waitingForPieceSelection || this.turn.state === ETurnState.waitingForPieceSelectionAndPass))
            return;
        const playerPiece = this.turn.currentPlayer.pieces.find(item => item.identity === objectId);
        if (!playerPiece) {
            console.warn("attempt to select empty cell or piece not belonging to current player, canceling");
            return;
        }
        if(!playerPiece.selectable)
        {
            console.warn("piece is not selectable");
            return;
        }
        if (this.turn.special && (playerPiece.boardPosition as IPlayerCell).flag === EPlayerCellFlag.homeCell) {
            playerPiece.boardPosition.cell.occupied = null;
            const newPosition = this.turn.currentPlayer.raceTrack[0];
            this._sendHome(newPosition.cell.occupied);
            playerPiece.boardPosition = this.turn.currentPlayer.raceTrack[0];
            playerPiece.boardPosition.cell.occupied = playerPiece;
        }
        else {
            const currentCell = this.turn.currentPlayer.raceTrack.find((item) => item.cell.index === playerPiece.boardPosition.cell.index);
            const indexOfCurrentCell = this.turn.currentPlayer.raceTrack.indexOf(currentCell);
            const newIndex = indexOfCurrentCell + this.turn.roll;
            const newPosition = this.turn.currentPlayer.raceTrack[newIndex];
            if (newPosition) {
                playerPiece.boardPosition.cell.occupied = null;
                this._sendHome(newPosition.cell.occupied);
                playerPiece.boardPosition = newPosition;
                newPosition.cell.occupied = playerPiece;
            }
        }

        //check game is over
        if (!(this.turn.currentPlayer.cells.filter(cell => cell.flag === EPlayerCellFlag.finishCell).some(cell => !cell.cell.occupied))) {
            console.log("game over!");
            alert("game over");
        }

        if (this.turn.state === ETurnState.waitingForPieceSelectionAndPass) {
            this.passTurnToNextPlayer();
        }
        this.turn.state = ETurnState.waitingForRoll;
        //reset selectablepieces
        this.turn.currentPlayer.pieces.forEach(piece => piece.selectable = false);
    }

    private _sendHome(piece?: IPlayerPiece & IObjectIdentity) {
        if (!piece) {
            return;
        }
        const combo = this.playerPieces.find(combo => combo.identity === piece.identity);
        const freeHome = combo.player.cells.find(cell => cell.flag === EPlayerCellFlag.homeCell && !cell.cell.occupied);
        piece.boardPosition = freeHome;
        freeHome.cell.occupied = piece;

        piece.boardPosition.cell.occupied = null;
    }

    private passTurnToNextPlayer() {
        let indexOfNextPlayer = this.players.indexOf(this.turn.currentPlayer) + 1;
        if (indexOfNextPlayer == this.players.length)
            indexOfNextPlayer = 0;
        this.turn.currentPlayer = this.players[indexOfNextPlayer];
        this.turn.throwNumber = 0;
        this.turn.maxThrows = this.turn.currentPlayer.gameStatus === EPlayerGameState.startingRolls ? 3 : 1;
        this.turn.special = false;
    }
}