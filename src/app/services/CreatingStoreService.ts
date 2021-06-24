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
            selectOptions: [],
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
                });

                table.tablesData.forEach(tabData => {
                    tabData.rows.forEach(row => {
                        row.cells.push({
                            id: Guid.create().toString(),
                            value: "",
                            type: table.columnTypeValue,
                            selectOptions: table.selectOptions,
                        });
                    });
                });
            }
            table.columnTypeValue = DataType.Text;
            table.columnValue = "";
            table.selectOptions = [];
            table.selectMode = false;
        });
    },
    editColumn: (tables: AdditionalTable[], tableId: string, columnId: string, value: string, type: DataType) => {
        tables.filter(table => table.id === tableId)
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
    saveEditedColumn: (tables: AdditionalTable[], tableId: string) => {
        tables.filter(table => table.id === tableId)
        .forEach(table=> { 
            table.columns.filter(col => col.id === table.columnId)
             .forEach (col => { 
                 col.label = table.columnValue; 
                 col.type = table.columnTypeValue;
                 col.selectOptions = table.selectOptions;
                });

            const idx = table.columns.findIndex(col => col.id === table.columnId);
            table.tablesData.forEach(tabData => {
                tabData.rows.forEach(row => {
                    row.cells[idx].type = table.columnTypeValue;
                    row.cells[idx].selectOptions = table.selectOptions;
                });
            });

            table.editMode = false;
            table.columnValue = "";
            table.columnId = "";
            table.columnTypeValue = DataType.Text;
            table.selectMode = false;
            table.selectOptions = [];
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
}

export const creatingStoreService = {
    createTable: (tables: AdditionalTable[], tableTitleValue: string) => requests.createTable(tables, tableTitleValue),
    addColumn: (tables: AdditionalTable[], tableId: string)=> requests.addColumn(tables, tableId),
    editColumn: (tables: AdditionalTable[], tableId: string, columnId: string, value: string, type: DataType)=>requests.editColumn(tables, tableId, columnId, value, type),
    saveEditedColumn: (tables: AdditionalTable[], tableId: string) => requests.saveEditedColumn(tables, tableId),
    deleteColumn: (tables: AdditionalTable[], tableId: string, columnId: string) => requests.deleteColumn(tables, tableId, columnId),
    addSelectField: (tables: AdditionalTable[], tabId: string) => requests.addSelectField(tables, tabId),
}
