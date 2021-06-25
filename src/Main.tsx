import * as React from 'react';
import { RefObject } from 'react';
import { App } from './App';
import { ETurnState } from './Game';
import { IPlayerCell } from './GameStructs';

export interface IMainProps {
    app: App;
}

export class Main extends React.Component<IMainProps, { lastRoll?: number }>
{
    private canvas: RefObject<HTMLCanvasElement | null>;
    private canvas2: RefObject<HTMLCanvasElement | null>;
    private canvas3: RefObject<HTMLCanvasElement | null>;
    private canvas4: RefObject<HTMLCanvasElement | null>;
    constructor(props: IMainProps) {
        super(props);
        this.canvas = React.createRef<HTMLCanvasElement | null>();
        this.canvas2 = React.createRef<HTMLCanvasElement | null>();
        this.canvas3 = React.createRef<HTMLCanvasElement | null>();
        this.canvas4 = React.createRef<HTMLCanvasElement | null>();
        this.roll = this.roll.bind(this);
        this.onHit = this.onHit.bind(this);
        this.state = {};
    }

    componentDidMount() {
        this.drawBoards();
        this.startHighlighting();
    }

    private drawBoards() {
        this.drawBoard();
        this.drawPlayers();
        this.drawHitDetection();
    }

    private startHighlighting() {
        const canvasEl = this.canvas4.current as HTMLCanvasElement;
        const ctx = canvasEl.getContext("2d", { alpha: true });
        ctx.clearRect(0, 0, 550, 550);
        // const red = Math.floor(new Date().getTime() / 10 % 255);
        // const green = Math.floor(new Date().getTime() / 100 % 255);
        // const blue = Math.floor(new Date().getTime() / 1000 % 255);
        // ctx.fillStyle = `rgba(${red}, ${green}, ${blue})`;
        // ctx.fillRect(10 + 2 + 5 * 48, 10 + 2 + 5 * 48, 44, 44);

        if (this.props.app.game.turn.state === ETurnState.waitingForPieceSelection) {
            // highlight player selectable pieces;
            const cellSize = 48;
            const cellMargin = 4;
            const margin = 10;
            const pawnPath = new Path2D("m 20 100 q 0 -40 20 -60 a -20 -20 0 1 1 20 0 q 20 20 20 60 z ");
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.shadowColor = "yellow";
            ctx.shadowBlur = 6;
            const playerPieces = this.props.app.game.playerPieces.filter(piece => piece.player === this.props.app.game.turn.currentPlayer);
            for (let playerPiece of playerPieces) {
                const boardCell = playerPiece.position;
                const matrix2: DOMMatrix2DInit = {
                    a: (cellSize - cellMargin * 2) / 100, b: 0, c: 0,
                    d: (cellSize - cellMargin * 2) / 100, e: margin + boardCell.x * cellSize + cellMargin, f: margin + boardCell.y * cellSize + cellMargin
                };
                const pawn = new Path2D();
                pawn.addPath(pawnPath, matrix2);
                ctx.fillStyle = playerPiece.player.color;
                ctx.fill(pawn);
                ctx.stroke(pawn);
            }
        }
        requestAnimationFrame(this.startHighlighting.bind(this));
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
        const cellMargin = 4;
        const margin = 10;
        const canvasEl = this.canvas2.current as HTMLCanvasElement;
        const ctx = canvasEl.getContext("2d");
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        const pawnPath = new Path2D("m 20 100 q 0 -40 20 -60 a -20 -20 0 1 1 20 0 q 20 20 20 60 z ");
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.shadowColor = "black";
        ctx.shadowBlur = 3;
        const playerPieces = this.props.app.game.playerPieces;
        for (let playerPiece of playerPieces) {
            const boardCell = playerPiece.position;
            const matrix2: DOMMatrix2DInit = {
                a: (cellSize - cellMargin * 2) / 100, b: 0, c: 0,
                d: (cellSize - cellMargin * 2) / 100, e: margin + boardCell.x * cellSize + cellMargin, f: margin + boardCell.y * cellSize + cellMargin
            };
            const pawn = new Path2D();
            pawn.addPath(pawnPath, matrix2);
            ctx.fillStyle = playerPiece.player.color;
            ctx.fill(pawn);
            ctx.stroke(pawn);
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
        const ctx = canvasEl.getContext("2d");
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const currTurn = this.props.app.game.turn.currentPlayer;
        this.props.app.game.pieceSelect(pixel[0]);
        this.drawPlayers();
        this.drawHitDetection();
        //TODO: refactor to event driven, or make "turn" immutable and assign
        if(this.props.app.game.turn.currentPlayer !== currTurn)
            this.setState({ lastRoll: 0 });
    }

    private roll() {
        const lastRoll = this.props.app.game.roll();
        this.setState({ lastRoll: lastRoll });
        this.drawPlayers();
    }

    public render(): JSX.Element {
        const turnInfo = this.props.app.game.turn;
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ position: "relative", width: 550, height: 550 }}>
                    <canvas id="hit-detection-layer" width="550" height="550" style={{ position: "absolute" }} ref={this.canvas3} onClick={this.onHit}></canvas>
                    <canvas id="background-layer" width="550" height="550" style={{ position: "absolute", pointerEvents: "none" }} ref={this.canvas}></canvas>
                    <canvas id="pieces-layer" width="550" height="550" style={{ position: "absolute", pointerEvents: "none" }} ref={this.canvas2}></canvas>
                    <canvas id="highligh-layer" width="550" height="550" style={{ position: "absolute", pointerEvents: "none" }} ref={this.canvas4}></canvas>
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginLeft: "1rem", width: 250 }}>
                    <div style={{margin: "1rem 0", backgroundColor: "#EEEEEE", padding: "0.2rem" }}>
                        <div>player info</div>
                        <div>current player: {turnInfo.currentPlayer.name}</div>
                        <div>throw: {turnInfo.throwNumber} / {turnInfo.maxThrows}</div>
                        <p>{turnInfo.message}</p>
                    </div>
                    <div>
                        <button onClick={this.roll} style={{
                            height: "3rem", 
                            padding: "0.2rem 1.2rem", 
                            borderColor: "#BBBBBB", 
                            borderRadius: "0.4rem",
                            textTransform: "uppercase",
                            fontWeight: 900
                            }}>Roll dice!</button>
                            {/* TODO: top idea, when its your turn, you roll dice by swiping, either mouse click and hold moving, or mobile swiping to roll dice */}
                        <div>lastRoll: {turnInfo.roll}</div>
                    </div>
                </div>
            </div>
        );
    }
}