import { DataType } from "./DataType";

export interface Cell {
    value: any;
    type: DataType;
    row: number;
    column: number; 
}