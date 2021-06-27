import React, { Fragment, useState } from "react";
import { App } from "./App";
import { GameBoard } from "./GameBoard";
import { Lobby } from "./Lobby/Lobby";
import "./test.scss";

export interface IMainProps {
    app: App;
}

export function Main(props: IMainProps) {
    const [game, setGame] = useState(null);
    return (
        <Fragment>
            { game === null &&
                <Lobby app={props.app} setGame={setGame} />
            }
            { game &&
                <GameBoard game={props.app.game} />
            }
        </Fragment>
    );
}