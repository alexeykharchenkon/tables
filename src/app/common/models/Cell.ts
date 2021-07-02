export interface Cell {
    id: string;
    type: string;
    value: any;
    selectOptions: string[];
    forbiddenSymbols: string;
    multySelectMode: boolean;
    dateFormat: string;
    isRequired: boolean;
    maxLength: string;
    maxItemsSelected: string;
    minValue:string;
    maxValue: string;
    error: string;
}