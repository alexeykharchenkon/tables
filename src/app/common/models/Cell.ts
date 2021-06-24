import { DataType } from "./DataType";

export interface Cell {
    id: string;
    type: DataType;
    value: any;
    selectOptions: string[];
    forbiddenSymbols: string;
    multySelectMode: boolean;
    dateFormat: string;
}