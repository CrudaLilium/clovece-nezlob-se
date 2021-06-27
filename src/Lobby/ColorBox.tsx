import React from "react";
import EPlayerColor from "../EPlayerColors";

export interface IColorBox {
    color: EPlayerColor
}

export function ColorBox(props: IColorBox) {
    return <div style={{
        width: "1rem",
        height: "1rem",
        display: "inline-block",
        backgroundColor: props.color,
        border: "1px solid black",
        verticalAlign: "text-bottom",
        boxSizing: "border-box"
    }}></div>
}