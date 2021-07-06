import { AdditionalTable } from "@common/models/AdditionalTable";
import { DataType } from "@common/models/DataType";
import { Guid } from "guid-typescript";

class CreatingStoreService {
    createTable(tables: AdditionalTable[], tableTitleValue: string) {
        tables.unshift({
            id: Guid.create().toString(), 
            title: Boolean(tableTitleValue) ? tableTitleValue : "Table " + (tables.length + 1).toString(), 
            columns: [],
            tablesData: [], 
            columnTypeValue: "",
            columnValue: "",
            editMode: false,
            columnId: "",
            selectMode: false,
            textMode: false,
            dateMode: false,
            numberMode: false,
            selectOptions: [],
            selectTypeValue: "0",
            forbiddenSymbols: "",
            multySelectMode: false,
            dateFormat: "dd/MM/yyyy",
            selectValue: "",
            fillingMode: false,
            addEditRowMode: false,
            activeRow: {id: "", cells: []},
            isRequired: false,
            maxLength: "",
            maxItemsSelected:"",
            minValue: "",
            maxValue: "",
        });
    }
    addColumn (tables: AdditionalTable[], tableId: string) {
        tables.filter(table => table.id === tableId)
        .forEach(table=> { 
            if(table.columns.length < 10){
                if(table.columnTypeValue !== ""){
                    table.columns.push({
                        id: Guid.create().toString(),
                        label: Boolean(table.columnValue) ? table.columnValue : "Column " + (table.columns.length + 1).toString(),
                        type: table.columnTypeValue,
                        selectOptions: table.selectOptions,
                        forbiddenSymbols: table.forbiddenSymbols,
                        multySelectMode: table.multySelectMode,
                        dateFormat: Boolean(table.dateFormat) ?  table.dateFormat : "dd/MM/yyyy",
                        isRequired: table.isRequired,
                        maxLength: table.maxLength,
                        maxItemsSelected: table.maxItemsSelected,
                        minValue: table.minValue,
                        maxValue: table.maxValue,
                    });
                    table.tablesData.forEach(tabData => {
                        tabData.rows.forEach(row => {
                            var val;
                            switch(table.columnTypeValue) {
                                case DataType[DataType.Select]:
                                    val = [""];
                                    break;
                                case DataType[DataType.Checkbox]:
                                    val = false;
                                    break;
                                case DataType[DataType.DatePicker]:
                                    val = new Date();
                                    break;
                            } 

                            row.cells.push({
                                id: Guid.create().toString(),
                                value: val ?? "",
                                type: table.columnTypeValue,
                                selectOptions: table.selectOptions,
                                forbiddenSymbols: table.forbiddenSymbols,
                                multySelectMode: table.multySelectMode,
                                dateFormat: Boolean(table.dateFormat) ?  table.dateFormat : "dd/MM/yyyy",
                                isRequired: table.isRequired,
                                maxLength: table.maxLength,
                                maxItemsSelected: table.maxItemsSelected,
                                minValue: table.minValue,
                                maxValue: table.maxValue,
                                error: "",
                            });
                        });
                    });
                }
            }
            creatingStoreService.makeValuestoDefault(table);
        });
    }
    editColumn (tables: AdditionalTable[], tableId: string, columnId: string, value: string, type: string, selectType: boolean) {
        tables.filter(table => table.id === tableId)
        .forEach(table => { 
            table.editMode = true;
            table.columnValue = value;
            table.columnId = columnId;
            table.columnTypeValue = type;
    
            switch(type){
                case DataType[DataType.Select]:
                    table.selectMode = true;
                    table.numberMode =table.textMode = table.dateMode = false;
                    table.selectTypeValue = selectType ? "1" : "0"; 
                    table.selectOptions = table.columns.find(col => col.id === columnId)?.selectOptions as string[];
                    table.isRequired = table.columns.find(col => col.id === columnId)?.isRequired as boolean;
                    table.maxItemsSelected = table.columns.find(col => col.id === columnId)?.maxItemsSelected as string;
                    table.multySelectMode =  table.columns.find(col => col.id === columnId)?.multySelectMode as boolean;
                    break;
                case DataType[DataType.Text]:
                    table.textMode = true;
                    table.numberMode = table.selectMode = table.dateMode = false;
                    table.forbiddenSymbols = table.columns.find(col => col.id === columnId)?.forbiddenSymbols as string;
                    table.isRequired = table.columns.find(col => col.id === columnId)?.isRequired as boolean;
                    table.maxLength = table.columns.find(col => col.id === columnId)?.maxLength as string;
                    break;
                case DataType[DataType.DatePicker]:
                    table.dateMode = true;
                    table.numberMode = table.selectMode = table.textMode = false;
                    table.dateFormat = table.columns.find(col => col.id === columnId)?.dateFormat as string;
                    table.isRequired = table.columns.find(col => col.id === columnId)?.isRequired as boolean;
                    break;
                case DataType[DataType.Number]:
                    table.numberMode = true;
                    table.selectMode = table.textMode = table.dateMode = false;
                    table.isRequired = table.columns.find(col => col.id === columnId)?.isRequired as boolean;
                    table.maxValue = table.columns.find(col => col.id === columnId)?.maxValue as string;
                    table.minValue = table.columns.find(col => col.id === columnId)?.minValue as string;
                    break;
                case DataType[DataType.Checkbox]:
                    table.numberMode = table.selectMode = table.textMode =  table.dateMode = false;
                    break;
            }    
        });
    }
    saveEditedColumn (tables: AdditionalTable[], tableId: string) {
        tables.filter(table => table.id === tableId)
        .forEach(table=> { 
            table.columns.filter(col => col.id === table.columnId)
             .forEach (col => { 
                 col.label = table.columnValue; 
                 col.type = table.columnTypeValue;
                 col.selectOptions = table.selectOptions;
                 col.forbiddenSymbols = table.forbiddenSymbols;
                 col.multySelectMode = table.multySelectMode;
                 col.dateFormat = table.dateFormat;
                 col.isRequired = table.isRequired;
                 col.maxLength = table.maxLength;
                 col.maxItemsSelected = table.maxItemsSelected;
                 col.minValue = table.minValue;
                 col.maxValue = table.maxValue;
                });

            const idx = table.columns.findIndex(col => col.id === table.columnId);
            table.tablesData.forEach(tabData => {
                tabData.rows.forEach(row => {
                    row.cells[idx].type = table.columnTypeValue;
                    row.cells[idx].selectOptions = table.selectOptions;
                    row.cells[idx].forbiddenSymbols = table.forbiddenSymbols;
                    row.cells[idx].multySelectMode = table.multySelectMode;
                    row.cells[idx].dateFormat = table.dateFormat;
                    row.cells[idx].isRequired = table.isRequired;
                    row.cells[idx].maxLength = table.maxLength;
                    row.cells[idx].maxItemsSelected = table.maxItemsSelected;
                    row.cells[idx].minValue = table.minValue;
                    row.cells[idx].maxValue = table.maxValue;
                    row.cells[idx].error = "";
                });
            });

            creatingStoreService.makeValuestoDefault(table);
        });
    }
    deleteColumn (tables: AdditionalTable[], tableId: string, columnId: string) {
        tables.filter(table => table.id === tableId)
        .forEach(table => { 
            table.columns = table.columns.filter(col => col.id !== columnId);
            
            const idx = table.columns.findIndex(col => col.id === columnId);
            table.tablesData.forEach(tabData => {
                tabData.rows.forEach(row => {
                    row.cells.splice(idx,1);
                });
            });
        });
    }
    addSelectField(tables: AdditionalTable[], tabId: string) {
        tables.filter(tab => tab.id === tabId)
        .forEach(tab => {
            if(tab.selectValue !== "") {
                tab.selectOptions.push(
                   tab.selectValue,
                );
                tab.selectValue = "";
            }
        });
    }
    switchSelectMode (tables: AdditionalTable[], tabId: string, value: string) {
        switch(value){
            case DataType[DataType.Text]:
                creatingStoreService.makeModesFalse(tables, tabId);
                tables.filter(tab => tab.id === tabId).forEach(tab => {tab.textMode = true;});
                break;
            case DataType[DataType.DatePicker]:
                creatingStoreService.makeModesFalse(tables, tabId);
                tables.filter(tab => tab.id === tabId).forEach(tab => {tab.dateMode = true;});
                break;
            case DataType[DataType.Select]:
                creatingStoreService.makeModesFalse(tables, tabId);
                tables.filter(tab => tab.id === tabId).forEach(tab => {tab.selectMode = true;});
                break;
            case DataType[DataType.Number]:
                creatingStoreService.makeModesFalse(tables, tabId);
                tables.filter(tab => tab.id === tabId).forEach(tab => {tab.numberMode = true;});
                break;
            case DataType[DataType.Checkbox]:
                creatingStoreService.makeModesFalse(tables, tabId);
                break;
            default:
                creatingStoreService.makeModesFalse(tables, tabId);
                break;
        }
    }
    makeValuestoDefault (table: AdditionalTable) {
        table.editMode = false;
        table.columnValue = "";
        table.columnId = "";
        table.columnTypeValue = "";
        table.selectMode = false;
        table.dateMode = false;
        table.textMode = false;
        table.numberMode = false;
        table.selectOptions = [];
        table.forbiddenSymbols = "";
        table.multySelectMode = false;
        table.dateFormat = "";
        table.selectTypeValue = "0";
        table.isRequired = false;
        table.maxLength = "";
        table.maxItemsSelected = "";
        table.minValue = "";
        table.maxValue = "";
    }
    makeModesFalse (tables: AdditionalTable[], tabId: string) {
        tables.filter(tab => tab.id === tabId)
        .forEach(tab => { 
            tab.selectMode = false;
            tab.dateMode = false;
            tab.textMode = false;
            tab.numberMode = false;
        })
    }
}

export const creatingStoreService = new CreatingStoreService();