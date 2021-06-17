import { Guid } from "guid-typescript";
import { makeAutoObservable } from "mobx";
import { AdditionalTable } from "@common/models/AdditionalTable";
import { DataType } from "@common/models/DataType";
import { tableService } from "@services/TableService";
import { TableStore } from "./tableStore";


export class ColumnStore {
    additionalTables: AdditionalTable[] = [];
    tableStore: TableStore;  
    tableTitleValue: string = "";
    
    constructor(tableStore: TableStore){
        this.tableStore = tableStore;
        this.tableStore.tables.forEach(table => {
            this.additionalTables.push({
                id: table.id,
                title: table.title,
                columns: table.columns,
                rows: table.rows,
                columnTypeValue: DataType.Text,
                columnValue: "",
                editMode: false,
                columnId: "",
            });
        })
        makeAutoObservable(this)
    }

    createTable = () => {
        this.additionalTables.unshift({
            id: Guid.create().toString(), 
            title: Boolean(this.tableTitleValue) ? this.tableTitleValue : "Table " + (this.additionalTables.length + 1).toString(), 
            columns: [],
            rows: [], 
            columnTypeValue: DataType.Text,
            columnValue: "",
            editMode: false,
            columnId: "",
        });

        this.tableTitleValue = "";    

        this.tableStore.tables =this.additionalTables;
        tableService.save(this.tableStore.tables);
    }

    tableTitleValueOnChange = (value: string) => {
        this.tableTitleValue = value;
    }

    deleteTable = (tableId: string) => {
        this.additionalTables = this.additionalTables.filter(table => table.id !== tableId);
        this.tableStore.tables =this.additionalTables;
        tableService.save(this.tableStore.tables);
    }

    addColumn = (tableId: string) => {
        this.additionalTables.filter(table => table.id === tableId)
        .forEach(table=> { 
            if(table.columns.length < 10){
                table.columns.push({
                    id: Guid.create().toString(),
                    label: Boolean(table.columnValue) ? table.columnValue : "Column " + (table.columns.length + 1).toString(),
                    type: table.columnTypeValue,
                });
            }
            table.columnTypeValue = DataType.Text;
            table.columnValue = "";
        });

        this.tableStore.tables =this.additionalTables;
        tableService.save(this.tableStore.tables);
    }

    columnTypeValueChange = (value: DataType, tabId: string) => {
        this.additionalTables.filter(tab => tab.id === tabId)[0].columnTypeValue = value;
    }

    columnValueChange = (value: string, tabId: string) => {
        this.additionalTables.filter(tab => tab.id === tabId)[0].columnValue = value;
    }

    deleteColumn = (tableId: string, columnId: string) => {
        this.additionalTables.filter(table => table.id === tableId)
        .forEach(table => { table.columns = table.columns.filter(column => column.id !== columnId);});
        
        this.tableStore.tables = this.additionalTables;
        tableService.save(this.tableStore.tables);
    }

    editColumn = (tableId: string, columnId: string, value: string, type: DataType) => {
        this.additionalTables.filter(table => table.id === tableId)
        .forEach(table => { 
            table.editMode = true;
            table.columnValue = value;
            table.columnId = columnId;
            table.columnTypeValue = type;
        });
    }

    saveEditedColumn = (tableId: string) => {
        this.additionalTables.filter(table => table.id === tableId)
        .forEach(table=> { 
            table.columns.filter(col => col.id === table.columnId)
             .forEach (col => { 
                 col.label = table.columnValue; 
                 col.type = table.columnTypeValue;
                });
            table.editMode = false;
            table.columnValue = "";
            table.columnId = "";
            table.columnTypeValue = DataType.Text;
        });
       
        this.tableStore.tables = this.additionalTables;
        tableService.save(this.tableStore.tables);
    }
}