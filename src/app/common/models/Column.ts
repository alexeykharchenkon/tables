import { DataType } from "./DataType";

export interface Column {
    id: string;
    label: string;
    type: DataType;
}