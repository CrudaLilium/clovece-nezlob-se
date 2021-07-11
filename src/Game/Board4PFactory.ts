import { IBoardCell, IObjectIdentity } from "./GameStructs";
import { IIdentityGenerator } from "./IdentityGenerator";

export class Board4Factory {
    private _idGenerator: IIdentityGenerator;
    constructor(idGenerator: IIdentityGenerator) {
        this._idGenerator = idGenerator;
    }

    public create(): Array<IBoardCell & IObjectIdentity> {
        const board: Array<IBoardCell & IObjectIdentity> = [];
        board.push({ identity: this._idGenerator.createIdentity(), index: 0, x: 0, y: 4 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 1, x: 1, y: 4 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 2, x: 2, y: 4 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 3, x: 3, y: 4 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 4, x: 4, y: 4 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 5, x: 4, y: 3 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 6, x: 4, y: 2 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 7, x: 4, y: 1 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 8, x: 4, y: 0 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 9, x: 5, y: 0 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 10, x: 6, y: 0 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 11, x: 6, y: 1 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 12, x: 6, y: 2 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 13, x: 6, y: 3 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 14, x: 6, y: 4 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 15, x: 7, y: 4 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 16, x: 8, y: 4 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 17, x: 9, y: 4 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 18, x: 10, y: 4 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 19, x: 10, y: 5 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 20, x: 10, y: 6 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 21, x: 9, y: 6 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 22, x: 8, y: 6 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 23, x: 7, y: 6 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 24, x: 6, y: 6 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 25, x: 6, y: 7 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 26, x: 6, y: 8 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 27, x: 6, y: 9 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 28, x: 6, y: 10 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 29, x: 5, y: 10 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 30, x: 4, y: 10 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 31, x: 4, y: 9 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 32, x: 4, y: 8 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 33, x: 4, y: 7 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 34, x: 4, y: 6 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 35, x: 3, y: 6 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 36, x: 2, y: 6 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 37, x: 1, y: 6 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 38, x: 0, y: 6 });
        board.push({ identity: this._idGenerator.createIdentity(), index: 39, x: 0, y: 5 });
        return board;
    }
}