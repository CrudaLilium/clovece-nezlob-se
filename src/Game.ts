import { rollDice6 } from "./DiceRolls";
import { generateBoardInfo, generatePlayerBoardCells, generatePlayerPiecesAtStart, generatePlayers } from "./GameInitializations";
import { EPlayerCellFlag, EPlayerGameState, IBoardCell, IObjectIdentity, IPlayer, IPlayerCell, IPlayerPiece } from "./GameStructs";

export enum ETurnState {
    waitingForRoll,
    waitingForPieceSelection
}

export interface ITurnInfo {
    state: ETurnState;
    currentPlayer: IPlayer;
    throwNumber: number;
    maxThrows: number;
    message: string;
    special: boolean;
}

export class Game {
    public players: Array<IPlayer & IObjectIdentity>;
    public board: Array<IBoardCell & IObjectIdentity>;
    public playerCells: Array<IBoardCell & IPlayerCell & IObjectIdentity>;
    public playerPieces: Array<IPlayerPiece & IObjectIdentity>;
    public turn: ITurnInfo;

    constructor() {
        this.players = generatePlayers();
        this.board = generateBoardInfo();
        this.playerCells = generatePlayerBoardCells(this.players);
        this.playerPieces = generatePlayerPiecesAtStart(this.players, this.board, this.playerCells);

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
            const roll = rollDice6();
            if (roll === 6) {
                this.turn.message = "select piece to get into board and roll again!";
                this.turn.special = true;
                this.turn.state = ETurnState.waitingForPieceSelection;
                this.turn.currentPlayer.gameStatus = EPlayerGameState.inPlay;
            }
            else {
                this.turn.throwNumber++;
                this.turn.message = "Try rolling 6 to get into game!";
            }
            if (this.turn.throwNumber === this.turn.maxThrows) {
                this.passTurnToNextPlayer();
            }
            return roll;
        }

        const currentPlayerPieces = this.playerPieces.filter(item => item.player === this.turn.currentPlayer);
        const firstPlayerPiece = currentPlayerPieces[0];
        let indexOfPosition = this.board.indexOf(firstPlayerPiece.position);
        const roll = rollDice6();
        let newPosition = indexOfPosition + roll;
        firstPlayerPiece.position = this.board[newPosition];
        this.passTurnToNextPlayer();
        return roll;
    }

    public pieceSelect(objectId: number) {
        console.log("pieceSelect", objectId);
        if (this.turn.state !== ETurnState.waitingForPieceSelection)
            return;
        const playerPiece = this.playerPieces.find(item => item.identity === objectId);
        if (this.turn.special && (playerPiece.position as IPlayerCell).flag === EPlayerCellFlag.homeCell) {
            playerPiece.position = this.playerCells.find(item => item.flag === EPlayerCellFlag.boardStartCell);
        }
        this.turn.state = ETurnState.waitingForRoll;
    }

    private passTurnToNextPlayer() {
        let indexOfNextPlayer = this.players.indexOf(this.turn.currentPlayer) + 1;
        if (indexOfNextPlayer == this.players.length)
            indexOfNextPlayer = 0;
        this.turn.currentPlayer = this.players[indexOfNextPlayer];
        this.turn.throwNumber = 0;
    }
}