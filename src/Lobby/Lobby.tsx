import React, { useState } from "react";
import { App } from "../App";
import EPlayerColor, { EPlayerColorReverseMap } from "../EPlayerColors";
import { Game } from "../Game";
import { IPlayer, PlayerLobbyInfo } from "./PlayerLobbyInfo";

export interface ILobbyProps {
    app: App;
    setGame: (game: Game) => void;
}

export function Lobby(props: ILobbyProps) {
    const [players, setPlayers] = useState([
        { playerName: "Player 1", color: EPlayerColor.Red },
        // { playerName: "Player 2", color: EPlayerColor.Green },
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

    function removePlayer(index: number) {
        const newPlayersArray = players.filter((_, _index) => _index != index);
        setPlayers(newPlayersArray);
    }

    function updatePlayer(index: number, playerData: IPlayer) {
        setPlayers([
            ...players.slice(0, index),
            Object.assign({}, players[index], playerData),
            ...players.slice(index + 1)
        ]);
    }

    return (
        <div>
            <h1>Lobby</h1>
            {
                players.map((player, index) => {
                    return (
                        <div key={"pl-" + index}>
                            <button className={"big-button"} style={{ margin: "0 .2rem" }} onClick={() => removePlayer(index)}>-</button>
                            <PlayerLobbyInfo player={player} updatePlayer={updatePlayer.bind(this, index)}></PlayerLobbyInfo>
                        </div>
                    );
                })
            }
            <br />
            <div>
                <button onClick={addPlayer} className={"big-button"}>+ Add Player</button>
            </div>
            <br />
            <div>
                <button onClick={handleClick} className={"big-button"}>StartGame</button>
            </div>
        </div>
    );
}