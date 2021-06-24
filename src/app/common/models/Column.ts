import { DataType } from "./DataType";

export interface Column {
    id: string;
    type: DataType;
    label: string;
    selectOptions: string[];
    forbiddenSymbols: string;
    multySelectMode: boolean;
    dateFormat: string;
}