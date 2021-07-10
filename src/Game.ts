import { rollDice6 } from "./DiceRolls";
import EPlayerColor from "./EPlayerColors";
import { generateBoardInfo, generatePlayerBoardCells, generatePlayerPiecesAtStart, defaultFullGeneratePlayers, generatePlayersBasedOnLobby, generatePlayerRaceTracks } from "./GameInitializations";
import { EPlayerCellFlag, EPlayerGameState, IBoardCell, IObjectIdentity, IPlayer, IPlayerCell, IPlayerPiece } from "./GameStructs";

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
    public playerCells: Array<IBoardCell & IPlayerCell & IObjectIdentity>;
    public playerPieces: Array<IPlayerPiece & IObjectIdentity>;
    public playerTracks: Array<Array<IBoardCell>>;
    public turn: ITurnInfo;

    constructor(players?: Array<{ playerName: string, color: EPlayerColor }>) {
        this.players = players ? generatePlayersBasedOnLobby(players) : defaultFullGeneratePlayers();
        this.board = generateBoardInfo();
        this.playerCells = generatePlayerBoardCells(this.players);
        this.playerPieces = generatePlayerPiecesAtStart(this.players, this.board, this.playerCells);
        this.playerTracks = generatePlayerRaceTracks(this.players, this.board, this.playerCells);

        //assign id
        let id = 1;
        for (let obj of [...this.players, ...this.board, ...this.playerCells, ...this.playerPieces]) {
            obj.identity = id;
            id++;
        }

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
                this.playerPieces.filter(piece => piece.player === this.turn.currentPlayer).forEach(piece => piece.selectable = true);
            }
            else {
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
            const possibleMovablePieces = this.checkMoveablePiecies();
            if (possibleMovablePieces === 0) {
                this.passTurnToNextPlayer();
                return;
            }
            this.turn.message = "select piece on board to move!";
            this.turn.state = ETurnState.waitingForPieceSelectionAndPass;
            if (this.turn.roll === 6) {
                this.turn.special = true;
                this.turn.state = ETurnState.waitingForPieceSelection;
            }
            return this.turn.roll;
        }
    }

    private checkMoveablePiecies() {
        let selectablePiecies = 0;
        const playerStartingCells = this.playerCells.filter(cell => cell.player === this.turn.currentPlayer && cell.flag === EPlayerCellFlag.homeCell).map(cell => cell.index);
        if (this.turn.roll === 6) {
            const piecesAtStart = this.playerPieces.filter(piece => piece.player === this.turn.currentPlayer && (playerStartingCells.indexOf(piece.position.index) > -1));
            for (let piece of piecesAtStart) {
                piece.selectable = true;
                selectablePiecies++;
            }
        }
        const tracks = this.playerTracks[this.players.indexOf(this.turn.currentPlayer)];
        const piecesInPlay = this.playerPieces.filter(piece => piece.player === this.turn.currentPlayer && tracks.some(cell => cell.index === piece.position.index));
        for (let piece of piecesInPlay) {
            const pieceIndexOnTrack = tracks.indexOf(piece.position);
            const possibleNewPosition = pieceIndexOnTrack + this.turn.roll;
            const position = tracks[possibleNewPosition];
            if (!position) //out of track
            {
                continue;
            }
            const isOccupied = piecesInPlay.some(piece => piece.position === position);
            if (!isOccupied) //can move
            {
                piece.selectable = true;
                selectablePiecies++;
            }
        }
        return selectablePiecies;
    }

    public pieceSelect(objectId: number) {
        console.log("pieceSelect", objectId);
        if (!(this.turn.state === ETurnState.waitingForPieceSelection || this.turn.state === ETurnState.waitingForPieceSelectionAndPass))
            return;
        const playerPiece = this.playerPieces.find(item => item.identity === objectId);
        if (!playerPiece) {
            console.warn("attempt to select empty cell, canceling");
            return;
        }
        if (playerPiece.player !== this.turn.currentPlayer) {
            console.warn("attemp to select piece not belonging to current player");
            return;
        }
        if (this.turn.special && (playerPiece.position as IPlayerCell).flag === EPlayerCellFlag.homeCell) {
            playerPiece.position = this.turn.currentPlayer.raceTrack[0];
            //playerPiece.position = this.playerCells.find(item => item.player === this.turn.currentPlayer && item.flag === EPlayerCellFlag.boardStartCell);
        }
        else {
            const currentCell = this.turn.currentPlayer.raceTrack.find((item: IBoardCell) => { return item.index === playerPiece.position.index });
            const indexOfCurrentCell = this.turn.currentPlayer.raceTrack.indexOf(currentCell);
            const newIndex = indexOfCurrentCell + this.turn.roll;
            const newPosition = this.turn.currentPlayer.raceTrack[newIndex];
            if (newPosition) {
                playerPiece.position = newPosition;
            }
        }
        if (this.turn.state === ETurnState.waitingForPieceSelectionAndPass) {
            this.passTurnToNextPlayer();
        }
        this.turn.state = ETurnState.waitingForRoll;
        //reset selectablepieces
        this.playerPieces.filter(piece => piece.player === this.turn.currentPlayer).forEach(piece => piece.selectable = false);
    }

    private passTurnToNextPlayer() {
        let indexOfNextPlayer = this.players.indexOf(this.turn.currentPlayer) + 1;
        if (indexOfNextPlayer == this.players.length)
            indexOfNextPlayer = 0;
        this.turn.currentPlayer = this.players[indexOfNextPlayer];
        this.turn.throwNumber = 0;
        this.turn.maxThrows = this.turn.currentPlayer.gameStatus === EPlayerGameState.startingRolls ? 3 : 1;
    }
}