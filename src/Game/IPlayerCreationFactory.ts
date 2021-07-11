import { IBoardCell, IObjectIdentity, IPlayer } from "./GameStructs";
import { IPlayer as ILobbyPlayerData } from "../Lobby/PlayerLobbyInfo";

export interface IPlayerCreationFactory {
    createPlayerablePlayer(entryData: ILobbyPlayerData, position: number, board: Array<IBoardCell & IObjectIdentity>): (IPlayer & IObjectIdentity);
}