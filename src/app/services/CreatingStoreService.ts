import { AdditionalTable } from "@common/models/AdditionalTable";
import { DataType } from "@common/models/DataType";
import { Guid } from "guid-typescript";

const requests = {
    createTable: (tables: AdditionalTable[], tableTitleValue: string) => {
        tables.unshift({
            id: Guid.create().toString(), 
            title: Boolean(tableTitleValue) ? tableTitleValue : "Table " + (tables.length + 1).toString(), 
            columns: [],
            tablesData: [], 
            columnTypeValue: DataType.Text,
            columnValue: "",
            editMode: false,
            columnId: "",
            selectMode: false,
            textMode: true,
            dateMode: false,
            selectOptions: [],
            selectTypeValue: "0",
            forbiddenSymbols: "",
            multySelectMode: false,
            dateFormat: "date",
            selectValue: "",
            fillingMode: false,
            addEditRowMode: false,
            activeRow: {id: "", cells: []},
        });
    },
    addColumn: (tables: AdditionalTable[], tableId: string) => {
        tables.filter(table => table.id === tableId)
        .forEach(table=> { 
            if(table.columns.length < 10){
                table.columns.push({
                    id: Guid.create().toString(),
                    label: Boolean(table.columnValue) ? table.columnValue : "Column " + (table.columns.length + 1).toString(),
                    type: table.columnTypeValue,
                    selectOptions: table.selectOptions,
                    forbiddenSymbols: table.forbiddenSymbols,
                    multySelectMode: table.multySelectMode,
                    dateFormat: table.dateFormat,
                });

                table.tablesData.forEach(tabData => {
                    tabData.rows.forEach(row => {
                        row.cells.push({
                            id: Guid.create().toString(),
                            value: "",
                            type: table.columnTypeValue,
                            selectOptions: table.selectOptions,
                            forbiddenSymbols: table.forbiddenSymbols,
                            multySelectMode: table.multySelectMode,
                            dateFormat: table.dateFormat,
                        });
                    });
                });
            }
            requests.makeValuestoDefault(table);
        });
    },
    editColumn: (tables: AdditionalTable[], tableId: string, columnId: string, value: string, type: DataType, selectType: boolean) => {
        tables.filter(table => table.id === tableId)
        .forEach(table => { 
            table.editMode = true;
            table.columnValue = value;
            table.columnId = columnId;
            table.columnTypeValue = type;
    
            switch(type.valueOf().toString()){
                case DataType.Select.valueOf().toString():
                    table.selectMode = true;
                    table.textMode = false;
                    table.dateMode = false;
                    table.selectTypeValue = selectType ? "1" : "0"; 
                    table.selectOptions = table.columns.filter(col => col.id === columnId)[0].selectOptions;
                    break;
                case DataType.Text.valueOf().toString():
                    table.textMode = true;
                    table.selectMode = false;
                    table.dateMode = false;
                    table.forbiddenSymbols = table.columns.filter(col => col.id === columnId)[0].forbiddenSymbols;
                    break;
                case DataType.DatePicker.valueOf().toString():
                    table.dateMode = true;
                    table.selectMode = false;
                    table.textMode = false;
                    table.dateFormat = table.columns.filter(col => col.id === columnId)[0].dateFormat;
                    break;
                case DataType.Number.valueOf().toString():
                    table.selectMode = false;
                    table.textMode = false;
                    table.dateMode = false;
                    break;
                case DataType.Checkbox.valueOf().toString():
                    table.selectMode = false;
                    table.textMode = false;
                    table.dateMode = false;
                    break;
            }    
        });
    },
    saveEditedColumn: (tables: AdditionalTable[], tableId: string) => {
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
                });

            const idx = table.columns.findIndex(col => col.id === table.columnId);
            table.tablesData.forEach(tabData => {
                tabData.rows.forEach(row => {
                    row.cells[idx].type = table.columnTypeValue;
                    row.cells[idx].selectOptions = table.selectOptions;
                    row.cells[idx].forbiddenSymbols = table.forbiddenSymbols;
                    row.cells[idx].multySelectMode = table.multySelectMode;
                    row.cells[idx].dateFormat = table.dateFormat;
                });
            });

            requests.makeValuestoDefault(table);
        });
    },
    deleteColumn: (tables: AdditionalTable[], tableId: string, columnId: string) => {
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
    },
    addSelectField: (tables: AdditionalTable[], tabId: string) => {
        tables.filter(tab => tab.id === tabId)
        .forEach(tab => {
            tab.selectOptions.push(
                Boolean(tab.selectValue) ? tab.selectValue : "Select " + (tab.selectOptions.length + 1).toString(),
            );
            tab.selectValue = "";
        });
    },
    switchSelectMode: (tables: AdditionalTable[], tabId: string, value: DataType) => {
        switch(value.valueOf().toString()){
            case DataType.Text.valueOf().toString():
                tables.filter(tab => tab.id === tabId)[0].textMode = true;
                tables.filter(tab => tab.id === tabId)[0].dateMode = false;
                tables.filter(tab => tab.id === tabId)[0].selectMode = false;
                break;
            case DataType.DatePicker.valueOf().toString():
                tables.filter(tab => tab.id === tabId)[0].dateMode = true;
                tables.filter(tab => tab.id === tabId)[0].selectMode = false;
                tables.filter(tab => tab.id === tabId)[0].textMode = false;
                break;
            case DataType.Select.valueOf().toString():
                tables.filter(tab => tab.id === tabId)[0].selectMode = true;
                tables.filter(tab => tab.id === tabId)[0].dateMode = false;
                tables.filter(tab => tab.id === tabId)[0].textMode = false;
                break;
            case DataType.Number.valueOf().toString():
                tables.filter(tab => tab.id === tabId)[0].selectMode = false;
                tables.filter(tab => tab.id === tabId)[0].dateMode = false;
                tables.filter(tab => tab.id === tabId)[0].textMode = false;
                break;
            case DataType.Checkbox.valueOf().toString():
                tables.filter(tab => tab.id === tabId)[0].selectMode = false;
                tables.filter(tab => tab.id === tabId)[0].dateMode = false;
                tables.filter(tab => tab.id === tabId)[0].textMode = false;
                break;
        }
    },
    makeValuestoDefault: (table: AdditionalTable) => {
        table.editMode = false;
        table.columnValue = "";
        table.columnId = "";
        table.columnTypeValue = DataType.Text;
        table.selectMode = false;
        table.dateMode = false;
        table.textMode = true;
        table.selectOptions = [];
        table.forbiddenSymbols = "";
        table.multySelectMode = false;
        table.dateFormat = "";
        table.selectTypeValue = "0";
    },
}

export const creatingStoreService = {
    createTable: (tables: AdditionalTable[], tableTitleValue: string) => requests.createTable(tables, tableTitleValue),
    addColumn: (tables: AdditionalTable[], tableId: string)=> requests.addColumn(tables, tableId),
    editColumn: (tables: AdditionalTable[], tableId: string, columnId: string, value: string, type: DataType, selectType: boolean)=>requests.editColumn(tables, tableId, columnId, value, type, selectType),
    saveEditedColumn: (tables: AdditionalTable[], tableId: string) => requests.saveEditedColumn(tables, tableId),
    deleteColumn: (tables: AdditionalTable[], tableId: string, columnId: string) => requests.deleteColumn(tables, tableId, columnId),
    addSelectField: (tables: AdditionalTable[], tabId: string) => requests.addSelectField(tables, tabId),
    switchSelectMode: (tables: AdditionalTable[], tabId: string, value: DataType) => requests.switchSelectMode(tables, tabId, value),
    makeValuestoDefault: (table: AdditionalTable) => requests.makeValuestoDefault(table),
}
