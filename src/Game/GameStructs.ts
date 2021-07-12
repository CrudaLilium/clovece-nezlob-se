export interface IObjectIdentity {
    identity?: number;
}

export interface IBoardCell {
    index: number;
    x: number;
    y: number;
    occupied?: IPlayerPiece;
}

export interface IPlayer {
    name: string;
    color: string;
    gameStatus: EPlayerGameState;
    cells: Array<IPlayerCell & IObjectIdentity>;
    raceTrack: Array<IPointToBoardCell | IPlayerCell>;
    pieces: Array<IPlayerPiece & IObjectIdentity>;
}

export enum EPlayerCellFlag {
    homeCell,
    boardStartCell,
    finishCell
}

export interface IPointToBoardCell {
    cell: IBoardCell & IObjectIdentity;
}

export interface IPlayerCell extends IPointToBoardCell {
    flag: EPlayerCellFlag;
}

export interface IPlayerPiece {
    boardPosition: IPointToBoardCell | IPlayerCell;
    code: string;
    selectable: boolean;
}

export enum EPlayerGameState {
    startingRolls,
    inPlay
}