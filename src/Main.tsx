import * as React from 'react';
import { RefObject } from 'react';
import { App } from './App';
import { IPlayerCell } from './GameStructs';

export interface IMainProps {
    app: App;
}

export class Main extends React.Component<IMainProps, { lastRoll?: number }>
{
    private canvas: RefObject<HTMLCanvasElement | null>;
    private canvas2: RefObject<HTMLCanvasElement | null>;
    private canvas3: RefObject<HTMLCanvasElement | null>;
    constructor(props: IMainProps) {
        super(props);
        this.canvas = React.createRef<HTMLCanvasElement | null>();
        this.canvas2 = React.createRef<HTMLCanvasElement | null>();
        this.canvas3 = React.createRef<HTMLCanvasElement | null>();
        this.roll = this.roll.bind(this);
        this.onHit = this.onHit.bind(this);
        this.state = {};
    }

    componentDidMount() {
        this.drawBoards();
    }

    private drawBoards() {
        this.drawBoard();
        this.drawPlayers();
        this.drawHitDetection();
    }

    private drawBoard() {
        const cellSize = 48;
        const margin = 10;
        const canvasEl = this.canvas.current as HTMLCanvasElement;
        const ctx = canvasEl.getContext("2d");
        const boardInfo = this.props.app.game.board;
        const playerCellsInfo = this.props.app.game.playerCells;

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

        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

        const playerPieces = this.props.app.game.playerPieces;

        for (let playerPiece of playerPieces) {
            const boardCell = playerPiece.position;
            const centerX = margin + boardCell.x * cellSize + cellSize / 2;
            const centerY = margin + boardCell.y * cellSize + cellSize / 2;
            ctx.strokeStyle = playerPiece.player.color;
            ctx.beginPath();
            ctx.arc(centerX, centerY, cellSize / 2 - 5, 0, Math.PI * 2);
            ctx.arc(centerX, centerY, cellSize / 2 - 15, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    private drawHitDetection() {
        const cellSize = 48;
        const margin = 10;
        const canvasEl = this.canvas3.current as HTMLCanvasElement;
        const ctx = canvasEl.getContext("2d");
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        const playerPieces = this.props.app.game.playerPieces;
        const board = this.props.app.game.board;
        const playerCells = this.props.app.game.playerCells;

        for (let cell of [...board, ...playerCells]) {
            ctx.fillStyle = `rgb(${cell.identity ?? 0},0,0)`;
            ctx.fillRect(margin + cell.x * cellSize, margin + cell.y * cellSize, cellSize, cellSize);
        }
        for (let pl of [...playerPieces]) {
            ctx.fillStyle = `rgb(${pl.identity ?? 0},0,0)`;
            const cell = pl.position;
            ctx.fillRect(margin + cell.x * cellSize, margin + cell.y * cellSize, cellSize, cellSize);
        }
    }

    private onHit(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        const canvasEl = this.canvas3.current as HTMLCanvasElement;
        const rect = canvasEl.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        //console.log("x,y", x, y);
        const ctx = canvasEl.getContext("2d");
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        //console.log(pixel);
        this.props.app.game.pieceSelect(pixel[0]);
        
        this.drawPlayers();
        this.drawHitDetection();
    }

    private roll() {
        const lastRoll = this.props.app.game.roll();
        this.setState({ lastRoll: lastRoll });
        this.drawPlayers();
    }

    public render(): JSX.Element {
        const turnInfo = this.props.app.game.turn;
        return (
            <>
                <div>Hello from Main.tsx</div>
                <div style={{ display: "flex" }}>
                    <div>
                        <button onClick={this.roll}>Roll!</button>
                        <div>lastRoll: {this.state.lastRoll}</div>
                    </div>
                    <div>
                        <div>player info</div>
                        <div>current player: {turnInfo.currentPlayer.name}</div>
                        <div>throw: {turnInfo.throwNumber} / {turnInfo.maxThrows}</div>
                        <p>{turnInfo.message}</p>
                    </div>
                </div>
                <div style={{ position: "relative" }}>
                    <canvas id="hit-detection-layer" width="550" height="550" style={{ position: "absolute" }} ref={this.canvas3} onClick={this.onHit}></canvas>
                    <canvas id="background-layer" width="550" height="550" style={{ position: "absolute", pointerEvents: "none" }} ref={this.canvas}></canvas>
                    <canvas id="pieces-layer" width="550" height="550" style={{ position: "absolute", pointerEvents: "none" }} ref={this.canvas2}></canvas>
                </div>
            </>
        );
    }
}