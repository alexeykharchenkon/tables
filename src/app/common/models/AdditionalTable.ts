import { Column } from "./Column";
import { Row } from "./Row";
import { TableData } from "./TableData";

export interface AdditionalTable {
    id: string;
    title: string;
    columns: Column[];
    tablesData: TableData[];
    columnTypeValue: string;
    columnValue: string;
    editMode: boolean;
    columnId: string;
    selectMode: boolean;
    textMode: boolean;
    dateMode: boolean;
    numberMode: boolean;
    selectOptions: string[];
    selectTypeValue: string;
    forbiddenSymbols: string;
    multySelectMode: boolean;
    dateFormat: string;
    selectValue: string;
    fillingMode: boolean;
    addEditRowMode: boolean;
    activeRow: Row;
    isRequired: boolean;
    maxLength: number;
    maxItemsSelected: number;
    minValue: number;
    maxValue: number;
}