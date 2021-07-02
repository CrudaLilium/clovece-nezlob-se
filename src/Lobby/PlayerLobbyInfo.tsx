import React, { Fragment, useState } from "react";
import EPlayerColor, { EPlayerColorReverseMap, EPlayerColorStrings } from "../EPlayerColors";
import { ColorBox } from "./ColorBox";

export interface IPlayer {
    playerName: string,
    color: EPlayerColor
}

export interface IPlayerLobbyInfo {
    player: IPlayer,
    updatePlayer: (data: IPlayer) => void
}

export function PlayerLobbyInfo(props: IPlayerLobbyInfo) {
    return (
        <Fragment>
            <input value={props.player.playerName} onChange={(event) => props.updatePlayer({ ...props.player, playerName: event.target.value })} />
            <ColorBox color={props.player.color} />
            <select defaultValue={EPlayerColorReverseMap.get(props.player.color)} onChange={(event) => props.updatePlayer({ ...props.player, color: EPlayerColor[event.target.value as EPlayerColorStrings] })}>
                {
                    Object.keys(EPlayerColor).map(key => {
                        return <option value={key}>{key}</option>
                    })
                }
            </select>
        </Fragment>
    );
}