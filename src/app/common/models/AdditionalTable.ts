import { Column } from "./Column";
import { DataType } from "./DataType";
import { Row } from "./Row";

export interface AdditionalTable {
    id: string;
    title: string;
    columns: Column[];
    rows: Row[];
    columnTypeValue: DataType;
    columnValue: string;
    editMode: boolean;
    columnId: string;
}