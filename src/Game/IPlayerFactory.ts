import { IBoardCell, IObjectIdentity, IPlayer } from "./GameStructs";

export interface IPlayerFactory {
    create(board: Array<IBoardCell & IObjectIdentity>): Array<IPlayer & IObjectIdentity>;
}