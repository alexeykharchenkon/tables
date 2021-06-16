import { DataType } from "./DataType";

export interface Column {
    id: string;
    type: DataType;
    label: string;
}