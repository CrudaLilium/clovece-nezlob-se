export interface IBoardCell {
    index: number;
    x: number;
    y: number;
}

export interface IPlayer {
    name: string;
    color: string;
}

export interface IPlayerCell {
    player: IPlayer;
}

export interface IPlayerPiece {
    position: IBoardCell;
    player: IPlayer;
    code: string;
}

export class Game {
    public players: IPlayer[];
    public board: IBoardCell[];
    public playerCells: Array<IBoardCell & IPlayerCell>;
    public playerPieces: IPlayerPiece[];

    constructor() {
        this.generatePlayers();
        this.generateBoardInfo();
        this.generatePlayerBoardCells();
        this.generatePlayerPiecesAtStart();
    }

    private generatePlayerPiecesAtStart(): void {
        this.playerPieces = [];
        for (let p = 0; p < this.players.length; p++) {
            const playerInfo = this.players[p];
            for (let i = 0; i < 4; i++) {
                const position = [...this.board, ...this.playerCells].find(x => x.index == 200 + (p * 10) + i)
                this.playerPieces.push({ code: i.toString(), player: playerInfo, position: position });
            }
        }
    }

    private generatePlayers(): void {
        this.players = [];
        this.players.push({ color: "red", name: "Player 1" });
        this.players.push({ color: "green", name: "Player 2" });
        this.players.push({ color: "#00aaff", name: "Player 3" });
        this.players.push({ color: "yellow", name: "Player 4" });
    }

    private generateBoardInfo(): void {
        this.board = [];
        this.board.push({ index: 0, x: 0, y: 4 });
        this.board.push({ index: 1, x: 1, y: 4 });
        this.board.push({ index: 2, x: 2, y: 4 });
        this.board.push({ index: 3, x: 3, y: 4 });
        this.board.push({ index: 4, x: 4, y: 4 });
        this.board.push({ index: 5, x: 4, y: 3 });
        this.board.push({ index: 6, x: 4, y: 2 });
        this.board.push({ index: 7, x: 4, y: 1 });
        this.board.push({ index: 8, x: 4, y: 0 });
        this.board.push({ index: 9, x: 5, y: 0 });
        this.board.push({ index: 10, x: 6, y: 0 });
        this.board.push({ index: 11, x: 6, y: 1 });
        this.board.push({ index: 12, x: 6, y: 2 });
        this.board.push({ index: 13, x: 6, y: 3 });
        this.board.push({ index: 14, x: 6, y: 4 });
        this.board.push({ index: 15, x: 7, y: 4 });
        this.board.push({ index: 16, x: 8, y: 4 });
        this.board.push({ index: 17, x: 9, y: 4 });
        this.board.push({ index: 18, x: 10, y: 4 });
        this.board.push({ index: 19, x: 10, y: 5 });
        this.board.push({ index: 20, x: 10, y: 6 });
        this.board.push({ index: 21, x: 9, y: 6 });
        this.board.push({ index: 22, x: 8, y: 6 });
        this.board.push({ index: 23, x: 7, y: 6 });
        this.board.push({ index: 24, x: 6, y: 6 });
        this.board.push({ index: 25, x: 6, y: 7 });
        this.board.push({ index: 26, x: 6, y: 8 });
        this.board.push({ index: 27, x: 6, y: 9 });
        this.board.push({ index: 28, x: 6, y: 10 });
        this.board.push({ index: 29, x: 5, y: 10 });
        this.board.push({ index: 30, x: 4, y: 10 });
        this.board.push({ index: 31, x: 4, y: 9 });
        this.board.push({ index: 32, x: 4, y: 8 });
        this.board.push({ index: 33, x: 4, y: 7 });
        this.board.push({ index: 34, x: 4, y: 6 });
        this.board.push({ index: 35, x: 3, y: 6 });
        this.board.push({ index: 36, x: 2, y: 6 });
        this.board.push({ index: 37, x: 1, y: 6 });
        this.board.push({ index: 38, x: 0, y: 6 });
        this.board.push({ index: 39, x: 0, y: 5 });
    }

    private generatePlayerBoardCells(): void {
        this.playerCells = [];
        this.playerCells.push({ index: 0, x: 0, y: 4, player: this.players[0] });
        this.playerCells.push({ index: 100, x: 1, y: 5, player: this.players[0] });
        this.playerCells.push({ index: 101, x: 2, y: 5, player: this.players[0] });
        this.playerCells.push({ index: 102, x: 3, y: 5, player: this.players[0] });
        this.playerCells.push({ index: 102, x: 4, y: 5, player: this.players[0] });
        this.playerCells.push({ index: 200, x: 0, y: 0, player: this.players[0] });
        this.playerCells.push({ index: 201, x: 0, y: 1, player: this.players[0] });
        this.playerCells.push({ index: 202, x: 1, y: 0, player: this.players[0] });
        this.playerCells.push({ index: 203, x: 1, y: 1, player: this.players[0] });
        this.playerCells.push({ index: 10, x: 6, y: 0, player: this.players[1] });
        this.playerCells.push({ index: 110, x: 5, y: 1, player: this.players[1] });
        this.playerCells.push({ index: 111, x: 5, y: 2, player: this.players[1] });
        this.playerCells.push({ index: 112, x: 5, y: 3, player: this.players[1] });
        this.playerCells.push({ index: 112, x: 5, y: 4, player: this.players[1] });
        this.playerCells.push({ index: 210, x: 9, y: 0, player: this.players[1] });
        this.playerCells.push({ index: 211, x: 10, y: 0, player: this.players[1] });
        this.playerCells.push({ index: 212, x: 9, y: 1, player: this.players[1] });
        this.playerCells.push({ index: 213, x: 10, y: 1, player: this.players[1] });
        this.playerCells.push({ index: 20, x: 10, y: 6, player: this.players[2] });
        this.playerCells.push({ index: 120, x: 9, y: 5, player: this.players[2] });
        this.playerCells.push({ index: 121, x: 8, y: 5, player: this.players[2] });
        this.playerCells.push({ index: 122, x: 7, y: 5, player: this.players[2] });
        this.playerCells.push({ index: 122, x: 6, y: 5, player: this.players[2] });
        this.playerCells.push({ index: 220, x: 9, y: 9, player: this.players[2] });
        this.playerCells.push({ index: 221, x: 10, y: 9, player: this.players[2] });
        this.playerCells.push({ index: 222, x: 9, y: 10, player: this.players[2] });
        this.playerCells.push({ index: 223, x: 10, y: 10, player: this.players[2] });
        this.playerCells.push({ index: 30, x: 4, y: 10, player: this.players[3] });
        this.playerCells.push({ index: 130, x: 5, y: 9, player: this.players[3] });
        this.playerCells.push({ index: 131, x: 5, y: 8, player: this.players[3] });
        this.playerCells.push({ index: 132, x: 5, y: 7, player: this.players[3] });
        this.playerCells.push({ index: 132, x: 5, y: 6, player: this.players[3] });
        this.playerCells.push({ index: 230, x: 0, y: 9, player: this.players[3] });
        this.playerCells.push({ index: 231, x: 1, y: 9, player: this.players[3] });
        this.playerCells.push({ index: 232, x: 0, y: 10, player: this.players[3] });
        this.playerCells.push({ index: 233, x: 1, y: 10, player: this.players[3] });
    }
}