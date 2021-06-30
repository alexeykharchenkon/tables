export interface Cell {
    id: string;
    type: string;
    value: any;
    selectOptions: string[];
    forbiddenSymbols: string;
    multySelectMode: boolean;
    dateFormat: string;
    isRequired: boolean;
    maxLength: number;
    maxItemsSelected: number;
    minValue: number;
    maxValue: number;
}