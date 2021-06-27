import React, { useState } from "react";
import { App } from "../App";
import EPlayerColor, { EPlayerColorReverseMap } from "../EPlayerColors";
import { Game } from "../Game";
import { PlayerLobbyInfo } from "./PlayerLobbyInfo";

export interface ILobbyProps {
    app: App;
    setGame: (game: Game) => void;
}

export function Lobby(props: ILobbyProps) {
    const [players, setPlayers] = useState([
        { playerName: "Player 1", color: EPlayerColor.Red },
        { playerName: "Player 2", color: EPlayerColor.Green },
    ]);
    function handleClick() {
        props.app.startGame(players);
        if (props.app.game != null) {
            props.setGame(props.app.game);
        }
    }

    function addPlayer() {
        const playerName = `Player ${players.length + 1}`;
        const usedColors = players.map(player => player.color);
        const color = Object.values(EPlayerColor).filter(val => usedColors.indexOf(val) === -1)[0];
        const newPlayer = { playerName, color };
        setPlayers([...players, newPlayer])
    }

    return (
        <div>
            <h1>Lobby</h1>
            {
                players.map(player => {
                    return (
                        <div>
                            <PlayerLobbyInfo initialPlayerName={player.playerName} initialColor={player.color}></PlayerLobbyInfo>
                        </div>
                    );
                })
            }
            <div>
                <button onClick={addPlayer} className={"big-button"}>Add Player</button>
            </div>
            <div>
                <button onClick={handleClick} className={"big-button"}>StartGame</button>
            </div>
        </div>
    );
}