import { IBoardCell } from "./GameStructs";

export interface IBoardCreationFactory {
    create(): Array<IBoardCell>;
}