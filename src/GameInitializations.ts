import EPlayerColor from "./EPlayerColors";
import { EPlayerCellFlag, EPlayerGameState, IBoardCell, IPlayer, IPlayerCell, IPlayerPiece } from "./GameStructs";

export function generatePlayersBasedOnLobby(players: Array<{ playerName: string, color: EPlayerColor }>) {
    const playersResult: IPlayer[] = [];
    for (const player of players)
        playersResult.push({ color: player.color, name: player.playerName, gameStatus: EPlayerGameState.startingRolls, raceTrack: [] });
    return playersResult;
}

export function defaultFullGeneratePlayers(): IPlayer[] {
    const players: IPlayer[] = [];
    players.push({ color: "red", name: "Player 1", gameStatus: EPlayerGameState.startingRolls, raceTrack: [] });
    players.push({ color: "green", name: "Player 2", gameStatus: EPlayerGameState.startingRolls, raceTrack: [] });
    players.push({ color: "#00aaff", name: "Player 3", gameStatus: EPlayerGameState.startingRolls, raceTrack: [] });
    players.push({ color: "yellow", name: "Player 4", gameStatus: EPlayerGameState.startingRolls, raceTrack: [] });
    return players;
}

export function generateBoardInfo(): IBoardCell[] {
    const board = [];
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

export function generatePlayerBoardCells(players: IPlayer[]): Array<IBoardCell & IPlayerCell> {
    const playerCells: Array<IBoardCell & IPlayerCell> = [];

    let player = players[0];
    playerCells.push({ index: 0, x: 0, y: 4, player, flag: EPlayerCellFlag.boardStartCell });
    playerCells.push({ index: 100, x: 1, y: 5, player, flag: EPlayerCellFlag.finishCell });
    playerCells.push({ index: 101, x: 2, y: 5, player, flag: EPlayerCellFlag.finishCell });
    playerCells.push({ index: 102, x: 3, y: 5, player, flag: EPlayerCellFlag.finishCell });
    playerCells.push({ index: 102, x: 4, y: 5, player, flag: EPlayerCellFlag.finishCell });
    playerCells.push({ index: 200, x: 0, y: 0, player, flag: EPlayerCellFlag.homeCell });
    playerCells.push({ index: 201, x: 0, y: 1, player, flag: EPlayerCellFlag.homeCell });
    playerCells.push({ index: 202, x: 1, y: 0, player, flag: EPlayerCellFlag.homeCell });
    playerCells.push({ index: 203, x: 1, y: 1, player, flag: EPlayerCellFlag.homeCell });

    if (players.length === 2) {
        let player = players[1];
        playerCells.push({ index: 20, x: 10, y: 6, player, flag: EPlayerCellFlag.boardStartCell });
        playerCells.push({ index: 120, x: 9, y: 5, player, flag: EPlayerCellFlag.finishCell });
        playerCells.push({ index: 121, x: 8, y: 5, player, flag: EPlayerCellFlag.finishCell });
        playerCells.push({ index: 122, x: 7, y: 5, player, flag: EPlayerCellFlag.finishCell });
        playerCells.push({ index: 122, x: 6, y: 5, player, flag: EPlayerCellFlag.finishCell });
        playerCells.push({ index: 220, x: 9, y: 9, player, flag: EPlayerCellFlag.homeCell });
        playerCells.push({ index: 221, x: 10, y: 9, player, flag: EPlayerCellFlag.homeCell });
        playerCells.push({ index: 222, x: 9, y: 10, player, flag: EPlayerCellFlag.homeCell });
        playerCells.push({ index: 223, x: 10, y: 10, player, flag: EPlayerCellFlag.homeCell });
    } else {
        if (players.length > 1) {
            player = players[1];
            playerCells.push({ index: 10, x: 6, y: 0, player, flag: EPlayerCellFlag.boardStartCell });
            playerCells.push({ index: 110, x: 5, y: 1, player, flag: EPlayerCellFlag.finishCell });
            playerCells.push({ index: 111, x: 5, y: 2, player, flag: EPlayerCellFlag.finishCell });
            playerCells.push({ index: 112, x: 5, y: 3, player, flag: EPlayerCellFlag.finishCell });
            playerCells.push({ index: 112, x: 5, y: 4, player, flag: EPlayerCellFlag.finishCell });
            playerCells.push({ index: 210, x: 9, y: 0, player, flag: EPlayerCellFlag.homeCell });
            playerCells.push({ index: 211, x: 10, y: 0, player, flag: EPlayerCellFlag.homeCell });
            playerCells.push({ index: 212, x: 9, y: 1, player, flag: EPlayerCellFlag.homeCell });
            playerCells.push({ index: 213, x: 10, y: 1, player, flag: EPlayerCellFlag.homeCell });
        }
        if (players.length > 2) {
            player = players[2];
            playerCells.push({ index: 20, x: 10, y: 6, player, flag: EPlayerCellFlag.boardStartCell });
            playerCells.push({ index: 120, x: 9, y: 5, player, flag: EPlayerCellFlag.finishCell });
            playerCells.push({ index: 121, x: 8, y: 5, player, flag: EPlayerCellFlag.finishCell });
            playerCells.push({ index: 122, x: 7, y: 5, player, flag: EPlayerCellFlag.finishCell });
            playerCells.push({ index: 122, x: 6, y: 5, player, flag: EPlayerCellFlag.finishCell });
            playerCells.push({ index: 220, x: 9, y: 9, player, flag: EPlayerCellFlag.homeCell });
            playerCells.push({ index: 221, x: 10, y: 9, player, flag: EPlayerCellFlag.homeCell });
            playerCells.push({ index: 222, x: 9, y: 10, player, flag: EPlayerCellFlag.homeCell });
            playerCells.push({ index: 223, x: 10, y: 10, player, flag: EPlayerCellFlag.homeCell });
        }
        if (players.length > 3) {
            player = players[3];
            playerCells.push({ index: 30, x: 4, y: 10, player, flag: EPlayerCellFlag.boardStartCell });
            playerCells.push({ index: 130, x: 5, y: 9, player, flag: EPlayerCellFlag.finishCell });
            playerCells.push({ index: 131, x: 5, y: 8, player, flag: EPlayerCellFlag.finishCell });
            playerCells.push({ index: 132, x: 5, y: 7, player, flag: EPlayerCellFlag.finishCell });
            playerCells.push({ index: 132, x: 5, y: 6, player, flag: EPlayerCellFlag.finishCell });
            playerCells.push({ index: 230, x: 0, y: 9, player, flag: EPlayerCellFlag.homeCell });
            playerCells.push({ index: 231, x: 1, y: 9, player, flag: EPlayerCellFlag.homeCell });
            playerCells.push({ index: 232, x: 0, y: 10, player, flag: EPlayerCellFlag.homeCell });
            playerCells.push({ index: 233, x: 1, y: 10, player, flag: EPlayerCellFlag.homeCell });
        }
    }
    return playerCells;
}

export function generatePlayerPiecesAtStart(players: IPlayer[], board: IBoardCell[], playerCells: Array<IBoardCell & IPlayerCell>): IPlayerPiece[] {
    const playerPieces = [];
    for (let p = 0; p < players.length; p++) {
        for (let i = 0; i < 4; i++) {
            const player = players[p];
            const position = playerCells.find(x => x.player === player && x.flag === EPlayerCellFlag.homeCell && x.index % 10 === i)
            playerPieces.push({ code: i.toString(), player, position: position });
        }
    }
    return playerPieces;
}

export function generatePlayerRaceTracks(players: IPlayer[], board: IBoardCell[], playerCells: (IBoardCell & IPlayerCell)[]): Array<Array<IBoardCell>> {
    const playerTracks: Array<Array<IBoardCell>> = [];
    for (let p = 0; p < players.length; p++) {
        const player = players[p];
        const startCell = playerCells.find(cell => cell.player === player && cell.flag === EPlayerCellFlag.boardStartCell);
        const boardSplit = board.indexOf(board.find(cell => cell.index === startCell.index));
        const playerFinishCells = playerCells.filter(cell => cell.player === player && cell.flag === EPlayerCellFlag.finishCell);
        const playerTrack: Array<IBoardCell> = [
            ...board.slice(boardSplit, board.length),
            ...board.slice(0, boardSplit),
            ...playerFinishCells
        ];
        playerTracks.push(playerTrack);
        player.raceTrack = playerTrack;
    }
    return playerTracks;
}