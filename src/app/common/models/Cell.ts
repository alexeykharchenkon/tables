import { DataType } from "./DataType";

export interface Cell {
    id: string;
    type: DataType;
    value: any;
}