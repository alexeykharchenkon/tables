export interface Column {
    id: string;
    type: string;
    label: string;
    selectOptions: string[];
    forbiddenSymbols: string;
    multySelectMode: boolean;
    dateFormat: string;
    isRequired: boolean;
    maxLength: string;
    maxItemsSelected: string;
    minValue: string;
    maxValue: string;
}