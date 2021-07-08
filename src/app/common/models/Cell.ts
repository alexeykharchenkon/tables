export interface Cell {
    id: string;
    rowId: string;
    tableId: string;
    type: string;
    value: any;
    selectOptions: string;
    forbiddenSymbols: string;
    multySelectMode: string;
    dateFormat: string;
    isRequired: string;
    maxLength: string;
    maxItemsSelected: string;
    minValue:string;
    maxValue: string;
    error: string;
}