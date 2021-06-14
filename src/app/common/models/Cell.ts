import { DataType } from "./DataType";

export interface Cell {
    value: any;
    row: number;
    column: number;
    type: DataType;
}