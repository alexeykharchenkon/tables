import { Column } from "./Column";
import { Row } from "./Row";

export interface TableModel {
    id: string;
    title: string;
    columns: Column[];
    rows: Row[];
}