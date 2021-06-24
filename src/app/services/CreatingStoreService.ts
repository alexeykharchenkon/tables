import { AdditionalTable } from "@common/models/AdditionalTable";
import { DataType } from "@common/models/DataType";
import { Guid } from "guid-typescript";

const requests = {
    createTable: (additionalTables: AdditionalTable[], tableTitleValue: string) => {
        additionalTables.unshift({
            id: Guid.create().toString(), 
            title: Boolean(tableTitleValue) ? tableTitleValue : "Table " + (additionalTables.length + 1).toString(), 
            columns: [],
            tablesData: [], 
            columnTypeValue: DataType.Text,
            columnValue: "",
            editMode: false,
            columnId: "",
            selectMode: false,
            selectOptions: [],
            selectValue: "",
            fillingMode: false,
            addEditRowMode: false,
            activeRow: {id: "", cells: []},
        });
    },
    addColumn: (additionalTables: AdditionalTable[], tableId: string) => {
        additionalTables.filter(table => table.id === tableId)
        .forEach(table=> { 
            if(table.columns.length < 10){
                table.columns.push({
                    id: Guid.create().toString(),
                    label: Boolean(table.columnValue) ? table.columnValue : "Column " + (table.columns.length + 1).toString(),
                    type: table.columnTypeValue,
                    selectOptions: table.selectOptions,
                });
            }
            table.columnTypeValue = DataType.Text;
            table.columnValue = "";
            table.selectOptions = [];
            table.selectMode = false;
        });
    },
    editColumn: (additionalTables: AdditionalTable[], tableId: string, columnId: string, value: string, type: DataType) => {
        additionalTables.filter(table => table.id === tableId)
        .forEach(table => { 
            table.editMode = true;
            table.columnValue = value;
            table.columnId = columnId;
            table.columnTypeValue = type;
            if(type.valueOf().toString() === DataType.Select.valueOf().toString()){
                table.selectMode = true;
                table.selectOptions = table.columns.filter(col => col.id === columnId)[0].selectOptions;
            }
                
        });
    },
    saveEditedColumn: (additionalTables: AdditionalTable[], tableId: string) => {
        additionalTables.filter(table => table.id === tableId)
        .forEach(table=> { 
            table.columns.filter(col => col.id === table.columnId)
             .forEach (col => { 
                 col.label = table.columnValue; 
                 col.type = table.columnTypeValue;
                 col.selectOptions = table.selectOptions;
                });
            table.editMode = false;
            table.columnValue = "";
            table.columnId = "";
            table.columnTypeValue = DataType.Text;
            table.selectMode = false;
            table.selectOptions = [];
        });
    },
    deleteColumn: (additionalTables: AdditionalTable[], tableId: string, columnId: string) => {
        additionalTables.filter(table => table.id === tableId)
        .forEach(table => { table.columns = table.columns.filter(col => col.id !== columnId);});
    },
    addSelectField: (additionalTables: AdditionalTable[], tabId: string) => {
        additionalTables.filter(tab => tab.id === tabId)
        .forEach(tab => {
            tab.selectOptions.push(
                Boolean(tab.selectValue) ? tab.selectValue : "Select " + (tab.selectOptions.length + 1).toString(),
            );
            tab.selectValue = "";
        });
    },
}

export const creatingStoreService = {
    createTable: (additionalTables: AdditionalTable[], tableTitleValue: string) => requests.createTable(additionalTables, tableTitleValue),
    addColumn: (additionalTables: AdditionalTable[], tableId: string)=> requests.addColumn(additionalTables, tableId),
    editColumn: (additionalTables: AdditionalTable[], tableId: string, columnId: string, value: string, type: DataType)=>requests.editColumn(additionalTables, tableId, columnId, value, type),
    saveEditedColumn: (additionalTables: AdditionalTable[], tableId: string) => requests.saveEditedColumn(additionalTables, tableId),
    deleteColumn: (additionalTables: AdditionalTable[], tableId: string, columnId: string) => requests.deleteColumn(additionalTables, tableId, columnId),
    addSelectField: (additionalTables: AdditionalTable[], tabId: string) => requests.addSelectField(additionalTables, tabId),
}
