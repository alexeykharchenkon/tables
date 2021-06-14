import { Cell } from "./Cell";
import { Column } from "./Column";

export interface TableModel {
    id: string;
    title: string;
    columns: Column[];
    cells: Cell[];
}