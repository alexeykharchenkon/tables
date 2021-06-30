
export interface Column {
    id: string;
    type: string;
    label: string;
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