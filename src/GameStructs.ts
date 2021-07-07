export interface IObjectIdentity{
    identity?: number;
}

export interface IBoardCell {
    index: number;
    x: number;
    y: number;
}

export interface IPlayer {
    name: string;
    color: string;
    gameStatus: EPlayerGameState;
    raceTrack: Array<IBoardCell>;
}

export enum EPlayerCellFlag{
    homeCell,
    boardStartCell,
    finishCell
}

export interface IPlayerCell {
    player: IPlayer;
    flag: EPlayerCellFlag;
}

export interface IPlayerPiece {
    position: IBoardCell | IBoardCell & IPlayerCell;
    player: IPlayer;
    code: string;
}

export enum EPlayerGameState {
    startingRolls,
    inPlay
}