export interface IObjectIdentity {
    identity?: number;
}

export interface IBoardCell {
    index: number;
    x: number;
    y: number;
}

// export class IBoardCell {
//     private static _properties: string[] = ["index", "x", "y"];
//     public static [Symbol.hasInstance](instance: any) {
//         return instance != null && !this._properties.some((value) => !Reflect.has(instance, value));
//     }
// }

export interface IPlayer {
    name: string;
    color: string;
    gameStatus: EPlayerGameState;
    cells: Array<IPlayerCell & IObjectIdentity>;
    raceTrack: Array<IBoardCell | IPlayerCell>;
    piecies: Array<IPlayerPiece & IObjectIdentity>;
}


export enum EPlayerCellFlag {
    homeCell,
    boardStartCell,
    finishCell
}

export interface IPlayerCell {
    cell: (IBoardCell & IObjectIdentity);
    flag: EPlayerCellFlag;
}

// export class IPlayerCell {
//     private static _properties: string[] = ["cell", "flag"];
//     public static [Symbol.hasInstance](instance: any) {
//         return instance != null && !this._properties.some((value) => !Reflect.has(instance, value));
//     }
// }

export interface IPlayerPiece {
    boardPosition: IBoardCell | IPlayerCell;
    code: string;
    selectable: boolean;
}

export enum EPlayerGameState {
    startingRolls,
    inPlay
}