export interface IBoardCell {
    index: number;
    x: number;
    y: number;
}

export interface IPlayerCell {
    playerlink: number;
    color: string;
}

export class Game {
    public board: IBoardCell[];
    public playerCells : Array<IBoardCell & IPlayerCell>;

    constructor() {
        this.board = this.getBoardInfo();
        this.playerCells = this.getPlayerBoardCells();
    }

    private getBoardInfo(): IBoardCell[] {
        const board: IBoardCell[] = [];
        board.push({ index: 0, x: 0, y: 4 });
        board.push({ index: 1, x: 1, y: 4 });
        board.push({ index: 2, x: 2, y: 4 });
        board.push({ index: 3, x: 3, y: 4 });
        board.push({ index: 4, x: 4, y: 4 });
        board.push({ index: 5, x: 4, y: 3 });
        board.push({ index: 6, x: 4, y: 2 });
        board.push({ index: 7, x: 4, y: 1 });
        board.push({ index: 8, x: 4, y: 0 });
        board.push({ index: 9, x: 5, y: 0 });
    
        board.push({ index: 10, x: 6, y: 0 });
        board.push({ index: 11, x: 6, y: 1 });
        board.push({ index: 12, x: 6, y: 2 });
        board.push({ index: 13, x: 6, y: 3 });
        board.push({ index: 14, x: 6, y: 4 });
        board.push({ index: 15, x: 7, y: 4 });
        board.push({ index: 16, x: 8, y: 4 });
        board.push({ index: 17, x: 9, y: 4 });
        board.push({ index: 18, x: 10, y: 4 });
        board.push({ index: 19, x: 10, y: 5 });
    
        board.push({ index: 20, x: 10, y: 6 });
        board.push({ index: 21, x: 9, y: 6 });
        board.push({ index: 22, x: 8, y: 6 });
        board.push({ index: 23, x: 7, y: 6 });
        board.push({ index: 24, x: 6, y: 6 });
        board.push({ index: 25, x: 6, y: 7 });
        board.push({ index: 26, x: 6, y: 8 });
        board.push({ index: 27, x: 6, y: 9 });
        board.push({ index: 28, x: 6, y: 10 });
        board.push({ index: 29, x: 5, y: 10 });
    
        board.push({ index: 30, x: 4, y: 10 });
        board.push({ index: 31, x: 4, y: 9 });
        board.push({ index: 32, x: 4, y: 8 });
        board.push({ index: 33, x: 4, y: 7 });
        board.push({ index: 34, x: 4, y: 6 });
        board.push({ index: 35, x: 3, y: 6 });
        board.push({ index: 36, x: 2, y: 6 });
        board.push({ index: 37, x: 1, y: 6 });
        board.push({ index: 38, x: 0, y: 6 });
        board.push({ index: 39, x: 0, y: 5 });
    
        return board;
    }
    
    private getPlayerBoardCells(): Array<IBoardCell & IPlayerCell> {
        const cells: Array<IBoardCell & IPlayerCell> = [];
    
        const player1Info = { color: "red", playerlink: 0 };
        cells.push({ index: 0, x: 0, y: 4, ...player1Info });
        cells.push({ index: 100, x: 1, y: 5, ...player1Info });
        cells.push({ index: 101, x: 2, y: 5, ...player1Info });
        cells.push({ index: 102, x: 3, y: 5, ...player1Info });
        cells.push({ index: 102, x: 4, y: 5, ...player1Info });
        cells.push({ index: 200, x: 0, y: 0, ...player1Info });
        cells.push({ index: 201, x: 0, y: 1, ...player1Info });
        cells.push({ index: 202, x: 1, y: 0, ...player1Info });
        cells.push({ index: 203, x: 1, y: 1, ...player1Info });
    
        const player2Info = { color: "green", playerlink: 1 };
        cells.push({ index: 10, x: 6, y: 0, ...player2Info });
        cells.push({ index: 110, x: 5, y: 1, ...player2Info });
        cells.push({ index: 111, x: 5, y: 2, ...player2Info });
        cells.push({ index: 112, x: 5, y: 3, ...player2Info });
        cells.push({ index: 112, x: 5, y: 4, ...player2Info });
        cells.push({ index: 210, x: 9, y: 0, ...player2Info });
        cells.push({ index: 211, x: 10, y: 0, ...player2Info });
        cells.push({ index: 212, x: 9, y: 1, ...player2Info });
        cells.push({ index: 213, x: 10, y: 1, ...player2Info });
    
        const player3Info = { color: "#00aaff", playerlink: 2 };
        cells.push({ index: 20, x: 10, y: 6, ...player3Info });
        cells.push({ index: 120, x: 9, y: 5, ...player3Info });
        cells.push({ index: 121, x: 8, y: 5, ...player3Info });
        cells.push({ index: 122, x: 7, y: 5, ...player3Info });
        cells.push({ index: 122, x: 6, y: 5, ...player3Info });
        cells.push({ index: 220, x: 9, y: 9, ...player3Info });
        cells.push({ index: 221, x: 10, y: 9, ...player3Info });
        cells.push({ index: 222, x: 9, y: 10, ...player3Info });
        cells.push({ index: 223, x: 10, y: 10, ...player3Info });
    
        const player4Info = { color: "yellow", playerlink: 3 };
        cells.push({ index: 30, x: 4, y: 10, ...player4Info });
        cells.push({ index: 130, x: 5, y: 9, ...player4Info });
        cells.push({ index: 131, x: 5, y: 8, ...player4Info });
        cells.push({ index: 132, x: 5, y: 7, ...player4Info });
        cells.push({ index: 132, x: 5, y: 6, ...player4Info });
    
        cells.push({ index: 230, x: 0, y: 9, ...player4Info });
        cells.push({ index: 231, x: 1, y: 9, ...player4Info });
        cells.push({ index: 232, x: 0, y: 10, ...player4Info });
        cells.push({ index: 233, x: 1, y: 10, ...player4Info });
    
        return cells;
    }
}