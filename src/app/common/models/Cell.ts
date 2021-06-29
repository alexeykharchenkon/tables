export interface Cell {
    id: string;
    type: string;
    value: any;
    selectOptions: string[];
    forbiddenSymbols: string;
    multySelectMode: boolean;
    dateFormat: string;
}