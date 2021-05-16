import * as React from 'react';
import { RefObject } from 'react';
import { App } from './App';
import { IPlayerCell } from './Game';

export interface IMainProps {
    app: App;
}

export class Main extends React.Component<IMainProps, {}>
{
    private canvas: RefObject<HTMLCanvasElement | null>;
    private canvas2: RefObject<HTMLCanvasElement | null>;
    constructor(props: IMainProps) {
        super(props);
        this.canvas = React.createRef<HTMLCanvasElement | null>();
        this.canvas2 = React.createRef<HTMLCanvasElement | null>();
    }

    componentDidMount() {
        this.drawBoard();
        this.drawPlayers();
    }

    private drawBoard() {
        const cellSize = 48;
        const canvasEl = this.canvas.current as HTMLCanvasElement;
        const ctx = canvasEl.getContext("2d");
        const boardInfo = this.props.app.game.board;
        const playerCellsInfo = this.props.app.game.playerCells;
        const margin = 10;

        for (let cell of [...boardInfo, ...playerCellsInfo]) {
            ctx.fillStyle = ('player' in cell && (cell as IPlayerCell).player.color) || "#EBEBEB";
            ctx.fillRect(margin + cell.x * cellSize, margin + cell.y * cellSize, cellSize, cellSize);
        }
        for (let cell of [...boardInfo, ...playerCellsInfo]) {
            const fontSize = 13;
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = 'Black';
            const offset = 4;
            ctx.fillText(cell.index.toString(), margin + cell.x * cellSize + offset, margin + cell.y * cellSize + offset + fontSize);
        }
        for (let cell of [...boardInfo, ...playerCellsInfo]) {
            ctx.strokeStyle = "black";
            ctx.strokeRect(margin + cell.x * cellSize, margin + cell.y * cellSize, cellSize, cellSize);
        }
    }

    private drawPlayers() {
        const cellSize = 48;
        const margin = 10;
        const canvasEl = this.canvas2.current as HTMLCanvasElement;
        const ctx = canvasEl.getContext("2d");
        const playerPieces = this.props.app.game.playerPieces;

        for (let playerPiece of playerPieces) {
            const boardCell = playerPiece.position;
            const centerX = margin + boardCell.x * cellSize + cellSize / 2;
            const centerY = margin + boardCell.y * cellSize + cellSize / 2;
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.arc(centerX, centerY, cellSize / 2 - 5, 0, Math.PI * 2);
            ctx.arc(centerX, centerY, cellSize / 2 - 15, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    public render(): JSX.Element {
        return (
            <>
                <div>Hello from Main.tsx</div>
                <div style={{ position: "relative" }}>
                    <canvas width="550" height="550" style={{ position: "absolute" }} ref={this.canvas}></canvas>
                    <canvas width="550" height="550" style={{ position: "absolute" }} ref={this.canvas2}></canvas>
                </div>
            </>
        );
    }
}