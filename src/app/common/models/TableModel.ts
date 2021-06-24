import { Column } from "./Column";
import { TableData } from "./TableData";

export interface TableModel {
    id: string;
    title: string;
    columns: Column[];
    tablesData: TableData[];
}