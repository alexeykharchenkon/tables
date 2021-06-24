import { Column } from "./Column";
import { DataType } from "./DataType";
import { Row } from "./Row";
import { TableData } from "./TableData";

export interface AdditionalTable {
    id: string;
    title: string;
    columns: Column[];
    tablesData: TableData[];
    columnTypeValue: DataType;
    columnValue: string;
    editMode: boolean;
    columnId: string;
    selectMode: boolean;
    textMode: boolean;
    dateMode: boolean;
    selectOptions: string[];
    selectTypeValue: string;
    forbiddenSymbols: string;
    multySelectMode: boolean;
    dateFormat: string;
    selectValue: string;
    fillingMode: boolean;
    addEditRowMode: boolean;
    activeRow: Row;
}