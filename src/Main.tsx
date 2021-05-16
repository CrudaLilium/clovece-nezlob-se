import * as React from 'react';
import { RefObject } from 'react';
import { App } from './App';

export interface IMainProps {
    app: App;
}

export class Main extends React.Component<IMainProps, {}>
{
    private canvas: RefObject<HTMLCanvasElement | null>;
    constructor(props: IMainProps) {
        super(props);
        this.canvas = React.createRef<HTMLCanvasElement | null>();
    }

    componentDidMount() {
        this.drawBoard();
    }

    drawBoard() {
        const cellSize = 48;
        const canvasEl = this.canvas.current as HTMLCanvasElement;
        const ctx = canvasEl.getContext("2d");
        this.props.app.game
        const boardInfo = this.props.app.game.board;
        const playerCellsInfo = this.props.app.game.playerCells;
        const margin = 10;

        for (let cell of [...boardInfo, ...playerCellsInfo]) {
            ctx.fillStyle = ('color' in cell && cell['color']) || "#EBEBEB";
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

    public render(): JSX.Element {
        return (
            <>
                <div>Hello from Main.tsx</div>
                <canvas width="550" height="550" ref={this.canvas} ></canvas>
            </>
        );
    }
}