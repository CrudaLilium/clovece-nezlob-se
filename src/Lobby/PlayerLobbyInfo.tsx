import React, { Fragment, useState } from "react";
import EPlayerColor, { EPlayerColorReverseMap, EPlayerColorStrings } from "../EPlayerColors";
import { ColorBox } from "./ColorBox";

export interface IPlayerLobbyInfo {
    initialPlayerName?: string;
    initialColor?: EPlayerColor;
}



export function PlayerLobbyInfo(props: IPlayerLobbyInfo) {
    const [playerName, setPlayerName] = useState(props.initialPlayerName);
    const [color, setColor] = useState(props.initialColor ?? EPlayerColor.Orange);
    return (
        <Fragment>
            <input value={playerName} onChange={(event) => setPlayerName(event.target.value)} />
            <ColorBox color={color} />
            <select defaultValue={EPlayerColorReverseMap.get(color)} onChange={(event) => setColor(EPlayerColor[event.target.value as EPlayerColorStrings])}>
                {
                    Object.keys(EPlayerColor).map(key => {
                        return <option value={key}>{key}</option>
                    })
                }
            </select>
        </Fragment>
    );
}